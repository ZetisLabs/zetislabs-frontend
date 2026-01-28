import { defaultLocale, type Locale } from "@/i18n/config";
import enTranslations from "@/i18n/translations/default/en.json";
import frTranslations from "@/i18n/translations/default/fr.json";

// Type for the translations object structure
export type Translations = typeof enTranslations;

// Type for nested translation values (supports strings, arrays, objects, and arrays of objects)
type NestedValue =
  | string
  | string[]
  | { [key: string]: NestedValue }
  | NestedValue[];

const translations: Record<Locale, Translations> = {
  en: enTranslations,
  fr: frTranslations,
};

/**
 * Get translation for a given key and locale
 * Supports nested keys using dot notation (e.g., "home.hero.title")
 */
export const getTranslation = (locale: Locale, key: string): string => {
  const keys = key.split(".");
  let value: NestedValue = translations[locale] || translations[defaultLocale];

  for (const k of keys) {
    if (
      value === undefined ||
      value === null ||
      typeof value === "string" ||
      Array.isArray(value)
    ) {
      // Fallback to default locale if translation is missing or is an array
      let fallbackValue: NestedValue = translations[defaultLocale];
      for (const fallbackKey of keys) {
        if (
          fallbackValue === undefined ||
          fallbackValue === null ||
          typeof fallbackValue === "string" ||
          Array.isArray(fallbackValue)
        )
          break;
        fallbackValue = fallbackValue[fallbackKey];
      }
      value = fallbackValue;
      break;
    }
    value = value[k];
  }

  // Development warning for missing translations
  if (typeof value !== "string") {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[i18n] Missing translation for key: "${key}" in locale: "${locale}"`
      );
    }
    return key;
  }

  return value;
};

/**
 * Get all translations for a given locale
 */
export const getTranslations = (locale: Locale) => {
  return translations[locale] || translations[defaultLocale];
};
