import {SectionContainer} from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";

const stages = [
  {
    n: "٠١",
    title: "نبدأ من الأساس",
    body: "كل مسار يبدأ من المستوى المناسب للمتعلم، ويبني المعرفة تدريجيًا دون القفز فوق الأساسيات.",
    tone: "text-primary/[0.12]",
  },
  {
    n: "٠٢",
    title: "نفهم قبل أن نحفظ",
    body: "نشرح المفاهيم بوضوح ونربطها بما يعرفه المتعلم، حتى يفهم الفكرة قبل أن يحفظ تفاصيلها.",
    tone: "text-primary/[0.22]",
  },
  {
    n: "٠٣",
    title: "نتعلم بالتطبيق",
    body: "نحول المعرفة إلى ممارسة من خلال التمارين والتطبيقات والمشاريع التي تجعل التعلم قابلًا للاستخدام.",
    tone: "text-primary/[0.35]",
  },
  {
    n: "٠٤",
    title: "نقيس الفهم",
    body: "اختبارات وتقييمات تكشف ما أتقنه المتعلم وما يحتاج إلى مراجعة قبل الانتقال إلى مرحلة جديدة.",
    tone: "text-primary/[0.5]",
  },
  {
    n: "٠٥",
    title: "نراجع ونتقدم",
    body: "نستخدم نتائج التعلم لتحديد نقاط القوة وما يحتاج إلى مزيد من التدريب، حتى يستمر التقدم بطريقة واضحة.",
    tone: "text-primary/[0.7]",
  },
  {
    n: "٠٦",
    title: "نصل إلى الإتقان",
    body: "الهدف ليس إنهاء المسار، بل الوصول إلى مستوى يستطيع فيه المتعلم استخدام ما تعلمه بثقة واستقلالية.",
    tone: "text-primary",
  },
];

export default function StagesSection() {
  return (
    <section dir="rtl" className="relative py-[130px] pb-[100px] max-md:py-[70px]">
      <SectionContainer>
        <Reveal>
          <h2 className="font-thmanyah-display text-h2 text-neutral-0 max-w-[520px] mb-[90px] max-md:text-h2-sm max-md:mb-14">
            كيف نبني رحلة التعلم؟
          </h2>
        </Reveal>

        <div>
          {stages.map((stage, i) => {
            const isLast = i === stages.length - 1;
            return (
              <Reveal key={stage.n}>
                <div
                  className={`grid grid-cols-[110px_1fr] items-start gap-x-6 py-10 border-t border-white/10 first:border-t-0 max-md:grid-cols-[64px_1fr] max-md:gap-x-4 max-md:py-7 ${
                    i % 2 === 1 ? "md:ps-[10%]" : ""
                  }`}
                >
                  <span
                    className={`font-thmanyah-display text-[64px] leading-[0.9] tabular-nums select-none max-md:text-[36px] ${stage.tone}`}
                  >
                    {stage.n}
                  </span>
                  <div className="max-w-[460px] pt-1">
                    <h3
                      className={`text-h3-sm font-semibold mb-2 ${
                        isLast ? "text-primary" : "text-neutral-0"
                      }`}
                    >
                      {stage.title}
                    </h3>
                    <p className="font-thmanyah-text text-body text-neutral-400 leading-relaxed">
                      {stage.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}