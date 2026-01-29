import { Reveal } from "@/lib/motion";
import { FeatureCard } from "@/components/FeatureCard";
import type { SectionProps } from "../types";

const featureKeys = [
  "aiAgents",
  "processAutomation",
  "intelligentWorkflows",
] as const;

/**
 * What We Make Section
 *
 * Displays feature cards showcasing the company's offerings.
 * Extracted from page.tsx for the dynamic section library.
 */
export function WhatWeMakeSection({ t }: SectionProps) {
  return (
    <section className="flex min-h-[100dvh] flex-col justify-center pb-16 md:pb-32">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("home.whatWeMake.title")}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              {t("home.whatWeMake.description")}
            </p>
          </Reveal>
        </div>

        <div className="group/grid mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((featureKey) => (
            <Reveal key={featureKey} className="h-full">
              <FeatureCard
                title={t(`home.whatWeMake.features.${featureKey}.title`)}
                subtitle={t(`home.whatWeMake.features.${featureKey}.subtitle`)}
                description={t(
                  `home.whatWeMake.features.${featureKey}.description`
                )}
                cta={t(`home.whatWeMake.features.${featureKey}.cta`)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
