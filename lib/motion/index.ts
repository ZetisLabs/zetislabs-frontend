/**
 * Motion Library
 *
 * A reusable Framer Motion animation library for React applications.
 * Easily extractable for use across multiple projects.
 *
 * @example
 * ```tsx
 * import {
 *   Reveal,
 *   FadeIn,
 *   StaggerContainer,
 *   StaggerItem,
 *   ScrollFade,
 *   HoverScale,
 *   PulseGlow,
 *   BreathingHalo,
 *   motion,
 *   useInView,
 *   fadeInUp,
 *   hoverScale,
 *   transitions,
 *   easings,
 * } from "@/lib/motion";
 * ```
 */

// Configuration
export * from "./config";

// Variants
export * from "./variants";

// Components
export {
  Reveal,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScrollFade,
  HoverScale,
  PulseGlow,
  BreathingHalo,
  GridBackground,
  CardReveal,
  FloatingCardsShowcase,
  CardCarousel,
} from "./components";

// Re-export commonly used Framer Motion utilities
export {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  useAnimation,
  useMotionValue,
  useSpring,
} from "framer-motion";

// Re-export types for TypeScript users
export type { Variants, MotionProps } from "framer-motion";
