"use client";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  ariaLabel?: string;
  selected?: boolean;
  className?: string;
}

const BASE =
  "mc-bevel mc-btn inline-flex items-center justify-center gap-2 px-3 py-2 font-pixel text-[10px] leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--mc-yellow)]";

export function McButton({
  children,
  onClick,
  href,
  external,
  ariaLabel,
  selected = false,
  className = "",
}: Props) {
  const cls = `${BASE} ${selected ? "outline outline-2 outline-white" : ""} ${className}`;
  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}
