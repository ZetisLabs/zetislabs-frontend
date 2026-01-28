import { getTranslation, getTranslations } from "@/lib/i18n";
import { type Locale, isValidLocale, defaultLocale } from "@/i18n/config";
import { Reveal } from "@/lib/motion";
import { HeroSection } from "@/components/HeroSection";
import { SectionRenderer, type SectionConfig } from "@/lib/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Home Page
 *
 * Uses a dynamic section composition system:
 * - Hero and CTA sections are static (always present)
 * - Other sections are dynamically rendered based on i18n configuration
 */
export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const t = (key: string) => getTranslation(locale, key);
  const dict = getTranslations(locale);

  // Get sections configuration from i18n
  const sections = (dict.home.sections || []) as SectionConfig[];

  return (
    <>
      {/* Static: Hero Section */}
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

      {/* Dynamic: Sections from i18n configuration */}
      <SectionRenderer sections={sections} locale={locale} t={t} dict={dict} />

      {/* Static: Call to Action Section */}
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
