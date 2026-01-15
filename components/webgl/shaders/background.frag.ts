/**
 * Background Fragment Shader
 *
 * Unified shader handling:
 * - Base grid cells with gaps
 * - Intro animation (orbital sunrise effect)
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
uniform float uScrollProgress; // Scroll progress (0=top, 1=scrolled past hero)
uniform float uViewportHeight; // Viewport height in pixels (hero section height)
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

// ============================================================================
// ANIMATION FUNCTIONS
// ============================================================================

// Orbital sunrise/sunset effect: semi-circle horizon curving upward with glow
// Constrained to the hero section (first viewport) only
float calculateIntroEffect(vec2 pos, float progress, float time) {
  // === CONSTRAIN TO HERO SECTION ===
  // Only render arc within the first viewport height (hero section)
  // pos.y is in pixels from bottom of canvas, hero is at the top
  float heroTop = uResolution.y; // Top of page (canvas coordinates)
  float heroBottom = uResolution.y - uViewportHeight; // Bottom of hero section

  // Skip if outside hero section
  if (pos.y < heroBottom || pos.y > heroTop) return 0.0;

  // Normalize position within hero section (-0.5 to 0.5 range, centered)
  vec2 heroPos;
  heroPos.x = (pos.x / uResolution.x) - 0.5; // -0.5 to 0.5 horizontally
  heroPos.y = ((pos.y - heroBottom) / uViewportHeight) - 0.5; // -0.5 to 0.5 within hero

  // Fade out as user scrolls past hero - fast exit
  float scrollFade = 1.0 - smoothstep(0.05, 0.4, uScrollProgress);
  if (scrollFade < 0.01) return 0.0;


  // === CONSTRAIN TO LOWER PORTION OF HERO ===
  // Fade out just above the eyebrow badge
  float heroFade = smoothstep(-0.15, 0.0, heroPos.y);
  if (heroFade < 0.01) return 0.0;

  // === HORIZON ARC (semi-circle from left-middle to right-middle, curving UP) ===
  // Arc center is BELOW the hero section, arc curves upward
  float arcCenterY = -0.52;
  float arcRadius = 0.75;

  // Calculate Y position of the arc at current X (upper part of circle)
  float xClamped = clamp(heroPos.x, -0.5, 0.5);
  float arcY = arcCenterY + sqrt(max(0.0, arcRadius * arcRadius - xClamped * xClamped));

  // Distance from the arc line
  float distToArc = heroPos.y - arcY;

  // === HORIZON LINE GLOW ===
  float horizonDist = abs(distToArc);
  float horizonGlow = exp(-horizonDist * horizonDist * 500.0);

  // Progressive horizon reveal (draws from center outward)
  float horizonReveal = smoothstep(0.0, 0.5, progress);
  float xReveal = 1.0 - smoothstep(0.0, progress * 1.5, abs(heroPos.x));
  horizonGlow *= horizonReveal * xReveal;

  // === GLOW ABOVE THE ARC ===
  float aboveGlow = 0.0;
  if (distToArc > 0.0) {
    // Glow intensity decreases with distance above arc
    float maxDist = 0.25 * progress; // Glow expands with progress
    float distFactor = 1.0 - clamp(distToArc / maxDist, 0.0, 1.0);
    distFactor = distFactor * distFactor; // Quadratic falloff for softer edge

    // Stronger glow near center of arc, weaker at edges
    float horizontalFalloff = exp(-heroPos.x * heroPos.x * 3.0);

    aboveGlow = distFactor * horizontalFalloff * smoothstep(0.1, 0.6, progress) * 0.7;
  }

  // === PIXEL APPEARANCE ANIMATION ===
  // Pixels appear progressively from the arc center outward
  vec2 arcCenter = vec2(0.0, arcY);
  float distFromCenter = length(heroPos - arcCenter);
  float appearDelay = distFromCenter * 0.6;
  float pixelAppear = smoothstep(appearDelay, appearDelay + 0.4, progress);

  // Add noise for organic feel
  float noise = snoise(vGridPos * 8.0 + time * 0.1) * 0.12 + 0.88;

  // Add subtle shimmer
  float shimmer = sin(time * 1.2 + vSeeds.x * TWO_PI + heroPos.x * 15.0) * 0.08 + 0.92;

  // Combine effects: horizon glow + above glow, with hero section fade and scroll fade
  float intensity = (horizonGlow * 1.2 + aboveGlow) * pixelAppear * noise * shimmer * heroFade * scrollFade;

  return clamp(intensity, 0.0, 1.0);
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

  // Output final color
  gl_FragColor = vec4(cellColor, alpha);
}
`;
