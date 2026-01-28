# Guide: Créer des Landing Pages

Ce guide explique comment créer et configurer des landing pages dynamiques pour ZetisLabs.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      LANDING PAGE                           │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 HERO SECTION (statique)               │  │
│  │         Toujours présente, configurée via i18n        │  │
│  └───────────────────────────────────────────────────────┘  │
│                              │                              │
│  ┌───────────────────────────▼───────────────────────────┐  │
│  │            SECTIONS DYNAMIQUES (configurables)        │  │
│  │                                                       │  │
│  │   Définies dans le tableau "sections" du fichier i18n │  │
│  │                                                       │  │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │   │ whatWeMake  │  │    stack    │  │  useCases   │   │  │
│  │   └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  │   ┌─────────────┐                                     │  │
│  │   │whyZetisLabs │  ... ou toute autre combinaison    │  │
│  │   └─────────────┘                                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                              │                              │
│  ┌───────────────────────────▼───────────────────────────┐  │
│  │                 CTA SECTION (statique)                │  │
│  │         Toujours présente, configurée via i18n        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Structure des fichiers

```
i18n/translations/
├── default/                     # Page principale du site
│   ├── en.json                  # Anglais
│   └── fr.json                  # Français
│
├── landing-pages/               # Variantes pour A/B testing
│   ├── A/                       # Variante A (anti-nocode)
│   │   ├── en.json
│   │   └── fr.json
│   ├── B/                       # Variante B (gain de temps)
│   │   ├── en.json
│   │   └── fr.json
│   ├── C/                       # Variante C (intégration)
│   │   ├── en.json
│   │   └── fr.json
│   ├── D/                       # Variante D (agents IA)
│   │   ├── en.json
│   │   └── fr.json
│   └── index.ts                 # Registry des variantes
│
└── README.md                    # Ce fichier
```

---

## Créer une nouvelle landing page

### Étape 1 : Créer le dossier

```bash
mkdir -p i18n/translations/landing-pages/E
```

### Étape 2 : Créer le fichier de traduction

Créez `en.json` (et `fr.json` avec le même contenu traduit).

#### Template complet

```json
{
  "variant": "E",
  "angle": "mon-angle-marketing",
  "target": "Description de l'audience cible",
  "hypothesis": "Hypothèse A/B à tester",
  "tone": ["professionnel", "empathique", "orienté-résultats"],

  "metadata": {
    "title": "ZetisLabs — Titre SEO de la page",
    "description": "Meta description pour les moteurs de recherche (150-160 caractères)",
    "keywords": ["mot-clé-1", "mot-clé-2", "mot-clé-3"]
  },

  "sections": [
    { "type": "whatWeMake", "id": "services" },
    { "type": "stack", "id": "integrations" },
    { "type": "useCases", "id": "cas-usage" },
    { "type": "whyZetisLabs", "id": "philosophie" }
  ],

  "hero": {
    "eyebrow": "Texte accrocheur au-dessus du titre",
    "title": {
      "default": "Première partie du titre ",
      "thin": "partie en font-weight normal ",
      "accent": "partie accentuée"
    },
    "subtitle": "Paragraphe de description sous le titre principal. Expliquez la proposition de valeur.",
    "cta": "Texte du bouton principal",
    "ctaSecondary": "Texte du bouton secondaire",
    "ctaSecondaryAriaLabel": "Label accessible pour le bouton secondaire"
  },

  "stack": {
    "title": "TITRE DE LA SECTION INTÉGRATIONS"
  },

  "whatWeMake": {
    "title": "Titre de la section services",
    "description": "Description générale de vos services.",
    "features": {
      "aiAgents": {
        "title": "Nom du service 1",
        "subtitle": "Sous-titre court.",
        "description": "Description détaillée du service.",
        "cta": "Action du service"
      },
      "processAutomation": {
        "title": "Nom du service 2",
        "subtitle": "Sous-titre court.",
        "description": "Description détaillée du service.",
        "cta": "Action du service"
      },
      "intelligentWorkflows": {
        "title": "Nom du service 3",
        "subtitle": "Sous-titre court.",
        "description": "Description détaillée du service.",
        "cta": "Action du service"
      }
    }
  },

  "useCases": {
    "title": "Titre de la section cas d'usage",
    "description": "Description générale.",
    "learnMore": "En savoir plus",
    "cases": {
      "mailWriter": {
        "title": "Nom du produit 1",
        "subtitle": "Type de produit",
        "description": "Description du produit.",
        "features": ["Fonctionnalité 1", "Fonctionnalité 2", "Fonctionnalité 3"]
      },
      "docGen": {
        "title": "Nom du produit 2",
        "subtitle": "Type de produit",
        "description": "Description du produit.",
        "features": ["Fonctionnalité 1", "Fonctionnalité 2", "Fonctionnalité 3"]
      }
    }
  },

  "whyZetisLabs": {
    "title": "Titre de la section philosophie",
    "description": "Description de votre approche.",
    "reasons": {
      "expertise": {
        "title": "Raison 1",
        "description": "Explication de la raison 1."
      },
      "scalability": {
        "title": "Raison 2",
        "description": "Explication de la raison 2."
      },
      "results": {
        "title": "Raison 3",
        "description": "Explication de la raison 3."
      }
    }
  },

  "cta": {
    "title": "Titre du call-to-action final",
    "description": "Description incitant à l'action.",
    "primary": "Texte bouton principal",
    "secondary": "Texte bouton secondaire",
    "primaryAriaLabel": "Label accessible bouton principal",
    "secondaryAriaLabel": "Label accessible bouton secondaire"
  }
}
```

### Étape 3 : Choisir les sections à afficher

Le tableau `sections` contrôle **quelles sections** s'affichent et dans **quel ordre**.

#### Types de sections disponibles

| Type           | Composant                | Description                    | Contenu requis         |
| -------------- | ------------------------ | ------------------------------ | ---------------------- |
| `whatWeMake`   | `WhatWeMakeSection`      | Grille de 3 cartes de services | `whatWeMake.features`  |
| `stack`        | `StackSectionWrapper`    | Logos des intégrations         | `stack.title`          |
| `useCases`     | `UseCasesSectionWrapper` | Carousel sticky scroll         | `useCases.cases`       |
| `whyZetisLabs` | `WhyZetisLabsSection`    | Grille de 3 raisons            | `whyZetisLabs.reasons` |

#### Exemples de configurations

**Landing minimaliste (conversion rapide) :**

```json
"sections": [
  { "type": "whatWeMake", "id": "services" }
]
```

**Landing avec preuve sociale :**

```json
"sections": [
  { "type": "whatWeMake", "id": "services" },
  { "type": "stack", "id": "integrations" },
  { "type": "whyZetisLabs", "id": "philosophie" }
]
```

**Landing complète :**

```json
"sections": [
  { "type": "whatWeMake", "id": "services" },
  { "type": "stack", "id": "integrations" },
  { "type": "useCases", "id": "cas-usage" },
  { "type": "whyZetisLabs", "id": "philosophie" }
]
```

### Étape 4 : Enregistrer la variante

Modifiez `landing-pages/index.ts` :

```typescript
// 1. Ajouter les imports
import variantEFr from "./E/fr.json";
import variantEEn from "./E/en.json";

// 2. Ajouter au type LandingVariant
export type LandingVariant = "A" | "B" | "C" | "D" | "E";

// 3. Ajouter à l'objet translations
const translations: Record<
  LandingVariant,
  Record<LandingLocale, LandingTranslation>
> = {
  A: { fr: variantAFr, en: variantAEn },
  B: { fr: variantBFr, en: variantBEn },
  C: { fr: variantCFr, en: variantCEn },
  D: { fr: variantDFr, en: variantDEn },
  E: { fr: variantEFr, en: variantEEn }, // <- Ajouter
};

// 4. Ajouter aux metadata (optionnel mais recommandé)
export function getVariantsMetadata() {
  return {
    // ... existants
    E: {
      angle: "mon-angle",
      target: {
        fr: "Cible en français",
        en: "Target audience in English",
      },
      recommended: {
        traffic: ["Google Ads", "LinkedIn"],
        default: false,
      },
    },
  };
}

// 5. Ajouter aux exports
export { variantEFr, variantEEn };
```

### Étape 5 : Tester

1. Lancer le serveur : `npm run dev`
2. Accéder à la landing (via la route configurée)
3. Vérifier les deux locales (EN et FR)
4. Vérifier la console pour les erreurs

---

## Ajouter une nouvelle section

Si vous avez besoin d'un nouveau type de section :

### 1. Créer le composant

```typescript
// lib/sections/components/MaNouvelleSectionSection.tsx
import { Reveal } from "@/lib/motion";
import type { SectionProps } from "../types";

export function MaNouvelleSectionSection({ t, dict }: SectionProps) {
  return (
    <section className="flex flex-col justify-center py-16 md:py-32">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("home.maNouvelleSectionSection.title")}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              {t("home.maNouvelleSectionSection.description")}
            </p>
          </Reveal>
        </div>
        {/* Votre contenu ici */}
      </div>
    </section>
  );
}
```

### 2. Exporter le composant

```typescript
// lib/sections/components/index.ts
export { MaNouvelleSectionSection } from "./MaNouvelleSectionSection";
```

### 3. Ajouter au type SectionType

```typescript
// lib/sections/types.ts
export type SectionType =
  | "whatWeMake"
  | "stack"
  | "useCases"
  | "whyZetisLabs"
  | "maNouvelleSectionSection"; // <- Ajouter
```

### 4. Enregistrer dans le registry

```typescript
// lib/sections/registry.ts
import { MaNouvelleSectionSection } from "./components";

export const sectionRegistry: Record<SectionType, SectionComponent> = {
  whatWeMake: WhatWeMakeSection,
  stack: StackSectionWrapper,
  useCases: UseCasesSectionWrapper,
  whyZetisLabs: WhyZetisLabsSection,
  maNouvelleSectionSection: MaNouvelleSectionSection, // <- Ajouter
};
```

### 5. Ajouter le contenu i18n

Dans vos fichiers JSON :

```json
{
  "home": {
    "maNouvelleSectionSection": {
      "title": "Titre de ma section",
      "description": "Description de ma section"
    }
  }
}
```

### 6. Utiliser dans une landing

```json
"sections": [
  { "type": "maNouvelleSectionSection", "id": "ma-section" }
]
```

---

## Utilisation dans le code

```typescript
import {
  getLandingTranslation,
  getVariantsMetadata,
} from "@/i18n/translations/landing-pages";

// Récupérer les traductions d'une variante
const content = getLandingTranslation("B", "fr");
console.log(content.hero.title.default);

// Récupérer les metadata de toutes les variantes
const metadata = getVariantsMetadata();
console.log(metadata.B.target.fr); // "Dirigeants PME, non-techniques"
```

---

## Checklist avant déploiement

- [ ] Les deux fichiers (en.json et fr.json) existent
- [ ] La structure est identique dans les deux fichiers
- [ ] Les `id` des sections sont uniques
- [ ] La variante est enregistrée dans `index.ts`
- [ ] Les metadata SEO sont renseignées
- [ ] Test sur les deux locales
- [ ] Pas d'erreurs dans la console

---

## Bonnes pratiques

1. **Nommage des variantes** : Utilisez des lettres (A, B, C...) pour les tests A/B, ou des noms descriptifs pour les pages permanentes

2. **Sections cohérentes** : Assurez-vous que le contenu requis par chaque section est présent dans le JSON

3. **Traductions synchronisées** : Modifiez toujours EN et FR en même temps

4. **IDs uniques** : Les `id` dans le tableau `sections` doivent être uniques pour le bon fonctionnement des animations

5. **Metadata SEO** : Renseignez toujours `title`, `description` et `keywords` pour le référencement

6. **Accessibilité** : N'oubliez pas les `ariaLabel` pour les boutons et liens
