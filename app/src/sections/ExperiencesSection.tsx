"use client";

import AgeCard from "../components/Experiences/AgeCard";
import AIModelsCard from "../components/Experiences/AIModelsCard";
import FeatureCard from "../components/Experiences/FeatureCard";
import FollowCard from "../components/Experiences/FollowCard";
import { SectionContainer } from "../components/layout/SectionContainer";
import { SectionLede } from "../components/layout/SectionLede";

export default function ExperienceSection() {
  return (
    <section dir="rtl" className="relative pt-28">
      <SectionContainer>
        <SectionLede
          lead="ليس المهم أن يتعلّم أكثر... بل أن يتعلّم أفضل"
          sub=" في راوي، نفضّل جودة الميزات على كثرتها، لذلك صُممت كل ميزة لتخدم رحلة التعلّم وتمنح الطالب قيمةً حقيقية"
          // body=" فهمٌ أعمق، ووتيرة أنسب، ومتابعة تراعي كيف يتعلّم كل طالب — لا كيف يتعلّم الجميع"
          className="mb-16"
        />

        {/* البطاقة */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="col-span-2">
            <AgeCard />
          </div>
          <div className="col-span-1">
            <FollowCard />
          </div>
        </div>
        <FeatureCard />
        <AIModelsCard />
      </SectionContainer>
    </section>
  );
}
