import type { Metadata } from "next";
import { AboutHero } from "@/app/src/sections/about/AboutHero";
import { WhyFoundedSection } from "@/app/src/sections/about/WhyFoundedSection";
import { PhilosophySection } from "@/app/src/sections/about/PhilosophySection";
import { SubjectsSection } from "@/app/src/sections/about/SubjectsSection";
import { StudentSection } from "@/app/src/sections/about/StudentSection";
import { JourneySection } from "@/app/src/sections/about/JourneySection";
import { TeacherSection } from "@/app/src/sections/about/TeacherSection";
import { TechnologySection } from "@/app/src/sections/about/TechnologySection";
import { AISection } from "@/app/src/sections/about/AISection";
import { VisionSection } from "@/app/src/sections/about/VisionSection";
import { FutureSection } from "@/app/src/sections/about/FutureSection";
import { AboutCTA } from "@/app/src/sections/about/AboutCTA";

export const metadata: Metadata = {
  title: "عن راوي — لماذا وُجدت راوي، وما الذي تؤمن به",
  description:
    "راوي أكاديمية تؤمن أن التعلم الحقيقي لا يُقاس بعدد الدروس التي أنهيتها، بل بما أصبحت قادرًا على فهمه وتطبيقه وبنائه.",
};

/**
 * /about — "عن راوي"
 * ---------------------------------------------------------------------------
 * One continuous narrative, per the brief:
 * لماذا بدأنا → المشكلة → ما نؤمن به → كيف نعلّم → ماذا نقدم →
 * كيف نستخدم التقنية → إلى أين نريد الوصول.
 *
 * Hero and AboutCTA are unnumbered bookends. The ten sections between them
 * are numbered chapters (٠١–١٠) via ChapterMarker. Two sections invert to
 * dark (StudentSection, AISection) as the page's only tonal breaks — one
 * humanizing, one forward-looking — everything else stays quiet and light
 * so those two moments carry weight instead of competing with alternating
 * backgrounds throughout.
 */
export default function AboutPage() {
  return (
    <main dir="rtl">
      <AboutHero />
      <WhyFoundedSection />
      <PhilosophySection />
      <SubjectsSection />
      <StudentSection />
      <JourneySection />
      <TeacherSection />
      <TechnologySection />
      <AISection />
      <VisionSection />
      <FutureSection />
      <AboutCTA />
    </main>
  );
}