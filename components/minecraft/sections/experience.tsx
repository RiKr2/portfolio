"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { BlockIcon } from "../block-icon";

export function Experience() {
  const { t } = useLanguage();
  const s = t.sections.experience;
  return (
    <ol className="space-y-3">
      {s.items.map((it) => (
        <li
          key={it.company}
          className="mc-inset flex gap-3 bg-[#dcdcdc] p-3 transition-[filter] hover:brightness-105"
        >
          <span
            className="mc-bevel mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center"
            style={{ borderWidth: 2, background: "#caa15e" }}
          >
            <BlockIcon icon="crafting" size={24} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-pixel text-[10px] leading-relaxed text-[#1f3d12]">
                {it.company}
                {it.remote && <span className="ml-2 text-[var(--mc-green)]">[remote]</span>}
              </h3>
              <span className="text-xs text-[#5a5340]">{it.period}</span>
            </div>
            <p className="mt-1 font-semibold text-[#3a2f1b]">{it.role}</p>
            {it.description && <p className="mt-1 text-sm text-[#4a4234]">{it.description}</p>}
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {it.stack.map((tech) => (
                <li
                  key={tech}
                  className="mc-bevel px-1.5 py-0.5 text-[11px] text-[#2b2b2b]"
                  style={{ borderWidth: 2 }}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
