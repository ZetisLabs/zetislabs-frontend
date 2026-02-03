# Mobile Rework Audit - ZetisLabs

> **Issue**: #13 - Rework complet de la version mobile du site
> **Branch**: feat/mobile
> **Date**: February 2026

---

## Phase 1: Initial Audit

### Lighthouse Baseline Scores (Mobile - iPhone SE 375px)

| Metric           | Score    | Details             |
| ---------------- | -------- | ------------------- |
| **LCP**          | 1,818 ms | Good (<2.5s target) |
| **CLS**          | 0.00     | Excellent           |
| **TTFB**         | 75 ms    | Excellent           |
| **Render Delay** | 1,743 ms | Main bottleneck     |

**Trace file**: `LIGHTHOUSE_BEFORE_trace.json.gz`

### Console Issues

- ⚠️ 1 Warning: Container position for scroll offset calculation (non-critical)
- ✅ 0 Errors

### Current Mobile Problems Identified

1. **Header**: No hamburger menu on mobile - navigation cramped
2. **Hero Section**: Fixed positioning may cause issues on mobile; CTA buttons could be fuller width
3. **Use Cases Section**: Already has mobile layout (MobileUseCaseCard) - good foundation
4. **Stack Section**: Logo constellation works but may be too dense on small screens
5. **Typography**: Sizes already responsive with sm/lg breakpoints

---

## Phase 2: Design System Constraints

### Existing Design Tokens (from globals.css)

```css
/* Colors */
--color-background: #f8f8f8;
--color-foreground: #1a1a1a;
--color-accent: #3a7bd5;
--color-accent-foreground: #f8f8f8;
--color-card: #ffffff;
--color-border: #e2e2e2;

/* Fonts */
--font-sans: IBM Plex Sans (body) --font-heading: GeneralSans (headings);
```

### Mobile Breakpoints

| Breakpoint | Width   | Usage                        |
| ---------- | ------- | ---------------------------- |
| Base       | 0-639px | Mobile phones                |
| `sm`       | 640px+  | Large phones                 |
| `md`       | 768px+  | Tablets / Desktop transition |
| `lg`       | 1024px+ | Desktop                      |

### Mobile Design Rules

| Element                  | Constraint                           |
| ------------------------ | ------------------------------------ |
| Touch targets            | Minimum 44x44px                      |
| Section padding          | 16px (px-4) horizontal               |
| Section vertical spacing | py-16 on mobile, py-24/32 on desktop |
| Body font size           | 16px minimum (prevent iOS zoom)      |
| Line height              | 1.5-1.6 for readability              |
| CTA buttons              | Full-width on mobile                 |

---

## Phase 3: Section Rework Progress

### 3.1 Hero Section

- [ ] Adapt typography hierarchy for mobile
- [ ] Full-width CTAs on mobile
- [ ] Test WebGL background performance
- [ ] Reduce entrance animation delays on mobile

### 3.2 Use Cases Section (Priority)

- [x] Mobile layout exists (MobileUseCaseCard)
- [ ] Verify touch targets on CTA
- [ ] Test scroll performance
- [ ] Improve visual hierarchy

### 3.3 What We Make Section

- [ ] Stack cards vertically on mobile
- [ ] Ensure proper spacing

### 3.4 Stack Section

- [ ] Simplify logo layout on mobile
- [ ] Consider grid vs constellation

### 3.5 Why ZetisLabs Section

- [ ] Adapt testimonial cards
- [ ] Maintain readability

### 3.6 CTA Section

- [ ] Full-width CTAs
- [ ] Generous spacing

### 3.7 Header/Navigation

- [ ] Add hamburger menu for mobile
- [ ] Off-canvas navigation

---

## Phase 4: Decisions Log

| Decision                   | Reasoning                                           | Date       |
| -------------------------- | --------------------------------------------------- | ---------- |
| Keep WebGL on mobile       | LCP is already good (1.8s), lazy loading in place   | 2026-02-03 |
| Use existing color palette | Maintain brand consistency                          | 2026-02-03 |
| Mobile-first approach      | Apply base styles for mobile, use `md:` for desktop | 2026-02-03 |

---

## Phase 5: Final Comparison

### Before vs After Lighthouse

| Metric      | Before   | After | Change |
| ----------- | -------- | ----- | ------ |
| LCP         | 1,818 ms | TBD   | -      |
| CLS         | 0.00     | TBD   | -      |
| Performance | TBD      | TBD   | -      |

---

## Commits Log

| Commit | Section | Description                       |
| ------ | ------- | --------------------------------- |
| -      | -       | (To be filled as work progresses) |

---

_Document maintained throughout mobile rework process_
