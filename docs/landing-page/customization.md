# Customization

This guide covers how to customize the landing page's appearance, animations, and behavior.

## Styling

### Theme Colors

Colors are defined in `app/globals.css`:

```css
:root {
  --color-background: /* dark background */;
  --color-foreground: /* light text */;
  --color-accent: rgba(58, 123, 213, 1); /* primary blue */
  --color-card: /* card background */;
  --color-border: /* border color */;
}
```

### Using Theme Colors

```tsx
<div className="bg-background text-foreground">
  <button className="bg-accent text-white">
    Primary Action
  </button>
</div>
```

### Glassmorphism Effects

```tsx
<div className="glass glass-card--inline">
  Glass effect card
</div>
```

## Fonts

### Primary Font: GeneralSans

```tsx
<h1 className="font-semibold">Heading</h1>
<p className="font-normal">Body text</p>
```

Available weights: `extralight` (200), `light` (300), `normal` (400), `medium` (500), `semibold` (600), `bold` (700)

### Secondary Font: IBM Plex Sans

Used for specific UI elements and code.

## Animations

### Animation Configuration

Edit `lib/motion/config.ts`:

```typescript
// Durations
export const durations = {
  fast: 0.3,      // Quick interactions
  medium: 0.5,    // Standard transitions
  slow: 0.7,      // Emphasis
  reveal: 0.7,    // Scroll-based reveals
};

// Easing curves
export const easings = {
  smooth: [0.16, 1, 0.3, 1],      // Apple-style
  easeOut: [0, 0, 0.58, 1],
  breathing: [0.25, 0.1, 0.25, 1], // Organic feel
};

// Spring presets
export const springs = {
  gentle: { stiffness: 100, damping: 15 },
  snappy: { stiffness: 300, damping: 20 },
  bouncy: { stiffness: 400, damping: 10 },
};
```

### Glow Colors

```typescript
export const glowColors = {
  accent: "rgba(58, 123, 213, 0.7)",
  halo: "rgba(90, 130, 255, 0.12)",
  intense: "rgba(90, 130, 255, 0.14)",
};
```

### Viewport Margins (Scroll Triggers)

```typescript
export const viewportMargins = {
  default: "-16% 0px -15% 0px", // Standard reveal
  early: "-10% 0px -10% 0px",   // Trigger earlier
  late: "-25% 0px -25% 0px",    // Trigger later
};
```

## Component Customization

### CTAButton Variants

```tsx
// Primary: Blue glow, light sweep animation
<CTAButton variant="primary" href="/contact">
  Get Started
</CTAButton>

// Secondary: Glass effect, chevron icon
<CTAButton variant="secondary" href="#examples">
  See Examples
</CTAButton>
```

### FeatureCard Customization

```tsx
<FeatureCard
  title="AI Agents"
  subtitle="The Intelligence."
  description="Custom AI agents..."
  cta="Learn more"
/>
```

Hover effects:
- Scale up (1.02)
- CTA container slides up
- Emoji/icon slides in

### ReasonCard Customization

```tsx
<ReasonCard
  index={0}  // Determines background number (01, 02, etc.)
  title="Deep Expertise"
  description="Years of experience..."
/>
```

Hover effects:
- Background number fades and moves
- Underline expands
- Text color shifts

## Section-Specific Customization

### Hero Section

Edit `components/HeroSection.tsx`:

- **Scroll effects:** Modify `useTransform` values
- **Badge glow:** Adjust `PulseGlow` parameters
- **CTA arrangement:** Update flex layout

### Stack Section

Edit `components/StackSection.tsx`:

- **Logo positions:** Adjust constellation layout
- **Parallax depth:** Modify blur and scale based on Y position
- **Animation timing:** Adjust stagger delays

### Use Cases Section

Edit `components/UseCasesSection.tsx`:

- **Sticky behavior:** Adjust scroll trigger points
- **Slide transitions:** Modify animation variants
- **Carousel:** Customize project showcase

## Layout Customization

### Header

Edit `components/layout/Header.tsx`:

- **Navigation items:** Add/remove links
- **Logo:** Replace SVG in public folder
- **Glow effects:** Adjust hover animations

### Footer

Edit `components/layout/Footer.tsx`:

- **Links:** Update footer navigation
- **Copyright:** Modify text in translations
- **Layout:** Adjust grid/flex arrangement

## Responsive Design

Use Tailwind responsive prefixes:

```tsx
<div className="px-4 md:px-8 lg:px-12">
  <h1 className="text-2xl md:text-4xl lg:text-6xl">
    Responsive Heading
  </h1>
</div>
```

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Accessibility

### Reduced Motion

All animations respect `prefers-reduced-motion`:

```tsx
const prefersReducedMotion = useReducedMotion();
const shouldAnimate = hasMounted && !prefersReducedMotion;
```

### ARIA Labels

```tsx
<button aria-label="Close menu">
  <CloseIcon />
</button>
```

### Semantic HTML

Use proper semantic elements:

```tsx
<header>...</header>
<main>...</main>
<section>...</section>
<footer>...</footer>
```
