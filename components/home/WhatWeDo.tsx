import { Reveal } from "@/lib/motion";
import { EyebrowBadge } from "@/lib/ui";

type Capability = { title: string; body: string };

type WhatWeDoProps = {
  eyebrow: string;
  lead: string;
  body: string;
  capabilities: Capability[];
};

/**
 * What we do — the transform: a time-costing process becomes an owned, automated
 * system. Three parallel capability cards on the white surface with hairlines; the
 * one interaction is the "one-notch" hover lift (surface + hairline, no shadow),
 * with a staggered reveal as the row enters.
 */
export function WhatWeDo({ eyebrow, lead, body, capabilities }: WhatWeDoProps) {
  return (
    <section
      data-section="what-we-do"
      className="relative w-full py-24 sm:py-32 md:py-40"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 sm:px-8">
        <Reveal direction="up">
          <EyebrowBadge>{eyebrow}</EyebrowBadge>
        </Reveal>

        <Reveal direction="up" delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance">
            {lead}
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <p className="mt-5 max-w-2xl leading-relaxed text-pretty text-foreground/70 sm:text-lg">
            {body}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-3 sm:gap-6">
          {capabilities.map((cap, i) => (
            <Reveal
              key={cap.title}
              direction="up"
              delay={0.12 + i * 0.06}
              className="h-full"
            >
              <article className="group relative h-full rounded-lg border border-border/70 bg-card/40 p-6 transition-[transform,background-color,border-color] duration-200 ease-out-strong hover:-translate-y-[3px] hover:border-accent/35 hover:bg-card sm:p-7">
                <h3 className="text-lg font-semibold tracking-[-0.02em]">
                  {cap.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-pretty text-foreground/65">
                  {cap.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
