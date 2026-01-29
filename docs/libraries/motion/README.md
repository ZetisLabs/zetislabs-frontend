# Motion Library

A comprehensive Framer Motion animation library with pre-built components, variants, and configuration presets.

## Installation

The library is located at `lib/motion/`. To use in another project:

1. Copy the `lib/motion/` folder
2. Install dependency: `npm install framer-motion`
3. Import and use

## Quick Start

```tsx
import { Reveal, FadeIn, motion, easings, transitions } from "@/lib/motion";

// Scroll-triggered reveal
<Reveal delay={0.2} direction="up">
  <h2>Animated content</h2>
</Reveal>

// Simple fade-in
<FadeIn delay={0.1}>
  <p>Fades in on mount</p>
</FadeIn>

// Direct motion usage with presets
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={transitions.smooth}
>
  Custom animation
</motion.div>
```

## Documentation

| Guide                         | Description                       |
| ----------------------------- | --------------------------------- |
| [Components](./components.md) | Ready-to-use animation components |
| [Variants](./variants.md)     | Animation variant functions       |
| [Configuration](./config.md)  | Timing, easing, and color presets |

## Components

| Component          | Purpose                         |
| ------------------ | ------------------------------- |
| `Reveal`           | Scroll-based reveal animation   |
| `FadeIn`           | Simple fade-in on mount         |
| `StaggerContainer` | Orchestrates staggered children |
| `StaggerItem`      | Child for StaggerContainer      |
| `ScrollFade`       | Scroll-driven opacity           |
| `HoverScale`       | Scale on hover                  |
| `PulseGlow`        | Pulsing glow effect             |
| `BreathingHalo`    | Smooth breathing animation      |

## Exports

```typescript
// Components
export { Reveal } from "./components/Reveal";
export { FadeIn } from "./components/FadeIn";
export { StaggerContainer, StaggerItem } from "./components/Stagger";
export { ScrollFade } from "./components/ScrollFade";
export { HoverScale } from "./components/HoverScale";
export { PulseGlow } from "./components/PulseGlow";
export { BreathingHalo } from "./components/BreathingHalo";

// Configuration
export {
  easings,
  springs,
  durations,
  transitions,
  viewportMargins,
  glowColors,
} from "./config";

// Variants
export {
  fadeInUp,
  fadeInDown,
  scaleIn,
  staggerContainer,
  staggerItem /* ... */,
} from "./variants";

// Re-exports from framer-motion
export {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
export {
  useReducedMotion,
  useAnimation,
  useMotionValue,
  useSpring,
} from "framer-motion";
export type { Variants, MotionProps } from "framer-motion";
```

## Key Features

### Hydration Safety

All components implement the `hasMounted` pattern to prevent React hydration mismatches:

```tsx
const [hasMounted, setHasMounted] = useState(false);
useEffect(() => {
  setHasMounted(true);
}, []);
const shouldAnimate = hasMounted && !prefersReducedMotion;
```

### Accessibility

Components respect `prefers-reduced-motion`:

```tsx
const prefersReducedMotion = useReducedMotion();
// Animations are disabled when user prefers reduced motion
```

### Composability

Components can be nested and combined:

```tsx
<StaggerContainer>
  <StaggerItem>
    <Reveal>
      <FadeIn>
        <HoverScale>
          <Card />
        </HoverScale>
      </FadeIn>
    </Reveal>
  </StaggerItem>
</StaggerContainer>
```

## Usage Patterns

### Page Entrance

```tsx
<FadeIn>
  <HeroSection />
</FadeIn>
<Reveal delay={0.3}>
  <FeaturesSection />
</Reveal>
```

### List Staggering

```tsx
<StaggerContainer>
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <Card {...item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Scroll Effects

```tsx
<ScrollFade startMargin="10%" endMargin="90%">
  <h1>Fades based on scroll position</h1>
</ScrollFade>
```

### Interactive Elements

```tsx
<HoverScale scale={1.05}>
  <Button>Hover me</Button>
</HoverScale>
```
