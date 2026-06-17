"use client";

export const BLOCK = 48;

/** A grass-topped dirt strip spanning `width` px, drawn as repeating pixel blocks. */
export function Ground({ width }: { width: number }) {
  return (
    <div
      aria-hidden
      className="pixelated absolute bottom-0 left-0"
      style={{
        width,
        height: BLOCK * 2,
        backgroundImage: [
          // grass top band
          "linear-gradient(to bottom, var(--grass-top) 0, var(--grass-top) 6px, var(--grass) 6px, var(--grass) " +
            BLOCK +
            "px, var(--dirt) " +
            BLOCK +
            "px, var(--dirt) 100%)",
          // vertical block seams
          "repeating-linear-gradient(to right, rgba(0,0,0,0.12) 0 1px, transparent 1px " + BLOCK + "px)",
          // horizontal seam under grass
          "repeating-linear-gradient(to bottom, transparent 0 " + BLOCK + "px, rgba(0,0,0,0.12) " + BLOCK + "px " + (BLOCK + 1) + "px)",
        ].join(","),
      }}
    />
  );
}
