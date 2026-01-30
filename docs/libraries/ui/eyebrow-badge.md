# EyebrowBadge

A small section label badge in Swiss International Typographic Style, used above headings to provide context.

## Import

```tsx
import { EyebrowBadge } from "@/lib/ui";
```

## Usage

```tsx
<EyebrowBadge>What We Make</EyebrowBadge>
```

## Props

| Prop        | Type        | Default  | Description            |
| ----------- | ----------- | -------- | ---------------------- |
| `children`  | `ReactNode` | required | Badge text             |
| `className` | `string`    | -        | Additional CSS classes |

## Features

- Swiss International Typographic Style design
- Geometric vertical rule accent
- Wide letter-spacing (0.25em)
- Sharp edges with subtle border-radius
- Minimal, static styling (no hover effects)

## Design Principles

The EyebrowBadge follows Swiss design principles:

- **Sharp geometry**: Rectangular shape with minimal border-radius
- **Vertical rule accent**: Small blue line as a geometric element
- **Wide tracking**: Large letter-spacing for typography emphasis
- **Minimalism**: No animations or hover effects

## Examples

### Basic Usage

```tsx
<section>
  <EyebrowBadge>What We Make</EyebrowBadge>
  <h2 className="mt-4 text-4xl font-semibold">Intelligent Solutions</h2>
</section>
```

### With Reveal Animation

```tsx
import { Reveal } from "@/lib/motion";

<Reveal delay={0.1}>
  <EyebrowBadge>Why ZetisLabs</EyebrowBadge>
</Reveal>
<Reveal delay={0.2}>
  <h2>Built Different</h2>
</Reveal>
```

## Styling

### Default Styles

```css
/* Swiss typographic styling */
display: inline-flex;
align-items: center;
gap: 0.625rem;
padding: 0.25rem 0.5rem;
border: 1px solid var(--color-border) / 40%;
border-radius: 0.125rem;
background: var(--color-background);

/* Typography */
font-size: 9px;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.25em;
color: var(--color-foreground) / 60%;
```

### Visual Structure

```
┌─────────────────────────────┐
│ |  WHAT WE MAKE             │
└─────────────────────────────┘
  ↑
  Geometric vertical rule (accent color)
```

## Usage Patterns

### Section Header Pattern

The standard pattern for section headers:

```tsx
<section className="py-24">
  <div className="container mx-auto px-6">
    <Reveal>
      <EyebrowBadge>{t("home.section.eyebrow")}</EyebrowBadge>
    </Reveal>
    <Reveal delay={0.1}>
      <h2 className="mt-4 text-4xl font-semibold">{t("home.section.title")}</h2>
    </Reveal>
    {/* Section content */}
  </div>
</section>
```

### Hero Eyebrow

In the hero section:

```tsx
<EyebrowBadge>{t("home.hero.eyebrow")}</EyebrowBadge>
```

## Accessibility

- Semantic text element
- Proper color contrast
- Part of content flow (not purely decorative)
- Geometric accent is marked as `aria-hidden`
