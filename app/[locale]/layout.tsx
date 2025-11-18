import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LocaleScript from "@/components/ui/LocaleScript";
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
      <div className="flex min-h-screen flex-col">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
    </>
  );
}

