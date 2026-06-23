import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale } from "@/i18n/config";

/**
 * Proxy for locale routing — "French at the root, /en for English".
 *
 * The default locale (fr) is served WITHOUT a URL prefix so the homepage and
 * every French page lives at the canonical root (`/`, `/blog`, `/contact`…).
 * There is no Accept-Language detection and no redirect on `/`: a French
 * prospect typing `zetislabs.com` gets French content with zero hops, and all
 * link equity stays on the root URLs.
 *
 *   - `/en`, `/en/…`  → served as-is (English keeps its prefix).
 *   - `/fr`, `/fr/…`  → 301 permanent to the prefix-less path (legacy URLs that
 *                       Google may already have indexed; consolidates equity).
 *   - everything else → internally rewritten to `/fr/…` so the `[locale]`
 *                       segment renders French while the visible URL stays clean.
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Legacy `/fr` URLs → 301 to the prefix-less canonical path.
  if (
    pathname === `/${defaultLocale}` ||
    pathname.startsWith(`/${defaultLocale}/`)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${defaultLocale}`.length) || "/";
    return NextResponse.redirect(url, 301);
  }

  // English keeps its `/en` prefix — serve as-is.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // Default locale (fr) at the root: rewrite to the `[locale]` tree internally,
  // keeping the visible URL prefix-less.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
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
