import { getTranslations } from "@/lib/i18n";
import { type Locale, isValidLocale, defaultLocale } from "@/i18n/config";
import {
  Hero,
  WhatWeDo,
  WhyNotSaas,
  HowWeWork,
  Offers,
} from "@/components/home";
import { CTAContent } from "@/components/CTAContent";
import Footer from "@/components/layout/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Home page — the "Architect's Paper" rebuild (see design-direction.md).
 *
 * The scroll tells the story: arrive (Hero) → understand (What we do) →
 * differentiate (Why not a SaaS) → trust (How we work) → act (Offers + final CTA).
 * Copy is driven entirely by the typed i18n dictionary; the WebGL sunrise + grain
 * (mounted in the layout / below) carry the organic counterpoint.
 */
export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const { home } = getTranslations(locale);

  return (
    <>
      {/* Film grain — static "paper" warmth over the WebGL grid, behind all
          content. Static, so no reduced-motion fallback is needed. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 grain opacity-[0.018]"
      />

      <Hero
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        cta={home.hero.cta.primary}
      />

      <WhatWeDo
        eyebrow={home.whatWeDo.eyebrow}
        lead={home.whatWeDo.lead}
        body={home.whatWeDo.body}
        capabilities={home.whatWeDo.capabilities}
      />

      <WhyNotSaas
        eyebrow={home.whyNotSaas.eyebrow}
        rent={home.whyNotSaas.rent}
        ownLead={home.whyNotSaas.ownLead}
        ownAccent={home.whyNotSaas.ownAccent}
        closing={home.whyNotSaas.closing}
      />

      <HowWeWork
        eyebrow={home.howWeWork.eyebrow}
        thesis={home.howWeWork.thesis}
        steps={home.howWeWork.steps}
      />

      <Offers
        eyebrow={home.offers.eyebrow}
        primary={home.offers.primary}
        more={home.offers.more}
      />

      {/* Final CTA + Footer. CTAContent owns <section data-section="cta">, pins its
          content like the hero (revealed in place on scroll), and renders the
          Footer pinned at the bottom of that section. */}
      <CTAContent title={home.cta.title} primaryCTA={home.cta.primary}>
        <Footer locale={locale} />
      </CTAContent>
    </>
  );
}
