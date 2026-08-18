"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { SectionLede } from "@/app/src/components/layout/SectionLede";

/**
 * "من أول كلمة... إلى أن تتحدث بثقة."
 *
 * الإمضاء البصري: صورة واحدة فقط تُقصّ على شبكة البطاقات البينتو غير
 * المتناظرة (٧/٥ ثم ٤/٥/٣)، بحيث تبدو كل بطاقة "نافذة" على نفس الصورة —
 * لا تكرار لصورة داخل كل بطاقة، بل امتداد واحد متصل يُقاس فعليًا عبر
 * DOM (لا نسب مئوية تقريبية، لأن أحجام البطاقات مختلفة ولن تتصل بصريًا
 * لو اعتمدنا background-size بالنسبة المئوية وحدها). القياس يتم بجافاسكربت:
 * نأخذ أبعاد الشبكة الكاملة كمرجع لـ background-size لكل بطاقة، ثم نزيح
 * كل بطاقة بمقدار سالب يطابق موضعها داخل الشبكة كـ background-position،
 * فتتجمّع القطع بصريًا كأنها الصورة الأصلية مقطوعة بفواصل الشبكة.
 *
 * الصورة تبقى بلا أي تغشية داكنة — النص بدلًا من ذلك يجلس داخل بطاقة
 * بيضاء صلبة عائمة أسفل كل نافذة (لا زجاج، بيضاء تمامًا لضمان تباين
 * واضح)، بموضع غير مركزي. بطاقة "٠٥ التقدّم" وحدها تُميَّز بحلقة وردية
 * رفيعة حول بطاقتها البيضاء — إشارة إلى أنها "الوجهة" دون لمس الصورة.
 */

interface PathStep {
  number: string;
  title: string;
  body: string;
}

const steps: PathStep[] = [
  { number: "٠١", title: "البداية", body: "نعرف مستواك ونحدد من أين تبدأ." },
  {
    number: "٠٢",
    title: "الفهم",
    body: "تبني أساسًا قويًا في الكلمات والقواعد والاستماع.",
  },
  {
    number: "٠٣",
    title: "الممارسة",
    body: "تبدأ باستخدام اللغة بدل الاكتفاء بدراستها.",
  },
  {
    number: "٠٤",
    title: "التواصل",
    body: "تتدرّب على مواقف حقيقية تحتاج فيها إلى اللغة.",
  },
  {
    number: "٠٥",
    title: "التقدّم",
    body: "تنتقل من مستوى إلى آخر وأنت تعرف أين وصلت وإلى أين تتجه.",
  },
];

const CARD_SPAN = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-3",
];

// عدّل هذا المسار إلى الصورة الفعلية المطلوبة
const SHARED_PHOTO_SRC = "/backgrounds/bg-44.png";

export function LanguageLearningPathSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ledeRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // يقيس الشبكة وكل بطاقة فعليًا، ويحسب background-size/position لكل
  // بطاقة كي تتصل الصورة بصريًا عبر كامل الشبكة بلا تكرار ولا فجوات لونية.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const applySlices = () => {
      const gridRect = grid.getBoundingClientRect();
      if (gridRect.width === 0 || gridRect.height === 0) return;

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const offsetX = cardRect.left - gridRect.left;
        const offsetY = cardRect.top - gridRect.top;

        card.style.backgroundImage = `url(${SHARED_PHOTO_SRC})`;
        card.style.backgroundRepeat = "no-repeat";
        card.style.backgroundSize = `${gridRect.width}px ${gridRect.height}px`;
        card.style.backgroundPosition = `-${offsetX}px -${offsetY}px`;
      });
    };

    applySlices();

    const resizeObserver = new ResizeObserver(() => applySlices());
    resizeObserver.observe(grid);
    window.addEventListener("resize", applySlices);
    window.addEventListener("load", applySlices);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", applySlices);
      window.removeEventListener("load", applySlices);
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(ledeRef.current, { opacity: 1, y: 0 });
        gsap.set(cardRefs.current, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        ledeRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ledeRef.current, start: "top 82%" },
        },
      );

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: (i % 3) * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative bg-neutral-100 pt-28 lg:pt-40"
    >
      <SectionContainer>
        <div ref={ledeRef}>
          <SectionLede lead="من أول كلمة... إلى أن تتحدث بثقة." />
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 gap-2 lg:mt-20 lg:grid-cols-12"
        >
          {steps.map((step, i) => {
            const isDestination = i === steps.length - 1;

            return (
              <div
                key={step.number}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`relative flex min-h-[14rem] flex-col justify-end overflow-hidden rounded-lg bg-neutral-200 bg-cover bg-center p-4 lg:min-h-[16rem] lg:p-5 ${CARD_SPAN[i]}`}
              >
                {/* بطاقة نص بيضاء صلبة عائمة — لا تغشية على الصورة نفسها */}
                <div
                  className={`relative max-w-xs rounded-lg bg-neutral-0 p-4 text-right shadow-[0_20px_44px_-28px_rgba(20,16,40,0.35)] lg:p-5 ${
                    isDestination ? "ring-1 ring-visual-pink/40" : ""
                  }`}
                >
                  <span className="font-thmanyah-text text-caption tracking-[0.06em] text-visual-pink">
                    {step.number}
                  </span>
                  <h3 className="font-thmanyah-display text-h3-sm text-neutral-900 mt-1">
                    {step.title}
                  </h3>
                  <p className="font-thmanyah-text text-body text-neutral-600 mt-2">
                    {step.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

export default LanguageLearningPathSection;