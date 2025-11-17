"use client";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

type Props = {
  currentLocale: Locale;
};

/**
 * LanguageSwitcher
 * Client component for switching between available languages.
 * Updates the URL to preserve the current route while changing locale.
 */
export default function LanguageSwitcher({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Replace the locale in the pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => handleLanguageChange(locale)}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            currentLocale === locale
              ? "bg-accent/20 text-accent font-medium"
              : "text-foreground/70 hover:text-accent"
          }`}
          aria-label={`Switch to ${localeNames[locale]}`}
          aria-current={currentLocale === locale ? "page" : undefined}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

