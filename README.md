# Portfolio

A modern, animated personal portfolio built with **Next.js 16**, **React 19**, and **TypeScript**. Fully responsive, accessible, and dark/light themeable.

## Features

- **Hero** with animated status pill, gradient headline, and scroll cue
- **Stats**, **About**, **Skills**, **Selected Work**, and **Experience** timeline sections
- **Contact** call-to-action with email + social links
- Dark / light theme toggle (persisted to `localStorage`, respects OS preference, no flash on load)
- Scroll-reveal animations via `IntersectionObserver`
- Fully responsive with a mobile nav menu
- Respects `prefers-reduced-motion`

## Customize

All content lives in [`src/lib/data.ts`](src/lib/data.ts) — edit your name, tagline, socials, skills, projects, and experience there. Theme colors and design tokens are defined in [`src/app/globals.css`](src/app/globals.css).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Fonts, metadata, theme init
│   ├── page.tsx          # Page composition
│   ├── globals.css       # Design tokens & themes
│   └── page.module.css   # Section styles
├── components/
│   ├── Nav.tsx           # Sticky nav + mobile menu
│   ├── ThemeToggle.tsx   # Dark/light toggle
│   └── Reveal.tsx        # Scroll-reveal wrapper
└── lib/
    └── data.ts           # All editable content
```
