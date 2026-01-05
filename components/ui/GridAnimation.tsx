"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const GRID_SIZE = 8; // Size of each cell in pixels
const ANIMATION_DURATION = 3200; // Duration to draw the arc (ms)
const ARC_THICKNESS = 100; // Thickness of the arc's illumination zone
const ARC_CURVATURE = 0.12; // How much the arc curves (0 = straight, 1 = very curved)
const ARC_CENTER_Y = 0.18; // Y position of arc center (0-1, from top)
const FINAL_OPACITY = 0.5; // Final opacity of the arc after animation

// Organic variation constants
const NOISE_SCALE = 0.08; // Scale of the noise pattern
const INTENSITY_VARIATION = 0.25; // How much cell intensity can vary (0-1)
const HUE_VARIATION = 12; // Hue variation range in degrees
const EDGE_ROUGHNESS = 8; // Pixels of edge irregularity
const THICKNESS_VARIATION = 0.15; // How much arc thickness can vary

// Wave & breathing animation constants
const WAVE_DELAY_FACTOR = 0.4; // How much distance affects delay (0-1)
const MAX_WAVE_DELAY = 800; // Maximum delay in ms for wave effect
const BREATHING_SPEED = 0.0008; // Base speed of breathing animation
const BREATHING_AMPLITUDE = 0.15; // How much opacity varies during breathing (0-1)
const BREATHING_FREQ_VARIATION = 0.5; // Variation in breathing frequency per cell

// Irregular edge constants
const EDGE_INCLUSION_THRESHOLD = 0.15; // Probability of including/excluding edge cells
const EDGE_EXTENSION_RANGE = 12; // How far cells can extend beyond normal boundary (px)

// Sparkle/twinkling constants
const SPARKLE_PROBABILITY = 0.008; // Probability of a cell sparkling per frame
const SPARKLE_INTENSITY_BOOST = 0.6; // How much brighter sparkles are
const SPARKLE_HUE_SHIFT = 25; // Hue shift range for sparkles
const SPARKLE_DURATION = 150; // Duration of sparkle in ms

// Trail/persistence constants
const TRAIL_VARIATION = 0.7; // How much trail speed can vary (0-1)
const TRAIL_BASE_SPEED = 0.92; // Base persistence multiplier per frame

/**
 * Simple seeded pseudo-random number generator for deterministic noise
 * Uses a simple hash function to create repeatable "random" values
 */
const seededRandom = (x: number, y: number, seed: number = 12345): number => {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
};

/**
 * Simple 2D noise function using bilinear interpolation
 * Creates smooth, organic-looking variations
 */
const noise2D = (x: number, y: number, scale: number = 1): number => {
  const sx = x * scale;
  const sy = y * scale;

  const x0 = Math.floor(sx);
  const y0 = Math.floor(sy);
  const x1 = x0 + 1;
  const y1 = y0 + 1;

  const fx = sx - x0;
  const fy = sy - y0;

  // Smoothstep interpolation for smoother results
  const sfx = fx * fx * (3 - 2 * fx);
  const sfy = fy * fy * (3 - 2 * fy);

  // Get corner values
  const v00 = seededRandom(x0, y0);
  const v10 = seededRandom(x1, y0);
  const v01 = seededRandom(x0, y1);
  const v11 = seededRandom(x1, y1);

  // Bilinear interpolation
  const v0 = v00 + sfx * (v10 - v00);
  const v1 = v01 + sfx * (v11 - v01);

  return v0 + sfy * (v1 - v0);
};

/**
 * Fractal noise (multiple octaves) for more natural-looking patterns
 */
const fractalNoise = (
  x: number,
  y: number,
  octaves: number = 3,
  persistence: number = 0.5
): number => {
  let total = 0;
  let amplitude = 1;
  let maxValue = 0;
  let frequency = 1;

  for (let i = 0; i < octaves; i++) {
    total += noise2D(x * frequency, y * frequency, NOISE_SCALE) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= 2;
  }

  return total / maxValue;
};

/**
 * GridAnimation Component
 *
 * Creates an arc that draws itself from left to right and remains visible.
 * The arc has a curved parabolic shape with a depth/glow effect.
 */
export function GridAnimation() {
  const [mounted, setMounted] = useState(false);
  const [isDrawing, setIsDrawing] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const drawnProgressRef = useRef(0);

  // Track sparkle state per cell: Map<"col,row", startTime>
  const sparkleMapRef = useRef<Map<string, number>>(new Map());
  // Track trail persistence per cell: Map<"col,row", persistedIntensity>
  const trailMapRef = useRef<Map<string, number>>(new Map());
  const lastFrameTimeRef = useRef<number>(0);

  // Ensure client-side only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Organic easing function - combines sine wave with ease-out for natural breathing feel
  const organicEase = useCallback((t: number): number => {
    // Base ease-out cubic
    const easeOut = 1 - Math.pow(1 - t, 3);
    // Add subtle sine wave variation for organic feel
    const sineVariation = Math.sin(t * Math.PI * 2) * 0.02 * (1 - t);
    return Math.min(1, Math.max(0, easeOut + sineVariation));
  }, []);

  // Calculate the Y position of the arc at a given X position (creates the curve)
  const getArcY = useCallback(
    (x: number, centerY: number, width: number): number => {
      const normalizedX = (x - width / 2) / (width / 2);
      const curveOffset = ARC_CURVATURE * width * normalizedX * normalizedX;
      return centerY + curveOffset;
    },
    []
  );

  // Calculate wave delay for a cell based on distance from arc center
  const getCellWaveDelay = useCallback(
    (col: number, row: number, arcY: number, width: number): number => {
      const cellX = col * GRID_SIZE + GRID_SIZE / 2;
      const cellY = row * GRID_SIZE + GRID_SIZE / 2;

      // Distance from the arc center point (middle of arc)
      const arcCenterX = width / 2;
      const distFromCenter = Math.sqrt(
        Math.pow(cellX - arcCenterX, 2) + Math.pow(cellY - arcY, 2)
      );

      // Normalize distance (0-1) and add random variation
      const maxDist = Math.sqrt(width * width + arcY * arcY);
      const normalizedDist = distFromCenter / maxDist;

      // Add per-cell random offset for organic feel
      const randomOffset = seededRandom(col, row, 789) * 0.3;

      return (
        (normalizedDist * WAVE_DELAY_FACTOR + randomOffset) * MAX_WAVE_DELAY
      );
    },
    []
  );

  // Calculate breathing multiplier for a cell at a given time
  const getCellBreathing = useCallback(
    (col: number, row: number, time: number): number => {
      // Each cell has slightly different frequency and phase
      const freqVariation =
        1 + (seededRandom(col, row, 321) - 0.5) * BREATHING_FREQ_VARIATION * 2;
      const phase = seededRandom(col, row, 654) * Math.PI * 2;

      // Sinusoidal breathing with unique frequency per cell
      const breathValue = Math.sin(
        time * BREATHING_SPEED * freqVariation + phase
      );

      // Map from [-1, 1] to [1-amplitude, 1+amplitude]
      return 1 + breathValue * BREATHING_AMPLITUDE;
    },
    []
  );

  // Calculate irregular edge modifier - extends or contracts the effective boundary
  const getCellEdgeModifier = useCallback(
    (col: number, row: number, normalizedDist: number): number => {
      // Only apply to cells near the edge (normalizedDist close to 1)
      if (normalizedDist < 0.6) return 0;

      // Use deterministic noise for consistent irregular edges
      const edgeNoise = seededRandom(col * 7, row * 13, 999);

      // Some cells extend beyond, others retract
      const extension = (edgeNoise - 0.5) * 2 * EDGE_EXTENSION_RANGE;

      // Additional randomness for "missing" or "extra" pixels
      const inclusionRoll = seededRandom(col * 3, row * 5, 777);
      if (normalizedDist > 0.85) {
        // Near the very edge, randomly include/exclude
        if (inclusionRoll < EDGE_INCLUSION_THRESHOLD) {
          return extension + 8; // Extend further
        } else if (inclusionRoll > 1 - EDGE_INCLUSION_THRESHOLD) {
          return extension - 8; // Retract more
        }
      }

      return extension;
    },
    []
  );

  // Calculate sparkle effect for a cell
  const getCellSparkle = useCallback(
    (
      col: number,
      row: number,
      currentTime: number
    ): { intensityBoost: number; hueShift: number } => {
      const key = `${col},${row}`;
      const sparkleMap = sparkleMapRef.current;

      // Check if this cell is currently sparkling
      const sparkleStart = sparkleMap.get(key);
      if (sparkleStart !== undefined) {
        const elapsed = currentTime - sparkleStart;
        if (elapsed < SPARKLE_DURATION) {
          // Sparkle is active - calculate intensity with smooth envelope
          const t = elapsed / SPARKLE_DURATION;
          // Quick attack, slow decay envelope
          const envelope = t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8;
          const smoothEnvelope = envelope * envelope * (3 - 2 * envelope);

          return {
            intensityBoost: smoothEnvelope * SPARKLE_INTENSITY_BOOST,
            hueShift:
              (seededRandom(col, row, Math.floor(currentTime / 100)) - 0.5) *
              2 *
              SPARKLE_HUE_SHIFT,
          };
        } else {
          // Sparkle finished, remove it
          sparkleMap.delete(key);
        }
      }

      // Maybe start a new sparkle (time-varying probability)
      const timeNoise = Math.sin(currentTime * 0.001 + col * 0.5 + row * 0.7);
      const adjustedProb = SPARKLE_PROBABILITY * (0.5 + timeNoise * 0.5);

      if (Math.random() < adjustedProb) {
        sparkleMap.set(key, currentTime);
        return {
          intensityBoost: SPARKLE_INTENSITY_BOOST * 0.3, // Start of sparkle
          hueShift: 0,
        };
      }

      return { intensityBoost: 0, hueShift: 0 };
    },
    []
  );

  // Get trail persistence factor for a cell (slower decay for some cells)
  const getCellTrailFactor = useCallback((col: number, row: number): number => {
    // Deterministic trail speed per cell
    const trailNoise = seededRandom(col * 11, row * 17, 555);
    return (
      TRAIL_BASE_SPEED + trailNoise * TRAIL_VARIATION * (1 - TRAIL_BASE_SPEED)
    );
  }, []);

  // Draw the arc up to a certain progress point (left to right)
  const drawArc = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      progress: number,
      isFinal: boolean,
      currentTime: number = 0
    ) => {
      const { width, height } = dimensionsRef.current;
      const arcCenterY = height * ARC_CENTER_Y;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Calculate how far across the arc has been drawn
      const drawnWidth = width * progress;

      // Draw the arc glow background
      const glowOpacity = isFinal ? FINAL_OPACITY : 0.4 + progress * 0.2;

      // Draw illuminated grid cells along the arc
      const cols = Math.ceil(width / GRID_SIZE); // Always calculate all cols for wave effect
      const rows = Math.ceil(height / GRID_SIZE);

      // Calculate elapsed time in ms for wave delays
      const elapsedMs = progress * ANIMATION_DURATION;

      for (let col = 0; col < cols; col++) {
        const cellX = col * GRID_SIZE + GRID_SIZE / 2;

        // Skip cells beyond the main progress (but allow wave effect)
        if (cellX > drawnWidth + MAX_WAVE_DELAY * 0.5 && !isFinal) continue;

        // Add organic edge roughness to the arc center line
        const edgeNoise =
          (fractalNoise(cellX * 0.02, 0, 2) - 0.5) * 2 * EDGE_ROUGHNESS;
        const arcY = getArcY(cellX, arcCenterY, width) + edgeNoise;

        // Arc thickness varies: thin at edges, thick in middle (like a lens shape)
        const normalizedX = cellX / width;
        const thicknessProfile = 0.25 + 0.75 * Math.sin(normalizedX * Math.PI);

        // Add organic noise on top of the base profile
        const thicknessNoise =
          1 +
          (fractalNoise(cellX * 0.015, 100, 2) - 0.5) * 2 * THICKNESS_VARIATION;
        const localThickness =
          ARC_THICKNESS * thicknessProfile * thicknessNoise;

        for (let row = 0; row < rows; row++) {
          const cellY = row * GRID_SIZE + GRID_SIZE / 2;
          const distance = Math.abs(cellY - arcY);
          const normalizedDist = distance / (localThickness / 2);

          // Apply irregular edge modifier - extends or shrinks effective boundary
          const edgeModifier = getCellEdgeModifier(col, row, normalizedDist);
          const effectiveDistance = distance - edgeModifier;
          const effectiveNormalizedDist =
            effectiveDistance / (localThickness / 2);

          // Check if cell should be rendered (with irregular edges)
          if (effectiveNormalizedDist < 1) {
            // Calculate wave delay for this cell
            const waveDelay = getCellWaveDelay(col, row, arcY, width);

            // Calculate cell-specific appearance time
            const cellAppearTime =
              (cellX / width) * ANIMATION_DURATION + waveDelay;

            // Skip if cell hasn't appeared yet (wave effect)
            if (!isFinal && elapsedMs < cellAppearTime) continue;

            // Calculate wave fade-in (0 to 1 over 300ms after appearance)
            let waveFadeIn = 1;
            if (!isFinal) {
              const timeSinceAppear = elapsedMs - cellAppearTime;
              waveFadeIn = Math.min(1, timeSinceAppear / 300);
              // Smooth easing
              waveFadeIn = waveFadeIn * waveFadeIn * (3 - 2 * waveFadeIn);
            }

            // Calculate base intensity based on effective distance from arc center
            let intensity = Math.exp(
              -effectiveNormalizedDist * effectiveNormalizedDist * 2.5
            );

            // Add organic intensity variation using fractal noise
            const intensityNoise = fractalNoise(col * 0.3, row * 0.3, 3);
            const intensityModifier =
              1 -
              INTENSITY_VARIATION +
              intensityNoise * INTENSITY_VARIATION * 2;
            intensity *= intensityModifier;

            // Add subtle cell-level randomness for texture
            const cellNoise = seededRandom(col, row, 42);
            intensity *= 0.92 + cellNoise * 0.16; // Small per-cell variation

            // Apply breathing effect (continuous subtle pulsing)
            const breathingMultiplier = getCellBreathing(col, row, currentTime);
            intensity *= breathingMultiplier;

            // Apply sparkle effect
            const sparkle = getCellSparkle(col, row, currentTime);
            intensity += sparkle.intensityBoost;

            // Add organic fade effect for cells near the drawing edge
            let edgeFade = 1;
            if (!isFinal) {
              const distFromEdge = drawnWidth - cellX;
              // Vary fade distance organically per cell
              const fadeDistance = 60 + seededRandom(col, row, 123) * 30;
              if (distFromEdge < fadeDistance && distFromEdge > 0) {
                // Use smoothstep for more organic fade
                const t = distFromEdge / fadeDistance;
                edgeFade = t * t * (3 - 2 * t);
              }
            }

            let finalIntensity =
              intensity * edgeFade * glowOpacity * waveFadeIn;

            // Apply trail persistence - blend with previous frame's intensity
            const cellKey = `${col},${row}`;
            const trailMap = trailMapRef.current;
            const prevIntensity = trailMap.get(cellKey) || 0;
            const trailFactor = getCellTrailFactor(col, row);

            // Trail effect: if current intensity is lower than persisted, fade slowly
            if (finalIntensity < prevIntensity) {
              const persistedIntensity = prevIntensity * trailFactor;
              if (persistedIntensity > finalIntensity) {
                finalIntensity = persistedIntensity;
              }
            }
            // Store current intensity for next frame
            trailMap.set(cellKey, finalIntensity);

            if (finalIntensity > 0.02) {
              // Add organic hue variation (subtle shifts within blue range)
              const hueNoise = fractalNoise(col * 0.25, row * 0.25, 2);
              let hue = 214 + (hueNoise - 0.5) * 2 * HUE_VARIATION;

              // Apply sparkle hue shift
              hue += sparkle.hueShift;

              // Vary saturation organically (boost for sparkles)
              const satNoise = seededRandom(col + 100, row + 100, 99);
              const saturation =
                60 +
                intensity * 35 +
                satNoise * 10 +
                sparkle.intensityBoost * 20;

              // Vary lightness with subtle organic variation (boost for sparkles)
              const lightNoise = seededRandom(col + 200, row + 200, 77);
              const lightness =
                52 +
                intensity * 18 +
                lightNoise * 6 +
                sparkle.intensityBoost * 15;

              const alpha = Math.min(1, finalIntensity * 0.9);

              ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

              // Add glow for high-intensity cells with slight variation
              if (intensity > 0.5 || sparkle.intensityBoost > 0.2) {
                const glowStrength =
                  0.3 +
                  seededRandom(col, row, 55) * 0.2 +
                  sparkle.intensityBoost * 0.3;
                ctx.shadowColor = `rgba(58, 123, 213, ${glowStrength})`;
                ctx.shadowBlur =
                  5 +
                  seededRandom(col, row, 66) * 3 +
                  sparkle.intensityBoost * 5;
              } else {
                ctx.shadowBlur = 0;
              }

              const x = col * GRID_SIZE;
              const y = row * GRID_SIZE;
              ctx.beginPath();
              ctx.roundRect(x, y, GRID_SIZE - 0.5, GRID_SIZE - 0.5, 1);
              ctx.fill();
            }
          }
        }
      }
    },
    [
      getArcY,
      getCellWaveDelay,
      getCellBreathing,
      getCellEdgeModifier,
      getCellSparkle,
      getCellTrailFactor,
    ]
  );

  // Main animation loop
  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const easedProgress = organicEase(progress);

      drawnProgressRef.current = easedProgress;
      drawArc(ctx, easedProgress, false, timestamp);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete - transition to breathing loop
        setIsDrawing(false);
      }
    },
    [organicEase, drawArc]
  );

  // Breathing animation loop (runs continuously after initial draw)
  const breathe = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      drawArc(ctx, 1, true, timestamp);
      animationRef.current = requestAnimationFrame(breathe);
    },
    [drawArc]
  );

  // Initialize canvas and start animation
  useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      dimensionsRef.current = {
        width: rect.width,
        height: rect.height,
      };
    };

    updateDimensions();

    if (isDrawing) {
      // Start initial arc drawing animation
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Start breathing animation loop
      animationRef.current = requestAnimationFrame(breathe);
    }

    // Handle resize
    window.addEventListener("resize", updateDimensions);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", updateDimensions);
    };
  }, [mounted, isDrawing, animate, breathe]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[7] overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
