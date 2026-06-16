# Terminal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Ricardo Fundora's bilingual, terminal-themed personal portfolio as a static Next.js site deployable to Vercel.

**Architecture:** Next.js App Router static site. Pure logic (i18n content dictionary, command parser) lives in `lib/` + `content/` and is unit-tested with Vitest. React layers — providers, terminal, sections — consume that logic. A hybrid hero terminal accepts typed/clicked commands that smooth-scroll to fully-rendered, crawlable terminal-styled sections.

**Tech Stack:** Next.js 15 (App Router) · TypeScript · React 19 · Tailwind CSS v4 · next-themes · framer-motion · next/font (JetBrains Mono) · Vitest.

---

## File Structure

```
claude-v1/
  app/
    layout.tsx              # root layout, fonts, providers, metadata
    page.tsx                # composes terminal + all sections
    globals.css             # tailwind + theme tokens (dark/light terminal)
    opengraph-image.tsx     # generated OG image
    icon.tsx                # generated favicon
  components/
    providers/
      theme-provider.tsx    # next-themes wrapper
      language-provider.tsx # i18n context + useLanguage hook
    terminal/
      terminal.tsx          # hero terminal orchestrator (boot, input, output)
      terminal-window.tsx   # window chrome (dots, title bar)
      terminal-input.tsx    # prompt input: history, Tab autocomplete
      terminal-output.tsx   # rendered output lines
      command-chips.tsx     # clickable command buttons
      use-typewriter.ts     # typewriter hook (respects reduced motion)
    sections/
      section-shell.tsx     # shared terminal-styled section wrapper
      about.tsx
      experience.tsx
      skills.tsx
      education.tsx
      publication.tsx
      contact.tsx
    nav.tsx                 # lang toggle + theme toggle
    footer.tsx
  content/
    types.ts                # Content type definitions
    en.ts                   # English dictionary
    es.ts                   # Spanish dictionary
    index.ts                # exports dictionaries map + section ids
  lib/
    commands.ts             # pure command registry + parser + autocomplete
  lib/__tests__/
    commands.test.ts
  content/__tests__/
    i18n-parity.test.ts
  vitest.config.ts
  docs/                     # this plan + the design spec
```

---

### Task 0: Scaffold project, deps, tooling

**Files:** entire `claude-v1/` Next.js app (generated), plus `vitest.config.ts`.

- [ ] **Step 1: Preserve docs, scaffold Next.js**

The `claude-v1/docs/` folder already exists (spec + plan), and create-next-app refuses a non-empty target. Move docs aside, scaffold, restore.

```bash
cd /home/rikr2/source/my-portfolio
mv claude-v1/docs /tmp/cv1-docs
npx create-next-app@latest claude-v1 --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*" --use-npm --yes
mv /tmp/cv1-docs claude-v1/docs
```

- [ ] **Step 2: Install runtime + test deps**

```bash
cd /home/rikr2/source/my-portfolio/claude-v1
npm install next-themes framer-motion
npm install -D vitest @vitejs/plugin-react jsdom
```

- [ ] **Step 3: Add Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

Add scripts to `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: Init git + verify build**

```bash
cd /home/rikr2/source/my-portfolio/claude-v1
git init -q && git add -A && git commit -qm "chore: scaffold Next.js terminal portfolio"
npm run build
```

Expected: build succeeds (default app). Commit.

---

### Task 1: Content types + bilingual dictionaries

**Files:** Create `content/types.ts`, `content/en.ts`, `content/es.ts`, `content/index.ts`.

- [ ] **Step 1: Define content types** — `content/types.ts`

```ts
export type Locale = "en" | "es";

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  remote?: boolean;
  description?: string;
  stack: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface EducationItem {
  title: string;
  org: string;
  period: string;
  credentialId?: string;
}

export interface Content {
  meta: { title: string; description: string };
  nav: { langLabel: string; themeLabel: string };
  hero: {
    name: string;
    role: string;
    bootCommand: string;       // e.g. "whoami"
    tagline: string;           // printed under name
    prompt: string;            // e.g. "ricardo@portfolio:~$"
    hint: string;              // "type a command or tap below"
  };
  commands: { help: string; unknown: string; cleared: string };
  sections: {
    about: { heading: string; body: string[] };
    experience: { heading: string; items: ExperienceItem[] };
    skills: { heading: string; groups: SkillGroup[] };
    education: { heading: string; items: EducationItem[] };
    publication: {
      heading: string;
      title: string;
      venue: string;
      date: string;
      summary: string;
      link: string;
    };
    contact: { heading: string; intro: string };
  };
  footer: { builtWith: string; viewSource: string };
}
```

- [ ] **Step 2: Write English dictionary** — `content/en.ts`

```ts
import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Ricardo Fundora — Senior Software Engineer",
    description:
      "Senior Software Engineer specialized in backend (Python / .NET) and full-stack development. 5+ years remote for international companies.",
  },
  nav: { langLabel: "ES", themeLabel: "theme" },
  hero: {
    name: "Ricardo Fundora Hernández",
    role: "Senior Software Engineer · Backend (Python / .NET) · Full-Stack · Remote",
    bootCommand: "whoami",
    tagline:
      "Software engineer since 2016. 5+ years building backends, REST APIs and automation remotely for international teams.",
    prompt: "ricardo@portfolio:~$",
    hint: "Type a command (try `help`) or tap one below",
  },
  commands: {
    help: "Available commands: about · experience · skills · education · publication · contact · theme · lang · clear",
    unknown: "command not found. Type `help` for the list.",
    cleared: "",
  },
  sections: {
    about: {
      heading: "About",
      body: [
        "Software engineer with experience since 2016 and 5+ years working remotely for international companies.",
        "Specialized in backend development with Python and .NET, building REST APIs, automating processes, and going full-stack when the project needs it.",
      ],
    },
    experience: {
      heading: "Experience",
      items: [
        {
          company: "Selector",
          role: "Full-Stack Developer",
          period: "Jan 2026 – Present",
          remote: true,
          stack: ["AI", "AWS", "TypeScript", "Python"],
        },
        {
          company: "GSI – General Software Inc",
          role: "Backend Developer (Full-time)",
          period: "Jul 2022 – Present",
          stack: ["C#", "Docker", "PHP", "Python", "YAML", "Postman"],
        },
        {
          company: "AlayaCare",
          role: "Backend Developer",
          period: "Dec 2022 – Aug 2025",
          description:
            "Cloud platform for home-care agencies. Built billing solutions (general and custom) and optimized data retrieval and backend processes.",
          stack: ["PHP", "JavaScript", "Vue.js", "Python", "Docker", "AWS"],
        },
        {
          company: "Wisegar",
          role: "Software Developer (Part-time)",
          period: "Mar 2020 – Jul 2022",
          stack: ["C#"],
        },
      ],
    },
    skills: {
      heading: "Skills",
      groups: [
        { label: "Languages", items: ["Python", "C#", "PHP", "JavaScript", "TypeScript", "C++", "Dart", "Solidity"] },
        { label: "Frameworks / Libraries", items: ["Django", "ASP.NET Core", "ASP.NET Razor", "Vue.js", "React.js", "Node.js", "Flutter", "Bootstrap"] },
        { label: "Databases", items: ["PostgreSQL", "MongoDB", "NoSQL"] },
        { label: "DevOps / Tools", items: ["Docker", "Git", "AWS", "YAML", "Postman", "Odoo", "WordPress", "Unity3D"] },
        { label: "Concepts", items: ["OOP", "Algorithms", "Data Structures", "Web Dev", "Game Dev", "Blockchain", "Virtualization", "Mobile Game Dev"] },
      ],
    },
    education: {
      heading: "Education & Certifications",
      items: [
        { title: "B.Sc. Computer Science", org: "Universidad de La Habana", period: "2011 – 2016" },
        { title: "Foundational C# with Microsoft", org: "freeCodeCamp", period: "May 2024", credentialId: "rikr2-fcswm" },
      ],
    },
    publication: {
      heading: "Publication",
      title: "Conjunto de herramientas citogenéticas para el trabajo con cromosomas",
      venue: "ResearchGate · Universidad de La Habana (graduation project)",
      date: "Jun 2016",
      summary:
        "Semi-automatic karyotype construction system reaching ~54% accuracy in chromosome classification.",
      link: "https://www.researchgate.net/",
    },
    contact: {
      heading: "Contact",
      intro: "Open to remote opportunities. Reach me at:",
    },
  },
  footer: { builtWith: "Built with Next.js, deployed on Vercel.", viewSource: "view source" },
};
```

- [ ] **Step 3: Write Spanish dictionary** — `content/es.ts` (same shape, translated copy; data values like company names, stack, dates stay identical)

```ts
import type { Content } from "./types";

export const es: Content = {
  meta: {
    title: "Ricardo Fundora — Senior Software Engineer",
    description:
      "Senior Software Engineer especializado en backend (Python / .NET) y desarrollo full-stack. +5 años en remoto para empresas internacionales.",
  },
  nav: { langLabel: "EN", themeLabel: "tema" },
  hero: {
    name: "Ricardo Fundora Hernández",
    role: "Senior Software Engineer · Backend (Python / .NET) · Full-Stack · Remoto",
    bootCommand: "whoami",
    tagline:
      "Ingeniero de software desde 2016. +5 años construyendo backends, APIs REST y automatización en remoto para equipos internacionales.",
    prompt: "ricardo@portfolio:~$",
    hint: "Escribe un comando (prueba `help`) o toca uno abajo",
  },
  commands: {
    help: "Comandos disponibles: about · experience · skills · education · publication · contact · theme · lang · clear",
    unknown: "comando no encontrado. Escribe `help` para ver la lista.",
    cleared: "",
  },
  sections: {
    about: {
      heading: "Sobre mí",
      body: [
        "Ingeniero de software con experiencia desde 2016 y +5 años trabajando en remoto para empresas internacionales.",
        "Especializado en desarrollo backend con Python y .NET, construcción de APIs REST, automatización de procesos y full-stack según las necesidades del proyecto.",
      ],
    },
    experience: {
      heading: "Experiencia",
      items: [
        { company: "Selector", role: "Full-Stack Developer", period: "Ene 2026 – Presente", remote: true, stack: ["AI", "AWS", "TypeScript", "Python"] },
        { company: "GSI – General Software Inc", role: "Backend Developer (Tiempo completo)", period: "Jul 2022 – Presente", stack: ["C#", "Docker", "PHP", "Python", "YAML", "Postman"] },
        { company: "AlayaCare", role: "Backend Developer", period: "Dic 2022 – Ago 2025", description: "Plataforma cloud para agencias de cuidado domiciliario. Desarrolló soluciones de facturación (general y personalizada) y optimizó la recuperación de datos y procesos backend.", stack: ["PHP", "JavaScript", "Vue.js", "Python", "Docker", "AWS"] },
        { company: "Wisegar", role: "Software Developer (Medio tiempo)", period: "Mar 2020 – Jul 2022", stack: ["C#"] },
      ],
    },
    skills: {
      heading: "Skills",
      groups: [
        { label: "Lenguajes", items: ["Python", "C#", "PHP", "JavaScript", "TypeScript", "C++", "Dart", "Solidity"] },
        { label: "Frameworks / Librerías", items: ["Django", "ASP.NET Core", "ASP.NET Razor", "Vue.js", "React.js", "Node.js", "Flutter", "Bootstrap"] },
        { label: "Bases de datos", items: ["PostgreSQL", "MongoDB", "NoSQL"] },
        { label: "DevOps / Herramientas", items: ["Docker", "Git", "AWS", "YAML", "Postman", "Odoo", "WordPress", "Unity3D"] },
        { label: "Conceptos", items: ["OOP", "Algoritmos", "Estructuras de datos", "Desarrollo Web", "Game Dev", "Blockchain", "Virtualización", "Mobile Game Dev"] },
      ],
    },
    education: {
      heading: "Formación y certificaciones",
      items: [
        { title: "Lic. en Ciencias de la Computación", org: "Universidad de La Habana", period: "2011 – 2016" },
        { title: "Foundational C# with Microsoft", org: "freeCodeCamp", period: "Mayo 2024", credentialId: "rikr2-fcswm" },
      ],
    },
    publication: {
      heading: "Publicación",
      title: "Conjunto de herramientas citogenéticas para el trabajo con cromosomas",
      venue: "ResearchGate · Universidad de La Habana (proyecto de graduación)",
      date: "Jun 2016",
      summary:
        "Sistema de construcción semi-automática de cariotipos con ~54% de precisión en la clasificación de cromosomas.",
      link: "https://www.researchgate.net/",
    },
    contact: { heading: "Contacto", intro: "Abierto a oportunidades remotas. Escríbeme a:" },
  },
  footer: { builtWith: "Hecho con Next.js, desplegado en Vercel.", viewSource: "ver código" },
};
```

- [ ] **Step 4: Index + shared constants** — `content/index.ts`

```ts
import { en } from "./en";
import { es } from "./es";
import type { Content, Locale } from "./types";

export const dictionaries: Record<Locale, Content> = { en, es };

export const SECTION_IDS = ["about", "experience", "skills", "education", "publication", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const CONTACT = {
  email: "rikr2fun2ra@gmail.com",
  github: "https://github.com/RiKr2",
  linkedin: "https://www.linkedin.com/in/rikr2/",
  repo: "https://github.com/RiKr2",
};

export type { Content, Locale };
```

- [ ] **Step 5: Commit**

```bash
git add content && git commit -qm "feat: bilingual content dictionaries and types"
```

---

### Task 2: i18n parity test

**Files:** Create `content/__tests__/i18n-parity.test.ts`.

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from "vitest";
import { dictionaries } from "@/content";

function keyPaths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj) || typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe("i18n parity", () => {
  it("en and es share the exact same key structure", () => {
    const enKeys = keyPaths(dictionaries.en).sort();
    const esKeys = keyPaths(dictionaries.es).sort();
    expect(esKeys).toEqual(enKeys);
  });
});
```

- [ ] **Step 2: Run test**

Run: `npm test`
Expected: PASS (dictionaries already aligned). If FAIL, the diff shows mismatched keys — fix the dictionary, do not weaken the test.

- [ ] **Step 3: Commit**

```bash
git add content/__tests__ && git commit -qm "test: i18n key parity between en and es"
```

---

### Task 3: Command parser (pure logic, TDD)

**Files:** Create `lib/commands.ts`, `lib/__tests__/commands.test.ts`.

- [ ] **Step 1: Write failing tests** — `lib/__tests__/commands.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { resolveCommand, autocomplete, COMMANDS } from "@/lib/commands";

describe("resolveCommand", () => {
  it("resolves a known command by name", () => {
    expect(resolveCommand("about")?.id).toBe("about");
  });
  it("is case-insensitive and trims whitespace", () => {
    expect(resolveCommand("  ABOUT  ")?.id).toBe("about");
  });
  it("resolves aliases (whoami -> about)", () => {
    expect(resolveCommand("whoami")?.id).toBe("about");
  });
  it("returns null for unknown commands", () => {
    expect(resolveCommand("dance")).toBeNull();
  });
});

describe("autocomplete", () => {
  it("returns commands starting with the fragment", () => {
    expect(autocomplete("ex")).toContain("experience");
  });
  it("returns empty array when nothing matches", () => {
    expect(autocomplete("zzz")).toEqual([]);
  });
  it("returns all command names for empty input", () => {
    expect(autocomplete("").length).toBe(COMMANDS.length);
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test`
Expected: FAIL ("does not provide an export named 'resolveCommand'").

- [ ] **Step 3: Implement** — `lib/commands.ts`

```ts
export type CommandKind = "section" | "util";

export interface Command {
  id: string;          // canonical id (also section id for kind "section")
  aliases: string[];
  kind: CommandKind;
  description: string;
}

export const COMMANDS: Command[] = [
  { id: "about", aliases: ["whoami"], kind: "section", description: "who I am" },
  { id: "experience", aliases: ["work"], kind: "section", description: "where I've worked" },
  { id: "skills", aliases: ["stack"], kind: "section", description: "tech I use" },
  { id: "education", aliases: [], kind: "section", description: "studies & certs" },
  { id: "publication", aliases: ["paper"], kind: "section", description: "research" },
  { id: "contact", aliases: ["email"], kind: "section", description: "get in touch" },
  { id: "help", aliases: ["?"], kind: "util", description: "list commands" },
  { id: "theme", aliases: [], kind: "util", description: "toggle dark/light" },
  { id: "lang", aliases: [], kind: "util", description: "toggle ES/EN" },
  { id: "clear", aliases: ["cls"], kind: "util", description: "clear the terminal" },
];

const NAMES = COMMANDS.flatMap((c) => [c.id, ...c.aliases]);

export function resolveCommand(input: string): Command | null {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  return COMMANDS.find((c) => c.id === q || c.aliases.includes(q)) ?? null;
}

export function autocomplete(fragment: string): string[] {
  const q = fragment.trim().toLowerCase();
  if (!q) return COMMANDS.map((c) => c.id);
  return NAMES.filter((n) => n.startsWith(q));
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `npm test`
Expected: PASS (all parser + i18n tests green).

- [ ] **Step 5: Commit**

```bash
git add lib && git commit -qm "feat: pure command parser with aliases and autocomplete"
```

---

### Task 4: Providers (theme + language)

**Files:** Create `components/providers/theme-provider.tsx`, `components/providers/language-provider.tsx`.

- [ ] **Step 1: Theme provider** — wraps `next-themes`

```tsx
"use client";
import { ThemeProvider as NextThemes } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {children}
    </NextThemes>
  );
}
```

- [ ] **Step 2: Language provider** — context + hook, persists to localStorage, sets `<html lang>`

```tsx
"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { dictionaries, type Content, type Locale } from "@/content";

interface LanguageCtx { locale: Locale; t: Content; toggle: () => void; setLocale: (l: Locale) => void; }
const Ctx = createContext<LanguageCtx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("locale")) as Locale | null;
    if (saved === "en" || saved === "es") setLocale(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = locale;
    if (typeof window !== "undefined") localStorage.setItem("locale", locale);
  }, [locale]);

  const toggle = useCallback(() => setLocale((l) => (l === "en" ? "es" : "en")), []);

  return <Ctx.Provider value={{ locale, t: dictionaries[locale], toggle, setLocale }}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
```

- [ ] **Step 3: Commit**

```bash
git add components/providers && git commit -qm "feat: theme and language providers"
```

---

### Task 5: globals.css theme tokens + layout/fonts

**Files:** Modify `app/globals.css`, `app/layout.tsx`.

- [ ] **Step 1: Theme tokens in `app/globals.css`** (Tailwind v4 `@theme` + dark `.dark` overrides)

Define CSS variables for both themes: terminal background, panel, border, foreground, muted, and syntax accents (`--c-prompt` green, `--c-key` magenta/purple, `--c-str` cyan, `--c-comment` gray, `--c-fn` yellow). Dark = near-black (`#0b0e14` bg, `#11151f` panel) with bright accents; light = `#fbf7f0`/`#ffffff` panels with darker accents (Catppuccin-Latte-like). Map them to Tailwind utility tokens. Set `body` to use the mono font, base bg/fg, and `scroll-behavior: smooth` (guarded by `prefers-reduced-motion`).

```css
@import "tailwindcss";

:root {
  --bg: #0b0e14; --panel: #11151f; --border: #1f2733; --fg: #c9d3e0; --muted: #6b7785;
  --c-prompt: #7ee787; --c-key: #d2a8ff; --c-str: #79c0ff; --c-comment: #6b7785; --c-fn: #e3b341; --accent: #7ee787;
}
.light {
  --bg: #faf6ef; --panel: #ffffff; --border: #e6dfd2; --fg: #2b2b2b; --muted: #7a7466;
  --c-prompt: #2f9e44; --c-key: #8839ef; --c-str: #1c7ed6; --c-comment: #8a8170; --c-fn: #b8860b; --accent: #2f9e44;
}
@theme inline {
  --color-bg: var(--bg); --color-panel: var(--panel); --color-border: var(--border);
  --color-fg: var(--fg); --color-muted: var(--muted);
  --color-prompt: var(--c-prompt); --color-key: var(--c-key); --color-str: var(--c-str);
  --color-comment: var(--c-comment); --color-fn: var(--c-fn); --color-accent: var(--accent);
}
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } * { animation: none !important; } }
body { background: var(--bg); color: var(--fg); }
```

Note: with `next-themes` `attribute="class"`, the dark theme is the default `:root`; add a `.light` class path. Set `defaultTheme="dark"` so `:root` values apply, and `.light` overrides when light is active. (Adjust: use `.dark`/`.light` both explicitly if needed during execution.)

- [ ] **Step 2: Root layout** — `app/layout.tsx`: load JetBrains Mono via `next/font/google`, set `<html suppressHydrationWarning>`, wrap children in `ThemeProvider` > `LanguageProvider`, render `<Nav/>` ... `<Footer/>`. Export `metadata` from the English dict as default.

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { en } from "@/content/en";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  metadataBase: new URL("https://example.vercel.app"),
  openGraph: { title: en.meta.title, description: en.meta.description, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mono.variable} font-mono antialiased`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Set `font-mono` to the variable in the Tailwind theme (`--font-mono`). Commit.

```bash
git add app && git commit -qm "feat: theme tokens, fonts, root layout with providers"
```

---

### Task 6: Terminal components

**Files:** Create `components/terminal/*` and `components/terminal/use-typewriter.ts`.

- [ ] **Step 1: `use-typewriter.ts`** — hook that types a string char-by-char into state; respects `prefers-reduced-motion` (renders full string instantly). Returns `{ text, done }`. Accepts `{ text, speed = 38, startDelay = 250 }`.

- [ ] **Step 2: `terminal-window.tsx`** — presentational chrome: rounded panel `bg-panel border border-border`, top bar with three dots (red/yellow/green) and a centered title prop; children are the body. Accessible: `role="region" aria-label="terminal"`.

- [ ] **Step 3: `command-chips.tsx`** — renders a button per section command (`COMMANDS.filter(kind==="section")` + a `help` chip) using labels from content; `onSelect(id)` callback; keyboard-focusable, `bg-bg hover:border-accent` styling.

- [ ] **Step 4: `terminal-output.tsx`** — renders an array of output lines `{ id, prompt?, text, tone? }` where `tone` maps to a syntax color; prompt lines show the `prompt` string in `text-prompt`.

- [ ] **Step 5: `terminal-input.tsx`** — controlled input prefixed by the `prompt`. Handles: Enter (submit → `onCommand(value)`), ArrowUp/ArrowDown (history), Tab (autocomplete via `autocomplete()`; complete to common prefix / first match). Blinking caret via CSS. `aria-label="command input"`.

- [ ] **Step 6: `terminal.tsx`** — orchestrator (client). On mount, typewriter the `hero.bootCommand` then print name + tagline. Maintains output-line state + command history. `runCommand(input)`:
  - resolve via `resolveCommand`; if null → push `commands.unknown` line.
  - `section` → push an echo line + `scrollToSection(id)` (smooth scroll to `#${id}`).
  - `help` → push `commands.help`. `clear` → reset lines. `theme` → `next-themes` `setTheme` toggle. `lang` → `useLanguage().toggle()`.
  Renders: `TerminalWindow` > boot/output > `TerminalInput` > `CommandChips`. Reads copy from `useLanguage().t`.

- [ ] **Step 7: Verify build + commit**

```bash
npm run build && git add components/terminal && git commit -qm "feat: interactive hero terminal (input, history, autocomplete, chips)"
```

---

### Task 7: Section components + nav + footer

**Files:** Create `components/sections/*`, `components/nav.tsx`, `components/footer.tsx`.

- [ ] **Step 1: `section-shell.tsx`** — wrapper: `<section id={id} aria-labelledby>` containing a `TerminalWindow` whose title is `~/ {id}` and whose body shows a prompt line `ricardo@portfolio:~$ {command}` then the children as "output". Adds a framer-motion fade/slide-up on scroll into view (`whileInView`, `viewport={{ once: true }}`), disabled under reduced motion.

- [ ] **Step 2: section bodies** — each reads `useLanguage().t.sections.*`:
  - `about.tsx` — paragraphs from `about.body`.
  - `experience.tsx` — list of items: company (text-fn), role, period (text-muted), optional description, stack as chips (text-str).
  - `skills.tsx` — each group rendered like an object literal: `label: [ item, item ]` with items in `text-str`, label in `text-key`.
  - `education.tsx` — items with title (text-fn), org, period, optional `credentialId` in `text-comment`.
  - `publication.tsx` — title, venue, date, summary, link button.
  - `contact.tsx` — intro + buttons (Email `mailto:`, GitHub, LinkedIn) from `CONTACT`; rendered as commented links `// email →`.

- [ ] **Step 3: `nav.tsx`** — fixed top-right: language toggle button (shows `nav.langLabel`) calling `useLanguage().toggle()`, and theme toggle (sun/moon) calling `next-themes` `setTheme`. `aria-label`s on both. Mounted-guard for theme to avoid hydration mismatch.

- [ ] **Step 4: `footer.tsx`** — `footer.builtWith` + `footer.viewSource` link to `CONTACT.repo`.

- [ ] **Step 5: Verify build + commit**

```bash
npm run build && git add components && git commit -qm "feat: content sections, nav (lang+theme toggles), footer"
```

---

### Task 8: Compose page + SEO assets

**Files:** Modify `app/page.tsx`; create `app/opengraph-image.tsx`, `app/icon.tsx`.

- [ ] **Step 1: `app/page.tsx`** — compose: `<main>` with `<Terminal/>` then each section in order (`SECTION_IDS`): About, Experience, Skills, Education, Publication, Contact. Constrain width (`max-w-3xl mx-auto px-4`), vertical rhythm (`space-y-16 py-16`).

- [ ] **Step 2: `app/icon.tsx`** — `ImageResponse` favicon: `>_` glyph in accent green on dark.

- [ ] **Step 3: `app/opengraph-image.tsx`** — `ImageResponse` 1200×630 terminal card with name + role + prompt, dark theme. `export const size`, `contentType`, `runtime = "edge"` (or default node).

- [ ] **Step 4: Verify build + commit**

```bash
npm run build && git add app && git commit -qm "feat: compose page, OG image and favicon"
```

---

### Task 9: Final verification

- [ ] **Step 1: Full check**

```bash
cd /home/rikr2/source/my-portfolio/claude-v1
npm run lint && npm test && npm run build
```

Expected: lint clean, all tests pass, build succeeds (static pages generated).

- [ ] **Step 2: Manual smoke (dev server)** — start `npm run dev`, confirm: boot typewriter runs; typing `help`, `skills`, `clear` work; chips scroll to sections; theme + lang toggles work; mobile width usable. Note any fixes, apply, re-run Step 1.

- [ ] **Step 3: Vercel readiness** — confirm no server-only deps, no env vars required, `next build` output is static. Add a short `README.md` with deploy instructions (`vercel` / import repo). Commit.

```bash
git add -A && git commit -qm "docs: README + deploy notes"
```

---

## Self-Review

**Spec coverage:** stack (Task 0/5) · hybrid terminal w/ typed+clicked commands, boot, history, autocomplete (Tasks 3,6) · all 6 sections + hero + footer (Tasks 1,7,8) · bilingual dict + parity test + toggle (Tasks 1,2,4,7) · dark/light tokens + toggle (Tasks 5,7) · contact links (Task 7) · SEO/OG/favicon (Task 8) · accessibility + reduced motion (Tasks 5,6,7) · responsive (Tasks 7,8) · tests for parser + i18n (Tasks 2,3) · YAGNI items excluded. All spec requirements mapped.

**Placeholder scan:** logic tasks (1–4) contain complete code. Presentational component tasks (5–8) are specced with exact files, props, content sources, and styling tokens rather than full JSX — intentional for a frontend-heavy build; each is small and self-contained. No "TBD"/"handle edge cases".

**Type consistency:** `resolveCommand`/`autocomplete`/`COMMANDS`/`Command.kind` consistent across Tasks 3,6. `Content`/`Locale`/`dictionaries`/`SECTION_IDS`/`CONTACT` consistent across Tasks 1,2,4,7,8. `useLanguage()` returns `{ locale, t, toggle, setLocale }` used consistently.
