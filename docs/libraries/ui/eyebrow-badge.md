# EyebrowBadge

A small section label badge used above headings to provide context.

## Import

```tsx
import { EyebrowBadge } from "@/lib/ui";
```

## Usage

```tsx
<EyebrowBadge>What We Make</EyebrowBadge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Badge text |
| `className` | `string` | - | Additional CSS classes |

## Features

- Minimal, understated styling
- Glow effect ready (composable with PulseGlow)
- Consistent typography across sections

## Examples

### Basic Usage

```tsx
<section>
  <EyebrowBadge>What We Make</EyebrowBadge>
  <h2 className="text-4xl font-semibold mt-4">
    Intelligent Solutions
  </h2>
</section>
```

### With Glow Effect

```tsx
import { PulseGlow } from "@/lib/motion";

<PulseGlow>
  <EyebrowBadge>AI-Powered</EyebrowBadge>
</PulseGlow>
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
/* Typical eyebrow badge styling */
display: inline-block;
font-size: 0.875rem;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.05em;
color: var(--color-accent);
```

### Visual Structure

```
┌──────────────────┐
│  WHAT WE MAKE    │
└──────────────────┘
       ↓
┌─────────────────────────────────┐
│  Intelligent Solutions          │
│  (Main heading below)           │
└─────────────────────────────────┘
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
      <h2 className="text-4xl font-semibold mt-4">
        {t("home.section.title")}
      </h2>
    </Reveal>
    {/* Section content */}
  </div>
</section>
```

### Hero Eyebrow

In the hero section, often wrapped with a glow:

```tsx
<PulseGlow className="inline-block">
  <EyebrowBadge>AI-Powered Automation</EyebrowBadge>
</PulseGlow>
```

## Accessibility

- Semantic text element
- Proper color contrast
- Part of content flow (not purely decorative)
