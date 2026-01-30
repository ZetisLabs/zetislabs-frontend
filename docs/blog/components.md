# Blog Components

This document describes the React components that make up the blog system.

## Architecture

The blog uses a server/client component split for optimal performance:

```
app/[locale]/blog/
  page.tsx              # Server Component - loads articles from filesystem
  layout.tsx            # Client Component - sets WebGL animation mode
  components/
    BlogClient.tsx      # Client Component - all interactivity
    ArticleContent.tsx  # Client Component - Markdown rendering
    index.ts            # Exports
```

## Page Component

**File:** `app/[locale]/blog/page.tsx`

Server component that loads articles and passes them to the client.

```tsx
import { getAllArticles } from "@/lib/articles";
import { BlogClient } from "./components/BlogClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function BlogListingPage({ params }: Props) {
  const { locale } = await params;
  const articles = getAllArticles(locale);
  return <BlogClient articles={articles} />;
}
```

## Layout Component

**File:** `app/[locale]/blog/layout.tsx`

Sets the WebGL background animation mode to "blog" for all blog pages.

```tsx
"use client";

import { WebGLAnimationModeOverride } from "@/components/providers";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WebGLAnimationModeOverride mode="blog">
      {children}
    </WebGLAnimationModeOverride>
  );
}
```

## BlogClient

**File:** `app/[locale]/blog/components/BlogClient.tsx`

Main client component handling all blog interactivity.

### Props

```typescript
interface BlogClientProps {
  articles: Article[];
}
```

### Features

- **Featured Article Section** - Large hero display for featured article
- **Category Filter Bar** - Filter articles by category
- **Article List** - Swiss-style horizontal article cards
- **Article Modal** - Full-screen (mobile) / floating window (desktop)
- **URL Persistence** - Selected article stored in query parameter

### URL State

The selected article is stored in the URL for sharing and persistence:

```
/fr/blog                           # No article selected
/fr/blog?article=my-article-slug   # Article modal open
```

### Internal Components

#### ArticleModal

Displays the full article content in a modal overlay.

- **Mobile/Tablet**: Full-screen view
- **Desktop**: Floating window with backdrop blur
- **Close**: X button, backdrop click, or Escape key

#### ArticleRow

Horizontal article card for the listing grid.

- Thumbnail image (80x80px)
- Title, excerpt, category, author, date
- Hover effect with blur backdrop

## ArticleContent

**File:** `app/[locale]/blog/components/ArticleContent.tsx`

Renders Markdown content with custom styling.

### Props

```typescript
interface ArticleContentProps {
  content: string; // Raw markdown content
}
```

### Usage

```tsx
import { ArticleContent } from "./components/ArticleContent";

<ArticleContent content={article.content} />;
```

### Typography

All content uses **IBMPlexSans** (`font-sans` in Tailwind), including:

- Headings (h1-h6)
- Paragraphs
- Lists
- Blockquotes
- Code blocks

This differs from the rest of the site which uses GeneralSans for headings.

### Markdown Components

Custom React components for each Markdown element:

| Element      | Styling                                            |
| ------------ | -------------------------------------------------- |
| `h1`         | text-3xl/4xl, font-bold, tracking-tight            |
| `h2`         | text-2xl/3xl, font-bold, tracking-tight            |
| `h3`         | text-xl/2xl, font-bold, tracking-tight             |
| `p`          | leading-relaxed, mb-4                              |
| `ul/ol`      | ml-6, list-disc/decimal, space-y-2                 |
| `blockquote` | border-l-4 border-accent, italic                   |
| `code`       | bg-foreground/10 (inline), bg-foreground/5 (block) |
| `a`          | text-accent, underline, external → new tab         |
| `table`      | Full-width, border-collapse                        |

### Dependencies

- `react-markdown` - Markdown parser and renderer
- `remark-gfm` - GitHub Flavored Markdown support (tables, etc.)

## Providers

### WebGLAnimationModeOverride

**File:** `components/providers/WebGLAnimationModeProvider.tsx`

Context provider that overrides the WebGL background animation mode.

```tsx
import { WebGLAnimationModeOverride } from "@/components/providers";

<WebGLAnimationModeOverride mode="blog">{children}</WebGLAnimationModeOverride>;
```

Available modes:

- `"none"` - No animation
- `"intro"` - Arc sunrise effect (default for home)
- `"idle"` - Subtle breathing animation
- `"blog"` - Modular sweep animation

## Styling Classes

### No Scrollbar Utility

Hide scrollbars while maintaining scroll functionality:

```tsx
<div className="no-scrollbar overflow-y-auto">
  {/* Scrollable content without visible scrollbar */}
</div>
```

Defined in `app/globals.css`:

```css
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
```
