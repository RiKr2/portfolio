"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { SectionShell } from "./section-shell";

export function Education() {
  const { t } = useLanguage();
  const s = t.sections.education;
  return (
    <SectionShell id="education" command="cat education.txt" heading={s.heading}>
      <ul className="space-y-4">
        {s.items.map((it) => (
          <li key={it.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-bold text-fn">{it.title}</h3>
              <span className="text-xs text-muted">{it.period}</span>
            </div>
            <p className="text-str">{it.org}</p>
            {it.credentialId && (
              <p className="text-xs text-comment">{`// credential: ${it.credentialId}`}</p>
            )}
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
