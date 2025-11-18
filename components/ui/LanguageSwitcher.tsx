"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

type Props = {
  currentLocale: Locale;
};

/**
 * LanguageSwitcher
 * Client component for switching between available languages.
 * Updates the URL to preserve the current route while changing locale.
 * Displays as a dropdown button.
 */
export default function LanguageSwitcher({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Replace the locale in the pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");

    router.push(newPath);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full transition-colors text-foreground/70 hover:text-foreground hover:bg-background/50"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{currentLocale.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-32 rounded-md bg-background/95 backdrop-blur-md border border-border/50 shadow-lg py-1 z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => handleLanguageChange(locale)}
              className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                currentLocale === locale
                  ? "bg-accent/20 text-accent font-medium"
                  : "text-foreground/70 hover:text-accent hover:bg-background/50"
              }`}
              aria-label={`Switch to ${localeNames[locale]}`}
              aria-current={currentLocale === locale ? "page" : undefined}
            >
              {localeNames[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

