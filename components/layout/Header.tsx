"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getTranslation } from "@/lib/i18n";
import { type Locale, localePath } from "@/i18n/config";
import { useElementEffect } from "../effects/hooks/useElementEffect";
import { EFFECT_LAYERS } from "../effects/EffectLayerProvider";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { CTAButton } from "@/lib/ui";

type Props = {
  locale: Locale;
};

/**
 * Header
 * Minimal top navigation inspired by Evervault's landing style.
 * - Mobile: Logo + hamburger menu with slide-out navigation
 * - Desktop: Logo + inline navigation links
 *
 * The "Offer" item is a toggle (not a link): it reveals a dropdown of our offer
 * landings — one for now (veille d'AO), built to grow. On mobile it expands
 * inline as an accordion inside the slide-out menu.
 */
export default function Header({ locale }: Props) {
  const t = (key: string) => getTranslation(locale, key);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isMobileOffersOpen, setIsMobileOffersOpen] = useState(false);
  const offersRef = useRef<HTMLDivElement>(null);

  // The offers shown in the dropdown. One for now (veille d'AO); the menu is
  // built to grow as we add more. `id` keys into header.offers.items.<id>.
  const offers = [{ id: "veilleAo", href: localePath(locale, "/veille-ao") }];

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

  // Close menu / dropdown on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsOffersOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Close the desktop offers dropdown on outside click.
  useEffect(() => {
    if (!isOffersOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (offersRef.current && !offersRef.current.contains(e.target as Node)) {
        setIsOffersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOffersOpen]);

  // Glow effects for navigation links (desktop only)
  const { ref: homeRef, triggerProps: homeTriggerProps } =
    useElementEffect<HTMLDivElement>({
      layer: EFFECT_LAYERS.UNDER_GRID,
      trigger: "hover",
      color: "accent",
      padding: 8,
      trackOnScroll: false,
    });

  const { ref: offerRef, triggerProps: offerTriggerProps } =
    useElementEffect<HTMLDivElement>({
      layer: EFFECT_LAYERS.UNDER_GRID,
      trigger: "hover",
      color: "accent",
      padding: 8,
      trackOnScroll: false,
    });

  const { ref: blogRef, triggerProps: blogTriggerProps } =
    useElementEffect<HTMLDivElement>({
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
              href={localePath(locale, "/")}
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
                href={localePath(locale, "/")}
                className="nav-link nav-link-home group relative mx-1 rounded-full px-3 py-0.5 transition-colors hover:text-accent"
                aria-label={t("header.homeAriaLabel")}
              >
                {t("header.home")}
              </Link>

              {/* Offers — toggle dropdown (not a link). Shares the nav-link hover
                  glow (mirror div below) so the three items stay consistent. */}
              <div className="relative" ref={offersRef}>
                <button
                  type="button"
                  onClick={() => setIsOffersOpen((open) => !open)}
                  className="nav-link nav-link-offer group relative mx-1 cursor-pointer rounded-full px-3 py-0.5 font-normal! transition-colors hover:text-accent aria-expanded:text-accent"
                  aria-haspopup="menu"
                  aria-expanded={isOffersOpen}
                  aria-label={t("header.offers.ariaLabel")}
                >
                  {t("header.offers.label")}
                </button>

                {isOffersOpen && (
                  <div className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-2">
                    <div
                      role="menu"
                      aria-label={t("header.offers.menuLabel")}
                      className="dropdown-in w-64 origin-top rounded-md border-[0.75px] border-border/50 bg-background/95 p-1.5 shadow-lg backdrop-blur-md"
                    >
                      {offers.map((offer) => (
                        <Link
                          key={offer.id}
                          href={offer.href}
                          role="menuitem"
                          onClick={() => setIsOffersOpen(false)}
                          className="group flex flex-col gap-0.5 rounded-md px-3 py-2 transition-colors hover:bg-foreground/5"
                        >
                          <span className="flex items-center justify-between text-sm font-medium text-foreground">
                            {t(`header.offers.items.${offer.id}.label`)}
                            <ArrowUpRight
                              className="h-3.5 w-3.5 text-foreground/25 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="text-xs text-foreground/50">
                            {t(`header.offers.items.${offer.id}.description`)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={localePath(locale, "/blog")}
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

            {/* Navigation shadow elements - aligned with nav buttons. The offer
                spacer mirrors the toggle's box (label + chevron) so the home and
                blog shadows stay aligned with their real links. */}
            <div className="flex h-[40px] items-center gap-4 text-sm">
              <div
                ref={homeRef}
                {...homeTriggerProps}
                className="nav-link-home-shadow pointer-events-none z-[-1] mx-1 h-full bg-transparent px-3 text-transparent opacity-0 shadow-xl shadow-accent/50 transition-opacity duration-700 ease-in-out"
              >
                {t("header.home")}
              </div>
              <div
                ref={offerRef}
                {...offerTriggerProps}
                className="nav-link-offer-shadow pointer-events-none z-[-1] mx-1 h-full bg-transparent px-3 text-transparent opacity-0 shadow-xl shadow-accent/50 transition-opacity duration-700 ease-in-out"
              >
                {t("header.offers.label")}
              </div>
              <div
                ref={blogRef}
                {...blogTriggerProps}
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
                href={localePath(locale, "/")}
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
                href={localePath(locale, "/")}
                onClick={() => setIsMenuOpen(false)}
                className="flex h-14 items-center border-b border-border/20 text-lg font-medium text-foreground transition-colors hover:text-accent"
              >
                {t("header.home")}
              </Link>

              {/* Offers — expandable group revealing the offer landings. */}
              <button
                type="button"
                onClick={() => setIsMobileOffersOpen((open) => !open)}
                className="flex h-14 items-center justify-between border-b border-border/20 text-lg font-medium text-foreground transition-colors hover:text-accent"
                aria-expanded={isMobileOffersOpen}
              >
                {t("header.offers.label")}
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ease-out ${
                    isMobileOffersOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isMobileOffersOpen &&
                offers.map((offer) => (
                  <Link
                    key={offer.id}
                    href={offer.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-12 items-center gap-2 border-b border-border/20 pl-4 text-base text-foreground/70 transition-colors hover:text-accent"
                  >
                    {t(`header.offers.items.${offer.id}.label`)}
                  </Link>
                ))}

              <Link
                href={localePath(locale, "/blog")}
                onClick={() => setIsMenuOpen(false)}
                className="flex h-14 items-center border-b border-border/20 text-lg font-medium text-foreground transition-colors hover:text-accent"
              >
                {t("header.blog")}
              </Link>
            </nav>

            {/* CTA in menu - Same as hero section */}
            <div className="absolute right-6 bottom-8 left-6">
              <CTAButton
                href="https://calendly.com/lucien-zetislabs/30min"
                onClick={() => setIsMenuOpen(false)}
                ariaLabel={t("home.hero.cta.primary.ariaLabel")}
              >
                {t("home.hero.cta.primary.label")}
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
