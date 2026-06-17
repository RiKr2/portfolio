import { AchievementsProvider } from "@/components/minecraft/achievements";
import { OverlayProvider } from "@/components/minecraft/overlay";
import { World } from "@/components/minecraft/world";
import { SectionModal } from "@/components/minecraft/sections/section-modal";
import { SeoContent } from "@/components/minecraft/seo-content";
import { McFooter } from "@/components/minecraft/mc-footer";
import { Intro } from "@/components/minecraft/intro";

export default function Home() {
  return (
    <div className="mc mc-page flex min-h-screen flex-col">
      <Intro />
      <AchievementsProvider>
        <OverlayProvider>
          <World />
          <McFooter />
          <SectionModal />
          <SeoContent />
        </OverlayProvider>
      </AchievementsProvider>
    </div>
  );
}
