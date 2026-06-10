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
  // For scroll reveals (used by Reveal)
  reveal: {
    duration: durations.reveal,
    ease: easings.easeOut,
  },
};
