"use client";

import { useEffect, useRef, useState } from "react";

// Accent color RGB values (matches --color-accent: #3a7bd5)
const ACCENT_RGB = "58, 123, 213";

/**
 * CursorSpotlight Component
 * Creates a torch-like glow effect that follows the cursor on the background.
 * Uses a radial gradient to simulate light emanating from the cursor position.
 */
export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Check if device has a pointer (not touch-only)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) {
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth animation loop with lerp
    const animate = () => {
      setPosition((prev) => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;

        // Lerp factor for smooth following
        const lerp = 0.12;

        return {
          x: prev.x + dx * lerp,
          y: prev.y + dy * lerp,
        };
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Don't render on touch devices or when reduced motion is preferred
  if (!isEnabled) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[6] transition-opacity duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        background: `radial-gradient(
          600px circle at ${position.x}px ${position.y}px,
          rgba(${ACCENT_RGB}, 0.1),
          rgba(${ACCENT_RGB}, 0.04) 30%,
          transparent 60%
        )`,
      }}
      aria-hidden="true"
    />
  );
}
