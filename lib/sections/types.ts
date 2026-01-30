/**
 * Section Library Types
 *
 * Type definitions for the dynamic section composition system.
 * Sections are configured via i18n translation files.
 */

import type { Locale } from "@/i18n/config";
import type { Translations } from "@/lib/i18n";

// =============================================================================
// STATIC SECTION CONTENT TYPES
// =============================================================================

/**
 * Hero Section Content
 *
 * Required structure for hero section in translation files.
 * Path: home.hero
 *
 * @example
 * ```json
 * {
 *   "home": {
 *     "hero": {
 *       "eyebrow": "Custom automation for SMBs",
 *       "title": {
 *         "default": "",
 *         "thin": "20 hours saved per week. ",
 *         "accent": "Per employee."
 *       },
 *       "subtitle": "Your teams waste time...",
 *       "cta": {
 *         "primary": { "label": "Get started", "href": "/contact" },
 *         "secondary": { "label": "See examples", "href": "#examples" }
 *       }
 *     }
 *   }
 * }
 * ```
 */
export interface HeroContent {
  /** Badge text displayed above the title */
  eyebrow: string;
  /** Title with multiple text style parts */
  title: {
    /** Default/bold part of the title */
    default: string;
    /** Thin/light weight part of the title */
    thin: string;
    /** Accent/highlighted part of the title */
    accent: string;
  };
  /** Subtitle/description text below the title */
  subtitle: string;
  /** Call-to-action buttons */
  cta: {
    /** Primary CTA button (required) */
    primary: CTAButtonContent;
    /** Secondary CTA button (required) */
    secondary: CTAButtonContent;
  };
}

/**
 * CTA Button Content
 *
 * Structure for a call-to-action button.
 */
export interface CTAButtonContent {
  /** Button label text */
  label: string;
  /** Link destination */
  href: string;
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
}

/**
 * CTA Section Content
 *
 * Required structure for the final CTA section in translation files.
 * Path: home.cta
 *
 * @example
 * ```json
 * {
 *   "home": {
 *     "cta": {
 *       "title": "How many hours could you get back?",
 *       "description": "Free audit. We analyze your processes...",
 *       "primary": { "label": "Book my free audit", "href": "/contact" },
 *       "secondary": { "label": "Learn more", "href": "/about" }
 *     }
 *   }
 * }
 * ```
 */
export interface CTASectionContent {
  /** Section title */
  title: string;
  /** Section description */
  description: string;
  /** Primary CTA button (required) */
  primary: CTAButtonContent;
  /** Secondary CTA button (optional) */
  secondary?: CTAButtonContent;
}

// =============================================================================
// DYNAMIC SECTION TYPES
// =============================================================================

/**
 * Available section types
 * Each type corresponds to a registered section component
 */
export type SectionType =
  | "whatWeMake"
  | "stack"
  | "useCases"
  | "whyZetisLabs"
  | "process"
  | "problemSolution";

/**
 * Section configuration from i18n
 */
export interface SectionConfig {
  /** Section type - must match a registered component */
  type: SectionType;
  /** Unique identifier for React key */
  id: string;
  /** Optional flag to disable a section (defaults to true) */
  enabled?: boolean;
}

/**
 * Props passed to every section component
 */
export interface SectionProps {
  /** Current locale */
  locale: Locale;
  /** Translation helper function */
  t: (key: string) => string;
  /** Full translations object for direct access */
  dict: Translations;
}

/**
 * Component type for section registry
 */
export type SectionComponent = React.ComponentType<SectionProps>;
