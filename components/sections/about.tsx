"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { SectionShell } from "./section-shell";

export function About() {
  const { t } = useLanguage();
  const s = t.sections.about;
  return (
    <SectionShell id="about" command="whoami" heading={s.heading}>
      <div className="space-y-3 text-fg/90">
        {s.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </SectionShell>
  );
}
