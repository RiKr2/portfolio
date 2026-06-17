"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOverlay } from "../overlay";
import { useAchievements } from "../achievements";
import { useLanguage } from "@/components/providers/language-provider";
import type { SectionId } from "@/content";
import { SLOTS } from "@/lib/minecraft";
import { BlockIcon } from "../block-icon";
import { SECTION_COMPONENTS } from "./registry";

export function SectionModal() {
  const { open, close } = useOverlay();
  const { unlock } = useAchievements();
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const slot = SLOTS.find((s) => s.section === open)!;
    unlock(t.sections[open].heading, slot.icon);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus?.();
    };
  }, [open, close, unlock, t]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={close} aria-hidden />
          <ModalCard onClose={close} sectionId={open} heading={t.sections[open].heading} ref={panelRef} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const ModalCard = ({
  sectionId,
  heading,
  onClose,
  ref,
}: {
  sectionId: SectionId;
  heading: string;
  onClose: () => void;
  ref: React.Ref<HTMLDivElement>;
}) => {
  const slot = SLOTS.find((s) => s.section === sectionId)!;
  const Comp = SECTION_COMPONENTS[sectionId];
  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={heading}
      className="mc-bevel relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto p-3 outline-none sm:p-4"
      initial={{ scale: 0.9, y: 12, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.94, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <div className="mb-3 flex items-center gap-2 border-b-2 border-[var(--gui-dark)] pb-2">
        <BlockIcon icon={slot.icon} size={22} />
        <h2 className="flex-1 font-pixel text-[11px] leading-relaxed text-[#373737] sm:text-sm">
          {heading}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="mc-bevel mc-btn flex h-7 w-7 items-center justify-center font-pixel text-[10px] text-[#2b2b2b]"
        >
          ✕
        </button>
      </div>
      <div className="font-mono text-sm text-[#2b2b2b]">
        <Comp />
      </div>
    </motion.div>
  );
};
