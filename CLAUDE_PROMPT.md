# Mission : Mobile Rework Complet - ZetisLabs

## Issue GitHub
Tu travailles sur l'issue #13 : https://github.com/ZetisLabs/zetislabs-frontend/issues/13
Consulte-la avec `gh issue view 13` pour voir les détails et la checklist.

## Contexte
Le site actuel est optimisé desktop, tu dois créer une expérience mobile dédiée et cohérente.

## Ressources disponibles
- `MOBILE_BENCHMARK.md` : Analyse des 10 meilleures landing pages mobiles (Stripe, Vercel, Linear, etc.) avec patterns et recommandations. LIS-LE EN PREMIER.
- Design system existant : couleurs et fonts déjà définies (GeneralSans + IBMPlexSans)

---

## Étapes à suivre (dans l'ordre)

### Phase 1 : Audit Initial (30min max)
1. Lis `MOBILE_BENCHMARK.md` pour comprendre les patterns à appliquer
2. Explore la structure du projet (package.json, src/, components/)
3. Lance un audit Lighthouse mobile AVANT modifications
   - Sauvegarde les scores dans `LIGHTHOUSE_BEFORE.json`
4. Identifie les breakpoints actuels et le système CSS (Tailwind?)

### Phase 2 : Design System Mobile (1h max)
1. Documente les contraintes dans `MOBILE_AUDIT.md` :
   - Breakpoints choisis (sm: 640px, md: 768px)
   - Tailles de police mobile
   - Espacements
   - Touch targets (min 44x44px)
2. Crée/adapte les classes utilitaires si nécessaire

### Phase 3 : Rework Sections (4-5h)
Adapte chaque section pour mobile dans cet ordre de priorité :

#### 3.1 Hero Section
- Hiérarchie typographique adaptée
- CTA full-width
- WebGL background : SI problème perf → fallback image/gradient statique

#### 3.2 Use Cases Section (PRIORITÉ HAUTE)
Les flows/diagrammes doivent être compréhensibles sur petit écran.
**Solutions acceptables (choisis la plus adaptée) :**
- Accordion/expand par étape
- Scroll horizontal avec dots indicateurs
- Animation séquentielle au scroll (Linear-style)
- Simplification visuelle du flow

#### 3.3 What We Make Section
- Cards empilées verticalement
- Scroll naturel

#### 3.4 Stack Section
- Constellation de logos → grille simplifiée ou carousel

#### 3.5 Why ZetisLabs Section
- Cards adaptées mobile
- Texte lisible

#### 3.6 CTA Section
- CTAs full-width
- Espacement généreux

#### 3.7 Blog Section
- Cards empilées
- Modal article optimisée mobile

### Phase 4 : SEO Mobile (45min max)
- Meta viewport correct
- Touch icons (apple-touch-icon)
- Images responsive avec srcset
- Fonts preload
- Core Web Vitals optimisés

### Phase 5 : Tests & Validation (1h)
1. Vérifie la console (pas d'erreurs JS)
2. Teste sur ces tailles :
   - 375px (iPhone SE)
   - 390px (iPhone 14)
   - 360px (Android)
3. Lance audit Lighthouse APRÈS → `LIGHTHOUSE_AFTER.json`
4. Compare les scores et documente dans `MOBILE_AUDIT.md`

### Phase 6 : Pull Request
Une fois TOUTES les phases terminées et validées :
1. Push ta branche : `git push -u origin <branch-name>`
2. Crée une PR avec `gh pr create` :
   - Title : `feat(mobile): Complete mobile rework - Issue #13`
   - Body doit contenir :
     - Summary des changements
     - `Closes #13` pour lier l'issue
     - Tableau comparatif Lighthouse (before/after)
     - Liste des sections modifiées
     - Test plan avec les tailles testées
3. Assure-toi que la PR est bien liée à l'issue #13

---

## Règles de comportement

### Commits
- Commit après CHAQUE section terminée
- Format : `feat(mobile): [section] - description courte`
- Exemple : `feat(mobile): hero - responsive typography and CTA`

### Documentation
Maintiens `MOBILE_AUDIT.md` à jour avec :
- Décisions prises et pourquoi
- Problèmes rencontrés
- Solutions choisies
- Scores Lighthouse avant/après

### Si bloqué sur une section > 45min
1. Documente le problème dans MOBILE_AUDIT.md
2. Propose 2-3 solutions alternatives
3. Implémente la solution la plus simple
4. Passe à la section suivante
5. **NE RESTE JAMAIS EN BOUCLE**

### Si un MCP ne fonctionne pas
- Utilise une alternative CLI (ex: Lighthouse CLI au lieu du MCP)
- Note-le dans MOBILE_AUDIT.md
- Continue sans bloquer

### Qualité du code
- Utilise les patterns existants du projet
- Préfère modifier les fichiers existants plutôt que créer de nouveaux
- Tailwind classes > CSS custom
- Mobile-first : styles de base = mobile, puis `md:` pour desktop

---

## Critères de succès (TOUS requis)

- [ ] `MOBILE_AUDIT.md` existe avec documentation complète
- [ ] Scores Lighthouse mobile >= scores initiaux
- [ ] Aucune erreur console
- [ ] Toutes les sections visibles et fonctionnelles sur 375px
- [ ] Use Cases flows compréhensibles sur mobile
- [ ] Au moins 6 commits (1 par section majeure)
- [ ] Build réussi (`npm run build`)
- [ ] **PR créée et liée à l'issue #13**

---

## Tu as terminé quand
1. Tous les critères de succès sont cochés
2. `MOBILE_AUDIT.md` contient le rapport final avec comparaison Lighthouse
3. La PR est créée et liée à l'issue #13 avec "Closes #13"

Commence maintenant par lire MOBILE_BENCHMARK.md, puis lance l'audit Lighthouse initial.
