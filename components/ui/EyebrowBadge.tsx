"use client";

import { useElementEffect, EFFECT_LAYERS } from "@/components/effects";

type EyebrowBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * EyebrowBadge Component
 *
 * Badge avec effet de glow au hover, utilisant le système d'effets par couches.
 * L'effet de glow est automatiquement rendu sous la grille CSS (z-[3]).
 *
 * @example
 * ```tsx
 * <EyebrowBadge>
 *   <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
 *   New Feature
 * </EyebrowBadge>
 * ```
 */
export function EyebrowBadge({ children, className = "" }: EyebrowBadgeProps) {
  // Utiliser le hook useElementEffect pour gérer l'effet de glow
  const { ref, triggerProps } = useElementEffect<HTMLDivElement>({
    layer: EFFECT_LAYERS.UNDER_GRID, // z-[3] - sous la grille
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
      {/* Eyebrow badge */}
      <div className="relative z-10 inline-flex animate-fade-in-slide items-center gap-2 rounded-full border border-border/40 bg-background px-3 py-1 text-xs tracking-wider text-foreground/60 uppercase transition-all duration-300 group-hover:border-accent/60 group-hover:text-foreground/80">
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// DEPRECATED - Kept for backwards compatibility
// =============================================================================

type EyebrowBadgeLegacyProps = {
  children: React.ReactNode;
  onHoverChange?: (isHovered: boolean, rect: DOMRect | null) => void;
};

/**
 * @deprecated Use EyebrowBadge instead. This component is kept for backwards compatibility.
 */
export function EyebrowBadgeLegacy({
  children,
  onHoverChange,
}: EyebrowBadgeLegacyProps) {
  const { ref, triggerProps, isActive } = useElementEffect<HTMLDivElement>({
    layer: EFFECT_LAYERS.ABOVE_CONTENT,
    trigger: "hover",
    color: "accent",
    padding: 13,
    onActiveChange: (active) => {
      if (onHoverChange && ref.current) {
        onHoverChange(
          active,
          active ? ref.current.getBoundingClientRect() : null
        );
      }
    },
  });

  return (
    <div
      ref={ref}
      {...triggerProps}
      className="group relative mb-6 inline-flex items-center justify-center"
    >
      <div className="relative z-10 inline-flex animate-fade-in-slide items-center gap-2 rounded-full border border-border/40 bg-background px-3 py-1 text-xs tracking-wider text-foreground/60 uppercase transition-all duration-300 group-hover:border-accent/60 group-hover:text-foreground/80">
        {children}
      </div>
    </div>
  );
}

/**
 * @deprecated This component is no longer needed. Use EyebrowBadge instead,
 * which automatically renders the glow effect in the correct z-index layer.
 */
export function EyebrowHoverEffect() {
  console.warn(
    "EyebrowHoverEffect is deprecated and no longer renders anything. " +
      "Use EyebrowBadge instead, which automatically handles the glow effect."
  );
  return null;
}
