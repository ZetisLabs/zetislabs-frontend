import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import LocaleScript from "@/components/ui/LocaleScript";
import {
  EffectProvider,
  WebGLAnimationModeProvider,
} from "@/components/providers";
import { WebGLBackgroundLazy } from "@/components/webgl/WebGLBackgroundLazy";
import { getTranslation } from "@/lib/i18n";
import {
  type Locale,
  isValidLocale,
  defaultLocale,
  locales,
} from "@/i18n/config";
import { siteConfig } from "@/lib/seo/config";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const t = (key: string) => getTranslation(locale, key);

  const title = t("metadata.title");
  const description = t("metadata.description");
  const url = `${siteConfig.url}/${locale}`;

  // Build hreflang alternates
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${siteConfig.url}/${loc}`;
  }
  languages["x-default"] = `${siteConfig.url}/${defaultLocale}`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitter,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/icon.svg",
      shortcut: "/favicon.ico",
      apple: "/apple-icon",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;

  return (
    <EffectProvider>
      <WebGLAnimationModeProvider defaultMode="intro">
        {/* JSON-LD Structured Data */}
        <OrganizationJsonLd />
        <WebSiteJsonLd locale={locale} />
        {/* Set html lang attribute based on locale */}
        <LocaleScript />
        <WebGLBackgroundLazy animationMode="intro" />
        <div className="flex min-h-screen flex-col">
          <Header locale={locale} />
          <main className="relative z-10 flex-1 overflow-x-hidden">
            {children}
          </main>
        </div>
      </WebGLAnimationModeProvider>
    </EffectProvider>
  );
}
