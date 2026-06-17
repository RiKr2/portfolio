# Ricardo Fundora — Portfolio (claude-v1)

A bilingual (ES/EN) personal portfolio for **Ricardo Fundora Hernández**, Senior Software
Engineer. Built as a static Next.js site, optimized for Vercel. It ships **two experiences**
from one deploy:

- **`/` — Minecraft world** (default): a playable 2D pixel world.
- **`/terminal` — terminal portfolio**: an interactive command-line résumé.

## `/` — Minecraft world

- **Playable**: move the character with `←/→` or `A/D`, **jump** with `Space`, interact with a
  sign using `E`/`Enter`. On touch devices, on-screen buttons + the hotbar work too.
- **Hotbar** (keys `1`–`6` or click) opens each section; **HUD** shows hearts (= companies) and
  an XP level (= years coding since 2016).
- **Achievement toasts** fire as you open sections; **day/night** = the theme toggle (sun/moon).
- Sections are styled as Minecraft GUIs (inventory, advancements, written book, server list) but
  are real semantic HTML — fully crawlable.
- All pixel art is **original** (CSS/SVG); no copyrighted Minecraft textures or fonts are used.

## `/terminal` — terminal portfolio

- **Hybrid interactive terminal** — type commands (`help`, `about`, `experience`, `skills`,
  `education`, `publication`, `contact`, `theme`, `lang`, `clear`, `play`) with history (↑/↓) and
  Tab autocomplete, **or** tap the command chips. `play` (alias `mc`) launches the Minecraft home.

## Shared

- **Bilingual** Spanish / English with a one-click toggle (persisted to `localStorage`).
- **Dark + light** themes via `next-themes`.
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
app/             / (Minecraft) · /terminal · layout · metadata · OG image · favicon
components/
  minecraft/     world · character · hotbar · HUD · achievements · GUI sections
  terminal/      interactive terminal hero
  sections/      terminal content sections
  providers/     Language + Theme providers
content/         typed bilingual dictionaries (en / es) + shared constants
lib/             commands.ts (terminal parser) · minecraft.ts (slots/stats/geometry)
docs/            design specs + implementation plans
```

## Editing content

All copy and data live in [`content/en.ts`](content/en.ts) and [`content/es.ts`](content/es.ts).
Both files share the `Content` type in [`content/types.ts`](content/types.ts); the
`i18n parity` test guarantees they never drift out of sync.
