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

| Path                 | Purpose                                                            |
| -------------------- | ------------------------------------------------------------------ |
| `app/[locale]/`      | Internationalized pages (App Router)                               |
| `app/[locale]/blog/` | Blog listing and article pages                                     |
| `articles/`          | Markdown articles organized by locale (en/, fr/)                   |
| `components/`        | Page-specific sections (HeroSection, CTAContent, etc.)             |
| `components/webgl/`  | WebGL background system with lazy loading                          |
| `components/seo/`    | JSON-LD structured data components                                 |
| `lib/ui/`            | Reusable UI primitives (CTAButton, EyebrowBadge)                   |
| `lib/motion/`        | Framer Motion wrapper + animation config (Reveal, motion, easings) |
| `lib/articles/`      | Article loading utilities (getAllArticles, getArticleBySlug)       |
| `lib/sections/`      | Dynamic section composition system                                 |
| `lib/seo/`           | SEO configuration (siteConfig)                                     |
| `i18n/translations/` | Translation files (default/ — en.json, fr.json)                    |
| `design-wiki/`       | Design system & philosophy (git submodule — UI source of truth)    |

### Import Conventions

```tsx
// UI components
import { CTAButton, EyebrowBadge } from "@/lib/ui";

// Motion/animations
import { Reveal, motion, useScroll, useTransform } from "@/lib/motion";

// Sections
import { SectionRenderer, type SectionConfig } from "@/lib/sections";

// Articles (blog)
import { getAllArticles, getArticleBySlug, type Article } from "@/lib/articles";

// SEO
import { siteConfig } from "@/lib/seo/config";
import {
  ArticleJsonLd,
  WebSiteJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";

// WebGL (use lazy version for performance)
import { WebGLBackgroundLazy } from "@/components/webgl/WebGLBackgroundLazy";
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

### Hook Rules (Critical)

Never call hooks inside JSX render or conditionally:

```tsx
// BAD - hooks in JSX render
<motion.div style={{ y: useTransform(scrollY, [0, 1], [0, -50]) }} />;

// GOOD - hooks at component top level
const y = useTransform(scrollY, [0, 1], [0, -50]);
<motion.div style={{ y }} />;
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
      { "type": "problemSolution", "id": "problem-solution" },
      { "type": "useCases", "id": "use-cases" },
      { "type": "process", "id": "process" }
    ]
  }
}
```

### Available Section Types

Registered in `lib/sections/registry.ts` (add a row there + a `SectionType`
entry in `lib/sections/types.ts` to introduce a new one):

| Type              | Description        |
| ----------------- | ------------------ |
| `problemSolution` | Problem / solution |
| `useCases`        | Use-case slides    |
| `process`         | Process steps      |

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

### CTAContent

Client component for CTA sections with in-view animations:

```tsx
<CTAContent
  title="Ready to automate?"
  description="Let's discuss your needs."
  primaryCTA={{ label: "Book a call", href: "/contact", ariaLabel: "..." }}
  secondaryCTA={{ label: "Learn more", href: "/about", ariaLabel: "..." }}
/>
```

### Reveal (Animation)

```tsx
<Reveal delay={0.2} direction="up" once>
  <h2>Animated content</h2>
</Reveal>
```

## WebGL Background System

### Architecture

The WebGL background uses Three.js with custom shaders and supports lazy loading for performance:

```
/components/webgl
  /WebGLBackground.tsx      # Main WebGL component
  /WebGLBackgroundLazy.tsx  # Lazy-loaded wrapper (use this!)
  /WebGLCanvas.tsx          # Canvas setup
  /hooks/                   # Custom hooks (useInstancedGrid, etc.)
  /shaders/                 # GLSL shaders
    /background.frag.ts     # Fragment shader with animation modes
    /background.vert.ts     # Vertex shader
    /includes/              # Shared shader code (noise)
```

Import `WebGLBackgroundLazy` directly from its file (there is no barrel):
`import { WebGLBackgroundLazy } from "@/components/webgl/WebGLBackgroundLazy";`

### Lazy Loading (Performance)

Always use `WebGLBackgroundLazy` instead of `WebGLBackground` directly:

```tsx
import { WebGLBackgroundLazy } from "@/components/webgl/WebGLBackgroundLazy";

// Defers Three.js loading until after LCP, improving performance by ~48%
<WebGLBackgroundLazy animationMode="intro" loadDelay={100} />;
```

### Animation Modes

| Mode    | Value | Description                             |
| ------- | ----- | --------------------------------------- |
| `none`  | 0     | No animation                            |
| `intro` | 1     | Arc sunrise effect (home page)          |
| `idle`  | 2     | Subtle breathing animation              |
| `blog`  | 3     | Modular sweep - Swiss typographic style |

To override animation mode in a layout:

```tsx
import { WebGLAnimationModeOverride } from "@/components/providers";

export default function MyLayout({ children }) {
  return (
    <WebGLAnimationModeOverride mode="blog">
      {children}
    </WebGLAnimationModeOverride>
  );
}
```

## SEO Infrastructure

### Configuration

Central SEO config in `lib/seo/config.ts`:

```tsx
import { siteConfig } from "@/lib/seo/config";
// siteConfig.name, siteConfig.url, siteConfig.description, etc.
```

### Structured Data (JSON-LD)

```tsx
import { ArticleJsonLd, WebSiteJsonLd, BreadcrumbJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";

// In layouts/pages:
<WebSiteJsonLd locale={locale} />
<ArticleJsonLd article={article} locale={locale} />
<BreadcrumbJsonLd items={[{ name: "Blog", url: "/blog" }]} />
```

### Sitemap & Robots

- `app/sitemap.ts` - Auto-generates sitemap with all locales and articles
- `app/robots.ts` - Configures crawler rules

## Blog System

### Architecture

```
/articles
  /en                    # English articles
    /my-article.md
  /fr                    # French articles
    /mon-article.md

/app/[locale]/blog
  /page.tsx              # Blog listing (server component)
  /[slug]/page.tsx       # Article page with SEO metadata
  /layout.tsx            # Sets WebGL animation mode to "blog"
  /components
    /BlogClient.tsx      # Client component - interactivity
    /ArticleContent.tsx  # Markdown renderer with IBMPlexSans

/lib/articles
  /index.ts              # getAllArticles(), getArticleBySlug()
  /types.ts              # Article, ArticleFrontmatter types
```

### Article Frontmatter Format

```markdown
---
title: "Article Title"
excerpt: "Short description for listing page..."
category: "AI & Automation"
author:
  name: "Author Name"
  avatar: "AN"
date: "2024-10-24"
readTime: "12 min"
image: "https://images.unsplash.com/..."
featured: true
---

Article content in Markdown...
```

### Available Categories

- `AI & Automation`
- `Product Updates`
- `Case Studies`
- `Engineering`

### Adding a New Article

1. Create a `.md` file in `/articles/{locale}/`
2. Add frontmatter with required fields (title, excerpt, category, author, date, readTime, image)
3. Write content in Markdown (supports GFM: tables, code blocks, etc.)
4. Commit and push - article appears automatically

### Article Utilities

```tsx
// Get all articles for a locale (sorted by date, newest first)
const articles = getAllArticles("fr");

// Get single article by slug
const article = getArticleBySlug("my-article", "en");

// Article type
interface Article {
  slug: string; // Filename without .md
  content: string; // Raw markdown content
  title: string;
  excerpt: string;
  category: string;
  author: { name: string; avatar: string };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}
```

### Blog Typography

Article content uses **IBMPlexSans** for all text including headings (not GeneralSans). This is handled by the `ArticleContent` component which wraps content in `font-sans`.

## Design System

- **Primary font**: GeneralSans (headings)
- **Secondary font**: IBMPlexSans (body, article content)
- **Path alias**: `@/` maps to project root
- **Tailwind**: v4 with PostCSS
- **TypeScript**: Strict mode enabled

## Recent Updates (2025-02-02)

### Performance Optimizations

- **WebGL Lazy Loading**: New `WebGLBackgroundLazy` component defers Three.js bundle loading until after LCP, improving performance by ~48%
- Uses `requestIdleCallback` for optimal scheduling with fallback

### SEO Infrastructure

- Added comprehensive SEO system with JSON-LD structured data
- New `lib/seo/config.ts` for centralized SEO configuration
- Auto-generated `sitemap.xml` and `robots.txt`
- Article pages include full SEO metadata and structured data

### New Components

- `CTAContent`: Client component for CTA sections with in-view animations
- `components/seo/JsonLd.tsx`: Organization, WebSite, Article, and Breadcrumb JSON-LD

### Bug Fixes

- Fixed hydration mismatches in UseCasesSection using simpler useState pattern
- Moved useTransform calls out of JSX render in HeroSection
- Resolved SSR mismatch issues with consistent component structure

### i18n Updates

- Primary CTAs now link to Calendly booking

---

# Frontend / UI Workflow

> Earlier versions of this file mandated routing **all** frontend through a
> "Gemini Design" MCP server. **That MCP is not connected in our sessions**, so
> that rule is obsolete. Hand-code the UI in React directly, using the project's
> own design system as the source of truth. If a Gemini design MCP is ever
> connected again, re-offer to route visual work through it.

## Source of truth for design

When building or changing UI, read these **before** writing any markup/styles:

1. **`design-wiki/`** (git submodule) — the design system & philosophy.
   - `design-wiki/synthesis/zetis-design-philosophy.md`
   - `design-wiki/decisions.md`
   - Initialize it if empty: `git submodule update --init design-wiki`
2. **`app/globals.css`** — the live Tailwind v4 `@theme` tokens and utilities.
   Reuse these instead of inventing values:
   - Colors: `--color-background`, `--color-foreground`, `--color-accent`,
     `--color-card`, `--color-border`
   - Fonts: `--font-sans` (IBM Plex), `--font-heading` (GeneralSans)
   - Easings: `--ease-snappy`, `--ease-spring`, `--ease-out-strong`
   - Utilities: `swiss-paper`, `scroll-fade-y`, `glass-text`, `scroll-section`,
     `.hero-entrance` (CSS-driven hero entrance, no JS)
   - Built-in `:focus-visible` rings + tactile `:active` press (don't reinvent)

## Design direction (non-negotiable)

- Swiss + organic; lab/craft identity; **accent color used sparingly for "life"**
- **No horizontal rules** (`<hr>` / border dividers) — separate with space/rhythm
- "Code is the design medium" — iterate in real components, on-brand by default

## How to work on UI

1. Read the design-wiki philosophy + the relevant `globals.css` tokens.
2. Hand-write the React/Tailwind, reusing existing primitives
   (`@/lib/ui`: `CTAButton`, `EyebrowBadge`; `@/lib/motion`: `Reveal`, `motion`).
3. Follow the **Hydration Safety** and **Hook Rules** above.
4. Keep components server-first; add `"use client"` only when interactivity needs it.

## You CAN always do without any design tooling

- Text/copy, i18n strings, JS logic, data wiring, non-visual bug fixes,
  refactors, and the dead-code/perf cleanups already established in this repo.

## Heavy commands

`next dev` once crashed the machine — **ask before launching `next dev` or
`next build`.** Prefer `next start` on the existing build to preview, and use
`-H 0.0.0.0` when the user needs LAN access.
