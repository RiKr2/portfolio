"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { SectionShell } from "./section-shell";

export function Skills() {
  const { t } = useLanguage();
  const s = t.sections.skills;
  return (
    <SectionShell id="skills" command="cat skills.json" heading={s.heading}>
      <div className="space-y-4">
        {s.groups.map((g) => (
          <div key={g.label}>
            <span className="text-key">{g.label}</span>
            <span className="text-comment">: [</span>
            <div className="my-1.5 flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border-soft bg-bg px-2 py-0.5 text-xs text-str"
                >
                  {item}
                </span>
              ))}
            </div>
            <span className="text-comment">]</span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
