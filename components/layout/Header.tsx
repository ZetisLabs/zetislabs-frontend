"use client";
import Link from "next/link";
import Image from "next/image";
import { getTranslation } from "@/lib/i18n";
import { type Locale } from "@/i18n/config";
import { useElementEffect } from "../effects/hooks/useElementEffect";
import { EFFECT_LAYERS } from "../effects/EffectLayerProvider";

type Props = {
  locale: Locale;
};

/**
 * Header
 * Minimal top navigation inspired by Evervault's landing style.
 * - Left: brand logo
 * - Right: navigation menu and language switcher
 */
export default function Header({ locale }: Props) {
  const t = (key: string) => getTranslation(locale, key);

  // Effets de glow pour les liens de navigation
  // Note: UNDER_GRID (z-3) est masqué par la grille (z-5)
  // Utiliser ABOVE_GRID (z-6) pour un effet visible
  const homeEffect = useElementEffect<HTMLDivElement>({
    layer: EFFECT_LAYERS.UNDER_GRID, // z-6 - visible au-dessus de la grille
    trigger: "hover",
    color: "accent",
    padding: 8,
    trackOnScroll: false,
  });

  const blogEffect = useElementEffect<HTMLDivElement>({
    layer: EFFECT_LAYERS.UNDER_GRID, // z-6 - visible au-dessus de la grille
    trigger: "hover",
    color: "accent",
    padding: 8,
    trackOnScroll: false,
  });

  return (
    <header className="sticky top-4 z-50 mt-4 w-full bg-transparent">
      {/* Centered flex container holding logo and menu */}
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-nowrap items-center justify-center px-4 lg:w-5xl">
        {/* Blur bubble container */}
        <div className="flex w-auto animate-slide-down items-center justify-center gap-6 rounded-md border-[0.75px] border-border/50 bg-background/75 px-6 py-0 shadow-sm backdrop-blur-md">
          {/* Brand logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2"
            aria-label={t("header.logoAriaLabel")}
          >
            <Image
              src="/zetis-light-nbg-logo-v2.svg"
              alt="ZetisLabs logo"
              width={320}
              height={64}
              className="h-10 w-auto align-middle"
              priority
            />
          </Link>

          {/* Navigation menu */}
          <nav className="flex items-center gap-4 text-sm text-foreground">
            {/* Home link - ref et triggerProps attachés directement */}
            <Link
              href={`/${locale}`}
              className="nav-link nav-link-home group relative mx-1 rounded-full px-3 py-0.5 transition-colors hover:text-accent"
              aria-label={t("header.homeAriaLabel")}
            >
              {t("header.home")}
            </Link>
            {/* Blog link - ref et triggerProps attachés directement */}
            <Link
              href={`/${locale}/blog`}
              className="nav-link nav-link-blog group relative mx-1 rounded-full px-3 py-0.5 transition-colors hover:text-accent"
              aria-label={t("header.blogAriaLabel")}
            >
              {t("header.blog")}
            </Link>
          </nav>
        </div>

        {/* Shadow layer - positioned below the header bubble, mirrors nav structure */}
        <div className="pointer-events-none absolute flex h-auto w-auto items-center justify-center gap-6 px-6 py-0">
          {/* Logo spacer (invisible, matches logo width) */}
          <div className="pointer-events-none flex items-center gap-2 opacity-0">
            <Image
              src="/zetis-light-nbg-logo-v2.svg"
              alt="ZetisLabs logo"
              width={320}
              height={64}
              className="transparent h-10 w-auto align-middle"
              priority
            />
          </div>

          {/* Navigation shadow elements - aligned with nav buttons */}
          <div className="flex h-[40px] items-center gap-4 text-sm">
            {/* Home button shadow */}
            <div
              ref={homeEffect.ref}
              {...homeEffect.triggerProps}
              className="nav-link-home-shadow pointer-events-none z-[-1] mx-1 h-full bg-transparent px-3 text-transparent opacity-0 shadow-xl shadow-accent/50 transition-opacity duration-700 ease-in-out"
            >
              {t("header.home")}
            </div>
            {/* Blog button shadow */}
            <div
              ref={blogEffect.ref}
              {...blogEffect.triggerProps}
              className="nav-link-blog-shadow pointer-events-none z-[-1] mx-1 h-full bg-transparent px-3 text-transparent opacity-0 shadow-xl shadow-accent/50 transition-opacity duration-700 ease-in-out"
            >
              {t("header.blog")}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
