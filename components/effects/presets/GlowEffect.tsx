"use client";

import { useMemo } from "react";

// =============================================================================
// TYPES
// =============================================================================

/**
 * Position de l'effet glow.
 * Peut etre un DOMRect, des coordonnees absolues, ou des coordonnees de viewport.
 */
export type GlowPosition =
  | DOMRect
  | {
      x: number;
      y: number;
      width?: number;
      height?: number;
    }
  | null;

/**
 * Preset de couleur pour le glow.
 */
export type GlowColorPreset =
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "neutral";

/**
 * Configuration de couleur personnalisee.
 */
export interface GlowColorConfig {
  /** Couleur RGB (ex: "58, 123, 213") */
  rgb: string;
  /** Opacite maximale du glow (0-1) */
  maxOpacity?: number;
}

export interface GlowEffectProps {
  /**
   * Position du glow (centre de l'effet).
   * Accepte un DOMRect ou des coordonnees {x, y, width?, height?}
   */
  position: GlowPosition;

  /**
   * Couleur du glow.
   * Peut etre un preset ("accent", "success", etc.) ou une config personnalisee.
   * @default "accent"
   */
  color?: GlowColorPreset | GlowColorConfig;

  /**
   * Taille du glow en pixels (rayon).
   * @default 100
   */
  size?: number;

  /**
   * Padding autour de la position (pour les DOMRect).
   * @default 13
   */
  padding?: number;

  /**
   * Forme du glow.
   * @default "ellipse"
   */
  shape?: "circle" | "ellipse";

  /**
   * Ratio d'aspect pour les ellipses (largeur/hauteur).
   * @default { x: 80, y: 120 } (80% largeur, 120% hauteur)
   */
  aspectRatio?: { x: number; y: number };

  /**
   * Intensite du glow (multiplicateur d'opacite).
   * @default 1
   */
  intensity?: number;

  /**
   * Animation d'entree/sortie.
   * @default true
   */
  animated?: boolean;

  /**
   * Duree de l'animation en ms.
   * @default 300
   */
  animationDuration?: number;

  /**
   * Classe CSS additionnelle.
   */
  className?: string;
}

// =============================================================================
// PRESETS DE COULEUR
// =============================================================================

const COLOR_PRESETS: Record<GlowColorPreset, GlowColorConfig> = {
  accent: { rgb: "58, 123, 213", maxOpacity: 0.15 },
  success: { rgb: "34, 197, 94", maxOpacity: 0.12 },
  warning: { rgb: "234, 179, 8", maxOpacity: 0.12 },
  error: { rgb: "239, 68, 68", maxOpacity: 0.12 },
  neutral: { rgb: "100, 100, 100", maxOpacity: 0.08 },
};

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * GlowEffect
 *
 * Effet de lueur radiale utilisable avec le systeme d'effets par couches.
 * S'adapte automatiquement a la position fournie (DOMRect ou coordonnees).
 *
 * @example
 * ```tsx
 * // Avec un DOMRect (typiquement depuis getBoundingClientRect)
 * <GlowEffect position={elementRect} color="accent" size={100} />
 *
 * // Avec des coordonnees absolues
 * <GlowEffect position={{ x: 100, y: 200 }} color="success" />
 *
 * // Avec une couleur personnalisee
 * <GlowEffect
 *   position={rect}
 *   color={{ rgb: "255, 100, 50", maxOpacity: 0.2 }}
 * />
 * ```
 */
export function GlowEffect({
  position,
  color = "accent",
  size = 100,
  padding = 13,
  shape = "ellipse",
  aspectRatio = { x: 80, y: 120 },
  intensity = 1,
  animated = true,
  animationDuration = 300,
  className = "",
}: GlowEffectProps) {
  // Resoudre la configuration de couleur
  const colorConfig = useMemo<GlowColorConfig>(() => {
    if (typeof color === "string") {
      return COLOR_PRESETS[color] || COLOR_PRESETS.accent;
    }
    return { maxOpacity: 0.15, ...color };
  }, [color]);

  // Calculer les styles de position
  const positionStyles = useMemo(() => {
    if (!position) return null;

    // DOMRect ou objet avec dimensions
    if ("width" in position && "height" in position) {
      const rect = position as DOMRect;
      return {
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      };
    }

    // Coordonnees simples {x, y}
    const pos = position as {
      x: number;
      y: number;
      width?: number;
      height?: number;
    };
    const width = pos.width ?? size * 2;
    const height = pos.height ?? size * 2;

    return {
      top: pos.y - height / 2,
      left: pos.x - width / 2,
      width,
      height,
    };
  }, [position, padding, size]);

  // Construire le gradient
  const gradient = useMemo(() => {
    const { rgb, maxOpacity = 0.15 } = colorConfig;
    const finalOpacity = maxOpacity * intensity;

    if (shape === "circle") {
      return `radial-gradient(circle at 50% 50%,
        rgba(${rgb}, ${finalOpacity}) 0%,
        rgba(${rgb}, ${finalOpacity * 0.8}) 30%,
        rgba(${rgb}, ${finalOpacity * 0.4}) 60%,
        transparent 100%)`;
    }

    return `radial-gradient(ellipse ${aspectRatio.x}% ${aspectRatio.y}% at 50% 50%,
      rgba(${rgb}, ${finalOpacity}) 0%,
      rgba(${rgb}, ${finalOpacity * 0.8}) 50%,
      rgba(${rgb}, ${finalOpacity * 0.33}) 75%,
      transparent 100%)`;
  }, [colorConfig, shape, aspectRatio, intensity]);

  // Ne pas rendre si pas de position
  if (!positionStyles) return null;

  return (
    <div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        ...positionStyles,
        background: gradient,
        transition: animated
          ? `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`
          : undefined,
      }}
      aria-hidden="true"
    />
  );
}

// =============================================================================
// VARIANTS PRECONFIGUREES
// =============================================================================

/**
 * Variante du GlowEffect optimisee pour les badges/pills.
 * Plus petit et plus subtil.
 */
export function BadgeGlow(props: Omit<GlowEffectProps, "size" | "padding">) {
  return <GlowEffect {...props} size={60} padding={13} intensity={0.8} />;
}

/**
 * Variante du GlowEffect pour les cartes/sections.
 * Plus grand et plus diffus.
 */
export function CardGlow(props: Omit<GlowEffectProps, "size" | "padding">) {
  return (
    <GlowEffect
      {...props}
      size={200}
      padding={30}
      aspectRatio={{ x: 100, y: 80 }}
      intensity={0.6}
    />
  );
}

/**
 * Variante du GlowEffect pour le focus/highlight.
 * Circulaire et intense.
 */
export function FocusGlow(props: Omit<GlowEffectProps, "shape">) {
  return <GlowEffect {...props} shape="circle" intensity={1.2} />;
}
