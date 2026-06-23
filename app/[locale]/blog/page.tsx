import { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { isValidLocale, defaultLocale, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/seo/config";
import { buildAlternates, localeUrl } from "@/lib/seo/alternates";
import { BlogClient } from "./components/BlogClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;

  const title = locale === "fr" ? "Blog | ZetisLabs" : "Blog | ZetisLabs";
  const description =
    locale === "fr"
      ? "Découvrez nos articles sur l'IA, l'automatisation et l'ingénierie logicielle."
      : "Discover our articles on AI, automation and software engineering.";

  const url = localeUrl(locale, "/blog");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/blog"),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitter,
    },
  };
}

export default async function BlogListingPage({ params }: Props) {
  const { locale } = await params;

  // Load articles from markdown files
  const articles = getAllArticles(locale);

  return <BlogClient articles={articles} locale={locale} />;
}
