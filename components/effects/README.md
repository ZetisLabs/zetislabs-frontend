# Effect Layer System

Systeme d'effets visuels par couches z-index pour Next.js/React.

## Vue d'ensemble

Ce systeme permet de rendre des effets visuels (glow, tooltips, highlights, etc.) a des niveaux z-index specifiques, independamment de la position de leurs composants declencheurs dans l'arbre DOM.

### Probleme resolu

Dans une architecture CSS typique avec des couches (grille de fond, contenu, overlays), les effets visuels doivent souvent etre rendus a un niveau z-index specifique. Par exemple, un effet de glow sur un badge doit apparaitre SOUS la grille CSS mais au-dessus du fond.

Sans ce systeme, on devrait:

1. Remonter l'etat du hover au composant parent
2. Rendre l'effet au niveau du parent
3. Gerer manuellement le positionnement

Avec ce systeme:

1. Le composant enregistre son effet via un hook
2. L'effet est automatiquement rendu au bon z-index
3. Le positionnement est gere automatiquement

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Root Layout                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  EffectLayerProvider                       │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │              EffectLayerRenderer                      │ │  │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐                 │ │  │
│  │  │  │ z-[1]   │ │ z-[3]   │ │ z-[10]  │ ...             │ │  │
│  │  │  │ effects │ │ effects │ │ effects │                 │ │  │
│  │  │  └─────────┘ └─────────┘ └─────────┘                 │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │                    Page Content                       │ │  │
│  │  │     Component A ──(useVisualEffect)──> Layer z-[3]   │ │  │
│  │  │     Component B ──(useVisualEffect)──> Layer z-[10]  │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Installation

Le systeme est deja integre. Pour l'utiliser:

### 1. Ajouter le Provider au layout

```tsx
// app/[locale]/layout.tsx
import { EffectProvider } from "@/components/providers";

export default async function LocaleLayout({ children }) {
  return (
    <EffectProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </EffectProvider>
  );
}
```

### 2. Utiliser dans vos composants

```tsx
import {
  useVisualEffect,
  EFFECT_LAYERS,
  GlowEffect,
} from "@/components/effects";

function MyComponent() {
  const [isHovered, setIsHovered] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useVisualEffect({
    layer: EFFECT_LAYERS.UNDER_GRID,
    isActive: isHovered,
    render: <GlowEffect position={rect} />,
    deps: [rect],
  });

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        setIsHovered(true);
        setRect(ref.current?.getBoundingClientRect() ?? null);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      Content
    </div>
  );
}
```

## API Reference

### EFFECT_LAYERS

Constantes predefinies pour les couches z-index:

| Constante      | Valeur | Usage                         |
| -------------- | ------ | ----------------------------- |
| `BACKGROUND`   | 1      | Effets de fond                |
| `UNDER_GRID`   | 3      | Effets sous la grille CSS     |
| `ABOVE_GRID`   | 6      | Effets au-dessus de la grille |
| `CONTENT`      | 10     | Effets au niveau du contenu   |
| `OVERLAY`      | 20     | Tooltips, dropdowns           |
| `MODAL`        | 30     | Modales                       |
| `NOTIFICATION` | 40     | Toasts, notifications         |

### useVisualEffect(options)

Hook principal pour enregistrer un effet.

```tsx
useVisualEffect({
  // Couche z-index (requis)
  layer: EFFECT_LAYERS.UNDER_GRID,

  // Composant React a rendre (requis)
  render: <GlowEffect position={rect} />,

  // Si true, l'effet est visible (default: false)
  isActive: isHovered,

  // Priorite de rendu dans la couche (default: 0)
  priority: 0,

  // Dependencies pour re-render (default: [])
  deps: [rect],
});
```

### useElementEffect(options)

Hook tout-en-un avec gestion automatique du positionnement.

```tsx
const { ref, triggerProps, isActive, setActive } =
  useElementEffect<HTMLButtonElement>({
    layer: EFFECT_LAYERS.UNDER_GRID,
    effectType: "glow", // Type d'effet
    color: "accent", // Couleur
    padding: 13, // Padding autour de l'element
    trigger: "hover", // "hover" | "focus" | "active" | "manual"
    intensity: 1, // Multiplicateur d'intensite
    trackOnScroll: true, // Mettre a jour sur scroll
    onActiveChange: (active) => {}, // Callback
  });

return (
  <button ref={ref} {...triggerProps}>
    Click me
  </button>
);
```

### GlowEffect

Composant d'effet de lueur radiale.

```tsx
<GlowEffect
  position={rect} // DOMRect ou {x, y, width?, height?}
  color="accent" // Preset ou {rgb: "r,g,b", maxOpacity: 0.15}
  size={100} // Rayon en pixels
  padding={13} // Padding autour de la position
  shape="ellipse" // "circle" | "ellipse"
  aspectRatio={{ x: 80, y: 120 }} // Ratio pour ellipse
  intensity={1} // Multiplicateur d'opacite
  animated={true} // Animation d'entree/sortie
  animationDuration={300} // Duree en ms
/>
```

#### Presets de couleur

- `accent` - Bleu accent (#3a7bd5)
- `success` - Vert (#22c55e)
- `warning` - Jaune (#eab308)
- `error` - Rouge (#ef4444)
- `neutral` - Gris (#646464)

## Ajouter un nouvel effet

### Checklist

1. [ ] Creer le composant d'effet dans `components/effects/presets/`
2. [ ] Exporter depuis `components/effects/presets/index.ts`
3. [ ] Exporter depuis `components/effects/index.ts`
4. [ ] Documenter les props et l'usage
5. [ ] Ajouter un exemple dans cette documentation

### Exemple: Creer un HighlightEffect

```tsx
// components/effects/presets/HighlightEffect.tsx
"use client";

import { useMemo } from "react";

export interface HighlightEffectProps {
  position: DOMRect | null;
  color?: string;
  borderRadius?: number;
}

export function HighlightEffect({
  position,
  color = "rgba(58, 123, 213, 0.1)",
  borderRadius = 8,
}: HighlightEffectProps) {
  if (!position) return null;

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height,
        backgroundColor: color,
        borderRadius,
        transition: "all 200ms ease-out",
      }}
    />
  );
}
```

## Exemples d'usage

### EyebrowBadge avec glow

```tsx
function EyebrowBadge({ children }) {
  const { ref, triggerProps } = useElementEffect<HTMLDivElement>({
    layer: EFFECT_LAYERS.UNDER_GRID,
    trigger: "hover",
    color: "accent",
    padding: 13,
  });

  return (
    <div ref={ref} {...triggerProps} className="inline-flex">
      <span className="badge">{children}</span>
    </div>
  );
}
```

### Tooltip avec effet

```tsx
function TooltipTrigger({ children, tooltip }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useRef<HTMLButtonElement>(null);

  useVisualEffect({
    layer: EFFECT_LAYERS.OVERLAY,
    isActive: isOpen,
    render: (
      <div
        className="absolute rounded bg-gray-900 px-2 py-1 text-white"
        style={{
          top: rect ? rect.bottom + 8 : 0,
          left: rect ? rect.left + rect.width / 2 : 0,
          transform: "translateX(-50%)",
        }}
      >
        {tooltip}
      </div>
    ),
    deps: [rect, tooltip],
  });

  return (
    <button
      ref={ref}
      onMouseEnter={() => {
        setIsOpen(true);
        setRect(ref.current?.getBoundingClientRect() ?? null);
      }}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
    </button>
  );
}
```

### Carte avec glow au focus

```tsx
function FocusableCard({ children }) {
  const { ref, triggerProps } = useElementEffect<HTMLDivElement>({
    layer: EFFECT_LAYERS.UNDER_GRID,
    trigger: "focus",
    effectType: "glow",
    color: "accent",
    padding: 20,
    intensity: 0.8,
  });

  return (
    <div ref={ref} {...triggerProps} tabIndex={0} className="card">
      {children}
    </div>
  );
}
```

## Bonnes pratiques

1. **Utiliser les constantes EFFECT_LAYERS** - Eviter les valeurs magiques
2. **Toujours fournir `deps`** - Pour que l'effet se mette a jour correctement
3. **Preferer `useElementEffect`** - Pour les cas simples avec tracking automatique
4. **Limiter le nombre d'effets actifs** - Pour les performances
5. **Utiliser `trackOnScroll: false`** - Si l'element ne bouge pas

## Performance

- Les effets inactifs ne sont pas rendus
- Les couches vides ne creent pas de DOM
- Le groupement par couche minimise les re-renders
- Utiliser `useMemo` pour les configurations complexes
