# Content Management

All user-facing content is managed through translation files, making it easy to update without touching code.

## Translation File Location

```
i18n/translations/default/
├── en.json    # English content
└── fr.json    # French content
```

## Content Structure

```json
{
  "metadata": { /* Page title, description */ },
  "header": { /* Navigation labels */ },
  "footer": { /* Footer text, links */ },
  "home": {
    "sections": [ /* Section order config */ ],
    "hero": { /* Hero section content */ },
    "whatWeMake": { /* Feature cards */ },
    "stack": { /* Stack section */ },
    "useCases": { /* Use cases content */ },
    "whyZetisLabs": { /* Reasons content */ },
    "cta": { /* Final CTA */ }
  }
}
```

## Updating Content

### Hero Section

```json
{
  "home": {
    "hero": {
      "eyebrow": "AI-Powered Automation",
      "title": {
        "default": "Build ",
        "highlight": "Smarter Systems"
      },
      "subtitle": "We create intelligent automation solutions...",
      "cta": {
        "primary": "Get Started",
        "secondary": "See Examples"
      }
    }
  }
}
```

**Component location:** `components/HeroSection.tsx`

### Feature Cards (What We Make)

```json
{
  "home": {
    "whatWeMake": {
      "eyebrow": "What We Make",
      "title": "Intelligent Solutions",
      "features": {
        "aiAgents": {
          "title": "AI Agents",
          "subtitle": "The Intelligence.",
          "description": "Custom AI agents that understand your business...",
          "cta": "Learn more"
        },
        "automations": {
          "title": "Automations",
          "subtitle": "The Efficiency.",
          "description": "End-to-end automation workflows...",
          "cta": "Discover"
        },
        "integrations": {
          "title": "Integrations",
          "subtitle": "The Connection.",
          "description": "Seamless connections between your tools...",
          "cta": "Explore"
        }
      }
    }
  }
}
```

**Component location:** `components/WhatWeMakeSection.tsx`

### Reason Cards (Why ZetisLabs)

```json
{
  "home": {
    "whyZetisLabs": {
      "eyebrow": "Why ZetisLabs",
      "title": "Built Different",
      "reasons": {
        "expertise": {
          "title": "Deep Expertise",
          "description": "Years of experience in AI and automation..."
        },
        "custom": {
          "title": "Custom Solutions",
          "description": "Tailored to your specific needs..."
        },
        "support": {
          "title": "Ongoing Support",
          "description": "We're with you every step..."
        }
      }
    }
  }
}
```

**Component location:** `components/WhyZetisLabsSection.tsx`

### CTA Section

```json
{
  "home": {
    "cta": {
      "title": "Ready to Transform?",
      "subtitle": "Let's build something amazing together.",
      "button": "Contact Us"
    }
  }
}
```

## Adding New Content

### Add a New Feature Card

1. Add to `en.json`:
```json
{
  "home": {
    "whatWeMake": {
      "features": {
        "newFeature": {
          "title": "New Feature",
          "subtitle": "The Innovation.",
          "description": "Description here...",
          "cta": "Learn more"
        }
      }
    }
  }
}
```

2. Add same structure to `fr.json` with French translations

3. Update `WhatWeMakeSection.tsx` to render the new feature

### Add a New Reason

1. Add to both translation files:
```json
{
  "home": {
    "whyZetisLabs": {
      "reasons": {
        "newReason": {
          "title": "New Reason",
          "description": "Why this matters..."
        }
      }
    }
  }
}
```

2. Update `WhyZetisLabsSection.tsx` to render it

## Best Practices

1. **Always update both languages** - Keep `en.json` and `fr.json` in sync
2. **Use consistent keys** - Follow existing naming patterns
3. **Test both locales** - Check `/en` and `/fr` after changes
4. **Keep descriptions concise** - Landing page content should be scannable
5. **Use placeholders** for dynamic content:
   ```json
   "copyright": "© {year} ZetisLabs"
   ```

## Accessing Translations in Code

```tsx
// In server components
const t = (key: string) => getTranslation(locale, key);

// Usage
<h1>{t("home.hero.title.default")}</h1>
<p>{t("home.hero.subtitle")}</p>
```
