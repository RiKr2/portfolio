# Portfolio Redesign — Minecraft Hybrid 2D (claude-v1)

**Date:** 2026-06-16
**Status:** Approved (design)
**Deploy target:** Vercel (same single app as the terminal version)

## 1. Goal

Replace the portfolio's landing experience with a **playable 2D Minecraft-style world**, while
keeping the existing terminal version available. Same bilingual content, now presented as a
game: a movable pixel character, a hotbar, a HUD, achievement toasts, and a day/night cycle.

## 2. Routing — keep both versions

One Next.js app, one Vercel deploy, two routes:

- `/` → **Minecraft home** (new default).
- `/terminal` → the existing terminal portfolio, moved here intact.
- Cross-links: a wooden sign "→ terminal mode" on the home links to `/terminal`; a `play` / `mc`
  command in the terminal links to `/`.

Root layout keeps only `<html>`/`<body>`, fonts (mono + pixel), and the Theme + Language
providers. Each page renders its own chrome (nav/footer/controls) so the two designs don't share
styling.

## 3. No copyrighted assets

Minecraft textures, fonts, and logos are proprietary. We use **original pixel-art** rendered with
CSS/SVG that evokes the style — no ripped textures. A pixel display font is loaded from Google
Fonts (e.g. "Press Start 2P" for accents + a readable pixel face for body).

## 4. The home: "the world"

A side-view 2D scene:

- **Sky** that changes with day/night (sun or moon, pixel clouds by day, stars by night).
- **Ground** of grass-topped dirt blocks; a few background blocks/trees for depth (parallax).
- **Character** (Steve-like pixel sprite) moved with `←/→` or `A/D`, **jump with `Space`**, with a
  simple walk animation. Position is clamped to the world bounds; gravity returns it to the ground
  after a jump.
- **Wooden signs** placed along the ground, one per section (About, Experience, Skills, Education,
  Publication, Contact). When the character is within range of a sign, an "E" prompt appears;
  pressing `E`/`Enter` (or clicking the sign) opens that section. The world scrolls/pans so signs
  are reachable.
- **Title overlay** in main-menu style: name + role, with the classic rotating yellow **splash
  text** ("Backend wizard!").

## 5. HUD + Hotbar (real-stat wink)

- **Hearts** = number of companies worked at (`experience.items.length`, currently 4) — all full.
- **XP bar + level** = years coding since 2016 (`currentYear - 2016`), shown as the level number.
- **Hotbar**: 9 slots pinned to the bottom. The first 6 slots are the 6 sections (each an original
  pixel "item/block" icon); selecting a slot (keys `1`–`9` or click) opens/scrolls to that section.
  The active slot shows the white selection border. The hotbar is the **primary navigation on
  mobile**.

## 6. Sections — Minecraft GUI screens

Each section is rendered as a beveled gray GUI panel (original pixel borders), reading the same
bilingual content:

- **Skills** → **inventory** with category tabs (Languages, Frameworks, Databases, Tools, Concepts);
  each skill is an item in a slot with a hover tooltip.
- **Experience** → **Advancements**: each job is an advancement (icon, title, the stack as
  "obtained items", period) and fires an **"Achievement Get!" toast** when first opened.
- **Education** → advancement-style entries (degree + certification, credential id).
- **Publication** → **written book** (book-and-quill) with pages: title, venue, date, summary, link.
- **About** → an NPC dialog / sign-text box with the two summary paragraphs.
- **Contact** → **server-list** style rows (email / GitHub / LinkedIn as "servers" you can join).

## 7. Day/night, accessibility, SEO

- Theme toggle (`next-themes`, reused) = **day (light sky) / night (dark sky + stars)**, sun/moon
  button. Default **day**.
- **Accessibility**: full keyboard support (arrows/WASD move, `Space` jump, `1`–`9` select,
  `E`/`Enter` interact, `Esc` close); hotbar slots are focusable buttons; `prefers-reduced-motion`
  disables walking/parallax/toasts (instant, static scene).
- **SEO**: every section's content is real semantic HTML in the DOM (the GUI is the skin). Opening a
  section scrolls/focuses it — the proven hybrid pattern from the terminal version. All content is
  crawlable.
- **Achievement toast** also fires once on first load ("Opened Ricardo's portfolio").

## 8. Architecture / module boundaries

Reused: `content/` dictionaries, `LanguageProvider`, `ThemeProvider`, the i18n parity test.

New:

- `lib/minecraft.ts` — pure data + helpers: `SLOTS` registry (section id → icon key + label key),
  `derivedStats(content)` (hearts, level), `nearestSign(charX, signs, range)`, `clampX(x,min,max)`.
  Unit-tested.
- `components/minecraft/` —
  - `world.tsx` (scene orchestrator: sky + ground + character + signs + camera/pan),
  - `sky.tsx`, `ground.tsx`, `character.tsx` (sprite + walk/jump animation),
  - `use-movement.ts` (keyboard/touch movement + jump + interaction hook),
  - `hotbar.tsx`, `hud.tsx`,
  - `achievements.tsx` (toast provider + `useAchievements` hook),
  - `mc-panel.tsx`, `mc-button.tsx`, `block-icon.tsx` (CSS/SVG pixel block icons),
  - `controls.tsx` (day/night + language buttons, MC-styled),
  - `sections/` — About, Experience, Skills, Education, Publication, Contact (MC-styled, same data).
- `app/page.tsx` → Minecraft home; `app/terminal/page.tsx` → moved terminal page.
- `app/globals.css` → add a scoped `.mc` block with the Minecraft palette + pixel-font usage,
  keeping the terminal tokens untouched.

## 9. Testing

- `lib/__tests__/minecraft.test.ts` — `nearestSign` (in/out of range, picks closest), `clampX`
  (bounds), and `SLOTS` integrity (each section id appears exactly once, in `SECTION_IDS`).
- Existing i18n parity test stays green (content unchanged).
- Clean lint + `next build` (static).

## 10. Out of scope (YAGNI)

Real 3D/voxel rendering, multiplayer, sound, save files, mob entities, inventory drag-and-drop
mechanics beyond visual selection. Addable later.
