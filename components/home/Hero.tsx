"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useHasMounted,
  useMotionValue,
  useMotionTemplate,
} from "@/lib/motion";
import { CTAButton, EyebrowBadge } from "@/lib/ui";

type HeroProps = {
  eyebrow: string;
  title: { lead: string; trail: string };
  subtitle: string;
  cta: { label: string; href: string; ariaLabel: string };
};

/**
 * Hero — the dramatic entry point.
 *
 * The oversized GeneralSans title acts as the imagery (no photography). It mirrors
 * the site's signature pinned fade-on-scroll: on desktop the content is fixed to the
 * viewport and dissolves in place (opacity + scale shrink) as you scroll through the
 * section — the same gesture the final CTA plays in reverse, and the same scroll the
 * WebGL sunrise arc (mounted in the layout) reacts to. Entrance is CSS-driven
 * (.hero-entrance) so it paints before hydration (LCP). The cursor-spotlight is the
 * one place on the site the accent follows the pointer "for life".
 */
export function Hero({ eyebrow, title, subtitle, cta }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const hasMounted = useHasMounted();
  const prefersReducedMotion = useReducedMotion();

  // Disable scroll effects on mobile (fixed + touch scroll is buggy), like the
  // original hero. Detect a real hover/fine pointer for the cursor-spotlight.
  const [isMobile, setIsMobile] = useState(false);
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const checkHover = () => setCanHover(hoverMq.matches);
    checkMobile();
    checkHover();
    window.addEventListener("resize", checkMobile);
    hoverMq.addEventListener("change", checkHover);
    return () => {
      window.removeEventListener("resize", checkMobile);
      hoverMq.removeEventListener("change", checkHover);
    };
  }, []);

  const enableScrollEffects = hasMounted && !isMobile;
  const canSpotlight = hasMounted && !prefersReducedMotion && canHover;

  // Pinned fade-out on scroll (same offsets/feel as the original hero).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const containerOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const containerPointerEvents = useTransform(containerOpacity, (v) =>
    v < 0.1 ? "none" : "auto"
  );
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const eyebrowScale = useTransform(scrollYProgress, [0, 0.32], [1, 0.92]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.02, 0.35], [1, 0]);
  const subtitleScale = useTransform(scrollYProgress, [0.02, 0.35], [1, 0.94]);
  const ctaOpacity = useTransform(scrollYProgress, [0.04, 0.35], [1, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.04, 0.35], [1, 0.96]);

  // Cursor-spotlight (wiki: motion values, never useState). Rests off-screen.
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${mouseX}px ${mouseY}px, rgba(58,123,213,0.12) 0%, rgba(58,123,213,0.05) 42%, transparent 76%)`;
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = spotRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative isolate h-auto min-h-screen w-full overflow-hidden md:h-[115vh]"
    >
      <motion.div
        ref={spotRef}
        onMouseMove={canSpotlight ? handleMove : undefined}
        className={`z-10 flex w-full items-center overflow-hidden ${
          enableScrollEffects
            ? "fixed inset-0 h-screen pt-[18vh]"
            : "relative min-h-screen py-24"
        }`}
        style={
          enableScrollEffects
            ? {
                opacity: containerOpacity,
                pointerEvents: containerPointerEvents,
              }
            : undefined
        }
      >
        {/* Cursor-spotlight — a faint accent wash that follows the pointer across the
            whole hero. Full-screen, so the glow never clips into a hard edge. Hero
            only; rests off-screen and is disabled under reduced-motion / touch. */}
        {canSpotlight && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background: spotlight }}
          />
        )}

        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 sm:px-8">
          {/* CSS-driven entrance, staggered (paints before hydration → LCP). Each
              element's entrance lives on an OUTER wrapper while the framer scroll-fade
              lives on the inner node, so the two transforms never fight. */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="hero-entrance hero-entrance-1">
              <motion.div
                style={
                  enableScrollEffects
                    ? { opacity: eyebrowOpacity, scale: eyebrowScale }
                    : undefined
                }
                className="origin-center"
              >
                <EyebrowBadge className="mb-5 sm:mb-7">{eyebrow}</EyebrowBadge>
              </motion.div>
            </div>

            <div className="hero-entrance hero-entrance-2">
              <motion.h1
                style={
                  enableScrollEffects
                    ? { opacity: titleOpacity, scale: titleScale }
                    : undefined
                }
                className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-balance"
              >
                <span className="block font-semibold text-foreground">
                  {title.lead}
                </span>
                <span className="block font-medium text-foreground/65">
                  {title.trail}
                </span>
              </motion.h1>
            </div>

            <div className="hero-entrance hero-entrance-3">
              <motion.p
                style={
                  enableScrollEffects
                    ? { opacity: subtitleOpacity, scale: subtitleScale }
                    : undefined
                }
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-foreground/70 sm:mt-8 sm:text-lg"
              >
                {subtitle}
              </motion.p>
            </div>

            <div className="hero-entrance hero-entrance-4">
              <motion.div
                style={
                  enableScrollEffects
                    ? { opacity: ctaOpacity, scale: ctaScale }
                    : undefined
                }
                className="mt-8 flex w-full justify-center sm:mt-10 sm:w-auto"
              >
                <div className="w-full sm:w-auto">
                  <CTAButton
                    href={cta.href}
                    variant="primary"
                    ariaLabel={cta.ariaLabel}
                  >
                    {cta.label}
                  </CTAButton>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
