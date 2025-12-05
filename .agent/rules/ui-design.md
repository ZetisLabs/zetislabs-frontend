---
trigger: model_decision
description: Apply these rules whenever your changes affect UI, layout, style, or visuals. Enforce coherence, simplicity, and alignment with the existing design system. If the request is unclear, default to strict consistency.
---

# UI/UX Design Rules for Code-Acting Agents

## 1. Global Design Consistency

Always verify that any new component, section, or style change remains coherent with the global design language of the website.

Check consistency across:

- Color palette
- Typography (font family, sizes, weights)
- Border-radius values
- Spacing system (margin, padding, gaps)
- Shadows and lighting effects
- Animation style (duration, easing, intensity)

If anything deviates without explicit user instruction, revise it to match the existing system.

## 2. Color and Theme Compliance

Ensure every added component respects the website’s official color palette.

Do not introduce new colors, gradients, shadows, or opacity values unless explicitly requested.

Verify contrast and readability for text and interactive elements.

If a color token is missing or ambiguous, ask for clarification instead of creating a new shade.

## 3. Structural and Layout Coherence

Verify that any new component:

- Fits naturally into the existing layout grid
- Respects spacing and proportions used elsewhere
- Follows established breakpoints and responsive rules
- Does not break responsiveness or introduce layout anomalies

Avoid components that feel foreign to the current layout structure.

## 4. Complexity Management

Do not introduce unnecessary stylistic variety that increases cognitive or technical complexity.

Avoid:

- New or inconsistent border-radius values
- Animation patterns not used elsewhere
- Shadows with different directions or intensities
- Unnecessary wrapper elements
- Overly complex CSS for simple elements

Never introduce new visual concepts unless the user explicitly requests them.

## 5. Self-Validation Before Output

Before generating or modifying code, systematically check the following:

1. Design consistency with existing components
2. Alignment with the design system
3. Minimal added complexity
4. Color, spacing, and typography coherence
5. Proper responsive behavior
6. Overall visual integration

If any point is incoherent, adjust the proposed solution before outputting it.
