"use client";

import { useElementEffect, EFFECT_LAYERS } from "@/components/effects";

// =============================================================================
// TYPES
// =============================================================================

interface EyebrowBadgeProps {
  /** Contenu du badge */
  children: React.ReactNode;
  /** Classe CSS additionnelle */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * EyebrowBadge
 *
 * Badge avec effet de glow au hover, utilisant le système d'effets par couches.
 * L'effet de glow est rendu automatiquement sous la grille CSS (z-index: 3)
 * grâce au hook useElementEffect.
 *
 * Fonctionnalités:
 * - Tracking automatique de la position de l'élément
 * - Gestion des events hover (mouseenter/mouseleave)
 * - Enregistrement de l'effet dans le système de couches
 * - Mise à jour sur scroll/resize
 *
 * @example
 * ```tsx
 * <EyebrowBadge>
 *   <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
 *   Your text here
 * </EyebrowBadge>
 * ```
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
