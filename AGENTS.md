# AGENTS.md

## Project Overview

**ZetisLabs** is a company founded in 2025. We offer businesses process automation to help them save work time and avoid monotonous tasks. We provide both auditing and development services. The idea is to offer real tools with thoughtful AI usage to avoid unnecessary costs. The goal is to provide ready-to-use systems that integrate perfectly into company workflows, ensuring they are ultra-personalized.

**The Front-End**: A Next.js 16 application with React 19, TypeScript, and Tailwind CSS v4. The site features a minimalist landing page with glassmorphism design inspired by Evervault, custom theme switching (light/dark), and gradient backgrounds.

## Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: GeneralSans (local font files) via `next/font/local`

### Project Structure

- `app/`: Next.js App Router (routes via folders with `page.tsx`, optional `layout.tsx`).
- `components/`: Reusable components (PascalCase).
- `public/`: Static assets (fonts, images).
- `app/globals.css`: Global styles, theme tokens, glassmorphism utilities.

## Development Commands

- `npm run dev`: Start local dev server at `http://localhost:3000`.
- `npm run build`: Production build.
- `npm start`: Run the built app.
- `npm run lint`: ESLint (Next core web vitals rules). Use `--fix` to auto‑fix.

## Design System

### Theme System

The application uses a **custom CSS variable-based theme system** (not next-themes).

- Theme state stored in `localStorage` and applied via `data-theme` attribute on `<html>`.
- CSS variables defined in `globals.css`.

**Color Tokens (Light/Dark):**

- `--background`: #f8f8f8 / #1a1a1a
- `--foreground`: #1a1a1a / #f8f8f8
- `--accent`: #3a7bd5 (Blue accent)
- `--card-background`: #ffffff / #3C3C3C
- `--border`: #e2e2e2
- `--hover-background`: #e2e2e2 / #2a2a2a

### Glassmorphism Effects

Modern iOS/macOS-inspired glassmorphism.

- **`.glass`**: Base effect. `backdrop-filter: blur(12px) saturate(180%)`.
- **`.glass-strong`**: Enhanced depth. `blur(20px)`.
- **`.glass-card`**: Fixed dimensions (240x360px), rounded-2xl.
- **`.glass-pill`**: Lighter variant for nav/buttons.

### Typography

**GeneralSans** loaded via `next/font/local`.

- Weights: 200-700.
- Variable: `--font-general-sans`.

## Coding Style & Conventions

- **Components**: Use Function Components and Hooks. Keep small and focused.
- **Naming**: `PascalCase` for components, `camelCase` for functions/vars.
- **Client Components**: Use `"use client"` for hooks, event handlers, browser APIs.
- **Images**: Use Next.js `<Image>` component.

## Repository Guidelines

- **Commits**: Imperative mood, concise (<72 chars).
- **Linting**: Ensure `npm run lint` passes before review.
- **Agent Instructions**: Keep changes minimal and scoped. Do not reformat unrelated files.
