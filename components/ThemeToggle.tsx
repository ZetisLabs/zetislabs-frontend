"use client";
import { useEffect, useState } from "react";

/**
 * ThemeToggle
 * Client component to switch between light and dark themes by updating
 * `document.documentElement.dataset.theme` and persisting the choice.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize from localStorage or fall back to light.
    try {
      const stored = localStorage.getItem("theme");
      const initial = stored === "dark" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", initial);
      setTheme(initial);
    } catch {
      document.documentElement.setAttribute("data-theme", "light");
      setTheme("light");
    }
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // no-op if storage not available
    }
  };

  // Avoid SSR mismatch by rendering a neutral button until mounted.
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="glass-card glass-card--inline glass-pill inline-flex h-12 w-12 items-center justify-center rounded-full p-0 transition-[opacity,transform] hover:opacity-95"
    >
      {/* Simple inline icons to avoid extra deps */}
      {mounted && isDark ? (
        // Sun icon
        <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 4V2m0 20v-2M4 12H2m20 0h-2M5.64 5.64 4.22 4.22m15.56 15.56-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ) : (
        // Moon icon
        <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
