"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * سجل رأسي هادئ، لا شهادات عائمة. كل عنصر مكتمل يُعلَّم بعلامة صح دقيقة،
 * والعنصر المعلّق دائرة مفرغة. الشهادة تُذكر في سطر أخير خافت، لأن
 * التركيز على الرحلة لا على الوثيقة.
 */

const RECORD = [
  { text: "أكملت أساسيات Python", done: true },
  { text: "اجتزت اختبار الخوارزميات", done: true },
  { text: "أنجزت المشروع الأول", done: true },
  { text: "وصلت إلى المستوى الثاني", done: true },
  { text: "المشروع النهائي", done: false },
];

export function LearningRecord() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".lr-item", { opacity: 1, x: 0 });
        return;
      }
      gsap.fromTo(
        ".lr-item",
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} dir="rtl" className="bg-neutral-0 py-24 lg:py-32">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-thmanyah-display text-h2 text-neutral-900">
              كل خطوة تبقى جزءًا من رحلتك.
            </h2>
            <p className="mt-3 max-w-sm font-thmanyah-text text-body text-neutral-500">
              دروسك، إنجازاتك، اختباراتك، ومشاريعك تتجمع لتشكّل سجلًا واضحًا لما
              بنيته مع الوقت.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="space-y-5">
              {RECORD.map((item) => (
                <li key={item.text} className="lr-item flex items-center gap-4">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                      item.done
                        ? "border-primary bg-primary text-neutral-0"
                        : "border-neutral-300 text-transparent"
                    }`}
                  >
                    <span className="text-[11px] leading-none">✓</span>
                  </span>
                  <span
                    className={`font-thmanyah-text text-body ${
                      item.done ? "text-neutral-800" : "text-neutral-400"
                    }`}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-10 border-t border-neutral-200 pt-6 font-thmanyah-text text-caption text-neutral-400">
              وعند إتمام المسار، تحصل على شهادة إتمام المسار.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default LearningRecord;
