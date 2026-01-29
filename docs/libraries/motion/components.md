# Motion Components

Ready-to-use animation components that handle common animation patterns.

## Reveal

Scroll-triggered reveal animation. Content animates when scrolled into view.

```tsx
import { Reveal } from "@/lib/motion";

<Reveal delay={0.2} direction="up" once>
  <h2>This reveals when scrolled into view</h2>
</Reveal>;
```

### Props

| Prop        | Type               | Default      | Description                  |
| ----------- | ------------------ | ------------ | ---------------------------- |
| `children`  | `ReactNode`        | required     | Content to reveal            |
| `delay`     | `number`           | `0`          | Animation delay in seconds   |
| `direction` | `"up"` \| `"down"` | `"up"`       | Direction to animate from    |
| `once`      | `boolean`          | `true`       | Animate only once            |
| `distance`  | `number`           | `30`         | Distance to travel in pixels |
| `margin`    | `string`           | `"-16% 0px"` | Viewport margin for trigger  |
| `className` | `string`           | -            | Additional CSS classes       |

### Examples

```tsx
// Basic reveal
<Reveal>
  <Card />
</Reveal>

// Delayed reveal
<Reveal delay={0.3}>
  <Card />
</Reveal>

// Reveal from below
<Reveal direction="up" distance={50}>
  <Card />
</Reveal>

// Trigger earlier
<Reveal margin="-10% 0px">
  <Card />
</Reveal>
```

---

## FadeIn

Simple fade-in animation on mount.

```tsx
import { FadeIn } from "@/lib/motion";

<FadeIn delay={0.1}>
  <p>This fades in when mounted</p>
</FadeIn>;
```

### Props

| Prop        | Type        | Default  | Description            |
| ----------- | ----------- | -------- | ---------------------- |
| `children`  | `ReactNode` | required | Content to fade in     |
| `delay`     | `number`    | `0`      | Animation delay        |
| `duration`  | `number`    | `0.5`    | Animation duration     |
| `y`         | `number`    | `20`     | Vertical offset        |
| `className` | `string`    | -        | Additional CSS classes |

### Examples

```tsx
// Quick fade
<FadeIn duration={0.2}>
  <Alert />
</FadeIn>

// Delayed fade with larger movement
<FadeIn delay={0.5} y={40}>
  <Section />
</FadeIn>
```

---

## StaggerContainer & StaggerItem

Orchestrate staggered animations for lists.

```tsx
import { StaggerContainer, StaggerItem } from "@/lib/motion";

<StaggerContainer staggerDelay={0.1}>
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <Card {...item} />
    </StaggerItem>
  ))}
</StaggerContainer>;
```

### StaggerContainer Props

| Prop           | Type        | Default  | Description             |
| -------------- | ----------- | -------- | ----------------------- |
| `children`     | `ReactNode` | required | StaggerItem children    |
| `staggerDelay` | `number`    | `0.1`    | Delay between items     |
| `initialDelay` | `number`    | `0`      | Delay before first item |
| `className`    | `string`    | -        | Additional CSS classes  |

### StaggerItem Props

| Prop        | Type        | Default  | Description            |
| ----------- | ----------- | -------- | ---------------------- |
| `children`  | `ReactNode` | required | Content to animate     |
| `className` | `string`    | -        | Additional CSS classes |

### Examples

```tsx
// Fast stagger
<StaggerContainer staggerDelay={0.05}>
  {/* items */}
</StaggerContainer>

// Delayed start
<StaggerContainer initialDelay={0.5} staggerDelay={0.1}>
  {/* items */}
</StaggerContainer>
```

---

## ScrollFade

Scroll-driven opacity animation.

```tsx
import { ScrollFade } from "@/lib/motion";

<ScrollFade startMargin="0%" endMargin="50%">
  <h1>Fades as you scroll</h1>
</ScrollFade>;
```

### Props

| Prop          | Type        | Default  | Description                   |
| ------------- | ----------- | -------- | ----------------------------- |
| `children`    | `ReactNode` | required | Content to fade               |
| `startMargin` | `string`    | `"0%"`   | Scroll position to start fade |
| `endMargin`   | `string`    | `"100%"` | Scroll position to end fade   |
| `className`   | `string`    | -        | Additional CSS classes        |

---

## HoverScale

Scale animation on hover.

```tsx
import { HoverScale } from "@/lib/motion";

<HoverScale scale={1.05}>
  <Button>Hover me</Button>
</HoverScale>;
```

### Props

| Prop        | Type        | Default  | Description            |
| ----------- | ----------- | -------- | ---------------------- |
| `children`  | `ReactNode` | required | Content to scale       |
| `scale`     | `number`    | `1.02`   | Scale factor on hover  |
| `className` | `string`    | -        | Additional CSS classes |

---

## PulseGlow

Pulsing glow effect for attention.

```tsx
import { PulseGlow } from "@/lib/motion";

<PulseGlow>
  <Badge>New</Badge>
</PulseGlow>;
```

### Props

| Prop        | Type        | Default  | Description            |
| ----------- | ----------- | -------- | ---------------------- |
| `children`  | `ReactNode` | required | Content to glow        |
| `className` | `string`    | -        | Additional CSS classes |

---

## BreathingHalo

Smooth breathing/pulsing halo effect.

```tsx
import { BreathingHalo } from "@/lib/motion";

<BreathingHalo>
  <Avatar />
</BreathingHalo>;
```

### Props

| Prop        | Type        | Default  | Description            |
| ----------- | ----------- | -------- | ---------------------- |
| `children`  | `ReactNode` | required | Content to wrap        |
| `className` | `string`    | -        | Additional CSS classes |

---

## Composition

Components can be composed for complex effects:

```tsx
<Reveal delay={0.2}>
  <HoverScale scale={1.03}>
    <PulseGlow>
      <FeatureCard {...props} />
    </PulseGlow>
  </HoverScale>
</Reveal>
```

## Hydration Safety

All components use this pattern:

```tsx
const [hasMounted, setHasMounted] = useState(false);
useEffect(() => {
  setHasMounted(true);
}, []);
const shouldAnimate = hasMounted && !prefersReducedMotion;

// Render same structure, conditionally animate
return (
  <motion.div animate={shouldAnimate ? animatedState : undefined}>
    {children}
  </motion.div>
);
```

This ensures:

1. Server and client render the same HTML
2. Animations only run after hydration
3. Reduced motion preference is respected
