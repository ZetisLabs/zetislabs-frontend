"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type AnimationMode = "none" | "intro" | "idle" | "blog";

interface WebGLAnimationModeContextValue {
  animationMode: AnimationMode;
  setAnimationMode: (mode: AnimationMode) => void;
}

const WebGLAnimationModeContext =
  createContext<WebGLAnimationModeContextValue | null>(null);

interface WebGLAnimationModeProviderProps {
  children: ReactNode;
  defaultMode?: AnimationMode;
}

/**
 * WebGLAnimationModeProvider
 *
 * Provides a context for managing the WebGL background animation mode.
 * Child layouts can override the animation mode without rendering their own WebGLBackground.
 *
 * @example
 * ```tsx
 * // In parent layout
 * <WebGLAnimationModeProvider defaultMode="intro">
 *   <WebGLBackground />
 *   {children}
 * </WebGLAnimationModeProvider>
 *
 * // In child layout (e.g., blog)
 * <WebGLAnimationModeOverride mode="blog">
 *   {children}
 * </WebGLAnimationModeOverride>
 * ```
 */
export function WebGLAnimationModeProvider({
  children,
  defaultMode = "intro",
}: WebGLAnimationModeProviderProps) {
  const [animationMode, setAnimationMode] =
    useState<AnimationMode>(defaultMode);

  return (
    <WebGLAnimationModeContext.Provider
      value={{ animationMode, setAnimationMode }}
    >
      {children}
    </WebGLAnimationModeContext.Provider>
  );
}

/**
 * Hook to access and modify the WebGL animation mode.
 */
export function useWebGLAnimationMode() {
  const context = useContext(WebGLAnimationModeContext);

  if (!context) {
    // Return default values if used outside provider
    return {
      animationMode: "intro" as AnimationMode,
      setAnimationMode: () => {},
    };
  }

  return context;
}

interface WebGLAnimationModeOverrideProps {
  children: ReactNode;
  mode: AnimationMode;
}

/**
 * WebGLAnimationModeOverride
 *
 * Override the WebGL animation mode for a specific section/layout.
 * This component sets the animation mode on mount and restores the previous mode on unmount.
 *
 * @example
 * ```tsx
 * // In blog layout
 * export default function BlogLayout({ children }) {
 *   return (
 *     <WebGLAnimationModeOverride mode="blog">
 *       {children}
 *     </WebGLAnimationModeOverride>
 *   );
 * }
 * ```
 */
export function WebGLAnimationModeOverride({
  children,
  mode,
}: WebGLAnimationModeOverrideProps) {
  const { setAnimationMode } = useWebGLAnimationMode();

  useEffect(() => {
    // Set the new mode
    setAnimationMode(mode);

    // Restore to intro mode on unmount (when navigating away)
    return () => {
      setAnimationMode("intro");
    };
  }, [mode, setAnimationMode]);

  return <>{children}</>;
}
