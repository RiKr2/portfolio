"use client";

import { COMMANDS } from "@/lib/commands";

const CHIP_IDS = [...COMMANDS.filter((c) => c.kind === "section").map((c) => c.id), "help"];

export function CommandChips({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2" aria-label="quick commands">
      {CHIP_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className="rounded-md border border-border-soft bg-bg px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-none"
        >
          <span className="text-comment">$ </span>
          {id}
        </button>
      ))}
    </div>
  );
}
