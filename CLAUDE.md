# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZetisLabs front-end: A Next.js 16 application with React 19, TypeScript, and Tailwind CSS v4. The site features a minimalist landing page with glassmorphism design inspired by Evervault, custom theme switching (light/dark), and gradient backgrounds.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: GeneralSans (local font files) via `next/font/local`

### Project Structure

```
app/
├── layout.tsx          # Root layout with Header/Footer, theme initialization
├── page.tsx            # Home page (hero section)
└── globals.css         # Theme tokens, glassmorphism utilities, gradients

components/
├── Header.tsx          # Sticky navigation with glassmorphism
├── Footer.tsx          # Site footer
├── ThemeToggle.tsx     # Client-side theme switcher
└── ThemeToggle.usage.tsx

public/
├── fonts/              # GeneralSans font files (.otf)
└── zetis-*-logo-v2.*   # Logo variants for light/dark themes
```

### Theme System

The application uses a **custom CSS variable-based theme system** (not next-themes or similar libraries):

- Theme state stored in `localStorage` and applied via `data-theme` attribute on `<html>`
- Theme initialization happens in two places to prevent flash:
  1. Inline script in `app/layout.tsx` (executes before hydration)
  2. `ThemeToggle` component's `useEffect` (client-side sync)
- CSS variables defined in `globals.css` under `:root` and `[data-theme="dark"]`
- Logo switching handled via CSS (`.logo-light` / `.logo-dark` visibility)

**Theme Color Tokens:**

Light theme (`:root`):
- `--background: #f8f8f8` - Very light gray background
- `--foreground: #1a1a1a` - Almost black text
- `--accent: #3a7bd5` - Blue accent (primary CTA color)
- `--accent-foreground: #ffffff` - White text on accent
- `--card-background: #ffffff` - Pure white cards
- `--border: #e2e2e2` - Light gray borders
- `--hover-background: #e2e2e2` - Light gray hover state
- `--underline: #3a7bd5` - Blue link underlines

Dark theme (`[data-theme="dark"]`):
- `--background: #1a1a1a` - Almost black background
- `--foreground: #f8f8f8` - Very light gray text
- `--accent: #3a7bd5` - Blue accent (same as light)
- `--accent-foreground: #ffffff` - White text on accent
- `--card-background: #3C3C3C` - Medium dark gray cards
- `--border: #e2e2e2` - Light gray borders (same as light)
- `--hover-background: #2a2a2a` - Slightly lighter dark gray hover
- `--underline: #3a7bd5` - Blue link underlines

### Styling Conventions

#### Glassmorphism Effects
Modern iOS/macOS-inspired glassmorphism with subtle frosted glass appearance. All variants in `globals.css`:

**`.glass`** - Base glassmorphism (primary style)
- Background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)`
- Border: `1px solid rgba(255,255,255,0.18)` (very subtle)
- Backdrop filter: `blur(12px) saturate(180%)`
- Shadow: Soft multi-layer depth
  - `0 8px 32px rgba(0, 0, 0, 0.12)` (ambient)
  - `0 2px 8px rgba(0, 0, 0, 0.08)` (contact)
  - `inset 0 1px 1px rgba(255,255,255,0.3)` (top highlight)
- `::before` pseudo-element: Top 40% gradient highlight for glass reflection

**`.glass-strong`** - Enhanced depth variant
- Background: `linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 100%)`
- Border: `1px solid rgba(255,255,255,0.25)`
- Backdrop filter: `blur(20px) saturate(200%)`
- More pronounced shadows for elevated appearance

**`.glass-edge`** - Subtle rim lighting
- `::after` pseudo-element: Top-to-bottom gradient overlay for rim lighting

**`.glass-card`** - Card component variant
- Fixed dimensions: `240px × 360px`
- Border radius: `20px`
- Same glass effect as base `.glass`
- Top 40% highlight via `::before`

**`.glass-card--inline`** - Flexible glass card
- Removes fixed dimensions
- Border radius: `9999px` (full rounded)
- Inherits all glass properties

**`.glass-pill`** - Lighter variant for navigation/buttons
- Background: `linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)`
- Border: `1px solid rgba(255,255,255,0.16)`
- Backdrop filter: `blur(10px) saturate(160%)` (slightly reduced)
- Softer shadows for subtle appearance
- Used in Header navigation and ThemeToggle button

**`.glass-frame`** - Outline-only variant
- Border: `1px solid rgba(255,255,255,0.65)` (stronger)
- Transparent background
- Optional vertical divider via `--divider-x` CSS variable
- Inner hairline shadow

**Dark theme adjustments:**
- Reduced opacity (0.08 → 0.02 gradient range)
- Lighter borders (0.15 vs 0.18)
- Deeper shadows with higher opacity
- Maintains glass effect without appearing "milky"

#### Background Gradients

**`.banner-inspired-bg`** - Applied to `<body>` in layout
Light theme: Soft blue/periwinkle gradient
- Radial glow 1: `rgba(64, 175, 255, 0.55)` at 20% 60%
- Radial glow 2: `rgba(115, 130, 255, 0.45)` at 75% 18%
- Linear base: `#eaf2ff → #c7d9ff → #9dc2ff → #6f95ff → #cfe1ff`

Dark theme: Deeper blue gradient maintaining aesthetic
- Radial glow 1: `rgba(56, 150, 240, 0.45)` at 18% 62%
- Radial glow 2: `rgba(98, 110, 245, 0.45)` at 78% 20%
- Linear base: `#1a2440 → #243b72 → #2a4fb0 → #3047a0 → #1b2648`

Both use `background-attachment: fixed` for parallax effect

**`.hero-surface`** - Container for hero sections
- Sets `position: relative` and `isolation: isolate`
- Disables overlays to let background gradients show through

### Path Aliases

TypeScript configured with `@/*` pointing to project root:
```typescript
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
```

### ESLint Configuration

Uses Next.js flat config format (`eslint.config.mjs`):
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### TypeScript Configuration

- **Target**: ES2017
- **JSX**: react-jsx (automatic runtime)
- **Module**: esnext with bundler resolution
- **Strict mode**: Enabled
- **Next.js plugin**: Configured for type checking

## Component Patterns

### Client Components
Use `"use client"` directive for:
- Components using React hooks (`useState`, `useEffect`)
- Components accessing browser APIs (`localStorage`, `document`)
- Event handlers

Examples: `ThemeToggle.tsx`, `Header.tsx`

### Server Components (default)
- `app/page.tsx` and other pages without client interactivity
- Layouts without client-side logic

### Image Handling
Use Next.js `<Image>` component:
```tsx
import Image from "next/image";

<Image
  src="/path/to/image.svg"
  alt="Description"
  width={320}
  height={64}
  priority  // For above-the-fold images
/>
```

## Design System

### Typography
**GeneralSans** - Primary typeface loaded from local font files in `public/fonts/`

Font configuration in `app/layout.tsx`:
```typescript
// All weights and styles are loaded via next/font/local
const generalSans = localFont({
  src: [...], // Multiple .otf files
  variable: "--font-general-sans",
  display: "swap",
});
```

**Available weights:**
- 200 (Extralight) - Regular & Italic
- 300 (Light) - Regular & Italic
- 400 (Regular) - Regular & Italic
- 500 (Medium) - Regular & Italic
- 600 (Semibold) - Regular & Italic
- 700 (Bold) - Regular & Italic

**Usage in CSS:**
- CSS Variable: `--font-general-sans`
- Applied globally to body via Tailwind's font-sans
- Fallback chain: `ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto...`

### Button Styles
**`.btn-primary`**
- Background: `var(--accent)` (#3a7bd5)
- Text: `var(--accent-foreground)` (#ffffff)
- Hover: `brightness(0.95)`

**`.btn-ghost`**
- Background: `transparent`
- Text: `var(--foreground)`
- Hover: `var(--hover-background)` with `var(--hover-foreground)`

### Link Styles
**`.link-underline`**
- Background-based underline using `var(--underline)` (#3a7bd5)
- 1px height positioned at bottom

## Git Workflow

Current branch: `main`
- Commits follow conventional format
- Recent work includes header creation, background updates, logo integration
