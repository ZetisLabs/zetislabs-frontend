/**
 * Section Library
 *
 * Dynamic section composition for landing pages.
 * Sections are configured via i18n translation files.
 *
 * @example
 * ```tsx
 * import { SectionRenderer, type SectionConfig } from "@/lib/sections";
 *
 * const sections: SectionConfig[] = [
 *   { type: "whatWeMake", id: "what-we-make" },
 *   { type: "stack", id: "stack" },
 * ];
 *
 * <SectionRenderer sections={sections} locale={locale} t={t} dict={dict} />
 * ```
 */

// Types
export type {
  // Static section content types
  HeroContent,
  CTAButtonContent,
  CTASectionContent,
  // Dynamic section types
  SectionConfig,
  SectionType,
  SectionProps,
  SectionComponent,
} from "./types";

// Registry
export {
  sectionRegistry,
  getSectionComponent,
  isValidSectionType,
} from "./registry";

// Renderer
export { SectionRenderer } from "./SectionRenderer";

// Error Boundary
export { SectionErrorBoundary } from "./SectionErrorBoundary";

// Individual section components (for direct use if needed)
export {
  WhatWeMakeSection,
  WhyZetisLabsSection,
  StackSectionWrapper,
  UseCasesSectionWrapper,
  CardShowcaseSection,
} from "./components";
