"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
  useId,
  useEffect as useReactEffect,
  type ReactNode,
} from "react";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * Couches z-index predefinies pour les effets visuels.
 * Ces valeurs correspondent aux niveaux de z-index definis dans l'architecture CSS.
 *
 * Architecture z-index du projet:
 * - 0: bg-grid::before (couleur de fond des bordures)
 * - 3: Effets sous la grille (glow, highlights)
 * - 5: bg-grid::after (cellules de la grille)
 * - 6: CursorSpotlight, apple-breathing-wrapper
 * - 10: Contenu principal
 * - 20+: Overlays, modals, tooltips
 */
export const EFFECT_LAYERS = {
  /** Effets de fond (sous tout le contenu) */
  BACKGROUND: 1,
  /** Effets sous la grille CSS (non visible car masqué par la grille opaque) */
  UNDER_GRID: 3,
  /** Effets au-dessus de la grille mais sous le contenu */
  ABOVE_GRID: 6,
  /** Effets au niveau du contenu */
  CONTENT: 10,
  /** Effets au-dessus du contenu (glow, highlights visibles) - RECOMMANDE pour les effets de glow */
  ABOVE_CONTENT: 11,
  /** Effets d'overlay (tooltips, dropdowns) */
  OVERLAY: 20,
  /** Effets de modal */
  MODAL: 30,
  /** Effets de notification/toast */
  NOTIFICATION: 40,
} as const;

export type EffectLayerLevel =
  (typeof EFFECT_LAYERS)[keyof typeof EFFECT_LAYERS];

/**
 * Configuration d'un effet enregistre dans le systeme.
 */
export interface EffectConfig {
  /** Identifiant unique de l'effet (genere automatiquement) */
  id: string;
  /** Niveau z-index de la couche ou rendre l'effet */
  layer: EffectLayerLevel | number;
  /** Composant React a rendre comme effet */
  render: ReactNode;
  /** Si true, l'effet est visible */
  isActive: boolean;
  /** Priorite de rendu au sein de la meme couche (plus eleve = rendu en dernier) */
  priority?: number;
}

/**
 * Options pour enregistrer un nouvel effet.
 */
export interface RegisterEffectOptions {
  /** Niveau z-index de la couche */
  layer: EffectLayerLevel | number;
  /** Composant a rendre */
  render: ReactNode;
  /** Etat actif initial (default: false) */
  isActive?: boolean;
  /** Priorite de rendu (default: 0) */
  priority?: number;
}

/**
 * API du contexte d'effets.
 */
interface EffectLayerContextValue {
  /**
   * Enregistre un nouvel effet dans le systeme.
   * @param id - Identifiant unique de l'effet
   * @param options - Configuration de l'effet
   */
  registerEffect: (id: string, options: RegisterEffectOptions) => void;

  /**
   * Supprime un effet du systeme.
   * @param id - Identifiant de l'effet a supprimer
   */
  unregisterEffect: (id: string) => void;

  /**
   * Met a jour un effet existant.
   * @param id - Identifiant de l'effet
   * @param updates - Proprietes a mettre a jour
   */
  updateEffect: (
    id: string,
    updates: Partial<Omit<EffectConfig, "id">>
  ) => void;

  /**
   * Active ou desactive un effet.
   * @param id - Identifiant de l'effet
   * @param isActive - Nouvel etat actif
   */
  setEffectActive: (id: string, isActive: boolean) => void;
}

// =============================================================================
// CONTEXT
// =============================================================================

const EffectLayerContext = createContext<EffectLayerContextValue | null>(null);

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

interface EffectLayerProviderProps {
  children: ReactNode;
}

/**
 * EffectLayerProvider
 *
 * Provider principal du systeme d'effets visuels par couches.
 * Doit etre place au niveau du layout racine de l'application.
 *
 * Ce composant gere:
 * - L'enregistrement et la desinscription des effets
 * - Le rendu des effets dans leurs couches z-index respectives
 * - La mise a jour reactive des effets
 *
 * @example
 * ```tsx
 * // Dans le layout principal
 * export default function RootLayout({ children }) {
 *   return (
 *     <EffectLayerProvider>
 *       {children}
 *     </EffectLayerProvider>
 *   );
 * }
 * ```
 */
export function EffectLayerProvider({ children }: EffectLayerProviderProps) {
  // Store des effets enregistres
  const [effects, setEffects] = useState<Map<string, EffectConfig>>(new Map());

  // Enregistrer un nouvel effet
  const registerEffect = useCallback(
    (id: string, options: RegisterEffectOptions) => {
      setEffects((prev) => {
        const newMap = new Map(prev);
        newMap.set(id, {
          id,
          layer: options.layer,
          render: options.render,
          isActive: options.isActive ?? false,
          priority: options.priority ?? 0,
        });
        return newMap;
      });
    },
    []
  );

  // Supprimer un effet
  const unregisterEffect = useCallback((id: string) => {
    setEffects((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  // Mettre a jour un effet
  const updateEffect = useCallback(
    (id: string, updates: Partial<Omit<EffectConfig, "id">>) => {
      setEffects((prev) => {
        const existing = prev.get(id);
        if (!existing) return prev;

        const newMap = new Map(prev);
        newMap.set(id, { ...existing, ...updates });
        return newMap;
      });
    },
    []
  );

  // Activer/desactiver un effet
  const setEffectActive = useCallback((id: string, isActive: boolean) => {
    setEffects((prev) => {
      const existing = prev.get(id);
      if (!existing || existing.isActive === isActive) return prev;

      const newMap = new Map(prev);
      newMap.set(id, { ...existing, isActive });
      return newMap;
    });
  }, []);

  // Grouper les effets par couche pour le rendu
  const effectsByLayer = useMemo(() => {
    const grouped = new Map<number, EffectConfig[]>();

    effects.forEach((effect) => {
      if (!effect.isActive) return;

      const layerEffects = grouped.get(effect.layer) || [];
      layerEffects.push(effect);
      grouped.set(effect.layer, layerEffects);
    });

    // Trier chaque couche par priorite
    grouped.forEach((layerEffects, layer) => {
      grouped.set(
        layer,
        layerEffects.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
      );
    });

    return grouped;
  }, [effects]);

  // Valeur du contexte
  const contextValue = useMemo<EffectLayerContextValue>(
    () => ({
      registerEffect,
      unregisterEffect,
      updateEffect,
      setEffectActive,
    }),
    [registerEffect, unregisterEffect, updateEffect, setEffectActive]
  );

  return (
    <EffectLayerContext.Provider value={contextValue}>
      {/* Rendu des couches d'effets */}
      <EffectLayerRenderer effectsByLayer={effectsByLayer} />
      {/* Contenu de l'application */}
      {children}
    </EffectLayerContext.Provider>
  );
}

// =============================================================================
// EFFECT LAYER RENDERER
// =============================================================================

interface EffectLayerRendererProps {
  effectsByLayer: Map<number, EffectConfig[]>;
}

/**
 * Composant interne qui rend les effets dans leurs couches respectives.
 * Chaque couche est un conteneur fixe avec le z-index approprie.
 */
function EffectLayerRenderer({ effectsByLayer }: EffectLayerRendererProps) {
  // Convertir le Map en tableau trie par z-index
  const sortedLayers = useMemo(
    () => Array.from(effectsByLayer.entries()).sort(([a], [b]) => a - b),
    [effectsByLayer]
  );

  if (sortedLayers.length === 0) return null;

  return (
    <>
      {sortedLayers.map(([zIndex, layerEffects]) => (
        <div
          key={`effect-layer-${zIndex}`}
          className="pointer-events-none fixed inset-0"
          style={{ zIndex }}
          aria-hidden="true"
          data-effect-layer={zIndex}
        >
          {layerEffects.map((effect) => (
            <EffectWrapper key={effect.id} effect={effect} />
          ))}
        </div>
      ))}
    </>
  );
}

/**
 * Wrapper pour un effet individuel.
 * Permet d'ajouter des comportements communs (animations, etc.)
 */
function EffectWrapper({ effect }: { effect: EffectConfig }) {
  return <>{effect.render}</>;
}

// =============================================================================
// HOOK: useEffectLayer
// =============================================================================

/**
 * Hook pour acceder au systeme d'effets visuels.
 *
 * @throws Error si utilise en dehors d'un EffectLayerProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { registerEffect, setEffectActive } = useEffectLayer();
 *   // ...
 * }
 * ```
 */
export function useEffectLayer(): EffectLayerContextValue {
  const context = useContext(EffectLayerContext);

  if (!context) {
    throw new Error(
      "useEffectLayer must be used within an EffectLayerProvider. " +
        "Make sure to wrap your application with <EffectLayerProvider>."
    );
  }

  return context;
}

// =============================================================================
// HOOK: useEffect (Custom - for registering effects)
// =============================================================================

interface UseEffectRegistrationOptions {
  /** Niveau z-index de la couche */
  layer: EffectLayerLevel | number;
  /** Composant a rendre comme effet */
  render: ReactNode;
  /** Si true, l'effet est affiche */
  isActive?: boolean;
  /** Priorite de rendu */
  priority?: number;
  /** Dependencies pour mettre a jour le rendu */
  deps?: unknown[];
}

/**
 * Hook pour enregistrer et gerer un effet visuel.
 *
 * Ce hook gere automatiquement:
 * - L'enregistrement de l'effet au montage
 * - La mise a jour de l'effet quand les dependances changent
 * - La desinscription de l'effet au demontage
 *
 * @param options - Configuration de l'effet
 * @returns Objet avec setActive pour controler la visibilite
 *
 * @example
 * ```tsx
 * function EyebrowBadge({ children }) {
 *   const [isHovered, setIsHovered] = useState(false);
 *   const [rect, setRect] = useState<DOMRect | null>(null);
 *
 *   useVisualEffect({
 *     layer: EFFECT_LAYERS.UNDER_GRID,
 *     isActive: isHovered,
 *     render: <GlowEffect rect={rect} />,
 *     deps: [rect],
 *   });
 *
 *   return (
 *     <div
 *       onMouseEnter={() => setIsHovered(true)}
 *       onMouseLeave={() => setIsHovered(false)}
 *     >
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 */
export function useVisualEffect({
  layer,
  render,
  isActive = false,
  priority = 0,
  deps = [],
}: UseEffectRegistrationOptions) {
  // Generer un ID unique et stable pour cet effet
  const effectId = useId();
  const { registerEffect, unregisterEffect, updateEffect, setEffectActive } =
    useEffectLayer();

  // Enregistrer l'effet au montage, le desinscrire au demontage
  useReactEffect(() => {
    registerEffect(effectId, {
      layer,
      render,
      isActive,
      priority,
    });

    return () => {
      unregisterEffect(effectId);
    };
  }, [
    effectId,
    layer,
    priority,
    registerEffect,
    unregisterEffect,
    render,
    isActive,
  ]);

  // Mettre a jour le rendu quand les dependances changent
  useReactEffect(() => {
    updateEffect(effectId, { render });
  }, [effectId, updateEffect, render, ...deps]);

  // Mettre a jour l'etat actif
  useReactEffect(() => {
    setEffectActive(effectId, isActive);
  }, [effectId, isActive, setEffectActive]);

  return {
    /** Changer la visibilite de l'effet */
    setActive: (active: boolean) => setEffectActive(effectId, active),
    /** ID unique de l'effet (pour debug) */
    effectId,
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export { EffectLayerContext };
