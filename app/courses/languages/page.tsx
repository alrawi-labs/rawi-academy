import InstructorsSpotlightSection from "@/app/src/sections/languages/InstructorsSpotlightSection";
import LanguageAccessSection from "@/app/src/sections/languages/LanguageAccessSection";
import LanguageClosingCta from "@/app/src/sections/languages/LanguageClosingCta";
import LanguageCoursesSection from "@/app/src/sections/languages/LanguageCoursesSection";
import LanguageFaqSection from "@/app/src/sections/languages/LanguageFaqSection";
import LanguageLearningDifferenceSection from "@/app/src/sections/languages/LanguageLearningDifferenceSection";
import LanguageLearningPathSection from "@/app/src/sections/languages/LanguageLearningPathSection";
import LanguageOpportunitiesSection from "@/app/src/sections/languages/LanguageOpportunitiesSection";
import LanguagesHero from "@/app/src/sections/languages/LanguagesHero";

export default function CodePage() {
  return (
    <main dir="rtl" lang="ar" className="overflow-x-clip bg-neutral-100">
      <LanguagesHero />
      <LanguageOpportunitiesSection />
      <LanguageCoursesSection />
      <LanguageLearningPathSection />
      <LanguageLearningDifferenceSection />
      <InstructorsSpotlightSection />
      <LanguageFaqSection />
      <LanguageClosingCta />
    </main>
  );
}
