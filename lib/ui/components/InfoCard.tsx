"use client";

import { ReactNode } from "react";
import { motion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  icon?: ReactNode;
  title: string;
  content: string | ReactNode;
  footer?: string | ReactNode;
  className?: string;
  onClick?: () => void;
}

export function InfoCard({
  icon,
  title,
  content,
  footer,
  className,
  onClick,
}: InfoCardProps) {
  const isClickable = !!onClick;

  return (
    <motion.div
      whileHover={{ scale: 1.015, borderColor: "var(--color-accent)" }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col gap-5 p-6",
        "border border-border bg-card",
        "rounded-3xl shadow-sm transition-colors duration-200",
        isClickable ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      {/* Top Row: Icon + Title */}
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-accent ring-1 ring-border transition-colors group-hover:bg-accent group-hover:text-white group-hover:ring-transparent">
            {icon}
          </div>
        )}
        <h3 className="text-sm font-medium tracking-tight text-foreground/70 transition-opacity group-hover:text-foreground">
          {title}
        </h3>
      </div>

      {/* Middle Content: Main Area */}
      <div className="flex-1">
        {typeof content === "string" ? (
          <p className="text-base leading-relaxed text-foreground">{content}</p>
        ) : (
          <div className="text-foreground">{content}</div>
        )}
      </div>

      {/* Bottom Row: Footer/CTA */}
      {footer && (
        <div className="mt-auto border-t border-border/50 pt-4">
          {typeof footer === "string" ? (
            <span className="text-xs font-medium text-foreground/50">
              {footer}
            </span>
          ) : (
            footer
          )}
        </div>
      )}
    </motion.div>
  );
}
