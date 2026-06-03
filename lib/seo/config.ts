/**
 * SEO Configuration
 * Central place for all SEO-related constants
 */

export const siteConfig = {
  name: "ZetisLabs",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zetislabs.com",
  description: {
    en: "Custom AI tools you own — RAG, agents, deep integration. ZetisLabs is a French AI lab helping companies cross a real AI threshold.",
    fr: "Des outils IA sur-mesure que vous possédez — RAG, agents, intégration. ZetisLabs, le labo IA qui aide les entreprises à passer un cap.",
  },
  defaultLocale: "fr" as const,
  locales: ["en", "fr"] as const,
  twitter: "@zetislabs",
  ogImage: "/og-image.png",
};

export type SiteLocale = (typeof siteConfig.locales)[number];
