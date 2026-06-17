"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BlockIcon } from "./block-icon";
import type { BlockIcon as BlockIconKind } from "@/lib/minecraft";

interface Toast {
  id: number;
  title: string;
  icon: BlockIconKind;
}

interface Ctx {
  unlock: (title: string, icon: BlockIconKind) => void;
}

const AchievementsCtx = createContext<Ctx | null>(null);

export function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);
  const seenRef = useRef<Set<string>>(new Set());

  const unlock = useCallback((title: string, icon: BlockIconKind) => {
    if (seenRef.current.has(title)) return;
    seenRef.current.add(title);
    const id = (idRef.current += 1);
    setToasts((t) => [...t, { id, title, icon }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  return (
    <AchievementsCtx.Provider value={{ unlock }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-3 top-3 z-[60] flex flex-col gap-2"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ x: 48, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 48, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 rounded-sm border-2 border-black/70 bg-[#1d1d1d] px-3 py-2 shadow-lg"
            >
              <BlockIcon icon={t.icon} size={28} />
              <div className="font-pixel text-[9px] leading-relaxed">
                <div className="text-[var(--mc-yellow)]">Achievement Get!</div>
                <div className="text-white">{t.title}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AchievementsCtx.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementsCtx);
  if (!ctx) throw new Error("useAchievements must be used within AchievementsProvider");
  return ctx;
}
