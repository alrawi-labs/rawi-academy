// src/components/consultations/HowConsultationWorks.tsx
import {SectionContainer} from "@/app/src/components/layout/SectionContainer";
import {SectionLede} from "@/app/src/components/layout/SectionLede";

const STEPS = [
  {
    n: "01",
    title: "اختر الخبير",
    body: "تصفح الخبراء واختر الشخص الأقرب إلى احتياجك.",
  },
  {
    n: "02",
    title: "احجز موعدك",
    body: "اختر الوقت المناسب لك واحجز جلستك.",
  },
  {
    n: "03",
    title: "ناقش مشكلتك",
    body: "اشرح حالتك بالتفصيل خلال الجلسة.",
  },
  {
    n: "04",
    title: "اخرج بخطة",
    body: "احصل على توجيه عملي وخطوات واضحة لما يجب فعله بعد ذلك.",
  },
] as const;

export default function HowConsultationWorks() {
  return (
    <section dir="rtl" className="relative bg-neutral-900 text-neutral-0 py-24 lg:py-32">
      <SectionContainer>
        <div className="max-w-xl">
          <SectionLede lead="كيف تعمل الاستشارة؟" />
        </div>

        <div className="relative mt-16 lg:mt-20 max-w-3xl mr-0 lg:mr-8">
          {/* الخط الرأسي — على الجانب الأيمن ليقرأ بشكل صحيح مع RTL */}
          <div
            className="absolute top-2 bottom-2 right-[15px] w-px bg-white/10"
            aria-hidden="true"
          />

          <ol className="space-y-14 lg:space-y-16">
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                className="relative pr-12"
                style={i % 2 === 1 ? { marginInlineStart: "2.5rem" } : undefined}
              >
                <span className="absolute right-0 top-0 h-8 w-8 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-visual-orange" />
                </span>

                <span className="block font-thmanyah-display text-hero leading-none text-white/10">
                  {step.n}
                </span>

                <h3 className="mt-2 font-thmanyah-display font-bold text-h3 text-neutral-0">
                  {step.title}
                </h3>
                <p className="mt-1.5 font-thmanyah-text text-body text-neutral-400 leading-relaxed max-w-md">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </SectionContainer>
    </section>
  );
}