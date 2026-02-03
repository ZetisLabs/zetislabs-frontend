"use client";
import { useState, useEffect } from "react";
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
 * - Mobile: Logo + hamburger menu with off-canvas navigation
 * - Desktop: Logo + inline navigation links
 */
export default function Header({ locale }: Props) {
  const t = (key: string) => getTranslation(locale, key);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Effets de glow pour les liens de navigation (desktop only)
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
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/5 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
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
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Off-canvas menu */}
          <div className="absolute top-0 right-0 h-full w-[280px] max-w-[85vw] bg-background shadow-2xl">
            {/* Menu header with close button */}
            <div className="flex items-center justify-between border-b border-border/30 px-6 py-4">
              <span className="text-sm font-medium text-foreground/60">
                Menu
              </span>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/5"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col px-4 py-6">
              <Link
                href={`/${locale}`}
                className="flex min-h-[48px] items-center rounded-lg px-4 py-3 text-lg font-medium text-foreground transition-colors hover:bg-foreground/5 hover:text-accent"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t("header.homeAriaLabel")}
              >
                {t("header.home")}
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="flex min-h-[48px] items-center rounded-lg px-4 py-3 text-lg font-medium text-foreground transition-colors hover:bg-foreground/5 hover:text-accent"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t("header.blogAriaLabel")}
              >
                {t("header.blog")}
              </Link>

              {/* Divider */}
              <div className="my-4 border-t border-border/30" />

              {/* CTA in mobile menu */}
              <a
                href="https://calendly.com/lucien-zetislabs/30min"
                className="flex min-h-[48px] items-center justify-center rounded-xl bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a call
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
