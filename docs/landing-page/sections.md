# Sections System

The landing page uses a dynamic section composition system that allows reordering, enabling/disabling, and adding sections without code changes.

## How It Works

### 1. Section Configuration

Sections are defined in translation files:

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

### 2. Section Registry

Each section type maps to a component in `lib/sections/registry.ts`:

```typescript
export const sectionRegistry: Record<SectionType, SectionComponent> = {
  whatWeMake: WhatWeMakeSection,
  stack: StackSectionWrapper,
  useCases: UseCasesSectionWrapper,
  whyZetisLabs: WhyZetisLabsSection,
};
```

### 3. Section Renderer

The `SectionRenderer` reads the config and renders components:

```tsx
<SectionRenderer
  sections={sections} // From translation config
  locale={locale}
  t={t}
  dict={dict}
/>
```

## Available Section Types

| Type           | Component           | Description                            |
| -------------- | ------------------- | -------------------------------------- |
| `whatWeMake`   | WhatWeMakeSection   | 3-column feature cards grid            |
| `stack`        | StackSection        | Logo constellation with depth parallax |
| `useCases`     | UseCasesSection     | Sticky scroll with project carousel    |
| `whyZetisLabs` | WhyZetisLabsSection | Numbered reason cards                  |

## Reordering Sections

Change the order in the `sections` array:

```json
{
  "home": {
    "sections": [
      { "type": "whyZetisLabs", "id": "why-zetislabs" },
      { "type": "whatWeMake", "id": "what-we-make" },
      { "type": "stack", "id": "stack-integration" }
    ]
  }
}
```

## Disabling a Section

Add `enabled: false`:

```json
{
  "home": {
    "sections": [
      { "type": "whatWeMake", "id": "what-we-make" },
      { "type": "stack", "id": "stack-integration", "enabled": false },
      { "type": "useCases", "id": "use-cases" }
    ]
  }
}
```

## Adding a New Section

### Step 1: Create the Component

```tsx
// components/NewSection.tsx
"use client";

import { Reveal } from "@/lib/motion";
import { EyebrowBadge } from "@/lib/ui";

type Props = {
  locale: string;
  t: (key: string) => string;
};

export function NewSection({ locale, t }: Props) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <Reveal>
          <EyebrowBadge>{t("home.newSection.eyebrow")}</EyebrowBadge>
          <h2 className="mt-4 text-4xl font-semibold">
            {t("home.newSection.title")}
          </h2>
        </Reveal>
        {/* Section content */}
      </div>
    </section>
  );
}
```

### Step 2: Add to Registry

```typescript
// lib/sections/registry.ts
import { NewSection } from "@/components/NewSection";

export const sectionRegistry: Record<SectionType, SectionComponent> = {
  // ... existing sections
  newSection: NewSection,
};
```

### Step 3: Update Types

```typescript
// lib/sections/types.ts
export type SectionType =
  | "whatWeMake"
  | "stack"
  | "useCases"
  | "whyZetisLabs"
  | "newSection"; // Add new type
```

### Step 4: Add Content

```json
// en.json
{
  "home": {
    "sections": [
      // ... existing sections
      { "type": "newSection", "id": "new-section" }
    ],
    "newSection": {
      "eyebrow": "New Section",
      "title": "Section Title"
    }
  }
}
```

### Step 5: Add French Translation

```json
// fr.json
{
  "home": {
    "sections": [
      // ... same order as en.json
      { "type": "newSection", "id": "new-section" }
    ],
    "newSection": {
      "eyebrow": "Nouvelle Section",
      "title": "Titre de la Section"
    }
  }
}
```

## Section Props

All sections receive these props:

```typescript
interface SectionProps {
  locale: Locale; // Current language
  t: (key: string) => string; // Translation helper
  dict: Translations; // Full translation object
}
```

## Best Practices

1. **Keep sections self-contained** - Each section should have its own content keys
2. **Use consistent patterns** - Follow the eyebrow/title/content structure
3. **Add animations** - Use `Reveal` and `FadeIn` from `@/lib/motion`
4. **Support both locales** - Always add translations to both files
5. **Test reordering** - Ensure sections work in any order
