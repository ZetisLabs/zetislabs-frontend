"use client";

import { useRef, useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

type Props = {
  email: string;
  copyLabel: string;
  copiedLabel: string;
};

/**
 * CopyEmail
 *
 * Signature micro-interaction (rauno.me pattern): clicking the address copies it
 * to the clipboard and shows inline "Copied" feedback right at the trigger —
 * never a global toast. Falls back to a mailto link if the Clipboard API is
 * unavailable. Restraint motion: a 150ms opacity/color shift, no layout change.
 */
export function CopyEmail({ email, copyLabel, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`${copyLabel} ${email}`}
      className="group -mx-2 inline-flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-foreground/5"
    >
      <Mail
        className="h-4 w-4 shrink-0 text-foreground/40 transition-colors group-hover:text-accent"
        aria-hidden="true"
      />
      <span className="truncate text-sm font-medium text-foreground">
        {email}
      </span>
      <span
        className="ml-auto inline-flex shrink-0 items-center gap-1 text-[11px] font-medium tracking-wide uppercase"
        aria-live="polite"
      >
        {copied ? (
          <span className="inline-flex items-center gap-1 text-accent">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            {copiedLabel}
          </span>
        ) : (
          <Copy
            className="h-3.5 w-3.5 text-foreground/30 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        )}
      </span>
    </button>
  );
}
