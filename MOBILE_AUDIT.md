# Mobile Rework Audit - ZetisLabs

> Document tracking mobile optimization decisions, changes, and results
> Issue #13: https://github.com/ZetisLabs/zetislabs-frontend/issues/13

---

## Lighthouse Scores

### Before Rework (Mobile)

| Metric         | Score |
| -------------- | ----- |
| Performance    | 67%   |
| Accessibility  | 96%   |
| Best Practices | 100%  |
| SEO            | 100%  |

### After Rework (Mobile)

| Metric         | Score |
| -------------- | ----- |
| Performance    | TBD   |
| Accessibility  | TBD   |
| Best Practices | TBD   |
| SEO            | TBD   |

---

## Design System Constraints

### Breakpoints (Tailwind v4)

| Breakpoint | Size    | Usage                        |
| ---------- | ------- | ---------------------------- |
| Default    | 0-639px | Mobile-first base styles     |
| `sm`       | 640px+  | Small tablets                |
| `md`       | 768px+  | Tablets / Desktop transition |
| `lg`       | 1024px+ | Desktop                      |
| `xl`       | 1280px+ | Large desktop                |

### Typography (Mobile)

| Element      | Size             | Line Height |
| ------------ | ---------------- | ----------- |
| H1 (Hero)    | text-4xl (36px)  | 1.15        |
| H2 (Section) | text-3xl (30px)  | 1.15        |
| H3 (Card)    | text-2xl (24px)  | 1.2         |
| Body         | text-base (16px) | 1.5-1.6     |
| Small        | text-sm (14px)   | 1.5         |

### Spacing (Mobile)

| Element           | Value          |
| ----------------- | -------------- |
| Section padding   | py-16 (64px)   |
| Container padding | px-4 (16px)    |
| Card gaps         | gap-4 to gap-6 |
| Touch targets     | min 44x44px    |

### Fonts

- **Headings**: GeneralSans (--font-heading)
- **Body**: IBMPlexSans (--font-sans)

### Colors (Preserved)

- Background: #f8f8f8
- Foreground: #1a1a1a
- Accent: #3a7bd5

---

## Section Analysis

### 1. Hero Section

**Current Issues:**

- Fixed positioning may cause issues on mobile scroll
- Halo effects may impact performance
- CTAs stacked vertically - good for mobile

**Changes Made:**

- [x] Typography responsive: text-4xl on mobile, sm:text-5xl, lg:text-6xl
- [x] CTAs flex-col on mobile, sm:flex-row on desktop
- [ ] Additional mobile optimizations needed

---

### 2. Use Cases Section (PRIORITY)

**Current Status:**

- Already has MobileUseCaseCard component
- Uses `md:hidden` and `hidden md:block` pattern
- Mobile cards stack vertically with fade-in animations

**Assessment:**

- ✅ Mobile layout already implemented
- ✅ IntersectionObserver for fade-in
- ✅ Touch-friendly card sizes

**Changes Made:**

- Review existing mobile implementation

---

### 3. What We Make Section

**Current Issues:**

- Grid uses sm:grid-cols-2 lg:grid-cols-3
- Cards may need touch target optimization

**Changes Made:**

- [ ] Verify card spacing on mobile
- [ ] Ensure touch targets are adequate

---

### 4. Stack Section

**Current Issues:**

- Logo constellation layout may be problematic on mobile
- Container height: h-[500px] sm:h-[600px] lg:h-[700px]
- Logos positioned absolutely with percentages

**Changes Made:**

- [ ] Consider simplified grid for mobile
- [ ] Reduce container height on mobile

---

### 5. Why ZetisLabs Section

**Current Issues:**

- Grid: gap-8 sm:grid-cols-2 lg:grid-cols-3
- Cards stack on mobile

**Assessment:**

- ✅ Already mobile-friendly layout

**Changes Made:**

- [ ] Verify spacing and readability

---

### 6. Process Section

**Current Issues:**

- Has separate layouts for desktop/tablet/mobile
- Mobile: flex-col gap-4 sm:hidden

**Assessment:**

- ✅ Already has mobile-specific layout

**Changes Made:**

- [ ] Verify mobile layout

---

### 7. Trust Section

**Current Issues:**

- Logo flex-wrap layout
- Responsive gaps: gap-8 sm:gap-12 lg:gap-16

**Assessment:**

- ✅ Already mobile-friendly

---

### 8. CTA Section

**Current Issues:**

- CTAs: flex-col sm:flex-row pattern
- Already mobile-friendly

**Assessment:**

- ✅ CTAs stack on mobile

---

### 9. Header

**Current Issues:**

- No hamburger menu for mobile
- Navigation links may be cramped on small screens
- Logo may be too large

**Changes Made:**

- [ ] Add hamburger menu for mobile
- [ ] Hide nav links on mobile
- [ ] Ensure adequate touch targets

---

### 10. Footer

**Current Issues:**

- All links in a single row
- May wrap awkwardly on mobile
- Text very small (11px)

**Changes Made:**

- [ ] Stack footer links on mobile
- [ ] Improve touch targets

---

### 11. Blog Section

**Current Issues:**

- Featured article grid already responsive
- Article rows may need mobile optimization
- Category filter bar scrolls horizontally

**Assessment:**

- Modal already full-screen on mobile
- ✅ Close button sized for touch (h-14 w-14)

---

## Problems Encountered

_(Document any blockers or issues here)_

---

## Decisions Made

### Decision 1: Header Mobile Navigation

**Problem**: Current header shows all navigation links, which may be cramped on mobile
**Solution**: Implement hamburger menu for screens < 768px (md breakpoint)
**Rationale**: Follows patterns from Stripe, Vercel (90% adoption from benchmark)

### Decision 2: WebGL Background

**Problem**: Three.js may impact mobile performance
**Solution**: Already using lazy loading via WebGLBackgroundLazy
**Rationale**: Current implementation defers loading until after LCP

---

## Testing Checklist

### Screen Sizes Tested

- [ ] 375px (iPhone SE)
- [ ] 390px (iPhone 14)
- [ ] 360px (Android standard)

### Functional Tests

- [ ] No console errors
- [ ] All links work
- [ ] Scroll behavior smooth
- [ ] Touch targets adequate (44x44px min)
- [ ] Animations performant

---

## Commits Log

| Section       | Commit Message                                                    | Status  |
| ------------- | ----------------------------------------------------------------- | ------- |
| Initial Audit | `docs(mobile): add MOBILE_AUDIT.md and initial Lighthouse scores` | Pending |
| Hero          | `feat(mobile): hero - responsive typography and CTA`              | Pending |
| Use Cases     | `feat(mobile): useCases - verify mobile layout`                   | Pending |
| Header        | `feat(mobile): header - add hamburger menu`                       | Pending |
| Footer        | `feat(mobile): footer - mobile-friendly layout`                   | Pending |
| Final         | `feat(mobile): complete mobile rework`                            | Pending |

---

_Last updated: 2026-02-03_
