import CurriculumHero from "@/app/src/sections/curriculum/CurriculumHero";
import PhilosophySection from "@/app/src/sections/curriculum/PhilosophySection";
import StagesSection from "@/app/src/sections/curriculum/StagesSection";
import AfterLessonSection from "@/app/src/sections/curriculum/AfterLessonSection";
import SubjectMethodsSection from "@/app/src/sections/curriculum/SubjectMethodsSection";
import LearningCycleSection from "@/app/src/sections/curriculum/LearningCycleSection";
import PersonalizedSection from "@/app/src/sections/curriculum/PersonalizedSection";
import OutcomesSection from "@/app/src/sections/curriculum/OutcomesSection";
import CurriculumCTASection from "@/app/src/sections/curriculum/CurriculumCTASection";

export default function CurriculumPage() {
  return (
    <>
      <CurriculumHero />
      <PhilosophySection />
      <StagesSection />
      <AfterLessonSection />
      <SubjectMethodsSection />
      <LearningCycleSection />
      <PersonalizedSection />
      <OutcomesSection />
      <CurriculumCTASection />
    </>
  );
}