# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router lives in `app/` (routes via folders with `page.tsx`, optional `layout.tsx`).
- Global styles at `app/globals.css`. Static assets in `public/`. Build output in `.next/`.
- Key config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.
- TypeScript is enabled with strict settings; path alias `@/*` maps to repo root.

## Build, Test, and Development Commands
- `npm run dev` — start local dev server at `http://localhost:3000`.
- `npm run build` — production build.
- `npm start` — run the built app.
- `npm run lint` — ESLint (Next core web vitals rules). Use `--fix` to auto‑fix.

## Coding Style & Naming Conventions
- Use TypeScript, function components, and hooks. Keep components small and focused.
- Filenames: route files lowercase (`page.tsx`, `layout.tsx`); shared components `PascalCase.tsx`.
- Naming: camelCase for variables/functions, PascalCase for components, UPPER_SNAKE for constants.
- Indentation: 2 spaces. Prefer ESLint autofix; no Prettier configured.
- Tailwind CSS v4 via PostCSS: prefer utility classes; avoid inline style objects.

## Testing Guidelines
- No test runner is configured yet.
- If adding tests, use `.test.ts`/`.test.tsx` and colocate near source or in `__tests__/`.
- Prefer React Testing Library for unit/UI and Playwright for e2e. Propose config in a separate PR.

## Commit & Pull Request Guidelines
- Commits: imperative mood, concise (<72 chars), explain why + what. Reference issues (e.g., `#123`).
- Keep PRs focused. Include description, screenshots for UI changes, and reproduction steps.
- Ensure `npm run lint` passes before requesting review.

## Security & Configuration Tips
- Store secrets in `.env.local`; `.env*` is git-ignored. Do not commit credentials.
- Avoid importing server-only code into client components. Validate external input.

## Agent-Specific Instructions
- Keep changes minimal and scoped; follow existing structure and naming.
- Do not reformat unrelated files; run `npm run lint -- --fix` only on touched files.
- Ask before adding dependencies or introducing new top-level folders.
