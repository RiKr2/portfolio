"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { CONTACT } from "@/content";

export function McFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t-4 border-[var(--grass-dark)] px-4 py-8 text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
        <Link
          href="/terminal"
          className="mc-bevel mc-btn inline-flex items-center gap-2 px-3 py-2 font-pixel text-[9px] text-[#2b2b2b]"
        >
          → terminal mode
        </Link>
        <p className="font-pixel text-[8px] leading-relaxed text-white/85 [text-shadow:1px_1px_0_#000]">
          {t.footer.builtWith}{" "}
          <a
            href={CONTACT.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--mc-yellow)] underline"
          >
            {t.footer.viewSource}
          </a>
        </p>
      </div>
    </footer>
  );
}
