import type { ReactNode } from "react";

export function TerminalWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="region"
      aria-label={`terminal: ${title}`}
      className={`overflow-hidden rounded-xl border border-border-soft bg-panel shadow-[0_24px_60px_-28px_rgba(0,0,0,0.7)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border-soft bg-panel-2 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </span>
        <span className="flex-1 truncate text-center text-xs text-muted select-none">{title}</span>
        <span className="w-[52px]" aria-hidden />
      </div>
      <div className="p-4 text-sm leading-relaxed sm:p-6 sm:text-[0.95rem]">{children}</div>
    </div>
  );
}
