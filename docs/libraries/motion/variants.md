# Animation Variants

Pre-built animation variant functions for common patterns.

## Import

```tsx
import {
  fadeInUp,
  fadeInDown,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
  expandWidth,
} from "@/lib/motion";
```

## Entrance Animations

### fadeInUp

Fade in while sliding up.

```tsx
const variants = fadeInUp(0.2); // 0.2s delay

<motion.div initial="hidden" animate="visible" variants={variants}>
  Content
</motion.div>;
```

**Signature:** `fadeInUp(delay?: number)`

### fadeInDown

Fade in while sliding down.

```tsx
const variants = fadeInDown(0.1);

<motion.div variants={variants} initial="hidden" animate="visible">
  Content
</motion.div>;
```

**Signature:** `fadeInDown(delay?: number)`

### scaleIn

Fade in with scale (0.95 → 1).

```tsx
const variants = scaleIn(0.3);

<motion.div variants={variants} initial="hidden" animate="visible">
  Content
</motion.div>;
```

**Signature:** `scaleIn(delay?: number)`

### slideInLeft / slideInRight

Slide in from left or right.

```tsx
const leftVariants = slideInLeft(50); // 50px distance
const rightVariants = slideInRight(50);

<motion.div variants={leftVariants} initial="hidden" animate="visible">
  From left
</motion.div>;
```

**Signature:** `slideInLeft(distance?: number)`, `slideInRight(distance?: number)`

### smoothEntrance

Apple-style smooth entrance (1.2s duration).

```tsx
const variants = smoothEntrance(0.2);

<motion.div variants={variants} initial="hidden" animate="visible">
  Premium feel
</motion.div>;
```

**Signature:** `smoothEntrance(delay?: number)`

---

## Container Animations

### staggerContainer

Orchestrates staggered child animations.

```tsx
const container = staggerContainer(0.1, 0.3); // 0.1s stagger, 0.3s initial delay

<motion.div variants={container} initial="hidden" animate="visible">
  <motion.div variants={staggerItem}>Item 1</motion.div>
  <motion.div variants={staggerItem}>Item 2</motion.div>
  <motion.div variants={staggerItem}>Item 3</motion.div>
</motion.div>;
```

**Signature:** `staggerContainer(staggerChildren?: number, delayChildren?: number)`

### staggerItem

Child variant for stagger containers.

```tsx
<motion.div variants={staggerItem}>Animated child</motion.div>
```

---

## Hover Animations

### hoverScale

Scale up on hover.

```tsx
<motion.button variants={hoverScale(1.05)} whileHover="hover" initial="initial">
  Hover me
</motion.button>
```

**Signature:** `hoverScale(scale?: number)` (default: 1.02)

### hoverLift

Lift up with shadow on hover.

```tsx
<motion.div
  variants={hoverLift(-8)} // Lift 8px
  whileHover="hover"
  initial="initial"
>
  Hover to lift
</motion.div>
```

**Signature:** `hoverLift(y?: number)` (default: -4)

### hoverScaleLift

Combined scale and lift.

```tsx
<motion.div variants={hoverScaleLift} whileHover="hover" initial="initial">
  Scale and lift
</motion.div>
```

### hoverRotate

Rotate on hover.

```tsx
<motion.div
  variants={hoverRotate(5)} // 5 degrees
  whileHover="hover"
  initial="initial"
>
  Hover to rotate
</motion.div>
```

**Signature:** `hoverRotate(degrees?: number)` (default: 3)

---

## Special Effects

### revealBidirectional

Different animations based on scroll direction.

```tsx
const variants = revealBidirectional;

<motion.div variants={variants} initial="hidden" whileInView="visible">
  Reveals differently based on scroll direction
</motion.div>;
```

### fadeOverlay

Fade in/out for overlay elements.

```tsx
<motion.div
  variants={fadeOverlay}
  initial="hidden"
  animate="visible"
  className="absolute inset-0 bg-gradient-to-t from-black"
/>
```

### expandWidth

Width animation (for underlines, progress bars).

```tsx
const underline = expandWidth(0, 1); // 0% to 100%

<motion.div
  variants={underline}
  initial="initial"
  whileHover="animate"
  className="h-0.5 bg-accent"
/>;
```

**Signature:** `expandWidth(from?: number, to?: number)`

### slideReveal

Slide from left with fade (for icons, emojis).

```tsx
const iconReveal = slideReveal(20); // 20px distance

<motion.span variants={iconReveal} initial="hidden" animate="visible">
  🚀
</motion.span>;
```

**Signature:** `slideReveal(distance?: number)` (default: 10)

---

## Variant Structure

All variants follow this structure:

```typescript
const variant = {
  hidden: {
    /* initial state */
  },
  visible: {
    /* animated state */
  },
  // or
  initial: {
    /* initial state */
  },
  hover: {
    /* hover state */
  },
  animate: {
    /* animated state */
  },
};
```

## Usage with motion.div

```tsx
<motion.div
  variants={fadeInUp(0.2)}
  initial="hidden"
  animate="visible"
  // or
  whileInView="visible"
  viewport={{ once: true }}
>
  Animated content
</motion.div>
```

## Combining Variants

Create composite variants by spreading:

```tsx
const customVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};
```
