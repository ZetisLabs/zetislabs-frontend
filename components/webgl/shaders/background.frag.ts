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
uniform float uAnimationMode;  // 0=none, 1=intro, 2=idle, 3=blog
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
  // Since the background is now FIXED, pos.y is already screen-space and stationary.
  vec2 heroPos;
  heroPos.x = (pos.x / uResolution.x) - 0.5;
  heroPos.y = (pos.y / uResolution.y) - 0.5;

  // Scroll fade will be calculated later to synchronize with text


  // === CONSTRAIN TO LOWER PORTION OF HERO ===
  // Fade out just above the eyebrow badge
  float heroFade = smoothstep(-0.15, 0.0, heroPos.y);
  if (heroFade < 0.01) return 0.0;

  // === HORIZON ARC (semi-circle from left-middle to right-middle, curving UP) ===
  // Arc center reflects a 'sunset' by sinking slightly as user scrolls
  float arcCenterY = -0.52 - (uScrollProgress * 0.15);
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
  float horizonReveal = smoothstep(0.0, 0.35, progress);
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

  // Fade out as user scrolls past hero - synchronized with text (ends at approx 30% scroll)
  float scrollFade = 1.0 - smoothstep(0.0, 0.30, uScrollProgress);
  if (scrollFade < 0.01) return 0.0;

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

// Blog page animation - "Modular Sweep" Swiss typographic style
// Inspired by Müller-Brockmann grid systems with rhythmic, intentional movement
float calculateBlogEffect(vec2 pos, float time, vec2 seeds, vec2 gridPos) {
  float effect = 0.0;

  // Normalize position
  vec2 normalizedPos = pos / uResolution;

  // === TIMING (Stepped/Quantized for "Mechanical" Swiss feel) ===
  float slowTime = time * 0.12;
  float mediumTime = time * 0.4;

  // === HORIZONTAL MODULAR SWEEP ===
  // Creates elegant "scanning" bars that traverse the grid
  // Multiple sweeps at different speeds for layered depth
  float sweep1 = smoothstep(0.0, 0.08, fract(normalizedPos.x - slowTime)) *
                 smoothstep(0.16, 0.08, fract(normalizedPos.x - slowTime));
  float sweep2 = smoothstep(0.0, 0.04, fract(normalizedPos.x + slowTime * 1.3 + 0.5)) *
                 smoothstep(0.08, 0.04, fract(normalizedPos.x + slowTime * 1.3 + 0.5));

  // === VERTICAL COLUMN RHYTHM ===
  // Specific columns activate based on modular arithmetic (like a typographic grid)
  float colModule = mod(gridPos.x, 12.0); // 12-column grid system
  float isActiveColumn = step(10.0, colModule); // Only columns 10, 11 in each module

  // Pulse the active columns
  float columnPulse = sin(mediumTime + gridPos.x * 0.3) * 0.5 + 0.5;
  float verticalRhythm = isActiveColumn * columnPulse * 0.3;

  // === SEED-BASED FRAGMENTING ===
  // Extremely high thresholds = only ~1-2% of pixels
  float fragment1 = step(0.992, fract(seeds.x * 17.0 + seeds.y * 11.0));
  float fragment2 = step(0.995, fract(seeds.y * 23.0 + seeds.x * 7.0));

  // === DIAGONAL ACCENT LINES ===
  // Swiss design sometimes uses diagonal elements for dynamism
  float diagonal = abs(fract((normalizedPos.x + normalizedPos.y) * 2.0 - slowTime * 0.5) - 0.5);
  float diagonalLine = smoothstep(0.02, 0.0, diagonal) * 0.2;

  // Only show diagonal on rare fragments
  diagonalLine *= step(0.995, seeds.x);

  // === INTERSECTION NODES ===
  // Where horizontal and vertical grid lines would meet
  float nodeX = smoothstep(0.02, 0.0, abs(fract(normalizedPos.x * 8.0) - 0.5) - 0.45);
  float nodeY = smoothstep(0.02, 0.0, abs(fract(normalizedPos.y * 6.0) - 0.5) - 0.45);
  float nodes = nodeX * nodeY;

  // Animate nodes with offset timing (extremely sparse)
  float nodePulse = sin(time * 0.6 + normalizedPos.x * 10.0 + normalizedPos.y * 8.0) * 0.5 + 0.5;
  nodes *= nodePulse * step(0.995, seeds.y) * 0.25;

  // === COMBINE EFFECTS (ultra-minimal) ===
  // Primary: Horizontal sweeps with fragmentation
  effect += sweep1 * fragment1 * 0.5;
  effect += sweep2 * fragment2 * 0.4;

  // Secondary: Vertical rhythm (barely visible)
  effect += verticalRhythm * fragment1 * 0.2;

  // Tertiary: Diagonal accents and nodes
  effect += diagonalLine * 0.3;
  effect += nodes;

  return clamp(effect, 0.0, 0.5);
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

  // 2. Animation modes
  // Mode 1: Intro (arc animation)
  if (uAnimationMode >= 0.5 && uAnimationMode < 2.5) {
    float introIntensity = calculateIntroEffect(vPosition, uProgress, uTime);
    cellColor = mix(cellColor, uAccentColor, introIntensity);

    // Boost alpha for animated cells
    alpha = mix(alpha, 1.0, introIntensity * 0.3);
  }

  // Mode 2: Idle breathing animation
  if (uAnimationMode >= 1.5 && uAnimationMode < 2.5) {
    float breathing = calculateBreathing(vPosition, uTime, vSeeds);

    // Apply breathing to alpha for subtle pulsation
    alpha *= breathing;
  }

  // Mode 3: Blog page pixel art animation
  if (uAnimationMode >= 2.5) {
    float blogIntensity = calculateBlogEffect(vPosition, uTime, vSeeds, vGridPos);
    cellColor = mix(cellColor, uAccentColor, blogIntensity);

    // Subtle breathing for blog mode too
    float breathing = calculateBreathing(vPosition, uTime, vSeeds);
    alpha *= breathing;
  }

  // Output final color
  gl_FragColor = vec4(cellColor, alpha);
}
`;
