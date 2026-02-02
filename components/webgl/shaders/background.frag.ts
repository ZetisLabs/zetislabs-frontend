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
uniform float uAnimationMode;  // 0=none, 1=intro, 2=idle, 3=blog
uniform float uProgress;       // Animation progress (0-1)
uniform float uScrollProgress; // Scroll progress (0=top, 1=scrolled past hero)
uniform float uViewportHeight; // Viewport height in pixels (hero section height)
uniform vec3 uBaseColor;       // Base cell color (#f8f8f8)
uniform vec3 uAccentColor;     // Accent color for animations (#3a7bd5)

// Process section pixel art uniforms
uniform float uProcessSectionTop;    // Top of process section (screen Y)
uniform float uProcessSectionHeight; // Height of process section
uniform float uProcessVisible;       // 1.0 when process section is visible

// Hover-triggered icon animation uniforms
uniform float uHoveredIcon;          // Currently hovered icon index (0-3)
uniform float uPreviousIcon;         // Previous icon for crossfade
uniform float uIconChangeTime;       // Time when icon changed (seconds)
// Pixel art position uniforms (screen coordinates)
uniform float uPixelArtCenterX;      // Center X of pixel art zone (screen space)
uniform float uPixelArtCenterY;      // Center Y of pixel art zone (screen space)

// Solution card uniforms (screen coordinates)
uniform float uSolutionCardX;        // Center X of solution card
uniform float uSolutionCardY;        // Center Y of solution card
uniform float uSolutionCardWidth;    // Width of solution card
uniform float uSolutionCardHeight;   // Height of solution card
uniform float uSolutionCardVisible;  // 1.0 when visible


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
// Enhanced with fill, highlights and shadows
float pixelArtMagnifier(vec2 localPos) {
  int x = int(floor(localPos.x));
  int y = int(floor(localPos.y));

  // === OUTER RING (full intensity) ===
  if (y == 10 && x >= 4 && x <= 7) return 1.0;
  if (y == 9 && (x == 3 || x == 8)) return 1.0;
  if (y == 8 && (x == 2 || x == 9)) return 1.0;
  if (y == 7 && (x == 2 || x == 9)) return 1.0;
  if (y == 6 && (x == 2 || x == 9)) return 1.0;
  if (y == 5 && (x == 3 || x == 8)) return 1.0;
  if (y == 4 && x >= 4 && x <= 7) return 1.0;

  // === GLASS FILL (gradient from top-left to bottom-right) ===
  // Inner glass area with subtle gradient
  if (y == 9 && x >= 4 && x <= 7) return 0.35;
  if (y == 8 && x >= 3 && x <= 8) return 0.30;
  if (y == 7 && x >= 3 && x <= 8) return 0.25;
  if (y == 6 && x >= 3 && x <= 8) return 0.22;
  if (y == 5 && x >= 4 && x <= 7) return 0.20;

  // === GLASS REFLECTION (highlight) ===
  if (y == 8 && x == 4) return 0.55;
  if (y == 7 && x == 4) return 0.50;
  if (y == 9 && x == 5) return 0.45;

  // === HANDLE (with thickness) ===
  if (y == 3 && x == 8) return 1.0;
  if (y == 2 && x == 9) return 1.0;
  if (y == 1 && x == 10) return 1.0;
  // Handle shadow
  if (y == 2 && x == 10) return 0.6;
  if (y == 1 && x == 9) return 0.5;

  return 0.0;
}

// Check if a pixel is part of a document icon (12x12 grid)
// Enhanced with paper fill, shadow and more text lines
float pixelArtDocument(vec2 localPos) {
  int x = int(floor(localPos.x));
  int y = int(floor(localPos.y));

  // === DOCUMENT OUTLINE ===
  if (x == 2 && y >= 1 && y <= 10) return 1.0;
  if (x == 9 && y >= 1 && y <= 8) return 1.0;
  if (y == 10 && x >= 2 && x <= 6) return 1.0;
  if (y == 1 && x >= 2 && x <= 9) return 1.0;

  // === FOLDED CORNER ===
  if (y == 10 && x == 7) return 1.0;
  if (y == 9 && (x == 7 || x == 8)) return 1.0;
  if (y == 8 && x == 9) return 1.0;
  // Corner fold inner line
  if (y == 9 && x == 8) return 0.7;

  // === PAPER FILL (subtle gradient) ===
  if (x >= 3 && x <= 8 && y >= 2 && y <= 9) {
    // Skip the folded corner area
    if (y >= 9 && x >= 7) return 0.0;
    // Gradient: lighter at top-left
    float gradient = 0.18 + (float(y) - 2.0) * 0.01 - (float(x) - 3.0) * 0.008;
    return gradient;
  }

  // === TEXT LINES (multiple lines for realism) ===
  if (y == 8 && x >= 4 && x <= 6) return 0.55;
  if (y == 7 && x >= 4 && x <= 7) return 0.60;
  if (y == 6 && x >= 4 && x <= 5) return 0.55;
  if (y == 5 && x >= 4 && x <= 7) return 0.60;
  if (y == 4 && x >= 4 && x <= 6) return 0.55;
  if (y == 3 && x >= 4 && x <= 7) return 0.60;

  // === SHADOW on right edge ===
  if (x == 10 && y >= 1 && y <= 7) return 0.3;

  return 0.0;
}

// Check if a pixel is part of terminal icon (12x12 grid)
// Simple >_ prompt symbol only
float pixelArtCode(vec2 localPos) {
  int x = int(floor(localPos.x));
  int y = int(floor(localPos.y));

  // === ">" CHARACTER (large chevron) ===
  // Top diagonal of >
  if (y == 10 && x == 0) return 1.0;
  if (y == 10 && x == 1) return 0.6;
  if (y == 9 && x == 1) return 1.0;
  if (y == 9 && x == 2) return 0.6;
  if (y == 8 && x == 2) return 1.0;
  if (y == 8 && x == 3) return 0.6;
  if (y == 7 && x == 3) return 1.0;
  if (y == 7 && x == 4) return 0.6;
  // Middle point
  if (y == 6 && x == 4) return 1.0;
  if (y == 6 && x == 5) return 0.6;
  // Bottom diagonal of >
  if (y == 5 && x == 4) return 0.6;
  if (y == 5 && x == 3) return 1.0;
  if (y == 4 && x == 3) return 0.6;
  if (y == 4 && x == 2) return 1.0;
  if (y == 3 && x == 2) return 0.6;
  if (y == 3 && x == 1) return 1.0;
  if (y == 2 && x == 1) return 0.6;
  if (y == 2 && x == 0) return 1.0;

  // === "_" UNDERSCORE (cursor, thick) ===
  if (y == 2 && x >= 7 && x <= 11) return 1.0;
  if (y == 3 && x >= 7 && x <= 11) return 0.7;

  return 0.0;
}

// Check if a pixel is part of a rocket icon (12x12 grid)
// Enhanced with body shading, detailed flames and window reflection
float pixelArtRocket(vec2 localPos) {
  int x = int(floor(localPos.x));
  int y = int(floor(localPos.y));

  // === ROCKET TIP (nose cone) ===
  if (x == 5 && y == 11) return 1.0;
  if (x == 6 && y == 11) return 1.0;
  if (x >= 4 && x <= 7 && y == 10) return 1.0;

  // === ROCKET BODY OUTLINE ===
  if ((x == 4 || x == 7) && y >= 5 && y <= 9) return 1.0;
  if (y == 9 && x >= 4 && x <= 7) return 1.0;

  // === BODY FILL (metallic gradient) ===
  if (x == 5 && y >= 5 && y <= 9) return 0.75;
  if (x == 6 && y >= 5 && y <= 9) return 0.65;

  // === BODY DETAILS (stripes) ===
  if (y == 6 && (x == 5 || x == 6)) return 0.85;

  // === FINS (with shading) ===
  if (x == 3 && y >= 4 && y <= 6) return 1.0;
  if (x == 2 && y == 4) return 1.0;
  if (x == 2 && y == 5) return 0.6;  // Fin shadow
  if (x == 8 && y >= 4 && y <= 6) return 1.0;
  if (x == 9 && y == 4) return 1.0;
  if (x == 9 && y == 5) return 0.6;  // Fin shadow

  // === WINDOW (porthole with reflection) ===
  if (x == 5 && y == 8) return 0.55;
  if (x == 6 && y == 8) return 0.45;
  if (x == 5 && y == 7) return 0.50;
  if (x == 6 && y == 7) return 0.40;
  // Window highlight
  if (x == 5 && y == 8) return 0.65;

  // === EXHAUST/NOZZLE ===
  if (y == 4 && (x == 5 || x == 6)) return 0.9;

  // === FLAME (animated feel with gradient) ===
  // Core flame (brightest)
  if (x == 5 && y == 3) return 0.95;
  if (x == 6 && y == 3) return 0.90;
  // Middle flame
  if (x == 5 && y == 2) return 0.75;
  if (x == 6 && y == 2) return 0.70;
  if (x == 4 && y == 2) return 0.50;
  if (x == 7 && y == 2) return 0.45;
  // Outer flame (fading)
  if (x == 5 && y == 1) return 0.55;
  if (x == 6 && y == 1) return 0.50;
  if (x == 4 && y == 1) return 0.35;
  if (x == 7 && y == 1) return 0.30;
  // Flame tips
  if (x == 5 && y == 0) return 0.25;
  if (x == 6 && y == 0) return 0.20;

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

  // === MOBILE: No pixel art effects ===
  if (uResolution.x < 640.0) {
    return vec2(0.0);
  }

  // === TABLET: Hide pixel art ===
  if (uResolution.x < 1024.0) {
    return vec2(0.0);
  }

  // === DESKTOP: Single animated icon with retro 80s terminal effect ===
  // Triggered by hover on process cards
  float pixelSize = 10.0;
  float iconSize = 12.0 * pixelSize; // 120px per icon

  // Use the actual pixel art zone position passed from React
  // Convert from screen coordinates (Y down) to WebGL coordinates (Y up)
  float pixelArtCenterX = uPixelArtCenterX;
  float iconWebGLY = uResolution.y - uPixelArtCenterY;

  // Reset for desktop
  intensity = 0.0;
  depth = 0.5;

  // === HOVER-TRIGGERED ANIMATION WITH CROSSFADE ===
  // Icon changes when user hovers over process cards
  int currentIcon = int(uHoveredIcon);
  int prevIcon = int(uPreviousIcon);

  // Time since icon changed
  float timeSinceChange = uTime - uIconChangeTime;

  // Animation durations
  float fadeOutDuration = 0.12; // Quick fade out
  float fadeInDuration = 0.25;  // Fast fade in with retro effect
  float totalDuration = fadeOutDuration + fadeInDuration;

  // Calculate crossfade progress
  float fadeOutProgress = clamp(timeSinceChange / fadeOutDuration, 0.0, 1.0);
  float fadeInProgress = clamp((timeSinceChange - fadeOutDuration * 0.5) / fadeInDuration, 0.0, 1.0);

  // Single icon center position
  vec2 iconCenter = vec2(pixelArtCenterX, iconWebGLY);
  vec2 localPos = (pos - iconCenter + vec2(iconSize * 0.5)) / pixelSize;

  // Check if within icon bounds
  if (localPos.x >= 0.0 && localPos.x < 12.0 && localPos.y >= 0.0 && localPos.y < 12.0) {
    float pixelX = floor(localPos.x);
    float pixelY = floor(localPos.y);

    // Get icon values for both previous and current icons
    float prevIconVal = 0.0;
    float currIconVal = 0.0;

    // Previous icon
    if (prevIcon == 0) {
      prevIconVal = pixelArtMagnifier(localPos);
    } else if (prevIcon == 1) {
      prevIconVal = pixelArtDocument(localPos);
    } else if (prevIcon == 2) {
      prevIconVal = pixelArtCode(localPos);
    } else {
      prevIconVal = pixelArtRocket(localPos);
    }

    // Current icon
    if (currentIcon == 0) {
      currIconVal = pixelArtMagnifier(localPos);
    } else if (currentIcon == 1) {
      currIconVal = pixelArtDocument(localPos);
    } else if (currentIcon == 2) {
      currIconVal = pixelArtCode(localPos);
    } else {
      currIconVal = pixelArtRocket(localPos);
    }

    // === FADE OUT PREVIOUS ICON ===
    float prevIntensity = 0.0;
    if (prevIconVal > 0.0 && fadeOutProgress < 1.0) {
      // Simple fade out with slight dissolve effect
      float fadeOutAlpha = 1.0 - fadeOutProgress;
      // Add noise-based dissolve
      float dissolveNoise = fract(sin(pixelX * 12.9898 + pixelY * 78.233) * 43758.5453);
      float dissolveThreshold = fadeOutProgress * 1.2;
      float dissolve = step(dissolveThreshold, dissolveNoise + 0.2);
      prevIntensity = prevIconVal * fadeOutAlpha * dissolve;
    }

    // === FADE IN CURRENT ICON with 80s RETRO EFFECT ===
    float currIntensity = 0.0;
    if (currIconVal > 0.0 && fadeInProgress > 0.0) {
      // Pixel index for generation order (top-left to bottom-right, row by row)
      float pixelIndex = (11.0 - pixelY) * 12.0 + pixelX;
      float totalPixels = 144.0; // 12x12

      // Progressive reveal threshold
      float pixelThreshold = fadeInProgress * totalPixels * 1.2;

      // Pixel visibility with sharp edge (80s style)
      float pixelVisible = smoothstep(pixelIndex - 3.0, pixelIndex, pixelThreshold);

      // === CRT SCANLINE EFFECT ===
      float scanline = 0.92 + 0.08 * sin((11.0 - pixelY) * PI * 2.0 + uTime * 4.0);

      // === PHOSPHOR GLOW ===
      float glowTime = pixelThreshold - pixelIndex;
      float phosphorGlow = 1.0 + 0.4 * exp(-glowTime * 0.3) * step(0.0, glowTime);

      // === FLICKER during generation ===
      float flicker = 1.0;
      if (fadeInProgress < 1.0) {
        float noise = fract(sin(uTime * 30.0 + pixelIndex * 0.1) * 43758.5453);
        flicker = 0.85 + 0.15 * noise;
      }

      // === INTERLACE EFFECT ===
      float interlace = 0.95 + 0.05 * mod(pixelY + floor(uTime * 30.0), 2.0);

      currIntensity = currIconVal * pixelVisible * scanline * phosphorGlow * flicker * interlace;
    }

    // Combine previous and current icon intensities
    float combinedIntensity = max(prevIntensity, currIntensity);

    if (combinedIntensity > 0.0) {
      float depthGradient = 1.0 - (localPos.x + (12.0 - localPos.y)) / 24.0;
      depth = 0.4 + depthGradient * 0.5;
      intensity = combinedIntensity;
    }
  }

  // Smooth visibility based on header position in viewport
  float pixelArtScreenY = sectionTopScreen + uProcessSectionHeight * 0.20;

  // Calculate how "centered" the pixel art is in the viewport
  // Best visibility when pixel art is in the middle-upper portion of screen
  float viewportHeight = uResolution.y;
  float optimalTop = viewportHeight * 0.15;    // Start fading in when 15% from top
  float optimalBottom = viewportHeight * 0.65; // Start fading out when 65% from top

  // Fade in as pixel art enters from bottom, fade out as it exits to top
  float sectionFadeIn = 1.0 - smoothstep(optimalBottom, viewportHeight * 0.9, pixelArtScreenY);
  float sectionFadeOut = smoothstep(-viewportHeight * 0.2, optimalTop, pixelArtScreenY);

  // Combine fades with smooth easing
  float visibility = sectionFadeIn * sectionFadeOut;

  // Apply smootherstep for more natural easing
  visibility = visibility * visibility * (3.0 - 2.0 * visibility);

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
// SOLUTION CARD GLOW EFFECT
// ============================================================================

// Solution card effect - DISABLED (using CSS glow instead)
float calculateSolutionEffect(vec2 pos, float time) {
  return 0.0;
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
  // Mode 1: Intro (arc animation) - excludes blog mode (3)
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

  // Mode 3: Blog page animation
  if (uAnimationMode >= 2.5) {
    float blogIntensity = calculateBlogEffect(vPosition, uTime, vSeeds, vGridPos);
    cellColor = mix(cellColor, uAccentColor, blogIntensity);

    // Subtle breathing for blog mode too
    float breathing = calculateBreathing(vPosition, uTime, vSeeds);
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


  // 5. Solution card converging lines effect
  float solutionEffect = calculateSolutionEffect(vPosition, uTime);
  if (solutionEffect > 0.0) {
    cellColor = mix(cellColor, uAccentColor, solutionEffect);
    alpha = mix(alpha, 1.0, solutionEffect * 0.5);
  }

  // Output final color
  gl_FragColor = vec4(cellColor, alpha);
}
`;
