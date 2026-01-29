# Landing Page Overview

The ZetisLabs landing page is built with a modular, content-driven architecture. Sections are dynamically composed based on translation file configuration.

## Page Structure

```
┌─────────────────────────────────────┐
│            Header                   │  ← components/layout/Header.tsx
├─────────────────────────────────────┤
│                                     │
│          Hero Section               │  ← components/HeroSection.tsx
│                                     │
├─────────────────────────────────────┤
│                                     │
│     Dynamic Sections                │  ← Configured in i18n
│     (What We Make, Stack,           │
│      Use Cases, Why ZetisLabs)      │
│                                     │
├─────────────────────────────────────┤
│            CTA Section              │  ← Final call-to-action
├─────────────────────────────────────┤
│            Footer                   │  ← components/layout/Footer.tsx
└─────────────────────────────────────┘
```

## Section Types

| Type           | Component           | Description                         |
| -------------- | ------------------- | ----------------------------------- |
| `whatWeMake`   | WhatWeMakeSection   | Feature cards grid (3 columns)      |
| `stack`        | StackSection        | Logo constellation with parallax    |
| `useCases`     | UseCasesSection     | Sticky scroll with project carousel |
| `whyZetisLabs` | WhyZetisLabsSection | Numbered reason cards               |

## How Sections Work

Sections are configured in translation files (`en.json`, `fr.json`):

```json
{
  "home": {
    "sections": [
      { "type": "whatWeMake", "id": "what-we-make" },
      { "type": "stack", "id": "stack-integration" },
      { "type": "useCases", "id": "use-cases" },
      { "type": "whyZetisLabs", "id": "why-zetislabs" }
    ]
  }
}
```

The `SectionRenderer` component reads this config and renders each section:

```tsx
// app/[locale]/page.tsx
<SectionRenderer sections={sections} locale={locale} t={t} dict={dict} />
```

## File Locations

| Content       | Location                             |
| ------------- | ------------------------------------ |
| Hero Section  | `components/HeroSection.tsx`         |
| Feature Cards | `components/WhatWeMakeSection.tsx`   |
| Stack Logos   | `components/StackSection.tsx`        |
| Use Cases     | `components/UseCasesSection.tsx`     |
| Why Section   | `components/WhyZetisLabsSection.tsx` |
| Header        | `components/layout/Header.tsx`       |
| Footer        | `components/layout/Footer.tsx`       |

## Key Files

```
app/[locale]/
├── layout.tsx     # Wraps with Header/Footer
└── page.tsx       # Renders Hero + dynamic sections

components/
├── HeroSection.tsx           # Main hero with CTAs
├── WhatWeMakeSection.tsx     # Feature cards
├── StackSection.tsx          # Tech logos
├── UseCasesSection.tsx       # Scroll-based showcase
├── WhyZetisLabsSection.tsx   # Reason cards
└── layout/
    ├── Header.tsx
    └── Footer.tsx

lib/sections/
├── index.ts           # Public exports
├── registry.ts        # Section type → component mapping
├── SectionRenderer.tsx # Renders sections from config
└── types.ts           # TypeScript definitions
```

## Next Steps

- [Content Management](./content.md) - Update text and images
- [Sections System](./sections.md) - Add or modify sections
- [Customization](./customization.md) - Styling and theming
