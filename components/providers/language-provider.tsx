"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { dictionaries, type Content, type Locale } from "@/content";

interface LanguageCtx {
  locale: Locale;
  t: Content;
  toggle: () => void;
  setLocale: (l: Locale) => void;
}

const Ctx = createContext<LanguageCtx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // Hydrate the previously chosen locale (client-only persisted state). Default stays English.
    const saved = (typeof window !== "undefined" && localStorage.getItem("locale")) as Locale | null;
    if (saved === "en" || saved === "es") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = locale;
    if (typeof window !== "undefined") localStorage.setItem("locale", locale);
  }, [locale]);

  const toggle = useCallback(() => setLocale((l) => (l === "en" ? "es" : "en")), []);

  return (
    <Ctx.Provider value={{ locale, t: dictionaries[locale], toggle, setLocale }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
