"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

const STEPS: Step[] = [
  {
    title: "لقاء مباشر",
    subtitle: "يبدأ الدرس مع الشيخ",
    description:
      "درس مباشر ضمن مجموعة صغيرة، يبدأ فيه الطالب من مستواه الفعلي، ويقرأ ويتعلم بدل أن يكتفي بالمشاهدة.",
    tags: ["مباشر", "مجموعة صغيرة"],
  },
  {
    title: "قراءة وتصحيح",
    subtitle: "يقرأ الطالب، ويصحّح الشيخ",
    description:
      "الطالب يقرأ بنفسه، ويستمع الشيخ إلى تلاوته ويصحح الأخطاء في النطق، ومخارج الحروف، وأحكام التجويد.",
    tags: ["قراءة فعلية", "تصحيح مباشر"],
  },
  {
    title: "تثبيت المحفوظ",
    subtitle: "ما حفظه لا يُترك للنسيان",
    description:
      "لا ننتقل دائمًا إلى الجديد. يُراجع الطالب ما سبق حفظه وفق خطة تساعده على تثبيته قبل الانتقال إلى ما بعده.",
    tags: ["حفظ جديد", "مراجعة", "تثبيت"],
  },
  {
    title: "تدريب بين الدروس",
    subtitle: "ويستمر التعلّم بعد انتهاء اللقاء",
    description:
      "يحصل الطالب على ما يحتاجه للمراجعة والتدريب بين الدروس، حتى يبقى متصلًا بما تعلّمه ولا يعتمد على وقت الحصة وحده.",
    tags: ["مراجعة", "تدريب", "استعداد للدرس القادم"],
  },
  {
    title: "متابعة أسبوعية",
    subtitle: "نعرف أين وصل، وماذا يحتاج",
    description:
      "تُراجع رحلة الطالب باستمرار لمعرفة تقدّمه، وما يحتاج إلى مزيد من التدريب، وما إذا كان مستعدًا للانتقال إلى الخطوة التالية.",
    tags: ["تقدّم واضح", "مراجعة مستمرة"],
  },
];

const FLOW_WORDS = ["يتعلّم", "يقرأ", "يُصحّح", "يراجع", "يتقدّم"];

/** Nokta-ayraçlı metin — chip/badge yerine, TajweedSection'daki TermsRow ile aynı aile. */
function TagsRow({ tags }: { tags: string[] }) {
  return (
    <p className="font-thmanyah-text text-[11px] text-neutral-500 leading-6">
      {tags.map((tag, i) => (
        <span key={tag}>
          {i > 0 && <span className="text-visual-teal mx-2">·</span>}
          {tag}
        </span>
      ))}
    </p>
  );
}

/** Numara yerine — PhoneMockup'taki nokta-navigasyon dilinin aynısı, dosya-lokal. */
function ProgressDots({ activeIndex, total }: { activeIndex: number; total: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === activeIndex ? "w-3 h-1.5 bg-visual-teal" : "w-1.5 h-1.5 bg-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

/** Son karta özel — markanın mandala/nokta desenine göz kırpan minik köşe motifi. */
function DotGridAccent() {
  return (
    <div className="absolute -bottom-2 -left-2 grid grid-cols-5 gap-1.5 opacity-40 pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-visual-teal" />
      ))}
    </div>
  );
}

function StepCard({
  step,
  index,
  total,
  wide,
}: {
  step: Step;
  index: number;
  total: number;
  wide?: boolean;
}) {
  return (
    <div
      className={`border-visual-teal/20 relative rounded-lg border p-7 sm:p-8 overflow-hidden bg-cover bg-center ${
        wide ? "lg:col-span-2" : ""
      }`}
      style={{ backgroundImage: "url('/backgrounds/bg-39.png')" }}
    >

      {wide && <DotGridAccent />}

      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold text-neutral-400 tracking-[0.08em]">
            {step.title}
          </span>
          <ProgressDots activeIndex={index} total={total} />
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className="font-thmanyah-display font-bold text-h3-sm sm:text-h3 text-neutral-900 leading-snug">
            {step.subtitle}
          </h3>
          <p className="font-thmanyah-text text-caption text-neutral-400 leading-6 max-w-[440px]">
            {step.description}
          </p>
        </div>

        <div className="pt-3 border-t border-visual-teal/40">
          <TagsRow tags={step.tags} />
        </div>
      </div>
    </div>
  );
}

/**
 * Kapanış "akış" cümlesi — kelimeler ve aralarındaki oklar scroll'da sırayla beliriyor.
 * Zamanlamayı değiştirmek için tek yer: WORD_DURATION / WORD_OVERLAP / ARROW_DURATION.
 */
function FlowSentence({ words }: { words: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const WORD_DURATION = 0.45;
  const WORD_OVERLAP = "-=0.15"; // bir sonraki kelime, öncekinin bitmesini beklemeden bu kadar erken başlar
  const ARROW_DURATION = 0.3;
  const ARROW_OVERLAP = "-=0.2";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray<HTMLSpanElement>(".flow-word");
      const arrowEls = gsap.utils.toArray<SVGSVGElement>(".flow-arrow");

      // Oklar sağdan (akışın başladığı taraf) sola doğru "çiziliyormuş" gibi büyüsün
      gsap.set(arrowEls, { scaleX: 0, transformOrigin: "100% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      wordEls.forEach((word, i) => {
        tl.from(
          word,
          { opacity: 0, y: 14, duration: WORD_DURATION, ease: "power2.out" },
          i === 0 ? 0 : WORD_OVERLAP
        );
        if (arrowEls[i]) {
          tl.to(
            arrowEls[i],
            { scaleX: 1, duration: ARROW_DURATION, ease: "power2.out" },
            ARROW_OVERLAP
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mt-16 sm:mt-20 rounded-lg bg-visual-teal/[0.04] py-10 sm:py-12 px-6 sm:px-12"
    >
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        {words.map((word, i) => (
          <div key={word} className="flex items-center gap-3 sm:gap-5">
            <span className="flow-word font-thmanyah-display font-bold text-h3-sm sm:text-h2-sm text-neutral-900">
              {word}
            </span>
            {i < words.length - 1 && (
              <svg
                className="flow-arrow shrink-0 text-visual-teal/50"
                width="20"
                height="14"
                viewBox="0 0 20 14"
              >
                <path
                  d="M18 7H2M2 7L7 2M2 7L7 12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function QuranLearningExperienceSection() {
  return (
    <section dir="rtl" className="relative py-20 sm:py-28 bg-neutral-0">
      <SectionContainer>
        <div className="max-w-[620px]">
          <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 text-neutral-900 leading-[1.35]">
            ماذا يحدث بعد أن يسجّل ابنك؟
          </h2>
          <p className="font-thmanyah-text text-body text-neutral-600 leading-7 mt-5">
            لا نترك الطالب وحده أمام الدروس.
            <br />
            من أول قراءة إلى المراجعة الأسبوعية، يمرّ الطالب بخطوات واضحة
            تساعده على التعلّم والاستمرار.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
          {STEPS.map((step, i) => (
            <StepCard
              key={step.title}
              step={step}
              index={i}
              total={STEPS.length}
              wide={i === STEPS.length - 1}
            />
          ))}
        </div>

        <FlowSentence words={FLOW_WORDS} />
      </SectionContainer>
    </section>
  );
}