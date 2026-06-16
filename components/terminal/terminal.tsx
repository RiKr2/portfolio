"use client";

import { useCallback, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers/language-provider";
import { resolveCommand } from "@/lib/commands";
import { TerminalWindow } from "./terminal-window";
import { TerminalInput } from "./terminal-input";
import { TerminalOutput, type OutputLine } from "./terminal-output";
import { CommandChips } from "./command-chips";
import { useTypewriter } from "./use-typewriter";

export function Terminal() {
  const { t, toggle: toggleLang } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const { text: typed, done: bootDone } = useTypewriter(t.hero.bootCommand, {
    startDelay: 500,
    speed: 75,
  });
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const idRef = useRef(0);
  const nextId = () => (idRef.current += 1);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const input = raw.trim();
      if (!input) return;
      setHistory((h) => [...h, input]);
      const cmd = resolveCommand(input);
      const echo: OutputLine = { id: nextId(), kind: "input", prompt: t.hero.prompt, text: input };

      if (!cmd) {
        setLines((l) => [
          ...l,
          echo,
          { id: nextId(), kind: "output", text: t.commands.unknown, tone: "error" },
        ]);
        return;
      }

      if (cmd.kind === "section") {
        setLines((l) => [
          ...l,
          echo,
          { id: nextId(), kind: "output", text: `${t.commands.sectionEcho} ~/${cmd.id} …`, tone: "accent" },
        ]);
        scrollToSection(cmd.id);
        return;
      }

      switch (cmd.id) {
        case "help":
          setLines((l) => [...l, echo, { id: nextId(), kind: "output", text: t.commands.help, tone: "muted" }]);
          break;
        case "clear":
          setLines([]);
          break;
        case "theme":
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          setLines((l) => [...l, echo]);
          break;
        case "lang":
          toggleLang();
          setLines((l) => [...l, echo]);
          break;
      }
    },
    [t, resolvedTheme, setTheme, toggleLang, scrollToSection],
  );

  return (
    <section id="top" aria-label="Interactive terminal" className="scroll-mt-24">
      <TerminalWindow title={t.hero.prompt} className="bg-grid">
        <div className="flex gap-2">
          <span className="shrink-0 text-prompt">{t.hero.prompt}</span>
          <span className="text-fg">
            {typed}
            {!bootDone && <span className="caret" aria-hidden />}
          </span>
        </div>

        {bootDone && (
          <div className="mt-4 space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-accent sm:text-3xl">
              {t.hero.name}
            </h1>
            <p className="text-muted">{t.hero.role}</p>
            <p className="max-w-2xl pt-2 text-fg/90">{t.hero.tagline}</p>
          </div>
        )}

        {bootDone && lines.length > 0 && (
          <div className="mt-5 border-t border-border-soft pt-4">
            <TerminalOutput lines={lines} />
          </div>
        )}

        {bootDone && (
          <>
            <TerminalInput prompt={t.hero.prompt} history={history} onSubmit={runCommand} />
            <p className="mt-2 text-xs text-comment">{`// ${t.hero.hint}`}</p>
            <CommandChips onSelect={runCommand} />
          </>
        )}
      </TerminalWindow>
    </section>
  );
}
