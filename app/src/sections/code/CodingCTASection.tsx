// app/src/sections/curriculum/CodingCTASection.tsx
"use client";

import CTAPanelSection from "@/app/src/components/CTAPanelSection";

export default function CodingCTASection() {
  return (
    <div className="bg-neutral-900 pb-10">
      <CTAPanelSection
        backgroundImage="/backgrounds/dark/bg-9.png"
        title="دربك في البرمجة يبدأ من هنا"
        description="تواصل معنا لنساعدك تختار المسار الذي يناسب عمر ابنك وأهدافه، خطوة بخطوة"
        buttonHref="/contact"
        buttonText="تواصل معنا"
        buttonVariant="primary"
      />
    </div>
  );
}