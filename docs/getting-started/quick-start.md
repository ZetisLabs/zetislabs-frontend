# Quick Start

This guide walks you through common tasks to get you productive quickly.

## 1. Update Text Content

All user-facing text lives in translation files:

```
i18n/translations/default/
├── en.json    # English
└── fr.json    # French
```

### Example: Change the Hero Title

1. Open `i18n/translations/default/en.json`
2. Find the `home.hero.title` key
3. Update the text
4. Repeat for `fr.json`

```json
{
  "home": {
    "hero": {
      "title": {
        "default": "Your New Title Here"
      }
    }
  }
}
```

## 2. Add a New Feature Card

Feature cards are configured in the translation files:

```json
{
  "home": {
    "whatWeMake": {
      "features": {
        "newFeature": {
          "title": "New Feature",
          "subtitle": "The Innovation.",
          "description": "Description of your new feature.",
          "cta": "Learn more"
        }
      }
    }
  }
}
```

Then update the component to render it (see [Sections Guide](../landing-page/sections.md)).

## 3. Change Button Styles

Buttons use the `CTAButton` component with two variants:

```tsx
import { CTAButton } from "@/lib/ui";

// Primary button (blue glow, light sweep)
<CTAButton href="/contact" variant="primary">
  Get Started
</CTAButton>

// Secondary button (glass effect, chevron)
<CTAButton href="#examples" variant="secondary">
  See Examples
</CTAButton>
```

## 4. Add Animations

Use the motion library for animations:

```tsx
import { Reveal, FadeIn } from "@/lib/motion";

// Scroll-triggered reveal
<Reveal delay={0.2} direction="up">
  <h2>This fades in when scrolled into view</h2>
</Reveal>

// Simple fade-in on mount
<FadeIn delay={0.1}>
  <p>This fades in when the page loads</p>
</FadeIn>
```

## 5. Add a New Section

1. Create your section component in `components/`
2. Register it in `lib/sections/registry.ts`
3. Add it to the sections array in translation files

See [Creating Sections](../libraries/sections/creating-sections.md) for details.

## 6. Add a New Language

1. Update `i18n/config.ts`:

   ```typescript
   export const locales = ["en", "fr", "es"] as const;
   ```

2. Create translation file: `i18n/translations/default/es.json`

3. Import in `lib/i18n.ts`:
   ```typescript
   import esTranslations from "@/i18n/translations/default/es.json";
   ```

## Tips

- **Always update both `en.json` and `fr.json`** when changing text
- **Use `npm run lint`** before committing
- **Check both locales** (`/en` and `/fr`) after changes
- **Use TypeScript** - it catches errors early
