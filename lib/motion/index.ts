/**
 * Motion Library
 *
 * A thin wrapper over Framer Motion plus shared animation config used
 * across the site.
 *
 * @example
 * ```tsx
 * import { motion, useInView, easings, durations, useHasMounted } from "@/lib/motion";
 * ```
 */

// Hooks
export { useHasMounted } from "./hooks";

// Configuration
export * from "./config";

// Components
export { Reveal } from "./components/Reveal";

// Re-export commonly used Framer Motion utilities
export {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
  animate,
} from "framer-motion";
