"use client";

import { BLOCK } from "./ground";

const HILLS = [
  { x: 60, w: 220, h: 110 },
  { x: 360, w: 320, h: 150 },
  { x: 760, w: 260, h: 120 },
  { x: 1120, w: 300, h: 160 },
  { x: 1500, w: 240, h: 120 },
];

/** Distant blocky mesas (far parallax layer). */
export function Hills() {
  return (
    <>
      {HILLS.map((h, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: h.x, bottom: BLOCK * 2, width: h.w, height: h.h }}
        >
          <div className="absolute inset-0 opacity-80" style={{ background: "var(--grass-dark)" }} />
          <div
            className="absolute left-0 top-0 w-full opacity-80"
            style={{ height: 8, background: "var(--grass)" }}
          />
        </div>
      ))}
    </>
  );
}

const TREES = [120, 430, 760, 1080, 1360, 1600];

function Tree({ left, scale }: { left: number; scale: number }) {
  return (
    <div
      className="absolute"
      style={{ left, bottom: BLOCK * 2, width: 64 * scale, height: 96 * scale }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: 0, width: 64 * scale, height: 28 * scale, background: "var(--grass)" }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: 18 * scale, width: 48 * scale, height: 26 * scale, background: "var(--grass-dark)" }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: 12 * scale, height: 50 * scale, background: "var(--dirt)" }}
      />
    </div>
  );
}

/** Mid-distance trees (mid parallax layer). */
export function Trees() {
  return (
    <>
      {TREES.map((x, i) => (
        <Tree key={i} left={x} scale={i % 2 ? 0.8 : 1} />
      ))}
    </>
  );
}
