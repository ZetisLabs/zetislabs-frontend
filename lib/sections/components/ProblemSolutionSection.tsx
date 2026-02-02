"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "@/lib/motion";

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
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20,
    },
  },
} as const;

const listItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
} as const;

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
  // Rotating border animation with Framer Motion
  const angle = useMotionValue(0);
  const background = useTransform(
    angle,
    (a) => `conic-gradient(from ${a}deg, #3a7bd5, #3a7bd520 50%, #3a7bd5)`
  );

  useEffect(() => {
    const controls = animate(angle, 360, {
      duration: 4,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [angle]);

  return (
    <section
      data-section="problem-solution"
      className="relative scroll-section w-full max-w-full overflow-hidden pt-16 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-16"
    >
      <div className="relative mx-auto box-border w-full max-w-6xl overflow-hidden px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4"
        >
          {/* Problem Card */}
          <motion.div
            variants={cardVariants}
            className="relative rounded-xl border border-border/40 bg-card p-4 sm:rounded-2xl sm:p-6 lg:p-8"
          >
            {/* Title */}
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground sm:mb-6 sm:text-2xl lg:text-3xl">
              {titleProblem}
            </h2>

            {/* Problem List */}
            <motion.ul
              variants={containerVariants}
              className="mb-4 space-y-2 sm:mb-6 sm:space-y-3"
            >
              {problemItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={listItemVariants}
                  className="flex items-start gap-2 text-foreground/70 sm:gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-foreground/5 text-foreground/40 sm:h-6 sm:w-6 sm:rounded-lg">
                    {problemIcons[idx % problemIcons.length]}
                  </span>
                  <span className="text-xs leading-relaxed sm:text-sm lg:text-base">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Conclusion */}
            {conclusion && (
              <motion.p
                variants={listItemVariants}
                className="border-t border-border/30 pt-3 text-xs text-foreground/60 italic sm:pt-4 sm:text-sm"
              >
                {conclusion}
              </motion.p>
            )}
          </motion.div>

          {/* Animated Arrow between cards - Desktop */}
          <motion.div
            variants={cardVariants}
            className="hidden items-center justify-center lg:flex"
          >
            <div className="relative flex items-center justify-center">
              {/* Subtle glow behind */}
              <div className="absolute h-8 w-16 rounded-full bg-accent/10 blur-xl" />

              {/* Chevrons container */}
              <div className="relative flex items-center gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.svg
                    key={i}
                    width="12"
                    height="20"
                    viewBox="0 0 12 20"
                    fill="none"
                    className="text-accent"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      d="M2 2L10 10L2 18"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Animated Arrow - Mobile (vertical) */}
          <motion.div
            variants={cardVariants}
            className="flex items-center justify-center py-2 lg:hidden"
          >
            <div className="relative flex flex-col items-center justify-center">
              {/* Subtle glow behind */}
              <div className="absolute h-12 w-8 rounded-full bg-accent/10 blur-xl" />

              {/* Chevrons container */}
              <div className="relative flex flex-col items-center gap-0">
                {[0, 1, 2].map((i) => (
                  <motion.svg
                    key={i}
                    width="16"
                    height="10"
                    viewBox="0 0 20 12"
                    fill="none"
                    className="text-accent"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      d="M2 2L10 10L18 2"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Solution Card with rotating glow border */}
          <motion.div variants={cardVariants} className="relative h-full">
            {/* Rotating gradient border wrapper - animated with Framer Motion */}
            <motion.div
              className="relative h-full rounded-xl p-[2px] sm:rounded-2xl"
              style={{ background }}
            >
              {/* Inner card content */}
              <div className="relative h-full rounded-[10px] bg-card p-4 sm:rounded-[14px] sm:p-6 lg:p-8">
                {/* Title with accent underline */}
                <h2 className="relative mb-4 text-lg font-semibold tracking-tight text-foreground sm:mb-6 sm:text-2xl lg:text-3xl">
                  {titleSolution}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-accent/60 sm:w-16" />
                </h2>

                {/* Body */}
                <p className="relative mb-4 text-xs leading-relaxed text-foreground/75 sm:mb-6 sm:text-sm lg:text-base">
                  {body}
                </p>

                {/* Accent Result Box */}
                {accent && (
                  <motion.div
                    variants={listItemVariants}
                    className="relative rounded-lg border border-accent/20 bg-accent/5 p-3 sm:rounded-xl sm:p-4"
                  >
                    <p className="text-xs font-medium text-foreground/90 sm:text-sm lg:text-base">
                      {accent}
                    </p>
                  </motion.div>
                )}

                {/* Key Stat - centered below */}
                {stat && (
                  <motion.div
                    variants={listItemVariants}
                    className="mt-4 flex flex-col items-center text-center sm:mt-6"
                  >
                    <span className="text-2xl font-semibold tracking-tight text-accent sm:text-3xl lg:text-4xl">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-foreground/50 sm:text-xs lg:text-sm">
                      {stat.label}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Trust Section - integrated */}
        {trust && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 flex flex-col items-center sm:mt-12 lg:mt-16"
          >
            <motion.p
              variants={listItemVariants}
              className="mb-4 text-xs text-foreground/40 sm:mb-6 sm:text-sm"
            >
              {trust.title}
            </motion.p>
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12"
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
                        className="h-5 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-6 lg:h-8"
                        style={{
                          filter: "brightness(0) saturate(100%)",
                        }}
                      />
                    ) : (
                      <span className="text-sm font-medium tracking-tight text-[#1a1a1a]/40 transition-colors duration-300 hover:text-[#1a1a1a]/70 sm:text-base lg:text-lg">
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
