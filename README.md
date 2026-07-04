# Portfolio

A modern, animated personal portfolio built with **Next.js 16**, **React 19**, and **TypeScript**. Fully responsive, accessible, and dark/light themeable.

## Features

- **Hero** with animated status pill, gradient headline, location, and scroll cue
- **Stats**, **About**, **Skills**, **Selected Work**, and **Experience** timeline sections
- Dedicated **/projects** page listing all work
- **Contact** section with a working contact form (+ direct email fallback) and social links
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

## Contact form setup

The contact form posts to a Next.js route handler at [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts), which sends email via [Resend](https://resend.com).

Until it's configured, the form gracefully falls back to a "email me directly" link — no errors. To enable real email delivery:

1. Copy `.env.example` to `.env.local`
2. Create a free [Resend](https://resend.com) account and API key
3. Set `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`)
4. For production, verify your own domain in Resend and use it as `CONTACT_FROM_EMAIL`

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=0810sonimanish@gmail.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Fonts, metadata, theme init
│   ├── page.tsx             # Home page composition
│   ├── globals.css          # Design tokens & themes
│   ├── page.module.css      # Section styles
│   ├── projects/            # Dedicated /projects page
│   └── api/contact/         # Contact form route handler (Resend)
├── components/
│   ├── Nav.tsx              # Sticky nav + mobile menu
│   ├── ThemeToggle.tsx      # Dark/light toggle
│   ├── Reveal.tsx           # Scroll-reveal wrapper
│   └── ContactForm.tsx      # Contact form with submit states
└── lib/
    └── data.ts              # All editable content
```
