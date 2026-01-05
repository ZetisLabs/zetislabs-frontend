import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LocaleScript from "@/components/ui/LocaleScript";
import { EffectProvider } from "@/components/providers";
import { WebGLBackground } from "@/components/webgl/WebGLBackground";
import { getTranslation } from "@/lib/i18n";
import { type Locale, isValidLocale, defaultLocale } from "@/i18n/config";

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

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;

  return (
    <EffectProvider>
      {/* Set html lang attribute based on locale */}
      <LocaleScript />
      <WebGLBackground animationMode="intro" />
      <div className="flex min-h-screen flex-col">
        <Header locale={locale} />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
    </EffectProvider>
  );
}
