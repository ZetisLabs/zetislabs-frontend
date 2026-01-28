# ZetisLabs Front-End - Task List

> **Last Updated:** 2026-01-28
> **Analyzed with:** Chrome DevTools Performance Trace + Codebase Exploration

---

## Worktree System

Les tâches sont groupées par **Worktree** pour permettre un travail parallèle efficace.
Chaque worktree représente un ensemble de tâches liées qui doivent être travaillées ensemble.

| Worktree ID | Nom            | Description                                     | Branches dépendantes         |
| ----------- | -------------- | ----------------------------------------------- | ---------------------------- |
| `WT-PERF`   | Performance    | Optimisations de performance et Core Web Vitals | -                            |
| `WT-SEO`    | SEO & Meta     | SEO, meta tags, structured data                 | -                            |
| `WT-A11Y`   | Accessibilité  | ARIA, alt text, navigation clavier              | -                            |
| `WT-UI`     | UI Polish      | Améliorations visuelles et responsive           | -                            |
| `WT-UX`     | UX States      | Loading, error, empty states                    | -                            |
| `WT-CODE`   | Code Quality   | Refactoring, types, constants                   | `WT-PERF` (partage fichiers) |
| `WT-SEC`    | Security       | CSP, headers, vulnérabilités                    | -                            |
| `WT-LINKS`  | Links & Routes | Liens placeholder, navigation                   | `WT-SEO` (impact sitemap)    |

### Commandes Worktree

```bash
# Créer un nouveau worktree
git worktree add ../front-end-perf feature/performance-optimizations

# Lister les worktrees
git worktree list

# Supprimer un worktree
git worktree remove ../front-end-perf
```

---

## PERFORMANCE

### Critique (P0) - Worktree: `WT-PERF`

#### PERF-001: Forced Reflow dans useScrollDirection (93ms)

- **Impact:** Layout thrashing causant 93ms de reflow forcé
- **Fichier:** Hook `useScrollDirection` (détecté via Chrome DevTools)
- **Source:** Lecture de propriétés de layout dans scroll listener
- **Solution:**
  - Utiliser `requestAnimationFrame` pour différer les lectures
  - Cacher les valeurs de layout au lieu de les relire
  - Considérer `IntersectionObserver` au lieu de scroll events
- **Lié à:** PERF-002, PERF-003

#### PERF-002: Multiple RAF Loops parallèles

- **Impact:** Performance dégradée sur appareils bas de gamme
- **Fichiers:**
  - `components/ui/Reveal.tsx:43,177`
  - `components/StackSection.tsx:119,140`
  - `components/UseCasesSection.tsx:86-95`
- **Solution:** Consolider en un seul provider de scroll global
- **Lié à:** PERF-001, PERF-003

#### PERF-003: getBoundingClientRect() dans scroll handlers

- **Impact:** Reflow forcé sur chaque frame de scroll
- **Fichiers:**
  - `components/StackSection.tsx:88`
  - `components/ui/Reveal.tsx:138`
  - `components/UseCasesSection.tsx:64`
- **Solution:** Utiliser IntersectionObserver pour la détection de visibilité
- **Lié à:** PERF-001, PERF-002

### Haute (P1) - Worktree: `WT-PERF`

#### PERF-004: LCP Render Delay (305ms / 70.9% du LCP)

- **Impact:** LCP actuel 430ms, delay de rendu = 305ms
- **Élément LCP:** Logo `/zetis-light-nbg-logo-v2.svg`
- **Problème:** Priority "Low" sur l'image LCP
- **Solution:**
  ```tsx
  // Dans le header/layout
  <Image src="/zetis-light-nbg-logo-v2.svg" priority />
  // Ou preload
  <link rel="preload" href="/zetis-light-nbg-logo-v2.svg" as="image" />
  ```
- **Worktree indépendant possible:** Oui

#### PERF-005: Bundle Three.js (400KB+)

- **Impact:** Temps de chargement initial élevé
- **Fichier:** `package.json:15-21`
- **Solution:**
  - Lazy-load le background WebGL
  - Fournir un fallback pour mobile
  - Considérer `next/dynamic` avec `ssr: false`
- **Lié à:** PERF-007

#### PERF-006: Style Recalculation (92ms, 314 éléments)

- **Impact:** Recalcul de styles coûteux
- **Source:** Chrome DevTools Performance Trace
- **Solution:**
  - Réduire la complexité CSS sur éléments animés
  - Utiliser `will-change` avec parcimonie
  - Éviter les changements de style globaux

### Moyenne (P2) - Worktree: `WT-PERF`

#### PERF-007: WebGLCanvas Reflow (2ms)

- **Impact:** Minor mais récurrent
- **Fichier:** `components/webgl/WebGLBackground.tsx`
- **Fonction:** `WebGLCanvas.updateDimensions`
- **Solution:** Debounce les handlers de resize

#### PERF-008: Images StackSection sans lazy loading

- **Impact:** 11 SVG chargés immédiatement
- **Fichier:** `components/StackSection.tsx:273-279`
- **Solution:** Ajouter `loading="lazy"` aux Images

#### PERF-009: Fonts - 12 fichiers chargés

- **Impact:** ~500KB+ de polices
- **Fichier:** `app/layout.tsx:22-87`
- **Solution:**
  - Limiter aux weights utilisés (400, 500, 600, 700)
  - Supprimer les italiques si non utilisés
  - Considérer une variable font

---

## SEO

### Critique (P0) - Worktree: `WT-SEO`

#### SEO-001: Missing OpenGraph & Twitter Cards

- **Impact:** Mauvais aperçu lors du partage social
- **Fichier:** `app/[locale]/layout.tsx:15-26`
- **Manquant:**
  - `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
  - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
  - `canonical` URL
- **Solution:**
  ```tsx
  export const metadata: Metadata = {
    // ... existing
    openGraph: {
      title: "...",
      description: "...",
      url: "https://zetislabs.com",
      siteName: "ZetisLabs",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      // ...
    },
  };
  ```
- **Lié à:** SEO-002

#### SEO-002: Missing sitemap.xml & robots.txt

- **Impact:** Indexation inefficace par les moteurs de recherche
- **Solution:**
  - Créer `app/sitemap.ts` (Next.js 13+ format)
  - Créer `app/robots.ts`
- **Lié à:** SEO-001

#### SEO-003: Missing JSON-LD Structured Data

- **Impact:** Pas de rich snippets, compréhension limitée par Google
- **Fichiers:** Tous les fichiers de page
- **Solution:** Ajouter schema Organization, LocalBusiness, FAQPage
  ```tsx
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ZetisLabs",
      // ...
    })}
  </script>
  ```

### Haute (P1) - Worktree: `WT-LINKS` (dépend de `WT-SEO`)

#### SEO-004: Liens placeholder (#)

- **Impact:** Liens cassés, mauvaise UX, pénalité SEO
- **Fichiers:**
  - `app/[locale]/page.tsx:231,256`
  - `components/HeroSection.tsx:54`
  - `components/UseCasesSection.tsx:320,492`
  - `components/layout/Footer.tsx:27,30,33`
- **À remplacer:**
  - CTAs hero → page contact ou calendly
  - Privacy/Terms → pages légales
  - Contact → page contact

---

## ACCESSIBILITÉ

### Haute (P1) - Worktree: `WT-A11Y`

#### A11Y-001: Missing ARIA sur FeatureCard CTA

- **Impact:** Lecteurs d'écran ne comprennent pas l'interaction
- **Fichier:** `components/FeatureCard.tsx:35-60`
- **Solution:** Ajouter `aria-label` sur le bouton animé

#### A11Y-002: Vérifier alt text cohérent

- **Fichiers:**
  - `components/StackSection.tsx` - OK mais optimisation manquante
  - `components/ProjectShowcase.tsx:78-87` - OK
  - `components/UseCasesSection.tsx` - Inconsistant
- **Solution:** Audit et standardisation des alt texts

### Moyenne (P2) - Worktree: `WT-A11Y`

#### A11Y-003: Missing prefers-reduced-motion

- **Impact:** Utilisateurs sensibles au mouvement
- **Fichiers:**
  - `components/webgl/WebGLBackground.tsx`
  - `components/UseCasesSection.tsx:598-626`
- **Solution:**
  ```tsx
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return null; // ou animation simplifiée
  ```

---

## UI

### Moyenne (P2) - Worktree: `WT-UI`

#### UI-001: Responsive gaps (breakpoints intermédiaires)

- **Impact:** Layout cassé sur certaines tailles d'écran
- **Fichier:** `components/StackSection.tsx:208`
- **Problème:** `h-[500px] sm:h-[600px] lg:h-[700px]` - manque `md:`
- **Solution:** Utiliser tous les breakpoints (sm, md, lg, xl, 2xl)

#### UI-002: Styles inline mélangés avec Tailwind

- **Impact:** Maintenabilité réduite
- **Fichiers:**
  - `components/StackSection.tsx:249-257`
  - `components/UseCasesSection.tsx:258-263,422-426`
- **Solution:** Créer des utilities Tailwind ou CSS modules

### Basse (P3) - Worktree: `WT-UI`

#### UI-003: Effets glow potentiellement cachés

- **Fichier:** `components/layout/Header.tsx:22-39`
- **Problème:** Commentaire "masqué par la grille"
- **Action:** Vérifier si les effets sont visibles ou à supprimer

---

## UX

### Haute (P1) - Worktree: `WT-UX`

#### UX-001: Missing Loading States

- **Impact:** Écran blanc pendant le chargement
- **Fichiers:**
  - `components/UseCasesSection.tsx:551-565` - Hydration OK, mais pas de skeleton
  - `components/webgl/WebGLBackground.tsx:235-244` - Fallback color seulement
- **Solution:**
  - Créer `app/[locale]/loading.tsx`
  - Ajouter skeleton loaders pour sections lourdes

#### UX-002: Error Boundaries manquantes

- **Impact:** Crash de toute la page si erreur
- **Fichier:** `app/[locale]/page.tsx`
- **Sections non protégées:**
  - HeroSection
  - FeatureCard grid
  - ReasonCard grid
- **Solution:** Wrapper avec `<ErrorBoundary>`

### Moyenne (P2) - Worktree: `WT-UX`

#### UX-003: Missing 404 Page

- **Impact:** Page 404 par défaut peu engageante
- **Solution:** Créer `app/not-found.tsx` personnalisé

---

## CODE QUALITY

### Moyenne (P2) - Worktree: `WT-CODE`

#### CODE-001: Magic Numbers partout

- **Impact:** Code difficile à maintenir
- **Fichiers:**
  - `components/StackSection.tsx` - Depth (0.3-1.0), distances (150), sizes (20-55)
  - `components/UseCasesSection.tsx` - Seuils d'animation
  - `components/ui/Reveal.tsx` - Safe zones (0.16, 0.85)
- **Solution:** Extraire vers `constants/animation.ts`

#### CODE-002: Constantes dupliquées

- **Impact:** Incohérence potentielle
- **Fichiers:**
  - `components/StackSection.tsx:57-58` - `HYSTERESIS_MS = 120`, `SCROLL_IDLE_MS = 150`
  - `components/ui/Reveal.tsx:102-103` - Mêmes valeurs
- **Solution:** Créer `constants/scroll.ts` partagé

#### CODE-003: Commentaires FR/EN mélangés

- **Impact:** Documentation incohérente
- **Fichiers:**
  - `components/HeroSection.tsx:31`
  - `components/layout/Header.tsx:22-39`
  - `components/ui/EyebrowBadge.tsx:25-31`
- **Solution:** Standardiser en anglais

### Basse (P3) - Worktree: `WT-CODE`

#### CODE-004: Types non exportés

- **Fichiers:**
  - `components/FeatureCard.tsx:1-6`
  - `components/ReasonCard.tsx:1-5`
- **Solution:** Exporter les types pour réutilisation

#### CODE-005: Error Handling incohérent

- **Fichiers:**
  - `app/[locale]/error.tsx:11-15`
  - `lib/i18n.ts:50-54`
  - `components/ui/ErrorBoundary.tsx:27`
- **Solution:** Intégrer Sentry ou LogRocket pour production

---

## SECURITY

### Haute (P1) - Worktree: `WT-SEC`

#### SEC-001: CSP trop permissive

- **Impact:** Vulnérable aux attaques XSS
- **Fichier:** `next.config.ts:33-42`
- **Problème:**
  ```
  script-src 'self' 'unsafe-inline' 'unsafe-eval'
  style-src 'self' 'unsafe-inline'
  ```
- **Solution:** Utiliser nonce-based CSP
  ```ts
  // Générer nonce par requête
  // Injecter dans les scripts/styles
  ```

---

## BUILD & CONFIG

### Moyenne (P2) - Worktree: Peut être indépendant

#### BUILD-001: Version Next.js Canary

- **Impact:** Instabilité potentielle en production
- **Fichier:** `package.json:17`
- **Actuel:** `"next": "^16.1.0-canary.19"`
- **Solution:** Migrer vers version stable quand disponible

#### BUILD-002: Missing .env.example

- **Impact:** Onboarding développeurs difficile
- **Solution:** Créer `.env.example` avec les variables nécessaires

---

## ANALYTICS & MONITORING

### Moyenne (P2) - Worktree: Peut être indépendant

#### ANALYTICS-001: Pas d'analytics configuré

- **Impact:** Pas de données sur le comportement utilisateur
- **Solution:** Intégrer Google Analytics 4 ou Plausible

#### ANALYTICS-002: Pas de monitoring Core Web Vitals

- **Impact:** Pas de visibilité sur performance réelle
- **Solution:** Intégrer `web-vitals` library
  ```tsx
  import { onCLS, onFID, onLCP } from "web-vitals";
  ```

---

## Résumé par Priorité

| Priorité          | Count | Catégories principales                                              |
| ----------------- | ----- | ------------------------------------------------------------------- |
| **P0 (Critique)** | 5     | Performance (3), SEO (2)                                            |
| **P1 (Haute)**    | 10    | Performance (2), SEO (1), A11Y (2), UX (2), Security (1), Links (2) |
| **P2 (Moyenne)**  | 12    | Performance (3), UI (2), UX (1), Code (3), Build (2), Analytics (2) |
| **P3 (Basse)**    | 3     | UI (1), Code (2)                                                    |

---

## Plan d'exécution suggéré

### Sprint 1: Fondations (WT-PERF + WT-SEO)

1. PERF-001, PERF-002, PERF-003 (consolider scroll handling)
2. SEO-001, SEO-002 (meta tags + sitemap)
3. PERF-004 (LCP priority)

### Sprint 2: Qualité (WT-A11Y + WT-UX)

1. A11Y-001, A11Y-002 (ARIA + alt text)
2. UX-001, UX-002 (loading + error states)
3. UX-003 (404 page)

### Sprint 3: Polish (WT-UI + WT-CODE)

1. CODE-001, CODE-002 (constants extraction)
2. UI-001, UI-002 (responsive + styles)
3. SEC-001 (CSP)

### Sprint 4: Infrastructure (Independent)

1. SEO-003 (JSON-LD)
2. ANALYTICS-001, ANALYTICS-002
3. BUILD-001 (upgrade Next.js)
4. SEO-004 / LINKS (remplacer #)

---

## Notes

- Les tâches marquées "Lié à" doivent être travaillées dans le même worktree
- `WT-CODE` partage des fichiers avec `WT-PERF`, coordonner les merges
- `WT-LINKS` dépend de `WT-SEO` pour le sitemap
- Les tâches "Worktree indépendant possible" peuvent être isolées si besoin
