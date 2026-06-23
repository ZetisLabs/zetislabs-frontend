import { locales, defaultLocale, localePath, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/seo/config";

/**
 * Absolute URL for a logical (locale, path) pair under the "French at the root,
 * /en for English" scheme. `path` is the locale-less path (e.g. "/", "/blog").
 */
export function localeUrl(locale: Locale, path: string = "/"): string {
  return `${siteConfig.url}${localePath(locale, path)}`;
}

/**
 * Build the Metadata `alternates` block (canonical + hreflang) for a path.
 *
 * - `canonical` points at the current locale's URL.
 * - `languages` lists each available locale (bare codes `fr`/`en`).
 * - `x-default` points at the French version when available (the primary
 *   market), otherwise the first available locale.
 *
 * `langs` restricts the alternate set — pass a subset for content that does not
 * exist in every locale (e.g. an article only translated to French).
 */
export function buildAlternates(
  locale: Locale,
  path: string = "/",
  langs: readonly Locale[] = locales
) {
  const languages: Record<string, string> = {};
  for (const loc of langs) {
    languages[loc] = localeUrl(loc, path);
  }
  const xDefault = langs.includes(defaultLocale) ? defaultLocale : langs[0];
  if (xDefault) {
    languages["x-default"] = localeUrl(xDefault, path);
  }

  return {
    canonical: localeUrl(locale, path),
    languages,
  };
}
