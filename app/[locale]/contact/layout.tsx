"use client";

import { WebGLAnimationModeOverride } from "@/components/providers";

type Props = {
  children: React.ReactNode;
};

/**
 * Contact Layout
 *
 * Same neutral surface as the blog: disables the WebGL background ("none" mode →
 * the Three.js bundle and the blue intro arc are never loaded here) and replaces
 * it with a flat Swiss-paper dot grid. Keeps the page calm and focused on the
 * form. The global craft layer (focus rings, press feedback) still applies.
 */
export default function ContactLayout({ children }: Props) {
  return (
    <WebGLAnimationModeOverride mode="none">
      <div
        className="pointer-events-none fixed inset-0 -z-10 swiss-paper"
        aria-hidden="true"
      />
      {children}
    </WebGLAnimationModeOverride>
  );
}
