import { UseCasesSection } from "@/components/UseCasesSection";
import type { SectionProps } from "../types";
import { ErrorBoundary } from "@/lib/ui";

/**
 * Use Cases Section Wrapper
 *
 * Wrapper component that adapts UseCasesSection to the SectionProps interface.
 * Builds use case data from translations and includes ErrorBoundary.
 */
export function UseCasesSectionWrapper({ t, dict }: SectionProps) {
  // Defensive check: return null if required data is missing
  const useCasesData = dict.home?.useCases as
    | {
        cases?: {
          mailWriter?: { features?: string[] };
          docGen?: { features?: string[] };
        };
      }
    | undefined;

  if (!useCasesData?.cases) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[UseCasesSectionWrapper] Missing translation data: home.useCases.cases"
      );
    }
    return null;
  }

  const useCases = [
    {
      id: "mail-writer",
      title: t("home.useCases.cases.mailWriter.title"),
      subtitle: t("home.useCases.cases.mailWriter.subtitle"),
      description: t("home.useCases.cases.mailWriter.description"),
      features: (useCasesData.cases.mailWriter?.features ?? []).map((f) => f),
      media: {
        type: "image" as const,
        src: "/diagrams/diagram-placeholder.png",
        alt: "Mail-Writer interface",
      },
    },
    {
      id: "docgen",
      title: t("home.useCases.cases.docGen.title"),
      subtitle: t("home.useCases.cases.docGen.subtitle"),
      description: t("home.useCases.cases.docGen.description"),
      features: (useCasesData.cases.docGen?.features ?? []).map((f) => f),
      media: {
        type: "image" as const,
        src: "/diagrams/diagram-placeholder.png",
        alt: "DocGen dashboard",
      },
    },
  ];

  return (
    <ErrorBoundary
      fallback={
        <section className="flex flex-col justify-center py-16 md:py-32">
          <div className="mx-auto w-full max-w-screen-xl px-4 text-center">
            <p className="text-foreground/70">Unable to load use cases.</p>
          </div>
        </section>
      }
    >
      <div className="scroll-section">
        <UseCasesSection
          title={t("home.useCases.title")}
          description={t("home.useCases.description")}
          learnMoreLabel={t("home.useCases.learnMore")}
          useCases={useCases}
        />
      </div>
    </ErrorBoundary>
  );
}
