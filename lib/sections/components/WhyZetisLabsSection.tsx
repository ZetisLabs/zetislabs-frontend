import { Reveal, CardReveal } from "@/lib/motion";
import type { SectionProps } from "../types";
import { TestimonialCard } from "@/lib/ui";

const reasonKeys = ["expertise", "scalability", "results"] as const;

const badgeLabels: Record<(typeof reasonKeys)[number], string> = {
  expertise: "Expertise",
  scalability: "Scalability",
  results: "Results",
};

/**
 * Why ZetisLabs Section
 *
 * Displays testimonial-style cards explaining the company's philosophy.
 * Uses TestimonialCard component with badge and headline.
 */
export function WhyZetisLabsSection({ t, dict }: SectionProps) {
  // Defensive check: return null if required data is missing
  const whyZetisLabsData = dict.home?.whyZetisLabs as
    | { reasons?: Record<string, unknown> }
    | undefined;

  if (!whyZetisLabsData?.reasons) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[WhyZetisLabsSection] Missing translation data: home.whyZetisLabs.reasons"
      );
    }
    return null;
  }

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

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasonKeys.map((reasonKey, index) => (
            <CardReveal key={reasonKey} index={index} variant="lift">
              <TestimonialCard
                badge={badgeLabels[reasonKey]}
                badgeColor={index === 1 ? "blue" : "orange"}
                headline={{
                  highlight: t(`home.whyZetisLabs.reasons.${reasonKey}.title`),
                  regular: t(
                    `home.whyZetisLabs.reasons.${reasonKey}.description`
                  ),
                }}
              />
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
