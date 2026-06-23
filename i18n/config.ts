/**
 * i18n Configuration
 * Defines supported locales and default locale settings
 */

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

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

/**
 * Map a logical (locale, path) pair to its public URL path under the
 * "default locale at the root" scheme:
 *   - fr (default) → no prefix      ("/", "/blog", "/contact")
 *   - en           → "/en" prefix   ("/en", "/en/blog")
 *
 * `path` is the locale-less logical path (always starts with "/").
 */
export const localePath = (locale: Locale, path: string = "/"): string => {
  const clean = path === "/" ? "" : path;
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${prefix}${clean}` || "/";
};

/**
 * Strip a leading locale segment from a pathname, returning the locale-less
 * logical path. "/en/blog" → "/blog", "/blog" → "/blog", "/en" → "/", "/" → "/".
 */
export const stripLocalePrefix = (pathname: string): string => {
  const segments = pathname.split("/");
  if (isValidLocale(segments[1])) {
    segments.splice(1, 1);
  }
  const path = segments.join("/");
  return path === "" ? "/" : path;
};
