import ExperiencesSection from "./src/sections/ExperiencesSection";
import CoursesSection from "./src/sections/Courses";
import Hero from "./src/sections/Hero";
import LogoRiseSection from "./src/sections/LogoRiseSection";
import WorthLearningHero from "./src/sections/WorthLearningHero";
import StartWithWhatMatters from "./src/sections/StartWithWhatMatters";
import TeamSection from "./src/sections/TeamSection";
import { Plus } from "lucide-react";
import WhyRawiSection from "./src/sections/WhyRawiSection";
import VisionSection from "./src/sections/VisionSection";
import ExploreTracksSection from "./src/sections/ExploreTracksSection";
import FinalCTASection from "./src/sections/FinalCTASection";
import HowToStartSection from "./src/sections/HowToStartSection";
import FAQSection from "./src/sections/FAQSection";
import Footer from "./src/sections/Footer";

export default function Home() {
  return (
    <div className="bg-neutral-100" >

      <Hero />
      <CoursesSection />
      <ExperiencesSection />
      <StartWithWhatMatters />
      <TeamSection />
      <WhyRawiSection />
      <VisionSection />
      <ExploreTracksSection />
      {/* <HowToStartSection /> */}
      <FinalCTASection />
      <FAQSection />

    </div>
  );
}
