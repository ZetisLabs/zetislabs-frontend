import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article, ArticleFrontmatter } from "./types";

const articlesDirectory = path.join(process.cwd(), "articles");

/**
 * The article page renders the frontmatter `title` as the page's single <h1>.
 * Article bodies conventionally open with that same title as a leading `# …`
 * heading, which would render a second, duplicate <h1> (the title shown twice).
 * Strip that leading heading when it matches the title; any other leading
 * heading is left untouched.
 */
function stripDuplicateTitle(content: string, title?: string): string {
  if (!title) return content;
  const normalize = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();
  const lines = content.replace(/^﻿/, "").split("\n");

  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;

  const match = lines[i]?.match(/^#\s+(.*\S)\s*$/);
  if (match && normalize(match[1]) === normalize(title)) {
    return lines
      .slice(i + 1)
      .join("\n")
      .replace(/^\s*\n/, "");
  }
  return content;
}

/**
 * Get all articles for a specific locale
 */
export function getAllArticles(locale: string): Article[] {
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
      const frontmatter = data as ArticleFrontmatter;

      return {
        slug,
        content: stripDuplicateTitle(content, frontmatter.title),
        ...frontmatter,
      };
    });

  // Sort by date (newest first)
  return articles.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single article by slug for a specific locale
 */
export function getArticleBySlug(slug: string, locale: string): Article | null {
  const fullPath = path.join(articlesDirectory, locale, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as ArticleFrontmatter;

  return {
    slug,
    content: stripDuplicateTitle(content, frontmatter.title),
    ...frontmatter,
  };
}

/**
 * Get all article slugs for a specific locale (useful for static generation)
 */
export function getArticleSlugs(locale: string): string[] {
  const localeDir = path.join(articlesDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs
    .readdirSync(localeDir)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export type { Article, ArticleFrontmatter };
