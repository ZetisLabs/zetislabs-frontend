import { getTranslation, getTranslations } from "@/lib/i18n";
import { type Locale, isValidLocale, defaultLocale } from "@/i18n/config";
import { HeroSection } from "@/components/HeroSection";
import { CTAContent } from "@/components/CTAContent";
import { SectionRenderer, type SectionConfig } from "@/lib/sections";
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
        eyebrow={t("home.hero.eyebrow")}
        title={{
          default: t("home.hero.title.default"),
          thin: t("home.hero.title.thin"),
          accent: t("home.hero.title.accent"),
        }}
        subtitle={t("home.hero.subtitle")}
        cta={{
          primary: {
            label: t("home.hero.cta.primary.label"),
            href: t("home.hero.cta.primary.href"),
            ariaLabel: t("home.hero.cta.primary.ariaLabel"),
          },
          secondary: {
            label: t("home.hero.cta.secondary.label"),
            href: t("home.hero.cta.secondary.href"),
            ariaLabel: t("home.hero.cta.secondary.ariaLabel"),
          },
        }}
      />

      {/* Dynamic: Sections from i18n configuration */}
      <SectionRenderer sections={sections} locale={locale} t={t} dict={dict} />

      {/* Static: Call to Action Section + Footer */}
      <section
        data-section="cta"
        className="flex min-h-dvh flex-col justify-between pt-12 pb-16 md:pt-20 md:pb-32"
      >
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <CTAContent
            title={t("home.cta.title")}
            description={t("home.cta.description")}
            primaryCTA={{
              label: t("home.cta.primary.label"),
              href: t("home.cta.primary.href"),
              ariaLabel: t("home.cta.primary.ariaLabel"),
            }}
            secondaryCTA={{
              label: t("home.cta.secondary.label"),
              href: t("home.cta.secondary.href"),
              ariaLabel: t("home.cta.secondary.ariaLabel"),
            }}
          />
        </div>
        <Footer locale={locale} />
      </section>
    </>
  );
}
