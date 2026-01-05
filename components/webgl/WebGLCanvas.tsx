"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface WebGLCanvasProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Pause rendering when off-screen (default: true) */
  pauseWhenHidden?: boolean;
  /** Camera zoom level (default: 1) */
  zoom?: number;
}

/**
 * WebGLCanvas - Reusable WebGL canvas wrapper
 *
 * Features:
 * - Orthographic camera for 2D rendering
 * - Transparent background
 * - Auto-pause when off-screen (IntersectionObserver)
 * - Responsive sizing
 */
export function WebGLCanvas({
  children,
  className,
  style,
  pauseWhenHidden = true,
  zoom = 1,
}: WebGLCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // IntersectionObserver for visibility detection
  useEffect(() => {
    if (!pauseWhenHidden) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "50px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [pauseWhenHidden]);

  // Track container dimensions for camera setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Calculate orthographic camera frustum based on container size
  const halfWidth = dimensions.width / 2;
  const halfHeight = dimensions.height / 2;

  return (
    <div ref={containerRef} className={className} style={style}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Canvas
          orthographic
          camera={{
            zoom,
            position: [0, 0, 100],
            left: -halfWidth,
            right: halfWidth,
            top: halfHeight,
            bottom: -halfHeight,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
          frameloop={isVisible ? "always" : "never"}
          dpr={[1, 2]} // Responsive DPR, capped at 2 for performance
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
