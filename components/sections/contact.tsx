"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { CONTACT } from "@/content";
import { SectionShell } from "./section-shell";

export function Contact() {
  const { t } = useLanguage();
  const s = t.sections.contact;
  const links = [
    { label: s.emailLabel, href: `mailto:${CONTACT.email}`, value: CONTACT.email, external: false },
    { label: s.githubLabel, href: CONTACT.github, value: "github.com/RiKr2", external: true },
    { label: s.linkedinLabel, href: CONTACT.linkedin, value: "linkedin.com/in/rikr2", external: true },
  ];
  return (
    <SectionShell id="contact" command="cat contact.sh" heading={s.heading}>
      <p className="text-fg/90">{s.intro}</p>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2"
            >
              <span className="w-20 text-key">{l.label}</span>
              <span className="text-comment">→</span>
              <span className="text-str group-hover:underline">{l.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
