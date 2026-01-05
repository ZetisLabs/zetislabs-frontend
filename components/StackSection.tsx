"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

interface StackSectionProps {
  title: string;
}

const stackLogos = [
  { name: "Excel", path: "/stack-logo/Excel SVG Icons.svg" },
  { name: "Github", path: "/stack-logo/Github SVG Icons.svg" },
  { name: "Gmail", path: "/stack-logo/Gmail SVG Icons.svg" },
  { name: "Hubspot", path: "/stack-logo/Hubspot SVG Icons.svg" },
  { name: "Notion", path: "/stack-logo/Notion SVG Icons.svg" },
  { name: "OpenAI", path: "/stack-logo/OpenAI SVG Icons.svg" },
  { name: "Python", path: "/stack-logo/Python SVG Vectors.svg" },
  { name: "Slack", path: "/stack-logo/Slack SVG Icons.svg" },
  { name: "Google Calendar", path: "/stack-logo/Icône Calendrier Google.svg" },
  { name: "Airtable", path: "/stack-logo/Airtable SVG Icons.svg" },
  { name: "Google Docs", path: "/stack-logo/Google Docs SVG Icon.svg" },
];

// Random but consistent positions for each logo (like stars in the sky)
// Positioned around the title, avoiding the center area (30-70% x and y)
const logoPositions = [
  { x: 12, y: 7, depth: 0.6 }, // Excel - mid-depth, top-left
  { x: 82, y: 12, depth: 0.7 }, // Github - mid-far, top-right
  { x: 8, y: 72, depth: 0.6 }, // Gmail - mid-depth, bottom-left
  { x: 88, y: 75, depth: 0.8 }, // Hubspot - close, bottom-right
  { x: 50, y: 8, depth: 1.0 }, // Notion - mid-far, top-center
  { x: 90, y: 55, depth: 1.0 }, // OpenAI - very close, right-center
  { x: 10, y: 35, depth: 0.8 }, // Python - mid-depth, left-center
  { x: 50, y: 85, depth: 0.5 }, // Slack - far, bottom-center
  { x: 35, y: 25, depth: 0.3 }, // calendar - far, bottom-center
  { x: 70, y: 35, depth: 0.5 }, // airtable - far, bottom-center
  { x: 23, y: 85, depth: 1.0 }, // docs - far, bottom-center
];

type RevealState = "visible" | "hidden-top" | "hidden-bottom";

/**
 * Custom hook to track reveal state using scroll-driven RAF
 * Optimized to only run RAF while scrolling, stops after 150ms idle
 */
const useLogoRevealState = (
  ref: React.RefObject<HTMLElement | null>
): RevealState => {
  const [state, setState] = useState<RevealState>("hidden-bottom");
  const rafIdRef = useRef<number | null>(null);
  const stateRef = useRef<RevealState>("hidden-bottom");
  const lastChangeTimeRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const HYSTERESIS_MS = 120;
  const SCROLL_IDLE_MS = 150;

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // Check if user prefers reduced motion (only on client after hydration)
    // This setState is intentional - we must check browser preferences after hydration
    // to avoid SSR/client mismatch errors
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    prefersReducedMotionRef.current = prefersReducedMotion;
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
      const currentState = stateRef.current;

      let desiredState: RevealState = currentState;
      const now = Date.now();
      const timeSinceLastChange = now - lastChangeTimeRef.current;

      // Safe zone logic: visible when element is within viewport safe zone
      const safeZoneTop = viewportHeight * 0.16;
      const safeZoneBottom = viewportHeight * 0.85;

      if (bottom > safeZoneTop && top < safeZoneBottom) {
        desiredState = "visible";
      } else if (bottom <= safeZoneTop) {
        desiredState = "hidden-top";
      } else {
        desiredState = "hidden-bottom";
      }

      // Apply hysteresis
      if (
        desiredState !== currentState &&
        timeSinceLastChange >= HYSTERESIS_MS
      ) {
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
  }, [ref]);

  return state;
};

export function StackSection({ title }: StackSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealState = useLogoRevealState(containerRef);

  // Pre-compute static logo data (size, blur, opacity, angle, etc.)
  const logoAnimationData = useMemo(() => {
    const centerX = 50;
    const centerY = 50;
    const minSize = 20;
    const maxSize = 55;
    const distance = 150;

    return stackLogos.map((logo, index) => {
      const position = logoPositions[index];
      const size = minSize + (maxSize - minSize) * position.depth;
      const blur = (1 - position.depth) * 1.5;
      const opacity = 0.5 + position.depth * 0.5;
      const shadowIntensity = position.depth * 20;
      const delay = index * 0.08;
      const angle = Math.atan2(position.y - centerY, position.x - centerX);
      const zIndex = Math.round(position.depth * 10);
      const imageSize = Math.ceil(size * 0.6);
      const boxShadow = `0 ${4 + shadowIntensity}px ${16 + shadowIntensity}px rgba(0, 0, 0, ${0.1 + position.depth * 0.15})`;

      return {
        logo,
        position,
        size,
        blur,
        opacity,
        delay,
        angle,
        distance,
        zIndex,
        imageSize,
        boxShadow,
      };
    });
  }, []);

  return (
    <section className="flex flex-col justify-center overflow-hidden py-16 md:py-32">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="relative mx-auto max-w-6xl">
          {/* Logos Container */}
          <div
            ref={containerRef}
            className="relative mx-auto h-[500px] w-full sm:h-[600px] lg:h-[700px]"
          >
            {logoAnimationData.map((data) => {
              const {
                logo,
                position,
                size,
                blur,
                opacity,
                delay,
                angle,
                distance,
                zIndex,
                imageSize,
                boxShadow,
              } = data;

              // Determine animation based on reveal state
              let animatedX = position.x;
              let animatedY = position.y;
              let animatedScale = 1;
              let animatedOpacity = opacity;

              if (revealState === "hidden-bottom") {
                // Initial state or scrolling out bottom: logos outside viewport (black hole effect)
                animatedX = position.x + Math.cos(angle) * distance;
                animatedY = position.y + Math.sin(angle) * distance;
                animatedScale = 0.3;
                animatedOpacity = 0;
              } else if (revealState === "hidden-top") {
                // Scrolling out top: reverse black hole (logos pulled away from center)
                animatedX = position.x - Math.cos(angle) * distance;
                animatedY = position.y - Math.sin(angle) * distance;
                animatedScale = 0.3;
                animatedOpacity = 0;
              }

              return (
                <div
                  key={logo.name}
                  className="absolute transition-all duration-1000 ease-out"
                  style={{
                    left: `${animatedX}%`,
                    top: `${animatedY}%`,
                    transform: `translate(-50%, -50%) scale(${animatedScale})`,
                    filter: `blur(${blur}px)`,
                    opacity: animatedOpacity,
                    zIndex,
                    transitionDelay: `${delay}s`,
                  }}
                >
                  <div
                    className="group relative flex items-center justify-center rounded-2xl border border-border/40 bg-card shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      boxShadow,
                    }}
                  >
                    {/* Glassmorphism overlay */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    <Image
                      src={logo.path}
                      alt={logo.name}
                      width={imageSize}
                      height={imageSize}
                      className="relative z-10 object-contain"
                    />
                  </div>
                </div>
              );
            })}

            {/* Central Title - On Top */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <Reveal>
                <h2 className="max-w-4xl px-4 text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                  {title}
                </h2>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
