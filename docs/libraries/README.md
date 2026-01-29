# Reusable Libraries

ZetisLabs front-end includes three extractable libraries designed for reuse across projects.

## Libraries Overview

| Library                                  | Purpose                     | Import           |
| ---------------------------------------- | --------------------------- | ---------------- |
| [UI Library](./ui/README.md)             | Premium UI components       | `@/lib/ui`       |
| [Motion Library](./motion/README.md)     | Animation system            | `@/lib/motion`   |
| [Sections Library](./sections/README.md) | Dynamic section composition | `@/lib/sections` |

## Quick Start

```tsx
// UI Components
import { CTAButton, FeatureCard, ReasonCard, EyebrowBadge } from "@/lib/ui";

// Animation Components
import { Reveal, FadeIn, StaggerContainer, motion } from "@/lib/motion";

// Animation Config
import { easings, durations, transitions } from "@/lib/motion";

// Section System
import { SectionRenderer, type SectionConfig } from "@/lib/sections";
```

## Extracting for Other Projects

### Option 1: Copy the Library Folder

1. Copy the entire `lib/<library>/` folder
2. Update import paths in your project
3. Install required dependencies

### Option 2: Create an npm Package

1. Create a new package with the library code
2. Add a `package.json` with dependencies
3. Publish to npm or use as local package

### Dependencies

**UI Library:**

- React 18+
- Tailwind CSS v4
- Framer Motion (optional, for animations)

**Motion Library:**

- React 18+
- Framer Motion 12+

**Sections Library:**

- React 18+
- Next.js (for server components)

## Design Principles

### 1. Hydration Safety

All components use the `hasMounted` pattern:

```tsx
const [hasMounted, setHasMounted] = useState(false);
useEffect(() => {
  setHasMounted(true);
}, []);
```

### 2. Accessibility First

- Respects `prefers-reduced-motion`
- Semantic HTML
- ARIA labels where needed

### 3. TypeScript First

- Fully typed components
- Exported type definitions
- Strict mode compatible

### 4. Composable

- Small, focused components
- Props-based customization
- Works with any styling system
