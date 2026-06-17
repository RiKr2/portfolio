import type { BlockIcon as BlockIconKind } from "@/lib/minecraft";

const PALETTE: Record<string, string> = {
  ".": "transparent",
  g: "#7cc23f",
  G: "#5ca832",
  d: "#7a5733",
  D: "#5c4026",
  w: "#9c6b3f",
  W: "#7a5026",
  l: "#caa15e",
  m: "#d9d2c0",
  M: "#8a8270",
  p: "#e8dcb5",
  r: "#b23a2e",
  u: "#6a3fb0",
  U: "#4a2a80",
  t: "#27e0c0",
  T: "#0f9e88",
  e: "#0a3d3a",
  y: "#ffec5c",
  h: "#ffffff",
};

const ICONS: Record<BlockIconKind, string[]> = {
  grass: [
    "gggggggg",
    "gGgggGgg",
    "dddddddd",
    "dDdddddd",
    "ddddDddd",
    "dDdddddd",
    "ddddddDd",
    "DDDDDDDD",
  ],
  crafting: [
    "WWWWWWWW",
    "WllllllW",
    "WlwwwwlW",
    "WlwGwGlW",
    "WlwwwwlW",
    "WlwGwGlW",
    "WllllllW",
    "WWWWWWWW",
  ],
  chest: [
    "........",
    ".WWWWWW.",
    ".wwwwww.",
    ".wwMMww.",
    ".wwMMww.",
    ".wwwwww.",
    ".WWWWWW.",
    "........",
  ],
  enchanted_book: [
    "........",
    ".UUUUUU.",
    ".UppppU.",
    ".UpyypU.",
    ".UppppU.",
    ".UpyypU.",
    ".UUUUUU.",
    "........",
  ],
  book: [
    "........",
    ".rrrrrr.",
    ".rppppr.",
    ".rppppr.",
    ".rppppr.",
    ".rppppr.",
    ".rrrrrr.",
    "........",
  ],
  ender_pearl: [
    "........",
    "..TTTT..",
    ".TttttT.",
    ".tthttt.",
    ".tttttt.",
    ".TttttT.",
    "..eTTe..",
    "........",
  ],
};

export function BlockIcon({
  icon,
  size = 32,
  className = "",
}: {
  icon: BlockIconKind;
  size?: number;
  className?: string;
}) {
  const rows = ICONS[icon];
  const n = rows.length;
  return (
    <div
      aria-hidden
      className={`pixelated ${className}`}
      style={{
        width: size,
        height: size,
        display: "grid",
        gridTemplateColumns: `repeat(${n}, 1fr)`,
        gridTemplateRows: `repeat(${n}, 1fr)`,
      }}
    >
      {rows.flatMap((row, y) =>
        row.split("").map((ch, x) => (
          <div key={`${x}-${y}`} style={{ background: PALETTE[ch] ?? "transparent" }} />
        )),
      )}
    </div>
  );
}
