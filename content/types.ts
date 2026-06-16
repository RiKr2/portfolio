export type Locale = "en" | "es";

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  remote?: boolean;
  description?: string;
  stack: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface EducationItem {
  title: string;
  org: string;
  period: string;
  credentialId?: string;
}

export interface Content {
  meta: { title: string; description: string };
  nav: { langLabel: string; themeLabel: string; langSwitch: string; themeSwitch: string };
  hero: {
    name: string;
    role: string;
    bootCommand: string;
    tagline: string;
    prompt: string;
    hint: string;
  };
  commands: { help: string; unknown: string; cleared: string; sectionEcho: string };
  sections: {
    about: { heading: string; body: string[] };
    experience: { heading: string; items: ExperienceItem[] };
    skills: { heading: string; groups: SkillGroup[] };
    education: { heading: string; items: EducationItem[] };
    publication: {
      heading: string;
      title: string;
      venue: string;
      date: string;
      summary: string;
      link: string;
      linkLabel: string;
    };
    contact: { heading: string; intro: string; emailLabel: string; githubLabel: string; linkedinLabel: string };
  };
  footer: { builtWith: string; viewSource: string };
}
