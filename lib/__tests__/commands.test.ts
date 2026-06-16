import { describe, it, expect } from "vitest";
import { resolveCommand, autocomplete, commonPrefix, COMMANDS } from "@/lib/commands";

describe("resolveCommand", () => {
  it("resolves a known command by name", () => {
    expect(resolveCommand("about")?.id).toBe("about");
  });
  it("is case-insensitive and trims whitespace", () => {
    expect(resolveCommand("  ABOUT  ")?.id).toBe("about");
  });
  it("resolves aliases (whoami -> about)", () => {
    expect(resolveCommand("whoami")?.id).toBe("about");
  });
  it("returns null for unknown commands", () => {
    expect(resolveCommand("dance")).toBeNull();
  });
  it("returns null for empty input", () => {
    expect(resolveCommand("   ")).toBeNull();
  });
});

describe("autocomplete", () => {
  it("returns commands starting with the fragment", () => {
    expect(autocomplete("ex")).toContain("experience");
  });
  it("returns empty array when nothing matches", () => {
    expect(autocomplete("zzz")).toEqual([]);
  });
  it("returns all canonical command names for empty input", () => {
    expect(autocomplete("").length).toBe(COMMANDS.length);
  });
});

describe("commonPrefix", () => {
  it("finds the shared prefix", () => {
    expect(commonPrefix(["clear", "cls"])).toBe("cl");
  });
  it("returns the whole word for a single match", () => {
    expect(commonPrefix(["skills"])).toBe("skills");
  });
  it("returns empty string for no words", () => {
    expect(commonPrefix([])).toBe("");
  });
});
