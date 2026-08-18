"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { SectionLede } from "@/app/src/components/layout/SectionLede";
import { instructors, type Instructor } from "@/app/src/data/instructors";

/**
 * "الأشخاص الذين سيرافقونك في رحلة اللغة."
 *
 * الإمضاء البصري: بطاقات صور بورتريه بنسبة ٤:٥ (قصّة تحريرية لا مربّعة)،
 * بلا أي تغشية أو رزنامة أيقونات — فقط خط وردي قصير (٢px) كإمضاء بصري
 * صامت فوق الاسم بدل شارة دائرية. الاسم بخط العرض الكبير، اللقب بلون
 * العلامة بتباعد حروف واسع، والسيرة سطر واحد فقط أسفل. تعويض هادئ عن
 * البطاقة الثانية والرابعة بإزاحة رأسية خفيفة (`lg:mt-10`) يكسر الشبكة
 * المنتظمة دون اللجوء لأحجام أعمدة متفاوتة. تكبير خفيف للصورة عند
 * الـhover هو اللمسة التفاعلية الوحيدة — قياسي في صفحات الفرق التحريرية
 * الفاخرة.
 */

const LANGUAGE_INSTRUCTOR_IDS = [
  "aysha-yilmaz",
  "murat-kaya",
  "rana-khalil",
  "ibrahim-demirtas",
];

const languageInstructors: Instructor[] = LANGUAGE_INSTRUCTOR_IDS.map(
  (id) => instructors.find((instructor) => instructor.id === id),
).filter((instructor): instructor is Instructor => Boolean(instructor));

export function LanguageInstructorsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ledeRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(ledeRef.current, { opacity: 1, y: 0 });
        gsap.set(cardRefs.current, { opacity: 1, y: 0 });
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
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
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
      className="relative bg-neutral-100 py-28 lg:py-40"
    >
      <SectionContainer>
        <div ref={ledeRef}>
          <SectionLede
            lead="الأشخاص الذين سيرافقونك في رحلة اللغة."
            body="أربعة معلمين، كل واحد منهم اختير لأسلوبه في التوصيل لا لشهادته فقط."
          />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {languageInstructors.map((instructor, i) => (
            <div
              key={instructor.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`group ${i % 2 === 1 ? "lg:mt-10" : ""}`}
            >
              <div className="relative overflow-hidden rounded-lg">
                <div
                  className="aspect-[4/5] w-full bg-neutral-200 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url(${instructor.avatar})` }}
                />
              </div>

              <div className="mt-5 text-right">
                <span aria-hidden className="bg-visual-pink inline-block h-[2px] w-6" />
                <h3 className="font-thmanyah-display text-h3-sm text-neutral-900 mt-3">
                  {instructor.name}
                </h3>
                <p className="font-thmanyah-text text-visual-pink text-caption mt-1 tracking-[0.08em]">
                  {instructor.title}
                </p>
                <p className="font-thmanyah-text text-body text-neutral-600 mt-2 leading-relaxed">
                  {instructor.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export default LanguageInstructorsSection;