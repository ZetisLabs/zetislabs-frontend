import { getTranslation, getTranslations } from "@/lib/i18n";
import { type Locale, isValidLocale, defaultLocale } from "@/i18n/config";
import { Reveal } from "@/lib/motion";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { FeatureCard } from "@/components/FeatureCard";
import { ReasonCard } from "@/components/ReasonCard";
import { StackSection } from "@/components/StackSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { HeroSection } from "@/components/HeroSection";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Home Page
 * Implements a minimalist hero section inspired by the referenced design.
 * Uses translations for all text content.
 */
export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const t = (key: string) => getTranslation(locale, key);
  const dict = getTranslations(locale);

  return (
    <>
      <HeroSection
        eyebrowText={t("home.hero.eyebrow")}
        titleDefault={t("home.hero.title.default")}
        titleThin={t("home.hero.title.thin")}
        titleAccent={t("home.hero.title.accent")}
        subtitle={t("home.hero.subtitle")}
        ctaText={t("home.hero.cta")}
        ctaSecondaryText={t("home.hero.ctaSecondary")}
        ctaSecondaryAriaLabel={t("home.hero.ctaSecondaryAriaLabel")}
      />

      {/* What We Make Section */}
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
            {/* Feature Card 1 */}
            <Reveal className="h-full">
              <FeatureCard
                title={t("home.whatWeMake.features.aiAgents.title")}
                subtitle={t("home.whatWeMake.features.aiAgents.subtitle")}
                description={t("home.whatWeMake.features.aiAgents.description")}
                cta={t("home.whatWeMake.features.aiAgents.cta")}
              />
            </Reveal>

            {/* Feature Card 2 */}
            <Reveal className="h-full">
              <FeatureCard
                title={t("home.whatWeMake.features.processAutomation.title")}
                subtitle={t(
                  "home.whatWeMake.features.processAutomation.subtitle"
                )}
                description={t(
                  "home.whatWeMake.features.processAutomation.description"
                )}
                cta={t("home.whatWeMake.features.processAutomation.cta")}
              />
            </Reveal>

            {/* Feature Card 3 */}
            <Reveal className="h-full">
              <FeatureCard
                title={t("home.whatWeMake.features.intelligentWorkflows.title")}
                subtitle={t(
                  "home.whatWeMake.features.intelligentWorkflows.subtitle"
                )}
                description={t(
                  "home.whatWeMake.features.intelligentWorkflows.description"
                )}
                cta={t("home.whatWeMake.features.intelligentWorkflows.cta")}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <ErrorBoundary
        fallback={
          <section className="flex flex-col justify-center py-16 md:py-32">
            <div className="mx-auto w-full max-w-screen-xl px-4 text-center">
              <p className="text-foreground/70">Unable to load integrations.</p>
            </div>
          </section>
        }
      >
        <div className="scroll-section">
          <StackSection title={t("home.stack.title")} />
        </div>
      </ErrorBoundary>

      {/* Use Cases Section - Apple-style sticky scroll */}
      <ErrorBoundary
        fallback={
          <section className="flex flex-col justify-center py-16 md:py-32">
            <div className="mx-auto w-full max-w-screen-xl px-4 text-center">
              <p className="text-foreground/70">Unable to load use cases.</p>
            </div>
          </section>
        }
      >
        <div className="scroll-section">
          <UseCasesSection
            title={t("home.useCases.title")}
            description={t("home.useCases.description")}
            learnMoreLabel={t("home.useCases.learnMore")}
            useCases={[
              {
                id: "mail-writer",
                title: t("home.useCases.cases.mailWriter.title"),
                subtitle: t("home.useCases.cases.mailWriter.subtitle"),
                description: t("home.useCases.cases.mailWriter.description"),
                features: (
                  dict.home.useCases.cases.mailWriter.features as string[]
                ).map((f) => f),
                media: {
                  type: "image" as const,
                  src: "/diagrams/diagram-placeholder.png",
                  alt: "Mail-Writer interface",
                },
              },
              {
                id: "docgen",
                title: t("home.useCases.cases.docGen.title"),
                subtitle: t("home.useCases.cases.docGen.subtitle"),
                description: t("home.useCases.cases.docGen.description"),
                features: (
                  dict.home.useCases.cases.docGen.features as string[]
                ).map((f) => f),
                media: {
                  type: "image" as const,
                  src: "/diagrams/diagram-placeholder.png",
                  alt: "DocGen dashboard",
                },
              },
            ]}
          />
        </div>
      </ErrorBoundary>

      {/* Why ZetisLabs Section */}
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
            {/* Reason Card 1 */}
            <Reveal className="h-full">
              <ReasonCard
                index={0}
                title={t("home.whyZetisLabs.reasons.expertise.title")}
                description={t(
                  "home.whyZetisLabs.reasons.expertise.description"
                )}
              />
            </Reveal>

            {/* Reason Card 2 */}
            <Reveal className="h-full" delay={100}>
              <ReasonCard
                index={1}
                title={t("home.whyZetisLabs.reasons.scalability.title")}
                description={t(
                  "home.whyZetisLabs.reasons.scalability.description"
                )}
              />
            </Reveal>

            {/* Reason Card 3 */}
            <Reveal className="h-full" delay={200}>
              <ReasonCard
                index={2}
                title={t("home.whyZetisLabs.reasons.results.title")}
                description={t("home.whyZetisLabs.reasons.results.description")}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex scroll-section flex-col justify-center py-16 md:py-32">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <div className="mx-auto mb-24 max-w-3xl text-center md:mb-48">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("home.cta.title")}
              </h2>
            </Reveal>
            <Reveal>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
                {t("home.cta.description")}
              </p>
            </Reveal>
            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Reveal>
                <a
                  href="#"
                  className="inline-flex w-auto items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-base font-medium text-background shadow-sm shadow-accent/20 transition-transform duration-300 hover:scale-105"
                  aria-label={t("home.cta.primaryAriaLabel")}
                >
                  {t("home.cta.primary")}
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
                </a>
              </Reveal>
              <Reveal delay={250}>
                <a
                  href="#"
                  className="inline-flex w-auto items-center justify-center gap-2 rounded-full border border-border/60 bg-transparent px-6 py-2.5 text-base font-medium text-foreground/80 transition-all duration-300 hover:scale-105"
                  aria-label={t("home.cta.secondaryAriaLabel")}
                >
                  {t("home.cta.secondary")}
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
