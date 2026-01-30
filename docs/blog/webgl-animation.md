# WebGL Blog Animation

The blog features a custom WebGL background animation called "Modular Sweep", inspired by Swiss International Typographic Style and Müller-Brockmann grid systems.

## Animation Modes

The WebGL background system supports multiple animation modes that can be set per-route:

| Mode    | Value | Description                                | Usage       |
| ------- | ----- | ------------------------------------------ | ----------- |
| `none`  | 0     | No animation, static grid                  | -           |
| `intro` | 1     | Arc sunrise effect with orbital glow       | Home page   |
| `idle`  | 2     | Subtle breathing/shimmer animation         | After intro |
| `blog`  | 3     | Modular sweep with Swiss typographic style | Blog pages  |

## Blog Animation: Modular Sweep

The blog uses a distinctive animation style that complements the typographic design:

### Visual Elements

1. **Horizontal Sweeps**
   - Elegant "scanning" bars traverse the grid
   - Multiple sweeps at different speeds for layered depth
   - Very sparse activation (~1-2% of pixels)

2. **Vertical Column Rhythm**
   - Based on a 12-column grid system
   - Specific columns pulse rhythmically
   - Mimics typographic grid layouts

3. **Diagonal Accent Lines**
   - Swiss design diagonal elements
   - Extremely sparse for subtlety

4. **Intersection Nodes**
   - Animated points where grid lines meet
   - Sparse pulsing effect

### Design Philosophy

- **Ultra-minimal**: Effects are intentionally sparse and subtle
- **Rhythmic**: Movements follow quantized, mechanical timing
- **Grid-based**: All effects align to a virtual typographic grid
- **Non-distracting**: Animation supports rather than competes with content

## Implementation

### Setting Animation Mode

Use the `WebGLAnimationModeOverride` provider in your layout:

```tsx
// app/[locale]/blog/layout.tsx
"use client";

import { WebGLAnimationModeOverride } from "@/components/providers";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WebGLAnimationModeOverride mode="blog">
      {children}
    </WebGLAnimationModeOverride>
  );
}
```

### Provider Architecture

```
WebGLAnimationModeProvider (root layout)
  └── WebGLBackground (reads mode from context)
        └── WebGLAnimationModeOverride (child layouts can override)
              └── Blog pages (use "blog" mode)
```

The provider system allows:

- Default animation mode set at root level
- Child layouts can override without rendering a new WebGLBackground
- Single WebGL canvas instance for performance

### Shader Implementation

The animation is implemented in GLSL in `components/webgl/shaders/background.frag.ts`:

```glsl
// Mode 3: Blog page pixel art animation
if (uAnimationMode >= 2.5) {
  float blogIntensity = calculateBlogEffect(vPosition, uTime, vSeeds, vGridPos);
  cellColor = mix(cellColor, uAccentColor, blogIntensity);
}
```

Key uniforms:

- `uAnimationMode` - Current animation mode (0-3)
- `uTime` - Animation time
- `vSeeds` - Per-cell random seeds for variation
- `vGridPos` - Cell position in the grid

### Customizing Animation Intensity

The animation uses high threshold values to keep effects sparse:

```glsl
// Only ~1-2% of pixels activate
float fragment1 = step(0.992, fract(seeds.x * 17.0 + seeds.y * 11.0));
float fragment2 = step(0.995, fract(seeds.y * 23.0 + seeds.x * 7.0));
```

To adjust intensity:

- **Lower thresholds** (e.g., 0.95) → More visible effects
- **Higher thresholds** (e.g., 0.999) → Fewer effects

## Creating Custom Animation Modes

To add a new animation mode:

1. **Update types** in `components/webgl/WebGLBackground.tsx`:

   ```typescript
   type AnimationMode = "none" | "intro" | "idle" | "blog" | "custom";
   ```

2. **Add mode mapping** in `getAnimationModeFloat`:

   ```typescript
   if (mode === "custom") return 4;
   ```

3. **Implement shader logic** in `background.frag.ts`:

   ```glsl
   // Mode 4: Custom animation
   if (uAnimationMode >= 3.5) {
     float customIntensity = calculateCustomEffect(...);
     cellColor = mix(cellColor, uAccentColor, customIntensity);
   }
   ```

4. **Create calculation function**:
   ```glsl
   float calculateCustomEffect(vec2 pos, float time, vec2 seeds, vec2 gridPos) {
     // Your custom animation logic
     return intensity;
   }
   ```

## Performance Considerations

- Animation runs at 60fps using `requestAnimationFrame`
- Effects are GPU-accelerated via WebGL
- Sparse activation minimizes visual complexity
- Single WebGL canvas shared across routes
