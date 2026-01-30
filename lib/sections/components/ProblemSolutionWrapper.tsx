import type { SectionProps } from "../types";
import { ProblemSolutionClient } from "./ProblemSolutionSection";

/**
 * ProblemSolution Section Wrapper
 *
 * Server component that extracts data from translations
 * and passes it to the client component.
 */
export function ProblemSolutionSection({ dict }: SectionProps) {
  const data = dict.home?.ProblemSolution as
    | {
        titleProblem?: string;
        description?: string;
        titleSolution?: string;
        body?: string;
        accent?: string;
      }
    | undefined;

  if (!data?.titleProblem || !data?.titleSolution) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[ProblemSolutionSection] Missing translation data: home.ProblemSolution"
      );
    }
    return null;
  }

  // Parse description into list items (split by newlines)
  // Filter out empty lines and conclusion lines
  const problemItems = (data.description ?? "")
    .split("\n")
    .filter(
      (item) =>
        item.trim() &&
        !item.includes("Ces tâches") &&
        !item.includes("These tasks") &&
        !item.includes("Votre temps") &&
        !item.includes("Your time")
    );

  // Get the conclusion (lines containing conclusion text)
  const conclusionLines = (data.description ?? "")
    .split("\n")
    .filter(
      (item) =>
        item.includes("Ces tâches") ||
        item.includes("These tasks") ||
        item.includes("Votre temps") ||
        item.includes("Your time") ||
        item.includes("create value") ||
        item.includes("créent pas de valeur")
    );
  const conclusion = conclusionLines.join(" ").trim();

  return (
    <ProblemSolutionClient
      titleProblem={data.titleProblem}
      problemItems={problemItems}
      conclusion={conclusion}
      titleSolution={data.titleSolution}
      body={data.body ?? ""}
      accent={data.accent ?? ""}
    />
  );
}
