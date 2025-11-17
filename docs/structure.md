# Project Structure

This document explains the complete structure of the ZetisLabs front-end project, including the purpose of each directory and file.

## Root Directory

### Configuration Files

- **`package.json`** - Node.js project configuration, dependencies, and scripts
- **`package-lock.json`** - Locked dependency versions for reproducible installs
- **`tsconfig.json`** - TypeScript compiler configuration with strict mode enabled
- **`next.config.ts`** - Next.js framework configuration
- **`eslint.config.mjs`** - ESLint linting rules (Next.js core web vitals)
- **`postcss.config.mjs`** - PostCSS configuration for Tailwind CSS v4
- **`next-env.d.ts`** - Next.js TypeScript type definitions (auto-generated)

### Documentation Files

- **`README.md`** - Project overview and quick start guide
- **`docs/`** - Comprehensive documentation directory
  - `structure.md` - This file
  - `i18n.md` - Internationalization guide
  - `development.md` - Development workflow and guidelines
  - `deployment.md` - Deployment instructions

### Other Root Files

- **`LICENSE`** - Project license
- **`.gitignore`** - Git ignore patterns (node_modules, .next, etc.)
- **`middleware.ts`** - Next.js middleware for locale detection and routing

## Directory Structure

```
front-end/
├── app/                    # Next.js App Router directory
├── components/             # React components
├── public/                 # Static assets
├── i18n/                   # Internationalization files
├── lib/                    # Utility functions
├── docs/                   # Documentation
├── node_modules/           # Dependencies (git-ignored)
└── .next/                  # Build output (git-ignored)
```

## `app/` Directory

The `app/` directory uses Next.js App Router conventions where folders define routes.

### Root Layout

- **`app/layout.tsx`** - Root layout component (minimal, delegates to locale layout)
- **`app/globals.css`** - Global styles, theme tokens, Tailwind CSS configuration

### Locale-Based Routes

- **`app/[locale]/`** - Dynamic route segment for locale-based routing
  - **`layout.tsx`** - Locale-specific layout with Header, Footer, and font loading
  - **`page.tsx`** - Home page component with all sections

### Route Structure

- `/en` → English homepage (`app/[locale]/page.tsx` with locale="en")
- `/fr` → French homepage (`app/[locale]/page.tsx` with locale="fr")
- `/en/blog` → English blog (future route)
- `/fr/blog` → French blog (future route)

The `[locale]` folder name creates a dynamic route segment that captures the locale from the URL.

## `components/` Directory

Components are organized by purpose for better maintainability.

### `components/layout/`

Layout components that appear on every page:

- **`Header.tsx`** - Site header with navigation and language switcher
- **`Footer.tsx`** - Site footer with copyright and links

### `components/ui/`

Reusable UI components:

- **`LanguageSwitcher.tsx`** - Component for switching between languages
- **`ThemeToggle.tsx`** - Component for switching between light/dark themes (currently unused but available)

## `public/` Directory

Static assets served at the root URL.

### `public/fonts/`

Local font files for GeneralSans font family:
- Multiple weights (200-700) and styles (normal, italic)
- Formats: `.otf` (OpenType Font)

### `public/` Root

- **Logo files** - Various logo variants for light/dark themes
  - `zetis-light-logo-v2.svg`
  - `zetis-dark-logo-v2.svg`
  - `zetis-light-nbg-logo-v2.svg` (no background)
  - `zetis-dark-nbg-logo-v2.svg` (no background)
  - `zetis-logo-v2.png`
  - `logo-zetis-big-v1.png`
- **SVG icons** - Icon files for various purposes
  - `Home SVG Icons.svg`
  - `Icônes Contact.svg`

## `i18n/` Directory

Internationalization configuration and translation files.

### `i18n/config.ts`

- Locale configuration
- Supported locales array (`en`, `fr`)
- Default locale setting
- Locale validation utilities

### `i18n/translations/`

Translation JSON files organized by language:

- **`en.json`** - English translations
- **`fr.json`** - French translations

Translation keys are organized hierarchically by page/component:
```json
{
  "home": {
    "hero": {
      "title": "...",
      "subtitle": "..."
    }
  }
}
```

## `lib/` Directory

Utility functions and helpers.

- **`i18n.ts`** - Translation utility functions
  - `getTranslation(locale, key)` - Get translated string
  - `getTranslations(locale)` - Get all translations for a locale

## Build Output

### `.next/` Directory (git-ignored)

Generated during build process:
- Compiled JavaScript
- Optimized assets
- Static HTML pages
- Server-side code

### `node_modules/` Directory (git-ignored)

Installed npm packages and dependencies.

## File Naming Conventions

- **Routes**: `page.tsx`, `layout.tsx` (lowercase, Next.js convention)
- **Components**: `PascalCase.tsx` (e.g., `Header.tsx`, `LanguageSwitcher.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `i18n.ts`)
- **Config**: `kebab-case.config.ts` or `camelCase.ts` (e.g., `next.config.ts`, `tsconfig.json`)

## Import Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:

- `@/*` → Maps to project root
- Example: `@/components/layout/Header` → `components/layout/Header.tsx`

This allows clean imports without relative path navigation:
```typescript
import Header from "@/components/layout/Header";
import { getTranslation } from "@/lib/i18n";
```

## Key Concepts

### Locale-Based Routing

The `[locale]` dynamic segment in `app/[locale]/` creates URL-based language routing:
- URLs include the locale: `/en`, `/fr`
- Middleware detects browser language and redirects accordingly
- All routes automatically include locale prefix

### Component Organization

- **Layout components** (`components/layout/`) - Page structure elements
- **UI components** (`components/ui/`) - Reusable interactive elements
- Clear separation makes it easy to find and maintain components

### Translation System

- Centralized translation files in `i18n/translations/`
- Hierarchical key structure for organization
- Type-safe translation access via `getTranslation()` utility

