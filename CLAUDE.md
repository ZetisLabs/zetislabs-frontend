# ZetisLabs Front-End

## Overview

ZetisLabs is a marketing website showcasing AI-powered automation solutions for growing SMBs. The site is built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4, featuring a modern, minimalist design with smooth animations and internationalization support.

**Core Technologies:**

- Next.js 16.0.0 (App Router with React Server Components)
- React 19.2.0
- TypeScript 5
- Tailwind CSS v4 with `@tailwindcss/postcss`
- react-intersection-observer for scroll-based animations

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
- `ui/Reveal.tsx` - Scroll-based reveal animation wrapper using Intersection Observer

**Design Patterns:**

- Client components (`"use client"`) for interactive features
- Server components for static content and data fetching
- Composition pattern for reusable UI elements
- Custom hooks for animation state management (`useLogoRevealState`, `useRevealState`)

### Internationalization (i18n)

Translation files located in `i18n/translations/`:

- `en.json` - English translations
- `fr.json` - French translations

Structure includes:

- `metadata` - SEO metadata (title, description)
- `header` - Navigation elements
- `footer` - Footer content
- `home` - Homepage sections (hero, stack, whatWeMake, exampleProjects, whyUs)

**Translation Keys:**

```typescript
t("home.hero.title.default");
t("home.whatWeMake.features.aiAgents.title");
```

## Key Features

### 1. Hero Section

- Minimalist design with glassmorphism effects
- Animated eyebrow badge with pulse effect
- Multi-weight typography for emphasis
- Dual CTA buttons with custom icons
- Responsive typography scaling

### 2. Stack Integration Section (New)

Component: `StackSection.tsx`

Features:

- 11 technology logos positioned in 3D space with depth
- Black hole animation effect (logos emerge from/retract to center)
- Synchronized with scroll position using custom `useLogoRevealState` hook
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

**Custom Animations** (defined in `globals.css`):

- `fade-in-slide` - Opacity + translateY
- `fade-in-slide-title` - Title-specific timing
- `fade-in-slide-cta` - CTA-specific timing
- `pulse-glow` - Accent color pulse for badges
- `apple-breathing` - Subtle scaling effect
- `reveal-*` - Directional reveal animations

**Scroll-Based Reveals:**
Uses `Reveal` component with Intersection Observer API:

- Tracks element position continuously using `requestAnimationFrame`
- Three states: `visible`, `hidden-top`, `hidden-bottom`
- Hysteresis delay (120ms) to prevent flickering
- Safe zones for viewport triggering (16% top, 85% bottom)

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
├── .cursor/                    # Cursor IDE plans
├── app/                        # Next.js App Router
│   ├── [locale]/              # Locale-based routing
│   └── globals.css            # Global styles & animations
├── components/                 # React components
│   ├── ui/                    # Base UI components
│   │   └── Reveal.tsx         # Scroll reveal wrapper
│   ├── FeatureCard.tsx        # Feature display card
│   ├── ReasonCard.tsx         # Numbered reason card
│   ├── StackSection.tsx       # Logo constellation
│   └── ProjectShowcase.tsx    # Project examples
├── i18n/                       # Internationalization
│   ├── config.ts              # i18n configuration
│   ├── translations/          # Translation files
│   │   ├── en.json
│   │   └── fr.json
│   └── lib/                   # i18n utilities
├── lib/                        # Utility functions
├── public/                     # Static assets
│   ├── diagrams/              # Project diagrams/images
│   └── stack-logo/            # Technology logos (SVG)
└── package.json               # Dependencies & scripts
```

## Recent Updates (Updated: 2025-12-05)

### Major Changes

**New Components:**

1. **StackSection** - Interactive logo constellation with 3D depth and scroll animations
2. **FeatureCard** - Reusable feature card with enhanced hover states and expandable CTAs
3. **ReasonCard** - Numbered card component for "Why Us" section

**Design Improvements:**

- Refactored What We Make section to use `FeatureCard` component
- Improved responsive spacing (`min-h-screen` → `min-h-[100dvh]`, `py-32` → `py-16 md:py-32`)
- Added glassmorphism effects and gradient overlays
- Enhanced CTA button with new arrow icon implementation
- Improved mobile responsiveness across all sections

**Translation Updates:**

- Updated feature card content structure (added `subtitle` and `cta` fields)
- More generic object naming in translation files
- Added Stack section translation key

**Animation Enhancements:**

- Synchronized StackSection animations with Reveal component logic
- Implemented custom `useLogoRevealState` hook for logo animations
- Black hole effect for logo entrance/exit animations
- Parallax depth simulation with size, blur, and opacity variations

**Bug Fixes:**

- Fixed responsive layout issues
- Updated reveal effect to match scroll movement more precisely
- Improved animation timing and hysteresis

### Breaking Changes

None. All changes are backward compatible.

## Component Usage Examples

### FeatureCard

```tsx
<FeatureCard
  title="Workflow Audit"
  subtitle="The Blueprint."
  description="We analyze your operations..."
  cta="Create an agent"
/>
```

### StackSection

```tsx
<StackSection title={t("home.stack.title")} />
```

### Reveal

```tsx
<Reveal>
  <h2>Your content here</h2>
</Reveal>
```

## Performance Considerations

- Server components for static content to reduce client bundle
- CSS animations over JavaScript for better performance
- `requestAnimationFrame` for smooth scroll tracking
- Intersection Observer for efficient scroll detection
- SVG logos for crisp rendering at any size
- Lazy loading implicit with Next.js App Router

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features required
- CSS Grid and Flexbox
- Intersection Observer API
- requestAnimationFrame API

## Important Notes

**For Developers:**

1. Always use the translation helper `t()` for user-facing text
2. Prefer server components unless interactivity is required
3. Use the `Reveal` component wrapper for scroll-based animations
4. Follow the existing pattern for new card components
5. Test responsive layouts on mobile devices (iOS Safari, Android Chrome)
6. Maintain consistent animation timing (300-500ms transitions, 1000ms reveals)

**Animation Guidelines:**

- Use `group` and `group-hover` for coordinated animations
- Apply `transition-all duration-*` for smooth state changes
- Leverage Tailwind's built-in easing functions
- Stagger animations using CSS `transition-delay`

**i18n Best Practices:**

- Keep translation keys hierarchical and semantic
- Avoid hardcoded strings in components
- Test both English and French translations
- Update both translation files simultaneously

## Future Enhancements

Consider adding:

- Blog section implementation
- Contact form functionality
- Dark mode toggle (theme system already in place via Tailwind)
- Additional language support
- Analytics integration
- Performance monitoring
- A/B testing framework
