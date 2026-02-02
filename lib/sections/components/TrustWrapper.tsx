import type { SectionProps } from "../types";
import { TrustClient } from "./TrustSection";

/**
 * Trust Section Wrapper
 *
 * Server component that extracts data from translations
 * and passes it to the client component.
 */
export function TrustSection({ dict }: SectionProps) {
  const data = dict.home?.Trust as
    | {
        title?: string;
        logos?: Record<string, string>;
      }
    | undefined;

  if (!data?.title || !data?.logos) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[TrustSection] Missing translation data: home.Trust");
    }
    return null;
  }

  // Convert logos object to array
  const logos = Object.values(data.logos);

  return <TrustClient title={data.title} logos={logos} />;
}
