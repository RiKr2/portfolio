"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clampX, nearestSign, type Sign } from "@/lib/minecraft";
import type { SectionId } from "@/content";

const CHAR_W = 32;
const SPEED = 4.4;
const JUMP_V = 9.4;
const GRAVITY = 0.6;

export function useMovement({
  worldWidth,
  signs,
  range,
  onInteract,
  startX = 140,
}: {
  worldWidth: number;
  signs: Sign[];
  range: number;
  onInteract: (s: SectionId) => void;
  startX?: number;
}) {
  const [x, setXState] = useState(startX);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [walking, setWalking] = useState(false);
  const [jumpOffset, setJumpOffset] = useState(0);

  const dirRef = useRef(0);
  const xRef = useRef(startX);
  const vyRef = useRef(0);
  const yRef = useRef(0);
  const jumpingRef = useRef(false);
  const interactRef = useRef(onInteract);
  useEffect(() => {
    interactRef.current = onInteract;
  }, [onInteract]);

  const interact = useCallback(() => {
    const s = nearestSign(xRef.current + CHAR_W / 2, signs, range);
    if (s) interactRef.current(s);
  }, [signs, range]);

  const jump = useCallback(() => {
    if (!jumpingRef.current) {
      jumpingRef.current = true;
      vyRef.current = JUMP_V;
    }
  }, []);

  const startMove = useCallback((dir: 1 | -1) => {
    dirRef.current = dir;
    setFacing(dir);
  }, []);

  const stopMove = useCallback((dir?: 1 | -1) => {
    if (dir === undefined || dirRef.current === dir) dirRef.current = 0;
  }, []);

  const setX = useCallback((nx: number) => {
    xRef.current = nx;
    setXState(nx);
  }, []);

  useEffect(() => {
    const maxX = Math.max(0, worldWidth - CHAR_W);
    let raf = 0;
    const tick = () => {
      if (dirRef.current !== 0) {
        xRef.current = clampX(xRef.current + dirRef.current * SPEED, 0, maxX);
        setXState(xRef.current);
        setWalking(!jumpingRef.current);
      } else {
        setWalking(false);
      }
      if (jumpingRef.current) {
        yRef.current += vyRef.current;
        vyRef.current -= GRAVITY;
        if (yRef.current <= 0) {
          yRef.current = 0;
          vyRef.current = 0;
          jumpingRef.current = false;
        }
        setJumpOffset(yRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [worldWidth]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          startMove(-1);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          startMove(1);
          break;
        case " ":
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          jump();
          break;
        case "e":
        case "E":
        case "Enter":
          e.preventDefault();
          interact();
          break;
      }
    };
    const up = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          stopMove(-1);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          stopMove(1);
          break;
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [startMove, stopMove, jump, interact]);

  return { x, facing, walking, jumpOffset, startMove, stopMove, jump, interact, setX };
}
