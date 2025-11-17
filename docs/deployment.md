# Deployment Guide

This guide covers the deployment process for the ZetisLabs front-end application.

## Build Process

### Production Build

```bash
# Create production build
npm run build
```

This command:
1. Compiles TypeScript to JavaScript
2. Optimizes React components
3. Generates static HTML pages where possible
4. Bundles and minifies assets
5. Creates optimized production build in `.next/` directory

### Build Output

The build process creates:
- **`.next/`** - Compiled application code
- **`.next/static/`** - Static assets (CSS, JS, images)
- **`.next/server/`** - Server-side code

### Build Verification

After building, verify the build:

```bash
# Build the application
npm run build

# Start production server locally
npm start
```

Visit `http://localhost:3000` to test the production build.

## Environment Variables

### Development

Create `.env.local` for local development (git-ignored):

```env
# Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Production

Set environment variables in your hosting platform:

- **Vercel**: Add in project settings → Environment Variables
- **Netlify**: Add in Site settings → Environment variables
- **Other platforms**: Follow platform-specific instructions

### Available Variables

Currently, no environment variables are required. Add as needed for:
- API endpoints
- Analytics keys
- Feature flags
- Third-party service keys

## Deployment Platforms

### Vercel (Recommended)

Vercel is the recommended platform for Next.js applications:

1. **Connect Repository**
   - Import your Git repository
   - Vercel auto-detects Next.js

2. **Configure Build**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables**
   - Add any required environment variables
   - Set for Production, Preview, and Development

4. **Deploy**
   - Push to main branch triggers automatic deployment
   - Preview deployments for pull requests

### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Add in Site settings

3. **Deploy**
   - Connect Git repository
   - Auto-deploy on push

### Other Platforms

For other platforms (AWS, DigitalOcean, etc.):

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Configure platform** to run `npm start` on port 3000

## Internationalization in Production

### Locale Routing

The middleware automatically handles:
- Browser language detection
- Locale-based routing (`/en`, `/fr`)
- Fallback to default locale

### Translation Files

All translation files are included in the build:
- `i18n/translations/en.json`
- `i18n/translations/fr.json`

No additional configuration needed for i18n in production.

### SEO Considerations

- Each locale has its own URL (`/en`, `/fr`)
- Metadata is localized per locale
- Search engines can index each language separately

## Performance Optimization

### Next.js Optimizations

Next.js automatically optimizes:
- **Image Optimization** - Images are optimized on-demand
- **Code Splitting** - JavaScript is split by route
- **Font Optimization** - Fonts are optimized and preloaded
- **Static Generation** - Pages are pre-rendered when possible

### Asset Optimization

- **Fonts** - Loaded via `next/font/local` for optimal performance
- **Images** - Use Next.js `Image` component for optimization
- **SVGs** - Inline small SVGs, use files for larger ones

### Build Size

Monitor build size:

```bash
npm run build
```

Check the build output for bundle sizes. Optimize if needed:
- Remove unused dependencies
- Use dynamic imports for large components
- Optimize images and assets

## Monitoring

### Error Tracking

Consider adding error tracking:
- **Sentry** - Error monitoring
- **LogRocket** - Session replay
- **Vercel Analytics** - Built-in analytics

### Performance Monitoring

- **Vercel Analytics** - Web Vitals monitoring
- **Google Analytics** - User analytics
- **Lighthouse** - Performance audits

## Security

### Environment Variables

- **Never commit** `.env.local` or `.env.production`
- **Use secure storage** for sensitive keys
- **Rotate keys** regularly

### Content Security Policy

Consider adding CSP headers in `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; ...",
          },
        ],
      },
    ];
  },
};
```

### HTTPS

Ensure HTTPS is enabled:
- Vercel/Netlify provide HTTPS by default
- Use Let's Encrypt for custom domains

## Troubleshooting

### Build Failures

1. **Check Node.js version** - Ensure Node.js 18+ is used
2. **Clear cache** - Delete `.next` and `node_modules`
3. **Check dependencies** - Verify all dependencies are compatible
4. **Review build logs** - Check for specific error messages

### Runtime Errors

1. **Check environment variables** - Ensure all required vars are set
2. **Verify API endpoints** - Check if external services are accessible
3. **Review server logs** - Check hosting platform logs

### Performance Issues

1. **Analyze bundle size** - Use `npm run build` output
2. **Check image sizes** - Optimize large images
3. **Review code splitting** - Ensure proper dynamic imports
4. **Monitor Core Web Vitals** - Use Vercel Analytics or Lighthouse

## Rollback Strategy

### Vercel

- Use deployment history to rollback
- Each deployment has a unique URL
- Promote previous deployment to production

### Git-Based

- Revert to previous commit
- Push to trigger new deployment
- Tag releases for easy rollback

## Post-Deployment Checklist

- [ ] Verify all routes work (`/en`, `/fr`)
- [ ] Check language switching works
- [ ] Test on mobile devices
- [ ] Verify translations appear correctly
- [ ] Check metadata (title, description)
- [ ] Test form submissions (if any)
- [ ] Verify analytics tracking
- [ ] Check error monitoring

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review Next.js deployment docs
3. Check build logs for errors
4. Verify environment variables

