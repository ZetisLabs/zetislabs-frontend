import { Reveal } from "@/lib/motion";
import type { SectionProps } from "../types";
import { ReasonCard } from "@/lib/ui";

const reasonKeys = ["expertise", "scalability", "results"] as const;

/**
 * Why ZetisLabs Section
 *
 * Displays reason cards explaining the company's philosophy.
 * Extracted from page.tsx for the dynamic section library.
 */
export function WhyZetisLabsSection({ t }: SectionProps) {
  return (
    <section className="flex scroll-section flex-col justify-center py-16 md:py-32">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("home.whyZetisLabs.title")}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              {t("home.whyZetisLabs.description")}
            </p>
          </Reveal>
        </div>

        <div className="group/grid mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasonKeys.map((reasonKey, index) => (
            <Reveal key={reasonKey} className="h-full" delay={index * 100}>
              <ReasonCard
                index={index}
                title={t(`home.whyZetisLabs.reasons.${reasonKey}.title`)}
                description={t(
                  `home.whyZetisLabs.reasons.${reasonKey}.description`
                )}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
