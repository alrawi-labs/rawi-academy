import { SetNavbarVariant } from "@/app/src/context/NavbarVariantContext";
import CodeCoursesSection from "@/app/src/sections/code/CodeCoursesSection";
import CodeHero from "@/app/src/sections/code/CodeHero";
import CodePhilosophySection from "@/app/src/sections/code/CodePhilosophySection";
import CodeProjectsSection from "@/app/src/sections/code/CodeProjectsSection";
import CodingCTASection from "@/app/src/sections/code/CodingCTASection";
import CodingFaqSection from "@/app/src/sections/code/CodingFaqSection";
import CodingLearningExperienceSection from "@/app/src/sections/code/CodingLearningExperienceSection";
import LanguagesShowcase from "@/app/src/sections/code/LanguagesShowcase";


export default function CodePage() {
  return (
    <main dir="rtl" lang="ar" className="overflow-x-clip bg-neutral-100">
      <SetNavbarVariant variant="dark" />
        <CodeHero />
        <CodePhilosophySection />
        <CodeCoursesSection />
        {/* <LanguagesShowcase /> */}
        <CodeProjectsSection />
        <CodingCTASection />
        <CodingFaqSection />
    
    </main>
  );
}
