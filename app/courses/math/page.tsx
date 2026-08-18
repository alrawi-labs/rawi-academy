import MathCoursesSection from "@/app/src/sections/math/MathCoursesSection";
import MathHero from "@/app/src/sections/math/MathHero";
import MathJourneySection from "@/app/src/sections/math/MathJourneySection";
import MathPhilosophySection from "@/app/src/sections/math/MathPhilosophySection";
import WhyMathSection from "@/app/src/sections/math/WhyMathSection";
import {MathInstructorsSection} from "@/app/src/sections/math/MathInstructorsSection";
import MathFAQSection from "@/app/src/sections/math/MathFAQSection";
import MathClosingCta from "@/app/src/sections/math/MathClosingCta";

export default function MathPage() {
  return (
    <main dir="rtl" lang="ar" className="overflow-x-clip bg-neutral-100">
      <MathHero />
      <MathPhilosophySection />
      <MathCoursesSection />
      <WhyMathSection />
      <MathInstructorsSection />
      <MathFAQSection />
      <MathClosingCta />
    </main>
  );
}
