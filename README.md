# Ricardo Fundora — Portfolio (claude-v1)

A bilingual (ES/EN), terminal-themed personal portfolio for **Ricardo Fundora Hernández**,
Senior Software Engineer. Built as a static Next.js site, optimized for Vercel.

## Highlights

- **Hybrid interactive terminal** — type commands (`help`, `about`, `experience`, `skills`,
  `education`, `publication`, `contact`, `theme`, `lang`, `clear`) with history (↑/↓) and Tab
  autocomplete, **or** tap the command chips. Commands smooth-scroll to fully-rendered,
  crawlable sections.
- **Bilingual** Spanish / English with a one-click toggle (persisted to `localStorage`).
- **Dark + light** terminal themes via `next-themes` (defaults to dark).
- **Accessible & SEO-friendly** — semantic HTML, keyboard navigation, `prefers-reduced-motion`,
  generated Open Graph image and favicon, all content in the DOM.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · next-themes ·
framer-motion · Vitest.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests (command parser + i18n key parity)
npm run lint
npm run build      # static production build
```

## Deploy to Vercel

This is a zero-config static Next.js app — no environment variables, no backend.

- **Option A (CLI):** `npm i -g vercel && vercel` from this directory.
- **Option B (Git):** push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
  Set the **Root Directory** to `claude-v1` if the repo root is the parent folder.

## Project structure

```
app/         Next.js routes, layout, metadata, OG image, favicon
components/   providers · terminal (hero) · sections · nav · footer
content/      typed bilingual dictionaries (en / es) + shared constants
lib/          pure command parser (resolve / autocomplete)
docs/         design spec + implementation plan
```

## Editing content

All copy and data live in [`content/en.ts`](content/en.ts) and [`content/es.ts`](content/es.ts).
Both files share the `Content` type in [`content/types.ts`](content/types.ts); the
`i18n parity` test guarantees they never drift out of sync.
