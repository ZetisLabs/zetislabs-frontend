"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isValidLocale, defaultLocale } from "@/i18n/config";

/**
 * LocaleScript
 * Client component that sets the html lang attribute based on the URL pathname.
 * This ensures the lang attribute is set correctly for SEO and accessibility.
 */
export default function LocaleScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract locale from pathname (first segment after /)
    const segments = pathname.split("/").filter(Boolean);
    const locale = segments[0] || defaultLocale;

    // Set lang attribute if valid locale
    if (isValidLocale(locale)) {
      document.documentElement.lang = locale;
    } else {
      document.documentElement.lang = defaultLocale;
    }
  }, [pathname]);

  return null;
}

