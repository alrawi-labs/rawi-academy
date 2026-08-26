import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

const steps = [
  { n: "01", title: "تعرف أين تبدأ", body: "تحدد مستواك وهدفك." },
  {
    n: "02",
    title: "تتعلم بوضوح",
    body: "محتوى منظم يشرح الفكرة دون تعقيد غير ضروري.",
  },
  {
    n: "03",
    title: "تطبق",
    body: "تمارين وتطبيقات تساعدك على تحويل المعرفة إلى مهارة.",
  },
  {
    n: "04",
    title: "تحصل على التوجيه",
    body: "عندما تحتاج مساعدة، تجد من يوجهك ويصحح مسارك.",
  },
  {
    n: "05",
    title: "ترى تقدمك",
    body: "تعرف ماذا أتقنت، وما الذي يحتاج إلى مزيد من العمل.",
  },
  {
    n: "06",
    title: "تنتقل إلى الخطوة التالية",
    body: "لأن نهاية مرحلة التعلم هي بداية المرحلة التي بعدها.",
  },
];

/**
 * JourneySection — Chapter ٠٥
 * ---------------------------------------------------------------------------
 * This is the one section where a numbered sequence is earned by the
 * content itself (a real six-step process), so it gets its own local
 * "01–06" numbering distinct from the chapter rail. Structure mirrors
 * FAQSection: a sticky heading column on the reading-start side, and the
 * steps running down the other column — not a centered dot-and-line
 * stepper.
 */
export function JourneySection() {
  return (
    <section dir="rtl" className="bg-neutral-100 py-28 md:py-36">
      <SectionContainer>

        <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-x-20 gap-y-14">
          <div className="md:sticky md:top-28 self-start">
            <h2 className="font-thmanyah-display text-h2 leading-[1.3] text-neutral-900">
              من أول خطوة
              <br />
              إلى القدرة على
              <br />
              الاعتماد على نفسك.
            </h2>
          </div>

          <ol className="border-t border-neutral-200">
            {steps.map((step) => (
              <li
                key={step.n}
                className="flex items-baseline gap-8 border-b border-neutral-200 py-8"
              >
                <span className="font-thmanyah-display text-h3-sm text-neutral-300 shrink-0 w-10">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-thmanyah-display text-h3 text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="font-thmanyah-text text-body text-neutral-600 mt-2 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </SectionContainer>
    </section>
  );
}