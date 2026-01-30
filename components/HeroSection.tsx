"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  PulseGlow,
  easings,
  durations,
} from "@/lib/motion";
import { EyebrowBadge } from "@/lib/ui";

import type { HeroContent } from "@/lib/sections/types";

type HeroSectionProps = HeroContent;

export function HeroSection({
  eyebrow,
  title,
  subtitle,
  cta,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Prevent hydration mismatch by only showing motion elements after mount
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Combine: show halos only after mount AND if user doesn't prefer reduced motion
  const showAnimatedHalos = hasMounted && !prefersReducedMotion;

  // Scroll-driven fade out
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // "Sunset" effect - smooth fade with scale shrinking inward
  // Faster transition - completes around 35% scroll

  // Halo - fades and shrinks
  const haloOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const haloScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);

  // Eyebrow - starts immediately, shrinks slightly
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const eyebrowScale = useTransform(scrollYProgress, [0, 0.32], [1, 0.92]);

  // Title - shrinks more noticeably (main focal point)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.88]);

  // Subtitle - subtle shrink
  const subtitleOpacity = useTransform(scrollYProgress, [0.02, 0.35], [1, 0]);
  const subtitleScale = useTransform(scrollYProgress, [0.02, 0.35], [1, 0.94]);

  // CTAs - subtle shrink
  const ctaOpacity = useTransform(scrollYProgress, [0.04, 0.35], [1, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.04, 0.35], [1, 0.95]);

  // Global container opacity - used to hide the fixed container completely
  const containerOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={sectionRef} className="relative isolate h-[115vh] w-full">
      {/* Fixed container - stays absolutely fixed in viewport center */}
      <motion.div
        className="fixed inset-0 z-10 flex h-screen w-full items-center justify-center"
        style={{
          opacity: containerOpacity,
          pointerEvents: useTransform(containerOpacity, (v) =>
            v < 0.1 ? "none" : "auto"
          ),
        }}
      >
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl pt-24 text-center md:pt-32">
            {/* Eyebrow with scroll fade */}
            <motion.div
              className="hero-entrance hero-entrance-1"
              style={{ opacity: eyebrowOpacity, scale: eyebrowScale }}
            >
              <EyebrowBadge>
                <PulseGlow className="rounded-full bg-accent" />
                {eyebrow}
              </EyebrowBadge>
            </motion.div>

            {/* Title with scroll fade */}
            <motion.div
              className="hero-entrance hero-entrance-2"
              style={{ opacity: titleOpacity, scale: titleScale }}
            >
              {/* Breathing Halo - fades out FIRST like a sunset */}
              <div className="relative mx-auto">
                {showAnimatedHalos && (
                  <>
                    {/* Primary halo */}
                    <motion.div
                      className="pointer-events-none absolute top-1/2 left-1/2 -z-10 rounded-full"
                      style={{
                        width: 950,
                        height: 350,
                        x: "-50%",
                        y: "-50%",
                        background:
                          "radial-gradient(circle, rgba(90, 130, 255, 0.12), transparent 70%)",
                        filter: "blur(60px)",
                        opacity: haloOpacity,
                        scale: haloScale,
                      }}
                      animate={{
                        scale: [0.96, 1.03, 0.97],
                      }}
                      transition={{
                        duration: durations.breathing.a,
                        repeat: Infinity,
                        ease: easings.breathing,
                      }}
                    />
                    {/* Secondary halo */}
                    <motion.div
                      className="pointer-events-none absolute top-1/2 left-1/2 -z-10 rounded-full"
                      style={{
                        width: 720,
                        height: 266,
                        x: "-50%",
                        y: "-50%",
                        background:
                          "radial-gradient(circle, rgba(90, 130, 255, 0.14), transparent 70%)",
                        filter: "blur(60px)",
                        opacity: useTransform(haloOpacity, (v) => v * 0.2),
                        scale: haloScale,
                      }}
                      animate={{
                        scale: [0.94, 1.02, 0.95],
                      }}
                      transition={{
                        duration: durations.breathing.b,
                        repeat: Infinity,
                        ease: easings.breathing,
                      }}
                    />
                  </>
                )}
                <h1 className="text-4xl leading-[1.15] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  <span className="font-semibold">{title.default}</span>
                  <span className="font-normal text-foreground/90">
                    {title.thin}
                  </span>
                  <span className="glass-text font-semibold">
                    {title.accent}
                  </span>
                </h1>
              </div>
            </motion.div>

            {/* Subtitle with scroll fade */}
            <motion.p
              className="hero-entrance hero-entrance-3 mx-auto mt-6 max-w-2xl text-pretty text-foreground/75 sm:text-lg"
              style={{ opacity: subtitleOpacity, scale: subtitleScale }}
            >
              {subtitle}
            </motion.p>

            {/* CTAs with scroll fade */}
            <motion.div
              className="hero-entrance hero-entrance-4 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10"
              style={{ opacity: ctaOpacity, scale: ctaScale }}
            >
              {/* Primary CTA with its own breathing halo */}
              <div className="relative">
                {showAnimatedHalos && (
                  <motion.div
                    className="pointer-events-none absolute top-1/2 left-1/2 -z-10 rounded-full"
                    style={{
                      width: 420,
                      height: 420,
                      x: "-50%",
                      y: "-50%",
                      background:
                        "radial-gradient(circle, rgba(90, 130, 255, 0.12), transparent 70%)",
                      filter: "blur(60px)",
                      opacity: haloOpacity,
                    }}
                    animate={{
                      scale: [0.96, 1.03, 0.97],
                      opacity: [0.2, 0.55, 0.2],
                    }}
                    transition={{
                      duration: durations.breathing.a,
                      repeat: Infinity,
                      ease: easings.breathing,
                    }}
                  />
                )}
                <motion.a
                  href={cta.primary.href}
                  className="group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-accent px-8 py-3.5 font-semibold text-background shadow-[0_8px_30px_rgb(58,123,213,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  aria-label={cta.primary.ariaLabel}
                >
                  {/* Glass Sheen Effect */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Animated Light Sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: ["−100%", "200%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />

                  <span className="relative z-10">{cta.primary.label}</span>

                  <motion.div
                    className="relative z-10"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 drop-shadow-sm"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </motion.div>

                  {/* Geometric "Cell" Accent - Echoing the background grid */}
                  <div className="absolute top-0 left-0 m-1.5 h-2 w-2 border-t-2 border-l-2 border-white/40 opacity-60" />
                </motion.a>
              </div>
              <motion.a
                href={cta.secondary.href}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-card/40 px-8 py-3 text-base font-medium text-foreground/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:border-accent/30 hover:bg-card/60 hover:text-foreground hover:shadow-[0_10px_25px_-5px_rgba(58,123,213,0.12)]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                aria-label={cta.secondary.ariaLabel}
              >
                {/* Layered Glass Depth (Inner Border) */}
                <div className="pointer-events-none absolute inset-[1px] rounded-[11px] border border-white/80 opacity-60" />

                {/* Subtle Radial Hover Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(58,123,213,0.05)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Animated Light Sweep */}
                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />

                <span className="relative z-10 flex items-center gap-2">
                  {cta.secondary.label}
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 translate-x-0 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
