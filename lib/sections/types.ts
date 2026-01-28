/**
 * Section Library Types
 *
 * Type definitions for the dynamic section composition system.
 * Sections are configured via i18n translation files.
 */

import type { Locale } from "@/i18n/config";
import type { Translations } from "@/lib/i18n";

/**
 * Available section types
 * Each type corresponds to a registered section component
 */
export type SectionType = "whatWeMake" | "stack" | "useCases" | "whyZetisLabs";

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
