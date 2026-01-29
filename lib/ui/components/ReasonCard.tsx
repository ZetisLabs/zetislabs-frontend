"use client";

import { motion } from "@/lib/motion";

type ReasonCardProps = {
  title: string;
  description: string;
  index: number;
};

// Variants for coordinated hover animations
const cardVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  },
};

const numberVariants = {
  rest: { scale: 1, opacity: 0.1 },
  hover: { scale: 1.1, opacity: 0.2 },
};

const underlineVariants = {
  rest: { width: "3rem" },
  hover: { width: "100%" },
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

export function ReasonCard({ title, description, index }: ReasonCardProps) {
  return (
    <motion.div
      className="group relative h-full overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm group-hover/grid:opacity-40 hover:!opacity-100 md:p-8"
      initial="rest"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.5 }}
    >
      {/* Background Number */}
      <motion.div
        className="absolute -top-4 -right-4 text-7xl font-bold text-foreground/5 md:text-9xl"
        variants={numberVariants}
        transition={{ duration: 0.5 }}
      >
        0{index + 1}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <motion.h3
            className="text-2xl font-semibold text-foreground"
            variants={{
              rest: { color: "var(--color-foreground)" },
              hover: { color: "var(--color-accent)" },
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.div
            className="mt-4 h-px bg-accent/50"
            variants={underlineVariants}
            transition={{ duration: 0.3 }}
          />
          <p className="text-muted-foreground mt-4 text-base leading-relaxed group-hover:text-foreground/80">
            {description}
          </p>
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent"
        variants={overlayVariants}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
