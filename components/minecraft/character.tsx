"use client";

import { BLOCK } from "./ground";

const SKIN = "#c98e6a";
const HAIR = "#4a3420";
const SHIRT = "#19b6a8";
const SHIRT_DARK = "#138b80";
const PANTS = "#3a4a8a";
const SHOE = "#2a2540";

/** Blocky pixel character. Stands on the grass surface; parent supplies x + jump offset. */
export function Character({
  x,
  facing,
  walking,
  yOffset,
}: {
  x: number;
  facing: 1 | -1;
  walking: boolean;
  yOffset: number;
}) {
  return (
    <div
      className={`pixelated absolute ${walking ? "mc-walking" : ""}`}
      style={{
        left: x,
        bottom: BLOCK * 2,
        width: 32,
        height: 60,
        transform: `translateY(${-yOffset}px) scaleX(${facing})`,
        transition: "transform 0.05s linear",
      }}
      aria-hidden
    >
      {/* Head */}
      <div className="absolute" style={{ left: 7, top: 0, width: 18, height: 18, background: SKIN }}>
        <div className="absolute" style={{ left: 0, top: 0, width: 18, height: 6, background: HAIR }} />
        <div className="absolute" style={{ left: 11, top: 9, width: 3, height: 3, background: "#2a2233" }} />
        <div className="absolute" style={{ left: 11, top: 9, width: 3, height: 3, background: "#2a2233" }} />
      </div>
      {/* Body / shirt */}
      <div className="absolute" style={{ left: 8, top: 18, width: 16, height: 22, background: SHIRT }}>
        <div className="absolute" style={{ left: 0, top: 16, width: 16, height: 6, background: SHIRT_DARK }} />
      </div>
      {/* Arms */}
      <div className="mc-limb mc-arm-a absolute" style={{ left: 3, top: 19, width: 5, height: 20, background: SHIRT }} />
      <div className="mc-limb mc-arm-b absolute" style={{ left: 24, top: 19, width: 5, height: 20, background: SHIRT }} />
      {/* Legs */}
      <div className="mc-limb mc-leg-a absolute" style={{ left: 8, top: 39, width: 7, height: 20, background: PANTS }}>
        <div className="absolute" style={{ left: 0, bottom: 0, width: 7, height: 4, background: SHOE }} />
      </div>
      <div className="mc-limb mc-leg-b absolute" style={{ left: 17, top: 39, width: 7, height: 20, background: PANTS }}>
        <div className="absolute" style={{ left: 0, bottom: 0, width: 7, height: 4, background: SHOE }} />
      </div>
    </div>
  );
}
