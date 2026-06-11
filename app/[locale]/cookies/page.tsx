import type { Metadata } from "next";
import { type Locale, isValidLocale, defaultLocale } from "@/i18n/config";
import { ComingSoon, buildWipMetadata } from "@/components/layout/ComingSoon";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildWipMetadata(locale, "cookies");
}

export default async function CookiesPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;

  return <ComingSoon locale={locale} section="cookies" />;
}
