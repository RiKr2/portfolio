"use client";

import { derivedStats } from "@/lib/minecraft";
import { useLanguage } from "@/components/providers/language-provider";

function Heart() {
  return (
    <svg width={18} height={16} viewBox="0 0 9 8" className="pixelated" aria-hidden>
      <path d="M0 1h3v1h3V1h3v3H8v1H7v1H6v1H3V6H2V5H1V4H0z" fill="#000" opacity="0.35" />
      <path d="M1 1h2v1h3V1h2v2H7v1H6v1H5v1H4V5H3V4H2V3H1z" fill="#e23b3b" />
      <path d="M1 1h2v1H2v1H1z" fill="#ff7676" />
    </svg>
  );
}

export function Hud() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const { hearts, level } = derivedStats(t, year);

  return (
    <div className="pointer-events-none flex flex-col gap-1">
      <div className="flex gap-0.5" aria-label={`experience: ${hearts} companies`}>
        {Array.from({ length: hearts }).map((_, i) => (
          <Heart key={i} />
        ))}
      </div>
      <div className="mc-inset relative h-3 w-44 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full bg-[var(--mc-green)]" />
      </div>
      <div
        className="font-pixel text-[10px] text-[var(--mc-green)] [text-shadow:1px_1px_0_#000]"
        suppressHydrationWarning
      >
        {`lvl ${level}`}
      </div>
    </div>
  );
}
