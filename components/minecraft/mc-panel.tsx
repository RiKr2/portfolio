import type { ReactNode } from "react";

export function McPanel({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mc-bevel p-3 sm:p-4 ${className}`}>
      {title && (
        <div className="mb-3 font-pixel text-[10px] leading-relaxed text-[#373737] sm:text-xs">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
