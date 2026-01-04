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

  // Draw the arc up to a certain progress point (left to right)
  const drawArc = useCallback(
    (ctx: CanvasRenderingContext2D, progress: number, isFinal: boolean) => {
      const { width, height } = dimensionsRef.current;
      const arcCenterY = height * ARC_CENTER_Y;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Calculate how far across the arc has been drawn
      const drawnWidth = width * progress;

      // Draw the arc glow background
      const glowOpacity = isFinal ? FINAL_OPACITY : 0.4 + progress * 0.2;

      // Draw illuminated grid cells along the arc
      const cols = Math.ceil(drawnWidth / GRID_SIZE);
      const rows = Math.ceil(height / GRID_SIZE);

      for (let col = 0; col < cols; col++) {
        const cellX = col * GRID_SIZE + GRID_SIZE / 2;

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

          if (distance < localThickness / 2) {
            // Calculate base intensity based on distance from arc center
            const normalizedDist = distance / (localThickness / 2);
            let intensity = Math.exp(-normalizedDist * normalizedDist * 2.5);

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

            // Add organic fade effect for cells near the drawing edge
            let edgeFade = 1;
            if (!isFinal) {
              const distFromEdge = drawnWidth - cellX;
              // Vary fade distance organically per cell
              const fadeDistance = 60 + seededRandom(col, row, 123) * 30;
              if (distFromEdge < fadeDistance) {
                // Use smoothstep for more organic fade
                const t = distFromEdge / fadeDistance;
                edgeFade = t * t * (3 - 2 * t);
              }
            }

            const finalIntensity = intensity * edgeFade * glowOpacity;

            if (finalIntensity > 0.02) {
              // Add organic hue variation (subtle shifts within blue range)
              const hueNoise = fractalNoise(col * 0.25, row * 0.25, 2);
              const hue = 214 + (hueNoise - 0.5) * 2 * HUE_VARIATION;

              // Vary saturation organically
              const satNoise = seededRandom(col + 100, row + 100, 99);
              const saturation = 60 + intensity * 35 + satNoise * 10;

              // Vary lightness with subtle organic variation
              const lightNoise = seededRandom(col + 200, row + 200, 77);
              const lightness = 52 + intensity * 18 + lightNoise * 6;

              const alpha = finalIntensity * 0.9;

              ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

              // Add glow for high-intensity cells with slight variation
              if (intensity > 0.5) {
                const glowStrength = 0.3 + seededRandom(col, row, 55) * 0.2;
                ctx.shadowColor = `rgba(58, 123, 213, ${glowStrength})`;
                ctx.shadowBlur = 5 + seededRandom(col, row, 66) * 3;
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
    [getArcY]
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
      drawArc(ctx, easedProgress, false);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete - draw final state
        setIsDrawing(false);
        drawArc(ctx, 1, true);
      }
    },
    [organicEase, drawArc]
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

      // If animation is done, redraw at final state
      if (!isDrawing) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          drawArc(ctx, 1, true);
        }
      }
    };

    updateDimensions();

    if (isDrawing) {
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    }

    // Handle resize
    window.addEventListener("resize", updateDimensions);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", updateDimensions);
    };
  }, [mounted, isDrawing, animate, drawArc]);

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
