/**
 * Effect Layer System
 *
 * Systeme d'effets visuels par couches z-index pour Next.js/React.
 *
 * Ce module exporte:
 * - EffectLayerProvider: Provider principal a placer au niveau du layout
 * - useEffectLayer: Hook bas niveau pour acceder au contexte
 * - useVisualEffect: Hook haut niveau pour enregistrer des effets
 * - EFFECT_LAYERS: Constantes des couches z-index predefinies
 * - Effets predefinis (GlowEffect, etc.)
 *
 * @example
 * ```tsx
 * // 1. Wrapper dans le layout
 * import { EffectLayerProvider } from "@/components/effects";
 *
 * export default function Layout({ children }) {
 *   return <EffectLayerProvider>{children}</EffectLayerProvider>;
 * }
 *
 * // 2. Utilisation dans un composant
 * import { useVisualEffect, EFFECT_LAYERS, GlowEffect } from "@/components/effects";
 *
 * function MyComponent() {
 *   const [isHovered, setIsHovered] = useState(false);
 *   const [rect, setRect] = useState<DOMRect | null>(null);
 *
 *   useVisualEffect({
 *     layer: EFFECT_LAYERS.UNDER_GRID,
 *     isActive: isHovered,
 *     render: <GlowEffect position={rect} />,
 *     deps: [rect],
 *   });
 *
 *   return <div onMouseEnter={() => setIsHovered(true)}>...</div>;
 * }
 * ```
 */

// Provider et hooks principaux
export {
  EffectLayerProvider,
  useEffectLayer,
  useVisualEffect,
  EFFECT_LAYERS,
  type EffectLayerLevel,
  type EffectConfig,
  type RegisterEffectOptions,
} from "./EffectLayerProvider";

// Effets predefinis
export {
  GlowEffect,
  BadgeGlow,
  CardGlow,
  FocusGlow,
  type GlowEffectProps,
  type GlowPosition,
  type GlowColorPreset,
  type GlowColorConfig,
} from "./presets";

// Hooks utilitaires
export { useElementEffect } from "./hooks";
