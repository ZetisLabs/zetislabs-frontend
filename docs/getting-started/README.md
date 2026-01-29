# Getting Started

## Prerequisites

- **Node.js 18+** (recommended: latest LTS)
- **npm** or yarn package manager

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd front-end

# Install dependencies
npm install
```

## Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you'll be redirected to `/en` or `/fr` based on your browser language.

## Available Scripts

| Command            | Description              |
| ------------------ | ------------------------ |
| `npm run dev`      | Start development server |
| `npm run build`    | Production build         |
| `npm run lint`     | Run ESLint               |
| `npm run lint:fix` | Auto-fix lint issues     |

## Project Structure

```
front-end/
├── app/
│   ├── [locale]/           # Pages with i18n routing
│   │   ├── layout.tsx      # Locale layout (Header, Footer)
│   │   └── page.tsx        # Home page
│   ├── layout.tsx          # Root layout (fonts)
│   └── globals.css         # Global styles
├── components/             # Page sections
│   ├── HeroSection.tsx
│   ├── StackSection.tsx
│   └── ...
├── lib/
│   ├── ui/                # Reusable UI components
│   ├── motion/            # Animation library
│   └── sections/          # Section composition
├── i18n/
│   ├── config.ts          # Locale configuration
│   └── translations/      # JSON translation files
└── public/                # Static assets
```

## Next Steps

- [Quick Start](./quick-start.md) - Build your first change
- [Landing Page Overview](../landing-page/README.md) - Understand the page structure
- [UI Library](../libraries/ui/README.md) - Explore reusable components
