import type { Metadata } from "next";
import {
  type Locale,
  isValidLocale,
  defaultLocale,
  locales,
} from "@/i18n/config";
import { getTranslation } from "@/lib/i18n";
import { siteConfig } from "@/lib/seo/config";
import { ComingSoon } from "@/components/layout/ComingSoon";

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
  const url = `${siteConfig.url}/${locale}/veille-ao`;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${siteConfig.url}/${loc}/veille-ao`;
  }
  languages["x-default"] = `${siteConfig.url}/${defaultLocale}/veille-ao`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url, languages },
    // Placeholder offer landing — keep it out of the index until the real
    // content ships.
    robots: { index: false, follow: true },
  };
}

export default async function VeilleAoPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const t = (key: string) => getTranslation(locale, key);

  return (
    <ComingSoon
      locale={locale}
      eyebrow={t("veilleAo.eyebrow")}
      title={t("veilleAo.title")}
      description={t("veilleAo.description")}
      status={t("veilleAo.status")}
    />
  );
}
