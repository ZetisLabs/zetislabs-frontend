import { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { localeUrl, buildAlternates } from "@/lib/seo/alternates";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

export default function sitemap(): MetadataRoute.Sitemap {
  // hreflang alternates for a path, limited to the locales it exists in.
  // Reused on every entry so each <url> declares the full language set
  // (fr at the root, /en for English, x-default → French) — the form Google
  // expects for a multilingual sitemap.
  const alternatesFor = (path: string, langs: readonly Locale[] = locales) => ({
    languages: buildAlternates(locales[0], path, langs).languages,
  });

  // Static pages: one <url> per locale, each annotated with the alternate set.
  // French (default) sits at the prefix-less root; English keeps its /en prefix.
  const staticPages: {
    path: string;
    changeFrequency: ChangeFrequency;
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/veille-ao", changeFrequency: "monthly", priority: 0.9 },
    { path: "/blog", changeFrequency: "daily", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  ];

  const staticEntries = staticPages.flatMap(
    ({ path, changeFrequency, priority }) =>
      locales.map((locale) => ({
        url: localeUrl(locale, path),
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: alternatesFor(path),
      }))
  );
  // Note: the legal placeholders (/legal, /privacy, /terms, /cookies) are
  // intentionally excluded — they're robots:noindex until written, and listing
  // a noindex URL in the sitemap sends a conflicting signal to crawlers.

  // Blog articles: alternates limited to the locales the article is written in.
  const articleEntries = locales.flatMap((locale) =>
    getAllArticles(locale).map((article) => {
      const path = `/blog/${article.slug}`;
      const langs = locales.filter((loc) =>
        Boolean(getArticleBySlug(article.slug, loc))
      );
      return {
        url: localeUrl(locale, path),
        lastModified: new Date(article.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: alternatesFor(path, langs),
      };
    })
  );

  return [...staticEntries, ...articleEntries];
}
