import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import type { Article, ArticleFrontmatter } from "./types";

const articlesDirectory = path.join(process.cwd(), "articles");

/**
 * Get all articles for a specific locale.
 *
 * Wrapped in React `cache()` so repeated calls within a single request
 * (page render + generateMetadata + generateStaticParams) reuse one
 * filesystem read + gray-matter parse instead of re-reading each time.
 */
export const getAllArticles = cache((locale: string): Article[] => {
  const localeDir = path.join(articlesDirectory, locale);

  // Return empty array if directory doesn't exist
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir);
  const articles = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(localeDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...(data as ArticleFrontmatter),
      };
    });

  // Sort by date (newest first)
  return articles.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
});

/**
 * Get a single article by slug for a specific locale.
 *
 * Wrapped in React `cache()` so the same (slug, locale) is read and parsed
 * once per request even when referenced by both metadata and the page.
 */
export const getArticleBySlug = cache(
  (slug: string, locale: string): Article | null => {
    const fullPath = path.join(articlesDirectory, locale, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as ArticleFrontmatter),
    };
  }
);

export type { Article, ArticleFrontmatter };
