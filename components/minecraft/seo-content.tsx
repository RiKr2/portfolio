"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { CONTACT } from "@/content";

/**
 * Visually-hidden but in-DOM rendering of all content. The interactive world shows
 * sections in modals on demand; this guarantees crawlers, screen readers, and no-JS
 * visitors still get the full résumé as semantic HTML.
 */
export function SeoContent() {
  const { t } = useLanguage();
  const s = t.sections;
  return (
    <div className="sr-only">
      <h1>{t.hero.name}</h1>
      <p>{t.hero.role}</p>
      <p>{t.hero.tagline}</p>

      <section aria-label={s.about.heading}>
        <h2>{s.about.heading}</h2>
        {s.about.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section aria-label={s.experience.heading}>
        <h2>{s.experience.heading}</h2>
        <ul>
          {s.experience.items.map((it) => (
            <li key={it.company}>
              {it.company} — {it.role} ({it.period})
              {it.description ? ` ${it.description}` : ""} {it.stack.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label={s.skills.heading}>
        <h2>{s.skills.heading}</h2>
        <ul>
          {s.skills.groups.map((g) => (
            <li key={g.label}>
              {g.label}: {g.items.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label={s.education.heading}>
        <h2>{s.education.heading}</h2>
        <ul>
          {s.education.items.map((it) => (
            <li key={it.title}>
              {it.title} — {it.org} ({it.period})
              {it.credentialId ? ` · credential ${it.credentialId}` : ""}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label={s.publication.heading}>
        <h2>{s.publication.heading}</h2>
        <p>
          {s.publication.title} — {s.publication.venue} ({s.publication.date}). {s.publication.summary}
        </p>
        <a href={s.publication.link}>{s.publication.linkLabel}</a>
      </section>

      <section aria-label={s.contact.heading}>
        <h2>{s.contact.heading}</h2>
        <p>{s.contact.intro}</p>
        <ul>
          <li>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
          <li>
            <a href={CONTACT.github}>{CONTACT.github}</a>
          </li>
          <li>
            <a href={CONTACT.linkedin}>{CONTACT.linkedin}</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
