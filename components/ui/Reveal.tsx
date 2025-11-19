"use client";

import { useInView } from "react-intersection-observer";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Reveal
 * A reusable component that triggers animations when elements enter the viewport.
 * Elements start hidden (opacity 0, translate offset) and smoothly transition
 * to visible when they reach the middle of the viewport (50% from top).
 *
 * @param children - The content to animate
 * @param className - Additional Tailwind classes for customization
 * @param delay - Delay in milliseconds for staggered effects
 */
export const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
  const { ref, inView } = useInView({
    rootMargin: "0px 0px -35% 0px",
    triggerOnce: true,
  });

  const baseClasses = "transition-all duration-700 ease-out";
  const hiddenClasses = "opacity-0 translate-y-8";
  const visibleClasses = "opacity-100 translate-y-0";

  const animationClasses = inView ? visibleClasses : hiddenClasses;
  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${animationClasses} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};

