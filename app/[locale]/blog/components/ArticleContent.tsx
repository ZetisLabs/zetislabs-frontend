"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface ArticleContentProps {
  content: string;
}

/**
 * Renders Markdown content with IBMPlexSans font for all text including headings.
 * Uses custom components for proper Next.js integration.
 */
export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="font-sans text-foreground/80">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings - all use IBMPlexSans (inherited from font-sans wrapper)
          h1: ({ children }) => (
            <h1 className="mt-8 mb-6 text-3xl leading-tight font-bold tracking-tight first:mt-0 md:text-4xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-8 mb-4 text-2xl leading-tight font-bold tracking-tight first:mt-0 md:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 mb-3 text-xl leading-tight font-bold tracking-tight first:mt-0 md:text-2xl">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-4 mb-2 text-lg leading-tight font-bold tracking-tight first:mt-0">
              {children}
            </h4>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-accent pl-6 text-foreground/70 italic">
              {children}
            </blockquote>
          ),

          // Code
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="rounded bg-foreground/10 px-1.5 py-0.5 text-sm">
                  {children}
                </code>
              );
            }
            return (
              <code className="block overflow-x-auto rounded-md bg-foreground/5 p-4 text-sm">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-md bg-foreground/5 p-4">
              {children}
            </pre>
          ),

          // Links
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

          // Images
          img: ({ src, alt }) => {
            if (!src) return null;
            // For external images, use regular img tag
            if (src.startsWith("http")) {
              return (
                <span className="my-6 block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt || ""}
                    className="w-full rounded-md"
                  />
                  {alt && (
                    <span className="mt-2 block text-center text-sm text-foreground/50">
                      {alt}
                    </span>
                  )}
                </span>
              );
            }
            // For local images, use Next.js Image
            return (
              <span className="my-6 block">
                <Image
                  src={src}
                  alt={alt || ""}
                  width={800}
                  height={450}
                  className="w-full rounded-md"
                />
                {alt && (
                  <span className="mt-2 block text-center text-sm text-foreground/50">
                    {alt}
                  </span>
                )}
              </span>
            );
          },

          // Horizontal rule
          hr: () => <hr className="my-8 border-foreground/10" />,

          // Tables (GFM)
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-foreground/20">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-foreground/10">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left font-bold">{children}</th>
          ),
          td: ({ children }) => <td className="px-4 py-2">{children}</td>,

          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
