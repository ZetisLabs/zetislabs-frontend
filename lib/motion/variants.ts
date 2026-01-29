/**
 * Motion Library - Variants
 *
 * Reusable animation variants for Framer Motion.
 * Use these with the `variants` prop on motion components.
 */

import type { Variants } from "framer-motion";
import { transitions, easings } from "./config";

// ============================================
// ENTRANCE ANIMATIONS
// ============================================

/**
 * Fade in from bottom with slide up
 * @param delay - Delay before animation starts (seconds)
 */
export const fadeInUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, ...transitions.reveal },
  },
});

/**
 * Fade in from top with slide down
 * @param delay - Delay before animation starts (seconds)
 */
export const fadeInDown = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, ...transitions.reveal },
  },
});

/**
 * Fade in with scale
 * @param delay - Delay before animation starts (seconds)
 */
export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay, ...transitions.reveal },
  },
});

/**
 * Slide in from left
 * @param distance - Distance to slide from (pixels)
 */
export const slideInLeft = (distance = 32): Variants => ({
  hidden: { opacity: 0, x: -distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.reveal,
  },
});

/**
 * Slide in from right
 * @param distance - Distance to slide from (pixels)
 */
export const slideInRight = (distance = 32): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.reveal,
  },
});

// ============================================
// CONTAINER ANIMATIONS (for staggered children)
// ============================================

/**
 * Container for staggered child animations
 * @param staggerChildren - Delay between each child (seconds)
 * @param delayChildren - Initial delay before first child (seconds)
 */
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

/**
 * Child item for stagger container
 * Uses parent's stagger timing automatically
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
};

// ============================================
// HOVER ANIMATIONS
// ============================================

/**
 * Scale up on hover
 * @param scale - Target scale (default 1.02)
 */
export const hoverScale = (scale = 1.02): Variants => ({
  rest: { scale: 1 },
  hover: { scale },
});

/**
 * Lift up with shadow on hover
 * @param y - Vertical lift distance (pixels, negative = up)
 */
export const hoverLift = (y = -4): Variants => ({
  rest: {
    y: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    y,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
  },
});

/**
 * Combined scale and lift hover effect
 */
export const hoverScaleLift: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
  },
};

/**
 * Rotate on hover
 * @param degrees - Rotation angle in degrees
 */
export const hoverRotate = (degrees = 180): Variants => ({
  rest: { rotate: 0 },
  hover: { rotate: degrees },
});

// ============================================
// REVEAL ANIMATIONS (for scroll-based reveals)
// ============================================

/**
 * Bi-directional reveal (different animations based on scroll direction)
 * Use with isInView state
 */
export const revealBidirectional: Variants = {
  visible: { opacity: 1, y: 0 },
  hiddenTop: { opacity: 0, y: -20 },
  hiddenBottom: { opacity: 0, y: 20 },
};

// ============================================
// SPECIAL EFFECTS
// ============================================

/**
 * Fade in overlay (for gradient overlays)
 */
export const fadeOverlay: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

/**
 * Expand width (for underlines, progress bars)
 * @param from - Starting width (CSS value)
 * @param to - Target width (CSS value)
 */
export const expandWidth = (from = "3rem", to = "100%"): Variants => ({
  rest: { width: from },
  hover: { width: to },
});

/**
 * Slide from left and fade in (for emojis, icons)
 * @param distance - Starting offset (pixels, negative = from left)
 */
export const slideReveal = (distance = -32): Variants => ({
  rest: { x: distance, opacity: 0 },
  hover: { x: 0, opacity: 1 },
});

/**
 * Smooth easing entrance (Apple-style)
 * @param delay - Delay in seconds
 */
export const smoothEntrance = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: easings.smooth,
      delay,
    },
  },
});

// ============================================
// CARD ANIMATIONS
// ============================================

/**
 * Card with depth effect on hover (lift + shadow)
 */
export const cardDepth: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
    transition: {
      duration: 0.4,
      ease: easings.easeOut,
    },
  },
};

/**
 * Card with subtle glow effect on hover
 */
export const cardGlow: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 0 0 rgba(58, 123, 213, 0)",
  },
  hover: {
    scale: 1.01,
    boxShadow: "0 0 30px rgba(58, 123, 213, 0.15)",
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
    },
  },
};

/**
 * Card border glow effect
 */
export const cardBorderGlow: Variants = {
  rest: {
    borderColor: "rgba(226, 226, 226, 0.5)",
  },
  hover: {
    borderColor: "rgba(58, 123, 213, 0.3)",
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Inner content shift on hover (parallax-like)
 * @param distance - Shift distance in pixels
 */
export const cardContentShift = (distance = 4): Variants => ({
  rest: { y: 0 },
  hover: {
    y: -distance,
    transition: {
      duration: 0.4,
      ease: easings.easeOut,
    },
  },
});

/**
 * Grid background animation on card hover
 */
export const cardGridReveal: Variants = {
  rest: {
    opacity: 0.2,
    scale: 1,
  },
  hover: {
    opacity: 0.4,
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: easings.easeOut,
    },
  },
};

/**
 * Shimmer/shine effect for premium cards
 */
export const cardShimmer: Variants = {
  rest: {
    x: "-100%",
    opacity: 0,
  },
  hover: {
    x: "100%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easings.easeInOut,
    },
  },
};
