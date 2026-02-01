import type { SectionProps } from "../types";
import { UseCasesSectionClient } from "./UseCasesSection";

/**
 * Use Cases Section Wrapper
 *
 * Server component that extracts data from translations
 * and passes it to the client component.
 */
export function UseCasesSectionWrapper({ dict }: SectionProps) {
  const data = dict.home?.UseCases as
    | {
        title?: string;
        infoCard?: {
          first?: { title?: string; description?: string; footer?: string };
          second?: { title?: string; description?: string; footer?: string };
          third?: { title?: string; description?: string; footer?: string };
        };
      }
    | undefined;

  if (!data?.title || !data?.infoCard) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[UseCasesSectionWrapper] Missing translation data: home.UseCases"
      );
    }
    return null;
  }

  const { infoCard } = data;

  // Validate all cards have required fields
  if (
    !infoCard.first?.title ||
    !infoCard.second?.title ||
    !infoCard.third?.title
  ) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[UseCasesSectionWrapper] Missing card data in home.UseCases.infoCard"
      );
    }
    return null;
  }

  return (
    <UseCasesSectionClient
      label="Use Cases"
      title={data.title}
      cards={{
        first: {
          title: infoCard.first.title,
          description: infoCard.first.description ?? "",
          footer: infoCard.first.footer ?? "",
        },
        second: {
          title: infoCard.second.title,
          description: infoCard.second.description ?? "",
          footer: infoCard.second.footer ?? "",
        },
        third: {
          title: infoCard.third.title,
          description: infoCard.third.description ?? "",
          footer: infoCard.third.footer ?? "",
        },
      }}
    />
  );
}
