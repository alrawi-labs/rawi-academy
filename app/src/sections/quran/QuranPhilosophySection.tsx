"use client";

import {SectionContainer} from "@/app/src/components/layout/SectionContainer";

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
        stroke="var(--color-visual-teal)"
        strokeWidth="1"
        strokeOpacity="0.15"
        fill="none"
      />
      <circle cx="20" cy="160" r="3" fill="var(--color-visual-orange)" fillOpacity="0.3" />
    </svg>
  );
}

export default function QuranPhilosophySection() {
  return (
    <section dir="rtl" className="relative bg-neutral-900 py-24 sm:py-36 overflow-hidden">
      <CornerAccent />

      <SectionContainer className="relative">
        <div className="max-w-[760px]">
          <p className="font-thmanyah-display font-bold text-h3-sm sm:text-h2 text-neutral-0 leading-[1.6] mt-6">
            في راوي، نهتم بكل مسار نقدّمه، لكننا نولي مسار القرآن{" "}
            <span className="text-visual-teal">عنايةً خاصة</span>؛ لأنه ليس
            علمًا نتعلمه ثم نمضي عنه، بل كلام الله الذي يهدي الإنسان، ويصاحبه
            في حياته.
          </p>

          <p className="font-thmanyah-text text-body text-neutral-400 leading-8 mt-8 max-w-[640px]">
            لذلك بنينا مسار القرآن بعنايةٍ أكبر؛ ليجد الطالب فيه ما يحتاجه من{" "}
            <span className="text-neutral-0 font-semibold">التلاوة الصحيحة</span>
            ، و<span className="text-neutral-0 font-semibold">التجويد</span>
            ، و<span className="text-neutral-0 font-semibold">الحفظ</span>
            ، و<span className="text-neutral-0 font-semibold">المراجعة</span>
            ، و<span className="text-neutral-0 font-semibold">الفهم</span>
            ، ضمن تعليمٍ متدرّج ومتابعةٍ مستمرة.
          </p>

          <div className="mt-12 sm:mt-16 border-r-2 border-visual-teal pr-6 sm:pr-8">
            <p className="font-thmanyah-display font-bold text-h3-sm sm:text-h2-sm text-neutral-0 leading-snug">
              لأن بعض ما يتعلّمه الإنسان يرافقه طوال عمره، والقرآن أولى ما
              يُعنى به.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}