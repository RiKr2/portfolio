"use client";

import { useTheme } from "next-themes";

const STARS = [
  [12, 18], [22, 40], [35, 12], [48, 30], [60, 16], [72, 44], [85, 24], [92, 52],
  [18, 60], [40, 66], [66, 62], [80, 70], [28, 80], [55, 78], [8, 36],
] as const;

const CLOUDS = [
  { top: "16%", left: "12%", w: 120 },
  { top: "26%", left: "62%", w: 90 },
  { top: "12%", left: "82%", w: 70 },
];

export function Sky() {
  const { resolvedTheme } = useTheme();
  // Pre-mount resolvedTheme is undefined; the sky gradient is already correct via the
  // <html> theme class, so we just hold off on theme-specific decorations until known.
  const night = resolvedTheme === "dark";
  const day = resolvedTheme === "light";

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, var(--sky-top), var(--sky-bottom))" }}
      suppressHydrationWarning
    >
      <div
        className="pixelated absolute"
        style={{
          top: "12%",
          right: "14%",
          width: 56,
          height: 56,
          background: "var(--sun-moon)",
          boxShadow: night
            ? "0 0 24px 6px rgba(233,238,252,0.35)"
            : "0 0 28px 10px rgba(255,244,194,0.5)",
        }}
      />
      {night &&
        STARS.map(([left, top], i) => (
          <span
            key={i}
            className="mc-bob absolute block h-[3px] w-[3px] bg-white"
            style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${(i % 5) * 0.3}s` }}
          />
        ))}
      {day &&
        CLOUDS.map((c, i) => (
          <div
            key={i}
            className="pixelated absolute"
            style={{
              top: c.top,
              left: c.left,
              width: c.w,
              height: 24,
              background: "rgba(255,255,255,0.9)",
            }}
          />
        ))}
    </div>
  );
}
