# Sections Library

A dynamic section composition system that renders page sections based on configuration, enabling content-driven page building without code changes.

## Overview

The sections library allows you to:

- Define section order in translation files
- Add/remove sections without touching page code
- Reorder sections by editing JSON
- Enable/disable sections dynamically

## Installation

The library is located at `lib/sections/`. To use in another project:

1. Copy the `lib/sections/` folder
2. Adapt the section registry for your components
3. Configure sections in your data source

## Quick Start

### 1. Define Sections in Config

```json
// translations/en.json
{
  "home": {
    "sections": [
      { "type": "hero", "id": "hero-section" },
      { "type": "features", "id": "features-section" },
      { "type": "testimonials", "id": "testimonials-section" }
    ]
  }
}
```

### 2. Register Components

```typescript
// lib/sections/registry.ts
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export const sectionRegistry = {
  hero: HeroSection,
  features: FeaturesSection,
  testimonials: TestimonialsSection,
};
```

### 3. Render Sections

```tsx
// app/[locale]/page.tsx
import { SectionRenderer } from "@/lib/sections";

export default async function Page({ params }) {
  const { locale } = await params;
  const sections = getTranslations(locale).home.sections;

  return (
    <SectionRenderer sections={sections} locale={locale} t={t} dict={dict} />
  );
}
```

## Exports

```typescript
// lib/sections/index.ts
export { SectionRenderer } from "./SectionRenderer";
export {
  sectionRegistry,
  getSectionComponent,
  isValidSectionType,
} from "./registry";
export type {
  SectionType,
  SectionConfig,
  SectionProps,
  SectionComponent,
} from "./types";
```

## Available Section Types

| Type           | Component           | Description          |
| -------------- | ------------------- | -------------------- |
| `whatWeMake`   | WhatWeMakeSection   | Feature cards grid   |
| `stack`        | StackSection        | Logo constellation   |
| `useCases`     | UseCasesSection     | Sticky scroll slides |
| `whyZetisLabs` | WhyZetisLabsSection | Reason cards         |

## Configuration Options

### Basic Config

```json
{ "type": "features", "id": "features-section" }
```

### Disable Section

```json
{ "type": "features", "id": "features-section", "enabled": false }
```

## Documentation

- [Creating Sections](./creating-sections.md) - How to add new section types

## Architecture

```
lib/sections/
├── index.ts              # Public exports
├── types.ts              # TypeScript definitions
├── registry.ts           # Section type → component mapping
└── SectionRenderer.tsx   # Renders sections from config
```

## Key Concepts

### Section Config

```typescript
interface SectionConfig {
  type: SectionType; // Maps to component in registry
  id: string; // Unique React key
  enabled?: boolean; // Default: true
}
```

### Section Props

All sections receive:

```typescript
interface SectionProps {
  locale: Locale; // Current language
  t: (key: string) => string; // Translation helper
  dict: Translations; // Full translation object
}
```

### Registry Pattern

The registry maps types to components:

```typescript
const sectionRegistry: Record<SectionType, SectionComponent> = {
  features: FeaturesSection,
  testimonials: TestimonialsSection,
};
```
