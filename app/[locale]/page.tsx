import { getTranslation, getTranslations } from "@/lib/i18n";
import { type Locale, isValidLocale, defaultLocale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { FeatureCard } from "@/components/FeatureCard";
import { ReasonCard } from "@/components/ReasonCard";
import { StackSection } from "@/components/StackSection";
import { UseCasesSection } from "@/components/UseCasesSection";

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
      <section className="relative isolate flex min-h-[100dvh] flex-col justify-center">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex animate-fade-in-slide items-center gap-2 rounded-full border border-border/40 bg-transparent px-3 py-1 text-xs tracking-wider text-foreground/60 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
              {t("home.hero.eyebrow")}
            </div>

            {/* Headline */}
            <h1 className="apple-breathing-title-wrapper animate-fade-in-slide-title text-4xl leading-[1.15] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              <span className="font-semibold">
                {t("home.hero.title.default")}
              </span>
              <span className="font-normal text-foreground/90">
                {t("home.hero.title.thin")}
              </span>
              <span className="glass-text font-semibold">
                {t("home.hero.title.accent")}
              </span>
            </h1>

            {/* Subcopy */}
            <p className="mx-auto mt-6 max-w-2xl animate-fade-in-slide-subtle text-pretty text-foreground/75 sm:text-lg">
              {t("home.hero.subtitle")}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10">
              <a
                href="#"
                className="apple-breathing-wrapper inline-flex w-auto animate-fade-in-slide-cta items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-base font-medium text-background shadow-sm shadow-accent/20 transition-transform duration-300 hover:scale-105"
              >
                {t("home.hero.cta")}
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
              <a
                href="#examples"
                className="inline-flex w-auto animate-fade-in-slide-cta-2 items-center justify-center gap-2 rounded-full border border-border/60 bg-transparent px-6 py-2.5 text-base font-medium text-foreground/80 transition-all duration-300 hover:scale-105"
                aria-label={t("home.hero.ctaSecondaryAriaLabel")}
              >
                {t("home.hero.ctaSecondary")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Make Section */}
      <section className="flex flex-col justify-center py-16 md:py-32">
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
        <StackSection title={t("home.stack.title")} />
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
      </ErrorBoundary>

      {/* Why ZetisLabs Section */}
      <section className="flex flex-col justify-center py-16 md:py-32">
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
      <section className="flex flex-col justify-center py-16 md:py-32">
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
