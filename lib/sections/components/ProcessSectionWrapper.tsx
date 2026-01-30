import type { SectionProps } from "../types";
import { ProcessSectionClient, type Step } from "./ProcessSection";

/**
 * Process Section Wrapper
 *
 * Server component that extracts process data from translations
 * and passes it to the client component.
 */
export function ProcessSection({ dict }: SectionProps) {
  // Get steps from translations
  const processData = dict.home?.Process as
    | {
        label?: string;
        title?: string;
        subtitle?: string;
        route?: Record<string, { title: string; description: string }>;
      }
    | undefined;

  // Return null if required data is missing
  if (!processData?.route) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[ProcessSection] Missing translation data: home.Process.route"
      );
    }
    return null;
  }

  const label = processData.label || "Process";
  const title = processData.title || "How it works";
  const subtitle = processData.subtitle;

  const steps: Step[] = Object.entries(processData.route).map(
    ([key, value]) => ({
      number: key.padStart(2, "0"),
      title: value.title,
      description: value.description,
    })
  );

  return (
    <ProcessSectionClient
      label={label}
      title={title}
      subtitle={subtitle}
      steps={steps}
    />
  );
}
