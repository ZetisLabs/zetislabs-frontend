# Blog System

The ZetisLabs blog is a markdown-based content system with full internationalization support, featuring a Swiss International Typographic Style design.

## Features

- **Markdown Articles** - Write articles in `.md` files with YAML frontmatter
- **Internationalization** - Separate article directories for each locale (en/fr)
- **Server-Side Rendering** - Articles loaded at build time for optimal performance
- **Article Modal** - Full-screen on mobile, floating window on desktop
- **URL Persistence** - Selected articles persist across page refreshes
- **Category Filtering** - Filter articles by category
- **WebGL Animation** - Custom "Modular Sweep" background animation

## Quick Start

### Adding a New Article

1. Create a markdown file in `/articles/{locale}/`:

   ```
   articles/
     en/
       my-new-article.md
     fr/
       mon-nouvel-article.md
   ```

2. Add frontmatter metadata:

   ```markdown
   ---
   title: "My Article Title"
   excerpt: "A brief description..."
   category: "AI & Automation"
   author:
     name: "Author Name"
     avatar: "AN"
   date: "2024-10-24"
   readTime: "8 min"
   image: "https://images.unsplash.com/..."
   featured: false
   ---

   Your article content here...
   ```

3. Commit and push - the article appears automatically

## Documentation

- [Articles Guide](articles.md) - How to write and manage articles
- [Components](components.md) - Blog UI components reference
- [WebGL Animation](webgl-animation.md) - Background animation system

## Architecture Overview

```
/articles
  /en                         # English articles
  /fr                         # French articles

/app/[locale]/blog
  /page.tsx                   # Server component (loads articles)
  /layout.tsx                 # Sets WebGL animation mode
  /components
    /BlogClient.tsx           # Client component (interactivity)
    /ArticleContent.tsx       # Markdown renderer

/lib/articles
  /index.ts                   # Article loading utilities
  /types.ts                   # TypeScript types
```

## Typography

Article content uses **IBMPlexSans** for all text, including headings. This provides a clean, readable experience distinct from the marketing pages which use GeneralSans for headings.
