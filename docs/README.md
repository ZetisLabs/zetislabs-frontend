# ZetisLabs Front-End Documentation

Welcome to the ZetisLabs front-end documentation. This guide covers everything you need to maintain, update, and extend the landing page and reusable libraries.

## Quick Links

| Section | Description |
|---------|-------------|
| [Getting Started](./getting-started/README.md) | Installation and quick start |
| [Landing Page](./landing-page/README.md) | Maintain and update content |
| [UI Library](./libraries/ui/README.md) | Reusable UI components |
| [Motion Library](./libraries/motion/README.md) | Animation system |
| [Sections Library](./libraries/sections/README.md) | Dynamic section composition |
| [Internationalization](./i18n.md) | Multi-language support |
| [Development](./development.md) | Coding guidelines |
| [Deployment](./deployment.md) | Deploy to production |

## Tech Stack

- **Next.js 16** - App Router, Server Components
- **React 19** - Latest React features
- **TypeScript** - Strict mode enabled
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Animations and transitions

## Project Architecture

```
front-end/
├── app/[locale]/          # Internationalized pages
├── components/            # Page-specific sections
├── lib/
│   ├── ui/               # Reusable UI components (extractable)
│   ├── motion/           # Animation library (extractable)
│   └── sections/         # Section composition system
└── i18n/translations/     # Translation files
```

## Key Concepts

### Server vs Client Components

- **Server Components** (default): Static content, no interactivity
- **Client Components** (`"use client"`): Interactive features, animations

### Hydration Safety

All animated components use the `hasMounted` pattern to prevent hydration mismatches:

```tsx
const [hasMounted, setHasMounted] = useState(false);
useEffect(() => { setHasMounted(true); }, []);
const shouldAnimate = hasMounted && !prefersReducedMotion;
```

### Import Conventions

```tsx
import { CTAButton, FeatureCard } from "@/lib/ui";
import { Reveal, FadeIn, motion } from "@/lib/motion";
import { SectionRenderer } from "@/lib/sections";
```

## Common Tasks

| Task | Guide |
|------|-------|
| Update hero text | [Landing Page > Content](./landing-page/content.md) |
| Add a new section | [Landing Page > Sections](./landing-page/sections.md) |
| Create a button | [UI Library > CTAButton](./libraries/ui/cta-button.md) |
| Add animations | [Motion Library](./libraries/motion/README.md) |
| Add translations | [i18n Guide](./i18n.md) |

## Support

- [Structure Reference](./structure.md) - Complete file structure
- [Development Guide](./development.md) - Coding conventions
- [Deployment Guide](./deployment.md) - Production deployment
