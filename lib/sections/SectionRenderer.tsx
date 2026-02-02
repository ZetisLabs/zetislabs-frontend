import type { SectionConfig, SectionProps } from "./types";
import { getSectionComponent, isValidSectionType } from "./registry";
import { SectionErrorBoundary } from "./SectionErrorBoundary";

interface SectionRendererProps extends SectionProps {
  /** Array of section configurations from i18n */
  sections: SectionConfig[];
}

/**
 * SectionRenderer
 *
 * Server component that dynamically renders sections based on configuration.
 * Sections are rendered in the order they appear in the configuration array.
 * Each section is wrapped in an error boundary to prevent cascading failures.
 */
export function SectionRenderer({
  sections,
  locale,
  t,
  dict,
}: SectionRendererProps) {
  return (
    <>
      {sections.map((config) => {
        // Skip disabled sections
        if (config.enabled === false) {
          return null;
        }

        // Validate section type
        if (!isValidSectionType(config.type)) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `[SectionRenderer] Unknown section type: "${config.type}"`
            );
          }
          return null;
        }

        const Component = getSectionComponent(config.type);
        if (!Component) {
          return null;
        }

        return (
          <SectionErrorBoundary
            key={config.id}
            sectionId={config.id}
            sectionType={config.type}
          >
            <Component locale={locale} t={t} dict={dict} />
          </SectionErrorBoundary>
        );
      })}
    </>
  );
}
