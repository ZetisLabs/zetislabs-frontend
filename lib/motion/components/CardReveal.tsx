"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { UseInViewOptions } from "framer-motion";
import { easings, transitions } from "../config";

type CardRevealProps = {
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Only animate once (won't re-hide when scrolled out) */
  once?: boolean;
  /** Viewport margin for trigger */
  margin?: UseInViewOptions["margin"];
  /** Index for staggered animations */
  index?: number;
  /** Stagger delay multiplier (seconds) */
  staggerDelay?: number;
  /** Animation variant style */
  variant?: "fade" | "lift" | "scale" | "slide";
};

/**
 * CardReveal - Scroll-based reveal animation optimized for cards
 *
 * Provides smooth entrance animations with depth effects.
 * Supports staggered reveals for card grids.
 *
 * @example
 * ```tsx
 * {cards.map((card, i) => (
 *   <CardReveal key={i} index={i} variant="lift">
 *     <MyCard {...card} />
 *   </CardReveal>
 * ))}
 * ```
 */
export const CardReveal = ({
  children,
  className = "",
  delay = 0,
  once = true,
  margin = "-10% 0px -10% 0px",
  index = 0,
  staggerDelay = 0.1,
  variant = "lift",
}: CardRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin, once });
  const prefersReducedMotion = useReducedMotion();

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const totalDelay = delay + index * staggerDelay;

  // Animation variants based on style
  const getInitialState = () => {
    switch (variant) {
      case "fade":
        return { opacity: 0 };
      case "lift":
        return { opacity: 0, y: 40, scale: 0.98 };
      case "scale":
        return { opacity: 0, scale: 0.9 };
      case "slide":
        return { opacity: 0, x: -30 };
      default:
        return { opacity: 0, y: 40 };
    }
  };

  const getFinalState = () => {
    switch (variant) {
      case "fade":
        return { opacity: 1 };
      case "lift":
        return { opacity: 1, y: 0, scale: 1 };
      case "scale":
        return { opacity: 1, scale: 1 };
      case "slide":
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const shouldAnimate = hasMounted && !prefersReducedMotion;
  const showContent = !shouldAnimate || isInView;

  return (
    <div ref={ref} className={`h-full ${className}`}>
      <motion.div
        className="h-full"
        initial={false}
        animate={showContent ? getFinalState() : getInitialState()}
        transition={
          shouldAnimate
            ? {
                duration: 0.8,
                delay: totalDelay,
                ease: easings.smooth,
              }
            : { duration: 0 }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};
