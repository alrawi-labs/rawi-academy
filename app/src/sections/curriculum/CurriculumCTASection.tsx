// app/src/sections/curriculum/CurriculumCTASection.tsx
"use client";

import CTAPanelSection from "@/app/src/components/CTAPanelSection";
import { LINKS } from "../../lib/links";

export default function CurriculumCTASection() {
  return (
    <CTAPanelSection
      backgroundImage="/backgrounds/dark/bg-1.png"
      title="الخطوة الأولى تبدأ باختيار ما يستحق أن تتعلمه."
      description="اختر المجال الذي يناسب أهدافك، وابدأ مسارك التعليمي مع راوي."
      buttonHref={LINKS.courses}
      buttonText="استكشف المسارات"
    />
  );
}