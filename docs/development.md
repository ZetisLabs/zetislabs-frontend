# Development Guide

This guide covers the development workflow, conventions, and best practices for the ZetisLabs front-end project.

## Setup

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server runs on `http://localhost:3000` by default.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run ESLint
npm run lint

# Fix ESLint errors automatically
npm run lint -- --fix
```

## Project Structure

See [structure.md](./structure.md) for detailed project structure documentation.

### Key Directories

- **`app/`** - Next.js App Router routes and layouts
- **`components/`** - React components (organized by purpose)
- **`i18n/`** - Translation files and configuration
- **`lib/`** - Utility functions
- **`public/`** - Static assets (fonts, images, SVGs)

## Component Structure

### Component Organization

Components are organized by purpose:

```
components/
├── layout/        # Layout components (Header, Footer)
└── ui/            # Reusable UI components
```

### Component Conventions

1. **Use function components** with TypeScript
2. **Use const arrow functions** instead of function declarations
3. **Define types** for props
4. **Use descriptive names** with PascalCase
5. **Keep components focused** - Single responsibility principle

Example:

```typescript
type Props = {
  locale: Locale;
  title: string;
};

export const MyComponent = ({ locale, title }: Props) => {
  return <div>{title}</div>;
};
```

## Styling Guidelines

### Tailwind CSS v4

The project uses Tailwind CSS v4 via PostCSS. All styling should use Tailwind utility classes.

### Theme System

Theme variables are defined in `app/globals.css`:

- `--color-background` - Background color
- `--color-foreground` - Text color
- `--color-accent` - Accent color
- `--color-card` - Card background
- `--color-border` - Border color

### Using Theme Colors

```typescript
// Use Tailwind classes that reference theme variables
<div className="bg-background text-foreground border-border">
  <button className="bg-accent text-accent-foreground">
    Click me
  </button>
</div>
```

### Glassmorphism Utilities

Custom glassmorphism utilities are available:

```typescript
<div className="glass glass-card--inline">
  Glass effect content
</div>
```

### Font Usage

The project uses **GeneralSans** font family, loaded via `next/font/local`.

Available font weights:
- `font-extralight` (200)
- `font-light` (300)
- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)

Available styles:
- Normal (default)
- `italic` - Italic style

Example:

```typescript
<h1 className="font-semibold text-4xl">Title</h1>
<p className="font-normal italic">Italic text</p>
```

## Import Path Aliases

Use the `@/*` alias for clean imports:

```typescript
// ✅ Good
import Header from "@/components/layout/Header";
import { getTranslation } from "@/lib/i18n";

// ❌ Avoid
import Header from "../../components/layout/Header";
```

## TypeScript Guidelines

### Type Definitions

Always define types for props:

```typescript
type Props = {
  locale: Locale;
  title: string;
  optional?: string;
};
```

### Type Safety

- Use strict TypeScript mode (enabled in `tsconfig.json`)
- Avoid `any` type - use proper types or `unknown`
- Use type assertions sparingly

## Internationalization

### Adding Translations

See [i18n.md](./i18n.md) for detailed i18n guide.

Quick reference:

```typescript
// In server components
const { locale } = await params;
const t = (key: string) => getTranslation(locale, key);

// In client components
const t = (key: string) => getTranslation(locale, key);
```

### Translation Keys

Use dot notation for nested keys:

```typescript
t("home.hero.title")
t("header.home")
```

## Code Style

### Naming Conventions

- **Components**: PascalCase (`Header.tsx`, `LanguageSwitcher.tsx`)
- **Files**: Match component name or kebab-case for configs
- **Variables/Functions**: camelCase (`handleClick`, `getTranslation`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_LOCALE`)
- **Types**: PascalCase (`Props`, `Locale`)

### Event Handlers

Prefix event handlers with `handle`:

```typescript
const handleClick = () => {
  // Handle click
};

const handleKeyDown = (e: KeyboardEvent) => {
  // Handle keydown
};
```

### Early Returns

Use early returns for better readability:

```typescript
// ✅ Good
const processData = (data: Data | null) => {
  if (!data) return null;
  if (data.length === 0) return [];
  
  // Process data
  return processedData;
};

// ❌ Avoid
const processData = (data: Data | null) => {
  if (data) {
    if (data.length > 0) {
      // Process data
      return processedData;
    } else {
      return [];
    }
  } else {
    return null;
  }
};
```

## Accessibility

### ARIA Labels

Always include ARIA labels for interactive elements:

```typescript
<button aria-label="Close dialog">
  <CloseIcon />
</button>
```

### Semantic HTML

Use semantic HTML elements:

```typescript
// ✅ Good
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>

// ❌ Avoid
<div>
  <div>
    <div onClick={handleClick}>Home</div>
  </div>
</div>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```typescript
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
  tabIndex={0}
>
  Click me
</button>
```

## Testing

Currently, no test runner is configured. When adding tests:

- Use `.test.ts` or `.test.tsx` extensions
- Colocate tests near source files or in `__tests__/` directory
- Prefer React Testing Library for component tests
- Use Playwright for end-to-end tests

## Linting

### ESLint

The project uses ESLint with Next.js core web vitals rules.

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint -- --fix
```

### Before Committing

Always run linting before committing:

```bash
npm run lint
```

Fix any errors before pushing code.

## Git Workflow

### Commit Messages

- Use imperative mood ("Add feature" not "Added feature")
- Keep under 72 characters
- Explain what and why
- Reference issues: `Fix bug #123`

### Pull Requests

- Keep PRs focused on a single feature/fix
- Include description of changes
- Add screenshots for UI changes
- Ensure linting passes

## Common Tasks

### Adding a New Page

1. Create `app/[locale]/your-page/page.tsx`
2. Add translations to `i18n/translations/*.json`
3. Update navigation if needed

### Adding a New Component

1. Create component in appropriate folder (`layout/` or `ui/`)
2. Add TypeScript types
3. Use Tailwind for styling
4. Add translations if needed

### Modifying Styles

1. Use Tailwind utility classes
2. Add custom utilities in `app/globals.css` if needed
3. Use theme variables for colors
4. Avoid inline styles

## Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

- Check TypeScript configuration in `tsconfig.json`
- Verify import paths use `@/*` alias
- Ensure types are properly defined

### Styling Issues

- Verify Tailwind classes are correct
- Check theme variables in `globals.css`
- Ensure PostCSS is configured correctly

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

