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
 * EyebrowBadge V2
 *
 * Badge avec effet de glow au hover, utilisant le systeme d'effets par couches.
 * L'effet de glow est rendu automatiquement sous la grille CSS (z-index: 3)
 * grace au hook useElementEffect.
 *
 * Cette version simplifie l'API par rapport a la V1:
 * - Plus besoin de passer onHoverChange au parent
 * - Plus besoin de rendre EyebrowHoverEffect au niveau de la section
 * - L'effet est automatiquement positionne et rendu au bon z-index
 * - Utilise useElementEffect qui gere tout automatiquement
 *
 * @example
 * ```tsx
 * // Utilisation simple - l'effet glow est gere automatiquement
 * <EyebrowBadge>
 *   <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
 *   Your text here
 * </EyebrowBadge>
 * ```
 */
export function EyebrowBadge({ children, className = "" }: EyebrowBadgeProps) {
  // useElementEffect gere automatiquement:
  // - Le tracking de la position de l'element
  // - Les events hover (mouseenter/mouseleave)
  // - L'enregistrement de l'effet dans le systeme de couches
  // - La mise a jour sur scroll/resize
  const { ref, triggerProps } = useElementEffect<HTMLDivElement>({
    layer: EFFECT_LAYERS.UNDER_GRID,
    trigger: "hover",
    color: "accent",
    padding: 13,
  });

  return (
    <div
      ref={ref}
      {...triggerProps}
      className={`group relative mb-6 inline-flex items-center justify-center ${className}`}
    >
      {/* Badge content */}
      <div className="relative z-10 inline-flex animate-fade-in-slide items-center gap-2 rounded-full border border-border/40 bg-background px-3 py-1 text-xs tracking-wider text-foreground/60 uppercase transition-all duration-300 group-hover:border-accent/60 group-hover:text-foreground/80">
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// EXPORTS LEGACY
// =============================================================================

/**
 * @deprecated Utilisez EyebrowBadge a la place.
 * Ce composant n'est plus necessaire avec le systeme d'effets par couches.
 * L'effet est maintenant rendu automatiquement par le EffectLayerProvider.
 */
export function EyebrowHoverEffect() {
  console.warn(
    "EyebrowHoverEffect is deprecated. " +
      "The glow effect is now automatically rendered by EyebrowBadge via the effect layer system."
  );
  return null;
}
