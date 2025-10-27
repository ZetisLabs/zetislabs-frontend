/**
 * Footer
 * Minimal footer with muted text and a slim border, matching the
 * minimalist aesthetic.
 */
export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-foreground/70 sm:flex-row">
        <p>© {new Date().getFullYear()} ZetisLabs. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

