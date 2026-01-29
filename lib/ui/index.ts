/**
 * ZetisLabs UI Component Library
 *
 * A reusable, extractable UI component library featuring premium design
 * with depth effects, animations, and glass-morphism aesthetics.
 *
 * ## Usage
 *
 * ```tsx
 * import { CTAButton, FeatureCard, ReasonCard, EyebrowBadge, ErrorBoundary } from "@/lib/ui";
 * ```
 *
 * ## Extracting for other projects
 *
 * ```bash
 * cp -r lib/ui/ ../new-project/lib/ui/
 * # Also copy lib/motion/ if using motion components
 * npm install framer-motion  # in new project
 * ```
 *
 * ## Components
 *
 * ### Buttons
 * - `CTAButton` - Primary/secondary call-to-action buttons with glass effects
 *
 * ### Cards
 * - `FeatureCard` - Feature showcase cards with hover animations
 * - `ReasonCard` - Numbered reason cards with animated underlines
 *
 * ### Badges
 * - `EyebrowBadge` - Small badge with glow effect for section labels
 *
 * ### Utilities
 * - `ErrorBoundary` - React error boundary with fallback UI
 */

// Buttons
export { CTAButton } from "./components/CTAButton";

// Cards
export { FeatureCard } from "./components/FeatureCard";
export { ReasonCard } from "./components/ReasonCard";

// Badges
export { EyebrowBadge } from "./components/EyebrowBadge";

// Utilities
export { ErrorBoundary } from "./components/ErrorBoundary";
