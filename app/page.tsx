import { Terminal } from "@/components/terminal/terminal";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Publication } from "@/components/sections/publication";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-10 px-4 py-10 sm:py-16">
      <Terminal />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Publication />
      <Contact />
    </main>
  );
}
