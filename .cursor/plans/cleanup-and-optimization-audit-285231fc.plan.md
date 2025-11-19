<!-- 285231fc-9e68-4914-b9c8-76a855e25c19 3fb9989b-910d-4014-a79f-8a2607f09d70 -->
# Cleanup and Optimization Plan

## Analysis Summary

### Unused Files to Remove

1. **Unused Components**

- `components/ui/ThemeToggle.tsx` - Component exists but is never imported or used in the codebase

2. **Unused Logo Assets** (only `zetis-light-nbg-logo-v2.svg` is used)

- `public/zetis-light-logo-v2.svg`
- `public/zetis-dark-logo-v2.svg`
- `public/zetis-dark-nbg-logo-v2.svg`
- `public/zetis-logo-v2.png`
- `public/logo-zetis-big-v1.png`

3. **Unused SVG Icons**

- `public/Flèche droite SVG.svg`
- `public/Home SVG Icons.svg`
- `public/Icônes Contact.svg`

4. **Redundant Documentation Files**

- `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` - Multiple agent-specific docs that could be consolidated into `AGENTS.md` or removed if not actively maintained

### Optimization Issues Found

1. **Next.js Configuration**

- `next.config.ts` is empty - missing image optimization, compression, and other performance settings

2. **Font Loading**

- All 14 font files (7 weights × 2 styles) are loaded in `app/layout.tsx`, but only a subset may be used
- Should implement font subsetting or lazy loading for unused weights

3. **Missing SEO Meta Tags**

- No Open Graph tags
- No Twitter Card tags
- No structured data (JSON-LD)
- Missing viewport meta (though Next.js may add this)

4. **Image Optimization**

- Logo SVG loaded without optimization
- Missing `priority` flag on some images
- No image sizing optimization

5. **Performance Optimizations**

- No compression headers configured
- No caching strategy
- Missing resource hints (preconnect, prefetch)

6. **Accessibility**

- Some links have `href="#"` which should be replaced with proper URLs or buttons
- Missing skip-to-content link

## Implementation Steps

### Phase 1: Remove Unused Files

1. Delete unused logo files (5 files)
2. Delete unused SVG icons (3 files)
3. Delete or consolidate agent documentation files (3 files)
4. Remove `ThemeToggle.tsx` component if not planned for use

### Phase 2: Optimize Next.js Configuration

1. Add image optimization settings to `next.config.ts`
2. Configure compression
3. Add security headers
4. Configure caching strategies

### Phase 3: Optimize Font Loading

1. Audit which font weights/styles are actually used
2. Remove unused font files or implement subsetting
3. Add font-display: swap optimization

### Phase 4: Add SEO Enhancements

1. Add Open Graph meta tags to `app/[locale]/layout.tsx`
2. Add Twitter Card meta tags
3. Add structured data (JSON-LD) for organization
4. Ensure proper meta descriptions

### Phase 5: Performance Improvements

1. Add resource hints (preconnect for external domains if any)
2. Optimize image loading with proper priority flags
3. Add compression middleware
4. Review and optimize CSS (check for unused styles)

### Phase 6: Fix Accessibility Issues

1. Replace `href="#"` links with proper URLs or convert to buttons
2. Add skip-to-content link
3. Ensure all interactive elements have proper ARIA labels

## Files to Modify

- `next.config.ts` - Add optimization settings
- `app/[locale]/layout.tsx` - Add SEO meta tags
- `app/layout.tsx` - Optimize font loading
- `app/[locale]/page.tsx` - Fix placeholder links
- `components/layout/Header.tsx` - Review image optimization

## Files to Delete

- `components/ui/ThemeToggle.tsx`
- `public/zetis-light-logo-v2.svg`
- `public/zetis-dark-logo-v2.svg`
- `public/zetis-dark-nbg-logo-v2.svg`
- `public/zetis-logo-v2.png`
- `public/logo-zetis-big-v1.png`
- `public/Flèche droite SVG.svg`
- `public/Home SVG Icons.svg`
- `public/Icônes Contact.svg`
- `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` (or consolidate)