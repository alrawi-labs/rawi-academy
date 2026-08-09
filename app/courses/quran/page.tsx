import QuranPhilosophySection from "@/app/src/sections/quran/QuranPhilosophySection";
import { SetNavbarVariant } from "@/app/src/context/NavbarVariantContext";
import MakharijSection from "@/app/src/sections/quran/MakharijSection";
import QuranCoursesSection from "@/app/src/sections/quran/QuranCoursesSection";
import QuranCTASection from "@/app/src/sections/quran/QuranCTASection";
import QuranFAQSection from "@/app/src/sections/quran/QuranFAQSection";
import QuranHeroSection from "@/app/src/sections/quran/QuranHeroSection";
import QuranInstructorsSection from "@/app/src/sections/quran/QuranInstructorsSection";
import QuranLearningExperienceSection from "@/app/src/sections/quran/QuranLearningExperienceSection";
import QuranLearningPathSection from "@/app/src/sections/quran/QuranLearningPathSection";
import TajweedSection from "@/app/src/sections/quran/TajweedSection";

export default function QuranExperiencePage() {
  return (
    <main dir="rtl" lang="ar" className="overflow-x-clip bg-neutral-0">
      <SetNavbarVariant variant="dark" />

      <QuranHeroSection />
      <QuranPhilosophySection />
      <QuranCoursesSection />
      <MakharijSection />
      <QuranCTASection />
      <TajweedSection />
      <QuranLearningPathSection />
      <QuranInstructorsSection />
      <QuranLearningExperienceSection />
      <QuranFAQSection />
    </main>
  );
}
