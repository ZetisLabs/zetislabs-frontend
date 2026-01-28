# Translations & Landing Pages

Ce dossier contient toutes les traductions du site, organisées par landing page.

## Structure

```
translations/
├── default/                 # Page principale (homepage)
│   ├── en.json
│   └── fr.json
├── landing-pages/           # Variantes de landing pages (A/B testing)
│   ├── A/
│   │   ├── en.json
│   │   └── fr.json
│   ├── B/
│   │   ├── en.json
│   │   └── fr.json
│   ├── C/
│   │   └── ...
│   └── index.ts             # Exports et helpers
└── README.md
```

## Ajouter une nouvelle landing page

### 1. Créer le dossier

Créez un nouveau dossier avec un identifiant unique (lettre ou nom descriptif) :

```bash
mkdir -p i18n/translations/landing-pages/E
```

### 2. Créer les fichiers de traduction

Créez `en.json` et `fr.json` dans le dossier. Structure minimale requise :

```json
{
  "variant": "E",
  "angle": "nom-de-l-angle",
  "target": "Description de la cible",
  "hypothesis": "Hypothèse à tester",
  "tone": ["ton1", "ton2"],
  "metadata": {
    "title": "Titre SEO",
    "description": "Meta description",
    "keywords": ["mot-clé1", "mot-clé2"]
  },
  "sections": [
    { "type": "whatWeMake", "id": "what-we-make" },
    { "type": "stack", "id": "stack-integration" }
  ],
  "hero": {
    "eyebrow": "Texte eyebrow",
    "title": {
      "default": "Titre principal ",
      "thin": "suite légère ",
      "accent": "accent"
    },
    "subtitle": "Sous-titre descriptif",
    "cta": "Texte CTA primaire",
    "ctaSecondary": "Texte CTA secondaire",
    "ctaSecondaryAriaLabel": "Label accessible"
  },
  "cta": {
    "title": "Titre CTA final",
    "description": "Description",
    "primary": "Bouton primaire",
    "primaryAriaLabel": "Label accessible"
  }
}
```

### 3. Configurer les sections dynamiques

Le tableau `sections` définit quelles sections s'affichent et dans quel ordre.

**Types de sections disponibles :**

| Type           | Description                            |
| -------------- | -------------------------------------- |
| `whatWeMake`   | Grille de 3 FeatureCards (services)    |
| `stack`        | Constellation de logos d'intégrations  |
| `useCases`     | Section sticky scroll avec cas d'usage |
| `whyZetisLabs` | Grille de 3 ReasonCards (philosophie)  |

**Exemple - Landing minimaliste :**

```json
"sections": [
  { "type": "whatWeMake", "id": "services" }
]
```

**Exemple - Landing complète :**

```json
"sections": [
  { "type": "whatWeMake", "id": "what-we-make" },
  { "type": "stack", "id": "stack-integration" },
  { "type": "useCases", "id": "use-cases" },
  { "type": "whyZetisLabs", "id": "why-zetislabs" }
]
```

### 4. Enregistrer la variante dans l'index

Modifiez `landing-pages/index.ts` :

```typescript
// Ajouter les imports
import variantEFr from "./E/fr.json";
import variantEEn from "./E/en.json";

// Ajouter au type
export type LandingVariant = "A" | "B" | "C" | "D" | "E";

// Ajouter aux translations
const translations: Record<
  LandingVariant,
  Record<LandingLocale, LandingTranslation>
> = {
  // ...existants
  E: { fr: variantEFr, en: variantEEn },
};

// Ajouter aux metadata
export function getVariantsMetadata() {
  return {
    // ...existants
    E: {
      angle: "nom-de-l-angle",
      target: {
        fr: "Cible en français",
        en: "Target in English",
      },
      recommended: {
        traffic: ["source1", "source2"],
      },
    },
  };
}

// Ajouter aux exports
export { variantEFr, variantEEn };
```

## Ajouter une nouvelle section à la librairie

Si vous avez besoin d'un nouveau type de section :

### 1. Créer le composant

```typescript
// lib/sections/components/MaSectionNom.tsx
import type { SectionProps } from "../types";

export function MaSectionNom({ t, dict }: SectionProps) {
  return (
    <section className="...">
      {/* Contenu */}
    </section>
  );
}
```

### 2. Exporter le composant

```typescript
// lib/sections/components/index.ts
export { MaSectionNom } from "./MaSectionNom";
```

### 3. Ajouter au type

```typescript
// lib/sections/types.ts
export type SectionType =
  | "whatWeMake"
  | "stack"
  | "useCases"
  | "whyZetisLabs"
  | "maSectionNom"; // <- Ajouter
```

### 4. Enregistrer dans le registry

```typescript
// lib/sections/registry.ts
import { MaSectionNom } from "./components";

export const sectionRegistry: Record<SectionType, SectionComponent> = {
  // ...existants
  maSectionNom: MaSectionNom,
};
```

### 5. Utiliser dans une landing

```json
"sections": [
  { "type": "maSectionNom", "id": "ma-section" }
]
```

## Utilisation dans le code

```typescript
import { getLandingTranslation } from "@/i18n/translations/landing-pages";

// Récupérer les traductions d'une variante
const content = getLandingTranslation("A", "fr");
console.log(content.hero.title.default);

// Récupérer les metadata
import { getVariantsMetadata } from "@/i18n/translations/landing-pages";
const metadata = getVariantsMetadata();
console.log(metadata.A.target.fr);
```

## Bonnes pratiques

1. **Toujours créer les deux fichiers** (en.json et fr.json)
2. **Garder la même structure** entre les locales
3. **Utiliser des IDs uniques** pour les sections
4. **Tester les deux locales** après modifications
5. **Documenter l'angle et la cible** dans les metadata
