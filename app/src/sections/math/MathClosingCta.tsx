"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import CTAPanelSection from "../../components/CTAPanelSection";
import { LINKS } from "../../lib/links";

/**
 * "الأرقام أوضح مما تظن."
 *
 * نفس منطق LanguageClosingCta: القسم يُغلق الدائرة مع الـHero (عنوان ضخم
 * + خط فاصل رأسي + فقرة)، بلا حركة إضافية، لأن الحركة استُنفدت أعلى
 * الصفحة. عنوان مركزي بصفته خلاصة لا افتتاحية. توهج الخلفية والّلمسة
 * اللونية هنا `visual-orange` بدل `visual-pink`، تماشيًا مع لون الرياضيات
 * الثابت في نظام الألوان.
 */

export function MathClosingCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            headingRef.current,
            dividerRef.current,
            bodyRef.current,
            buttonRef.current,
          ],
          { opacity: 1, y: 0, scaleY: 1 },
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          dividerRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.7,
            ease: "power2.out",
            transformOrigin: "top center",
          },
          "-=0.5",
        )
        .fromTo(
          bodyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative overflow-hidden bg-neutral-100 text-neutral-900"
    >
      {/* نفس توهج الـHero، من الأسفل هذه المرة — إشارة بصرية لنهاية الرحلة */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 100%, color-mix(in srgb, var(--color-visual-orange) 14%, transparent) 0%, transparent 55%)",
        }}
      />

      <SectionContainer>
        <div className="relative flex flex-col items-center pt-28 text-center lg:pt-40">
          <h2
            ref={headingRef}
            className="font-thmanyah-display font-medium text-[2.4rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[5rem] lg:leading-[1.05] tracking-tight max-w-4xl"
          >
            الأرقام <span className="text-visual-orange">أوضح مما تظن</span>
          </h2>

          <div
            ref={dividerRef}
            aria-hidden
            className="mt-10 h-12 w-px bg-neutral-900/15 lg:mt-14"
          />

          <div ref={bodyRef} className="mt-10 lg:mt-14">
            <p className="font-thmanyah-text text-body sm:text-lead leading-relaxed text-neutral-600 max-w-md mx-auto">
              ابدأ من حيث أنت، وابنِ الفهم خطوة بخطوة حتى تصل إلى المكان
              الذي تريده.
            </p>
          </div>
        </div>
        <div ref={buttonRef} className="mt-0">
          <CTAPanelSection
            backgroundImage="/backgrounds//bg-46.png"
            title="لا تعرف من أين تبدأ في الرياضيات؟ نحن هنا لنساعدك"
            description="اختيار المسار والمستوى المناسب قد لا يكون واضحًا دائمًا. إذا كنت بحاجة إلى مساعدة، فلا تتردد في التواصل معنا، وسنساعدك على اختيار ما يناسب أهدافك ومستواك."
            buttonHref={LINKS.support}
            buttonText="تواصل معنا"
            panelTone="dark"
            buttonVariant="orange-solid"
          />
        </div>
      </SectionContainer>
    </section>
  );
}

export default MathClosingCta;