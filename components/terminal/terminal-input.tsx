"use client";

import { useRef, useState } from "react";
import { autocomplete, commonPrefix } from "@/lib/commands";

export function TerminalInput({
  prompt,
  history,
  onSubmit,
}: {
  prompt: string;
  history: string[];
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const v = value.trim();
      if (v) onSubmit(v);
      setValue("");
      setHistIndex(null);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = histIndex === null ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === null) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(null);
        setValue("");
      } else {
        setHistIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = autocomplete(value);
      if (matches.length === 1) setValue(matches[0]);
      else if (matches.length > 1) setValue(commonPrefix(matches));
    }
  }

  return (
    <div
      className="mt-3 flex cursor-text items-center gap-2"
      onClick={() => inputRef.current?.focus()}
    >
      <span className="shrink-0 text-prompt">{prompt}</span>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        aria-label="command input"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        className="min-w-0 flex-1 bg-transparent text-fg caret-[var(--accent)] outline-none placeholder:text-comment"
        placeholder="help"
      />
    </div>
  );
}
