"use client";

import { SLOTS } from "@/lib/minecraft";
import { BlockIcon } from "./block-icon";
import { useLanguage } from "@/components/providers/language-provider";

export function Hotbar({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (slotIndex: number) => void;
}) {
  const { t } = useLanguage();
  return (
    <div
      className="mc-bevel pointer-events-auto flex gap-1 p-1"
      role="toolbar"
      aria-label="sections hotbar"
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const slot = SLOTS.find((s) => s.index === i);
        const heading = slot ? t.sections[slot.section].heading : `empty slot ${i + 1}`;
        const active = slot && selected === i;
        return (
          <button
            key={i}
            type="button"
            disabled={!slot}
            onClick={() => slot && onSelect(i)}
            aria-label={heading}
            aria-pressed={active ? true : undefined}
            className={`mc-inset relative flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12 ${
              active ? "outline outline-[3px] outline-white" : ""
            } ${slot ? "cursor-pointer" : "opacity-60"}`}
          >
            {slot && <BlockIcon icon={slot.icon} size={28} />}
            <span className="absolute left-0.5 top-0 font-pixel text-[7px] text-white/70">{i + 1}</span>
          </button>
        );
      })}
    </div>
  );
}
