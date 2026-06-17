"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { McButton } from "../mc-button";

export function Publication() {
  const { t } = useLanguage();
  const s = t.sections.publication;
  return (
    <div className="mc-inset bg-[var(--mc-paper)] p-4 text-[#3a2f1b]">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:border-r sm:border-[#bfa77a] sm:pr-4">
          <h3 className="font-semibold leading-snug">{s.title}</h3>
          <p className="mt-2 text-sm">{s.venue}</p>
          <p className="mt-1 text-xs opacity-80">{s.date}</p>
        </div>
        <div>
          <p className="text-sm">{s.summary}</p>
          <McButton href={s.link} external className="mt-3" ariaLabel={s.linkLabel}>
            {s.linkLabel}
          </McButton>
        </div>
      </div>
    </div>
  );
}
