"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { CONTACT } from "@/content";
import { McButton } from "../mc-button";
import { BlockIcon } from "../block-icon";

export function Contact() {
  const { t } = useLanguage();
  const s = t.sections.contact;
  const servers = [
    { label: s.emailLabel, value: CONTACT.email, href: `mailto:${CONTACT.email}`, external: false, join: "send" },
    { label: s.githubLabel, value: "github.com/RiKr2", href: CONTACT.github, external: true, join: "join" },
    { label: s.linkedinLabel, value: "linkedin.com/in/rikr2", href: CONTACT.linkedin, external: true, join: "join" },
  ];
  return (
    <div>
      <p className="mb-3 text-[#2b2b2b]">{s.intro}</p>
      <ul className="space-y-2">
        {servers.map((sv) => (
          <li key={sv.label} className="mc-inset flex items-center gap-3 bg-[#3a3a3a] p-2 text-white">
            <span className="mc-bevel flex h-9 w-9 shrink-0 items-center justify-center" style={{ borderWidth: 2 }}>
              <BlockIcon icon="ender_pearl" size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-pixel text-[9px] text-white">{sv.label}</div>
              <div className="truncate text-xs text-white/70">{sv.value}</div>
            </div>
            <McButton href={sv.href} external={sv.external} ariaLabel={`${sv.join} ${sv.label}`}>
              {sv.join}
            </McButton>
          </li>
        ))}
      </ul>
    </div>
  );
}
