"use client";

import { motion } from "@/lib/motion";

interface TestimonialCardProps {
  badge: string;
  badgeColor?: "orange" | "blue";
  headline: {
    highlight: string;
    regular: string;
  };
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  onClick?: () => void;
}

export function TestimonialCard({
  badge,
  badgeColor = "orange",
  headline,
  author,
  onClick,
}: TestimonialCardProps) {
  const isOrange = badgeColor === "orange";

  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        y: -4,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
      }}
      className={`relative flex flex-col items-center rounded-3xl border border-border/50 bg-card p-8 text-center shadow-sm transition-colors duration-300 md:p-10 ${onClick ? "cursor-pointer" : ""} `}
    >
      {/* Badge Pill */}
      <div
        className={`mb-8 rounded-full border px-4 py-1 text-[11px] font-semibold tracking-wider uppercase transition-colors duration-300 ${
          isOrange
            ? "border-orange-500/30 text-orange-600 group-hover:border-orange-500"
            : "border-accent/30 text-accent group-hover:border-accent"
        } `}
      >
        {badge}
      </div>

      {/* Headline with Mixed Weights */}
      <h3 className="mb-10 max-w-[90%] font-heading text-2xl leading-tight md:text-3xl">
        <span className="block font-bold text-foreground md:inline">
          {headline.highlight}
        </span>{" "}
        <span className="font-normal text-foreground/50">
          {headline.regular}
        </span>
      </h3>

      {/* Author Footer */}
      {author && (
        <div className="mt-auto flex flex-col items-center gap-3">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="h-10 w-10 rounded-full object-cover opacity-80 grayscale"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-border/30">
              <span className="text-xs font-medium text-foreground/40">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-sans text-sm font-semibold text-foreground">
              {author.name}
            </span>
            <span className="font-sans text-xs text-foreground/40">
              {author.role}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
