// src/components/consultations/ConsultationValue.tsx
import {SectionContainer} from "@/app/src/components/layout/SectionContainer";
import {SectionLede} from "@/app/src/components/layout/SectionLede";

const BENEFITS = [
  {
    label: "تحليل المشكلة",
    body: "فهم المشكلة من جذورها وتحديد ما تحتاجه فعليًا.",
    lift: false,
  },
  {
    label: "رأي خبير",
    body: "مناقشة الخيارات المتاحة مع شخص لديه خبرة عملية.",
    lift: true,
  },
  {
    label: "خطة واضحة",
    body: "الخروج بخطوات عملية تستطيع تنفيذها بعد انتهاء الجلسة.",
    lift: false,
  },
  {
    label: "مصادر وتوجيه",
    body: "الحصول على مصادر وأدوات وتوصيات مناسبة لحالتك.",
    lift: true,
  },
] as const;

export default function ConsultationValue() {
  return (
    <section dir="rtl" className="relative bg-neutral-0 py-24 lg:py-32 border-t border-neutral-100">
      <SectionContainer>
        <div className="max-w-2xl">
          <SectionLede
            lead="استشارة واحدة قد تختصر عليك أسابيع."
            body="بدل أن تضيع وقتك بين عشرات المصادر والتجارب، تحدث مع شخص لديه خبرة عملية في المجال الذي تحتاجه."
          />
        </div>

        {/* مسار واحد متصل، بإزاحة رأسية متبادلة — ليس Grid من 4 بطاقات متطابقة */}
        <div className="mt-16 lg:mt-20 relative">
          <div
            className="hidden lg:block absolute top-1/2 right-0 left-0 h-px bg-neutral-200"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {BENEFITS.map((benefit, i) => (
              <div
                key={benefit.label}
                className={`relative ${benefit.lift ? "lg:-translate-y-6" : "lg:translate-y-6"}`}
              >
                <div className="flex lg:flex-col items-start gap-4 lg:gap-0">
                  <span className="relative z-10 shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-neutral-900 lg:mb-5 font-thmanyah-display text-caption font-bold text-neutral-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-thmanyah-display font-bold text-h3-sm text-neutral-900">
                      {benefit.label}
                    </h3>
                    <p className="mt-1.5 font-thmanyah-text text-body text-neutral-600 leading-relaxed max-w-[220px]">
                      {benefit.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}