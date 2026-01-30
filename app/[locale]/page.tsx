import { getTranslation, getTranslations } from "@/lib/i18n";
import { type Locale, isValidLocale, defaultLocale } from "@/i18n/config";
import { Reveal } from "@/lib/motion";
import { HeroSection } from "@/components/HeroSection";
import { SectionRenderer, type SectionConfig } from "@/lib/sections";
import { CTAButton } from "@/lib/ui";
import Footer from "@/components/layout/Footer";

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

      {/* Static: Call to Action Section + Footer */}
      <section className="flex min-h-dvh flex-col justify-between py-16 md:py-32">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl text-center">
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
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Reveal>
                <CTAButton
                  href="#"
                  variant="primary"
                  ariaLabel={t("home.cta.primaryAriaLabel")}
                >
                  {t("home.cta.primary")}
                </CTAButton>
              </Reveal>
              <Reveal delay={250}>
                <CTAButton
                  href="#"
                  variant="secondary"
                  ariaLabel={t("home.cta.secondaryAriaLabel")}
                >
                  {t("home.cta.secondary")}
                </CTAButton>
              </Reveal>
            </div>
          </div>
        </div>
        <Footer locale={locale} />
      </section>
    </>
  );
}
