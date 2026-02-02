/**
 * SEO Configuration
 * Central place for all SEO-related constants
 */

export const siteConfig = {
  name: "ZetisLabs",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zetislabs.com",
  description: {
    en: "AI-powered automation solutions for modern businesses",
    fr: "Solutions d'automatisation alimentées par l'IA pour les entreprises modernes",
  },
  defaultLocale: "en" as const,
  locales: ["en", "fr"] as const,
  twitter: "@zetislabs",
  ogImage: "/og-image.png",
};

export type SiteLocale = (typeof siteConfig.locales)[number];
