"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, useHasMounted } from "@/lib/motion";
import { CTAButton } from "@/lib/ui";

interface CTAContentProps {
  title: string;
  description: string;
  primaryCTA: {
    label: string;
    href: string;
    ariaLabel: string;
  };
  secondaryCTA: {
    label: string;
    href: string;
    ariaLabel: string;
  };
  /** Footer (or any bottom content), rendered pinned to the bottom of the section. */
  children?: ReactNode;
}

export function CTAContent({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  children,
}: CTAContentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasMounted = useHasMounted();

  // Detect mobile to disable scroll effects (same guard as the hero)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Match the hero exactly: the scroll-linked reveal runs whenever it is not mobile.
  // (The hero does NOT gate its scroll fade on prefers-reduced-motion — only its
  // auto-playing halos respect it — so neither do we, to stay consistent.)
  const enableScrollEffects = hasMounted && !isMobile;

  // EXACT mirror of the hero's scroll effect, played in reverse.
  // Hero: the content is `position: fixed` (PINNED to the viewport) and fades OUT +
  // shrinks toward center (scale 1 -> 0.88) as you scroll down through it — it never
  // slides, it dissolves in place. Here the content is pinned the same way and the
  // animation runs backwards: it fades IN + grows (0.88 -> 1) in place as the section
  // settles in at the bottom of the page. No translation — it appears where it rests.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  // Reverse of the hero: hero container opacity is [0, 0.4] -> [1, 0]; here it is
  // [0.5, 0.92] -> [0, 1] (reveals over the last stretch as the section settles).
  const containerOpacity = useTransform(scrollYProgress, [0.5, 0.92], [0, 1]);
  const contentPointerEvents = useTransform(containerOpacity, (v) =>
    v < 0.1 ? "none" : "auto"
  );

  // Staggered reveal, mirror of the hero's staggered fade-out (same scale values).
  const titleOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0.55, 0.85], [0.88, 1]);

  const descOpacity = useTransform(scrollYProgress, [0.6, 0.88], [0, 1]);
  const descScale = useTransform(scrollYProgress, [0.6, 0.88], [0.94, 1]);

  const primaryOpacity = useTransform(scrollYProgress, [0.64, 0.9], [0, 1]);
  const primaryScale = useTransform(scrollYProgress, [0.64, 0.9], [0.95, 1]);

  const secondaryOpacity = useTransform(scrollYProgress, [0.67, 0.92], [0, 1]);
  const secondaryScale = useTransform(scrollYProgress, [0.67, 0.92], [0.95, 1]);

  return (
    <section
      ref={sectionRef}
      data-section="cta"
      className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden"
    >
      {/*
        Pinned content layer — mirrors the hero's fixed, fading container.
        Desktop: fixed inset-0 (pinned to the viewport), reveals in place via scroll.
        Mobile: relative, statically visible (no scroll effects), like the hero.
        The container is pointer-events-none so it never blocks the footer; the inner
        block re-enables pointer events only while it is actually visible.
      */}
      <motion.div
        className={`z-10 flex w-full items-center justify-center px-4 ${
          enableScrollEffects
            ? "pointer-events-none fixed inset-0 h-screen pb-40"
            : "pointer-events-none relative pt-16 pb-10"
        }`}
        style={enableScrollEffects ? { opacity: containerOpacity } : undefined}
      >
        <motion.div
          className="pointer-events-auto mx-auto max-w-3xl text-center"
          style={
            enableScrollEffects
              ? { pointerEvents: contentPointerEvents }
              : undefined
          }
        >
          <motion.h2
            className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
            style={
              enableScrollEffects
                ? { opacity: titleOpacity, scale: titleScale }
                : undefined
            }
          >
            {title}
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg"
            style={
              enableScrollEffects
                ? { opacity: descOpacity, scale: descScale }
                : undefined
            }
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <motion.div
              className="w-full sm:w-auto"
              style={
                enableScrollEffects
                  ? { opacity: primaryOpacity, scale: primaryScale }
                  : undefined
              }
            >
              <CTAButton
                href={primaryCTA.href}
                variant="primary"
                ariaLabel={primaryCTA.ariaLabel}
              >
                {primaryCTA.label}
              </CTAButton>
            </motion.div>

            <motion.div
              className="w-full sm:w-auto"
              style={
                enableScrollEffects
                  ? { opacity: secondaryOpacity, scale: secondaryScale }
                  : undefined
              }
            >
              <CTAButton
                href={secondaryCTA.href}
                variant="secondary"
                ariaLabel={secondaryCTA.ariaLabel}
              >
                {secondaryCTA.label}
              </CTAButton>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer — pinned to the bottom of the section (normal flow). */}
      <div className="relative z-10 mt-auto">{children}</div>
    </section>
  );
}
