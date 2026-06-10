"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Image from "next/image";

interface ArticleContentProps {
  content: string;
}

/**
 * Renders Markdown for the redesigned reading surface (swiss-paper, no card).
 *
 * Headings use GeneralSans (`font-heading`) with tight tracking; body copy uses
 * IBM Plex Sans (`font-sans`) at a generous reading measure/leading. No
 * horizontal rules anywhere — a `---` becomes a quiet three-dot break (the
 * centre dot the only spot of accent), keeping the Swiss + organic language of
 * the blog index. Accent is reserved for "life": links and that single dot.
 */
export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="font-sans text-[1.0625rem] leading-[1.75] text-foreground/80">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          // Headings — GeneralSans, tight tracking, generous section rhythm
          h1: ({ children }) => (
            <h1 className="mt-12 mb-5 font-heading text-3xl leading-[1.1] font-medium tracking-[-0.03em] text-balance first:mt-0 md:text-4xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-12 mb-4 font-heading text-2xl leading-tight font-medium tracking-[-0.02em] text-balance first:mt-0 md:text-[1.75rem]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-9 mb-2.5 font-heading text-xl leading-snug font-medium tracking-[-0.02em] first:mt-0 md:text-[1.35rem]">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-7 mb-2 font-heading text-lg leading-snug font-medium tracking-[-0.02em] first:mt-0">
              {children}
            </h4>
          ),

          // Paragraphs — breathing room between blocks
          p: ({ children }) => (
            <p className="mb-6 leading-[1.75]">{children}</p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="mb-6 ml-5 list-disc space-y-2.5 marker:text-foreground/30">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-6 ml-5 list-decimal space-y-2.5 marker:text-foreground/40 marker:tabular-nums">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1.5 leading-[1.7]">{children}</li>
          ),

          // Blockquote — thin vertical accent bar (Swiss editorial pull-quote)
          blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-2 border-accent pl-5 text-foreground/65 italic">
              {children}
            </blockquote>
          ),

          // Code
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5 text-[0.9em]">
                  {children}
                </code>
              );
            }
            return (
              <code className="block overflow-x-auto text-[0.9em]">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-8 overflow-x-auto rounded-lg bg-foreground/[0.04] p-5 text-sm leading-relaxed">
              {children}
            </pre>
          ),

          // Links — accent underline, the body's main spot of "life"
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),

          // Images (inline, markdown ![]())
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null;
            if (src.startsWith("http")) {
              return (
                <span className="my-8 block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt || ""}
                    className="w-full rounded-lg"
                  />
                  {alt && (
                    <span className="mt-3 block text-center text-sm text-foreground/45">
                      {alt}
                    </span>
                  )}
                </span>
              );
            }
            return (
              <span className="my-8 block">
                <Image
                  src={src}
                  alt={alt || ""}
                  width={800}
                  height={450}
                  className="w-full rounded-lg"
                />
                {alt && (
                  <span className="mt-3 block text-center text-sm text-foreground/45">
                    {alt}
                  </span>
                )}
              </span>
            );
          },

          // Section break — organic three-dot mark, never a horizontal rule
          hr: () => (
            <div
              className="my-12 flex items-center justify-center gap-2.5"
              aria-hidden="true"
            >
              <span className="h-1 w-1 rounded-full bg-foreground/20" />
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="h-1 w-1 rounded-full bg-foreground/20" />
            </div>
          ),

          // Tables (GFM) — structural hairlines only, kept very quiet
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto">
              <table className="w-full border-collapse text-[0.95em]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-foreground/15">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-foreground/[0.08]">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 text-left font-heading font-medium tracking-[-0.01em]">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="px-4 py-2.5">{children}</td>,

          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
