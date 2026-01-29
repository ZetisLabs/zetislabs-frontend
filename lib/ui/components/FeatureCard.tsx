"use client";

import { motion } from "@/lib/motion";

type FeatureCardProps = {
  title: string;
  subtitle: string;
  description: string;
  cta?: string;
};

// Variants for coordinated hover animations
const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
};

const emojiVariants = {
  rest: { x: -32, opacity: 0 },
  hover: { x: 0, opacity: 1 },
};

const titleVariants = {
  rest: { x: 0 },
  hover: { x: 8 },
};

const ctaContainerVariants = {
  rest: {
    backgroundColor: "rgba(var(--color-accent-rgb, 58, 123, 213), 0.1)",
    paddingRight: "0px",
    paddingLeft: "0px",
  },
  hover: {
    backgroundColor: "var(--color-accent)",
    paddingRight: "4px",
    paddingLeft: "16px",
  },
};

const ctaTextVariants = {
  rest: { width: 0, opacity: 0 },
  hover: { width: "auto", opacity: 1 },
};

const arrowVariants = {
  rest: { rotate: 0 },
  hover: { rotate: 180 },
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

export function FeatureCard({
  title,
  subtitle,
  description,
  cta,
}: FeatureCardProps) {
  return (
    <div className="group relative h-full cursor-pointer">
      <motion.div
        className="group/card relative flex h-full flex-col justify-between rounded-2xl border border-border/50 bg-card/50 p-6 group-hover/grid:opacity-40 hover:!opacity-100 md:p-8"
        initial="rest"
        whileHover="hover"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center overflow-hidden">
            <motion.span
              className="mr-2 text-2xl"
              variants={emojiVariants}
              transition={{ duration: 0.3 }}
            >
              ⚡
            </motion.span>
            <motion.div variants={titleVariants} transition={{ duration: 0.3 }}>
              <h3 className="text-2xl font-normal text-foreground md:text-3xl">
                {title}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm font-medium">
                {subtitle}
              </p>
            </motion.div>
          </div>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            {description}
          </p>
        </div>
        <div className="mt-8 flex justify-end">
          <motion.div
            className="relative flex h-12 items-center rounded-full"
            variants={ctaContainerVariants}
            transition={{ duration: 0.3 }}
          >
            {cta && (
              <motion.span
                className="overflow-hidden text-sm font-medium whitespace-nowrap text-accent-foreground"
                variants={ctaTextVariants}
                transition={{ duration: 0.5 }}
              >
                {cta}
              </motion.span>
            )}
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              variants={arrowVariants}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
        {/* Hover Gradient Effect */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent"
          variants={overlayVariants}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
}
