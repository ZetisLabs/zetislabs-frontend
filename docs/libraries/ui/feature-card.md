# FeatureCard

A feature showcase card with hover animations, gradient overlay, and CTA reveal.

## Import

```tsx
import { FeatureCard } from "@/lib/ui";
```

## Usage

```tsx
<FeatureCard
  title="AI Agents"
  subtitle="The Intelligence."
  description="Custom AI agents that understand your business context and automate complex decisions."
  cta="Learn more"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Card title |
| `subtitle` | `string` | required | Emphasized subtitle |
| `description` | `string` | required | Card description |
| `cta` | `string` | required | Call-to-action text |
| `className` | `string` | - | Additional CSS classes |

## Features

### Hover Effects

1. **Scale**: Card scales up to 1.02
2. **CTA Reveal**: CTA container slides up from bottom
3. **Emoji Slide**: Icon/emoji slides in from left
4. **Gradient**: Overlay gradient intensifies

### Visual Structure

```
┌─────────────────────────────────────┐
│                                     │
│  Title                              │
│  Subtitle (emphasized)              │
│                                     │
│  Description text that explains     │
│  the feature in detail...           │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ [emoji]  Learn more    →    │    │  ← Appears on hover
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

## Examples

### Feature Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <FeatureCard
    title="AI Agents"
    subtitle="The Intelligence."
    description="Custom AI agents that understand your business."
    cta="Learn more"
  />
  <FeatureCard
    title="Automations"
    subtitle="The Efficiency."
    description="End-to-end automation workflows."
    cta="Discover"
  />
  <FeatureCard
    title="Integrations"
    subtitle="The Connection."
    description="Seamless connections between your tools."
    cta="Explore"
  />
</div>
```

### With Animation Wrapper

```tsx
import { Reveal } from "@/lib/motion";

<Reveal delay={0.2}>
  <FeatureCard
    title="AI Agents"
    subtitle="The Intelligence."
    description="Custom AI agents..."
    cta="Learn more"
  />
</Reveal>
```

## Styling

### Card Background

- Semi-transparent with glass effect
- Gradient overlay on bottom half
- Border with subtle accent

### Typography

- **Title**: Large, semi-bold
- **Subtitle**: Medium, muted color
- **Description**: Normal weight, readable size

### CTA Container

- Appears from bottom on hover
- Contains emoji and arrow
- Glass background effect

## Animations

All animations use Framer Motion with these characteristics:

- **Duration**: 0.3s for hover effects
- **Easing**: Smooth cubic-bezier
- **Stagger**: Elements animate sequentially

### Animation Variants

```typescript
// Scale on hover
whileHover={{ scale: 1.02 }}

// CTA container
variants={{
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}}

// Emoji slide
variants={{
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
}}
```

## Accessibility

- Proper heading hierarchy
- Sufficient color contrast
- Hover effects don't hide critical content
- CTA is decorative (cards can be wrapped in links)
