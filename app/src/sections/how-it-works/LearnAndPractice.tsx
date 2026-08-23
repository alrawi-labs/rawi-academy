"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * مشهد واحد بثلاث مناطق: درس → انتقال → تطبيق. الانتقال خط منقّط بنقطة
 * تتحرك عليه بدل سهم عام، ليقول بصريًا إن التطبيق امتداد للدرس لا خطوة
 * منفصلة عنه.
 */

export function LearnAndPractice() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lp-panel",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      if (!prefersReducedMotion && dotRef.current) {
        gsap.to(dotRef.current, {
          offsetDistance: "100%",
          duration: 2.2,
          repeat: -1,
          ease: "power1.inOut",
          repeatDelay: 0.6,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} dir="rtl" className="bg-neutral-100 py-24 lg:py-32">
      <SectionContainer>
        <div className="max-w-lg">
          <h2 className="font-thmanyah-display text-h2 text-neutral-900">لا تشاهد الدرس فقط.</h2>
          <p className="mt-3 font-thmanyah-text text-body text-neutral-500">
            كل فكرة تتعلمها تتحول إلى فرصة للتطبيق، حتى تتحول المعرفة من معلومة
            إلى مهارة.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          {/* الدرس */}
          <div className="lp-panel rounded-xl border border-neutral-200 bg-neutral-0 p-6 lg:ml-6">
            <span className="text-micro text-neutral-400">درس</span>
            <p className="mt-2 font-thmanyah-display text-h3-sm text-neutral-900">
              العلاقة بين حدّي المعادلة
            </p>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full rounded-full bg-neutral-100" />
              <div className="h-2 w-4/5 rounded-full bg-neutral-100" />
              <div className="h-2 w-3/5 rounded-full bg-neutral-100" />
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full w-full rounded-full bg-primary" />
            </div>
          </div>

          {/* الانتقال — خط أفقي على الديسكتوب، رأسي على الموبايل */}
          <div className="relative hidden h-24 w-24 shrink-0 lg:block">
            <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
              <path
                id="lp-transition-path"
                d="M4 48 H92"
                stroke="var(--color-neutral-300)"
                strokeWidth="1"
                strokeDasharray="2 6"
                fill="none"
              />
            </svg>
            <span
              ref={dotRef}
              className="absolute h-1.5 w-1.5 rounded-full bg-primary"
              style={{
                offsetPath: "path('M4 48 H92')",
                offsetRotate: "0deg",
                top: 0,
                left: 0,
              }}
            />
          </div>
          <div className="mx-auto block h-10 w-px bg-neutral-300 lg:hidden" aria-hidden />

          {/* التطبيق */}
          <div className="lp-panel rounded-xl border border-neutral-200 bg-neutral-0 p-6 lg:mr-6">
            <span className="text-micro text-neutral-400">تطبيق</span>
            <p className="mt-2 font-thmanyah-text text-body text-neutral-800">
              ما ناتج حل المعادلة س² − ٥س + ٦ = ٠؟
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5">
                <span className="font-thmanyah-text text-caption text-neutral-800">س = ٢ أو س = ٣</span>
                <span className="text-caption text-primary">✓</span>
              </div>
              <div className="rounded-lg border border-neutral-200 px-4 py-2.5">
                <span className="font-thmanyah-text text-caption text-neutral-500">س = ١ أو س = ٦</span>
              </div>
            </div>
            <span className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-micro text-primary">
              أحسنت
            </span>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default LearnAndPractice;
