# Creating Sections

This guide walks through adding a new section type to the sections library.

## Overview

Adding a new section requires four steps:

1. Create the section component
2. Add the type definition
3. Register the component
4. Configure in translation files

## Step 1: Create the Component

Create a new section component in `components/`:

```tsx
// components/TestimonialsSection.tsx
"use client";

import { Reveal } from "@/lib/motion";
import { EyebrowBadge } from "@/lib/ui";
import type { SectionProps } from "@/lib/sections";

export function TestimonialsSection({ locale, t, dict }: SectionProps) {
  const testimonials = dict.home.testimonials.items;

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6">
        {/* Eyebrow + Title */}
        <Reveal>
          <EyebrowBadge>{t("home.testimonials.eyebrow")}</EyebrowBadge>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 mb-12 text-4xl font-semibold">
            {t("home.testimonials.title")}
          </h2>
        </Reveal>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Object.entries(testimonials).map(([key, testimonial], index) => (
            <Reveal key={key} delay={0.2 + index * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="mb-4 text-foreground/80">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Component Requirements

1. **Accept SectionProps**: `{ locale, t, dict }`
2. **Use translations**: Access content via `t()` or `dict`
3. **Add animations**: Use `Reveal`, `FadeIn` from `@/lib/motion`
4. **Follow patterns**: Eyebrow → Title → Content structure

## Step 2: Add Type Definition

Update `lib/sections/types.ts`:

```typescript
// Add to SectionType union
export type SectionType =
  | "whatWeMake"
  | "stack"
  | "useCases"
  | "whyZetisLabs"
  | "testimonials"; // Add new type
```

## Step 3: Register Component

Update `lib/sections/registry.ts`:

```typescript
import { TestimonialsSection } from "@/components/TestimonialsSection";

export const sectionRegistry: Record<SectionType, SectionComponent> = {
  whatWeMake: WhatWeMakeSection,
  stack: StackSectionWrapper,
  useCases: UseCasesSectionWrapper,
  whyZetisLabs: WhyZetisLabsSection,
  testimonials: TestimonialsSection, // Add registration
};
```

## Step 4: Configure in Translations

### English (`en.json`)

```json
{
  "home": {
    "sections": [
      { "type": "whatWeMake", "id": "what-we-make" },
      { "type": "testimonials", "id": "testimonials" },
      { "type": "whyZetisLabs", "id": "why-zetislabs" }
    ],
    "testimonials": {
      "eyebrow": "Testimonials",
      "title": "What Our Clients Say",
      "items": {
        "client1": {
          "quote": "ZetisLabs transformed our workflow...",
          "name": "John Doe",
          "role": "CTO at TechCorp"
        },
        "client2": {
          "quote": "The AI agents are incredible...",
          "name": "Jane Smith",
          "role": "CEO at StartupXYZ"
        }
      }
    }
  }
}
```

### French (`fr.json`)

```json
{
  "home": {
    "sections": [
      { "type": "whatWeMake", "id": "what-we-make" },
      { "type": "testimonials", "id": "testimonials" },
      { "type": "whyZetisLabs", "id": "why-zetislabs" }
    ],
    "testimonials": {
      "eyebrow": "Temoignages",
      "title": "Ce Que Disent Nos Clients",
      "items": {
        "client1": {
          "quote": "ZetisLabs a transforme notre flux de travail...",
          "name": "John Doe",
          "role": "CTO chez TechCorp"
        },
        "client2": {
          "quote": "Les agents IA sont incroyables...",
          "name": "Jane Smith",
          "role": "CEO chez StartupXYZ"
        }
      }
    }
  }
}
```

## Advanced: Wrapper Components

For sections with complex state or effects, create a wrapper:

```tsx
// components/TestimonialsSectionWrapper.tsx
"use client";

import { TestimonialsSection } from "./TestimonialsSection";
import type { SectionProps } from "@/lib/sections";

// Wrapper handles client-side concerns
export function TestimonialsSectionWrapper(props: SectionProps) {
  // Add hooks, state, effects here
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TestimonialsSection
      {...props}
      activeIndex={activeIndex}
      onIndexChange={setActiveIndex}
    />
  );
}
```

Register the wrapper instead:

```typescript
testimonials: TestimonialsSectionWrapper,
```

## Section Patterns

### Standard Section

```tsx
<section className="py-24">
  <div className="container mx-auto px-6">
    <Reveal>
      <EyebrowBadge>{eyebrow}</EyebrowBadge>
    </Reveal>
    <Reveal delay={0.1}>
      <h2>{title}</h2>
    </Reveal>
    {/* Content */}
  </div>
</section>
```

### Grid Section

```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
  {items.map((item, i) => (
    <Reveal key={item.id} delay={0.2 + i * 0.1}>
      <Card {...item} />
    </Reveal>
  ))}
</div>
```

### Sticky Scroll Section

```tsx
const { scrollYProgress } = useScroll({ target: ref });

<section ref={ref} className="relative h-[300vh]">
  <div className="sticky top-0 h-screen">{/* Scroll-driven content */}</div>
</section>;
```

## Testing

1. **Check both locales**: Visit `/en` and `/fr`
2. **Test reordering**: Move section in `sections` array
3. **Test disabling**: Add `"enabled": false`
4. **Check animations**: Scroll triggers should work
5. **Verify responsive**: Test on mobile

## Best Practices

1. **Self-contained content**: Each section has its own translation keys
2. **Consistent animations**: Use `Reveal` for scroll triggers
3. **Accessibility**: Proper heading hierarchy
4. **Performance**: Lazy load heavy components
5. **Type safety**: Use `SectionProps` type
