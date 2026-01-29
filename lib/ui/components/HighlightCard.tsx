"use client";

import { ReactNode } from "react";
import { motion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface HighlightCardProps {
  badge?: {
    text: string;
    color?: "orange" | "blue" | "green" | "purple";
  };
  title: string | ReactNode;
  description?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const badgeStyles = {
  orange: "bg-orange-50 text-orange-700 border-orange-200/60",
  blue: "bg-blue-50 text-blue-700 border-blue-200/60",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  purple: "bg-violet-50 text-violet-700 border-violet-200/60",
};

export function HighlightCard({
  badge,
  title,
  description,
  icon,
  className,
  onClick,
}: HighlightCardProps) {
  const isClickable = !!onClick;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center p-8 md:p-10",
        "rounded-3xl border border-border bg-card",
        "group shadow-[0_8px_30px_rgba(0,0,0,0.03)]",
        isClickable ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      {/* Optional Top Badge */}
      {badge && (
        <div
          className={cn(
            "mb-6 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase",
            badgeStyles[badge.color || "blue"]
          )}
        >
          {badge.text}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex max-w-sm flex-col items-center space-y-4 text-center">
        <h3
          className={cn(
            "text-xl leading-snug tracking-tight text-foreground md:text-2xl",
            !description ? "font-bold" : "font-semibold"
          )}
        >
          {title}
        </h3>

        {description && (
          <p className="leading-relaxed font-normal text-foreground/70">
            {description}
          </p>
        )}
      </div>

      {/* Optional Bottom Decor/Icon */}
      {icon && (
        <div className="mt-8 text-accent/80 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      )}

      {/* Subtle Bottom Accent for Premium Feel */}
      {!icon && (
        <div className="mt-8 h-1 w-8 rounded-full bg-accent/10 transition-colors group-hover:bg-accent/30" />
      )}
    </motion.div>
  );
}
