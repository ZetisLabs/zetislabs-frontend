import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale, locales } from "@/i18n/config";

/**
 * Proxy for locale detection and routing
 * - Detects browser language preference
 * - Redirects root `/` to `/en` or `/fr` based on browser language
 * - Validates locale in URL and falls back to default if invalid
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has a valid locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Extract locale from pathname if present
  const pathnameLocale = pathname.split("/")[1];

  // If the first segment is a valid locale, continue
  if (isValidLocale(pathnameLocale)) {
    return NextResponse.next();
  }

  // For root path `/`, detect browser language
  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language");
    let detectedLocale = defaultLocale;

    if (acceptLanguage) {
      // Parse Accept-Language header
      const languages = acceptLanguage
        .split(",")
        .map((lang) => {
          const [locale, q = "q=1"] = lang.trim().split(";");
          const quality = parseFloat(q.replace("q=", ""));
          return { locale: locale.split("-")[0].toLowerCase(), quality };
        })
        .sort((a, b) => b.quality - a.quality);

      // Find first supported locale
      for (const lang of languages) {
        if (isValidLocale(lang.locale)) {
          detectedLocale = lang.locale;
          break;
        }
      }
    }

    // Redirect to detected locale
    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}`;
    return NextResponse.redirect(url);
  }

  // For other paths without locale, redirect to default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml, robots.txt (SEO files)
     * - public files (images, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|otf|ico)$).*)",
  ],
};
