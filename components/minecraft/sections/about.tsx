"use client";

import { useLanguage } from "@/components/providers/language-provider";

export function About() {
  const { t } = useLanguage();
  const s = t.sections.about;
  return (
    <div className="mc-inset space-y-3 bg-[var(--mc-paper)] p-4 leading-relaxed text-[#3a2f1b]">
      {s.body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
