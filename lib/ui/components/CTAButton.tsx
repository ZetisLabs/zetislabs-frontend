"use client";

import { motion } from "@/lib/motion";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  ariaLabel?: string;
  showArrow?: boolean;
  className?: string;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  ariaLabel,
  showArrow = true,
  className = "",
}: CTAButtonProps) {
  if (variant === "primary") {
    return (
      <motion.a
        href={href}
        className={`group relative isolate inline-flex min-h-[44px] items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-accent px-8 py-3.5 font-semibold text-background shadow-[0_8px_30px_rgb(58,123,213,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] ${className}`}
        whileHover={{
          scale: 1.02,
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 15 }}
        aria-label={ariaLabel}
      >
        {/* Glass Sheen Effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Animated Light Sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: ["−100%", "200%"] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
            repeatDelay: 1,
          }}
        />

        <span className="relative z-10">{children}</span>

        {showArrow && (
          <motion.div
            className="relative z-10"
            whileHover={{ x: 4 }}
            transition={{ type: "spring" as const, stiffness: 400 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 drop-shadow-sm"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.div>
        )}

        {/* Geometric "Cell" Accent - Echoing the background grid */}
        <div className="absolute top-0 left-0 m-1.5 h-2 w-2 border-t-2 border-l-2 border-white/40 opacity-60" />
      </motion.a>
    );
  }

  // Secondary variant
  return (
    <motion.a
      href={href}
      className={`group relative inline-flex min-h-[44px] items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-card/40 px-8 py-3 text-base font-medium text-foreground/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:border-accent/30 hover:bg-card/60 hover:text-foreground hover:shadow-[0_10px_25px_-5px_rgba(58,123,213,0.12)] ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
      aria-label={ariaLabel}
    >
      {/* Layered Glass Depth (Inner Border) */}
      <div className="pointer-events-none absolute inset-[1px] rounded-[11px] border border-white/80 opacity-60" />

      {/* Subtle Radial Hover Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(58,123,213,0.05)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Animated Light Sweep */}
      <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />

      <span className="relative z-10 flex items-center gap-2">
        {children}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 translate-x-0 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </motion.a>
  );
}
