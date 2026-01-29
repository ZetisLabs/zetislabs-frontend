"use client";

import { motion } from "framer-motion";
import { easings } from "../config";

type GridBackgroundProps = {
  /** Grid cell size in pixels */
  cellSize?: number;
  /** Line color (CSS color value) */
  lineColor?: string;
  /** Line opacity (0-1) */
  lineOpacity?: number;
  /** Animate grid on hover */
  animated?: boolean;
  /** Show radial fade from center */
  radialFade?: boolean;
  /** Additional CSS classes */
  className?: string;
};

/**
 * GridBackground - Subtle grid pattern overlay with optional animation
 *
 * Creates a premium grid background effect that adds depth to cards.
 * Can be animated on hover for interactive feel.
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <GridBackground cellSize={24} animated />
 *   <div className="relative z-10">Content</div>
 * </div>
 * ```
 */
export const GridBackground = ({
  cellSize = 32,
  lineColor = "var(--color-border)",
  lineOpacity = 0.3,
  animated = false,
  radialFade = true,
  className = "",
}: GridBackgroundProps) => {
  const gridVariants = {
    rest: {
      opacity: lineOpacity,
      scale: 1,
    },
    hover: {
      opacity: lineOpacity * 1.5,
      scale: 1.02,
    },
  };

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      variants={animated ? gridVariants : undefined}
      transition={{ duration: 0.5, ease: easings.easeOut }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${lineColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          opacity: lineOpacity,
        }}
      />

      {/* Radial fade overlay */}
      {radialFade && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, var(--color-card) 70%)`,
          }}
        />
      )}
    </motion.div>
  );
};
