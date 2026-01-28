# ZetisLabs Front-End

## Overview

ZetisLabs is a marketing website showcasing AI-powered automation solutions for growing SMBs. The site is built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4, featuring a modern, minimalist design with smooth animations and internationalization support.

**Core Technologies:**

- Next.js 16.0.0 (App Router with React Server Components)
- React 19.2.0
- TypeScript 5
- Tailwind CSS v4 with `@tailwindcss/postcss`
- **Framer Motion** for scroll-based and entrance animations

## Architecture

### App Structure

The project uses Next.js App Router with internationalized routing:

```
app/
├── [locale]/           # Internationalized routes
│   └── page.tsx        # Homepage (server component)
├── globals.css         # Global styles and animations
└── layout.tsx          # Root layout
```

### Component Architecture

**Reusable Components:**

- `FeatureCard.tsx` - Interactive feature cards with hover effects and animated CTAs
- `ReasonCard.tsx` - Numbered reason cards with gradient overlays
- `StackSection.tsx` - Animated logo constellation with parallax depth effect
- `ProjectShowcase.tsx` - Project examples with tabbed navigation
- `HeroSection.tsx` - Hero with scroll-driven "sunset" fade effect

**Design Patterns:**

- Client components (`"use client"`) for interactive features
- Server components for static content and data fetching
- Composition pattern for reusable UI elements
- `hasMounted` pattern to prevent hydration mismatches with Framer Motion

### Motion Library (`lib/motion/`)

A reusable, extractable Framer Motion animation library:

```
lib/motion/
├── index.ts              # Main exports
├── config.ts             # Easings, durations, transitions
├── variants.ts           # Reusable animation variants
└── components/
    ├── Reveal.tsx        # Scroll-based reveal (bi-directional)
    ├── FadeIn.tsx        # Simple fade-in on mount
    ├── StaggerContainer.tsx  # Staggered children animations
    ├── ScrollFade.tsx    # Scroll-progress-based fade
    ├── HoverScale.tsx    # Hover interaction wrapper
    ├── PulseGlow.tsx     # Infinite pulse animation
    └── BreathingHalo.tsx # Apple-style breathing glow
```

**Usage:**

```tsx
import { Reveal, FadeIn, motion, useScroll, useTransform } from "@/lib/motion";
```

### Section Library (`lib/sections/`)

A dynamic section composition system that allows landing pages to be configured via i18n files:

```
lib/sections/
├── index.ts              # Main exports
├── types.ts              # SectionConfig, SectionType, SectionProps
├── registry.ts           # Section name -> component mapping
├── SectionRenderer.tsx   # Dynamic section renderer
└── components/
    ├── WhatWeMakeSection.tsx    # Feature cards grid
    ├── WhyZetisLabsSection.tsx  # Reason cards grid
    ├── StackSectionWrapper.tsx  # Logo constellation wrapper
    └── UseCasesSectionWrapper.tsx # Use cases wrapper
```

**Available Section Types:**

| Type           | Description                          |
| -------------- | ------------------------------------ |
| `whatWeMake`   | Grid of 3 FeatureCards (services)    |
| `stack`        | Logo constellation with integrations |
| `useCases`     | Sticky scroll with use case slides   |
| `whyZetisLabs` | Grid of 3 ReasonCards (philosophy)   |

**Usage:**

```tsx
import { SectionRenderer, type SectionConfig } from "@/lib/sections";

const sections: SectionConfig[] = [
  { type: "whatWeMake", id: "what-we-make" },
  { type: "stack", id: "stack-integration" },
];

<SectionRenderer sections={sections} locale={locale} t={t} dict={dict} />;
```

### Internationalization (i18n)

Translation files organized in `i18n/translations/`:

```
i18n/translations/
├── README.md              # Documentation for adding landings
├── default/               # Main site translations
│   ├── en.json
│   └── fr.json
└── landing-pages/         # A/B test variants
    ├── A/
    │   ├── en.json
    │   └── fr.json
    ├── B/
    │   ├── en.json
    │   └── fr.json
    └── index.ts           # Exports and helpers
```

**Dynamic Section Configuration in i18n:**

```json
{
  "home": {
    "sections": [
      { "type": "whatWeMake", "id": "what-we-make" },
      { "type": "stack", "id": "stack-integration" },
      { "type": "useCases", "id": "use-cases" },
      { "type": "whyZetisLabs", "id": "why-zetislabs" }
    ],
    "hero": { ... },
    "whatWeMake": { ... }
  }
}
```

**Translation Keys:**

```typescript
t("home.hero.title.default");
t("home.whatWeMake.features.aiAgents.title");
```

## Key Features

### 1. Hero Section

Component: `HeroSection.tsx`

- **Fixed positioning** - Content stays centered while scrolling
- **Scroll-driven "sunset" fade** - All elements fade and shrink together
- **Breathing halo effect** - Apple-style pulsing blue glow behind title
- **Staggered entrance animations** - CSS keyframes with delays
- **Accessibility** - Respects `prefers-reduced-motion`

Animation timing:

- Halo: scale 1→0.85, opacity 1→0
- Title: scale 1→0.88, opacity 1→0
- All elements complete fade by ~35% scroll progress

### 2. Stack Integration Section

Component: `StackSection.tsx`

Features:

- 11 technology logos positioned in 3D space with depth
- Black hole animation effect (logos emerge from/retract to center)
- Synchronized with scroll position using `useInView`
- Parallax depth simulation (size, blur, opacity based on z-depth)
- Staggered entrance animations
- Hover effects with glassmorphism

Integrated logos: Excel, GitHub, Gmail, HubSpot, Notion, OpenAI, Python, Slack, Google Calendar, Airtable, Google Docs

### 3. What We Make Section

Uses `FeatureCard` component with:

- Grid layout (1/2/3 columns responsive)
- Hover-triggered animations (lightning bolt emoji slide-in, title shift)
- Expandable CTA button (text appears on hover)
- Rotating arrow icon
- Group hover opacity dimming
- Gradient overlay effects

Three features highlighted:

1. **Workflow Audit** - The Blueprint
2. **System Integration** - The Engine
3. **AI Agents** - The Intelligence

### 4. Project Showcase

Interactive tabbed interface showing example automation projects:

- Automated Property Valuation Drafting
- Security Ops ticket enrichment
- DevOps API call conversion
- Sales customer insights
- Video pitch

### 5. Why Choose Us Section

Uses `ReasonCard` component featuring:

- Large background index numbers
- Animated underline reveal
- Content fade transitions
- Grid layout with group hover effects

### Animation System

**Framer Motion Components** (in `lib/motion/`):

| Component          | Purpose                                             |
| ------------------ | --------------------------------------------------- |
| `Reveal`           | Scroll-triggered reveal with bi-directional support |
| `FadeIn`           | Mount-triggered fade with slide                     |
| `StaggerContainer` | Parent for cascading child animations               |
| `ScrollFade`       | Scroll-progress linked opacity/scale                |
| `HoverScale`       | Simple hover scale wrapper                          |
| `PulseGlow`        | Infinite pulsing dot with glow                      |
| `BreathingHalo`    | Organic pulsing background halo                     |

**Configuration** (`lib/motion/config.ts`):

```typescript
easings.smooth; // [0.16, 1, 0.3, 1] - Apple-style
easings.breathing; // [0.25, 0.1, 0.25, 1]
durations.breathing; // { a: 9, b: 11 } seconds
transitions.reveal; // { duration: 0.7, ease: easeOut }
```

**CSS Entrance Animations** (in `globals.css`):

- `hero-entrance` - Staggered fade-in for hero elements
- `hero-entrance-1` through `hero-entrance-4` - Delay variants

## Development Workflow

### Setup & Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

### Project Configuration

**TypeScript:**

- Strict mode enabled
- Path aliases: `@/` maps to project root

**ESLint:**

- Next.js recommended config
- Custom import resolver configuration

**Tailwind CSS:**

- v4 with PostCSS plugin
- Custom animations and utilities
- Design tokens for colors, spacing

## File Structure

```
/
├── .claude/                    # Claude Code configuration
│   ├── agents/                 # Specialized agent definitions
│   └── commands/               # Custom slash commands
├── app/                        # Next.js App Router
│   ├── [locale]/              # Locale-based routing
│   └── globals.css            # Global styles & animations
├── components/                 # React components
│   ├── ui/                    # Base UI components
│   │   └── EyebrowBadge.tsx   # Badge component
│   ├── FeatureCard.tsx        # Feature display card
│   ├── ReasonCard.tsx         # Numbered reason card
│   ├── HeroSection.tsx        # Hero with scroll fade
│   ├── StackSection.tsx       # Logo constellation
│   └── ProjectShowcase.tsx    # Project examples
├── lib/
│   ├── motion/                # Framer Motion library
│   │   ├── index.ts           # Main exports
│   │   ├── config.ts          # Animation config
│   │   ├── variants.ts        # Reusable variants
│   │   └── components/        # Motion components
│   ├── sections/              # Dynamic section library
│   │   ├── index.ts           # Main exports
│   │   ├── types.ts           # Type definitions
│   │   ├── registry.ts        # Section registry
│   │   ├── SectionRenderer.tsx
│   │   └── components/        # Section components
│   └── i18n.ts                # Translation utilities
├── i18n/                       # Internationalization
│   ├── config.ts              # i18n configuration
│   └── translations/          # Translation files
│       ├── README.md          # Documentation
│       ├── default/           # Main translations
│       │   ├── en.json
│       │   └── fr.json
│       └── landing-pages/     # A/B test variants
│           ├── A/, B/, C/, D/
│           └── index.ts
├── public/                     # Static assets
│   ├── fonts/                 # Custom fonts
│   │   ├── GeneralSans/       # Primary font
│   │   └── IBMPlexSans/       # Secondary font
│   ├── diagrams/              # Project diagrams/images
│   └── stack-logo/            # Technology logos (SVG)
└── package.json               # Dependencies & scripts
```

## Recent Updates (Updated: 2026-01-28)

### Dynamic Section Library

- Created `lib/sections/` for dynamic section composition
- Sections are now configured via `sections` array in i18n translation files
- Hero and CTA sections remain static (always first and last)
- Added `SectionRenderer` component for dynamic rendering
- Extracted inline sections from `page.tsx` into dedicated components

### i18n Reorganization

- Reorganized translation folder structure:
  - `default/` folder for main site translations
  - Each landing page variant (A, B, C, D) has its own folder
- Added comprehensive `README.md` in `i18n/translations/` explaining how to add new landing pages
- Updated import paths in `lib/i18n.ts` and `landing-pages/index.ts`

### Framer Motion Migration

- Migrated all animations from CSS/Intersection Observer to Framer Motion
- Created reusable `lib/motion/` library for easy extraction to other projects
- Deleted old `components/ui/Reveal.tsx` (replaced by `lib/motion/components/Reveal.tsx`)

### HeroSection Redesign

- Changed from `sticky` to `fixed` positioning for true scroll-independent fade
- Implemented "sunset" effect - content fades and shrinks in place
- Added breathing halo effect behind title and CTA
- Fixed hydration errors with `hasMounted` pattern

## Component Usage Examples

### Dynamic Sections (via i18n)

Configure sections in your translation file:

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

### HeroSection (with scroll fade)

```tsx
<HeroSection
  eyebrowText="Your tagline"
  titleDefault="Main title "
  titleThin="secondary text "
  titleAccent="accent"
  subtitle="Description paragraph"
  ctaText="Primary CTA"
  ctaSecondaryText="Secondary CTA"
  ctaSecondaryAriaLabel="Accessible label"
/>
```

### Reveal (from motion library)

```tsx
import { Reveal } from "@/lib/motion";

<Reveal delay={0.2} direction="up" once>
  <h2>Revealed content</h2>
</Reveal>;
```

### FeatureCard

```tsx
<FeatureCard
  title="Workflow Audit"
  subtitle="The Blueprint."
  description="We analyze your operations..."
  cta="Create an agent"
/>
```

## Adding New Landing Pages

See `i18n/translations/README.md` for complete documentation. Quick steps:

1. Create folder: `mkdir -p i18n/translations/landing-pages/E`
2. Add `en.json` and `fr.json` with required structure
3. Configure `sections` array for desired section order
4. Register variant in `landing-pages/index.ts`

## Adding New Sections

1. Create component in `lib/sections/components/`
2. Export from `lib/sections/components/index.ts`
3. Add type to `SectionType` in `lib/sections/types.ts`
4. Register in `lib/sections/registry.ts`
5. Use in i18n: `{ "type": "newSection", "id": "unique-id" }`

## Performance Considerations

- Server components for static content to reduce client bundle
- Framer Motion for hardware-accelerated animations
- `useTransform` for scroll-linked animations (no re-renders)
- `hasMounted` pattern prevents hydration warnings
- SVG logos for crisp rendering at any size
- Lazy loading implicit with Next.js App Router

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features required
- CSS Grid and Flexbox
- Framer Motion (requires JavaScript)

## Important Notes

**For Developers:**

1. Always use the translation helper `t()` for user-facing text
2. Prefer server components unless interactivity is required
3. Use components from `@/lib/motion` for animations
4. Use `@/lib/sections` for dynamic section composition
5. Follow the `hasMounted` pattern for client-side-only features
6. Test responsive layouts on mobile devices (iOS Safari, Android Chrome)
7. Maintain consistent animation timing (see `lib/motion/config.ts`)

**Animation Guidelines:**

- Use `motion.div` with `style` prop for scroll-driven animations
- Use `variants` for entrance/exit animations
- Never conditionally return different JSX based on `useReducedMotion` (causes hydration errors)
- Use `hasMounted` state to delay client-only rendering

**Hydration Safety:**

```tsx
// BAD - causes hydration mismatch
if (prefersReducedMotion) {
  return <div>{children}</div>;
}
return <motion.div>{children}</motion.div>;

// GOOD - same structure, conditional behavior
const shouldAnimate = hasMounted && !prefersReducedMotion;
return (
  <motion.div animate={shouldAnimate ? { opacity: 1 } : undefined}>
    {children}
  </motion.div>
);
```

**i18n Best Practices:**

- Keep translation keys hierarchical and semantic
- Avoid hardcoded strings in components
- Test both English and French translations
- Update both translation files simultaneously
- Use the `sections` array to control page composition

## Future Enhancements

Consider adding:

- Blog section implementation
- Contact form functionality
- Dark mode toggle (theme system already in place via Tailwind)
- Additional language support
- Analytics integration
- Performance monitoring
- A/B testing framework integration with section library
