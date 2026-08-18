"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { SectionLede } from "@/app/src/components/layout/SectionLede";

/**
 * "الفرق ليس في عدد الدروس."
 *
 * الإمضاء البصري لهذا القسم: خط رأسي واحد بين العمودين، يمتلئ من الأعلى
 * للأسفل مع التمرير (scrub-linked لا per-row)، برأس متوهج يتحرك كـ"مذنّب"
 * في مقدمة الامتلاء. هذا يمثّل التحوّل نفسه — لا خمس حركات منفصلة، بل حركة
 * واحدة مُخرجة تُقرأ ككل. كل ما حولها هادئ عمدًا: بطاقات زجاجية ثابتة يمينًا،
 * ونص "وحدك" اليساري يُشطب بخط رفيع يُرسم عند ظهور كل صف — صدى تصميمي لنفس
 * فكرة الخط الرأسي، لا عنصر جديد منفصل.
 *
 * كلمة "وحدك" ضخمة شبحية خلف الـlede تعطي إحساسًا تحريريًا (مجلة لا موقع
 * عام)، وهي التفصيلة الوحيدة "الجريئة" الإضافية — كل شيء آخر بقي منضبطًا.
 */

interface ComparisonRow {
  alone: string;
  withRawi: string;
}

const rows: ComparisonRow[] = [
  { alone: "تحفظ كلمات ثم تنساها", withRawi: "تستخدم الكلمات في سياقها" },
  { alone: "تتردد قبل أن تتكلم", withRawi: "تتدرّب على الكلام باستمرار" },
  { alone: "لا تعرف أخطاءك", withRawi: "تجد من يصحح لك" },
  { alone: "تتعلم بلا خطة واضحة", withRawi: "مسار واضح من مستوى إلى آخر" },
  { alone: "تتوقف عندما تفقد الحماس", withRawi: "متابعة تساعدك على الاستمرار" },
];

const GRAIN_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function LanguageLearningDifferenceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ledeRef = useRef<HTMLDivElement | null>(null);
  const rowsWrapRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const strikeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const spineFillRef = useRef<HTMLDivElement | null>(null);
  const spineGlowRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(ledeRef.current, { opacity: 1, y: 0 });
        gsap.set(rowRefs.current, { opacity: 1, y: 0 });
        gsap.set(strikeRefs.current, { scaleX: 1 });
        gsap.set(nodeRefs.current, { backgroundColor: "var(--color-visual-pink)" });
        gsap.set(spineFillRef.current, { scaleY: 1 });
        gsap.set(spineGlowRef.current, { top: "100%" });
        gsap.set(closingRef.current, { opacity: 1, y: 0 });
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

      // الخط الرأسي — امتلاء مربوط بتقدّم التمرير عبر كامل قائمة الصفوف
      if (spineFillRef.current && rowsWrapRef.current) {
        gsap.set(spineFillRef.current, { scaleY: 0, transformOrigin: "top" });
        gsap.set(spineGlowRef.current, { top: "0%" });

        ScrollTrigger.create({
          trigger: rowsWrapRef.current,
          start: "top 60%",
          end: "bottom 75%",
          scrub: 0.6,
          onUpdate: (self) => {
            gsap.set(spineFillRef.current, { scaleY: self.progress });
            gsap.set(spineGlowRef.current, { top: `${self.progress * 100}%` });
          },
        });
      }

      rowRefs.current.forEach((row, i) => {
        if (!row) return;

        gsap.fromTo(
          row,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          },
        );

        const strike = strikeRefs.current[i];
        if (strike) {
          gsap.fromTo(
            strike,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              delay: 0.3,
              ease: "power2.out",
              transformOrigin: "right center",
              scrollTrigger: { trigger: row, start: "top 88%" },
            },
          );
        }

        const node = nodeRefs.current[i];
        if (node) {
          gsap.to(node, {
            backgroundColor: "var(--color-visual-pink)",
            borderColor: "var(--color-visual-pink)",
            duration: 0.4,
            delay: 0.2,
            scrollTrigger: { trigger: row, start: "top 88%" },
          });
        }
      });

      if (closingRef.current) {
        gsap.fromTo(
          closingRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: closingRef.current, start: "top 90%" },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative overflow-hidden bg-neutral-100 pt-28 lg:pt-40"
    >


      <SectionContainer>
        <div className="relative">
          <div ref={ledeRef} className="relative">
            <SectionLede
              lead="الفرق ليس في عدد الدروس."
              body="بدل أن نخبرك بما لدينا، إليك ما يتغيّر فعليًا حين تتعلم بطريقة مختلفة."
            />
          </div>

          {/* رؤوس الأعمدة */}
          <div className="mt-20 hidden lg:grid lg:grid-cols-[1fr_2.5rem_1fr] lg:items-center">
            <span className="font-thmanyah-text text-caption tracking-[0.08em] text-neutral-400 text-right">
              تعلّم اللغة وحدك
            </span>
            <span />
            <span className="font-thmanyah-text text-caption tracking-[0.08em] text-visual-pink text-right">
              التعلّم في راوي
            </span>
          </div>

          <div ref={rowsWrapRef} className="relative mt-6 lg:mt-4">
            {/* مسار الخط الرأسي الثابت + طبقة الامتلاء + رأس المذنّب المتوهج */}
            <div
              aria-hidden
              className="absolute right-1/2 top-0 hidden h-full w-px translate-x-1/2 bg-neutral-200 lg:block"
            >
              <div
                ref={spineFillRef}
                className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-visual-pink via-visual-pink to-visual-pink"
              />
              <div
                ref={spineGlowRef}
                className="absolute left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in srgb, var(--color-visual-pink) 90%, transparent), transparent 72%)",
                }}
              />
            </div>

            <div className="flex flex-col divide-y divide-neutral-200/70">
              {rows.map((row, i) => (
                <div
                  key={row.alone}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className="grid grid-cols-1 items-center gap-4 py-8 lg:grid-cols-[1fr_2.5rem_1fr] lg:gap-0 lg:py-10"
                >
                  <div className="relative text-right">
                    <p className="font-thmanyah-text text-body text-neutral-400 lg:text-h3-sm">
                      {row.alone}
                    </p>
                    <div
                      ref={(el) => {
                        strikeRefs.current[i] = el;
                      }}
                      aria-hidden
                      className="absolute right-0 top-1/2 h-px w-full origin-right bg-neutral-300"
                    />
                  </div>

                  <div className="relative hidden items-center justify-center lg:flex">
                    <div
                      ref={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      className="h-2.5 w-2.5 rounded-full border-2 border-neutral-300 bg-neutral-0 transition-colors"
                    />
                  </div>

                  <div className="relative overflow-hidden rounded-lg border border-white/60 bg-white/50 p-4 shadow-[0_20px_44px_-28px_rgba(20,16,40,0.18)] backdrop-blur-xl lg:p-5">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
                      }}
                    />
                    <p className="font-thmanyah-display relative text-body font-semibold text-neutral-900 text-right lg:text-h3-sm">
                      {row.withRawi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الخاتمة — بطاقة زجاجية مُزاحة، لا نص مركزي بسيط */}
          <div
            ref={closingRef}
            className="relative mt-20 max-w-7xl overflow-hidden rounded-lg border border-white/60 bg-white/50 p-8 backdrop-blur-xl lg:mt-24 lg:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in srgb, var(--color-visual-pink) 26%, transparent), transparent 72%)",
              }}
            />
            <p className="font-thmanyah-display relative text-h3-sm text-neutral-900 lg:text-h2-sm">
              لأن معرفة اللغة شيء، والقدرة على استخدامها شيء آخر.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default LanguageLearningDifferenceSection;