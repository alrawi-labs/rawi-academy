"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * الرحلة كخط واحد يُرسم أثناء التمرير (scrub)، لا سبع بطاقات متطابقة.
 * التسميات تتبادل أعلى/أسفل الخط لكسر الرتابة على الشاشات الكبيرة،
 * وتتحول إلى قائمة رأسية بخط جانبي على الموبايل.
 */

const STAGES = ["اكتشف", "ابدأ", "تعلّم", "طبّق", "تابع", "تجاوز", "أتقن"];

export function LearningJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      if (prefersReducedMotion) {
        gsap.set(path, { strokeDashoffset: 0 });
        gsap.set(".journey-dot, .journey-label", { opacity: 1, y: 0 });
        return;
      }

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      gsap.fromTo(
        ".journey-dot, .journey-label",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} dir="rtl" className="bg-neutral-100 py-24 lg:py-32">
      <SectionContainer>
        <h2 className="max-w-xl font-thmanyah-display text-h2 text-neutral-900">
          رحلة واحدة، من أول خطوة إلى الإتقان
        </h2>

        {/* سطح سطح كبير */}
        <div className="relative mt-20 hidden lg:block">
          <svg viewBox="0 0 1200 60" className="w-full" preserveAspectRatio="none" aria-hidden="true">
            <line x1="20" y1="30" x2="1180" y2="30" stroke="var(--color-neutral-300)" strokeWidth="1" />
            <path
              ref={pathRef}
              d="M20 30 L1180 30"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>

          <div className="absolute inset-x-0 top-0 flex justify-between px-[1.6%]">
            {STAGES.map((stage, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={stage} className="relative flex flex-col items-center" style={{ width: "1px" }}>
                  <span
                    className={`journey-label absolute whitespace-nowrap font-thmanyah-text text-caption text-neutral-600 ${
                      isEven ? "-top-9" : "top-9"
                    }`}
                  >
                    {stage}
                  </span>
                  <span
                    className="journey-dot absolute top-[26px] h-2.5 w-2.5 rounded-full border-2 border-primary bg-neutral-100"
                    style={{ boxShadow: "0 0 0 4px var(--color-neutral-100)" }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* قائمة رأسية للموبايل */}
        <ol className="relative mt-14 space-y-8 border-r border-neutral-300 pr-6 lg:hidden">
          {STAGES.map((stage, i) => (
            <li key={stage} className="relative">
              <span className="absolute -right-[29px] top-1 h-2.5 w-2.5 rounded-full border-2 border-primary bg-neutral-100" />
              <span className="font-thmanyah-text text-caption text-neutral-400">{`٠${i + 1}`}</span>
              <p className="mt-1 font-thmanyah-display text-h3-sm text-neutral-900">{stage}</p>
            </li>
          ))}
        </ol>
      </SectionContainer>
    </section>
  );
}

export default LearningJourney;
