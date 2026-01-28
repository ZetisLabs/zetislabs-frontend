"use client";

import { type ReactNode, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "../variants";

type StaggerContainerProps = {
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Delay between each child animation (seconds) */
  staggerDelay?: number;
  /** Initial delay before first child animates (seconds) */
  initialDelay?: number;
};

/**
 * StaggerContainer - Container for staggered child animations
 *
 * Wrap multiple StaggerItem components to create cascading animations.
 * Children animate one after another with configurable timing.
 *
 * @example
 * ```tsx
 * <StaggerContainer staggerDelay={0.15} initialDelay={0.5}>
 *   <StaggerItem><Card /></StaggerItem>
 *   <StaggerItem><Card /></StaggerItem>
 *   <StaggerItem><Card /></StaggerItem>
 * </StaggerContainer>
 * ```
 */
export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerContainerProps) => {
  const prefersReducedMotion = useReducedMotion();

  // Prevent hydration mismatch
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const shouldAnimate = hasMounted && !prefersReducedMotion;

  return (
    <motion.div
      className={className}
      variants={
        shouldAnimate ? staggerContainer(staggerDelay, initialDelay) : undefined
      }
      initial={shouldAnimate ? "hidden" : false}
      animate={shouldAnimate ? "visible" : undefined}
    >
      {children}
    </motion.div>
  );
};

type StaggerItemProps = {
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
};

/**
 * StaggerItem - Child component for StaggerContainer
 *
 * Must be used inside a StaggerContainer. Automatically inherits
 * stagger timing from parent.
 *
 * @example
 * ```tsx
 * <StaggerContainer>
 *   <StaggerItem className="p-4">Content 1</StaggerItem>
 *   <StaggerItem className="p-4">Content 2</StaggerItem>
 * </StaggerContainer>
 * ```
 */
export const StaggerItem = ({ children, className }: StaggerItemProps) => (
  <motion.div className={className} variants={staggerItem}>
    {children}
  </motion.div>
);
