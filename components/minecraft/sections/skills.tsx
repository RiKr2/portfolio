"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { McSection } from "./mc-section";

export function Skills() {
  const { t } = useLanguage();
  const s = t.sections.skills;
  const [tab, setTab] = useState(0);

  return (
    <McSection id="skills" heading={s.heading}>
      <div className="mb-3 flex flex-wrap gap-1" role="tablist" aria-label={s.heading}>
        {s.groups.map((g, i) => (
          <button
            key={g.label}
            type="button"
            role="tab"
            aria-selected={i === tab}
            aria-controls={`skills-panel-${i}`}
            onClick={() => setTab(i)}
            className={`mc-bevel mc-btn px-2 py-1 font-pixel text-[8px] text-[#2b2b2b] ${
              i === tab ? "outline outline-2 outline-[var(--mc-yellow)]" : ""
            }`}
            style={{ borderWidth: 2 }}
          >
            {g.label}
          </button>
        ))}
      </div>
      {/* All groups stay in the DOM (crawlable); inactive ones are hidden. */}
      {s.groups.map((g, i) => (
        <div
          key={g.label}
          id={`skills-panel-${i}`}
          role="tabpanel"
          hidden={i !== tab}
          className="mc-inset grid grid-cols-2 gap-2 bg-[#bdbdbd] p-3 sm:grid-cols-3"
        >
          {g.items.map((item) => (
            <div
              key={item}
              title={item}
              className="mc-bevel flex min-h-9 items-center justify-center px-2 py-2 text-center text-[11px] text-[#2b2b2b]"
              style={{ borderWidth: 2 }}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </McSection>
  );
}
