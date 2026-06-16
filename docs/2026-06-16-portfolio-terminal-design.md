# Portfolio — Ricardo Fundora Hernández (claude-v1)

**Date:** 2026-06-16
**Status:** Approved (design)
**Deploy target:** Vercel
**Location:** all code lives in `claude-v1/` as a self-contained Next.js project.

## 1. Goal

A personal portfolio for Ricardo Fundora Hernández, Senior Software Engineer, built to stand
out in an AI-vs-AI portfolio contest while genuinely helping him land remote international
roles. Distinctive **terminal / developer** aesthetic, **bilingual ES/EN**, **dark + light**
themes, contact via direct links.

## 2. Tech stack

- **Next.js (App Router) + TypeScript + React** — static generation (SSG), zero-config Vercel deploy, good SEO.
- **Tailwind CSS** for styling.
- **next-themes** for SSR-safe dark/light toggle (no flash of wrong theme).
- **Framer Motion** for the typewriter boot sequence and scroll-reveal animations.
- **next/font** with a monospace face (JetBrains Mono / Geist Mono) as the primary typeface.
- **No backend** — contact is direct links; everything is static.

## 3. Interaction model — hybrid terminal

The hero is a real, interactive terminal. Below it, full terminal-styled sections hold all
content (visible, crawlable, accessible).

- **Terminal window** chrome: traffic-light dots, title `ricardo@portfolio:~$`.
- **Boot animation:** on load, auto-types `whoami` and prints name + role (typewriter effect).
- **Command input** with:
  - Recognized commands: `help`, `about`/`whoami`, `experience`/`work`, `skills`/`stack`,
    `education`, `publication`, `contact`, `clear`, `theme`, `lang`.
  - Easter eggs: `sudo`, `ls`, plus an unknown-command fallback message.
  - History navigation (↑/↓) and Tab autocomplete.
- **Clickable command chips** below the input — primary path on mobile and for non-typers.
- **Behavior:** navigation commands (`about`, `experience`, …) smooth-scroll to / reveal their
  section. Utility commands (`help`, `theme`, `lang`, `clear`) act inline in the terminal.

## 4. Section / content map (all bilingual)

1. **Hero** — interactive terminal.
2. **`whoami` → About** — software engineer since 2016, 5+ years remote for international
   companies, backend Python/.NET + full-stack as the project needs.
3. **`experience` → Experience** (timeline, most recent first):
   - **Selector** — Full-stack Developer · Jan 2026 – Present · Remote · Stack: AI, AWS, TypeScript, Python.
   - **GSI – General Software Inc** — Backend Developer (Full-time) · Jul 2022 – Present · Stack: C#, Docker, PHP, Python, YAML, Postman.
   - **AlayaCare** — Backend Developer · Dec 2022 – Aug 2025 · Cloud platform for home-care agencies; built billing solutions (general + custom), optimized data retrieval and backend processes · Stack: PHP, JS, Vue.js, Python, Docker, AWS.
   - **Wisegar** — Software Developer (Part-time) · Mar 2020 – Jul 2022 · Stack: C#.
4. **`skills` → Skills**, grouped:
   - Languages: Python, C#, PHP, JavaScript, TypeScript, C++, Dart, Solidity.
   - Frameworks/Libraries: Django, ASP.NET Core, ASP.NET Razor, Vue.js, React.js, Node.js, Flutter, Bootstrap.
   - Databases: PostgreSQL, MongoDB, NoSQL.
   - DevOps/Tools: Docker, Git, AWS, YAML, Postman, Odoo, WordPress, Unity3D.
   - Concepts: OOP, Algorithms, Data Structures, Web Dev, Game Dev, Blockchain, Virtualization, Mobile Game Dev.
5. **`education` → Education & Certifications**:
   - Universidad de La Habana — B.Sc. Computer Science (2011–2016).
   - Foundational C# with Microsoft — freeCodeCamp, May 2024 (Credential ID: rikr2-fcswm).
6. **`publication` → Publication**:
   - "Conjunto de herramientas citogenéticas para el trabajo con cromosomas" — ResearchGate, Jun 2016.
     Semi-automatic karyotype construction system, ~54% chromosome-classification accuracy.
     Graduation project, Universidad de La Habana.
7. **`contact` → Contact**: Email (rikr2fun2ra@gmail.com), GitHub (https://github.com/RiKr2), LinkedIn (https://www.linkedin.com/in/rikr2/).
8. **Footer**: "built with Next.js" + "view source" link to the repo.

> No personal projects yet, so the academic publication and the experience timeline are the
> highlight instead of an empty projects gallery. A projects section can be added later without
> structural changes.

## 5. Internationalization (ES/EN)

- A typed content dictionary with `en` and `es` keys; a `LanguageProvider` (React context) +
  `useLanguage` hook; a toggle in the nav and the `lang` command.
- Persisted to localStorage; **default English** (international target audience), one click to Spanish.
- The `<html lang>` attribute follows the active language.
- **Test:** automated check that every i18n key exists in both `en` and `es` (no gaps).

## 6. Theme, color, typography

- **Dark by default**: near-black background, syntax-highlight-style accents (green/cyan prompts,
  distinct colors for keywords/strings/comments). **Light** theme: bright IDE-style terminal.
  Switch via toggle or `theme` command.
- Monospace-dominant; a clean sans face only for long paragraphs if needed.
- Animations respect `prefers-reduced-motion`.

## 7. Quality bar

- **Responsive**: on mobile, command chips are the primary path; the input remains available.
- **Accessibility**: semantic HTML under the terminal skin, keyboard-navigable, AA contrast.
- **SEO**: metadata, Open Graph image, favicon; all content present in the DOM.
- **Tests** (focused, not exhaustive): command parser (input → resolved command) and i18n key
  parity. Clean lint + build.

## 8. Out of scope (YAGNI)

Projects gallery, blog, CMS, contact form with backend, multi-page routing. All addable later.

## 9. Architecture / module boundaries

- `content/` — typed bilingual content dictionaries (single source of truth for copy + data).
- `lib/commands.ts` — pure command parser/registry (testable in isolation).
- `components/terminal/` — terminal window, input, output, chips (interaction layer).
- `components/sections/` — About, Experience, Skills, Education, Publication, Contact (presentation).
- `components/providers/` — Language + Theme providers.
- `app/` — layout, page, metadata, OG image, fonts.

Each unit has one purpose and a clear interface; the command parser and content dictionary are
pure data/logic and unit-tested independently of React.
