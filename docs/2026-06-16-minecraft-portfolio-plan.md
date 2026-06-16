# Minecraft Hybrid Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a playable 2D Minecraft-style home (`/`) to the existing app, moving the terminal portfolio to `/terminal`, reusing the bilingual content.

**Architecture:** Reuse `content/`, Language + Theme providers, and the i18n test. Add a pure `lib/minecraft.ts` (slots, stats, geometry helpers — unit-tested) consumed by a `components/minecraft/` layer: a side-view world with a keyboard/touch-controlled character, signs that open Minecraft-GUI sections rendered as crawlable semantic HTML, plus a hotbar, HUD, achievement toasts, and a day/night (theme) cycle. No Three.js; original CSS/SVG pixel art only.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · next-themes · framer-motion · next/font (pixel) · Vitest.

---

## File Structure

```
app/
  page.tsx                      # Minecraft home (replaced)
  terminal/page.tsx             # moved terminal page (new)
  globals.css                   # + scoped `.mc` palette & pixel-font usage
  layout.tsx                    # load pixel font; keep providers; drop global Nav/Footer
lib/
  minecraft.ts                  # SLOTS, derivedStats, nearestSign, clampX (pure)
  __tests__/minecraft.test.ts
components/
  minecraft/
    block-icon.tsx              # original CSS/SVG pixel block & item icons
    mc-panel.tsx                # beveled gray GUI window
    mc-button.tsx               # Minecraft-style button
    achievements.tsx            # toast provider + useAchievements hook
    sky.tsx                     # day/night sky, sun/moon, clouds, stars
    ground.tsx                  # grass+dirt block strip
    character.tsx               # pixel sprite + walk/jump animation
    use-movement.ts             # keyboard/touch movement, jump, interaction
    hotbar.tsx                  # 9 slots, selection (1-9 / click)
    hud.tsx                     # hearts + XP bar + level
    world.tsx                   # scene orchestrator + camera pan + signs
    controls.tsx                # day/night + language buttons (MC styled)
    mc-footer.tsx               # small footer w/ "view source" + terminal link
    sections/
      mc-section.tsx            # shared GUI section wrapper (panel + scroll target)
      about.tsx
      experience.tsx            # advancements
      skills.tsx                # inventory + category tabs
      education.tsx
      publication.tsx           # written book
      contact.tsx               # server-list
```

---

### Task 1: Move terminal to `/terminal`, load pixel font, scoped `.mc` palette

**Files:** Create `app/terminal/page.tsx`, `app/terminal/layout.tsx`; modify `app/layout.tsx`, `app/globals.css`; create temporary `app/page.tsx` placeholder.

- [ ] **Step 1: Move the terminal page**

Create `app/terminal/page.tsx` with the current home content:

```tsx
import { Terminal } from "@/components/terminal/terminal";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Publication } from "@/components/sections/publication";
import { Contact } from "@/components/sections/contact";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function TerminalPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl space-y-10 px-4 py-10 sm:py-16">
        <Terminal />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Publication />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Drop global Nav/Footer from root layout, load the pixel font**

In `app/layout.tsx`: remove the `<Nav/>` and `<Footer/>` imports/usage (each page renders its own now), and add the pixel font. Keep providers + mono font.

```tsx
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
// ...
const pixel = Press_Start_2P({ variable: "--font-pixel", subsets: ["latin"], weight: "400", display: "swap" });
// add `${pixel.variable}` to <html> className; body keeps font-mono as default.
// remove <Nav/> and <Footer/>, render just {children} inside providers.
```

- [ ] **Step 3: Scoped `.mc` palette in `app/globals.css`**

Append a Minecraft palette + helpers scoped under `.mc` (day) and `.mc.dark` / night via the existing theme class. Use only CSS (image-rendering pixelated for icons, blocky borders).

```css
/* ---- Minecraft scope ---------------------------------------------- */
.mc {
  --sky-top: #79c7ff;
  --sky-bottom: #c9ecff;
  --grass: #5ca832;
  --grass-dark: #3f7d22;
  --dirt: #7a5733;
  --dirt-dark: #5c4026;
  --stone: #8b8b8b;
  --stone-dark: #5a5a5a;
  --gui: #c6c6c6;
  --gui-dark: #545454;
  --gui-slot: #8b8b8b;
  --mc-text: #ffffff;
  --mc-shadow: #3f3f3f;
  --mc-yellow: #ffec5c;
  --mc-green: #7fd44b;
  font-family: var(--font-pixel), var(--font-jetbrains), monospace;
}
.dark .mc,
.mc.night {
  --sky-top: #0a0e2a;
  --sky-bottom: #1b2a4a;
  --grass: #2f5e1c;
  --grass-dark: #244a16;
}
.mc .pixelated { image-rendering: pixelated; }
.mc-bevel {
  border-style: solid;
  border-width: 4px;
  border-top-color: #fefefe;
  border-left-color: #fefefe;
  border-right-color: var(--gui-dark);
  border-bottom-color: var(--gui-dark);
  background: var(--gui);
}
@keyframes mc-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
@media (prefers-reduced-motion: reduce) { .mc-bob, .mc-walk { animation: none !important; } }
```

- [ ] **Step 4: Temporary home placeholder + verify routing**

Replace `app/page.tsx` with a temporary placeholder so the app still builds:

```tsx
export default function Home() {
  return <main className="mc min-h-screen p-8">Minecraft home — building…</main>;
}
```

Run: `npm run build`
Expected: build succeeds; routes `/` and `/terminal` both present.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "refactor: move terminal to /terminal, add pixel font + .mc palette"
```

---

### Task 2: Pure logic `lib/minecraft.ts` (TDD)

**Files:** Create `lib/minecraft.ts`, `lib/__tests__/minecraft.test.ts`.

- [ ] **Step 1: Write failing tests** — `lib/__tests__/minecraft.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { SLOTS, clampX, nearestSign, derivedStats, type Sign } from "@/lib/minecraft";
import { SECTION_IDS } from "@/content";
import { en } from "@/content/en";

describe("clampX", () => {
  it("returns the value within bounds", () => expect(clampX(50, 0, 100)).toBe(50));
  it("clamps below min", () => expect(clampX(-10, 0, 100)).toBe(0));
  it("clamps above max", () => expect(clampX(150, 0, 100)).toBe(100));
});

describe("nearestSign", () => {
  const signs: Sign[] = [
    { section: "about", x: 100 },
    { section: "skills", x: 300 },
  ];
  it("returns null when none in range", () => expect(nearestSign(0, signs, 40)).toBeNull());
  it("returns the section within range", () => expect(nearestSign(110, signs, 40)).toBe("about"));
  it("picks the closest when several are in range", () =>
    expect(nearestSign(150, [{ section: "about", x: 140 }, { section: "skills", x: 170 }], 100)).toBe("about"));
});

describe("SLOTS", () => {
  it("covers every section exactly once", () => {
    expect([...SLOTS.map((s) => s.section)].sort()).toEqual([...SECTION_IDS].sort());
  });
  it("has unique, sequential indexes", () => {
    expect(SLOTS.map((s) => s.index)).toEqual(SLOTS.map((_, i) => i));
  });
});

describe("derivedStats", () => {
  it("hearts = number of companies", () => expect(derivedStats(en, 2026).hearts).toBe(en.sections.experience.items.length));
  it("level = years since 2016", () => expect(derivedStats(en, 2026).level).toBe(10));
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test`
Expected: FAIL ("does not provide an export named 'SLOTS'").

- [ ] **Step 3: Implement** — `lib/minecraft.ts`

```ts
import { SECTION_IDS, type SectionId, type Content } from "@/content";

export type BlockIcon = "grass" | "crafting" | "chest" | "enchanted_book" | "book" | "ender_pearl";

export interface Slot {
  index: number;
  section: SectionId;
  icon: BlockIcon;
}

export const SLOTS: Slot[] = [
  { index: 0, section: "about", icon: "grass" },
  { index: 1, section: "experience", icon: "crafting" },
  { index: 2, section: "skills", icon: "chest" },
  { index: 3, section: "education", icon: "enchanted_book" },
  { index: 4, section: "publication", icon: "book" },
  { index: 5, section: "contact", icon: "ender_pearl" },
];

export interface Sign {
  section: SectionId;
  x: number;
}

export function clampX(x: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, x));
}

export function nearestSign(charX: number, signs: Sign[], range: number): SectionId | null {
  let best: { section: SectionId; dist: number } | null = null;
  for (const s of signs) {
    const dist = Math.abs(s.x - charX);
    if (dist <= range && (!best || dist < best.dist)) best = { section: s.section, dist };
  }
  return best?.section ?? null;
}

export interface DerivedStats {
  hearts: number;
  level: number;
}

export function derivedStats(content: Content, currentYear: number): DerivedStats {
  return {
    hearts: content.sections.experience.items.length,
    level: Math.max(0, currentYear - 2016),
  };
}

// Keep SECTION_IDS imported so SLOTS stays in sync (referenced by tests).
export const SECTION_ORDER = SECTION_IDS;
```

- [ ] **Step 4: Run tests** — `npm test` → all green (minecraft + commands + i18n).

- [ ] **Step 5: Commit** — `git add lib && git commit -m "feat: minecraft pure logic (slots, stats, geometry)"`

---

### Task 3: Pixel primitives + achievement toasts

**Files:** Create `components/minecraft/block-icon.tsx`, `mc-panel.tsx`, `mc-button.tsx`, `achievements.tsx`.

- [ ] **Step 1: `block-icon.tsx`** — an original pixel-art icon per `BlockIcon`, drawn as a small CSS grid of colored cells (no external textures). Props: `{ icon: BlockIcon; size?: number }`. Implement each icon as a 4×4 or 8×8 array of hex colors mapped to `<div>` cells inside a `grid` with `image-rendering: pixelated`. Colors keyed off the palette (grass=greens/brown, chest=wood+latch, book=paper+cover, ender_pearl=teal, crafting=wood grid, enchanted_book=purple sheen).

- [ ] **Step 2: `mc-panel.tsx`** — GUI window: `<div className="mc-bevel ...">` with an optional title bar in pixel font. Props `{ title?: string; children; className? }`. Uses `--gui` background, beveled borders.

- [ ] **Step 3: `mc-button.tsx`** — button with the classic gray bevel that inverts on `:active`. Props `{ onClick; children; ariaLabel?; selected? }`. Keyboard focusable, focus-visible ring in `--mc-yellow`.

- [ ] **Step 4: `achievements.tsx`** — context provider `AchievementsProvider` + `useAchievements()` returning `unlock(title: string, icon: BlockIcon)`. Maintains a queue; renders toasts top-right styled like the "Achievement Get!" box (dark panel, gold title), each auto-dismissing after 4s via `setTimeout`. Animate in/out with framer-motion; under reduced motion, show instantly and still auto-dismiss. Guard against duplicate unlock of the same title.

- [ ] **Step 5: Verify build + commit**

```bash
npm run build && git add components/minecraft && git commit -m "feat: minecraft pixel primitives + achievement toasts"
```

---

### Task 4: The world (sky, ground, character, movement, hotbar, HUD)

**Files:** Create `components/minecraft/sky.tsx`, `ground.tsx`, `character.tsx`, `use-movement.ts`, `hotbar.tsx`, `hud.tsx`, `world.tsx`, `controls.tsx`.

- [ ] **Step 1: `sky.tsx`** — full-bleed gradient from `--sky-top` to `--sky-bottom`; a sun (day) or moon + CSS stars (night) positioned by the current theme; a few pixel clouds (day). Reads `useTheme()` `resolvedTheme` with a mounted guard; `suppressHydrationWarning` on theme-dependent nodes.

- [ ] **Step 2: `ground.tsx`** — a horizontal strip of grass-topped dirt blocks spanning the world width (CSS repeating-linear-gradient or a flex row of block divs). Fixed block size constant `BLOCK = 48`.

- [ ] **Step 3: `use-movement.ts`** — hook owning `{ x, facing, isWalking, isJumping }`. Listens for keydown/keyup: `ArrowLeft/a`, `ArrowRight/d` set velocity; `Space/w/ArrowUp` triggers a jump (vertical offset via a short timed arc); `e`/`Enter` calls `onInteract(nearestSign(x, signs, range))`. A `requestAnimationFrame` loop integrates position and `clampX` to `[0, worldWidth]`. Cleans up listeners + RAF on unmount. Under reduced motion, disables the RAF bob but still moves on key/scroll. Exposes `setX` for hotbar-driven focus.

- [ ] **Step 4: `character.tsx`** — pixel sprite (original CSS pixel-art Steve-like figure) flipped by `facing`, with a `mc-walk` leg animation when `isWalking` and a translateY when jumping. Positioned absolutely at `x`.

- [ ] **Step 5: `hotbar.tsx`** — 9 slot cells (`mc-bevel` insets); first 6 render a `BlockIcon` for their section, slots 7–9 empty. Props `{ selected: number; onSelect: (sectionIndex: number) => void }`. Click selects; the parent wires keys `1`–`9`. Active slot has a 3px white outline. Each slot is a `<button>` with `aria-label` = section heading.

- [ ] **Step 6: `hud.tsx`** — a row of `hearts` heart icons (CSS pixel hearts, all filled) + an XP bar (green fill) with the `level` number centered. Reads `derivedStats(t, new Date().getFullYear())`.

- [ ] **Step 7: `controls.tsx`** — top-right MC buttons: day/night (sun/moon) via `next-themes`, and language via `useLanguage().toggle()`. Reuse `mc-button`.

- [ ] **Step 8: `world.tsx`** — client orchestrator. Defines `signs: Sign[]` spaced across `worldWidth` (e.g., each section sign at `x = 240 + i*260`). Renders `Sky`, a horizontally-scrolling world container that pans so the character stays roughly centered (`translateX(-cameraX)`), `Ground`, the section signs (wooden sign + pixel label + an "E" prompt when `nearestSign` matches), and `Character`. Uses `use-movement`. On interact or hotbar select → `document.getElementById(section)?.scrollIntoView()` and unlock achievement. Renders `HUD`, `Hotbar`, `Controls`, and the splash title overlay (name + role + rotating yellow splash). Wires number keys to hotbar.

- [ ] **Step 9: Verify build + commit**

```bash
npm run build && git add components/minecraft && git commit -m "feat: minecraft world, character, movement, hotbar, HUD"
```

---

### Task 5: Minecraft GUI sections

**Files:** Create `components/minecraft/sections/mc-section.tsx` + `about.tsx`, `experience.tsx`, `skills.tsx`, `education.tsx`, `publication.tsx`, `contact.tsx`.

- [ ] **Step 1: `mc-section.tsx`** — wrapper: `<section id={id} aria-labelledby>` containing an `mc-panel` titled with the section heading (pixel font), framer-motion fade/slide on `whileInView` (disabled under reduced motion). One purpose: consistent GUI framing + scroll target.

- [ ] **Step 2: `about.tsx`** — NPC dialog / sign-text box: the two `about.body` paragraphs in a parchment-style inner panel.

- [ ] **Step 3: `experience.tsx`** — advancements list: each job is a row with a `BlockIcon`, bold company (pixel), role, period (right-aligned), optional description, and the stack rendered as small item chips. On mount within view, `useAchievements().unlock("<heading>", "crafting")` once.

- [ ] **Step 4: `skills.tsx`** — inventory: category tabs (the `groups`); selected tab shows its items as a grid of slot cells (`mc-bevel` insets) each with a small `BlockIcon` + label and a hover/focus tooltip with the item name.

- [ ] **Step 5: `education.tsx`** — advancement-style entries: title, org, period, `// credential: <id>` when present.

- [ ] **Step 6: `publication.tsx`** — written-book panel (paper background, two visual pages): title, venue, date, summary, and a link button (`mc-button`) to the publication.

- [ ] **Step 7: `contact.tsx`** — server-list rows: each of email/GitHub/LinkedIn as a "server" entry (icon + label + value + a "join"/connect `mc-button` linking out; email uses `mailto:`). Reads `CONTACT`.

- [ ] **Step 8: Verify build + commit**

```bash
npm run build && git add components/minecraft/sections && git commit -m "feat: minecraft GUI sections"
```

---

### Task 6: Compose the home page + cross-links

**Files:** Modify `app/page.tsx`; create `components/minecraft/mc-footer.tsx`; modify `components/terminal/terminal.tsx` (add `play`/`mc` command).

- [ ] **Step 1: `app/page.tsx`** — Minecraft home:

```tsx
import { AchievementsProvider } from "@/components/minecraft/achievements";
import { World } from "@/components/minecraft/world";
import { About } from "@/components/minecraft/sections/about";
import { Experience } from "@/components/minecraft/sections/experience";
import { Skills } from "@/components/minecraft/sections/skills";
import { Education } from "@/components/minecraft/sections/education";
import { Publication } from "@/components/minecraft/sections/publication";
import { Contact } from "@/components/minecraft/sections/contact";
import { McFooter } from "@/components/minecraft/mc-footer";

export default function Home() {
  return (
    <div className="mc min-h-screen">
      <AchievementsProvider>
        <World />
        <main className="mx-auto w-full max-w-3xl space-y-8 px-4 py-12">
          <About />
          <Experience />
          <Skills />
          <Education />
          <Publication />
          <Contact />
        </main>
        <McFooter />
      </AchievementsProvider>
    </div>
  );
}
```

- [ ] **Step 2: `mc-footer.tsx`** — small footer with `t.footer.builtWith`, a "view source" link to `CONTACT.repo`, and a wooden-sign link "→ terminal mode" to `/terminal`.

- [ ] **Step 3: Terminal cross-link** — in `components/terminal/terminal.tsx`, add a `play` (alias `mc`) handling: on that command, `window.location.href = "/"`. Add `play` to `lib/commands.ts` COMMANDS as a util with alias `mc`, description "launch the game". Update the `commands.help` strings in `en.ts`/`es.ts` to mention it (keeps i18n parity).

- [ ] **Step 4: Verify build + commit**

```bash
npm run build && git add -A && git commit -m "feat: compose minecraft home, footer, terminal cross-link"
```

---

### Task 7: Final verification

- [ ] **Step 1: Full check**

```bash
cd /home/rikr2/source/my-portfolio/claude-v1
npm run lint && npm test && npm run build
```

Expected: lint clean, all tests pass (minecraft + commands + i18n), static build OK for `/`, `/terminal`.

- [ ] **Step 2: Runtime smoke** — `PORT=3100 npm run start`, then verify `/` and `/terminal` return 200 and that `/` HTML contains section content (AlayaCare, PostgreSQL, ResearchGate). Confirm in a browser if possible: character moves with arrows + Space jump; hotbar 1-6 opens sections; signs show E prompt; day/night + lang toggles; achievement toast fires. Fix issues, re-run Step 1.

- [ ] **Step 3: Update README + commit** — note the two routes (`/` Minecraft, `/terminal`), controls, and that pixel art is original. Commit.

```bash
git add -A && git commit -m "docs: document minecraft home and controls"
```

---

## Self-Review

**Spec coverage:** routing keep-both + cross-links (Tasks 1,6) · no copyrighted assets / original pixel art (Task 3) · world: sky/ground/character/jump/signs/splash (Tasks 1,4) · HUD hearts+XP real-stat wink (Tasks 2,4) · hotbar 9 slots, keys 1-9, mobile nav (Task 4) · GUI sections incl. inventory/advancements/book/server-list (Task 5) · achievements toasts incl. on-open + first-load (Tasks 3,4,5) · day/night theme reuse (Tasks 1,4) · accessibility (keyboard, focus, reduced motion) (Tasks 3,4,5) · SEO sections in DOM (Tasks 5,6) · tests for pure logic + i18n parity (Task 2) · YAGNI excludes 3D/audio/save. All mapped.

**Placeholder scan:** logic (Task 2) is fully coded. Primitive/world/section tasks (3–6) are specced with exact files, props, palette tokens, and data sources rather than full pixel-by-pixel JSX — intentional for art-heavy components; each file has one clear responsibility. No "TBD"/"handle edge cases".

**Type consistency:** `Sign`, `Slot`, `BlockIcon`, `SLOTS`, `clampX`, `nearestSign`, `derivedStats` consistent across Tasks 2,4,5. `useAchievements().unlock(title, icon)` signature consistent (Tasks 3,5). Reused `Content`/`SECTION_IDS`/`CONTACT`/`useLanguage`/`useTheme` unchanged. New `play`/`mc` command added to the existing `COMMANDS`/`resolveCommand` shape (Task 6) — i18n `help` strings updated in both locales to preserve parity.
