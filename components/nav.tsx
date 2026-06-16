"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers/language-provider";

export function Nav() {
  const { t, toggle } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();

  const btn =
    "rounded-md border border-border-soft bg-panel/80 px-2.5 py-1 text-xs text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-none";

  return (
    <header className="fixed right-0 top-0 z-50 flex items-center gap-2 p-4">
      <button type="button" onClick={toggle} aria-label={t.nav.langSwitch} className={btn}>
        {t.nav.langLabel}
      </button>
      <button
        type="button"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label={t.nav.themeSwitch}
        className={btn}
      >
        <span suppressHydrationWarning>{resolvedTheme === "light" ? "☾ dark" : "☀ light"}</span>
      </button>
    </header>
  );
}
