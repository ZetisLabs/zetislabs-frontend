/**
 * i18n Configuration
 * Defines supported locales and default locale settings
 */

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/**
 * Check if a string is a valid locale
 */
export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

