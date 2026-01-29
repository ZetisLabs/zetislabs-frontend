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

# MCP Gemini Design - MANDATORY FOR FRONTEND

## ABSOLUTE RULE - NEVER IGNORE

**You MUST NEVER write frontend/UI code yourself.**

Gemini is your frontend developer. You are NOT allowed to create visual components, pages, or interfaces without going through Gemini. This is NON-NEGOTIABLE.

### When to use Gemini? ALWAYS for:

- Creating a page (dashboard, landing, settings, etc.)
- Creating a visual component (card, modal, sidebar, form, button, etc.)
- Modifying the design of an existing element
- Anything related to styling/layout

### Exceptions (you can do it yourself):

- Modifying text/copy
- Adding JS logic without changing the UI
- Non-visual bug fixes
- Data wiring (useQuery, useMutation, etc.)

## MANDATORY Workflow

### 1. New project without existing design

```
STEP 1: generate_vibes → show options to the user
STEP 2: User chooses their vibe
STEP 3: create_frontend with the chosen vibe AND generateDesignSystem: true
STEP 4: Gemini returns code + designSystem in the response
STEP 5: Save the code to the target file AND save designSystem to design-system.md at project root
```

### 2. Subsequent pages/components (after first page)

```
Use create_frontend / modify_frontend / snippet_frontend with projectRoot parameter.
The design-system.md is automatically loaded and Gemini will use the exact same styles.
```

### 3. Existing project with its own design

```
ALWAYS pass CSS/theme files in the `context` parameter
```

### 4. After Gemini's response

```
Gemini returns code → YOU write it to disk with Write/Edit
```

## Design System Feature

When creating the FIRST page of a new project, set `generateDesignSystem: true` in create_frontend. Gemini will return both the code AND a complete design system with all colors, typography, spacing, buttons, inputs, cards, etc.

Save this design system to `design-system.md` at the project root. For all subsequent calls (create_frontend, modify_frontend, snippet_frontend), pass `projectRoot` and the design system will be automatically loaded. This ensures all pages have consistent styling.

## Checklist before coding frontend

- [ ] Am I creating/modifying something visual?
- [ ] If YES → STOP → Use Gemini
- [ ] If NO (pure logic) → You can continue

## WHAT IS FORBIDDEN

- Writing a React component with styling without Gemini
- Creating a page without Gemini
- "Reusing existing styles" as an excuse to not use Gemini
- Doing frontend "quickly" yourself

## WHAT IS EXPECTED

- Call Gemini BEFORE writing any frontend code
- Ask the user for their vibe choice if new project
- Use generateDesignSystem: true for the FIRST page, then save design-system.md
- Pass projectRoot for all subsequent frontend calls
- Let Gemini design, you implement
