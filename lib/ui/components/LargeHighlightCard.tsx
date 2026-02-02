"use client";

import { ReactNode } from "react";
import { motion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface LargeHighlightCardProps {
  badge?: {
    text: string;
    color?: "orange" | "blue" | "green" | "purple";
  };
  title: string;
  description: string;
  decoration?: ReactNode;
  className?: string;
}

const badgeColorMap = {
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-green-100 text-green-700 border-green-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
};

export function LargeHighlightCard({
  badge,
  title,
  description,
  decoration,
  className,
}: LargeHighlightCardProps) {
  const selectedBadgeColor = badge?.color
    ? badgeColorMap[badge.color]
    : badgeColorMap.blue;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
      className={cn(
        "relative w-full overflow-hidden",
        "border border-border bg-card",
        "rounded-3xl p-8 md:p-10 lg:p-12",
        "shadow-sm transition-shadow duration-300 hover:shadow-2xl",
        "flex flex-col items-center gap-8 md:flex-row md:gap-12",
        // Fixed height based on screen size
        "h-[320px] md:h-[280px] lg:h-[300px]",
        className
      )}
    >
      {/* Content Side */}
      <div className="z-10 flex flex-1 flex-col items-start gap-4">
        {badge && (
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase",
              selectedBadgeColor
            )}
          >
            {badge.text}
          </span>
        )}

        <h2 className="text-3xl leading-tight font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>

        <p className="max-w-xl text-lg leading-relaxed text-foreground/70">
          {description}
        </p>
      </div>

      {/* Decoration Side */}
      {decoration && (
        <div className="relative flex min-h-[160px] w-full shrink-0 items-center justify-center md:w-auto md:min-w-[200px]">
          {/* Subtle background glow for the decoration */}
          <div className="absolute inset-0 rounded-full bg-accent/5 blur-[60px]" />
          <div className="relative z-10 transition-transform duration-500 ease-out hover:scale-105">
            {decoration}
          </div>
        </div>
      )}

      {/* Subtle Background Accent */}
      <div
        className="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 rounded-full"
        style={{
          background: `radial-gradient(circle, var(--color-accent) 0%, transparent 70%)`,
          opacity: 0.03,
        }}
      />
    </motion.div>
  );
}
