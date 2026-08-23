"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * لوحة تقدّم بالطباعة والفراغ، لا رسوم بيانية عامة. الرقم الكبير هو
 * البطل البصري، وشريط النشاط الأسبوعي سبعة أعمدة رفيعة فقط — تلميح لا
 * تحليل.
 */

const WEEK_ACTIVITY = [20, 45, 30, 70, 55, 90, 60]; // نسبة ارتفاع كل عمود
const TODAY_INDEX = 5;

export function ProgressTracking() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pt-bar",
        { height: "0%" },
        {
          height: (i) => `${WEEK_ACTIVITY[i]}%`,
          duration: 0.9,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      if (prefersReducedMotion || !percentRef.current) return;
      const counter = { value: 0 };
      gsap.to(counter, {
        value: 78,
        duration: 1.2,
        ease: "power1.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.textContent = `${Math.round(counter.value)}٪`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} dir="rtl" className="bg-neutral-0 py-24 lg:py-32">
      <SectionContainer>
        <h2 className="max-w-lg font-thmanyah-display text-h2 text-neutral-900">
          تعرف دائمًا أين وصلت.
        </h2>
        <p className="mt-3 max-w-lg font-thmanyah-text text-body text-neutral-500">
          لأن التعلّم المستمر يحتاج إلى رؤية واضحة للتقدّم.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-neutral-200 pt-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-micro tracking-[0.15em] text-neutral-400">مساري الحالي</span>
            <p className="mt-2 font-thmanyah-display text-h3 text-neutral-900">
              البرمجة — المستوى الثاني
            </p>
            <p className="mt-4 font-thmanyah-text text-body text-neutral-600">٢٤ من ٣٠ درسًا</p>
          </div>

          <div className="flex items-end lg:col-span-3">
            <span ref={percentRef} className="font-thmanyah-display text-[3.5rem] leading-none text-primary">
              0٪
            </span>
          </div>

          <div className="lg:col-span-4">
            <span className="text-micro tracking-[0.15em] text-neutral-400">تقدم هذا الأسبوع</span>
            <div className="mt-5 flex h-20 items-end gap-2">
              {WEEK_ACTIVITY.map((_, i) => (
                <div key={i} className="flex h-full flex-1 items-end">
                  <div
                    className={`pt-bar w-full rounded-sm ${
                      i === TODAY_INDEX ? "bg-primary" : "bg-neutral-200"
                    }`}
                    style={{ height: "0%" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default ProgressTracking;
