"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * خريطة مسار حقيقية، لا Timeline قياسي. عقدة لكل مرحلة بحالة واضحة
 * (مكتملة / حالية / مقفلة)، وخط رأسي يمتلئ تدريجيًا حتى نقطة التقدّم
 * الحالية. صندوق "الهدف القادم" يكسر انتظام العمود بإزاحة أفقية بسيطة.
 */

const STAGES = [
  { title: "الأساسيات", meta: "٨ دروس", state: "done" as const },
  { title: "الفهم", meta: "٦ دروس", state: "done" as const },
  { title: "التطبيق", meta: "٤ من ٧ دروس", state: "current" as const },
  { title: "المشاريع", meta: "٥ دروس", state: "locked" as const },
  { title: "الإتقان", meta: "٣ دروس", state: "locked" as const },
];

// نسبة امتلاء الخط حتى المرحلة الحالية
const FILL_PERCENT = 46;

export function LearningPathExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(fillRef.current, { height: `${FILL_PERCENT}%` });
        return;
      }
      gsap.fromTo(
        fillRef.current,
        { height: "0%" },
        {
          height: `${FILL_PERCENT}%`,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} dir="rtl" className="bg-neutral-0 py-24 lg:py-32">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-thmanyah-display text-h2 text-neutral-900">
              كل مسار له طريق واضح.
            </h2>
            <p className="mt-3 max-w-sm font-thmanyah-text text-body text-neutral-500">
              بدل أن تتنقل بين دروس متفرقة، تعرف دائمًا أين أنت، وما الخطوة
              التالية.
            </p>
          </div>

          <div className="relative lg:col-span-8">
            <div className="relative flex">
              {/* الخط الرأسي */}
              <div className="relative ml-7 w-px shrink-0 bg-neutral-200">
                <div
                  ref={fillRef}
                  className="absolute right-0 top-0 w-px bg-primary"
                  style={{ height: "0%" }}
                />
              </div>

              <ol className="-mt-1 flex-1 space-y-10 pr-8">
                {STAGES.map((stage) => (
                  <li key={stage.title} className="relative">
                    <span
                      className={`absolute -right-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        stage.state === "done"
                          ? "border-primary bg-primary"
                          : stage.state === "current"
                            ? "border-primary bg-neutral-0"
                            : "border-neutral-300 bg-neutral-0"
                      }`}
                    >
                      {stage.state === "done" && (
                        <span className="text-[9px] leading-none text-neutral-0">✓</span>
                      )}
                    </span>

                    <div
                      className={`flex flex-wrap items-baseline justify-between gap-2 ${
                        stage.state === "locked" ? "opacity-40" : ""
                      }`}
                    >
                      <h3
                        className={`font-thmanyah-display text-h3-sm ${
                          stage.state === "current" ? "text-primary" : "text-neutral-900"
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <span className="font-thmanyah-text text-caption text-neutral-400">
                        {stage.meta}
                      </span>
                    </div>

                    {stage.state === "current" && (
                      <div className="mt-4 max-w-xs rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 sm:mr-10">
                        <span className="text-micro text-primary">الهدف القادم</span>
                        <p className="mt-1 font-thmanyah-text text-caption text-neutral-700">
                          إنهاء ٣ تمارين إضافية للانتقال إلى المشاريع
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default LearningPathExperience;
