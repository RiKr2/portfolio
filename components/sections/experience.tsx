"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { SectionShell } from "./section-shell";

export function Experience() {
  const { t } = useLanguage();
  const s = t.sections.experience;
  return (
    <SectionShell id="experience" command="cat experience.log" heading={s.heading}>
      <ol className="space-y-6">
        {s.items.map((it) => (
          <li key={it.company} className="border-l-2 border-border-soft pl-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-bold text-fn">
                {it.company}
                {it.remote && <span className="ml-2 align-middle text-xs text-prompt">[remote]</span>}
              </h3>
              <span className="text-xs text-muted">{it.period}</span>
            </div>
            <p className="text-str">{it.role}</p>
            {it.description && <p className="mt-1 text-sm text-fg/80">{it.description}</p>}
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {it.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-border-soft bg-bg px-1.5 py-0.5 text-xs text-str"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
