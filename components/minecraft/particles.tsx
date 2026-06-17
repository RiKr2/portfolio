"use client";

import { useTheme } from "next-themes";

const PTS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 61) % 100,
  bottom: 18 + ((i * 37) % 55),
  delay: (i % 8) * 0.7,
  dur: 4 + (i % 5),
}));

/** Ambient particles: fireflies at night, drifting motes by day. */
export function Particles() {
  const { resolvedTheme } = useTheme();
  const night = resolvedTheme === "dark";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PTS.map((p, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: night ? 4 : 5,
            height: night ? 4 : 5,
            background: night ? "var(--mc-yellow)" : "rgba(255,255,255,0.75)",
            boxShadow: night ? "0 0 6px 2px rgba(255,236,92,0.65)" : "none",
            animation: `mc-float ${p.dur}s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
