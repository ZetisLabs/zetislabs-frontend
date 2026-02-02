"use client";

import { ReactNode } from "react";
import { motion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MetricDetail {
  label: string;
  value: string;
}

interface MetricCardProps {
  icon?: ReactNode;
  label: string;
  sublabel?: string;
  metric: string;
  details?: MetricDetail[];
  onClick?: () => void;
  className?: string;
}

export function MetricCard({
  icon,
  label,
  sublabel,
  metric,
  details,
  onClick,
  className,
}: MetricCardProps) {
  const isClickable = !!onClick;

  return (
    <motion.div
      layout
      role={isClickable ? "button" : "article"}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      whileHover={
        isClickable
          ? {
              scale: 1.02,
              borderColor: "var(--color-border)",
              boxShadow: "0 12px 30px -10px rgba(0, 0, 0, 0.08)",
            }
          : {}
      }
      whileTap={isClickable ? { scale: 0.98 } : {}}
      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
      className={cn(
        "group relative flex w-full flex-col",
        "rounded-3xl border border-border/50 bg-card p-6 md:p-8",
        "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]",
        "transition-colors duration-200",
        isClickable && "cursor-pointer",
        className
      )}
    >
      {/* Top Section: Icon & Identity */}
      <div className="mb-1 flex items-center gap-3">
        {icon && (
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/40 bg-background">
            {icon}
          </div>
        )}
        <span className="font-heading font-semibold tracking-tight text-foreground">
          {label}
        </span>
      </div>

      {/* Secondary Context */}
      {sublabel && (
        <p className="mb-3 font-sans text-sm leading-relaxed text-foreground/50">
          {sublabel}
        </p>
      )}

      {/* Main Metric Content */}
      <div className="mt-auto">
        <h3 className="font-heading text-2xl leading-tight font-bold tracking-tight text-foreground md:text-3xl">
          {metric}
        </h3>
      </div>

      {/* Bottom Section: Supporting Details */}
      {details && details.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/30 pt-5">
          {details.map((detail, index) => (
            <div
              key={`${detail.label}-${index}`}
              className="flex items-center gap-1.5"
            >
              <span className="font-sans text-[11px] font-semibold tracking-wider text-foreground/30 uppercase">
                {detail.label}
              </span>
              <span className="font-sans text-xs font-medium text-foreground/70">
                {detail.value}
              </span>
              {index < details.length - 1 && (
                <div className="ml-2 hidden h-1 w-1 rounded-full bg-border sm:block" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Interactive indicator (only visible on hover if clickable) */}
      {isClickable && (
        <div className="absolute top-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M7 7l10 10M17 7H7v10" transform="rotate(45 12 12)" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
