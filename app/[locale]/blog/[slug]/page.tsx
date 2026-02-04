import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
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
          url: article.image,
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
      images: [article.image],
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

  return (
    <>
      {/* Structured Data */}
      <ArticleJsonLd article={article} locale={locale} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <article className="min-h-screen text-foreground selection:bg-foreground selection:text-background">
        {/* Header Spacing */}
        <div className="h-24 md:h-32" />

        {/* Back Link */}
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href={`/${locale}/blog`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{locale === "fr" ? "Retour au blog" : "Back to blog"}</span>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-foreground/5">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="rounded-xl border-[0.75px] border-border/50 bg-background/75 px-6 py-8 shadow-sm backdrop-blur-md md:px-10 md:py-12">
            {/* Meta */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-bold tracking-[0.3em] text-foreground/40 uppercase">
                {article.category}
              </span>
              <span className="text-[10px] tracking-[0.25em] text-foreground/40 uppercase">
                {article.date}
              </span>
              <div className="flex items-center gap-1 text-[10px] tracking-widest text-foreground/40 uppercase">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </div>
            </div>

            {/* Title - H1 for SEO */}
            <h1 className="mb-6 font-sans text-3xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {/* Author */}
            <div className="mb-8 flex items-center gap-3 border-b border-foreground/10 pb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-sm font-bold">
                {article.author.avatar}
              </div>
              <div>
                <p className="text-sm font-bold">{article.author.name}</p>
                <p className="text-xs text-foreground/40">
                  {locale === "fr" ? "Auteur" : "Author"}
                </p>
              </div>
            </div>

            {/* Article Body */}
            <ArticleContent content={article.content} />
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 mt-16 border-t border-border/40">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-[11px] text-foreground/50">
            <p>© 2024 ZetisLabs. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="cursor-pointer transition-colors hover:text-foreground"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
