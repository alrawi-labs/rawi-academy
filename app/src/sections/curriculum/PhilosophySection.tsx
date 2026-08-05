"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";

const steps = [
  { label: "معرفة", size: "text-h3-sm", color: "text-neutral-300" },
  { label: "فهم", size: "text-h3", color: "text-neutral-400" },
  { label: "تطبيق", size: "text-h2-sm", color: "text-neutral-500" },
  { label: "تقييم", size: "text-h2", color: "text-neutral-700" },
  { label: "إتقان", size: "text-hero", color: "text-primary" },
] as const;

type Point = { x: number; y: number };

// Noktalardan geçen yumuşak eğri — ardışık noktaların orta noktalarını
// çapa alan klasik "smooth line through points" tekniği. Catmull-Rom'un
// aksine noktalar eşit aralıklı olmadığında (bizim zikzak girintili
// düzenimizde olduğu gibi) taşma/kavis yapmaz, her zaman noktalar
// arasında kalır. Sabit koordinat yok; tamamen ölçülen konumlardan üretilir.
function smoothPath(points: Point[]) {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} L ${points[1].x.toFixed(1)} ${points[1].y.toFixed(1)}`;
  }

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  d += ` Q ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}, ${((points[0].x + points[1].x) / 2).toFixed(1)} ${((points[0].y + points[1].y) / 2).toFixed(1)}`;

  for (let i = 1; i < points.length - 1; i++) {
    const mid = {
      x: (points[i].x + points[i + 1].x) / 2,
      y: (points[i].y + points[i + 1].y) / 2,
    };
    d += ` Q ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}, ${mid.x.toFixed(1)} ${mid.y.toFixed(1)}`;
  }

  const last = points[points.length - 1];
  d += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
  return d;
}

export default function PhilosophySection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [points, setPoints] = useState<Point[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wrapRect = wrap.getBoundingClientRect();

      const next: Point[] = dotRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - wrapRect.left,
          y: r.top + r.height / 2 - wrapRect.top,
        };
      });

      setSize({ width: wrapRect.width, height: wrapRect.height });
      setPoints(next);
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const pathD = points.length === steps.length ? smoothPath(points) : "";

  return (
    <section dir="rtl" className="relative bg-neutral-100 py-[100px] overflow-hidden">
      {/* Sol üstte çok hafif bir aura — sayfanın genel dilini (aurora gradient) burada da fısıltı gibi taşıyor */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-gradient-aurora opacity-[0.06] blur-3xl"
      />

      <SectionContainer>
        <div className="relative grid grid-cols-[1.1fr_.9fr] gap-[70px] items-center max-md:grid-cols-1 max-md:gap-16">
          <Reveal>
            <h2 className="font-thmanyah-display text-h2 leading-[1.5] text-neutral-900 mb-5 max-md:text-h2-sm">
              التعلّم عندنا{" "}
              <span className="relative inline-block text-primary">
                <span
                  aria-hidden
                  className="absolute inset-x-[-4px] bottom-[6px] h-[9px] -rotate-1 rounded-[2px] bg-primary/15 -z-10"
                />
                رحلة
              </span>
              ، لا مجموعة دروس.
            </h2>

            <p className="text-body max-w-[460px] text-neutral-700 leading-[1.9]">
              نؤمن أن التعلم الحقيقي لا يحدث بمجرد إنهاء الدروس، بل عندما
              تتحول المعرفة إلى فهم، والفهم إلى ممارسة، والممارسة إلى مهارة
              يمكن الاعتماد عليها.
            </p>
          </Reveal>

          <Reveal>
            <div ref={wrapRef} className="relative">
              {/* الرحلة كخط — الآن يتتبّع مراكز النقاط الفعلية بعد القياس، لا إحداثيات ثابتة */}
              {size.width > 0 && (
                <svg
                  viewBox={`0 0 ${size.width} ${size.height}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-70 max-md:hidden"
                >
                  <defs>
                    <linearGradient id="pathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--color-neutral-300)" stopOpacity="0" />
                      <stop offset="35%" stopColor="var(--color-neutral-300)" />
                      <stop offset="100%" stopColor="var(--color-primary)" />
                    </linearGradient>
                  </defs>
                  {pathD && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="url(#pathGrad)"
                      strokeWidth="1.5"
                      strokeDasharray="2 8"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              )}

              <div className="relative flex flex-col gap-3 items-end max-md:items-start">
                {steps.map((step, i) => {
                  const isLast = i === steps.length - 1;
                  const indent = i * 26;
                  return (
                    <div
                      key={step.label}
                      style={{
                        marginInlineEnd: indent,
                      }}
                      className={`group font-thmanyah-display flex items-center gap-3.5 transition-transform duration-300 hover:-translate-y-0.5 max-md:!ms-0 ${step.size} ${step.color}`}
                    >
                      <span
                        ref={(el) => {
                          dotRefs.current[i] = el;
                        }}
                        className="relative flex items-center justify-center shrink-0"
                      >
                        {isLast && (
                          <span className="absolute h-5 w-5 rounded-full bg-primary/12 blur-[4px]" />
                        )}
                        <span
                          className={
                            isLast
                              ? "relative w-2.5 h-2.5 rounded-full bg-primary"
                              : "w-1.5 h-1.5 rounded-full bg-current transition-transform duration-300 group-hover:scale-125"
                          }
                        />
                      </span>
                      <span className={isLast ? "font-bold" : undefined}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}