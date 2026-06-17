import { en } from "./en";
import { es } from "./es";
import type { Content, Locale } from "./types";

export const dictionaries: Record<Locale, Content> = { en, es };

export const SECTION_IDS = ["about", "experience", "skills", "education", "publication", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const CONTACT = {
  email: "rikr2fun2ra@gmail.com",
  github: "https://github.com/RiKr2",
  linkedin: "https://www.linkedin.com/in/rikr2/",
  repo: "https://github.com/RiKr2/portfolio",
};

export type { Content, Locale };
