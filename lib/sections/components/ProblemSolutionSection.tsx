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

@keyframes arrow-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(4px);
  }
}

@keyframes arrow-flow {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
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

// Problem icons - simple SVG icons for each problem type
const problemIcons = [
  // Copy-paste icon
  <svg
    key="copy"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>,
  // Email icon
  <svg
    key="email"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 6L2 7" />
  </svg>,
  // Report/document icon
  <svg
    key="report"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>,
  // Spreadsheet/table icon
  <svg
    key="table"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18" />
  </svg>,
  // Chat/question icon
  <svg
    key="chat"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <path d="M12 7v2M12 13h.01" />
  </svg>,
];

export interface ProblemSolutionClientProps {
  titleProblem: string;
  problemItems: string[];
  conclusion: string;
  titleSolution: string;
  body: string;
  accent: string;
  stat?: {
    value: string;
    label: string;
  };
  trust?: {
    title: string;
    logos: string[];
  };
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
  stat,
  trust,
}: ProblemSolutionClientProps) {
  return (
    <section
      data-section="problem-solution"
      className="relative scroll-section overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-4"
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
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-foreground/40">
                    {problemIcons[idx % problemIcons.length]}
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

          {/* Animated Arrow between cards */}
          <motion.div
            variants={cardVariants}
            className="hidden items-center justify-center lg:flex"
          >
            <div className="relative flex h-16 w-16 items-center justify-center">
              {/* Arrow line */}
              <div className="absolute h-[2px] w-12 overflow-hidden bg-gradient-to-r from-border/40 via-accent/50 to-accent">
                {/* Animated flow effect */}
                <div
                  className="absolute inset-0 h-full w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(58, 123, 213, 0.8), transparent)",
                    animation: "arrow-flow 2s ease-in-out infinite",
                  }}
                />
              </div>
              {/* Arrow head */}
              <div
                className="absolute right-0 h-0 w-0"
                style={{
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderLeft: "8px solid #3a7bd5",
                  animation: "arrow-pulse 2s ease-in-out infinite",
                }}
              />
            </div>
          </motion.div>

          {/* Mobile Arrow (vertical) */}
          <motion.div
            variants={cardVariants}
            className="flex items-center justify-center py-2 lg:hidden"
          >
            <div className="relative flex h-12 w-12 flex-col items-center justify-center">
              {/* Arrow line */}
              <div className="absolute h-8 w-[2px] overflow-hidden bg-gradient-to-b from-border/40 via-accent/50 to-accent">
                {/* Animated flow effect */}
                <div
                  className="absolute inset-0 h-full w-full"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(58, 123, 213, 0.8), transparent)",
                    animation: "arrow-flow 2s ease-in-out infinite",
                  }}
                />
              </div>
              {/* Arrow head */}
              <div
                className="absolute bottom-0"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "8px solid #3a7bd5",
                  animation: "arrow-pulse 2s ease-in-out infinite",
                }}
              />
            </div>
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

              {/* Key Stat - centered below */}
              {stat && (
                <motion.div
                  variants={listItemVariants}
                  className="mt-6 flex flex-col items-center text-center"
                >
                  <span className="text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-xs text-foreground/50 sm:text-sm">
                    {stat.label}
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Section - integrated */}
        {trust && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 flex flex-col items-center sm:mt-20"
          >
            <motion.p
              variants={listItemVariants}
              className="mb-6 text-sm text-foreground/40"
            >
              {trust.title}
            </motion.p>
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14"
            >
              {trust.logos.map((logo, idx) => {
                // Map logo names to file paths (if available)
                const logoFiles: Record<string, string> = {
                  Neede: "/logo-trusted/need.svg",
                };
                const logoFile = logoFiles[logo];

                return (
                  <motion.div
                    key={idx}
                    variants={listItemVariants}
                    className="flex items-center justify-center"
                  >
                    {logoFile ? (
                      <img
                        src={logoFile}
                        alt={logo}
                        className="h-6 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-8"
                        style={{
                          filter: "brightness(0) saturate(100%)",
                        }}
                      />
                    ) : (
                      <span className="text-base font-medium tracking-tight text-[#1a1a1a]/40 transition-colors duration-300 hover:text-[#1a1a1a]/70 sm:text-lg">
                        {logo}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
