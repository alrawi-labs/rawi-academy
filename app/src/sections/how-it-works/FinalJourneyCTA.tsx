"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Button from "@/app/src/components/ui/Button";

/**
 * قسم مختلف تمامًا عمدًا: طباعة ضخمة، فراغ هائل، بلا شبكة بطاقات. خط
 * منحنٍ خافت جدًا في الخلفية يعيد صدى الشظايا المتراكبة في الـHero —
 * حلقة بصرية تُغلق الصفحة دون أن تفسّرها بالكلمات.
 */

export function FinalJourneyCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".fj-line", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".fj-line",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} dir="rtl" className="relative overflow-hidden bg-neutral-0 py-36 lg:py-56">
      <svg
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[240px] w-full -translate-y-1/2 opacity-[0.06] lg:block"
        viewBox="0 0 1200 240"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 180 C 260 40, 520 220, 780 80 S 1080 200, 1200 60"
          stroke="var(--color-primary)"
          strokeWidth="1.5"
        />
      </svg>

      <SectionContainer>
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="fj-line font-thmanyah-display text-[2.4rem] leading-[1.15] tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.6rem]">
            لم تأتِ راوي لتجمع الدروس.
            <br />
            أتيت لتبني نفسك.
          </h2>

          <p className="fj-line mx-auto mt-8 max-w-md font-thmanyah-text text-lead leading-relaxed text-neutral-500">
            كل درس أنجزته، وكل مسألة حُلّت، وكل مفهوم فهمته... يتحول مع الوقت إلى
            معرفة تستطيع الاعتماد عليها.
          </p>

          <div className="fj-line mt-12">
            <Button variant="primary" size="md" href="/paths">
              ابدأ رحلتك الآن
            </Button>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default FinalJourneyCTA;
