"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type ScrollFadeProps = {
  children: ReactNode;
  /** Additional CSS classes for the outer container */
  className?: string;
  /** Scroll progress where fade starts (0-1) */
  fadeStart?: number;
  /** Scroll progress where fade ends (0-1) */
  fadeEnd?: number;
  /** Include scale effect */
  scale?: boolean;
  /** Scale value at fade end */
  scaleEnd?: number;
};

/**
 * ScrollFade - Fade out content based on scroll progress
 *
 * Great for hero sections that fade away as user scrolls.
 * Uses scroll-linked animations for smooth performance.
 *
 * @example
 * ```tsx
 * <ScrollFade className="h-[120vh]">
 *   <div className="sticky top-0 h-screen">
 *     <HeroContent />
 *   </div>
 * </ScrollFade>
 * ```
 */
export const ScrollFade = ({
  children,
  className,
  fadeStart = 0,
  fadeEnd = 0.8,
  scale = true,
  scaleEnd = 0.96,
}: ScrollFadeProps) => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Prevent hydration mismatch
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [fadeStart, fadeEnd], [1, 0]);
  const scaleValue = useTransform(
    scrollYProgress,
    [fadeStart, fadeEnd],
    [1, scaleEnd]
  );

  const shouldAnimate = hasMounted && !prefersReducedMotion;

  return (
    <section ref={ref} className={className}>
      <motion.div
        style={
          shouldAnimate
            ? {
                opacity,
                scale: scale ? scaleValue : 1,
              }
            : undefined
        }
      >
        {children}
      </motion.div>
    </section>
  );
};
