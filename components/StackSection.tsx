"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, Reveal } from "@/lib/motion";

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

export function StackSection({ title }: StackSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    margin: "-16% 0px -15% 0px",
    once: false,
  });
  const prefersReducedMotion = useReducedMotion();

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

      // Calculate hidden positions for "black hole" effect
      const hiddenX = position.x + Math.cos(angle) * distance;
      const hiddenY = position.y + Math.sin(angle) * distance;

      return {
        logo,
        position,
        size,
        blur,
        opacity,
        delay,
        zIndex,
        imageSize,
        boxShadow,
        hiddenX,
        hiddenY,
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
                zIndex,
                imageSize,
                boxShadow,
                hiddenX,
                hiddenY,
              } = data;

              return (
                <motion.div
                  key={logo.name}
                  className="absolute"
                  style={{
                    filter: `blur(${blur}px)`,
                    zIndex,
                  }}
                  initial={{
                    left: `${hiddenX}%`,
                    top: `${hiddenY}%`,
                    scale: 0.3,
                    opacity: 0,
                    x: "-50%",
                    y: "-50%",
                  }}
                  animate={
                    isInView
                      ? {
                          left: `${position.x}%`,
                          top: `${position.y}%`,
                          scale: 1,
                          opacity: opacity,
                          x: "-50%",
                          y: "-50%",
                        }
                      : {
                          left: `${hiddenX}%`,
                          top: `${hiddenY}%`,
                          scale: 0.3,
                          opacity: 0,
                          x: "-50%",
                          y: "-50%",
                        }
                  }
                  transition={{
                    duration: 1,
                    ease: [0, 0, 0.58, 1],
                    delay: prefersReducedMotion ? 0 : delay,
                  }}
                >
                  <motion.div
                    className="group relative flex items-center justify-center rounded-2xl border border-border/40 bg-card shadow-lg"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      boxShadow,
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glassmorphism overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      aria-hidden="true"
                    />

                    <Image
                      src={logo.path}
                      alt={logo.name}
                      width={imageSize}
                      height={imageSize}
                      className="relative z-10 object-contain"
                    />
                  </motion.div>
                </motion.div>
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
