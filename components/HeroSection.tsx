"use client";

import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

type HeroSectionProps = {
  eyebrowText: string;
  titleDefault: string;
  titleThin: string;
  titleAccent: string;
  subtitle: string;
  ctaText: string;
  ctaSecondaryText: string;
  ctaSecondaryAriaLabel: string;
};

export function HeroSection({
  eyebrowText,
  titleDefault,
  titleThin,
  titleAccent,
  subtitle,
  ctaText,
  ctaSecondaryText,
  ctaSecondaryAriaLabel,
}: HeroSectionProps) {
  return (
    <section className="hero-runway relative isolate h-[120vh] w-full">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-screen-xl animate-scroll-out px-4">
          <div className="mx-auto max-w-3xl pt-16 text-center md:pt-24">
            {/* Eyebrow - l'effet glow est géré automatiquement par le système d'effets */}
            <EyebrowBadge>
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
              {eyebrowText}
            </EyebrowBadge>

            {/* Headline */}
            <h1 className="apple-breathing-title-wrapper animate-fade-in-slide-title text-4xl leading-[1.15] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              <span className="font-semibold">{titleDefault}</span>
              <span className="font-normal text-foreground/90">
                {titleThin}
              </span>
              <span className="glass-text font-semibold">{titleAccent}</span>
            </h1>

            {/* Subcopy */}
            <p className="mx-auto mt-6 max-w-2xl animate-fade-in-slide-subtle text-pretty text-foreground/75 sm:text-lg">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10">
              <a
                href="#"
                className="apple-breathing-wrapper group relative inline-flex w-auto animate-fade-in-slide-cta items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-3 text-base font-semibold text-background shadow-lg ring-1 shadow-accent/25 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/40"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/15 to-transparent opacity-100" />
                {/* Shine effect on hover */}
                <div className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
              </a>
              <a
                href="#examples"
                className="inline-flex w-auto animate-fade-in-slide-cta-2 items-center justify-center gap-2 rounded-full border border-border/60 bg-transparent px-6 py-2.5 text-base font-medium text-foreground/80 transition-all duration-300 hover:scale-105"
                aria-label={ctaSecondaryAriaLabel}
              >
                {ctaSecondaryText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
