"use client";

import {
  type ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  debug?: boolean;
};

type ScrollDirection = "up" | "down" | null;
type RevealState = "visible" | "hidden-top" | "hidden-bottom";

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
 * Tracks element position using getBoundingClientRect() with scroll-driven RAF.
 *
 * Optimized for performance:
 * - RAF loop only runs while scrolling (stops after 150ms idle)
 * - Hysteresis prevents flickering near thresholds
 * - Respects prefers-reduced-motion
 *
 * @param ref - React ref to the element to track
 * @param direction - Current scroll direction
 * @param debug - Optional debug logging
 * @returns Current reveal state: "visible" | "hidden-top" | "hidden-bottom"
 */
const useRevealState = (
  ref: React.RefObject<HTMLElement | null>,
  direction: ScrollDirection,
  debug = false
): RevealState => {
  const [state, setState] = useState<RevealState>("hidden-bottom");
  const lastChangeTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const stateRef = useRef<RevealState>("hidden-bottom");
  const directionRef = useRef<ScrollDirection>(direction);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);
  const HYSTERESIS_MS = 120;
  const SCROLL_IDLE_MS = 150;

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

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setState("visible");
      return;
    }

    const checkPosition = () => {
      if (!ref.current || !isScrollingRef.current) {
        rafIdRef.current = null;
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const top = rect.top;
      const bottom = rect.bottom;
      const currentDirection = directionRef.current;
      const currentState = stateRef.current;

      let desiredState: RevealState = currentState;
      const now = Date.now();
      const timeSinceLastChange = now - lastChangeTimeRef.current;

      const safeZoneTop = viewportHeight * 0.16;
      const safeZoneBottom = viewportHeight * 0.85;

      if (bottom > safeZoneTop && top < safeZoneBottom) {
        desiredState = "visible";
      } else if (bottom <= safeZoneTop) {
        desiredState = "hidden-top";
      } else {
        desiredState = "hidden-bottom";
      }

      if (
        desiredState !== currentState &&
        timeSinceLastChange >= HYSTERESIS_MS
      ) {
        if (debug) {
          console.debug("[Reveal] State change:", {
            from: currentState,
            to: desiredState,
            direction: currentDirection,
            top,
            viewportHeight,
          });
        }
        setState(desiredState);
        lastChangeTimeRef.current = now;
      }

      rafIdRef.current = requestAnimationFrame(checkPosition);
    };

    const startTracking = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(checkPosition);
        }
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, SCROLL_IDLE_MS);
    };

    // Initial check
    isScrollingRef.current = true;
    rafIdRef.current = requestAnimationFrame(checkPosition);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, SCROLL_IDLE_MS);

    window.addEventListener("scroll", startTracking, { passive: true });

    return () => {
      window.removeEventListener("scroll", startTracking);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
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

  const baseClasses = "transition-all duration-700 ease-out h-full";

  // Determine classes based on state
  let animationClasses = "";
  if (state === "visible") {
    animationClasses = "opacity-100 translate-y-0";
  } else if (state === "hidden-top") {
    // Fade UP when leaving top
    animationClasses = "opacity-0 -translate-y-5";
  } else {
    // Fade DOWN when leaving bottom (default/initial)
    animationClasses = "opacity-0 translate-y-5";
  }

  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div ref={ref} className={className}>
      <div className={`${baseClasses} ${animationClasses}`} style={delayStyle}>
        {children}
      </div>
    </div>
  );
};
