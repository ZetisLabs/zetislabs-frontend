import { getTranslation } from "@/lib/i18n";
import { type Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";

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
      <section className="relative isolate min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-screen-xl px-4 w-full">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/40 bg-transparent px-3 py-1 text-xs uppercase tracking-wider text-foreground/60 animate-fade-in-slide">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              {t("home.hero.eyebrow")}
            </div>

            {/* Headline */}
            {/* Headline */}
            <h1 className="text-balance text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl animate-fade-in-slide-title apple-breathing-title-wrapper">
              <span className="font-semibold">{t("home.hero.title.default")}</span>
              <span className="font-normal text-foreground/90">{t("home.hero.title.thin")}</span>
              <span className="font-semibold glass-text">{t("home.hero.title.accent")}</span>
            </h1>

            {/* Subcopy */}
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-foreground/75 sm:text-lg animate-fade-in-slide-subtle">
              {t("home.hero.subtitle")}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex w-auto items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 shadow-sm shadow-accent/20 text-base font-medium text-background apple-breathing-wrapper animate-fade-in-slide-cta hover:scale-105 transition-transform duration-300"
              >
                {t("home.hero.cta")}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M16.3153 16.6681C15.9247 17.0587 15.9247 17.6918 16.3153 18.0824C16.7058 18.4729 17.339 18.4729 17.7295 18.0824L22.3951 13.4168C23.1761 12.6357 23.1761 11.3694 22.3951 10.5883L17.7266 5.9199C17.3361 5.52938 16.703 5.52938 16.3124 5.91991C15.9219 6.31043 15.9219 6.9436 16.3124 7.33412L19.9785 11.0002L2 11.0002C1.44772 11.0002 1 11.4479 1 12.0002C1 12.5524 1.44772 13.0002 2 13.0002L19.9832 13.0002L16.3153 16.6681Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="#examples"
                className="inline-flex w-auto items-center justify-center gap-2 rounded-full border border-border/60 bg-transparent px-6 py-2.5 text-base font-medium text-foreground/80 transition-all animate-fade-in-slide-cta-2 hover:scale-105 duration-300"
                aria-label={t("home.hero.ctaSecondaryAriaLabel")}
              >
                {t("home.hero.ctaSecondary")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Make Section */}
      <section className="py-32 flex flex-col justify-center">
        <div className="mx-auto max-w-screen-xl px-4 w-full">
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

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whatWeMake.features.aiAgents.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whatWeMake.features.aiAgents.description")}
              </p>
            </div>
            </Reveal>

            {/* Feature Card 2 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whatWeMake.features.processAutomation.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whatWeMake.features.processAutomation.description")}
              </p>
            </div>
            </Reveal>

            {/* Feature Card 3 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whatWeMake.features.intelligentWorkflows.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whatWeMake.features.intelligentWorkflows.description")}
              </p>
            </div>
            </Reveal>

            {/* Feature Card 4 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whatWeMake.features.enterpriseIntegration.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whatWeMake.features.enterpriseIntegration.description")}
              </p>
            </div>
            </Reveal>
            </div>
        </div>
      </section>

      {/* Example Projects Section */}
      <section id="examples" className="py-32 flex flex-col justify-center">
        <div className="mx-auto max-w-screen-xl px-4 w-full">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("home.exampleProjects.title")}
            </h2>
            </Reveal>
            <Reveal>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              {t("home.exampleProjects.description")}
            </p>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Project Card 1 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.exampleProjects.projects.ecommerce.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.exampleProjects.projects.ecommerce.description")}
              </p>
            </div>
            </Reveal>
            {/* Project Card 2 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.exampleProjects.projects.customerSupport.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.exampleProjects.projects.customerSupport.description")}
              </p>
            </div>
            </Reveal>
            {/* Project Card 3 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.exampleProjects.projects.dataMigration.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.exampleProjects.projects.dataMigration.description")}
              </p>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why ZetisLabs Section */}
      <section className="py-32 flex flex-col justify-center">
        <div className="mx-auto max-w-screen-xl px-4 w-full">
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
            {/* Reason Card 1 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.expertTeam.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.expertTeam.description")}
              </p>
            </div>
            </Reveal>

            {/* Reason Card 2 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.customSolutions.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.customSolutions.description")}
              </p>
            </div>
            </Reveal>
            {/* Reason Card 3 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.provenResults.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.provenResults.description")}
              </p>
            </div>
            </Reveal>
            {/* Reason Card 4 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.ongoingSupport.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.ongoingSupport.description")}
              </p>
            </div>
            </Reveal>
            {/* Reason Card 5 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.scalableArchitecture.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.scalableArchitecture.description")}
              </p>
            </div>
            </Reveal>
            {/* Reason Card 6 */}
            <Reveal>
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">
                {t("home.whyZetisLabs.reasons.securityFirst.title")}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {t("home.whyZetisLabs.reasons.securityFirst.description")}
              </p>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 flex flex-col justify-center">
        <div className="mx-auto max-w-screen-xl px-4 w-full">
          <div className="mx-auto mb-48 max-w-3xl text-center">
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
                className="inline-flex w-auto items-center justify-center gap-6 rounded-md bg-accent/70 px-6 py-0 backdrop-blur-lg border border-accent shadow-md text-sm font-medium text-white hover:bg-accent transition-colors"
                aria-label={t("home.cta.primaryAriaLabel")}
              >
                {t("home.cta.primary")}
              </a>
              </Reveal>
              <Reveal delay={250}>
              <a
                href="#"
                className="inline-flex w-auto items-center justify-center gap-6 rounded-md border border-border/70 bg-card/40 px-6 py-0 backdrop-blur-lg text-sm font-medium text-foreground hover:bg-card/60 transition-colors"
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

