import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Sans } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
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

/**
 * IBM Plex Sans - Google Font for body text
 * Supports weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
 */
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

/**
 * GeneralSans font family - loaded from local files (used for headings)
 * Supports multiple weights: 200 (Extralight), 300 (Light), 400 (Regular),
 * 500 (Medium), 600 (Semibold), 700 (Bold)
 */
const generalSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-ExtralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans/GeneralSans-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

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
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${generalSans.variable} ${ibmPlexSans.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <EffectProvider>
          <WebGLAnimationModeProvider defaultMode="intro">
            {/* JSON-LD Structured Data */}
            <OrganizationJsonLd />
            <WebSiteJsonLd locale={locale} />
            <WebGLBackgroundLazy animationMode="intro" />
            <div className="flex min-h-screen flex-col">
              <Header locale={locale} />
              <main className="relative z-10 flex-1 overflow-x-hidden">
                {children}
              </main>
            </div>
          </WebGLAnimationModeProvider>
        </EffectProvider>
      </body>
    </html>
  );
}
