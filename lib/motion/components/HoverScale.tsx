"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { transitions } from "../config";

type HoverScaleProps = {
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Scale factor on hover (default 1.02) */
  scale?: number;
  /** Also scale down slightly on tap/click */
  tapScale?: number;
};

/**
 * HoverScale - Wrapper that scales content on hover
 *
 * Simple hover effect for cards, buttons, and interactive elements.
 * Includes optional tap feedback.
 *
 * @example
 * ```tsx
 * <HoverScale scale={1.05}>
 *   <Card />
 * </HoverScale>
 *
 * <HoverScale tapScale={0.98}>
 *   <Button>Click me</Button>
 * </HoverScale>
 * ```
 */
export const HoverScale = ({
  children,
  className,
  scale = 1.02,
  tapScale,
}: HoverScaleProps) => (
  <motion.div
    className={className}
    whileHover={{ scale }}
    whileTap={tapScale ? { scale: tapScale } : undefined}
    transition={transitions.hover}
  >
    {children}
  </motion.div>
);
