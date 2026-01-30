"use client";

import { WebGLAnimationModeOverride } from "@/components/providers";

type Props = {
  children: React.ReactNode;
};

/**
 * Blog Layout
 *
 * Overrides the WebGL background animation mode for the blog section.
 * Uses "blog" mode which has subtle pixel art animations instead of the intro arc.
 */
export default function BlogLayout({ children }: Props) {
  return (
    <WebGLAnimationModeOverride mode="blog">
      {children}
    </WebGLAnimationModeOverride>
  );
}
