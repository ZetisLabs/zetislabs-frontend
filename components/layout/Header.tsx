"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getTranslation } from "@/lib/i18n";
import { type Locale } from "@/i18n/config";
import { useElementEffect } from "../effects/hooks/useElementEffect";
import { EFFECT_LAYERS } from "../effects/EffectLayerProvider";
import { Menu, X } from "lucide-react";

type Props = {
  locale: Locale;
};

/**
 * Header
 * Minimal top navigation inspired by Evervault's landing style.
 * - Mobile: Logo + hamburger menu with slide-out navigation
 * - Desktop: Logo + inline navigation links
 */
export default function Header({ locale }: Props) {
  const t = (key: string) => getTranslation(locale, key);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Glow effects for navigation links (desktop only)
  const homeEffect = useElementEffect<HTMLDivElement>({
    layer: EFFECT_LAYERS.UNDER_GRID,
    trigger: "hover",
    color: "accent",
    padding: 8,
    trackOnScroll: false,
  });

  const blogEffect = useElementEffect<HTMLDivElement>({
    layer: EFFECT_LAYERS.UNDER_GRID,
    trigger: "hover",
    color: "accent",
    padding: 8,
    trackOnScroll: false,
  });

  return (
    <>
      <header className="sticky top-4 z-50 mt-4 w-full bg-transparent">
        {/* Centered flex container holding logo and menu */}
        <div className="relative mx-auto flex w-full max-w-screen-xl flex-nowrap items-center justify-center px-4 lg:w-5xl">
          {/* Blur bubble container */}
          <div className="animate-slide-down flex w-auto items-center justify-center gap-4 rounded-md border-[0.75px] border-border/50 bg-background/75 px-4 py-0 shadow-sm backdrop-blur-md md:gap-6 md:px-6">
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
                className="h-8 w-auto align-middle md:h-10"
                priority
              />
            </Link>

            {/* Desktop Navigation menu - hidden on mobile */}
            <nav className="hidden items-center gap-4 text-sm text-foreground md:flex">
              <Link
                href={`/${locale}`}
                className="nav-link nav-link-home group relative mx-1 rounded-full px-3 py-0.5 transition-colors hover:text-accent"
                aria-label={t("header.homeAriaLabel")}
              >
                {t("header.home")}
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="nav-link nav-link-blog group relative mx-1 rounded-full px-3 py-0.5 transition-colors hover:text-accent"
                aria-label={t("header.blogAriaLabel")}
              >
                {t("header.blog")}
              </Link>
            </nav>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/5 md:hidden"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Shadow layer - positioned below the header bubble (desktop only) */}
          <div className="pointer-events-none absolute hidden h-auto w-auto items-center justify-center gap-6 px-6 py-0 md:flex">
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
              <div
                ref={homeEffect.ref}
                {...homeEffect.triggerProps}
                className="nav-link-home-shadow pointer-events-none z-[-1] mx-1 h-full bg-transparent px-3 text-transparent opacity-0 shadow-xl shadow-accent/50 transition-opacity duration-700 ease-in-out"
              >
                {t("header.home")}
              </div>
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-full max-w-sm bg-background shadow-2xl">
            {/* Menu Header */}
            <div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
              <Link
                href={`/${locale}`}
                onClick={() => setIsMenuOpen(false)}
                aria-label={t("header.logoAriaLabel")}
              >
                <Image
                  src="/zetis-light-nbg-logo-v2.svg"
                  alt="ZetisLabs logo"
                  width={200}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/5"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col px-6 py-8">
              <Link
                href={`/${locale}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex h-14 items-center border-b border-border/20 text-lg font-medium text-foreground transition-colors hover:text-accent"
              >
                {t("header.home")}
              </Link>
              <Link
                href={`/${locale}/blog`}
                onClick={() => setIsMenuOpen(false)}
                className="flex h-14 items-center border-b border-border/20 text-lg font-medium text-foreground transition-colors hover:text-accent"
              >
                {t("header.blog")}
              </Link>
            </nav>

            {/* CTA in menu */}
            <div className="absolute right-6 bottom-8 left-6">
              <Link
                href={`/${locale}#contact`}
                onClick={() => setIsMenuOpen(false)}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-accent text-base font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("header.contact") || "Get in touch"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
