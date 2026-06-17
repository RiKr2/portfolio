"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SLOTS, clampX, nearestSign, type Sign } from "@/lib/minecraft";
import type { SectionId } from "@/content";
import { useLanguage } from "@/components/providers/language-provider";
import { useAchievements } from "./achievements";
import { useMovement } from "./use-movement";
import { Sky } from "./sky";
import { Ground, BLOCK } from "./ground";
import { Character } from "./character";
import { Hotbar } from "./hotbar";
import { Hud } from "./hud";
import { Controls } from "./controls";
import { BlockIcon } from "./block-icon";

const SIGN_START = 260;
const SIGN_GAP = 250;
const RANGE = 78;
const CHAR_W = 32;
const SIGNS: Sign[] = SLOTS.map((s) => ({ section: s.section, x: SIGN_START + s.index * SIGN_GAP }));
const WORLD_WIDTH = SIGN_START + (SLOTS.length - 1) * SIGN_GAP + 360;

export function World() {
  const { t } = useLanguage();
  const { unlock } = useAchievements();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [viewW, setViewW] = useState(0);
  const [selected, setSelected] = useState(0);
  const openRef = useRef<(s: SectionId, moveTo?: boolean) => void>(() => {});

  const { x, facing, walking, jumpOffset, startMove, stopMove, jump, interact, setX } = useMovement({
    worldWidth: WORLD_WIDTH,
    signs: SIGNS,
    range: RANGE,
    onInteract: (s) => openRef.current(s, false),
  });

  const openSection = useCallback(
    (section: SectionId, moveTo = false) => {
      const slot = SLOTS.find((s) => s.section === section)!;
      setSelected(slot.index);
      if (moveTo) {
        const sign = SIGNS.find((s) => s.section === section)!;
        setX(clampX(sign.x - 6, 0, WORLD_WIDTH - CHAR_W));
      }
      const reduce =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(section)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      unlock(t.sections[section].heading, slot.icon);
    },
    [setX, unlock, t],
  );
  useEffect(() => {
    openRef.current = openSection;
  }, [openSection]);

  // Measure scene width for camera panning (set only inside the observer callback).
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setViewW(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Number keys 1–9 select hotbar slots.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key >= "1" && e.key <= "9") {
        const slot = SLOTS.find((s) => s.index === Number(e.key) - 1);
        if (slot) {
          e.preventDefault();
          openRef.current(slot.section, true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Welcome achievement on first load.
  useEffect(() => {
    unlock("Welcome to my world!", "grass");
  }, [unlock]);

  const cameraX = clampX(x + CHAR_W / 2 - viewW / 2, 0, Math.max(0, WORLD_WIDTH - viewW));
  const nearest = nearestSign(x + CHAR_W / 2, SIGNS, RANGE);

  return (
    <section aria-label="Interactive world" className="relative">
      <div
        ref={sceneRef}
        className="relative h-[58vh] min-h-[380px] max-h-[580px] w-full overflow-hidden border-b-4 border-[var(--grass-dark)] select-none"
      >
        <Sky />

        {/* Panning world layer */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateX(${-cameraX}px)`, willChange: "transform" }}
        >
          <Ground width={WORLD_WIDTH} />

          {SIGNS.map((sg) => {
            const heading = t.sections[sg.section].heading;
            const slot = SLOTS.find((s) => s.section === sg.section)!;
            const active = nearest === sg.section;
            return (
              <button
                key={sg.section}
                type="button"
                onClick={() => openSection(sg.section, false)}
                aria-label={heading}
                className="absolute flex flex-col items-center"
                style={{ left: sg.x + CHAR_W / 2, bottom: BLOCK * 2, transform: "translateX(-50%)" }}
              >
                {active && (
                  <span className="mc-bob mb-1 font-pixel text-[8px] text-white [text-shadow:1px_1px_0_#000]">
                    [E]
                  </span>
                )}
                <span
                  className="mc-bevel flex items-center gap-1 px-2 py-1"
                  style={{
                    background: "#9c6b3f",
                    borderTopColor: "#caa15e",
                    borderLeftColor: "#caa15e",
                    borderRightColor: "#5c4026",
                    borderBottomColor: "#5c4026",
                  }}
                >
                  <BlockIcon icon={slot.icon} size={16} />
                  <span className="font-pixel text-[8px] text-white [text-shadow:1px_1px_0_#3a2a16]">
                    {heading}
                  </span>
                </span>
                <span style={{ width: 6, height: 22, background: "#7a5026" }} />
              </button>
            );
          })}

          <Character x={x} facing={facing} walking={walking} yOffset={jumpOffset} />
        </div>

        {/* Title / splash overlay */}
        <div className="pointer-events-none absolute left-1/2 top-4 w-[92%] max-w-2xl -translate-x-1/2 text-center">
          <h1 className="font-pixel text-[13px] leading-relaxed text-white [text-shadow:2px_2px_0_#000] sm:text-xl">
            {t.hero.name}
          </h1>
          <p className="mt-2 font-pixel text-[8px] leading-relaxed text-white/90 [text-shadow:1px_1px_0_#000] sm:text-[10px]">
            {t.hero.role}
          </p>
          <span className="mc-bob mt-3 inline-block -rotate-6 font-pixel text-[8px] text-[var(--mc-yellow)] [text-shadow:1px_1px_0_#000] sm:text-[10px]">
            Backend wizard!
          </span>
        </div>

        {/* HUD top-left */}
        <div className="absolute left-3 top-3">
          <Hud />
        </div>

        {/* Controls top-right */}
        <div className="absolute right-3 top-3">
          <Controls />
        </div>

        {/* Hotbar + hint bottom-center */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <p className="pointer-events-none font-pixel text-[7px] text-white [text-shadow:1px_1px_0_#000] sm:text-[9px]">
            {t.hero.hint}
          </p>
          <Hotbar selected={selected} onSelect={(i) => openSection(SLOTS[i].section, true)} />
        </div>
      </div>

      {/* Touch controls (mobile) */}
      <div className="mc flex items-center justify-center gap-3 py-3 sm:hidden">
        <TouchBtn label="◀" onDown={() => startMove(-1)} onUp={() => stopMove(-1)} aria="move left" />
        <TouchBtn label="▲" onDown={jump} onUp={() => {}} aria="jump" />
        <TouchBtn label="▶" onDown={() => startMove(1)} onUp={() => stopMove(1)} aria="move right" />
        <TouchBtn label="E" onDown={interact} onUp={() => {}} aria="enter sign" />
      </div>
    </section>
  );
}

function TouchBtn({
  label,
  onDown,
  onUp,
  aria,
}: {
  label: string;
  onDown: () => void;
  onUp: () => void;
  aria: string;
}) {
  return (
    <button
      type="button"
      aria-label={aria}
      onPointerDown={(e) => {
        e.preventDefault();
        onDown();
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        onUp();
      }}
      onPointerLeave={() => onUp()}
      className="mc-bevel mc-btn h-12 w-12 font-pixel text-xs text-[#2b2b2b]"
    >
      {label}
    </button>
  );
}
