"use client";

import { useRef } from "react";
import type { MotionValue } from "framer-motion";
import {
  Reveal,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useHasMounted,
} from "@/lib/motion";
import { EyebrowBadge } from "@/lib/ui";

type Step = { marker: string; title: string; body: string };

type HowWeWorkProps = {
  eyebrow: string;
  thesis: string;
  steps: Step[];
};

/** Shared props for the rail's scroll-driven pieces. */
type RailPieceProps = {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  animated: boolean;
};

/** Vertical position of node `i` along the rail, as a 0→1 fraction of the list. */
function nodeFraction(index: number, total: number) {
  return total <= 1 ? 0 : index / (total - 1);
}

/**
 * Connector — one segment of the rail, between node `index` and `index + 1`.
 *
 * Drafting metaphor: a recessive track is always visible (so the fallback reads
 * exactly like the static design), an accent fill draws downward behind a
 * traveling "pen tip" — a glowing dot that rides the leading edge of the ink,
 * fading in as a stroke starts and out as it reaches the next node. The pen
 * exists only while motion is on; the segments chain at the nodes, so the tip
 * reads as a single pen drawing the whole process top-to-bottom.
 */
function Connector({
  index,
  total,
  scrollYProgress,
  animated,
}: RailPieceProps) {
  const start = nodeFraction(index, total);
  const end = nodeFraction(index + 1, total);
  const fill = useTransform(scrollYProgress, [start, end], [0, 1]);

  // Pen tip rides the fill's leading edge; fade it in/out at the segment ends so
  // it appears only mid-stroke and hands off cleanly at each node.
  const tipTop = useTransform(fill, (v) => `${v * 100}%`);
  const tipOpacity = useTransform(fill, [0, 0.12, 0.86, 1], [0, 1, 1, 0]);

  return (
    <span
      className="absolute top-3 bottom-0 left-1/2 w-0.5 -translate-x-1/2"
      aria-hidden="true"
    >
      {/* track */}
      <span className="absolute inset-0 rounded-full bg-border" />
      {/* ink fill */}
      <motion.span
        className="absolute inset-0 origin-top rounded-full bg-accent"
        style={animated ? { scaleY: fill } : { scaleY: 0 }}
      />
      {/* pen tip — the traveling focal point that draws the rail */}
      {animated && (
        <motion.span
          className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          style={{
            top: tipTop,
            opacity: tipOpacity,
            boxShadow:
              "0 0 0 3px rgba(58,123,213,0.12), 0 0 12px 2px rgba(58,123,213,0.45)",
          }}
        />
      )}
    </span>
  );
}

/**
 * StepNode — a station on the rail. As the pen arrives it *stamps*: an accent
 * ring expands outward from the node and fades (the "ink hit"), while the dot
 * itself crossfades from recessive (hollow, bordered) to solid accent. The first
 * node is the "start" — lit from progress 0, so the rail always has a clear origin.
 */
function StepNode({
  index,
  total,
  scrollYProgress,
  animated,
  isFirst,
}: RailPieceProps & { isFirst: boolean }) {
  const frac = nodeFraction(index, total);
  // Window ends exactly at this node's position; starts a touch before. For the
  // first node (frac 0) the window is [-0.12, 0], so it is already lit at the top.
  const lit = useTransform(scrollYProgress, [frac - 0.12, frac], [0, 1]);
  const hollow = useTransform(lit, (v) => 1 - v);

  // Stamp ring — expands and fades as the node lights.
  const ringScale = useTransform(lit, [0, 1], [0.5, 2.6]);
  const ringOpacity = useTransform(lit, [0, 0.18, 0.7, 1], [0, 0.5, 0.12, 0]);

  // When the effect is off (SSR / reduced motion), fall back to the static
  // design: the start node accent, the rest hollow, no stamp.
  const accentOpacity = animated ? lit : isFirst ? 1 : 0;
  const hollowOpacity = animated ? hollow : isFirst ? 0 : 1;
  const stampStyle = animated
    ? { scale: ringScale, opacity: ringOpacity }
    : { opacity: 0 };

  return (
    <span className="relative mt-1.5 block h-2.5 w-2.5">
      {/* stamp ring */}
      <motion.span
        className="absolute -inset-1 rounded-full border border-accent"
        style={stampStyle}
      />
      {/* node (ring-background punches the rail line behind it) */}
      <span className="absolute inset-0 rounded-full ring-4 ring-background">
        <motion.span
          className="absolute inset-0 rounded-full border border-foreground/30 bg-background"
          style={{ opacity: hollowOpacity }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-accent"
          style={{ opacity: accentOpacity }}
        />
      </span>
    </span>
  );
}

/**
 * StepMarker — the duration label. Shifts from recessive grey to accent in time
 * with its node lighting, so the content reads as part of the same stroke rather
 * than static text beside an animated rail.
 */
function StepMarker({
  index,
  total,
  scrollYProgress,
  animated,
  children,
}: RailPieceProps & { children: React.ReactNode }) {
  const frac = nodeFraction(index, total);
  const lit = useTransform(scrollYProgress, [frac - 0.12, frac], [0, 1]);
  const accentOpacity = animated ? lit : 0;

  return (
    <span className="relative block text-xs font-medium tracking-[0.12em] text-foreground/65 uppercase tabular-nums">
      {children}
      <motion.span
        className="absolute inset-0 text-accent"
        style={{ opacity: accentOpacity }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * How we work — demystify the process, signal "no black box". The order is carried
 * by the design, not by numerals: a semantic ordered list read top-to-bottom, a
 * vertical connecting rail with an accent "start" node, and the duration markers
 * that progress in time. On scroll the rail drafts itself like ink on paper — a
 * glowing pen tip travels down the line, each node stamps as the pen arrives, and
 * the duration markers shift to accent in time with their nodes — so the process
 * visibly unfolds, drawn, under the reader's hand. The staggered sequence
 * scroll-reveal stays as the content-level interaction.
 */
export function HowWeWork({ eyebrow, thesis, steps }: HowWeWorkProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const hasMounted = useHasMounted();
  const prefersReducedMotion = useReducedMotion();

  // Scroll-driven rail runs only after mount and when motion is welcome — same
  // hydration + reduced-motion guards as the hero/CTA. When false, the section
  // renders exactly as the static design (recessive rail, single accent start).
  const animated = hasMounted && !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.5"],
  });

  return (
    <section
      data-section="how-we-work"
      className="relative w-full py-24 sm:py-32 md:py-40"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 sm:px-8">
        <Reveal direction="up">
          <EyebrowBadge>{eyebrow}</EyebrowBadge>
        </Reveal>

        <Reveal direction="up" delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance">
            {thesis}
          </h2>
        </Reveal>

        <ol ref={listRef} className="mt-14 flex flex-col sm:mt-20">
          {steps.map((step, i) => {
            const isFirst = i === 0;
            const isLast = i === steps.length - 1;
            return (
              <li
                key={step.title}
                className="relative grid grid-cols-[auto_1fr] gap-5 pb-12 last:pb-0 sm:gap-8 sm:pb-16"
              >
                {/* Connecting rail + node — the sequence is conveyed by structure
                    (top-to-bottom flow + the rail), not by a number. The single
                    accent node marks where to begin; the rest stamp as the pen
                    draws past them on scroll. */}
                <div
                  className="relative flex justify-center"
                  aria-hidden="true"
                >
                  {!isLast && (
                    <Connector
                      index={i}
                      total={steps.length}
                      scrollYProgress={scrollYProgress}
                      animated={animated}
                    />
                  )}
                  <StepNode
                    index={i}
                    total={steps.length}
                    scrollYProgress={scrollYProgress}
                    animated={animated}
                    isFirst={isFirst}
                  />
                </div>

                <Reveal direction="up" delay={i * 0.08}>
                  <div className="pb-1">
                    <StepMarker
                      index={i}
                      total={steps.length}
                      scrollYProgress={scrollYProgress}
                      animated={animated}
                    >
                      {step.marker}
                    </StepMarker>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-pretty text-foreground/70">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
