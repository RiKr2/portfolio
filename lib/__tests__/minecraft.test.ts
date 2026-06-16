import { describe, it, expect } from "vitest";
import { SLOTS, clampX, nearestSign, derivedStats, type Sign } from "@/lib/minecraft";
import { SECTION_IDS } from "@/content";
import { en } from "@/content/en";

describe("clampX", () => {
  it("returns the value within bounds", () => expect(clampX(50, 0, 100)).toBe(50));
  it("clamps below min", () => expect(clampX(-10, 0, 100)).toBe(0));
  it("clamps above max", () => expect(clampX(150, 0, 100)).toBe(100));
});

describe("nearestSign", () => {
  const signs: Sign[] = [
    { section: "about", x: 100 },
    { section: "skills", x: 300 },
  ];
  it("returns null when none in range", () => expect(nearestSign(0, signs, 40)).toBeNull());
  it("returns the section within range", () => expect(nearestSign(110, signs, 40)).toBe("about"));
  it("picks the closest when several are in range", () =>
    expect(
      nearestSign(150, [
        { section: "about", x: 140 },
        { section: "skills", x: 170 },
      ], 100),
    ).toBe("about"));
});

describe("SLOTS", () => {
  it("covers every section exactly once", () => {
    expect([...SLOTS.map((s) => s.section)].sort()).toEqual([...SECTION_IDS].sort());
  });
  it("has unique, sequential indexes", () => {
    expect(SLOTS.map((s) => s.index)).toEqual(SLOTS.map((_, i) => i));
  });
});

describe("derivedStats", () => {
  it("hearts = number of companies", () =>
    expect(derivedStats(en, 2026).hearts).toBe(en.sections.experience.items.length));
  it("level = years since 2016", () => expect(derivedStats(en, 2026).level).toBe(10));
});
