"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BlockIcon } from "./block-icon";

/** Mojang-style "Loading world…" splash, shown briefly on first load. */
export function Intro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setDone(true), reduce ? 0 : 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="mc fixed inset-0 z-[70] flex flex-col items-center justify-center"
          style={{ background: "#0c0a13" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden
        >
          <div className="mc-bob">
            <BlockIcon icon="grass" size={56} />
          </div>
          <div className="mt-5 font-pixel text-sm text-white [text-shadow:2px_2px_0_#000]">
            Loading world…
          </div>
          <div className="mc-inset mt-4 h-4 w-64 overflow-hidden">
            <motion.div
              className="h-full bg-[var(--mc-green)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
