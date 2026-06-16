"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { SectionShell } from "./section-shell";

export function Publication() {
  const { t } = useLanguage();
  const s = t.sections.publication;
  return (
    <SectionShell id="publication" command="cat publication.bib" heading={s.heading}>
      <article className="space-y-2">
        <h3 className="font-bold text-fn">{s.title}</h3>
        <p className="text-str">{s.venue}</p>
        <p className="text-xs text-muted">{s.date}</p>
        <p className="text-fg/90">{s.summary}</p>
        <a
          href={s.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 pt-1 text-prompt hover:underline"
        >
          {`→ ${s.linkLabel}`}
        </a>
      </article>
    </SectionShell>
  );
}
