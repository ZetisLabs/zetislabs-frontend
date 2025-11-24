import { getTranslation } from "@/lib/i18n";
import { type Locale } from "@/i18n/config";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

type Props = {
  locale: Locale;
};

/**
 * Footer
 * Minimal footer with muted text and a slim border, matching the
 * minimalist aesthetic.
 */
export default function Footer({ locale }: Props) {
  const t = (key: string) => getTranslation(locale, key);
  const currentYear = new Date().getFullYear();
  const copyright = t("footer.copyright").replace("{year}", currentYear.toString());

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-foreground/70 sm:flex-row">
        <p>{copyright}</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">
            {t("footer.privacy")}
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            {t("footer.terms")}
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            {t("footer.contact")}
          </a>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </footer>
  );
}

