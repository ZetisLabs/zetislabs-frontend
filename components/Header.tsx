"use client";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

// Use the provided `.glass-card` with a lighter header-specific variant.
const GLASS_BASE_CLASS = 'glass-card glass-card--inline glass-pill';

/**
 * Compose the baseline glassmorphism classes with caller specific utilities.
 * Example: glassLayeredClass('p-4 text-white') applies the shared glass effect plus custom classes.
 */
function glassLayeredClass(additionalClasses: string): string {
  return [GLASS_BASE_CLASS, additionalClasses].filter(Boolean).join(' ');
}

/**
 * Header
 * Minimal top navigation inspired by Evervault’s landing style.
 * - Left: brand logo (switches by theme without JS)
 * - Center/right: small nav
 * - Right: theme toggle
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Single-row flex container holding logo (left), menu (center), toggle (right) */}
      <div className="relative mx-auto flex h-16 w-full max-w-screen-xl flex-nowrap items-center px-4">
        {/* Brand on the left */}
        <Link href="/" className="flex items-center gap-2" aria-label="ZetisLabs home">
          {/* Show appropriate logo per theme (controlled via global CSS) */}
          <Image
            src="/zetis-light-nbg-logo-v2.svg"
            alt="ZetisLabs logo light"
            width={320}
            height={64}
            className="logo-light h-16 w-auto align-middle"
            priority
          />
          <Image
            src="/zetis-dark-nbg-logo-v2.svg"
            alt="ZetisLabs logo dark"
            width={320}
            height={64}
            className="logo-dark h-16 w-auto align-middle"
            priority
          />
        </Link>

        {/* Centered menu with glassmorphism background (absolutely centered) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={glassLayeredClass("pointer-events-auto rounded-full h-12 px-6 transition-[opacity,transform] hover:opacity-95")}> 
            <nav className="flex h-full items-center gap-4 text-sm text-foreground/85">
              <Link href="/" className="mx-1 rounded-full px-3 py-0.5 transition-colors hover:text-foreground">Home</Link>
              <Link href="/blog" className="mx-1 rounded-full px-3 py-0.5 transition-colors hover:text-foreground">blog</Link>
            </nav>
          </div>
        </div>

        {/* Actions on the right */}
        <div className="ml-auto flex items-center justify-end gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
