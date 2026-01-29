# ReasonCard

A numbered benefit/reason card with background number animation and expanding underline.

## Import

```tsx
import { ReasonCard } from "@/lib/ui";
```

## Usage

```tsx
<ReasonCard
  index={0}
  title="Deep Expertise"
  description="Years of experience in AI and automation solutions."
/>
```

## Props

| Prop          | Type     | Default  | Description                                     |
| ------------- | -------- | -------- | ----------------------------------------------- |
| `index`       | `number` | required | Card number (0-based, displays as 01, 02, etc.) |
| `title`       | `string` | required | Card title                                      |
| `description` | `string` | required | Card description                                |
| `className`   | `string` | -        | Additional CSS classes                          |

## Features

### Background Number

Large semi-transparent number in the background:

- Index 0 → "01"
- Index 1 → "02"
- etc.

### Hover Effects

1. **Number Animation**: Background number fades and moves
2. **Underline Expansion**: Line under title expands from left
3. **Color Shift**: Text color transitions to accent

### Visual Structure

```
┌─────────────────────────────────────┐
│                                     │
│                              01     │  ← Large background number
│                                     │
│  Deep Expertise                     │
│  ────────────                       │  ← Expanding underline
│                                     │
│  Years of experience in AI and      │
│  automation solutions.              │
│                                     │
└─────────────────────────────────────┘
```

## Examples

### Reasons Grid

```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
  <ReasonCard
    index={0}
    title="Deep Expertise"
    description="Years of experience in AI and automation."
  />
  <ReasonCard
    index={1}
    title="Custom Solutions"
    description="Tailored to your specific needs."
  />
  <ReasonCard
    index={2}
    title="Ongoing Support"
    description="We're with you every step of the way."
  />
</div>
```

### With Staggered Animation

```tsx
import { StaggerContainer, StaggerItem } from "@/lib/motion";

<StaggerContainer>
  {reasons.map((reason, index) => (
    <StaggerItem key={reason.title}>
      <ReasonCard
        index={index}
        title={reason.title}
        description={reason.description}
      />
    </StaggerItem>
  ))}
</StaggerContainer>;
```

## Styling

### Background Number

```css
/* Pseudo-element styling */
font-size: 8rem;
opacity: 0.05;
position: absolute;
right: 1rem;
top: 50%;
transform: translateY(-50%);
```

### Underline

```css
/* Expanding underline */
height: 2px;
background: var(--color-accent);
transform-origin: left;
transform: scaleX(0); /* Expands to scaleX(1) on hover */
```

## Animations

### Hover State

```typescript
// Background number
whileHover={{
  opacity: 0.1,
  x: 10,
  transition: { duration: 0.3 }
}}

// Underline
whileHover={{
  scaleX: 1,
  transition: { duration: 0.3 }
}}

// Title color
whileHover={{
  color: "var(--color-accent)"
}}
```

### Animation Variants

Uses `expandWidth` variant from motion library:

```typescript
export const expandWidth = (from = 0, to = 1) => ({
  initial: { scaleX: from },
  animate: { scaleX: to },
});
```

## Accessibility

- Uses proper heading element for title
- Background number is decorative (aria-hidden)
- Sufficient color contrast in both states
- Focus styles match hover styles
