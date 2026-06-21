import { Reveal } from "@/lib/motion";
import { EyebrowBadge } from "@/lib/ui";

type Step = { marker: string; title: string; body: string };

type HowWeWorkProps = {
  eyebrow: string;
  thesis: string;
  steps: Step[];
};

/**
 * How we work — demystify the process, signal "no black box". The order is carried
 * by the design, not by numerals: a semantic ordered list read top-to-bottom, a
 * vertical connecting rail with an accent "start" node, and the duration markers
 * that progress in time. The one interaction is the sequential scroll-reveal —
 * each step rises in, staggered, like the process unfolding.
 */
export function HowWeWork({ eyebrow, thesis, steps }: HowWeWorkProps) {
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

        <ol className="mt-14 flex flex-col sm:mt-20">
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
                    accent node marks where to begin. */}
                <div
                  className="relative flex justify-center"
                  aria-hidden="true"
                >
                  {!isLast && (
                    <span className="absolute top-3 bottom-0 left-1/2 w-px -translate-x-1/2 bg-border" />
                  )}
                  <span
                    className={`relative mt-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-background ${
                      isFirst
                        ? "bg-accent"
                        : "border border-foreground/30 bg-background"
                    }`}
                  />
                </div>

                <Reveal direction="up" delay={i * 0.08}>
                  <div className="pb-1">
                    <span className="block text-xs font-medium tracking-[0.12em] text-foreground/65 uppercase tabular-nums">
                      {step.marker}
                    </span>
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
