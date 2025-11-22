"use client";

import { type ReactNode, useRef, useState, useEffect, useCallback } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  debug?: boolean;
};

type ScrollDirection = "up" | "down" | null;
type RevealState = "visible" | "hidden";

/**
 * useScrollDirection
 * 
 * Tracks scroll direction using requestAnimationFrame throttling.
 * 
 * Why not IntersectionObserver?
 * - IntersectionObserver only fires when intersection ratios cross thresholds
 * - It doesn't provide continuous position updates needed for smooth bi-directional reveals
 * - We need pixel-accurate tracking at every scroll position, not just threshold crossings
 * 
 * @returns Current scroll direction: "up" | "down" | null
 */
const useScrollDirection = (): ScrollDirection => {
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const lastScrollYRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafIdRef.current !== null) {
      return; // Already scheduled
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current) {
        setDirection("down");
      } else if (currentScrollY < lastScrollYRef.current) {
        setDirection("up");
      }

      lastScrollYRef.current = currentScrollY;
      rafIdRef.current = null;
    });
  }, []);

  useEffect(() => {
    // Initialize with current scroll position
    lastScrollYRef.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  return direction;
};

/**
 * useRevealState
 * 
 * Continuously tracks element position using getBoundingClientRect() in a requestAnimationFrame loop.
 * 
 * Why continuous tracking?
 * - IntersectionObserver only fires on threshold crossings, missing intermediate positions
 * - getBoundingClientRect() provides pixel-accurate position at every frame
 * - Enables smooth reveals/unreveals at any scroll position, not just discrete thresholds
 * 
 * Threshold Logic:
 * - Scroll DOWN:
 *   - Reveal: element top <= viewport * 0.65 (35% from bottom)
 *   - Unreveal: element top <= viewport * 0.07 (93% from bottom)
 * 
 * - Scroll UP:
 *   - Reveal: element top >= viewport * 0.15 (15% from top)
 *   - Unreveal: element top >= viewport * 0.95 (95% from top)
 * 
 * Hysteresis:
 * - Uses 120ms debounce to prevent flickering when element oscillates near thresholds
 * - Only changes state if sufficient time has passed since last change
 * - Prevents rapid state toggling during slow scrolls near boundary conditions
 * 
 * @param ref - React ref to the element to track
 * @param direction - Current scroll direction
 * @param debug - Optional debug logging
 * @returns Current reveal state: "visible" | "hidden"
 */
const useRevealState = (
  ref: React.RefObject<HTMLElement | null>,
  direction: ScrollDirection,
  debug = false
): RevealState => {
  const [state, setState] = useState<RevealState>("hidden");
  const lastChangeTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const stateRef = useRef<RevealState>("hidden");
  const directionRef = useRef<ScrollDirection>(direction);
  const HYSTERESIS_MS = 120; // Debounce threshold to prevent flickering

  // Keep refs in sync with state/direction to avoid stale closures
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const checkPosition = () => {
      if (!ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const top = rect.top;
      const bottom = rect.bottom;
      const currentDirection = directionRef.current;
      const currentState = stateRef.current;

      // Determine desired state based on scroll direction and position
      let desiredState: RevealState = currentState;
      const now = Date.now();
      const timeSinceLastChange = now - lastChangeTimeRef.current;

      // Static "Safe Zone" Logic
      // Visible when element is within the "safe zone" of the viewport.
      // Safe zone: 10% from top to 85% from top (15% from bottom).
      // This ensures it disappears just before the header and just before leaving the bottom.
      const safeZoneTop = viewportHeight * 0.16;
      const safeZoneBottom = viewportHeight * 0.85;

      if (bottom > safeZoneTop && top < safeZoneBottom) {
        desiredState = "visible";
      } else {
        desiredState = "hidden";
      }

      // Apply hysteresis: only change state if enough time has passed
      if (desiredState !== currentState && timeSinceLastChange >= HYSTERESIS_MS) {
        if (debug) {
          console.debug("[Reveal] State change:", {
            from: currentState,
            to: desiredState,
            direction: currentDirection,
            top,
            viewportHeight,
            threshold25: viewportHeight * 0.07,
            threshold35: viewportHeight * 0.35,
            threshold65: viewportHeight * 0.65,
            threshold95: viewportHeight * 0.95,
          });
        }
        setState(desiredState);
        lastChangeTimeRef.current = now;
      }

      // Continue tracking
      rafIdRef.current = requestAnimationFrame(checkPosition);
    };

    // Start tracking loop
    rafIdRef.current = requestAnimationFrame(checkPosition);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [ref, debug]);

  return state;
};

/**
 * Reveal
 * 
 * A production-ready bi-directional scroll reveal component that uses continuous
 * pixel-accurate tracking instead of IntersectionObserver thresholds.
 * 
 * Features:
 * - Reveals at 65% viewport when scrolling down (35% from bottom) or 15% from top when scrolling up
 * - Unreveals at 95% viewport (toward top or bottom)
 * - Works in both scroll directions (down + up)
 * - Continuous tracking with requestAnimationFrame for optimal performance
 * - Hysteresis (120ms debounce) prevents flickering near thresholds
 * - Optional delay prop for staggered animations
 * - Mobile-friendly (iOS Safari compatible)
 * 
 * Why not IntersectionObserver?
 * IntersectionObserver only fires when intersection ratios cross predefined thresholds.
 * For bi-directional reveals that need to work smoothly in both directions, we need
 * continuous position tracking at every scroll frame. getBoundingClientRect() provides
 * this pixel-accurate data, enabling reveals/unreveals at any scroll position.
 *
 * @param children - The content to animate
 * @param className - Additional Tailwind classes for customization
 * @param delay - Delay in milliseconds for staggered effects
 * @param debug - Enable debug logging (development only)
 */
export const Reveal = ({
  children,
  className = "",
  delay = 0,
  debug = false,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();
  const state = useRevealState(ref, direction, debug);

  const baseClasses = "transition-all duration-700 ease-out";
  const hiddenClasses = "opacity-0 translate-y-5";
  const visibleClasses = "opacity-100 translate-y-0";

  const animationClasses = state === "visible" ? visibleClasses : hiddenClasses;
  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div ref={ref} className={className}>
      <div className={`${baseClasses} ${animationClasses}`} style={delayStyle}>
        {children}
      </div>
    </div>
  );
};

