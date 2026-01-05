"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks";

// ============================================================================
// TYPES
// ============================================================================

export type UseCase = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  media: {
    type: "video" | "image";
    src: string;
    alt?: string;
    poster?: string;
  };
};

type UseCasesSectionProps = {
  title: string;
  description: string;
  useCases: UseCase[];
  learnMoreLabel?: string;
};

// ============================================================================
// HOOKS
// ============================================================================

/**
 * useScrollProgress
 *
 * Tracks scroll progress within a sticky container.
 * Returns a normalized value between 0 and 1 representing how far
 * the user has scrolled through the "scroll runway" (the extra height
 * that allows the sticky element to remain fixed while scrolling).
 *
 * @param containerRef - Ref to the outer container (with extra height)
 * @returns progress (0-1), isActive (section is in view)
 */
const useScrollProgress = (
  containerRef: React.RefObject<HTMLElement | null>
): { progress: number; isActive: boolean } => {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const calculateProgress = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollRunway = containerRef.current.offsetHeight - viewportHeight;

      if (scrollRunway <= 0) return;

      // Calculate how far we've scrolled into the section
      const scrolled = -containerRect.top;
      const newProgress = Math.max(0, Math.min(1, scrolled / scrollRunway));

      // Section is "active" when sticky is attached
      const containerInView =
        containerRect.top <= 0 && containerRect.bottom >= viewportHeight;

      setProgress(newProgress);
      setIsActive(containerInView);
    };

    // Initial calculation
    calculateProgress();

    // Use scroll event with RAF throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateProgress);
    };
  }, [containerRef, isMounted]);

  return { progress, isActive };
};

/**
 * useIsMobile
 *
 * Detects if viewport is mobile-sized.
 * Used to disable scroll hijacking on mobile for better UX.
 * Returns null during SSR to prevent hydration mismatch.
 */
const useIsMobile = (): boolean | null => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * ProgressIndicator
 *
 * Visual indicator showing current progress through use cases.
 * Displays as dots on desktop, horizontal bar on mobile.
 */
const ProgressIndicator = ({
  totalSlides,
  currentSlide,
  progress,
}: {
  totalSlides: number;
  currentSlide: number;
  progress: number;
}) => {
  return (
    <div className="absolute top-1/2 right-8 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isActive = index === currentSlide;
        const isPast = index < currentSlide;

        return (
          <div
            key={index}
            className="relative flex h-3 w-3 items-center justify-center"
            role="progressbar"
            aria-valuenow={
              isActive ? Math.round(progress * 100) : isPast ? 100 : 0
            }
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Use case ${index + 1} of ${totalSlides}`}
          >
            {/* Background ring */}
            <div
              className={`absolute h-3 w-3 rounded-full border transition-all duration-300 ${
                isActive
                  ? "border-accent"
                  : isPast
                    ? "border-accent/60"
                    : "border-foreground/20"
              }`}
            />
            {/* Fill indicator */}
            <div
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                isActive || isPast ? "bg-accent" : "bg-foreground/20"
              }`}
              style={{
                transform: isActive
                  ? `scale(${0.5 + progress * 0.5})`
                  : undefined,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

/**
 * UseCaseSlide
 *
 * Individual use case presentation with media and description.
 * Animates based on scroll progress.
 */
const UseCaseSlide = ({
  useCase,
  slideProgress,
  isVisible,
  direction,
  learnMoreLabel = "Learn more",
  transitionStyle = "opacity 0.4s ease-out, transform 0.4s ease-out",
}: {
  useCase: UseCase;
  slideProgress: number;
  isVisible: boolean;
  direction: "entering" | "active" | "exiting" | "hidden";
  learnMoreLabel?: string;
  transitionStyle?: string;
}) => {
  // Calculate transforms based on direction and progress
  const getTransform = () => {
    switch (direction) {
      case "entering":
        // Coming from bottom
        return {
          opacity: slideProgress,
          transform: `translateY(${(1 - slideProgress) * 30}px)`,
        };
      case "active":
        return {
          opacity: 1,
          transform: "translateY(0)",
        };
      case "exiting":
        // Going to top
        return {
          opacity: 1 - slideProgress,
          transform: `translateY(${-slideProgress * 30}px)`,
        };
      case "hidden":
      default:
        return {
          opacity: 0,
          transform: "translateY(30px)",
        };
    }
  };

  const style = getTransform();

  return (
    <div
      className={`absolute inset-0 flex items-center transition-opacity duration-300 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        opacity: style.opacity,
        transform: style.transform,
        transition: transitionStyle,
      }}
      aria-hidden={!isVisible}
    >
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Content - Left side */}
        <div className="order-2 md:order-1">
          <div className="max-w-lg">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wider text-accent uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {useCase.subtitle}
            </div>

            {/* Title */}
            <h3 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {useCase.title}
            </h3>

            {/* Description */}
            <p className="mb-6 text-base leading-relaxed text-foreground/70 md:text-lg">
              {useCase.description}
            </p>

            {/* Features list */}
            <ul className="space-y-3">
              {useCase.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-foreground/80"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateX(0)"
                      : "translateX(-10px)",
                    transition: `opacity 0.3s ease-out ${index * 0.1}s, transform 0.3s ease-out ${index * 0.1}s`,
                  }}
                >
                  <svg
                    className="mt-1 h-5 w-5 shrink-0 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium text-accent-foreground shadow-sm shadow-accent/20 transition-transform duration-300 hover:scale-105"
              >
                {learnMoreLabel}
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
            </div>
          </div>
        </div>

        {/* Media - Right side */}
        <div className="order-1 md:order-2">
          <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-card/50 shadow-xl">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

            {useCase.media.type === "video" ? (
              <video
                src={useCase.media.src}
                poster={useCase.media.poster}
                autoPlay
                loop
                muted
                playsInline
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="relative aspect-video w-full">
                <Image
                  src={useCase.media.src}
                  alt={useCase.media.alt || useCase.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}

            {/* Decorative accent border */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * MobileUseCaseCard
 *
 * Simplified card layout for mobile devices.
 * No scroll hijacking - uses traditional scroll with fade-in animations.
 */
const MobileUseCaseCard = ({
  useCase,
  index,
  learnMoreLabel = "Learn more",
}: {
  useCase: UseCase;
  index: number;
  learnMoreLabel?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="mb-12 last:mb-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Media */}
      <div className="mb-6 overflow-hidden rounded-xl border border-border/30 bg-card/50 shadow-lg">
        {useCase.media.type === "video" ? (
          <video
            src={useCase.media.src}
            poster={useCase.media.poster}
            autoPlay
            loop
            muted
            playsInline
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="relative aspect-video w-full">
            <Image
              src={useCase.media.src}
              alt={useCase.media.alt || useCase.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-1">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wider text-accent uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {useCase.subtitle}
        </div>

        <h3 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          {useCase.title}
        </h3>

        <p className="mb-4 text-base leading-relaxed text-foreground/70">
          {useCase.description}
        </p>

        <ul className="mb-6 space-y-2">
          {useCase.features.map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className="flex items-start gap-2 text-sm text-foreground/80"
            >
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-sm shadow-accent/20 transition-transform duration-300 hover:scale-105"
        >
          {learnMoreLabel}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * UseCasesSection
 *
 * Apple-style sticky scroll section showcasing use cases.
 *
 * Behavior:
 * - On desktop: Section stays sticky while user scrolls through content
 * - Scroll progress controls transitions between use cases
 * - On mobile: Falls back to traditional scroll with fade-in cards
 * - Respects prefers-reduced-motion preference
 *
 * Architecture:
 * - Outer container has extra height to create "scroll runway"
 * - Inner sticky container stays fixed during scroll
 * - useScrollProgress hook tracks position and calculates progress
 * - Each slide animates based on its portion of the total progress
 */
export function UseCasesSection({
  title,
  description,
  useCases,
  learnMoreLabel = "Learn more",
}: UseCasesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { progress, isActive } = useScrollProgress(containerRef);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Show loading state during hydration to prevent mismatch
  if (isMobile === null) {
    return (
      <section className="flex min-h-screen items-center justify-center py-16 md:py-24">
        <div className="mx-auto w-full max-w-screen-xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="text-base text-foreground/70 sm:text-lg">
            {description}
          </p>
        </div>
      </section>
    );
  }

  // Calculate which slide should be visible based on progress
  const totalSlides = useCases.length;
  const slideProgress = progress * totalSlides;
  const currentSlide = Math.min(Math.floor(slideProgress), totalSlides - 1);

  // Calculate progress within the current slide (0-1)
  const progressInSlide = slideProgress - currentSlide;

  // Determine slide states
  const getSlideDirection = (
    index: number
  ): "entering" | "active" | "exiting" | "hidden" => {
    if (index < currentSlide) return "hidden";
    if (index > currentSlide + 1) return "hidden";

    if (index === currentSlide) {
      // Current slide might be exiting if we're past 70% progress
      if (progressInSlide > 0.7 && index < totalSlides - 1) {
        return "exiting";
      }
      return "active";
    }

    if (index === currentSlide + 1 && progressInSlide > 0.7) {
      return "entering";
    }

    return "hidden";
  };

  // Mobile fallback: traditional scroll layout (only for small screens)
  if (isMobile) {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          {/* Section Header */}
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="text-base text-foreground/70 sm:text-lg">
              {description}
            </p>
          </div>

          {/* Mobile Cards */}
          <div className="mx-auto max-w-2xl">
            {useCases.map((useCase, index) => (
              <MobileUseCaseCard
                key={useCase.id}
                useCase={useCase}
                index={index}
                learnMoreLabel={learnMoreLabel}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // For reduced motion: instant transitions instead of animated
  const transitionStyle = prefersReducedMotion
    ? "opacity 0s, transform 0s"
    : "opacity 0.4s ease-out, transform 0.4s ease-out";

  // Desktop: Sticky scroll experience
  // Height = viewport height + scroll runway (one viewport per slide transition)
  const scrollRunwayHeight = `${100 + (totalSlides - 1) * 100}vh`;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: scrollRunwayHeight }}
      aria-label="Use cases showcase"
    >
      {/* Sticky container - stays fixed while scrolling */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 -z-10 transition-opacity duration-500"
          style={{ opacity: isActive ? 1 : 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
        </div>

        {/* Section Header - fades out as we scroll */}
        <div
          className="absolute top-16 right-0 left-0 z-20 text-center transition-all duration-500"
          style={{
            opacity: progress < 0.15 ? 1 - progress * 6 : 0,
            transform: `translateY(${progress * -20}px)`,
          }}
        >
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="text-base text-foreground/70 sm:text-lg">
              {description}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator
          totalSlides={totalSlides}
          currentSlide={currentSlide}
          progress={progressInSlide}
        />

        {/* Use Case Slides */}
        {useCases.map((useCase, index) => {
          const direction = getSlideDirection(index);
          const isVisible = direction !== "hidden";

          // Calculate individual slide progress for entering/exiting animations
          let individualProgress = 0;
          if (direction === "entering") {
            individualProgress = (progressInSlide - 0.7) / 0.3;
          } else if (direction === "exiting") {
            individualProgress = (progressInSlide - 0.7) / 0.3;
          }

          return (
            <UseCaseSlide
              key={useCase.id}
              useCase={useCase}
              slideProgress={individualProgress}
              isVisible={isVisible}
              direction={direction}
              learnMoreLabel={learnMoreLabel}
              transitionStyle={transitionStyle}
            />
          );
        })}

        {/* Mobile progress bar (bottom) */}
        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2 md:hidden">
          {useCases.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                index <= currentSlide ? "bg-accent" : "bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// DEFAULT USE CASES DATA
// ============================================================================

export const defaultUseCases: UseCase[] = [
  {
    id: "mail-writer",
    title: "Mail-Writer",
    subtitle: "Email Automation",
    description:
      "Transform your email workflow with AI-powered drafting. Mail-Writer analyzes context, maintains your tone, and generates professional responses in seconds.",
    features: [
      "Context-aware email drafting",
      "Tone and style matching",
      "Multi-language support",
      "Integration with Gmail and Outlook",
    ],
    media: {
      type: "image",
      src: "/diagrams/Capture d'ecran 2025-11-23 a 14.16.52.png",
      alt: "Mail-Writer interface showing AI email composition",
    },
  },
  {
    id: "docgen",
    title: "DocGen",
    subtitle: "Document Generation",
    description:
      "Automate document creation with intelligent templates. DocGen pulls data from your systems and generates polished documents ready for review.",
    features: [
      "Dynamic template engine",
      "Multi-source data integration",
      "Version control and tracking",
      "Approval workflow automation",
    ],
    media: {
      type: "image",
      src: "/diagrams/Capture d'ecran 2025-11-23 a 14.16.52.png",
      alt: "DocGen dashboard showing document generation pipeline",
    },
  },
];
