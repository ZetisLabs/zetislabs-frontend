/**
 * Section Registry
 *
 * Maps section type strings to their React components.
 * Uses a const object for better tree-shaking and type inference.
 */

import type { SectionType, SectionComponent } from "./types";
import {
  WhatWeMakeSection,
  WhyZetisLabsSection,
  StackSectionWrapper,
  UseCasesSectionWrapper,
} from "./components";

/**
 * Registry mapping section types to components
 */
export const sectionRegistry: Record<SectionType, SectionComponent> = {
  whatWeMake: WhatWeMakeSection,
  stack: StackSectionWrapper,
  useCases: UseCasesSectionWrapper,
  whyZetisLabs: WhyZetisLabsSection,
} as const;

/**
 * Get section component by type
 * Returns undefined for unknown types (graceful degradation)
 */
export function getSectionComponent(
  type: SectionType
): SectionComponent | undefined {
  return sectionRegistry[type];
}

/**
 * Type guard to check if a string is a valid section type
 */
export function isValidSectionType(type: string): type is SectionType {
  return type in sectionRegistry;
}
