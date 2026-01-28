/**
 * Landing Page Variants - Translation Index
 *
 * This module exports all landing page variant translations for A/B testing.
 *
 * Variants:
 * - A: Anti No-Code (tech-savvy SMBs frustrated with Zapier/Make)
 * - B: Time Savings / ROI (non-technical executives, results-focused)
 * - C: Frictionless Integration (SMBs burned by complex tools)
 * - D: AI Agents (early adopters, AI-curious)
 *
 * Usage:
 * ```tsx
 * import { getLandingTranslation } from '@/i18n/translations/landing-pages';
 *
 * const content = getLandingTranslation('A', 'fr');
 * console.log(content.hero.title.default);
 * ```
 */

// French variants
import variantAFr from "./A.fr.json";
import variantBFr from "./B.fr.json";
import variantCFr from "./C.fr.json";
import variantDFr from "./D.fr.json";

// English variants
import variantAEn from "./A.en.json";
import variantBEn from "./B.en.json";
import variantCEn from "./C.en.json";
import variantDEn from "./D.en.json";

export type LandingVariant = "A" | "B" | "C" | "D";
export type LandingLocale = "en" | "fr";

export type LandingTranslation = typeof variantAFr;

const translations: Record<
  LandingVariant,
  Record<LandingLocale, LandingTranslation>
> = {
  A: { fr: variantAFr, en: variantAEn },
  B: { fr: variantBFr, en: variantBEn },
  C: { fr: variantCFr, en: variantCEn },
  D: { fr: variantDFr, en: variantDEn },
};

/**
 * Get translations for a specific landing page variant and locale
 */
export function getLandingTranslation(
  variant: LandingVariant,
  locale: LandingLocale
): LandingTranslation {
  return translations[variant][locale];
}

/**
 * Get all available variants metadata
 */
export function getVariantsMetadata() {
  return {
    A: {
      angle: "anti-nocode",
      target: {
        fr: "PME tech-savvy, frustrés par Zapier/Make",
        en: "Tech-savvy SMBs, frustrated with Zapier/Make",
      },
      recommended: {
        traffic: ["LinkedIn", "tech audiences"],
      },
    },
    B: {
      angle: "time-saving",
      target: {
        fr: "Dirigeants PME, non-techniques",
        en: "SMB executives, non-technical",
      },
      recommended: {
        traffic: ["Google Ads", "business audiences"],
        default: true,
      },
    },
    C: {
      angle: "frictionless-integration",
      target: {
        fr: "PME échaudées par des outils complexes",
        en: "SMBs burned by complex tools",
      },
      recommended: {
        traffic: ["Referral", "word of mouth"],
      },
    },
    D: {
      angle: "ai-agents",
      target: {
        fr: "Early adopters, curieux de l'IA",
        en: "Early adopters, AI-curious",
      },
      recommended: {
        traffic: ["AI searches", "LinkedIn AI content"],
      },
    },
  } as const;
}

// Re-export individual translations for direct imports
export {
  variantAFr,
  variantAEn,
  variantBFr,
  variantBEn,
  variantCFr,
  variantCEn,
  variantDFr,
  variantDEn,
};
