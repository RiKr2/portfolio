import type { ComponentType } from "react";
import type { SectionId } from "@/content";
import { About } from "./about";
import { Experience } from "./experience";
import { Skills } from "./skills";
import { Education } from "./education";
import { Publication } from "./publication";
import { Contact } from "./contact";

export const SECTION_COMPONENTS: Record<SectionId, ComponentType> = {
  about: About,
  experience: Experience,
  skills: Skills,
  education: Education,
  publication: Publication,
  contact: Contact,
};
