"use client";

import { useEffect, useState } from "react";

interface Options {
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
}

/** Types `full` out character-by-character. Renders instantly under reduced motion. */
export function useTypewriter(full: string, opts: Options = {}) {
  const { speed = 38, startDelay = 250, enabled = true } = opts;
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!enabled || reduce) {
      setText(full);
      setDone(true);
      return;
    }

    setText("");
    setDone(false);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(function tick() {
      i += 1;
      setText(full.slice(0, i));
      if (i < full.length) {
        timer = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [full, speed, startDelay, enabled]);

  return { text, done };
}
