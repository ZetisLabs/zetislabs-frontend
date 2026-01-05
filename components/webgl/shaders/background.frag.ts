/**
 * Background Fragment Shader
 *
 * Unified shader handling:
 * - Base grid cells with gaps
 * - Intro animation (arc effect)
 * - Idle breathing animation
 */

import { noiseGLSL } from "./includes/noise";

export const backgroundFragmentShader = /* glsl */ `
precision highp float;

// Include utility functions
${noiseGLSL}

// Uniforms
uniform float uTime;
uniform vec2 uResolution;
uniform float uAnimationMode;  // 0=none, 1=intro, 2=idle
uniform float uProgress;       // Animation progress (0-1)
uniform vec3 uBaseColor;       // Base cell color (#f8f8f8)
uniform vec3 uAccentColor;     // Accent color for animations (#3a7bd5)

// Varyings from vertex shader
varying vec2 vUv;
varying vec2 vPosition;
varying float vIndex;
varying vec2 vSeeds;
varying vec2 vGridPos;

// Constants
const float PI = 3.14159265359;
const float TWO_PI = 6.28318530718;
const float PHI = 1.6180339887; // Golden ratio

// ============================================================================
// ANIMATION FUNCTIONS
// ============================================================================

// Intro effect: luminous arc that draws progressively
float calculateIntroEffect(vec2 pos, float progress, float time) {
  // Normalize position
  vec2 normalizedPos = pos / uResolution;

  // Golden ratio arc - curves upward
  float goldenCurvature = 0.4;
  float arcY = 0.2 - pow(abs(normalizedPos.x), PHI) * goldenCurvature;
  float distToArc = abs(normalizedPos.y - arcY);

  // Gaussian falloff from arc center
  float arcMask = exp(-distToArc * distToArc * 15.0);

  // Progressive reveal based on progress
  float revealX = (normalizedPos.x + 0.5) * 2.0; // 0 to 2 range
  float reveal = smoothstep(progress * 2.0 - 0.5, progress * 2.0, revealX);

  // Wave animation along the arc
  float wave = sin(time * 2.0 + normalizedPos.x * 10.0 + vSeeds.x * TWO_PI) * 0.3 + 0.7;

  // Sun glow effect at center
  float sunDist = length(normalizedPos - vec2(0.0, 0.3));
  float sunGlow = exp(-sunDist * 3.0) * 0.5;

  // Combine effects
  float intensity = (arcMask * wave + sunGlow) * reveal;

  // Add some noise variation
  float noise = snoise(vGridPos * 5.0 + time * 0.2) * 0.1 + 0.9;

  return clamp(intensity * noise, 0.0, 1.0);
}

// Idle breathing animation
float calculateBreathing(vec2 pos, float time, vec2 seeds) {
  // Slow breathing wave
  float breath = sin(time * 0.4 + seeds.x * TWO_PI) * 0.03 + 1.0;

  // Subtle shimmer
  float shimmer = sin(time * 2.0 + seeds.y * TWO_PI + pos.x * 0.01) * 0.02 + 1.0;

  return breath * shimmer;
}

// ============================================================================
// MAIN
// ============================================================================

void main() {
  // 1. Base cell color
  vec3 cellColor = uBaseColor;
  float alpha = 1.0;

  // Normalize position for calculations
  vec2 normalizedPos = vPosition / uResolution;

  // 2. Animation intro (if active: mode >= 1)
  if (uAnimationMode >= 0.5) {
    float introIntensity = calculateIntroEffect(vPosition, uProgress, uTime);
    cellColor = mix(cellColor, uAccentColor, introIntensity);

    // Boost alpha for animated cells
    alpha = mix(alpha, 1.0, introIntensity * 0.3);
  }

  // 3. Idle breathing animation (mode >= 2)
  if (uAnimationMode >= 1.5) {
    float breathing = calculateBreathing(vPosition, uTime, vSeeds);

    // Apply breathing to alpha for subtle pulsation
    alpha *= breathing;
  }

  // 4. Edge fade for cells at viewport boundaries
  float edgeFadeX = smoothstep(0.0, 0.1, 0.5 - abs(normalizedPos.x));
  float edgeFadeY = smoothstep(0.0, 0.1, 0.5 - abs(normalizedPos.y));
  float edgeFade = edgeFadeX * edgeFadeY;

  // Apply edge fade only to alpha, not color
  alpha *= mix(0.3, 1.0, edgeFade);

  // Output final color
  gl_FragColor = vec4(cellColor, alpha);
}
`;
