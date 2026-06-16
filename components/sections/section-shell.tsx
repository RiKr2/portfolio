"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { TerminalWindow } from "@/components/terminal/terminal-window";

export function SectionShell({
  id,
  command,
  heading,
  children,
}: {
  id: string;
  command: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <TerminalWindow title={`~/${id}`}>
        <div className="flex gap-2">
          <span className="shrink-0 text-prompt">$</span>
          <span className="text-fg">{command}</span>
        </div>
        <h2 id={`${id}-heading`} className="mt-4 text-lg font-bold text-fn">
          {heading}
        </h2>
        <div className="mt-3">{children}</div>
      </TerminalWindow>
    </motion.section>
  );
}
