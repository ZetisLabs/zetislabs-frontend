import Link from "next/link";
import { Linkedin } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import { type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/seo/config";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

type Props = {
  locale: Locale;
};

/**
 * Footer
 * Responsive footer with mobile-first design.
 * - Mobile: Stacked links with adequate touch targets
 * - Desktop: Single row with muted text
 */
export default function Footer({ locale }: Props) {
  const t = (key: string) => getTranslation(locale, key);
  const currentYear = new Date().getFullYear();
  const copyright = t("footer.copyright").replace(
    "{year}",
    currentYear.toString()
  );

  // Locale-prefixed so the links stay on the visitor's language. Without the
  // prefix, the proxy treats a locale-less path as the default locale (fr) and
  // redirects there — e.g. an English visitor would land on /fr/contact.
  const footerLinks = [
    { href: `/${locale}/legal`, label: t("footer.legal") },
    { href: `/${locale}/privacy`, label: t("footer.privacy") },
    { href: `/${locale}/terms`, label: t("footer.terms") },
    { href: `/${locale}/cookies`, label: t("footer.cookies") },
    { href: `/${locale}/contact`, label: t("footer.contact") },
  ];

  // Company LinkedIn — the one social entry point in the footer. Same hover
  // treatment as the contact page's social rail (muted → accent on hover).
  // Defined once so the mobile and desktop layouts stay identical.
  const linkedinButton = (
    <Link
      href={siteConfig.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("footer.linkedinAriaLabel")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-accent"
    >
      <Linkedin className="h-4 w-4" aria-hidden="true" />
    </Link>
  );

  return (
    <footer className="relative z-10 border-t border-border/40">
      {/* Mobile Layout */}
      <div className="mx-auto w-full max-w-screen-xl px-4 py-6 md:hidden">
        {/* Links Grid - 2 columns for better touch targets */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-11 items-center text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom row: Copyright + LinkedIn + Language */}
        <div className="flex items-center justify-between border-t border-border/20 pt-4">
          <p className="text-xs text-foreground/50">{copyright}</p>
          <div className="flex items-center gap-1">
            {linkedinButton}
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="mx-auto hidden w-full max-w-screen-xl items-center justify-between px-4 py-2 text-[11px] text-foreground/50 md:flex">
        <p>{copyright}</p>
        <div className="flex items-center gap-3">
          {footerLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-3">
              <Link
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="text-foreground/30">·</span>
              )}
            </span>
          ))}
          {linkedinButton}
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </footer>
  );
}
