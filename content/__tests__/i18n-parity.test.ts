import { describe, it, expect } from "vitest";
import { dictionaries } from "@/content";

function keyPaths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj) || typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe("i18n parity", () => {
  it("en and es share the exact same key structure", () => {
    const enKeys = keyPaths(dictionaries.en).sort();
    const esKeys = keyPaths(dictionaries.es).sort();
    expect(esKeys).toEqual(enKeys);
  });
});
