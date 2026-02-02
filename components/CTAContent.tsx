"use client";

import { useRef } from "react";
import { motion, useInView } from "@/lib/motion";
import { CTAButton } from "@/lib/ui";

interface CTAContentProps {
  title: string;
  description: string;
  primaryCTA: {
    label: string;
    href: string;
    ariaLabel: string;
  };
  secondaryCTA: {
    label: string;
    href: string;
    ariaLabel: string;
  };
}

export function CTAContent({
  title,
  description,
  primaryCTA,
  secondaryCTA,
}: CTAContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.4, // Trigger when 40% visible
  });

  return (
    <div ref={ref} className="mx-auto max-w-3xl text-center">
      <motion.h2
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg"
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {description}
      </motion.p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <CTAButton
            href={primaryCTA.href}
            variant="primary"
            ariaLabel={primaryCTA.ariaLabel}
          >
            {primaryCTA.label}
          </CTAButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <CTAButton
            href={secondaryCTA.href}
            variant="secondary"
            ariaLabel={secondaryCTA.ariaLabel}
          >
            {secondaryCTA.label}
          </CTAButton>
        </motion.div>
      </div>
    </div>
  );
}
