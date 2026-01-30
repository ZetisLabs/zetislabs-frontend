import Link from "next/link";
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
  const copyright = t("footer.copyright").replace(
    "{year}",
    currentYear.toString()
  );

  return (
    <footer className="relative z-10 border-t border-border/40">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-2 text-[11px] text-foreground/50">
        <p>{copyright}</p>
        <div className="flex items-center gap-3">
          <Link
            href="/legal"
            className="transition-colors hover:text-foreground"
          >
            {t("footer.legal")}
          </Link>
          <span className="text-foreground/30">·</span>
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            {t("footer.privacy")}
          </Link>
          <span className="text-foreground/30">·</span>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            {t("footer.terms")}
          </Link>
          <span className="text-foreground/30">·</span>
          <Link
            href="/cookies"
            className="transition-colors hover:text-foreground"
          >
            {t("footer.cookies")}
          </Link>
          <span className="text-foreground/30">·</span>
          <Link
            href="/contact"
            className="transition-colors hover:text-foreground"
          >
            {t("footer.contact")}
          </Link>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </footer>
  );
}
