import { getTranslation } from "@/lib/i18n";
import { type Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: Locale }>;
};

/**
 * Home Page
 * Implements a minimalist hero section inspired by the referenced design.
 * Uses translations for all text content.
 */
export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = (key: string) => getTranslation(locale, key);

  return (
    <>
      <section className="relative isolate">
        <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-24 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-1 text-xs uppercase tracking-wider text-foreground/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("home.hero.eyebrow")}
            </div>

            {/* Headline */}
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {t("home.hero.title")}
            </h1>

            {/* Subcopy */}
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              {t("home.hero.subtitle")}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#"
                className="inline-flex w-auto items-center justify-center gap-6 rounded-md bg-accent/70 px-6 py-0 backdrop-blur-lg border border-accent shadow-md text-sm font-medium text-white"
              >
                {t("home.hero.cta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Make Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("home.whatWeMake.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              {t("home.whatWeMake.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whatWeMake.features.aiAgents.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whatWeMake.features.aiAgents.description")}
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whatWeMake.features.processAutomation.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whatWeMake.features.processAutomation.description")}
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whatWeMake.features.intelligentWorkflows.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whatWeMake.features.intelligentWorkflows.description")}
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whatWeMake.features.enterpriseIntegration.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whatWeMake.features.enterpriseIntegration.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Projects Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("home.exampleProjects.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              {t("home.exampleProjects.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Project Card 1 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.exampleProjects.projects.ecommerce.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.exampleProjects.projects.ecommerce.description")}
              </p>
            </div>

            {/* Project Card 2 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.exampleProjects.projects.customerSupport.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.exampleProjects.projects.customerSupport.description")}
              </p>
            </div>

            {/* Project Card 3 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.exampleProjects.projects.dataMigration.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.exampleProjects.projects.dataMigration.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why ZetisLabs Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("home.whyZetisLabs.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              {t("home.whyZetisLabs.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Reason Card 1 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.expertTeam.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.expertTeam.description")}
              </p>
            </div>

            {/* Reason Card 2 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.customSolutions.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.customSolutions.description")}
              </p>
            </div>

            {/* Reason Card 3 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.provenResults.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.provenResults.description")}
              </p>
            </div>

            {/* Reason Card 4 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.ongoingSupport.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.ongoingSupport.description")}
              </p>
            </div>

            {/* Reason Card 5 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.scalableArchitecture.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.scalableArchitecture.description")}
              </p>
            </div>

            {/* Reason Card 6 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.securityFirst.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.securityFirst.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("home.cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              {t("home.cta.description")}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#"
                className="inline-flex w-auto items-center justify-center gap-6 rounded-md bg-accent/70 px-6 py-0 backdrop-blur-lg border border-accent shadow-md text-sm font-medium text-white hover:bg-accent transition-colors"
                aria-label={t("home.cta.primaryAriaLabel")}
              >
                {t("home.cta.primary")}
              </a>
              <a
                href="#"
                className="inline-flex w-auto items-center justify-center gap-6 rounded-md border border-border/70 bg-card/40 px-6 py-0 backdrop-blur-lg text-sm font-medium text-foreground hover:bg-card/60 transition-colors"
                aria-label={t("home.cta.secondaryAriaLabel")}
              >
                {t("home.cta.secondary")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

