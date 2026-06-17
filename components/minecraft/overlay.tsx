"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { SectionId } from "@/content";

interface OverlayCtx {
  open: SectionId | null;
  openSection: (id: SectionId) => void;
  close: () => void;
}

const Ctx = createContext<OverlayCtx | null>(null);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<SectionId | null>(null);
  const openSection = useCallback((id: SectionId) => setOpen(id), []);
  const close = useCallback(() => setOpen(null), []);
  return <Ctx.Provider value={{ open, openSection, close }}>{children}</Ctx.Provider>;
}

export function useOverlay() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOverlay must be used within OverlayProvider");
  return ctx;
}
