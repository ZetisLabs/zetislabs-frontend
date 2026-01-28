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
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

type HeroSectionProps = {
  eyebrowText: string;
  titleDefault: string;
  titleThin: string;
  titleAccent: string;
  subtitle: string;
  ctaText: string;
  ctaSecondaryText: string;
  ctaSecondaryAriaLabel: string;
};

export function HeroSection({
  eyebrowText,
  titleDefault,
  titleThin,
  titleAccent,
  subtitle,
  ctaText,
  ctaSecondaryText,
  ctaSecondaryAriaLabel,
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
                {eyebrowText}
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
                  <span className="font-semibold">{titleDefault}</span>
                  <span className="font-normal text-foreground/90">
                    {titleThin}
                  </span>
                  <span className="glass-text font-semibold">
                    {titleAccent}
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
                  href="#"
                  className="inline-flex w-auto items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-base font-medium text-background shadow-sm shadow-accent/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {ctaText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
              <motion.a
                href="#examples"
                className="inline-flex w-auto items-center justify-center gap-2 rounded-full border border-border/60 bg-transparent px-6 py-2.5 text-base font-medium text-foreground/80"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                aria-label={ctaSecondaryAriaLabel}
              >
                {ctaSecondaryText}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
