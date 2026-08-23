"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * حوار تعليمي حقيقي، لا فقاعة "مرحبًا! كيف أستطيع مساعدتك؟". رسالة
 * الطالب فقاعة مليئة، ورد المرشد لوحة مؤطّرة لا فقاعة — فرق بصري متعمّد
 * يقول: هذا توجيه ملاصق للدرس، لا روبوت محادثة عام.
 */

const EXCHANGE = [
  { from: "student" as const, text: "ما فهمت ليش استخدمنا هذه الطريقة؟" },
  {
    from: "tutor" as const,
    text: "خلينا نرجع خطوة واحدة. قبل ما نحل المعادلة، شوف العلاقة بين الحدّين...",
  },
  { from: "student" as const, text: "آه، الآن فهمت. ممكن مثال ثاني؟" },
  { from: "tutor" as const, text: "أكيد. جرّب هذه المسألة أولًا..." },
];

export function SmartLearningSupport() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".sl-message", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".sl-message",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} dir="rtl" className="bg-neutral-100 py-24 lg:py-32">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-thmanyah-display text-h2 text-neutral-900">
              وعندما تتعثر، لا تتوقف.
            </h2>
            <p className="mt-3 max-w-sm font-thmanyah-text text-body text-neutral-500">
              عندما تواجه فكرة لا تفهمها، يبقى الدعم قريبًا منك، فيشرح لك، يسألك،
              ويقترح عليك ما يساعدك على التقدم.
            </p>
            <p className="mt-6 font-thmanyah-text text-caption text-neutral-400">
              الدعم الذكي يساند التعلّم — لا يحل محل المعلّم.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="mx-auto max-w-lg">
              <span className="mb-4 inline-block rounded-full border border-neutral-200 bg-neutral-0 px-3 py-1.5 text-micro text-neutral-500">
                في سياق: حل المعادلات من الدرجة الثانية
              </span>

              <div className="space-y-4">
                {EXCHANGE.map((msg, i) => (
                  <div
                    key={i}
                    className={`sl-message flex ${
                      msg.from === "student" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {msg.from === "student" ? (
                      <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-neutral-900 px-4 py-3 text-neutral-0">
                        <p className="font-thmanyah-text text-caption leading-relaxed">{msg.text}</p>
                      </div>
                    ) : (
                      <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-primary/25 bg-neutral-0 px-4 py-3">
                        <span className="text-micro text-primary">المرشد</span>
                        <p className="mt-1 font-thmanyah-text text-caption leading-relaxed text-neutral-700">
                          {msg.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default SmartLearningSupport;
