import type { Metadata } from "next";
import { type Locale, isValidLocale, defaultLocale } from "@/i18n/config";
import { getTranslation, getTranslations } from "@/lib/i18n";
import { siteConfig } from "@/lib/seo/config";
import { buildAlternates, localeUrl } from "@/lib/seo/alternates";
import { WebGLAnimationModeOverride } from "@/components/providers";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Footer from "@/components/layout/Footer";
import { VeilleAoContent } from "./components/VeilleAoContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const t = (key: string) => getTranslation(locale, key);

  const title = t("veilleAo.metaTitle");
  const description = t("veilleAo.metaDescription");
  const url = localeUrl(locale, "/veille-ao");

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: buildAlternates(locale, "/veille-ao"),
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
    // Real conversion page now — index it (the previous coming-soon was noindex).
    robots: { index: true, follow: true },
  };
}

export default async function VeilleAoPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const t = (key: string) => getTranslation(locale, key);
  const dict = getTranslations(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t("header.home"), url: localeUrl(locale, "/") },
          {
            name: t("veilleAo.hero.eyebrow"),
            url: localeUrl(locale, "/veille-ao"),
          },
        ]}
      />

      {/* Calm long-form surface: WebGL arc off, flat swiss-paper dot grid behind
          the whole page (consistent with the contact / coming-soon screens). */}
      <WebGLAnimationModeOverride mode="none">
        <div
          className="pointer-events-none fixed inset-0 -z-10 swiss-paper"
          aria-hidden="true"
        />

        <VeilleAoContent content={dict.veilleAo} />

        <Footer locale={locale} />
      </WebGLAnimationModeOverride>
    </>
  );
}
