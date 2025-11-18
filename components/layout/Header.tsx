"use client";
import Link from "next/link";
import Image from "next/image";
import { getTranslation } from "@/lib/i18n";
import { type Locale } from "@/i18n/config";

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

  return (
    <header className="sticky top-4 z-50 w-full bg-transparent mt-4">
      {/* Centered flex container holding logo and menu */}
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-nowrap items-center justify-center px-4 lg:w-5xl">
        {/* Blur bubble container */}
        <div className="flex w-auto items-center justify-center gap-6 rounded-md bg-background/75 px-6 py-0 backdrop-blur-md border-[0.75px] border-border/50 shadow-sm animate-slide-down">
          {/* Brand logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2" aria-label={t("header.logoAriaLabel")}>
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
          <nav className="flex items-center gap-4 text-xs text-foreground">
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
        </div>

        {/* Shadow layer - positioned below the header bubble, mirrors nav structure */}
        <div className="absolute flex h-auto w-auto items-center justify-center gap-6 px-6 py-0 pointer-events-none">
          {/* Logo spacer (invisible, matches logo width) */}
          <div className="flex items-center gap-2 opacity-0 pointer-events-none">
            <Image
              src="/zetis-light-nbg-logo-v2.svg"
              alt="ZetisLabs logo"
              width={320}
              height={64}
              className="h-10 w-auto align-middle transparent"
              priority
            />
          </div>

          {/* Navigation shadow elements - aligned with nav buttons */}
          <div className="flex items-center gap-4 text-xs h-[40px]">
            {/* Home button shadow */}
            <div className="nav-link-home-shadow px-3 mx-1 h-full text-transparent bg-tansparent shadow-xl shadow-accent/50 opacity-0 transition-opacity duration-700 ease-in-out pointer-events-none z-[-1]">
              {t("header.home")}
            </div>
            {/* Blog button shadow */}
            <div className="nav-link-blog-shadow px-3 mx-1 h-full text-transparent bg-tansparent shadow-xl shadow-accent/50 opacity-0 transition-opacity duration-700 ease-in-out pointer-events-none z-[-1]">
              {t("header.blog")}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

