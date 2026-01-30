interface EyebrowBadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * EyebrowBadge
 *
 * Swiss International Typographic Style badge.
 * Features sharp geometric edges, wide tracking, and functional minimalist accents.
 *
 * Design principles:
 * - Sharp rectangular shape (no rounded corners)
 * - Geometric vertical rule accent
 * - Wide letter-spacing for Swiss typography feel
 */
export function EyebrowBadge({ children, className = "" }: EyebrowBadgeProps) {
  return (
    <div
      className={`relative mb-6 inline-flex items-center justify-center ${className}`}
    >
      <div className="animate-fade-in-slide relative z-10 inline-flex items-center gap-2.5 rounded-sm border border-border/40 bg-background px-2 py-1">
        {/* Swiss Accent: Geometric vertical rule */}
        <span className="h-2.5 w-[1.5px] bg-accent/60" aria-hidden="true" />

        <span className="text-[9px] font-medium tracking-[0.25em] text-foreground/60 uppercase">
          {children}
        </span>
      </div>
    </div>
  );
}
