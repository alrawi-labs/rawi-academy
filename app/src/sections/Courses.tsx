"use client";

import QuranSunnahCard from "../components/courses/QuranSunnahCard";
import ProgrammingCard from "../components/courses/ProgrammingCard";
import LanguagesCard from "../components/courses/LanguagesCard";
import MathCard from "../components/courses/MathCard";
import { SectionLede } from "../components/layout/SectionLede";
import { SectionContainer } from "../components/layout/SectionContainer";

export default function CoursesSection() {
  return (
    <section dir="rtl" className="relative bg-neutral-100 py-28 px-1">
      <SectionContainer>
        <SectionLede
          lead="في راوي، نؤمن أن التعليم لا يقتصر على مادةٍ واحدة"
          sub="لهذا بنينا تجربة تعليمية تجمع ما يحتاجه أبناؤنا في دينهم ودنياهم؛ بَدْءًا من القرآن الكريم والسنة النبوية، مرورًا بالرياضيات واللغات، وصولًا إلى البرمجة والمهارات التي أصبحت جزءًا من عالم اليوم."
          body="نقدّم المعرفة بلغةٍ عربية واضحة، ومنهجٍ متدرّج، يهدف إلى بناء شخصيةٍ تتعلّم، وتفهم، وتواصل النمو بثقة."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <QuranSunnahCard />
          <ProgrammingCard />
          <LanguagesCard />
          <MathCard />
        </div>
      </SectionContainer>
    </section>
  );
}
