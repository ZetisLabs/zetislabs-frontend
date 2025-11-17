import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LocaleScript from "@/components/ui/LocaleScript";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { getTranslation } from "@/lib/i18n";
import { type Locale } from "@/i18n/config";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = (key: string) => getTranslation(locale, key);

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <>
      {/* Set html lang attribute based on locale */}
      <LocaleScript />
      {/* Language Switcher - Fixed top-right */}
      <div className="fixed top-4 right-4 z-50">
        <div className="rounded-md bg-background/75 backdrop-blur-md border-[0.75px] border-border/50 shadow-sm px-3 py-2">
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
      <div className="flex min-h-screen flex-col">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
    </>
  );
}

