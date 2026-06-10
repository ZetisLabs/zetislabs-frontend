"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/lib/motion";
import type { Article } from "@/lib/articles";

/**
 * Blog — abstract single-screen list with a continuous "loupe".
 *
 * The page does not scroll; the list is contained, vertically centered, and
 * snaps each article to the centre (the "crans"). A continuous, scroll-driven
 * loupe scales/fades each article by its distance to the centre (smooth bell
 * curve, no stepped jumps), so the centred article reads largest. On the left,
 * one dot per article — the centred one morphs into an accent dash.
 *
 * The loupe is applied via direct DOM writes (transform/opacity only, GPU) so
 * there is no per-frame React re-render. Hydration-safe: no inline transform on
 * first render; the loupe is applied after mount, masked by the entrance.
 */

const COPY = {
  en: {
    srTitle: "Journal — ZetisLabs workshop notes",
    empty: "No articles found.",
  },
  fr: {
    srTitle: "Journal — notes de l'atelier ZetisLabs",
    empty: "Aucun article pour le moment.",
  },
};

// Loupe shape
const SCALE_MIN = 0.92;
const SCALE_MAX = 1.07;
const OPACITY_MIN = 0.4;
const FALLOFF = 190; // px — smaller = tighter loupe

// DD.MM.YY from an ISO-ish date, falling back to the raw string.
function formatDate(raw: string): string {
  const m = raw?.match(/(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}.${m[2]}.${m[1].slice(2)}` : raw;
}

interface BlogClientProps {
  articles: Article[];
  locale: string;
}

export function BlogClient({ articles, locale }: BlogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(0);
  const ulRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const lang = locale === "fr" ? "fr" : "en";
  const t = COPY[lang];

  // Backward-compat: legacy ?article=<slug> links now redirect to the page.
  useEffect(() => {
    const legacy = searchParams.get("article");
    if (legacy) router.replace(`/${locale}/blog/${legacy}`);
  }, [searchParams, router, locale]);

  // Lock page scroll on the index — only the list scrolls. Article pages don't
  // mount this component, so their normal scroll is unaffected.
  useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  // Continuous loupe: scale/fade each item by its distance to the viewport
  // centre, and flag the nearest as active (for the dot indicator).
  const applyLoupe = useCallback((ul: HTMLUListElement) => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const center = ul.scrollTop + ul.clientHeight / 2;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const dist = Math.abs(el.offsetTop + el.offsetHeight / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
      if (reduce) {
        el.style.transform = "";
        el.style.opacity = "";
      } else {
        const f = 1 / (1 + Math.pow(dist / FALLOFF, 2)); // 1 at centre → 0 far
        const scale = SCALE_MIN + (SCALE_MAX - SCALE_MIN) * f;
        const opacity = OPACITY_MIN + (1 - OPACITY_MIN) * f;
        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.opacity = opacity.toFixed(3);
      }
    }
    setActive(best);
  }, []);

  // Apply once after mount and on resize (no inline transform on first render
  // keeps SSR/client identical).
  useEffect(() => {
    const ul = ulRef.current;
    if (ul) applyLoupe(ul);
    const onResize = () => ulRef.current && applyLoupe(ulRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyLoupe, articles.length]);

  return (
    <main className="flex h-[calc(100dvh_-_62px)] flex-col overflow-hidden text-foreground selection:bg-foreground selection:text-background">
      {/* Title kept for SEO/a11y only — never shown */}
      <h1 className="sr-only">{t.srTitle}</h1>

      {articles.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-foreground/40">{t.empty}</p>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-3xl flex-1 gap-5 overflow-hidden px-6 pt-8 pb-10 md:gap-8 md:pt-12">
          {/* Dot indicator — the active dot morphs into an accent dash */}
          <div
            className="flex shrink-0 flex-col items-center justify-center gap-2.5"
            aria-hidden="true"
          >
            {articles.map((article, i) => (
              <span
                key={article.slug}
                className={`rounded-full transition-all duration-300 ease-out ${
                  i === active
                    ? "h-5 w-0.5 bg-accent"
                    : "h-1 w-1 bg-foreground/25"
                }`}
              />
            ))}
          </div>

          {/* The list — scrolls internally, snaps to centre, page stays put */}
          <ul
            ref={ulRef}
            onScroll={(e) => applyLoupe(e.currentTarget)}
            className="no-scrollbar relative min-w-0 flex-1 snap-y snap-mandatory overflow-x-hidden overflow-y-auto scroll-fade-y py-[33dvh]"
          >
            {articles.map((article, i) => (
              <li
                key={article.slug}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="snap-center"
              >
                <Reveal once delay={Math.min(i * 0.04, 0.24)}>
                  <Link
                    href={`/${locale}/blog/${article.slug}`}
                    className="group block rounded-lg px-3 py-6 transition-colors duration-300 hover:bg-foreground/[0.02] active:opacity-90 motion-reduce:transition-none"
                  >
                    {/* Quiet eyebrow — wakes to accent on contact */}
                    <p className="text-[11px] tracking-[0.18em] text-foreground/35 uppercase tabular-nums transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent">
                      {formatDate(article.date)}
                      <span className="px-1.5 text-foreground/20">·</span>
                      {article.readTime}
                    </p>

                    {/* Title — calm, deepens on contact */}
                    <h2 className="mt-2.5 font-heading text-xl leading-snug font-medium tracking-[-0.02em] text-balance text-foreground/90 transition-colors duration-300 group-hover:text-foreground md:text-2xl">
                      {article.title}
                    </h2>

                    {/* The accent traces itself in, left→right, on contact */}
                    <span
                      aria-hidden="true"
                      className="mt-2.5 block h-0.5 w-8 origin-right scale-x-0 rounded-full bg-[var(--color-accent)] transition-transform duration-[450ms] [transition-timing-function:var(--ease-out-strong)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 motion-reduce:transition-none"
                    />

                    {/* One quiet line of context */}
                    <p className="mt-2.5 line-clamp-1 text-sm leading-relaxed text-foreground/50">
                      {article.excerpt}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
