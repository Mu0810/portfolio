# Portfolio

A modern, animated personal portfolio built with **Next.js 16**, **React 19**, and **TypeScript**. Fully responsive, accessible, and dark/light themeable.

## Features

- **Hero** with a portrait, animated aurora backdrop, availability pill, and gradient headline
- **Download CV** button in the hero, nav, and contact section — a plain `<a download>`, so
  middle-click and "Save link as" both work
- **Numbers**, **About**, **Selected work**, **Toolkit**, **How I work**, and **Education** sections
- Dedicated **/projects** page listing every project
- Project cards with a cursor-tracking spotlight and a pull-quote for the one interesting
  technical detail in each
- **Contact** section with a working contact form (+ direct email fallback) and social links
- Dark / light theme toggle (persisted to `localStorage`, respects OS preference, no flash on load)
- Scroll-reveal animations via `IntersectionObserver`
- Fully responsive with a mobile nav menu
- Respects `prefers-reduced-motion` throughout — the aurora canvas never starts, the marquee
  stops, and reveals resolve immediately
- **Zero runtime dependencies** beyond React and Next. No CSS framework, no animation library,
  no icon package.

## Adding your photo

The hero renders a photo if one exists and a designed monogram if not, so the site looks
finished either way. To use a photo:

1. Save it as **`public/profile.jpg`** (`.jpeg`, `.png` and `.webp` also work)
2. Rebuild — that's it

A portrait crop around 800×1000 or larger works best; it is displayed at a 4:5 aspect ratio and
focused slightly above centre so a head-and-shoulders shot frames well. The check happens on the
server in [`src/components/Avatar.tsx`](src/components/Avatar.tsx), so a missing file never
produces a broken-image flash.

## The CV

The downloadable PDF lives at [`public/manish-kumar-soni-cv.pdf`](public/manish-kumar-soni-cv.pdf)
and is wired up through `profile.resumeUrl` in `src/lib/data.ts`.

**This copy deliberately has no phone number on it.** The site is public, so anything published
here is scraped. Email, LinkedIn and GitHub are all still on it, which is enough for a recruiter to
make contact. Keep the full version — phone included — for direct applications.

## Customize

All content lives in [`src/lib/data.ts`](src/lib/data.ts). Design tokens — colour, type scale,
easing, radii — are at the top of [`src/app/globals.css`](src/app/globals.css); changing
`--brand-from` / `--brand-mid` / `--brand-to` restyles the whole site.

### A note on content

Every claim in `data.ts` was checked against the source code of the repository it describes,
rather than that repository's README. An earlier version of this site listed skills and an
employment history the code did not support, and described one project as a working app when it
was an unmodified project template. Worth keeping to: nothing goes on here that wouldn't survive
an interviewer opening the repo mid-conversation.

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
