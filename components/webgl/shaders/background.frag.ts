/**
 * Background Fragment Shader
 *
 * Unified shader handling:
 * - Base grid cells with gaps
 * - Intro animation (orbital sunrise effect)
 * - Idle breathing animation
 * - Pixel art for Process section
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

// Process section pixel art uniforms
uniform float uProcessSectionTop;    // Top of process section (screen Y)
uniform float uProcessSectionHeight; // Height of process section
uniform float uProcessVisible;       // 1.0 when process section is visible

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
// PIXEL ART FUNCTIONS
// ============================================================================

// Check if a pixel is part of a magnifying glass icon (12x12 grid)
float pixelArtMagnifier(vec2 localPos) {
  int x = int(localPos.x);
  int y = int(localPos.y);

  // Circle part (radius ~4, center at 5,6)
  if (y == 10 && x >= 4 && x <= 7) return 1.0;
  if (y == 9 && (x == 3 || x == 8)) return 1.0;
  if (y == 8 && (x == 2 || x == 9)) return 1.0;
  if (y == 7 && (x == 2 || x == 9)) return 1.0;
  if (y == 6 && (x == 2 || x == 9)) return 1.0;
  if (y == 5 && (x == 3 || x == 8)) return 1.0;
  if (y == 4 && x >= 4 && x <= 7) return 1.0;

  // Handle
  if (y == 3 && x == 8) return 1.0;
  if (y == 2 && x == 9) return 1.0;
  if (y == 1 && x == 10) return 1.0;

  return 0.0;
}

// Check if a pixel is part of a document icon (12x12 grid)
float pixelArtDocument(vec2 localPos) {
  int x = int(localPos.x);
  int y = int(localPos.y);

  // Document outline
  if (x == 2 && y >= 1 && y <= 10) return 1.0;
  if (x == 9 && y >= 1 && y <= 8) return 1.0;
  if (y == 10 && x >= 2 && x <= 7) return 1.0;
  if (y == 1 && x >= 2 && x <= 9) return 1.0;

  // Folded corner
  if (y == 10 && x == 7) return 1.0;
  if (y == 9 && x == 8) return 1.0;
  if (y == 8 && x == 9) return 1.0;
  if (x == 7 && y == 9) return 1.0;
  if (x == 8 && y == 9) return 1.0;

  // Text lines
  if (y == 7 && x >= 4 && x <= 7) return 0.6;
  if (y == 5 && x >= 4 && x <= 7) return 0.6;
  if (y == 3 && x >= 4 && x <= 6) return 0.6;

  return 0.0;
}

// Check if a pixel is part of terminal icon (12x12 grid)
// Represents development/coding phase
float pixelArtCode(vec2 localPos) {
  int x = int(localPos.x);
  int y = int(localPos.y);

  // Terminal window frame
  // Top edge
  if (y == 10 && x >= 1 && x <= 10) return 1.0;
  // Bottom edge
  if (y == 2 && x >= 1 && x <= 10) return 1.0;
  // Left edge
  if (x == 1 && y >= 2 && y <= 10) return 1.0;
  // Right edge
  if (x == 10 && y >= 2 && y <= 10) return 1.0;

  // Title bar (slightly darker)
  if (y == 9 && x >= 2 && x <= 9) return 0.5;

  // Prompt symbol > inside terminal
  if (x == 3 && y == 6) return 0.8;
  if (x == 4 && y == 5) return 0.8;
  if (x == 3 && y == 4) return 0.8;

  // Cursor line _
  if (y == 5 && x >= 6 && x <= 8) return 0.6;

  return 0.0;
}

// Check if a pixel is part of a rocket icon (12x12 grid)
float pixelArtRocket(vec2 localPos) {
  int x = int(localPos.x);
  int y = int(localPos.y);

  // Rocket tip
  if (x == 5 && y == 11) return 1.0;
  if (x == 6 && y == 11) return 1.0;
  if (x >= 4 && x <= 7 && y == 10) return 1.0;

  // Rocket body
  if (x >= 4 && x <= 7 && y >= 5 && y <= 9) return 1.0;

  // Fins
  if (x == 3 && y >= 4 && y <= 6) return 1.0;
  if (x == 2 && y == 4) return 1.0;
  if (x == 8 && y >= 4 && y <= 6) return 1.0;
  if (x == 9 && y == 4) return 1.0;

  // Flame
  if (x == 5 && y == 3) return 0.8;
  if (x == 6 && y == 3) return 0.8;
  if (x == 5 && y == 2) return 0.6;
  if (x == 6 && y == 2) return 0.6;
  if (x == 5 && y == 1) return 0.4;
  if (x == 6 && y == 1) return 0.4;

  // Window
  if (x >= 5 && x <= 6 && y >= 7 && y <= 8) return 0.5;

  return 0.0;
}

// Calculate pixel art effect for the Process section
// Returns vec2: x = intensity, y = depth factor for transparency variation
vec2 calculateProcessPixelArtWithDepth(vec2 pos) {
  if (uProcessVisible < 0.5) return vec2(0.0);

  // Convert from WebGL coords (Y up from bottom) to screen coords
  float screenY = uResolution.y - pos.y;

  // Section bounds in screen coordinates
  float sectionTopScreen = uProcessSectionTop;
  float sectionBottomScreen = uProcessSectionTop + uProcessSectionHeight;

  // Check if we're in the process section area
  if (screenY < sectionTopScreen || screenY > sectionBottomScreen) return vec2(0.0);

  // Progress within section (0 at top, 1 at bottom)
  float sectionProgress = (screenY - sectionTopScreen) / uProcessSectionHeight;

  float intensity = 0.0;
  float depth = 0.5;

  // === MOBILE: Vertical timeline line using grid ===
  if (uResolution.x < 640.0) {
    // Timeline is at left: 24px from edge (matching CSS left-5 = 20px + half of 40px circle)
    float timelineX = 44.0; // Approximate center of timeline circles
    float lineWidth = 8.0;  // Width of the grid line

    // Only show in the cards area (after header)
    if (sectionProgress > 0.35 && sectionProgress < 0.95) {
      if (abs(pos.x - timelineX) < lineWidth) {
        // Create dotted pattern
        float dotSpacing = 15.0;
        float dotSize = 6.0;
        float yPattern = mod(screenY - sectionTopScreen, dotSpacing);
        if (yPattern < dotSize) {
          intensity = 0.6;
          depth = 0.4;
        }
      }
    }

    // Fade
    float fadeIn = smoothstep(0.35, 0.40, sectionProgress);
    float fadeOut = 1.0 - smoothstep(0.90, 0.95, sectionProgress);
    return vec2(intensity * fadeIn * fadeOut, depth);
  }

  // === TABLET: Hide pixel art ===
  if (uResolution.x < 1024.0) {
    return vec2(0.0);
  }

  // === DESKTOP: Full pixel art ===
  // Grid cell size for pixel art
  float pixelSize = 5.0;
  float iconSize = 12.0 * pixelSize;

  // Position 4 icons across the section (matching the 4 process cards)
  float maxWidth = min(uResolution.x * 0.9, 1152.0); // max-w-6xl = 1152px
  float offsetX = (uResolution.x - maxWidth) / 2.0;
  float cardWidth = maxWidth / 4.0;

  // Icons positioned between title and cards (around 42% of section height)
  float iconYProgress = 0.42;
  float iconScreenY = sectionTopScreen + uProcessSectionHeight * iconYProgress;
  float iconWebGLY = uResolution.y - iconScreenY;

  // Reset for desktop (already declared above)
  intensity = 0.0;
  depth = 0.5; // Default depth

  // Helper function for depth based on position within icon
  // Creates a gradient effect: brighter at top-left, darker at bottom-right

  // Icon 1: Magnifying glass (Audit)
  vec2 icon1Center = vec2(offsetX + cardWidth * 0.5, iconWebGLY);
  vec2 localPos1 = (pos - icon1Center + vec2(iconSize * 0.5)) / pixelSize;
  if (localPos1.x >= 0.0 && localPos1.x < 12.0 && localPos1.y >= 0.0 && localPos1.y < 12.0) {
    float iconVal = pixelArtMagnifier(localPos1);
    if (iconVal > 0.0) {
      // Depth based on position: top-left brighter, bottom-right darker
      float depthGradient = 1.0 - (localPos1.x + (12.0 - localPos1.y)) / 24.0;
      depth = 0.4 + depthGradient * 0.5;
      intensity = iconVal;
    }
  }

  // Icon 2: Document (Proposal)
  vec2 icon2Center = vec2(offsetX + cardWidth * 1.5, iconWebGLY);
  vec2 localPos2 = (pos - icon2Center + vec2(iconSize * 0.5)) / pixelSize;
  if (localPos2.x >= 0.0 && localPos2.x < 12.0 && localPos2.y >= 0.0 && localPos2.y < 12.0) {
    float iconVal = pixelArtDocument(localPos2);
    if (iconVal > 0.0) {
      float depthGradient = 1.0 - (localPos2.x + (12.0 - localPos2.y)) / 24.0;
      depth = 0.4 + depthGradient * 0.5;
      intensity = max(intensity, iconVal);
    }
  }

  // Icon 3: Code brackets (Development)
  vec2 icon3Center = vec2(offsetX + cardWidth * 2.5, iconWebGLY);
  vec2 localPos3 = (pos - icon3Center + vec2(iconSize * 0.5)) / pixelSize;
  if (localPos3.x >= 0.0 && localPos3.x < 12.0 && localPos3.y >= 0.0 && localPos3.y < 12.0) {
    float iconVal = pixelArtCode(localPos3);
    if (iconVal > 0.0) {
      float depthGradient = 1.0 - (localPos3.x + (12.0 - localPos3.y)) / 24.0;
      depth = 0.4 + depthGradient * 0.5;
      intensity = max(intensity, iconVal);
    }
  }

  // Icon 4: Rocket (Results)
  vec2 icon4Center = vec2(offsetX + cardWidth * 3.5, iconWebGLY);
  vec2 localPos4 = (pos - icon4Center + vec2(iconSize * 0.5)) / pixelSize;
  if (localPos4.x >= 0.0 && localPos4.x < 12.0 && localPos4.y >= 0.0 && localPos4.y < 12.0) {
    float iconVal = pixelArtRocket(localPos4);
    if (iconVal > 0.0) {
      float depthGradient = 1.0 - (localPos4.x + (12.0 - localPos4.y)) / 24.0;
      depth = 0.4 + depthGradient * 0.5;
      intensity = max(intensity, iconVal);
    }
  }

  // No connecting lines - clean Swiss style

  // Fade based on section visibility - icons at 42% position
  float fadeIn = smoothstep(0.30, 0.38, sectionProgress);
  float fadeOut = 1.0 - smoothstep(0.50, 0.60, sectionProgress);
  float visibility = fadeIn * fadeOut;

  return vec2(intensity * visibility, depth);
}

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

  // 4. Process section pixel art with depth
  vec2 pixelArtData = calculateProcessPixelArtWithDepth(vPosition);
  float pixelArtIntensity = pixelArtData.x;
  float pixelArtDepth = pixelArtData.y;

  if (pixelArtIntensity > 0.0) {
    // Use depth to create transparency variation in the blue
    // Higher depth = more saturated/opaque blue, lower depth = lighter/more transparent
    vec3 depthColor = mix(uBaseColor, uAccentColor, pixelArtDepth);
    cellColor = mix(cellColor, depthColor, pixelArtIntensity * 0.9);

    // Alpha also varies with depth for more 3D feel
    float depthAlpha = 0.6 + pixelArtDepth * 0.4;
    alpha = mix(alpha, depthAlpha, pixelArtIntensity * 0.7);
  }

  // Output final color
  gl_FragColor = vec4(cellColor, alpha);
}
`;
