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
    <section className="scroll-section relative isolate flex min-h-[100dvh] flex-col justify-center">
      <div className="animate-scroll-out relative z-10 mx-auto w-full max-w-screen-xl px-4">
        <div className="mx-auto max-w-3xl pt-16 text-center md:pt-24">
          {/* Eyebrow - l'effet glow est géré automatiquement par le système d'effets */}
          <EyebrowBadge>
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
            {eyebrowText}
          </EyebrowBadge>

          {/* Headline */}
          <h1 className="apple-breathing-title-wrapper animate-fade-in-slide-title text-4xl leading-[1.15] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <span className="font-semibold">{titleDefault}</span>
            <span className="font-normal text-foreground/90">{titleThin}</span>
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
              className="apple-breathing-wrapper inline-flex w-auto animate-fade-in-slide-cta items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-base font-medium text-background shadow-sm shadow-accent/20 transition-transform duration-300 hover:scale-105"
            >
              {ctaText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
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
    </section>
  );
}
