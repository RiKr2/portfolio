"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { BlockIcon } from "../block-icon";

export function Education() {
  const { t } = useLanguage();
  const s = t.sections.education;
  return (
    <ul className="space-y-3">
      {s.items.map((it) => (
        <li
          key={it.title}
          className="mc-inset flex gap-3 bg-[#dcdcdc] p-3 transition-[filter] hover:brightness-105"
        >
          <span
            className="mc-bevel mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center"
            style={{ borderWidth: 2, background: "#caa15e" }}
          >
            <BlockIcon icon="enchanted_book" size={24} />
          </span>
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-pixel text-[10px] leading-relaxed text-[#3a2a55]">{it.title}</h3>
              <span className="text-xs text-[#5a5340]">{it.period}</span>
            </div>
            <p className="mt-1 font-semibold text-[#3a2f1b]">{it.org}</p>
            {it.credentialId && (
              <p className="text-xs text-[#5a5340]">{`// credential: ${it.credentialId}`}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
