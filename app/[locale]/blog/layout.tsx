"use client";

import { WebGLAnimationModeOverride } from "@/components/providers";

type Props = {
  children: React.ReactNode;
};

/**
 * Blog Layout
 *
 * Disables the WebGL background on the blog ("none" mode → the Three.js bundle
 * is never loaded here) and replaces it with a flat Swiss-paper dot grid, which
 * is the wiki-aligned surface for reading. The global craft layer (focus rings,
 * press feedback) still applies.
 */
export default function BlogLayout({ children }: Props) {
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
