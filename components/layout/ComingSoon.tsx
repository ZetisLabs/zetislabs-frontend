import type { Metadata } from "next";
import { WebGLAnimationModeOverride } from "@/components/providers";
import Footer from "@/components/layout/Footer";
import { CTAButton, EyebrowBadge } from "@/lib/ui";
import { getTranslation } from "@/lib/i18n";
import {
  type Locale,
  isValidLocale,
  defaultLocale,
  locales,
} from "@/i18n/config";
import { siteConfig } from "@/lib/seo/config";

/** Footer section keys that currently resolve to a placeholder page. */
export type WipSection = "legal" | "privacy" | "terms" | "cookies";

/**
 * Metadata for a placeholder ("coming soon") page. Mirrors the contact page's
 * shape but flips robots to `noindex` — these pages have no real content yet, so
 * we keep them out of the index until they're written.
 */
export function buildWipMetadata(
  localeParam: string,
  section: WipSection
): Metadata {
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const t = (key: string) => getTranslation(locale, key);

  const sectionLabel = t(`footer.${section}`);
  const title = `${sectionLabel} — ${t("wip.metaTitleSuffix")}`;
  const description = t("wip.metaDescription");
  const url = `${siteConfig.url}/${locale}/${section}`;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${siteConfig.url}/${loc}/${section}`;
  }
  languages["x-default"] = `${siteConfig.url}/${defaultLocale}/${section}`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url, languages },
    // Placeholder — do not index until the real content ships.
    robots: { index: false, follow: true },
  };
}

type Props = {
  locale: Locale;
  /** Footer key for the section label shown in the eyebrow (legal pages). */
  section?: WipSection;
  /** Explicit eyebrow label — takes precedence over `section`. */
  eyebrow?: string;
  /** Heading override (defaults to the generic `wip.title`). */
  title?: string;
  /** Body override (defaults to the generic `wip.description`). */
  description?: string;
  /** Status-line override (defaults to the generic `wip.status`). */
  status?: string;
};

/**
 * ComingSoon
 *
 * On-brand placeholder for pages whose real content isn't written yet — the
 * legal pages (legal, privacy, terms, cookies, via `section`) and the offer
 * landings still in preparation (via the `eyebrow`/`title`/… overrides). Same
 * calm surface as the contact page: WebGL arc disabled, flat Swiss-paper dot
 * grid, single screen with the footer pinned below. Left-anchored so the
 * negative space falls to the right (Swiss, asymmetric). Accent is reserved for
 * the one spot of "life" — the pulsing in-progress dot.
 */
export function ComingSoon({
  locale,
  section,
  eyebrow,
  title,
  description,
  status,
}: Props) {
  const t = (key: string) => getTranslation(locale, key);

  const eyebrowLabel = eyebrow ?? (section ? t(`footer.${section}`) : "");
  const heading = title ?? t("wip.title");
  const body = description ?? t("wip.description");
  const statusLabel = status ?? t("wip.status");

  return (
    <WebGLAnimationModeOverride mode="none">
      <div
        className="pointer-events-none fixed inset-0 -z-10 swiss-paper"
        aria-hidden="true"
      />

      <section className="flex min-h-[calc(100dvh-4rem)] flex-col">
        <div className="mx-auto flex w-full max-w-screen-xl flex-1 items-center px-4 py-10 md:py-14">
          <div className="hero-entrance hero-entrance-1 w-full max-w-xl">
            <EyebrowBadge>{eyebrowLabel}</EyebrowBadge>

            <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {heading}
            </h1>

            <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/55">
              {body}
            </p>

            {/* In-progress indicator — the page's only spot of accent. The ping
                layer is hidden under reduced-motion, leaving the static dot. */}
            <div className="mt-6 inline-flex items-center gap-2.5 text-sm text-foreground/70">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_0_3px_rgba(58,123,213,0.18)]" />
              </span>
              {statusLabel}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton
                href={`/${locale}/contact`}
                variant="primary"
                ariaLabel={t("wip.contactAriaLabel")}
              >
                {t("wip.contactCta")}
              </CTAButton>
              <CTAButton
                href={`/${locale}`}
                variant="secondary"
                ariaLabel={t("wip.backAriaLabel")}
              >
                {t("wip.back")}
              </CTAButton>
            </div>
          </div>
        </div>

        <Footer locale={locale} />
      </section>
    </WebGLAnimationModeOverride>
  );
}
