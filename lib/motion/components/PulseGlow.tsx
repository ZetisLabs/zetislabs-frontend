"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { durations, glowColors } from "../config";

type PulseGlowProps = {
  /** Additional CSS classes */
  className?: string;
  /** Glow color (default: accent blue) */
  color?: string;
  /** Size in pixels (default: 6) */
  size?: number;
};

/**
 * PulseGlow - Animated pulsing dot with glow effect
 *
 * Perfect for status indicators, eyebrow badges, and attention-grabbing dots.
 * Creates a smooth infinite pulse animation with glowing box-shadow.
 *
 * @example
 * ```tsx
 * <PulseGlow className="rounded-full bg-accent" />
 *
 * <PulseGlow
 *   color="rgba(34, 197, 94, 0.7)"
 *   size={8}
 *   className="rounded-full bg-green-500"
 * />
 * ```
 */
export const PulseGlow = ({
  className = "",
  color = glowColors.accent,
  size = 6,
}: PulseGlowProps) => {
  const prefersReducedMotion = useReducedMotion();

  // Prevent hydration mismatch
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const shouldAnimate = hasMounted && !prefersReducedMotion;

  return (
    <motion.span
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
      }}
      animate={
        shouldAnimate
          ? {
              scale: [1, 1.08, 1],
              boxShadow: [
                `0 0 3px ${color}, 0 0 6px ${color}`,
                `0 0 6px ${color}, 0 0 12px ${color}, 0 0 18px ${color}`,
                `0 0 3px ${color}, 0 0 6px ${color}`,
              ],
            }
          : undefined
      }
      transition={
        shouldAnimate
          ? {
              duration: durations.pulse,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
    />
  );
};
