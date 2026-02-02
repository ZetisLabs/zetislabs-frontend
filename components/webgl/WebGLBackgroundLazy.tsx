"use client";

import { useState, useEffect, Suspense, lazy } from "react";

// Static placeholder that matches initial WebGL state
function WebGLPlaceholder() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ height: "100vh", backgroundColor: "#f8f8f8" }}
      aria-hidden="true"
    />
  );
}

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

  useEffect(() => {
    // Use requestIdleCallback for better scheduling, with setTimeout fallback
    const scheduleLoad = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(
          () => setShouldLoad(true),
          { timeout: loadDelay + 500 } // Max wait time
        );
      } else {
        setTimeout(() => setShouldLoad(true), loadDelay);
      }
    };

    // Small initial delay to ensure LCP content renders first
    const timer = setTimeout(scheduleLoad, loadDelay);

    return () => clearTimeout(timer);
  }, [loadDelay]);

  // Track when WebGL is actually loaded and rendered
  useEffect(() => {
    if (shouldLoad) {
      // Give the component a moment to mount
      const timer = setTimeout(() => setIsLoaded(true), 50);
      return () => clearTimeout(timer);
    }
  }, [shouldLoad]);

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

      {/* Load WebGL when ready */}
      {shouldLoad && (
        <Suspense fallback={null}>
          <WebGLBackground animationMode={animationMode} />
        </Suspense>
      )}
    </>
  );
}
