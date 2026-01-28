"use client";

import { type ReactNode, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easings, durations, glowColors } from "../config";

type BreathingHaloProps = {
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Halo color (CSS color value) */
  color?: string;
  /** Halo size */
  size?: { width: number; height: number };
  /** Blur amount in pixels */
  blur?: number;
  /** Add second layer for richer effect */
  dual?: boolean;
};

/**
 * BreathingHalo - Apple-style breathing glow effect
 *
 * Creates an organic pulsing halo behind content. Great for CTAs,
 * hero titles, and featured elements.
 *
 * @example
 * ```tsx
 * <BreathingHalo>
 *   <button>Get Started</button>
 * </BreathingHalo>
 *
 * <BreathingHalo
 *   size={{ width: 800, height: 400 }}
 *   dual
 * >
 *   <h1>Hero Title</h1>
 * </BreathingHalo>
 * ```
 */
export const BreathingHalo = ({
  children,
  className = "",
  color = glowColors.halo,
  size = { width: 420, height: 420 },
  blur = 60,
  dual = false,
}: BreathingHaloProps) => {
  const prefersReducedMotion = useReducedMotion();

  // Prevent hydration mismatch - only show halos after mount
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const showHalos = hasMounted && !prefersReducedMotion;

  return (
    <div className={`relative ${className}`}>
      {/* Primary halo */}
      {showHalos && (
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 rounded-full"
          style={{
            width: size.width,
            height: size.height,
            x: "-50%",
            y: "-50%",
            background: `radial-gradient(circle, ${color}, transparent 70%)`,
            filter: `blur(${blur}px)`,
          }}
          animate={{
            scale: [0.96, 1.03, 0.97],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: durations.breathing.a,
            repeat: Infinity,
            ease: easings.breathing,
          }}
        />
      )}

      {/* Secondary halo (optional, for richer effect) */}
      {showHalos && dual && (
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 rounded-full"
          style={{
            width: size.width * 0.76, // Slightly smaller
            height: size.height * 0.76,
            x: "-50%",
            y: "-50%",
            background: `radial-gradient(circle, ${glowColors.intense}, transparent 70%)`,
            filter: `blur(${blur}px)`,
          }}
          animate={{
            scale: [0.94, 1.02, 0.95],
            opacity: [0.01, 0.04, 0.012],
          }}
          transition={{
            duration: durations.breathing.b,
            repeat: Infinity,
            ease: easings.breathing,
          }}
        />
      )}

      {children}
    </div>
  );
};
