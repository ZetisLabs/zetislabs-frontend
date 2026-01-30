"use client";

import { motion } from "@/lib/motion";
import { Search, FileText, Terminal, Rocket } from "lucide-react";

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface ProcessSectionClientProps {
  label?: string;
  title: string;
  subtitle?: string;
  steps: Step[];
}

const stepIcons = [
  <Search key="1" className="h-4 w-4" />,
  <FileText key="2" className="h-4 w-4" />,
  <Terminal key="3" className="h-4 w-4" />,
  <Rocket key="4" className="h-4 w-4" />,
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

/**
 * Process Section - Swiss Style
 *
 * Clean layout with title/subtitle on left, pixel art on right.
 * Cards in a clean grid below.
 */
export function ProcessSectionClient({
  label = "Process",
  title,
  subtitle,
  steps,
}: ProcessSectionClientProps) {
  return (
    <section
      data-section="process"
      className="relative scroll-section overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Header with pixel art zone on right */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            {/* Left: Label, Title, Subtitle */}
            <div className="max-w-xl">
              {/* Label badge */}
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-1.5 text-sm font-medium text-foreground/70">
                  <span className="text-accent">●</span>
                  {label}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={itemVariants}
                className="text-3xl leading-[1.15] font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                {title}
              </motion.h2>

              {/* Subtitle */}
              {subtitle && (
                <motion.p
                  variants={itemVariants}
                  className="font-secondary mt-4 max-w-md text-base leading-relaxed text-foreground/60"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>

            {/* Right: Pixel art space (desktop only) */}
            <div
              className="hidden lg:flex lg:h-40 lg:w-80 lg:items-center lg:justify-center"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Desktop: 4-column grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <motion.div key={idx} variants={itemVariants} className="group">
                  <div className="relative h-full rounded-xl border border-border/40 bg-card/60 p-6 transition-all duration-300 hover:border-border/60 hover:bg-card/80 hover:shadow-md">
                    {/* Header: Number left, Icon right */}
                    <div className="mb-5 flex items-start justify-between">
                      <div className="text-4xl font-bold text-accent/20">
                        {step.number}
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-foreground/50 transition-colors group-hover:text-foreground">
                        {stepIcons[idx] || stepIcons[0]}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-base font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/55">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tablet: 2-column grid */}
          <div className="hidden sm:block lg:hidden">
            <div className="grid grid-cols-2 gap-5">
              {steps.map((step, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <div className="group relative h-full rounded-xl border border-border/40 bg-card/60 p-5 transition-all duration-300 hover:border-border/60 hover:bg-card/80">
                    {/* Header: Number left, Icon right */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="text-3xl font-bold text-accent/20">
                        {step.number}
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-foreground/50">
                        {stepIcons[idx] || stepIcons[0]}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="mb-1.5 text-sm font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-foreground/55">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical timeline */}
          <div className="sm:hidden">
            <div className="relative pl-14">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative pb-8 last:pb-0"
                >
                  {/* Timeline circle */}
                  <div className="absolute top-0 left-0 -translate-x-[calc(100%+1.5rem)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white shadow-md">
                      {step.number}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="rounded-xl border border-border/40 bg-card/60 p-4">
                    <div className="mb-2 flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-background text-foreground/50">
                        {stepIcons[idx] || stepIcons[0]}
                      </div>
                      <h3 className="text-sm font-medium text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-foreground/55">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
