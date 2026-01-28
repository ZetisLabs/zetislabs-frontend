/**
 * Motion Library - Configuration
 *
 * Centralized animation configuration for consistent effects across the app.
 * Easily extractable for reuse in other projects.
 */

// Custom easing curves
export const easings = {
  // Apple-style smooth easing - great for entrances
  smooth: [0.16, 1, 0.3, 1] as const,
  // Standard ease-out - good for most transitions
  easeOut: [0, 0, 0.58, 1] as const,
  // Biological breathing curve - organic feel
  breathing: [0.25, 0.1, 0.25, 1] as const,
  // Ease-in-out for symmetric animations
  easeInOut: [0.42, 0, 0.58, 1] as const,
};

// Spring physics presets
export const springs = {
  // Gentle spring - subtle bounce
  gentle: { type: "spring" as const, stiffness: 100, damping: 15 },
  // Snappy spring - quick response
  snappy: { type: "spring" as const, stiffness: 300, damping: 20 },
  // Bouncy spring - playful feel
  bouncy: { type: "spring" as const, stiffness: 400, damping: 10 },
};

// Standardized durations (in seconds)
export const durations = {
  // Fast - micro-interactions, hover states
  fast: 0.3,
  // Medium - most transitions
  medium: 0.5,
  // Slow - emphasis animations
  slow: 0.7,
  // Reveal - scroll-based reveals
  reveal: 0.7,
  // Logo animations
  logo: 1.0,
  // Breathing halo cycles
  breathing: { a: 9, b: 11 },
  // Pulse animation
  pulse: 2,
};

// Ready-to-use transition presets
export const transitions = {
  // For scroll reveals
  reveal: {
    duration: durations.reveal,
    ease: easings.easeOut,
  },
  // For hover effects
  hover: {
    duration: durations.fast,
    ease: easings.easeOut,
  },
  // For smooth entrances
  smooth: {
    duration: durations.slow,
    ease: easings.smooth,
  },
  // For staggered children
  stagger: {
    staggerChildren: 0.1,
    delayChildren: 0.2,
  },
  // For logo animations
  logo: {
    duration: durations.logo,
    ease: easings.easeOut,
  },
};

// Viewport margins for scroll triggers
export const viewportMargins = {
  // Default reveal margin (16% from top, 15% from bottom)
  default: "-16% 0px -15% 0px",
  // Aggressive - triggers earlier
  early: "-10% 0px -10% 0px",
  // Conservative - triggers later
  late: "-25% 0px -25% 0px",
};

// Color presets for glows and halos
export const glowColors = {
  // Primary accent blue
  accent: "rgba(58, 123, 213, 0.7)",
  // Soft blue for halos
  halo: "rgba(90, 130, 255, 0.12)",
  // Intense blue for emphasis
  intense: "rgba(90, 130, 255, 0.14)",
};
