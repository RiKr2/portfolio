import { SECTION_IDS, type SectionId, type Content } from "@/content";

export type BlockIcon =
  | "grass"
  | "crafting"
  | "chest"
  | "enchanted_book"
  | "book"
  | "ender_pearl";

export interface Slot {
  index: number;
  section: SectionId;
  icon: BlockIcon;
}

export const SLOTS: Slot[] = [
  { index: 0, section: "about", icon: "grass" },
  { index: 1, section: "experience", icon: "crafting" },
  { index: 2, section: "skills", icon: "chest" },
  { index: 3, section: "education", icon: "enchanted_book" },
  { index: 4, section: "publication", icon: "book" },
  { index: 5, section: "contact", icon: "ender_pearl" },
];

export interface Sign {
  section: SectionId;
  x: number;
}

export function clampX(x: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, x));
}

/** Closest section sign within `range` of `charX`, or null if none are in range. */
export function nearestSign(charX: number, signs: Sign[], range: number): SectionId | null {
  let best: { section: SectionId; dist: number } | null = null;
  for (const s of signs) {
    const dist = Math.abs(s.x - charX);
    if (dist <= range && (!best || dist < best.dist)) best = { section: s.section, dist };
  }
  return best?.section ?? null;
}

export interface DerivedStats {
  hearts: number;
  level: number;
}

export function derivedStats(content: Content, currentYear: number): DerivedStats {
  return {
    hearts: content.sections.experience.items.length,
    level: Math.max(0, currentYear - 2016),
  };
}

/** Re-exported so SLOTS stays provably in sync with the canonical section list. */
export const SECTION_ORDER = SECTION_IDS;
