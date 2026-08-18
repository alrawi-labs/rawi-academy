"use client";

import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/** Sayfanın diğer bölümlerindeki yay+nokta motifinin çok sade bir yansıması — sol üst köşe, arka planda. */
function CornerAccent() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute -top-10 -left-10 w-56 h-56 pointer-events-none"
      aria-hidden="true"
    >
      <path
        d="M 20 160 A 110 110 0 0 1 160 20"
        stroke="var(--color-visual-purple)"
        strokeWidth="1"
        strokeOpacity="0.15"
        fill="none"
      />
      <circle cx="20" cy="160" r="3" fill="var(--color-visual-orange)" fillOpacity="0.3" />
    </svg>
  );
}

export default function CodePhilosophySection() {
  return (
    <section dir="rtl" className="relative bg-neutral-900 py-24 sm:py-36 overflow-hidden">
      <CornerAccent />

      <SectionContainer className="relative">
        <div className="max-w-[760px]">
          <p className="font-thmanyah-display font-bold text-h3-sm sm:text-h2 text-neutral-0 leading-[1.6] mt-6">
            في راوي، لا ننظر إلى البرمجة على أنها مهارة تقنية فقط، بل{" "}
            <span className="text-visual-purple">طريقة تفكير</span>؛ طريقة
            تُعلّم الطالب كيف يفكّك مشكلة، ويبني حلًا، ويحوّل فكرة إلى شيء
            حقيقي يعمل أمامه.
          </p>

          <p className="font-thmanyah-text text-body text-neutral-400 leading-8 mt-8 max-w-[640px]">
            لذلك بنينا مسار البرمجة بعنايةٍ؛ ليجد الطالب فيه ما يحتاجه من{" "}
            <span className="text-neutral-0 font-semibold">الأساسيات الصحيحة</span>
            ، و<span className="text-neutral-0 font-semibold">التفكير المنطقي</span>
            ، و<span className="text-neutral-0 font-semibold">بناء المشاريع</span>
            ، و<span className="text-neutral-0 font-semibold">حل المشكلات</span>
            ، و<span className="text-neutral-0 font-semibold">المراجعة العملية</span>
            ، ضمن تعليمٍ متدرّج ومتابعةٍ مستمرة.
          </p>

          <div className="mt-12 sm:mt-16 border-r-2 border-visual-purple pr-6 sm:pr-8">
            <p className="font-thmanyah-display font-bold text-h3-sm sm:text-h2-sm text-neutral-0 leading-snug">
              لأن من يفهم الكود اليوم، هو من يبني أدوات الغد.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}