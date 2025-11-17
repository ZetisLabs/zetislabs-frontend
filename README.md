# ZetisLabs Front-End

Landing page for ZetisLabs - Automation powered by AI agents. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Features

- 🌍 **Multi-language support** - English and French with URL-based routing (`/en`, `/fr`)
- 🎨 **Modern UI** - Minimalist design with glassmorphism effects
- 🌓 **Theme support** - Light/dark theme system (ready for implementation)
- 📱 **Responsive** - Mobile-first responsive design
- ⚡ **Performance** - Optimized with Next.js App Router
- 🔤 **Custom fonts** - GeneralSans font family with multiple weights

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application. The middleware will automatically redirect you to `/en` or `/fr` based on your browser language.

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run ESLint
npm run lint

# Fix ESLint errors automatically
npm run lint -- --fix
```

## Project Structure

```
front-end/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Locale-based routes (/en, /fr)
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles and theme
├── components/             # React components
│   ├── layout/            # Layout components (Header, Footer)
│   └── ui/                # UI components (LanguageSwitcher, ThemeToggle)
├── i18n/                  # Internationalization
│   ├── config.ts          # Locale configuration
│   └── translations/       # Translation files (en.json, fr.json)
├── lib/                   # Utility functions
│   └── i18n.ts            # Translation utilities
├── public/                # Static assets
│   ├── fonts/             # GeneralSans font files
│   └── *.svg              # Logo and icon files
└── docs/                  # Documentation
```

See [docs/structure.md](./docs/structure.md) for detailed structure documentation.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: GeneralSans (local font files) via `next/font/local`

## Internationalization

The application supports multiple languages with URL-based routing:

- `/en` - English version
- `/fr` - French version

### Adding Translations

1. Edit translation files in `i18n/translations/`
2. Use dot notation keys: `home.hero.title`
3. Add translations for all supported languages

See [docs/i18n.md](./docs/i18n.md) for detailed i18n guide.

### Adding a New Language

1. Add locale to `i18n/config.ts`
2. Create translation file `i18n/translations/[locale].json`
3. Update `lib/i18n.ts` to import new translations

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Structure](./docs/structure.md)** - Project structure and file organization
- **[i18n](./docs/i18n.md)** - Internationalization guide
- **[Development](./docs/development.md)** - Development workflow and guidelines
- **[Deployment](./docs/deployment.md)** - Deployment instructions

## Styling

The project uses Tailwind CSS v4 with a custom theme system. Theme variables are defined in `app/globals.css`:

- `--color-background` - Background color
- `--color-foreground` - Text color
- `--color-accent` - Accent color
- `--color-card` - Card background
- `--color-border` - Border color

### Font Usage

GeneralSans font family is available with multiple weights:

- `font-extralight` (200)
- `font-light` (300)
- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)

## Import Path Aliases

The project uses TypeScript path aliases:

- `@/*` → Maps to project root

Example:
```typescript
import Header from "@/components/layout/Header";
import { getTranslation } from "@/lib/i18n";
```

## Code Style

- **Components**: PascalCase (`Header.tsx`)
- **Variables/Functions**: camelCase (`handleClick`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_LOCALE`)
- **Types**: PascalCase (`Props`, `Locale`)

See [docs/development.md](./docs/development.md) for detailed coding guidelines.

## Deployment

The application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended) - Automatic deployments from Git
- **Netlify** - Git-based deployments
- **Other platforms** - Build with `npm run build` and run `npm start`

See [docs/deployment.md](./docs/deployment.md) for detailed deployment instructions.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

See [LICENSE](./LICENSE) file for details.
