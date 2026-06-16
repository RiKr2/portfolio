export interface OutputLine {
  id: number;
  kind: "input" | "output";
  prompt?: string;
  text: string;
  tone?: "default" | "accent" | "error" | "muted";
}

const toneClass: Record<NonNullable<OutputLine["tone"]>, string> = {
  default: "text-fg",
  accent: "text-prompt",
  error: "text-[#ff7b72]",
  muted: "text-muted",
};

export function TerminalOutput({ lines }: { lines: OutputLine[] }) {
  return (
    <div className="space-y-1">
      {lines.map((l) =>
        l.kind === "input" ? (
          <div key={l.id} className="flex gap-2">
            <span className="shrink-0 text-prompt">{l.prompt}</span>
            <span className="break-all text-fg">{l.text}</span>
          </div>
        ) : (
          <div
            key={l.id}
            className={`whitespace-pre-wrap break-words ${toneClass[l.tone ?? "default"]}`}
          >
            {l.text}
          </div>
        ),
      )}
    </div>
  );
}
