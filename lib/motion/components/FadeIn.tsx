"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { transitions, easings } from "../config";
import { useHasMounted } from "../hooks";

type FadeInProps = {
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation duration (seconds) */
  duration?: number;
  /** Initial Y offset (pixels) */
  y?: number;
};

/**
 * FadeIn - Simple fade-in animation on mount
 *
 * Fades in children with optional slide effect when component mounts.
 * Great for page entrances and initial content reveals.
 *
 * @example
 * ```tsx
 * <FadeIn>
 *   <h1>Welcome</h1>
 * </FadeIn>
 *
 * <FadeIn delay={0.2} duration={1}>
 *   <p>Delayed content</p>
 * </FadeIn>
 * ```
 */
export const FadeIn = ({
  children,
  className,
  delay = 0,
  duration,
}: FadeInProps) => {
  const prefersReducedMotion = useReducedMotion();

  const hasMounted = useHasMounted();

  const shouldAnimate = hasMounted && !prefersReducedMotion;

  return (
    <motion.div
      className={className}
      initial={false}
      animate={{
        opacity: 1,
        y: 0,
      }}
      style={{
        opacity: shouldAnimate ? undefined : 1,
        y: shouldAnimate ? undefined : 0,
      }}
      transition={
        shouldAnimate
          ? {
              delay,
              duration: duration ?? transitions.reveal.duration,
              ease: easings.smooth,
            }
          : { duration: 0 }
      }
    >
      {children}
    </motion.div>
  );
};
