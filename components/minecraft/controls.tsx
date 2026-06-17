"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers/language-provider";
import { McButton } from "./mc-button";

export function Controls() {
  const { t, toggle } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="pointer-events-auto flex gap-2">
      <McButton onClick={toggle} ariaLabel={t.nav.langSwitch}>
        {t.nav.langLabel}
      </McButton>
      <McButton
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        ariaLabel={t.nav.themeSwitch}
      >
        <span suppressHydrationWarning>{resolvedTheme === "light" ? "☾" : "☀"}</span>
      </McButton>
    </div>
  );
}
