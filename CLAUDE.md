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

**UI Library Components (`lib/ui/`):**

- `CTAButton` - Primary/secondary CTA buttons with glass effects and animations
- `FeatureCard` - Interactive feature cards with hover effects and animated CTAs
- `ReasonCard` - Numbered reason cards with gradient overlays
- `ServiceCard` - Notification-style cards for platform integrations (Slack, Notion, Trello)
- `HighlightCard` - Compact cards with badge, title, icon for key messages
- `InfoCard` - Flexible cards with icon, title, content, and footer
- `LargeHighlightCard` - Wide format cards for carousels with decoration
- `EyebrowBadge` - Section label badges with glow effect
- `ErrorBoundary` - React error boundary with fallback UI

**Section Components (`components/`):**

- `HeroSection.tsx` - Hero with scroll-driven "sunset" fade effect
- `StackSection.tsx` - Animated logo constellation with parallax depth effect
- `UseCasesSection.tsx` - Use cases with sticky scroll
- `ProjectShowcase.tsx` - Project examples with tabbed navigation

**Design Patterns:**

- Client components (`"use client"`) for interactive features
- Server components for static content and data fetching
- Composition pattern for reusable UI elements
- `hasMounted` pattern to prevent hydration mismatches with Framer Motion
- Centralized UI library for easy extraction and reuse

### UI Component Library (`lib/ui/`)

A reusable, extractable UI component library featuring premium design with depth effects, glass-morphism, and light animations.

```
lib/ui/
├── index.ts              # Main exports
└── components/
    ├── CTAButton.tsx     # Primary/secondary call-to-action buttons
    ├── FeatureCard.tsx   # Feature showcase cards
    ├── ReasonCard.tsx    # Numbered reason cards
    ├── ServiceCard.tsx   # Notification-style platform cards
    ├── HighlightCard.tsx # Compact highlight cards with badge
    ├── InfoCard.tsx      # Flexible info cards
    ├── LargeHighlightCard.tsx # Wide carousel cards
    ├── EyebrowBadge.tsx  # Section label badges
    └── ErrorBoundary.tsx # React error boundary
```

**Usage:**

```tsx
import {
  CTAButton,
  FeatureCard,
  ReasonCard,
  ServiceCard,
  HighlightCard,
  InfoCard,
  LargeHighlightCard,
  EyebrowBadge,
  ErrorBoundary,
} from "@/lib/ui";
```

**Extracting for other projects:**

```bash
cp -r lib/ui/ ../new-project/lib/ui/
cp -r lib/motion/ ../new-project/lib/motion/  # Required dependency
npm install framer-motion  # in new project
```

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
    ├── BreathingHalo.tsx # Apple-style breathing glow
    ├── GridBackground.tsx    # Animated grid background
    ├── CardReveal.tsx    # Card entrance animation
    └── CardCarousel.tsx  # Horizontal scroll carousel
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
├── components/                 # Page-specific components
│   ├── layout/                # Header, Footer
│   ├── HeroSection.tsx        # Hero with scroll fade
│   ├── StackSection.tsx       # Logo constellation
│   ├── UseCasesSection.tsx    # Use cases showcase
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

**UI Component Library (`lib/ui/`):**

- Created new `lib/ui/` library for reusable UI components
- Moved `CTAButton`, `FeatureCard`, `ReasonCard`, `EyebrowBadge`, `ErrorBoundary` to `lib/ui/`
- Single import point: `import { CTAButton, FeatureCard } from "@/lib/ui"`
- Library is extractable to other projects alongside `lib/motion/`

**CTA Button Redesign:**

- Redesigned buttons from pill-shaped to rectangular (`rounded-xl`)
- Added premium depth effects with layered shadows and inner highlights
- Primary CTA features:
  - Blue glow shadow: `shadow-[0_8px_30px_rgb(58,123,213,0.3)]`
  - Animated light sweep effect (infinite loop)
  - Geometric corner accent (L-shaped border)
  - Glass sheen on hover
- Secondary CTA features:
  - Glass effect with `backdrop-blur-md`
  - Layered inner border for depth
  - Radial blue glow on hover
  - Chevron icon with animation

**Framer Motion Migration:**

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

- UI components now imported from `@/lib/ui` instead of `@/components/`
  - `FeatureCard`, `ReasonCard`, `CTAButton` → `@/lib/ui`
  - `EyebrowBadge`, `ErrorBoundary` → `@/lib/ui` (was `@/components/ui/`)
- `Reveal` component now imported from `@/lib/motion` instead of `@/components/ui/Reveal`
- Old CSS animation utilities removed from `globals.css`

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

### UI Components (`@/lib/ui`)

#### CTAButton

Premium call-to-action button with glass effects, light animations, and depth.

**Props:**

| Prop        | Type                       | Default     | Description                         |
| ----------- | -------------------------- | ----------- | ----------------------------------- |
| `href`      | `string`                   | required    | Link destination URL                |
| `children`  | `React.ReactNode`          | required    | Button text/content                 |
| `variant`   | `"primary" \| "secondary"` | `"primary"` | Visual style variant                |
| `ariaLabel` | `string`                   | `undefined` | Accessible label for screen readers |
| `showArrow` | `boolean`                  | `true`      | Show arrow icon (primary only)      |

**Variants:**

- **Primary**: Blue background with glow shadow, animated light sweep, geometric corner accent
- **Secondary**: Glass effect with backdrop blur, radial hover glow, chevron icon

**Examples:**

```tsx
import { CTAButton } from "@/lib/ui";

// Primary CTA (default)
<CTAButton href="/contact" ariaLabel="Contact us">
  Get Started
</CTAButton>

// Secondary CTA
<CTAButton href="#examples" variant="secondary">
  See Examples
</CTAButton>

// Primary without arrow
<CTAButton href="/pricing" showArrow={false}>
  View Pricing
</CTAButton>
```

**Design Features (Primary):**

- Rectangular shape with `rounded-xl`
- Shadow with blue glow: `shadow-[0_8px_30px_rgb(58,123,213,0.3)]`
- Inner white highlight for 3D depth
- Animated light sweep (infinite, 3s duration)
- Geometric corner accent (L-shaped border, top-left)
- Spring animation on hover (scale 1.02, lift -2px)

**Design Features (Secondary):**

- Glass effect with `backdrop-blur-md`
- Layered inner border for depth
- Radial blue glow on hover
- Light sweep on hover (CSS transition)
- Chevron icon with translation animation

---

#### FeatureCard

Interactive feature showcase card with coordinated hover animations.

**Props:**

| Prop          | Type     | Default     | Description                |
| ------------- | -------- | ----------- | -------------------------- |
| `title`       | `string` | required    | Card title                 |
| `subtitle`    | `string` | required    | Subtitle/tagline           |
| `description` | `string` | required    | Feature description        |
| `cta`         | `string` | `undefined` | CTA button text (optional) |

**Example:**

```tsx
import { FeatureCard } from "@/lib/ui";

<FeatureCard
  title="AI Agents"
  subtitle="The Intelligence."
  description="Custom AI agents that handle complex tasks autonomously."
  cta="Create an agent"
/>;
```

**Hover Animations:**

- Card scales to 1.02
- Lightning bolt emoji slides in from left
- Title shifts right by 8px
- CTA button expands with text reveal
- Arrow rotates 180°
- Gradient overlay fades in

---

#### ReasonCard

Numbered reason card with animated underline and background index.

**Props:**

| Prop          | Type     | Default  | Description                                      |
| ------------- | -------- | -------- | ------------------------------------------------ |
| `title`       | `string` | required | Card title                                       |
| `description` | `string` | required | Reason description                               |
| `index`       | `number` | required | Index number (0-based, displays as 01, 02, etc.) |

**Example:**

```tsx
import { ReasonCard } from "@/lib/ui";

<ReasonCard
  index={0}
  title="Deep Expertise"
  description="Years of experience in automation and AI integration."
/>;
```

**Hover Animations:**

- Card scales to 1.02 with shadow
- Background number scales up and becomes more visible
- Title color changes to accent blue
- Underline expands from 3rem to 100%
- Gradient overlay fades in

---

#### EyebrowBadge

Small badge component for section labels with glow effect.

**Props:**

| Prop        | Type              | Default  | Description            |
| ----------- | ----------------- | -------- | ---------------------- |
| `children`  | `React.ReactNode` | required | Badge content          |
| `className` | `string`          | `""`     | Additional CSS classes |

**Example:**

```tsx
import { EyebrowBadge } from "@/lib/ui";
import { PulseGlow } from "@/lib/motion";

<EyebrowBadge>
  <PulseGlow className="rounded-full bg-accent" />
  Now Available
</EyebrowBadge>;
```

**Features:**

- Uppercase text with letter-spacing
- Rounded pill shape with subtle border
- Hover glow effect (uses effect layer system)
- Border color transition on hover

---

#### ServiceCard

Notification-style card for platform integrations (Slack, Notion, Trello, etc.).

**Props:**

| Prop          | Type              | Default     | Description                               |
| ------------- | ----------------- | ----------- | ----------------------------------------- |
| `icon`        | `React.ReactNode` | required    | Platform icon (e.g., Slack, Notion)       |
| `serviceName` | `string`          | required    | Name of the service (displayed as badge)  |
| `label`       | `string`          | required    | Category label (e.g., "Incoming Webhook") |
| `title`       | `string`          | required    | Card title/description                    |
| `date`        | `string`          | `undefined` | Date string (e.g., "Oct 24, 2024")        |
| `assignee`    | `string`          | `undefined` | Assignee name with avatar initial         |
| `className`   | `string`          | `undefined` | Additional CSS classes                    |

**Example:**

```tsx
import { ServiceCard } from "@/lib/ui";
import { Slack } from "lucide-react";

<ServiceCard
  icon={<Slack className="h-5 w-5 text-[#4A154B]" />}
  serviceName="Slack"
  label="Incoming Webhook"
  title="Update production deployment status to #ops-channel"
  date="Oct 24, 2024"
  assignee="Sarah K."
/>;
```

**Design Features:**

- Clean white card with subtle border
- Service badge with uppercase styling
- Separator line between content and metadata
- Avatar initial circle for assignee
- Hover lift animation with shadow

---

#### HighlightCard

Compact card with badge, title, and optional icon for key messages.

**Props:**

| Prop          | Type                                                                  | Default     | Description               |
| ------------- | --------------------------------------------------------------------- | ----------- | ------------------------- |
| `badge`       | `{ text: string; color?: "orange" \| "blue" \| "green" \| "purple" }` | `undefined` | Optional colored badge    |
| `title`       | `string \| React.ReactNode`                                           | required    | Card title                |
| `description` | `string`                                                              | `undefined` | Optional description text |
| `icon`        | `React.ReactNode`                                                     | `undefined` | Optional icon element     |
| `className`   | `string`                                                              | `undefined` | Additional CSS classes    |
| `onClick`     | `() => void`                                                          | `undefined` | Optional click handler    |

**Example:**

```tsx
import { HighlightCard } from "@/lib/ui";
import { Sparkles } from "lucide-react";

<HighlightCard
  badge={{ text: "New Feature", color: "orange" }}
  title="AI-Powered Insights"
  description="Get intelligent recommendations based on your data."
  icon={<Sparkles className="h-6 w-6 text-orange-500" />}
/>;
```

**Badge Colors:**

- `orange`: Orange background with orange text
- `blue`: Blue background with blue text
- `green`: Green background with green text
- `purple`: Purple background with purple text

---

#### InfoCard

Flexible card for displaying information with icon, title, content, and footer.

**Props:**

| Prop        | Type                        | Default     | Description                  |
| ----------- | --------------------------- | ----------- | ---------------------------- |
| `icon`      | `React.ReactNode`           | `undefined` | Optional icon element        |
| `title`     | `string`                    | required    | Card title                   |
| `content`   | `string \| React.ReactNode` | required    | Main content                 |
| `footer`    | `string \| React.ReactNode` | `undefined` | Optional footer text/element |
| `className` | `string`                    | `undefined` | Additional CSS classes       |
| `onClick`   | `() => void`                | `undefined` | Optional click handler       |

**Example:**

```tsx
import { InfoCard } from "@/lib/ui";
import { Zap, Shield, Rocket } from "lucide-react";

// Basic usage
<InfoCard
  icon={<Zap className="h-5 w-5" />}
  title="Lightning Fast"
  content="Our platform is optimized for speed, ensuring your workflows run without delay."
  footer="Performance optimized"
/>

// Grid of InfoCards
<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
  <InfoCard
    icon={<Zap className="h-5 w-5" />}
    title="Lightning Fast"
    content="Optimized for speed and performance."
    footer="Performance optimized"
  />
  <InfoCard
    icon={<Shield className="h-5 w-5" />}
    title="Enterprise Security"
    content="Bank-level encryption keeps your data safe."
    footer="SOC 2 Certified"
  />
  <InfoCard
    icon={<Rocket className="h-5 w-5" />}
    title="Scale Effortlessly"
    content="Infrastructure that grows with your business."
    footer="99.9% Uptime SLA"
  />
</div>
```

**Design Features:**

- Icon displayed in accent-colored circle
- Separator line above footer
- Muted footer text styling
- Hover lift animation

---

#### LargeHighlightCard

Wide format card designed for carousels, with horizontal layout and decoration area.

**Props:**

| Prop          | Type                                                                  | Default     | Description                        |
| ------------- | --------------------------------------------------------------------- | ----------- | ---------------------------------- |
| `badge`       | `{ text: string; color?: "orange" \| "blue" \| "green" \| "purple" }` | `undefined` | Optional colored badge             |
| `title`       | `string`                                                              | required    | Card title (bold heading)          |
| `description` | `string`                                                              | required    | Description text                   |
| `decoration`  | `React.ReactNode`                                                     | `undefined` | Visual element (icon, image, etc.) |
| `className`   | `string`                                                              | `undefined` | Additional CSS classes             |

**Example:**

```tsx
import { LargeHighlightCard } from "@/lib/ui";
import { CardCarousel } from "@/lib/motion";
import { Sparkles, Target, Heart } from "lucide-react";

<CardCarousel showArrows={true} showDots={true}>
  <LargeHighlightCard
    badge={{ text: "Core Value", color: "orange" }}
    title="Innovation at Every Step"
    description="We push boundaries and embrace cutting-edge technologies to deliver solutions that set you apart."
    decoration={
      <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg md:h-40 md:w-40">
        <Sparkles className="h-16 w-16 text-white" />
      </div>
    }
  />
  <LargeHighlightCard
    badge={{ text: "Our Promise", color: "blue" }}
    title="Quality You Can Trust"
    description="Every line of code, every design decision is made with excellence and reliability in mind."
    decoration={
      <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg md:h-40 md:w-40">
        <Target className="h-16 w-16 text-white" />
      </div>
    }
  />
  <LargeHighlightCard
    badge={{ text: "Philosophy", color: "purple" }}
    title="Built with Care"
    description="We treat every project like it's our own. Your success is our success."
    decoration={
      <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg md:h-40 md:w-40">
        <Heart className="h-16 w-16 text-white" />
      </div>
    }
  />
</CardCarousel>;
```

**Design Features:**

- Fixed responsive height: `320px` (mobile), `280px` (md), `300px` (lg)
- Horizontal layout with text left, decoration right
- Subtle background glow behind decoration
- Hover lift animation with enhanced shadow
- Designed to work with CardCarousel component

---

#### ErrorBoundary

React error boundary component with fallback UI.

**Props:**

| Prop       | Type              | Default     | Description                 |
| ---------- | ----------------- | ----------- | --------------------------- |
| `children` | `React.ReactNode` | required    | Content to wrap             |
| `fallback` | `React.ReactNode` | `undefined` | Custom fallback UI on error |

**Example:**

```tsx
import { ErrorBoundary } from "@/lib/ui";

// With default fallback
<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary
  fallback={
    <div className="text-center p-8">
      <p>Unable to load this section.</p>
    </div>
  }
>
  <RiskyComponent />
</ErrorBoundary>
```

---

### Section Components

#### HeroSection

Hero section with scroll-driven "sunset" fade effect.

**Props:**

| Prop                    | Type     | Default  | Description               |
| ----------------------- | -------- | -------- | ------------------------- |
| `eyebrowText`           | `string` | required | Badge text above title    |
| `titleDefault`          | `string` | required | Main title (bold)         |
| `titleThin`             | `string` | required | Title part (light weight) |
| `titleAccent`           | `string` | required | Title part (glass effect) |
| `subtitle`              | `string` | required | Description paragraph     |
| `ctaText`               | `string` | required | Primary CTA text          |
| `ctaSecondaryText`      | `string` | required | Secondary CTA text        |
| `ctaSecondaryAriaLabel` | `string` | required | Secondary CTA aria-label  |

**Example:**

```tsx
<HeroSection
  eyebrowText="AI-Powered Automation"
  titleDefault="Streamline your "
  titleThin="business with "
  titleAccent="intelligent automation"
  subtitle="We help SMBs automate complex workflows."
  ctaText="Get Started"
  ctaSecondaryText="See Examples"
  ctaSecondaryAriaLabel="View example projects"
/>
```

---

#### StackSection

Animated logo constellation with parallax depth.

```tsx
<StackSection title="Integrates with your stack" />
```

---

### Motion Components (`@/lib/motion`)

#### Reveal

Scroll-triggered reveal animation.

```tsx
import { Reveal } from "@/lib/motion";

<Reveal delay={0.2} direction="up" once>
  <h2>Revealed content</h2>
</Reveal>;
```

---

#### CardCarousel

Horizontal scroll carousel with snap points, navigation arrows, and pagination dots.

**Props:**

| Prop               | Type              | Default     | Description                           |
| ------------------ | ----------------- | ----------- | ------------------------------------- |
| `children`         | `React.ReactNode` | required    | Card elements to display              |
| `showDots`         | `boolean`         | `true`      | Show pagination dots                  |
| `showArrows`       | `boolean`         | `true`      | Show navigation arrows (desktop only) |
| `autoPlay`         | `boolean`         | `false`     | Enable auto-play                      |
| `autoPlayInterval` | `number`          | `5000`      | Auto-play interval in ms              |
| `className`        | `string`          | `undefined` | Additional CSS classes                |

**Example:**

```tsx
import { CardCarousel } from "@/lib/motion";
import { LargeHighlightCard } from "@/lib/ui";

<CardCarousel showArrows={true} showDots={true}>
  <LargeHighlightCard
    badge={{ text: "Feature 1", color: "orange" }}
    title="First Card"
    description="Description for the first card."
    decoration={<YourDecoration />}
  />
  <LargeHighlightCard
    badge={{ text: "Feature 2", color: "blue" }}
    title="Second Card"
    description="Description for the second card."
    decoration={<YourDecoration />}
  />
  <LargeHighlightCard
    badge={{ text: "Feature 3", color: "purple" }}
    title="Third Card"
    description="Description for the third card."
    decoration={<YourDecoration />}
  />
</CardCarousel>;
```

**Features:**

- CSS scroll-snap for smooth snapping
- Fixed card widths: `calc(100vw - 3rem)` (mobile), `700px` (md), `900px` (lg)
- Edge fade gradients when scrollable
- Navigation arrows (hidden on mobile)
- Active pagination dot indicator (elongated style)
- Optional auto-play with configurable interval

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
