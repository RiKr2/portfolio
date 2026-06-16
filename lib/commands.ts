export type CommandKind = "section" | "util";

export interface Command {
  id: string; // canonical id (also the section id when kind === "section")
  aliases: string[];
  kind: CommandKind;
  description: string;
}

export const COMMANDS: Command[] = [
  { id: "about", aliases: ["whoami"], kind: "section", description: "who I am" },
  { id: "experience", aliases: ["work"], kind: "section", description: "where I've worked" },
  { id: "skills", aliases: ["stack"], kind: "section", description: "tech I use" },
  { id: "education", aliases: [], kind: "section", description: "studies & certs" },
  { id: "publication", aliases: ["paper"], kind: "section", description: "research" },
  { id: "contact", aliases: ["email"], kind: "section", description: "get in touch" },
  { id: "help", aliases: ["?"], kind: "util", description: "list commands" },
  { id: "theme", aliases: [], kind: "util", description: "toggle dark/light" },
  { id: "lang", aliases: [], kind: "util", description: "toggle ES/EN" },
  { id: "clear", aliases: ["cls"], kind: "util", description: "clear the terminal" },
];

const NAMES = COMMANDS.flatMap((c) => [c.id, ...c.aliases]);

export function resolveCommand(input: string): Command | null {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  return COMMANDS.find((c) => c.id === q || c.aliases.includes(q)) ?? null;
}

export function autocomplete(fragment: string): string[] {
  const q = fragment.trim().toLowerCase();
  if (!q) return COMMANDS.map((c) => c.id);
  return NAMES.filter((n) => n.startsWith(q));
}

/** Longest common prefix of a list of strings — used for Tab completion. */
export function commonPrefix(words: string[]): string {
  if (words.length === 0) return "";
  return words.reduce((acc, w) => {
    let i = 0;
    while (i < acc.length && i < w.length && acc[i] === w[i]) i++;
    return acc.slice(0, i);
  });
}
