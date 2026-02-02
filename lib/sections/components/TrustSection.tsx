"use client";

import { motion } from "@/lib/motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

export interface TrustClientProps {
  title: string;
  logos: string[];
}

/**
 * Trust Section Client Component
 *
 * Displays social proof with client/partner logos
 */
export function TrustClient({ title, logos }: TrustClientProps) {
  return (
    <section
      data-section="trust"
      className="relative scroll-section py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center"
        >
          {/* Title */}
          <motion.p
            variants={itemVariants}
            className="mb-8 text-sm text-foreground/50 sm:text-base"
          >
            {title}
          </motion.p>

          {/* Logos */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16"
          >
            {logos.map((logo, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative"
              >
                <span className="text-lg font-medium tracking-tight text-foreground/30 transition-colors duration-300 group-hover:text-foreground/60 sm:text-xl">
                  {logo}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
