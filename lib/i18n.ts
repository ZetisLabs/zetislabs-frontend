import { defaultLocale, type Locale } from "@/i18n/config";
import enTranslations from "@/i18n/translations/en.json";
import frTranslations from "@/i18n/translations/fr.json";

type TranslationKeys = keyof typeof enTranslations;

const translations = {
  en: enTranslations,
  fr: frTranslations,
} as const;

/**
 * Get translation for a given key and locale
 * Supports nested keys using dot notation (e.g., "home.hero.title")
 */
export const getTranslation = (locale: Locale, key: string): string => {
  const keys = key.split(".");
  let value: any = translations[locale] || translations[defaultLocale];

  for (const k of keys) {
    if (value === undefined || value === null) {
      // Fallback to default locale if translation is missing
      value = translations[defaultLocale];
      for (const fallbackKey of keys) {
        if (value === undefined || value === null) break;
        value = value[fallbackKey];
      }
      break;
    }
    value = value[k];
  }

  return typeof value === "string" ? value : key;
};

/**
 * Get all translations for a given locale
 */
export const getTranslations = (locale: Locale) => {
  return translations[locale] || translations[defaultLocale];
};
