"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { useWebGLAnimationMode } from "@/components/providers";

// Lazy load the WebGL component - Three.js bundle won't load until needed
const WebGLBackground = lazy(() =>
  import("./WebGLBackground").then((mod) => ({ default: mod.WebGLBackground }))
);

interface WebGLBackgroundLazyProps {
  animationMode?: "none" | "intro" | "idle" | "blog";
  /**
   * Delay in ms before starting to load WebGL.
   * Default: 100ms - allows LCP content to render first.
   * Set to 0 for immediate loading.
   */
  loadDelay?: number;
}

/**
 * WebGLBackgroundLazy - Deferred loading wrapper for WebGLBackground
 *
 * Performance optimization that:
 * 1. Shows static placeholder immediately (no JS execution)
 * 2. Defers Three.js bundle loading until after LCP
 * 3. Smooth transition from placeholder to animated background
 *
 * This reduces initial JS execution by ~400-600ms (Three.js + shaders)
 */
export function WebGLBackgroundLazy({
  animationMode = "intro",
  loadDelay = 100,
}: WebGLBackgroundLazyProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // A child layout (e.g. blog) can set the mode to "none" to disable the WebGL
  // background entirely. Because <WebGLBackground> is only rendered when enabled,
  // React.lazy never imports the Three.js chunk on those routes.
  const { animationMode: contextMode } = useWebGLAnimationMode();
  const webglEnabled = contextMode !== "none";

  useEffect(() => {
    // Defer loading Three.js until the browser is idle, so it doesn't compete
    // with React hydration / the hero content paint.
    const scheduleLoad = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setShouldLoad(true), {
          timeout: loadDelay + 500,
        });
      } else {
        setTimeout(() => setShouldLoad(true), loadDelay);
      }
    };
    const timer = setTimeout(scheduleLoad, loadDelay);
    return () => clearTimeout(timer);
  }, [loadDelay]);

  // Track when WebGL is actually loaded and rendered
  useEffect(() => {
    if (shouldLoad && webglEnabled) {
      // Give the component a moment to mount
      const timer = setTimeout(() => setIsLoaded(true), 50);
      return () => clearTimeout(timer);
    }
  }, [shouldLoad, webglEnabled]);

  return (
    <>
      {/* Placeholder fades out as WebGL loads */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          height: "100vh",
          backgroundColor: "#f8f8f8",
          opacity: isLoaded ? 0 : 1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Load WebGL when ready — skipped entirely when disabled (mode "none") */}
      {shouldLoad && webglEnabled && (
        <Suspense fallback={null}>
          <WebGLBackground animationMode={animationMode} />
        </Suspense>
      )}
    </>
  );
}
