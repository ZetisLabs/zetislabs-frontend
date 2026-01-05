"use client";

import { useState, useEffect } from "react";

/**
 * useReducedMotion
 *
 * Detects user preference for reduced motion.
 * Returns true if user prefers reduced motion.
 * Initializes as false for SSR, updates on mount.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   if (prefersReducedMotion) {
 *     return <StaticContent />;
 *   }
 *
 *   return <AnimatedContent />;
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check on mount and subscribe to changes
    // This is intentional - we need to check browser preferences after hydration
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
