# UI Library

A collection of premium UI components with glassmorphism effects, hover animations, and modern aesthetics.

## Installation

The library is located at `lib/ui/`. To use in another project:

1. Copy the `lib/ui/` folder
2. Install dependencies: `npm install framer-motion`
3. Ensure Tailwind CSS is configured

## Components

| Component                          | Description            | Documentation                  |
| ---------------------------------- | ---------------------- | ------------------------------ |
| [CTAButton](./cta-button.md)       | Call-to-action buttons | Primary/secondary variants     |
| [FeatureCard](./feature-card.md)   | Feature showcase cards | Hover animations, emoji reveal |
| [ReasonCard](./reason-card.md)     | Numbered benefit cards | Background number animation    |
| [EyebrowBadge](./eyebrow-badge.md) | Section label badges   | Swiss typographic style        |
| ErrorBoundary                      | Error boundary         | Development-friendly fallback  |

## Quick Usage

```tsx
import { CTAButton, FeatureCard, ReasonCard, EyebrowBadge } from "@/lib/ui";

// Button
<CTAButton href="/contact" variant="primary">
  Get Started
</CTAButton>

// Feature Card
<FeatureCard
  title="AI Agents"
  subtitle="The Intelligence."
  description="Custom AI agents that understand your business."
  cta="Learn more"
/>

// Reason Card
<ReasonCard
  index={0}
  title="Deep Expertise"
  description="Years of experience in AI and automation."
/>

// Badge
<EyebrowBadge>What We Make</EyebrowBadge>
```

## Exports

```typescript
// lib/ui/index.ts
export { CTAButton } from "./components/CTAButton";
export { FeatureCard } from "./components/FeatureCard";
export { ReasonCard } from "./components/ReasonCard";
export { EyebrowBadge } from "./components/EyebrowBadge";
export { ErrorBoundary } from "./components/ErrorBoundary";
```

## Design System

### Colors

Components use CSS custom properties:

- `--color-accent`: Primary blue (buttons, highlights)
- `--color-foreground`: Text color
- `--color-border`: Border color

### Effects

- **Glassmorphism**: Semi-transparent backgrounds with backdrop blur
- **Glow**: Accent-colored box shadows
- **Light Sweep**: Animated gradient overlay

### Typography

- Headings: GeneralSans font
- Body: System font stack

## Customization

Components accept standard HTML props (`className`, etc.) for customization:

```tsx
<CTAButton href="/contact" variant="primary" className="w-full">
  Full Width Button
</CTAButton>
```
