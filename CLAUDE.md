# ZetisLabs Front-End

Marketing website for AI-powered automation solutions. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

## Quick Reference

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Lint code
npm run lint:fix # Auto-fix lint issues
```

## Architecture

### Key Directories

| Path                 | Purpose                                                                   |
| -------------------- | ------------------------------------------------------------------------- |
| `app/[locale]/`      | Internationalized pages (App Router)                                      |
| `components/`        | Page-specific sections (HeroSection, StackSection, etc.)                  |
| `lib/ui/`            | Reusable UI components (CTAButton, FeatureCard, ReasonCard, EyebrowBadge) |
| `lib/motion/`        | Framer Motion animation library (Reveal, FadeIn, ScrollFade, etc.)        |
| `lib/sections/`      | Dynamic section composition system                                        |
| `i18n/translations/` | Translation files (default/, landing-pages/A,B,C,D/)                      |

### Import Conventions

```tsx
// UI components
import { CTAButton, FeatureCard, ReasonCard, EyebrowBadge } from "@/lib/ui";

// Motion/animations
import { Reveal, FadeIn, motion, useScroll, useTransform } from "@/lib/motion";

// Sections
import { SectionRenderer, type SectionConfig } from "@/lib/sections";
```

## Patterns & Rules

### Hydration Safety (Critical)

Always use `hasMounted` pattern for client-side features to prevent hydration mismatches:

```tsx
// BAD - causes hydration mismatch
if (prefersReducedMotion) return <div>{children}</div>;
return <motion.div>{children}</motion.div>;

// GOOD - same structure, conditional behavior
const shouldAnimate = hasMounted && !prefersReducedMotion;
return (
  <motion.div animate={shouldAnimate ? { opacity: 1 } : undefined}>
    {children}
  </motion.div>
);
```

### Component Types

- **Server components**: Default for static content
- **Client components**: Add `"use client"` only when interactivity is required

### i18n Usage

- Use translation helper `t()` for all user-facing text
- Translation keys are hierarchical: `t("home.hero.title.default")`
- Always update both `en.json` and `fr.json` simultaneously
- Sections are configured via `sections` array in translation files:

```json
{
  "home": {
    "sections": [
      { "type": "whatWeMake", "id": "services" },
      { "type": "stack", "id": "integrations" }
    ]
  }
}
```

### Available Section Types

| Type           | Description          |
| -------------- | -------------------- |
| `whatWeMake`   | Feature cards grid   |
| `stack`        | Logo constellation   |
| `useCases`     | Sticky scroll slides |
| `whyZetisLabs` | Reason cards grid    |

### Animation Guidelines

- Use `@/lib/motion` components for all animations
- Use `motion.div` with `style` prop for scroll-driven effects
- Use `variants` for entrance/exit animations
- Animation config lives in `lib/motion/config.ts`

## Key Components

### CTAButton

```tsx
<CTAButton href="/contact" variant="primary">Get Started</CTAButton>
<CTAButton href="#examples" variant="secondary">See Examples</CTAButton>
```

Variants: `primary` (blue glow, light sweep) | `secondary` (glass effect, chevron)

### FeatureCard / ReasonCard

```tsx
<FeatureCard title="AI Agents" subtitle="The Intelligence." description="..." cta="Learn more" />
<ReasonCard index={0} title="Deep Expertise" description="..." />
```

### Reveal (Animation)

```tsx
<Reveal delay={0.2} direction="up" once>
  <h2>Animated content</h2>
</Reveal>
```

## Design System

- **Primary font**: GeneralSans
- **Secondary font**: IBMPlexSans
- **Path alias**: `@/` maps to project root
- **Tailwind**: v4 with PostCSS
- **TypeScript**: Strict mode enabled
