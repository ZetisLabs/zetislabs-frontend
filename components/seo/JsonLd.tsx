import { siteConfig } from "@/lib/seo/config";
import { localeUrl } from "@/lib/seo/alternates";
import { isValidLocale, defaultLocale, type Locale } from "@/i18n/config";
import type { Article } from "@/lib/articles";

/** Narrow a possibly-untrusted locale string to a Locale, defaulting to fr. */
const asLocale = (locale: string): Locale =>
  isValidLocale(locale) ? locale : defaultLocale;

interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.png`,
      width: 512,
      height: 512,
    },
    sameAs: [
      siteConfig.linkedin,
      siteConfig.github,
      `https://twitter.com/${siteConfig.twitter.replace("@", "")}`,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "French"],
    },
  };

  return <JsonLd data={data} />;
}

export function WebSiteJsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: localeUrl(asLocale(locale), "/"),
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  return <JsonLd data={data} />;
}

interface ArticleJsonLdProps {
  article: Article;
  locale: string;
}

export function ArticleJsonLd({ article, locale }: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": localeUrl(asLocale(locale), `/blog/${article.slug}`),
    },
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
  };

  return <JsonLd data={data} />;
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}
