# Motion Configuration

Pre-defined timing, easing, and visual presets for consistent animations.

## Import

```tsx
import {
  easings,
  springs,
  durations,
  transitions,
  viewportMargins,
  glowColors,
} from "@/lib/motion";
```

## Easing Curves

Cubic bezier curves for smooth animations.

```typescript
export const easings = {
  // Apple-style smooth easing
  smooth: [0.16, 1, 0.3, 1],

  // Standard ease-out
  easeOut: [0, 0, 0.58, 1],

  // Organic breathing feel
  breathing: [0.25, 0.1, 0.25, 1],

  // Symmetric for reversible animations
  easeInOut: [0.42, 0, 0.58, 1],
};
```

### Usage

```tsx
<motion.div animate={{ opacity: 1 }} transition={{ ease: easings.smooth }}>
  Smooth animation
</motion.div>
```

## Spring Presets

Physics-based spring configurations.

```typescript
export const springs = {
  // Subtle bounce, elegant feel
  gentle: { stiffness: 100, damping: 15 },

  // Quick, responsive
  snappy: { stiffness: 300, damping: 20 },

  // Playful, energetic
  bouncy: { stiffness: 400, damping: 10 },
};
```

### Usage

```tsx
<motion.div
  animate={{ scale: 1 }}
  transition={{ type: "spring", ...springs.snappy }}
>
  Snappy spring
</motion.div>
```

## Durations

Standardized timing values in seconds.

```typescript
export const durations = {
  // Micro-interactions (button clicks, toggles)
  fast: 0.3,

  // Standard transitions
  medium: 0.5,

  // Emphasis, important reveals
  slow: 0.7,

  // Scroll-based reveals
  reveal: 0.7,

  // Logo/brand animations
  logo: 1.0,
};
```

### Usage

```tsx
<motion.div animate={{ opacity: 1 }} transition={{ duration: durations.fast }}>
  Quick fade
</motion.div>
```

## Transition Presets

Complete transition configurations.

```typescript
export const transitions = {
  // Scroll reveal animations
  reveal: {
    duration: durations.reveal,
    ease: easings.smooth,
  },

  // Hover/interactive states
  hover: {
    duration: durations.fast,
    ease: easings.easeOut,
  },

  // General smooth transitions
  smooth: {
    duration: durations.medium,
    ease: easings.smooth,
  },

  // Staggered children
  stagger: {
    staggerChildren: 0.1,
    delayChildren: 0.2,
  },

  // Logo/brand animations
  logo: {
    duration: durations.logo,
    ease: easings.breathing,
  },
};
```

### Usage

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={transitions.smooth}
>
  Smooth entrance
</motion.div>

// Stagger children
<motion.div
  variants={{
    visible: { transition: transitions.stagger }
  }}
  initial="hidden"
  animate="visible"
>
  {children}
</motion.div>
```

## Viewport Margins

Scroll trigger points for reveal animations.

```typescript
export const viewportMargins = {
  // Standard reveal (element ~16% into viewport)
  default: "-16% 0px -15% 0px",

  // Trigger earlier (element ~10% into viewport)
  early: "-10% 0px -10% 0px",

  // Trigger later (element ~25% into viewport)
  late: "-25% 0px -25% 0px",
};
```

### Usage

```tsx
<motion.div
  whileInView="visible"
  viewport={{
    once: true,
    margin: viewportMargins.early,
  }}
>
  Reveals earlier
</motion.div>
```

## Glow Colors

Accent colors for glow effects.

```typescript
export const glowColors = {
  // Primary accent glow
  accent: "rgba(58, 123, 213, 0.7)",

  // Soft background halo
  halo: "rgba(90, 130, 255, 0.12)",

  // Intense emphasis
  intense: "rgba(90, 130, 255, 0.14)",
};
```

### Usage

```tsx
<motion.div
  style={{
    boxShadow: `0 0 30px ${glowColors.accent}`,
  }}
>
  Glowing element
</motion.div>
```

## Complete Example

Combining all presets:

```tsx
import {
  motion,
  easings,
  durations,
  transitions,
  viewportMargins,
  glowColors,
} from "@/lib/motion";

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{
    opacity: 1,
    y: 0,
    boxShadow: `0 0 40px ${glowColors.accent}`,
  }}
  viewport={{
    once: true,
    margin: viewportMargins.default,
  }}
  transition={transitions.reveal}
  whileHover={{
    scale: 1.02,
    transition: { duration: durations.fast, ease: easings.easeOut },
  }}
>
  Fully configured animation
</motion.div>;
```

## Customizing

Extend or override presets:

```tsx
// Create custom transition
const customTransition = {
  ...transitions.smooth,
  duration: 0.8,
};

// Create custom spring
const customSpring = {
  ...springs.gentle,
  damping: 20,
};
```
