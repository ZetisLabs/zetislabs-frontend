"use client";
import Link from "next/link";
import Image from "next/image";

/**
 * Header
 * Minimal top navigation inspired by Evervault's landing style.
 * - Left: brand logo
 * - Right: small nav
 */
export default function Header() {
  return (
    <header className="sticky top-4 z-50 w-full bg-transparent mt-4">
      {/* Centered flex container holding logo and menu */}
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-nowrap items-center justify-center px-4 lg:w-5xl overflow-visible">
        {/* Blur bubble container */}
        <div className="nav-group flex w-auto items-center justify-center gap-6 rounded-md bg-background/75 px-6 py-0 backdrop-blur-md border-[0.75px] border-border/50 shadow-sm transition-all duration-300">
          {/* Brand logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="ZetisLabs home">
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
          <nav className="nav-menu flex items-center gap-4 text-xs text-foreground">
            <Link href="/" className="mx-1 rounded-full px-3 py-0.5 transition-colors hover:text-accent">Home</Link>
            <Link href="/blog" className="mx-1 rounded-full px-3 py-0.5 transition-colors hover:text-accent">Blog</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
