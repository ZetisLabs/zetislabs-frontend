"use client";

import { motion } from "@/lib/motion";
import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  serviceName: string;
  label: string;
  title: string;
  date: string;
  assignee?: string;
  gradientColor?: "peach" | "blue" | "none";
  rotation?: number;
}

export function ServiceCard({
  icon,
  serviceName,
  label,
  title,
  date,
  assignee,
  gradientColor = "none",
  rotation = 0,
}: ServiceCardProps) {
  const gradientStyles = {
    peach: "from-transparent via-orange-50/10 to-orange-200/20",
    blue: "from-transparent via-blue-50/10 to-sky-200/20",
    none: "from-transparent to-transparent",
  };

  return (
    <motion.div
      initial={{ rotate: rotation }}
      whileHover={{
        scale: 1.02,
        rotate: rotation * 0.5,
        y: -4,
        transition: { type: "spring" as const, stiffness: 400, damping: 25 },
      }}
      className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
    >
      {/* Top Section: Icon & Service Name */}
      <div className="relative z-10 mb-4 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center text-accent/80">
          {icon}
        </div>
        <span className="font-sans text-xs font-semibold tracking-wide text-foreground/80 uppercase">
          {serviceName}
        </span>
      </div>

      {/* Label Section */}
      <div className="relative z-10 mb-1">
        <span className="font-sans text-[13px] text-foreground/50">
          {label}
        </span>
      </div>

      {/* Main Content: Title */}
      <h3 className="relative z-10 mb-6 font-heading text-lg leading-tight font-bold text-foreground">
        {title}
      </h3>

      {/* Bottom Footer: Date & Assignee */}
      <div className="relative z-10 flex items-center justify-between border-t border-border/40 pt-4">
        <div className="font-sans text-xs text-foreground/50">{date}</div>

        {assignee && (
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
              <span className="text-[10px] font-bold text-accent">
                {assignee.charAt(0)}
              </span>
            </div>
            <span className="font-sans text-xs font-medium text-foreground/70">
              {assignee}
            </span>
          </div>
        )}
      </div>

      {/* Ethereal Inner Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 ring-inset" />
    </motion.div>
  );
}
