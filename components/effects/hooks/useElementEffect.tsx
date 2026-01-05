"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type RefObject,
} from "react";
import { useVisualEffect, type EffectLayerLevel } from "../EffectLayerProvider";
import {
  GlowEffect,
  type GlowColorPreset,
  type GlowColorConfig,
} from "../presets";

// =============================================================================
// TYPES
// =============================================================================

interface UseElementEffectOptions {
  /**
   * Couche z-index pour l'effet.
   */
  layer: EffectLayerLevel | number;

  /**
   * Type d'effet a rendre.
   * @default "glow"
   */
  effectType?: "glow";

  /**
   * Couleur de l'effet.
   * @default "accent"
   */
  color?: GlowColorPreset | GlowColorConfig;

  /**
   * Padding autour de l'element.
   * @default 13
   */
  padding?: number;

  /**
   * Declencheur de l'effet.
   * @default "hover"
   */
  trigger?: "hover" | "focus" | "active" | "manual";

  /**
   * Etat actif (uniquement pour trigger="manual").
   */
  isActive?: boolean;

  /**
   * Intensite de l'effet.
   * @default 1
   */
  intensity?: number;

  /**
   * Mettre a jour la position sur scroll.
   * @default true
   */
  trackOnScroll?: boolean;

  /**
   * Callback appele quand l'etat actif change.
   */
  onActiveChange?: (isActive: boolean) => void;
}

interface UseElementEffectReturn<T extends HTMLElement> {
  /**
   * Ref a attacher a l'element declencheur.
   */
  ref: RefObject<T | null>;

  /**
   * Props a spreader sur l'element pour les triggers automatiques.
   */
  triggerProps: {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
  };

  /**
   * Etat actif actuel.
   */
  isActive: boolean;

  /**
   * Activer/desactiver l'effet manuellement.
   */
  setActive: (active: boolean) => void;
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * useElementEffect
 *
 * Hook tout-en-un pour attacher un effet visuel a un element DOM.
 * Gere automatiquement le tracking de position et les declencheurs.
 *
 * @example
 * ```tsx
 * function MyButton({ children }) {
 *   const { ref, triggerProps } = useElementEffect<HTMLButtonElement>({
 *     layer: EFFECT_LAYERS.UNDER_GRID,
 *     trigger: "hover",
 *     color: "accent",
 *   });
 *
 *   return (
 *     <button ref={ref} {...triggerProps}>
 *       {children}
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Controle manuel
 * function ControlledEffect() {
 *   const [showEffect, setShowEffect] = useState(false);
 *   const { ref } = useElementEffect<HTMLDivElement>({
 *     layer: EFFECT_LAYERS.ABOVE_GRID,
 *     trigger: "manual",
 *     isActive: showEffect,
 *   });
 *
 *   return (
 *     <div ref={ref}>
 *       <button onClick={() => setShowEffect(!showEffect)}>
 *         Toggle Effect
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useElementEffect<T extends HTMLElement = HTMLDivElement>({
  layer,
  effectType = "glow",
  color = "accent",
  padding = 13,
  trigger = "hover",
  isActive: externalIsActive,
  intensity = 1,
  trackOnScroll = true,
  onActiveChange,
}: UseElementEffectOptions): UseElementEffectReturn<T> {
  const ref = useRef<T | null>(null);
  const [internalIsActive, setInternalIsActive] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  // Determiner l'etat actif selon le mode
  const isActive =
    trigger === "manual" ? (externalIsActive ?? false) : internalIsActive;

  // Mettre a jour la position de l'element
  const updateRect = useCallback(() => {
    if (ref.current && isActive) {
      setRect(ref.current.getBoundingClientRect());
    } else {
      setRect(null);
    }
  }, [isActive]);

  // Gerer le changement d'etat actif
  const handleActiveChange = useCallback(
    (active: boolean) => {
      setInternalIsActive(active);
      onActiveChange?.(active);
    },
    [onActiveChange]
  );

  // Setter manuel
  const setActive = useCallback(
    (active: boolean) => {
      handleActiveChange(active);
    },
    [handleActiveChange]
  );

  // Observer les changements de position - OPTIMIZED
  useEffect(() => {
    if (!isActive) return;

    let rafId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;
    let scrollRafPending = false;

    const captureRect = () => {
      // Single RAF is sufficient
      rafId = requestAnimationFrame(() => {
        updateRect();
        rafId = null;
      });
    };

    // Simple delay for animation settling (avoid expensive getComputedStyle walk)
    // Most CSS animations are < 500ms
    const element = ref.current;
    if (element) {
      // Check only direct element for animation (simplified)
      const computedStyle = getComputedStyle(element);
      const animationDuration =
        parseFloat(computedStyle.animationDuration) * 1000;

      if (animationDuration > 0) {
        timeoutId = setTimeout(captureRect, animationDuration + 50);
      } else {
        captureRect();
      }
    }

    if (trackOnScroll) {
      // RAF-throttled scroll handler - only one update per frame
      const handleScrollThrottled = () => {
        if (scrollRafPending) return;
        scrollRafPending = true;
        requestAnimationFrame(() => {
          updateRect();
          scrollRafPending = false;
        });
      };

      window.addEventListener("scroll", handleScrollThrottled, {
        passive: true,
      });
      window.addEventListener("resize", handleScrollThrottled, {
        passive: true,
      });

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        clearTimeout(timeoutId);
        window.removeEventListener("scroll", handleScrollThrottled);
        window.removeEventListener("resize", handleScrollThrottled);
      };
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [isActive, updateRect, trackOnScroll]);

  // Rendre le composant d'effet
  const renderEffect = () => {
    if (effectType === "glow") {
      return (
        <GlowEffect
          position={rect}
          color={color}
          padding={padding}
          intensity={intensity}
        />
      );
    }
    return null;
  };

  // Enregistrer l'effet dans le systeme de couches
  useVisualEffect({
    layer,
    isActive: isActive && rect !== null,
    render: renderEffect(),
    deps: [rect, color, padding, intensity],
  });

  // Construire les props de declenchement selon le mode
  const triggerProps = (() => {
    switch (trigger) {
      case "hover":
        return {
          onMouseEnter: () => handleActiveChange(true),
          onMouseLeave: () => handleActiveChange(false),
        };
      case "focus":
        return {
          onFocus: () => handleActiveChange(true),
          onBlur: () => handleActiveChange(false),
        };
      case "active":
        return {
          onMouseDown: () => handleActiveChange(true),
          onMouseUp: () => handleActiveChange(false),
          onMouseLeave: () => handleActiveChange(false),
        };
      case "manual":
      default:
        return {};
    }
  })();

  return {
    ref,
    triggerProps,
    isActive,
    setActive,
  };
}
