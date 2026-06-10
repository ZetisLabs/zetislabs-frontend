import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import {
  isValidLocale,
  defaultLocale,
  locales,
  type Locale,
} from "@/i18n/config";
import { siteConfig } from "@/lib/seo/config";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ArticleContent } from "../components/ArticleContent";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// DD.MM.YY from an ISO-ish date, falling back to the raw string. Mirrors the
// blog index (BlogClient) so dates read identically across the Journal.
function formatDate(raw: string): string {
  const m = raw?.match(/(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}.${m[2]}.${m[1].slice(2)}` : raw;
}

// Generate static params for all articles
export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const articles = getAllArticles(locale);
    for (const article of articles) {
      params.push({ locale, slug: article.slug });
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;

  const article = getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const url = `${siteConfig.url}/${locale}/blog/${slug}`;

  // Build hreflang alternates for this article
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    // Check if article exists in this locale
    const locArticle = getArticleBySlug(slug, loc);
    if (locArticle) {
      languages[loc] = `${siteConfig.url}/${loc}/blog/${slug}`;
    }
  }

  return {
    title: `${article.title} | ${siteConfig.name}`,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      site: siteConfig.twitter,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: url,
      languages,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;

  const article = getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Blog", url: `${siteConfig.url}/${locale}/blog` },
    { name: article.title, url: `${siteConfig.url}/${locale}/blog/${slug}` },
  ];

  const isFr = locale === "fr";

  return (
    <>
      {/* Structured Data */}
      <ArticleJsonLd article={article} locale={locale} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* The reading surface: swiss-paper dot grid from BlogLayout, no card,
          no hero crop — a single Swiss editorial column aligned to the index. */}
      <article className="min-h-screen text-foreground selection:bg-foreground selection:text-background">
        <div className="mx-auto max-w-2xl px-6 pt-28 pb-24 md:pt-36">
          {/* Back to the Journal — quiet eyebrow, the arrow wakes to accent */}
          <Link
            href={`/${locale}/blog`}
            className="hero-entrance hero-entrance-1 group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-foreground/40 uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:text-accent motion-reduce:transition-none" />
            <span>Journal</span>
          </Link>

          {/* Header */}
          <header className="mt-12 md:mt-16">
            {/* Meta — date · readTime, tabular and discreet (matches the index) */}
            <p className="hero-entrance hero-entrance-1 text-[11px] tracking-[0.18em] text-foreground/40 uppercase">
              <span className="tabular-nums">{formatDate(article.date)}</span>
              <span className="px-1.5 text-foreground/20">·</span>
              <span className="tabular-nums">{article.readTime}</span>
            </p>

            {/* Title — GeneralSans, tight tracking, H1 for SEO */}
            <h1 className="hero-entrance hero-entrance-2 mt-5 font-heading text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] text-balance md:text-[2.75rem] md:leading-[1.05]">
              {article.title}
            </h1>

            {/* Accent dash — the header's one spot of life */}
            <span
              aria-hidden="true"
              className="hero-entrance hero-entrance-3 mt-6 block h-0.5 w-10 rounded-full bg-accent"
            />

            {/* Byline — no avatar, no rule */}
            <p className="hero-entrance hero-entrance-3 mt-5 text-sm font-medium text-foreground/55">
              {article.author.name}
            </p>
          </header>

          {/* Article body */}
          <div className="hero-entrance hero-entrance-4 mt-12 md:mt-14">
            <ArticleContent content={article.content} />
          </div>

          {/* End mark — organic dash + return, no horizontal rule */}
          <footer className="mt-20 flex flex-col items-center gap-6 text-center">
            <span
              aria-hidden="true"
              className="block h-0.5 w-6 rounded-full bg-foreground/20"
            />
            <Link
              href={`/${locale}/blog`}
              className="group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-foreground/45 uppercase transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:text-accent motion-reduce:transition-none" />
              {isFr ? "Retour au Journal" : "Back to the Journal"}
            </Link>
            <p className="text-[11px] text-foreground/35">
              © {new Date().getFullYear()} ZetisLabs
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}
