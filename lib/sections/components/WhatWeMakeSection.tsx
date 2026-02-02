import { Reveal, CardReveal } from "@/lib/motion";
import type { SectionProps } from "../types";
import { ServiceCard } from "@/lib/ui";
import { Map, Cog, Bot } from "lucide-react";

const featureKeys = [
  "aiAgents",
  "processAutomation",
  "intelligentWorkflows",
] as const;

const featureIcons: Record<(typeof featureKeys)[number], React.ReactNode> = {
  aiAgents: <Map className="h-5 w-5" />,
  processAutomation: <Cog className="h-5 w-5" />,
  intelligentWorkflows: <Bot className="h-5 w-5" />,
};

/**
 * What We Make Section
 *
 * Displays service cards showcasing the company's offerings.
 * Uses ServiceCard component with clean notification style.
 */
export function WhatWeMakeSection({ t, dict }: SectionProps) {
  // Defensive check: return null if required data is missing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const homeData = dict.home as Record<string, any>;
  const whatWeMakeData = homeData?.whatWeMake as
    | { features?: Record<string, unknown> }
    | undefined;

  if (!whatWeMakeData?.features) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[WhatWeMakeSection] Missing translation data: home.whatWeMake.features"
      );
    }
    return null;
  }

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

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((featureKey, index) => (
            <CardReveal key={featureKey} index={index} variant="lift">
              <ServiceCard
                icon={featureIcons[featureKey]}
                serviceName={t(`home.whatWeMake.features.${featureKey}.title`)}
                label={t(`home.whatWeMake.features.${featureKey}.subtitle`)}
                title={t(`home.whatWeMake.features.${featureKey}.description`)}
                date={t(`home.whatWeMake.features.${featureKey}.cta`)}
              />
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
