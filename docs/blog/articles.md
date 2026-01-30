# Articles Guide

This guide explains how to create, manage, and organize blog articles.

## Directory Structure

Articles are organized by locale in the `/articles` directory:

```
articles/
  en/                                    # English articles
    the-future-of-autonomous-engineering.md
    scaling-distributed-systems.md
  fr/                                    # French articles
    le-futur-de-lingenierie-autonome.md
    mise-a-echelle-systemes-distribues.md
```

## Frontmatter Reference

Every article requires YAML frontmatter at the top of the file:

```markdown
---
title: "Article Title"
excerpt: "A brief description shown on the listing page (1-2 sentences)"
category: "AI & Automation"
author:
  name: "Author Name"
  avatar: "AN"
date: "2024-10-24"
readTime: "12 min"
image: "https://images.unsplash.com/photo-xxx?auto=format&fit=crop&q=80&w=1600"
featured: true
---
```

### Required Fields

| Field      | Type   | Description                                    |
| ---------- | ------ | ---------------------------------------------- |
| `title`    | string | Article title (displayed in listing and modal) |
| `excerpt`  | string | Short description (1-2 sentences)              |
| `category` | string | One of the available categories (see below)    |
| `author`   | object | Author information                             |
| `date`     | string | Publication date (format: YYYY-MM-DD)          |
| `readTime` | string | Estimated reading time (e.g., "8 min")         |
| `image`    | string | Hero image URL (recommended: 1600px wide)      |

### Optional Fields

| Field      | Type    | Default | Description                             |
| ---------- | ------- | ------- | --------------------------------------- |
| `featured` | boolean | false   | Show as featured article at top of page |

### Author Object

```yaml
author:
  name: "Elena Kostic" # Full name displayed
  avatar: "EK" # 2-letter initials for avatar circle
```

## Available Categories

Use one of these exact category names:

- `AI & Automation`
- `Product Updates`
- `Case Studies`
- `Engineering`

## Markdown Content

After the frontmatter, write your article content using standard Markdown:

```markdown
---
title: "My Article"
# ... other frontmatter
---

Introduction paragraph...

## Section Heading

Regular paragraph with **bold** and _italic_ text.

### Subsection

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Another item

> Blockquote for important callouts

`inline code` or code blocks:

\`\`\`javascript
const example = "code block";
\`\`\`

| Column 1 | Column 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

[Link text](https://example.com)

![Image alt text](https://example.com/image.jpg)
```

### Supported Markdown Features (GFM)

- Headings (h1-h6)
- Bold, italic, strikethrough
- Ordered and unordered lists
- Blockquotes
- Code blocks with syntax highlighting
- Tables
- Links (external links open in new tab)
- Images
- Horizontal rules

## File Naming

- Use **kebab-case** for file names: `my-article-title.md`
- The filename becomes the article **slug** used in URLs
- Example: `scaling-distributed-systems.md` → `/blog?article=scaling-distributed-systems`

## Images

### Hero Image

- Recommended size: 1600px wide minimum
- Use Unsplash or similar for high-quality images
- Include quality and format params: `?auto=format&fit=crop&q=80&w=1600`

### Content Images

Images in markdown content:

```markdown
![Description of image](https://example.com/image.jpg)
```

External images use standard `<img>` tags, local images use Next.js `<Image>`.

## Featured Articles

Set `featured: true` in frontmatter to display an article prominently at the top of the blog listing. Only one article should be featured per locale at a time.

## Internationalization

Each locale has its own article directory. Articles are **not** automatically translated - you must create separate files for each language:

```
articles/
  en/
    my-article.md          # English version
  fr/
    mon-article.md         # French version (different filename is OK)
```

Articles only appear on their respective locale's blog page (`/en/blog` or `/fr/blog`).

## API Reference

### getAllArticles(locale)

Returns all articles for a locale, sorted by date (newest first).

```typescript
import { getAllArticles } from "@/lib/articles";

const articles = getAllArticles("en");
// Returns: Article[]
```

### getArticleBySlug(slug, locale)

Returns a single article by its slug (filename without .md).

```typescript
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("my-article", "en");
// Returns: Article | null
```

### Article Type

```typescript
interface Article {
  slug: string; // Filename without .md extension
  content: string; // Raw markdown content (without frontmatter)
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}
```
