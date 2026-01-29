"use client";

import { useElementEffect, EFFECT_LAYERS } from "@/components/effects";

interface EyebrowBadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * EyebrowBadge
 *
 * Badge with hover glow effect, using the layer effects system.
 * The glow effect is automatically rendered under the CSS grid (z-index: 3)
 * through the useElementEffect hook.
 *
 * Features:
 * - Automatic element position tracking
 * - Hover event handling (mouseenter/mouseleave)
 * - Effect registration in the layer system
 * - Updates on scroll/resize
 */
export function EyebrowBadge({ children, className = "" }: EyebrowBadgeProps) {
  const { ref, triggerProps } = useElementEffect<HTMLDivElement>({
    layer: EFFECT_LAYERS.UNDER_GRID,
    trigger: "hover",
    color: "accent",
    padding: 13,
    intensity: 1,
  });

  return (
    <div
      ref={ref}
      {...triggerProps}
      className={`group relative mb-6 inline-flex items-center justify-center ${className}`}
    >
      <div className="animate-fade-in-slide relative z-10 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background px-3 py-1 text-xs tracking-wider text-foreground/60 uppercase transition-all duration-300 group-hover:border-accent/60 group-hover:text-foreground/80">
        {children}
      </div>
    </div>
  );
}
