"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { McSection } from "./mc-section";

export function About() {
  const { t } = useLanguage();
  const s = t.sections.about;
  return (
    <McSection id="about" heading={s.heading}>
      <div className="mc-inset space-y-3 bg-[var(--mc-paper)] p-3 text-[#3a2f1b]">
        {s.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </McSection>
  );
}
