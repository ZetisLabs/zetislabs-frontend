"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { UseInViewOptions } from "framer-motion";
import { transitions } from "../config";

type RevealProps = {
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation direction */
  direction?: "up" | "down";
  /** Only animate once (won't re-hide when scrolled out) */
  once?: boolean;
  /** Viewport margin for trigger - use viewportMargins from config */
  margin?: UseInViewOptions["margin"];
  /** Distance to slide (pixels) */
  distance?: number;
};

/**
 * Reveal - Scroll-based reveal animation component
 *
 * Animates children into view when they enter the viewport.
 * Supports bi-directional reveals (re-hides when scrolled out) by default.
 *
 * @example
 * ```tsx
 * <Reveal>
 *   <h2>This content fades in when scrolled into view</h2>
 * </Reveal>
 *
 * <Reveal delay={0.2} direction="down" once>
 *   <p>Slides down with delay, only animates once</p>
 * </Reveal>
 * ```
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  once = false,
  margin = "-16% 0px -15% 0px",
  distance = 20,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin, once });
  const prefersReducedMotion = useReducedMotion();

  // Prevent hydration mismatch - always render same structure
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Direction determines initial position
  const y = direction === "up" ? distance : -distance;

  // Determine if we should animate
  // - Before mount: show content immediately (SSR-safe)
  // - After mount with reduced motion: show content immediately
  // - After mount without reduced motion: animate based on isInView
  const shouldAnimate = hasMounted && !prefersReducedMotion;
  const showContent = !shouldAnimate || isInView;

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full"
        initial={false}
        animate={{
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : y,
        }}
        transition={
          shouldAnimate ? { delay, ...transitions.reveal } : { duration: 0 }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};
