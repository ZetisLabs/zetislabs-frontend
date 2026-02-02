import { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static pages for each locale
  const staticPages = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ]);

  // Blog articles for each locale
  const articlePages = locales.flatMap((locale) => {
    const articles = getAllArticles(locale);
    return articles.map((article) => ({
      url: `${baseUrl}/${locale}/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  });

  return [...staticPages, ...articlePages];
}
