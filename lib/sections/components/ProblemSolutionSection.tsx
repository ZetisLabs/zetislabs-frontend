"use client";

import { motion } from "@/lib/motion";

// Rotating border glow styles
const glowKeyframes = `
@keyframes rotate-glow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export interface ProblemSolutionClientProps {
  titleProblem: string;
  problemItems: string[];
  conclusion: string;
  titleSolution: string;
  body: string;
  accent: string;
}

/**
 * ProblemSolution Client Component
 *
 * Split contrast layout showing the problem on the left
 * and the solution on the right with a subtle blue halo.
 */
export function ProblemSolutionClient({
  titleProblem,
  problemItems,
  conclusion,
  titleSolution,
  body,
  accent,
}: ProblemSolutionClientProps) {
  return (
    <section
      data-section="problem-solution"
      className="relative scroll-section overflow-hidden pt-48 pb-12 sm:pt-56 sm:pb-16 lg:pt-64 lg:pb-20"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 lg:grid-cols-2 lg:gap-8"
        >
          {/* Problem Card */}
          <motion.div
            variants={cardVariants}
            className="relative rounded-2xl border border-border/40 bg-card p-6 sm:p-8"
          >
            {/* Title */}
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {titleProblem}
            </h2>

            {/* Problem List */}
            <motion.ul variants={containerVariants} className="mb-6 space-y-3">
              {problemItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={listItemVariants}
                  className="flex items-start gap-3 text-foreground/70"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-xs text-foreground/50">
                    ✗
                  </span>
                  <span className="text-sm sm:text-base">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Conclusion */}
            {conclusion && (
              <motion.p
                variants={listItemVariants}
                className="border-t border-border/30 pt-4 text-sm text-foreground/60 italic"
              >
                {conclusion}
              </motion.p>
            )}
          </motion.div>

          {/* Solution Card with rotating border glow */}
          <motion.div variants={cardVariants} className="relative h-full">
            {/* Inject keyframes */}
            <style>{glowKeyframes}</style>

            {/* Glow container - sits behind the card */}
            <div className="pointer-events-none absolute -inset-[2px] overflow-hidden rounded-2xl">
              {/* Rotating gradient */}
              <div
                className="absolute inset-[-200%] opacity-50"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, transparent 60deg, #3a7bd5 120deg, #60a5fa 180deg, #3a7bd5 240deg, transparent 300deg, transparent 360deg)",
                  animation: "rotate-glow 8s linear infinite",
                }}
              />
            </div>

            {/* Card content - same structure as Problem card */}
            <div className="relative h-full rounded-2xl border border-transparent bg-card p-6 sm:p-8">
              {/* Title with accent underline */}
              <h2 className="relative mb-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {titleSolution}
                <span className="absolute -bottom-1 left-0 h-0.5 w-16 bg-accent/60" />
              </h2>

              {/* Body */}
              <p className="relative mb-6 text-sm leading-relaxed text-foreground/75 sm:text-base">
                {body}
              </p>

              {/* Accent Result Box */}
              {accent && (
                <motion.div
                  variants={listItemVariants}
                  className="relative rounded-xl border border-accent/20 bg-accent/5 p-4"
                >
                  <p className="text-sm font-medium text-foreground/90 sm:text-base">
                    {accent}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
