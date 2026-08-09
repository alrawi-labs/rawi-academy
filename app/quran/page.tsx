import { SetNavbarVariant } from "../src/context/NavbarVariantContext";
import MakharijSection from "../src/sections/quran/MakharijSection";
import QuranCoursesSection from "../src/sections/quran/QuranCoursesSection";
import QuranCTASection from "../src/sections/quran/QuranCTASection";
import QuranFAQSection from "../src/sections/quran/QuranFAQSection";
import QuranHeroSection from "../src/sections/quran/QuranHeroSection";
import QuranInstructorsSection from "../src/sections/quran/QuranInstructorsSection";
import QuranLearningExperienceSection from "../src/sections/quran/QuranLearningExperienceSection";
import QuranLearningPathSection from "../src/sections/quran/QuranLearningPathSection";
import TajweedSection from "../src/sections/quran/TajweedSection";

export default function QuranExperiencePage() {
  return (
    <main dir="rtl" lang="ar" className="overflow-x-clip bg-neutral-0">
      <SetNavbarVariant variant="dark" />

      <QuranHeroSection />
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
