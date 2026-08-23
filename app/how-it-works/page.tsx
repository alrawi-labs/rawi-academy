/**
 * ترتيب السرد: اكتشف → ابدأ → تعلّم → طبّق → تابع → تجاوز → أتقن.
 * كل قسم يبني على الذي قبله بصريًا (بسيط → منظم → تفاعلي → شخصي → متقَن)
 * بدل تكرار نفس تشريح "عنوان + فقرة + بطاقات" عبر الصفحة.
 */

import FinalJourneyCTA from "@/app/src/sections/how-it-works/FinalJourneyCTA";
import HowItWorksFooterCTA from "@/app/src/sections/how-it-works/HowItWorksFooterCTA";
import HowItWorksHero from "@/app/src/sections/how-it-works/HowItWorksHero";
import LearnAndPractice from "@/app/src/sections/how-it-works/LearnAndPractice";
import LearningJourney from "@/app/src/sections/how-it-works/LearningJourney";
import LearningJourneySection from "@/app/src/sections/how-it-works/LearningJourneySection";
import LearningPathExperience from "@/app/src/sections/how-it-works/LearningPathExperience";
import LearningRecord from "@/app/src/sections/how-it-works/LearningRecord";
import ProgressTracking from "@/app/src/sections/how-it-works/ProgressTracking";
import SmartLearningSupport from "@/app/src/sections/how-it-works/SmartLearningSupport";
import StartFromWhereYouAre from "@/app/src/sections/how-it-works/StartFromWhereYouAre";

export default function HowItWorksPage() {
  return (
    <main>
      <HowItWorksHero />
      <LearningJourneySection />
      <LearningJourney />
      <StartFromWhereYouAre />
      <LearningPathExperience />
      <LearnAndPractice />
      <ProgressTracking />
      <SmartLearningSupport />
      <LearningRecord />
      <FinalJourneyCTA />
      <HowItWorksFooterCTA />
    </main>
  );
}