# GEMINI.md

## Project Overview

This is a Next.js project for the ZetisLabs front-end. It uses React, TypeScript, and Tailwind CSS. The project is a web application that serves as the company's landing page, with a minimalist design inspired by Evervault.

The project is structured using the Next.js App Router, with pages and layouts defined in the `app` directory. Reusable components are located in the `components` directory. The project also uses a local font, General Sans, which is configured in `app/layout.tsx`.

## Building and Running

To get started with the project, you can use the following commands:

*   `npm run dev`: Starts the development server at `http://localhost:3000`.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server.
*   `npm run lint`: Lints the project files using ESLint.

## Development Conventions

*   **Linting:** The project uses ESLint for code linting. The configuration can be found in `eslint.config.mjs`.
*   **Styling:** The project uses Tailwind CSS for styling. The configuration is in `postcss.config.mjs` and the global styles are in `app/globals.css`.
*   **Fonts:** The project uses a local font, General Sans, which is loaded in `app/layout.tsx`.
*   **Components:** Reusable components are stored in the `components` directory.
*   **Routing:** The project uses the Next.js App Router. Pages and layouts are defined in the `app` directory.
