"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type HijackPhase = "INTRO" | "HIJACKED" | "RELEASING" | "NORMAL";

interface UseScrollHijackOptions {
  /** Sensitivity multiplier for wheel events (default: 0.0015) */
  sensitivity?: number;
  /** Duration of release transition in ms (default: 200) */
  releaseDelay?: number;
  /** Whether the intro animation has completed */
  introComplete: boolean;
  /** Callback when scroll should be locked/unlocked */
  onScrollLockChange?: (locked: boolean) => void;
}

interface UseScrollHijackReturn {
  /** Current hijack phase */
  phase: HijackPhase;
  /** Animation progress (1 = full animation, 0 = reversed) */
  progress: number;
  /** Whether scroll is currently hijacked */
  isHijacked: boolean;
}

/**
 * useScrollHijack - Manages scroll hijacking for WebGL animation control
 *
 * When hijacked, scroll input controls animation progress instead of page scroll.
 * Scrolling down decreases progress (reverses animation).
 * Scrolling up increases progress (plays animation forward).
 */
export function useScrollHijack({
  sensitivity = 0.0015,
  releaseDelay = 200,
  introComplete,
  onScrollLockChange,
}: UseScrollHijackOptions): UseScrollHijackReturn {
  const [phase, setPhase] = useState<HijackPhase>("INTRO");
  const [progress, setProgress] = useState(1);

  const touchStartY = useRef(0);
  const releaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enter hijacked phase when intro completes
  useEffect(() => {
    if (introComplete && phase === "INTRO") {
      // Check if user already scrolled past hero before intro completed
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.1;
      if (scrolledPastHero) {
        setPhase("NORMAL");
        setProgress(0);
      } else {
        setPhase("HIJACKED");
        onScrollLockChange?.(true);
      }
    }
  }, [introComplete, phase, onScrollLockChange]);

  // Transition from HIJACKED to RELEASING to NORMAL
  const triggerRelease = useCallback(() => {
    if (phase !== "HIJACKED") return;

    setPhase("RELEASING");
    onScrollLockChange?.(false);

    releaseTimeoutRef.current = setTimeout(() => {
      setPhase("NORMAL");
    }, releaseDelay);
  }, [phase, releaseDelay, onScrollLockChange]);

  // Re-enter hijacked phase when scrolling back to top
  const triggerHijack = useCallback(() => {
    if (phase !== "NORMAL") return;

    setPhase("HIJACKED");
    setProgress(0);
    onScrollLockChange?.(true);
  }, [phase, onScrollLockChange]);

  // Handle scroll delta (from wheel or touch)
  const handleScrollDelta = useCallback(
    (deltaY: number) => {
      if (phase !== "HIJACKED") return;

      setProgress((prev) => {
        // Scroll down = decrease progress (reverse animation)
        // Scroll up = increase progress (play forward)
        const newProgress = prev - deltaY * sensitivity;
        const clamped = Math.max(0, Math.min(1, newProgress));

        // Trigger release when progress reaches 0
        if (clamped <= 0 && prev > 0) {
          // Use setTimeout to avoid state update during render
          setTimeout(() => triggerRelease(), 0);
        }

        return clamped;
      });
    },
    [phase, sensitivity, triggerRelease]
  );

  // Wheel event handler
  useEffect(() => {
    if (phase !== "HIJACKED") return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleScrollDelta(e.deltaY);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [phase, handleScrollDelta]);

  // Touch event handlers
  useEffect(() => {
    if (phase !== "HIJACKED") return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;
      handleScrollDelta(deltaY * 2); // Touch needs higher sensitivity
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [phase, handleScrollDelta]);

  // Keyboard handler (arrow keys, space)
  useEffect(() => {
    if (phase !== "HIJACKED") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        handleScrollDelta(100);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        handleScrollDelta(-100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, handleScrollDelta]);

  // Re-hijack when scrolling back to top
  useEffect(() => {
    if (phase !== "NORMAL") return;

    const handleScroll = () => {
      if (window.scrollY <= 5) {
        triggerHijack();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [phase, triggerHijack]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (releaseTimeoutRef.current) {
        clearTimeout(releaseTimeoutRef.current);
      }
    };
  }, []);

  return {
    phase,
    progress,
    isHijacked: phase === "HIJACKED",
  };
}
