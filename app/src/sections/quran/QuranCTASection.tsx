// app/src/sections/curriculum/CurriculumCTASection.tsx
"use client";

import CTAPanelSection from "@/app/src/components/CTAPanelSection";
import { div } from "framer-motion/client";
import { LINKS } from "../../lib/links";

export default function QuranCTASection() {
  return (
    <div className="bg-neutral-900 pb-10" >
      <CTAPanelSection
      backgroundImage="/backgrounds/dark/bg-5.png"
      title="لكلّ طالبٍ طريقه، ولكلّ هدفٍ ما يلائمه"
      description="إِن إِلتبس عليك اختيار البرنامج، ففريقنا هنا ليعينك على اختيار ما يناسب أهدافك واحتياجاتك"
      buttonHref={LINKS.support}
      buttonText="تواصل معنا"
      buttonVariant="orange-solid"
    />
    </div>
  );
}
