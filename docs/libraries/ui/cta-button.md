# CTAButton

A premium call-to-action button with two distinct variants: primary (prominent, glowing) and secondary (subtle, glass effect).

## Import

```tsx
import { CTAButton } from "@/lib/ui";
```

## Usage

### Primary Variant

The primary variant features a blue glow effect and animated light sweep. Use for main actions.

```tsx
<CTAButton href="/contact" variant="primary">
  Get Started
</CTAButton>
```

**Features:**

- Blue accent glow
- Animated light sweep on hover
- Geometric accent element
- High contrast

### Secondary Variant

The secondary variant has a glass effect with chevron icon. Use for secondary actions.

```tsx
<CTAButton href="#examples" variant="secondary">
  See Examples
</CTAButton>
```

**Features:**

- Glass/transparent background
- Chevron arrow icon
- Subtle hover lift
- Lower visual weight

## Props

| Prop        | Type                         | Default     | Description                                 |
| ----------- | ---------------------------- | ----------- | ------------------------------------------- |
| `href`      | `string`                     | required    | Link destination                            |
| `variant`   | `"primary"` \| `"secondary"` | `"primary"` | Button style                                |
| `children`  | `ReactNode`                  | required    | Button text                                 |
| `showArrow` | `boolean`                    | `true`      | Show arrow (primary) or chevron (secondary) |
| `className` | `string`                     | -           | Additional CSS classes                      |

## Examples

### Button Pair

Common pattern with primary and secondary actions:

```tsx
<div className="flex gap-4">
  <CTAButton href="/contact" variant="primary">
    Get Started
  </CTAButton>
  <CTAButton href="#examples" variant="secondary">
    See Examples
  </CTAButton>
</div>
```

### Full Width

```tsx
<CTAButton href="/contact" variant="primary" className="w-full">
  Contact Us
</CTAButton>
```

### Without Arrow

```tsx
<CTAButton href="/about" variant="primary" showArrow={false}>
  About Us
</CTAButton>
```

## Styling

### Primary Button Structure

```
┌─────────────────────────────────────┐
│  [Geometric Accent]                 │
│                                     │
│     Button Text    →                │
│                                     │
│  [Glass Overlay with Light Sweep]   │
└─────────────────────────────────────┘
     └── Glow Shadow ──┘
```

### Secondary Button Structure

```
┌─────────────────────────────────────┐
│                                     │
│     Button Text           ›         │
│                                     │
└─────────────────────────────────────┘
     └── Glass Background ──┘
```

## Animations

### Primary

- **Light Sweep**: Diagonal gradient moves across on hover
- **Scale**: Subtle scale up (1.02) on hover
- **Glow Pulse**: Box shadow pulses subtly

### Secondary

- **Lift**: Moves up slightly on hover
- **Chevron**: Animates right on hover
- **Background**: Slight opacity change

## Customization

Override styles with Tailwind classes:

```tsx
<CTAButton
  href="/contact"
  variant="primary"
  className="bg-green-500 hover:bg-green-600"
>
  Custom Color
</CTAButton>
```

## Accessibility

- Uses `<a>` tag for proper link behavior
- Focus states for keyboard navigation
- Sufficient color contrast
- Descriptive text content
