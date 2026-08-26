import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

const observations = [
  "هناك وفرة هائلة من المحتوى التعليمي، لكن كثرة المحتوى لا تعني بالضرورة جودة التعلّم.",
  "قد يجد الطالب آلاف الدروس، لكنه لا يعرف من أين يبدأ.",
  "قد يتعلم معلومة، لكنه لا يعرف كيف يستخدمها.",
  "وقد ينهي دورة كاملة، دون أن يشعر أنه أصبح قادرًا على فعل شيء جديد.",
];

/**
 * WhyFoundedSection — Chapter ٠١
 * ---------------------------------------------------------------------------
 * The most important section in the page (per the brief): it names the
 * problem Rawi exists to solve. The four observations cascade with
 * increasing start-indent — a staircase, not a bullet list — so the reading
 * rhythm itself performs "things getting more specific/personal."
 */
export function WhyFoundedSection() {
  return (
    <section id="why-founded" dir="rtl" className="bg-neutral-100 py-28 md:py-36">
      <SectionContainer>

        <h2 className="font-thmanyah-display text-h2 md:text-[40px] leading-[1.25] text-neutral-900 max-w-2xl">
          لأننا رأينا فجوة بين التعلّم والتعليم.
        </h2>

        <ul className="mt-14 space-y-6 max-w-2xl">
          {observations.map((line, i) => (
            <li
              key={line}
              className="font-thmanyah-text text-lead text-neutral-600 leading-relaxed flex items-start gap-4"
              style={{ marginInlineStart: `${i * 28}px` }}
            >
              <span className="mt-3 h-px w-6 shrink-0 bg-neutral-300" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <p className="font-thmanyah-display text-h3 md:text-h3 text-primary mt-16 pt-10 border-t border-neutral-200 max-w-2xl leading-relaxed">
          راوي جاءت لتجعل التعلم أكثر وضوحًا، وأكثر ترابطًا، وأكثر قربًا من
          الواقع.
        </p>
      </SectionContainer>
    </section>
  );
}