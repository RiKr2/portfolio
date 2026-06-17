"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { McPanel } from "../mc-panel";
import { BlockIcon } from "../block-icon";
import { SLOTS } from "@/lib/minecraft";
import type { SectionId } from "@/content";

export function McSection({
  id,
  heading,
  children,
}: {
  id: SectionId;
  heading: string;
  children: ReactNode;
}) {
  const slot = SLOTS.find((s) => s.section === id)!;
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <McPanel>
        <div className="mb-3 flex items-center gap-2 border-b-2 border-[var(--gui-dark)] pb-2">
          <BlockIcon icon={slot.icon} size={22} />
          <h2 id={`${id}-heading`} className="font-pixel text-[11px] text-[#373737] sm:text-sm">
            {heading}
          </h2>
        </div>
        <div className="font-mono text-sm text-[#2b2b2b]">{children}</div>
      </McPanel>
    </motion.section>
  );
}
