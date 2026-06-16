"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { CONTACT } from "@/content";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mx-auto w-full max-w-3xl px-4 py-10 text-center text-xs text-comment">
      <p>
        {t.footer.builtWith}{" "}
        <a
          href={CONTACT.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-accent hover:underline"
        >
          {t.footer.viewSource}
        </a>
      </p>
    </footer>
  );
}
