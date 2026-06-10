"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isValidLocale, defaultLocale } from "@/i18n/config";

export default function LocaleScript() {
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const locale = segments[0] || defaultLocale;

    if (isValidLocale(locale)) {
      document.documentElement.lang = locale;
    } else {
      document.documentElement.lang = defaultLocale;
    }
  }, [pathname]);

  return null;
}
