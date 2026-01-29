import { ErrorBoundary } from "@/lib/ui";
import { StackSection } from "@/components/StackSection";
import type { SectionProps } from "../types";

/**
 * Stack Section Wrapper
 *
 * Wrapper component that adapts StackSection to the SectionProps interface.
 * Includes ErrorBoundary for graceful error handling.
 */
export function StackSectionWrapper({ t }: SectionProps) {
  return (
    <ErrorBoundary
      fallback={
        <section className="flex flex-col justify-center py-16 md:py-32">
          <div className="mx-auto w-full max-w-screen-xl px-4 text-center">
            <p className="text-foreground/70">Unable to load integrations.</p>
          </div>
        </section>
      }
    >
      <div className="scroll-section">
        <StackSection title={t("home.stack.title")} />
      </div>
    </ErrorBoundary>
  );
}
