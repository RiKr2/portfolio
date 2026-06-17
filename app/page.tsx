import { AchievementsProvider } from "@/components/minecraft/achievements";
import { World } from "@/components/minecraft/world";
import { About } from "@/components/minecraft/sections/about";
import { Experience } from "@/components/minecraft/sections/experience";
import { Skills } from "@/components/minecraft/sections/skills";
import { Education } from "@/components/minecraft/sections/education";
import { Publication } from "@/components/minecraft/sections/publication";
import { Contact } from "@/components/minecraft/sections/contact";
import { McFooter } from "@/components/minecraft/mc-footer";

export default function Home() {
  return (
    <div className="mc mc-page flex min-h-screen flex-col">
      <AchievementsProvider>
        <World />
        <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-10">
          <About />
          <Experience />
          <Skills />
          <Education />
          <Publication />
          <Contact />
        </main>
        <McFooter />
      </AchievementsProvider>
    </div>
  );
}
