"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { HijackPhase } from "@/components/webgl/hooks/useScrollHijack";

interface ScrollHijackContextValue {
  /** Current hijack phase */
  phase: HijackPhase;
  /** Animation progress (1 = full, 0 = reversed) */
  progress: number;
  /** Whether scroll is currently hijacked */
  isHijacked: boolean;
  /** Whether the intro animation has completed */
  introComplete: boolean;
  /** Mark intro as complete (called by WebGLBackground) */
  setIntroComplete: (complete: boolean) => void;
  /** Update hijack phase */
  setPhase: (phase: HijackPhase) => void;
  /** Update animation progress */
  setProgress: (progress: number) => void;
  /** Lock/unlock scroll */
  setScrollLocked: (locked: boolean) => void;
}

const ScrollHijackContext = createContext<ScrollHijackContextValue | null>(
  null
);

interface ScrollHijackProviderProps {
  children: ReactNode;
}

/**
 * ScrollHijackProvider
 *
 * Provides scroll hijacking context to coordinate between
 * WebGLBackground animation and page scroll behavior.
 */
export function ScrollHijackProvider({ children }: ScrollHijackProviderProps) {
  const [phase, setPhase] = useState<HijackPhase>("INTRO");
  const [progress, setProgress] = useState(1);
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);

  // Apply scroll lock to body
  useEffect(() => {
    if (scrollLocked) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.dataset.scrollLocked = "true";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      delete document.body.dataset.scrollLocked;

      // Only restore scroll if we had saved a position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [scrollLocked]);

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Skip hijacking for users who prefer reduced motion
      setPhase("NORMAL");
      setProgress(0);
    }
  }, []);

  const handleSetIntroComplete = useCallback((complete: boolean) => {
    setIntroComplete(complete);
  }, []);

  const handleSetPhase = useCallback((newPhase: HijackPhase) => {
    setPhase(newPhase);
  }, []);

  const handleSetProgress = useCallback((newProgress: number) => {
    setProgress(newProgress);
  }, []);

  const handleSetScrollLocked = useCallback((locked: boolean) => {
    setScrollLocked(locked);
  }, []);

  const value: ScrollHijackContextValue = {
    phase,
    progress,
    isHijacked: phase === "HIJACKED",
    introComplete,
    setIntroComplete: handleSetIntroComplete,
    setPhase: handleSetPhase,
    setProgress: handleSetProgress,
    setScrollLocked: handleSetScrollLocked,
  };

  return (
    <ScrollHijackContext.Provider value={value}>
      {children}
    </ScrollHijackContext.Provider>
  );
}

/**
 * useScrollHijackContext - Access scroll hijack state from any component
 */
export function useScrollHijackContext(): ScrollHijackContextValue {
  const context = useContext(ScrollHijackContext);
  if (!context) {
    throw new Error(
      "useScrollHijackContext must be used within a ScrollHijackProvider"
    );
  }
  return context;
}
