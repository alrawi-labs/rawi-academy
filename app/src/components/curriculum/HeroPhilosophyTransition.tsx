// components/curriculum/HeroPhilosophyTransition.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";
import HeroGlassRibbons from "../3D/HeroGlassRibbons";
import Button from "../ui/Button";
import { SUBJECTS } from "./SubjectCardStack";
import { LINKS } from "../../lib/links";

const PHILOSOPHY_STEPS = ["معرفة", "فهم", "تطبيق", "تقييم", "إتقان"];

const FAN = [
  { x: 0, y: 0, rotate: -2, scale: 1 },
  { x: 72, y: 26, rotate: 4, scale: 0.96 },
  { x: 138, y: 56, rotate: -5, scale: 0.92 },
  { x: 198, y: 88, rotate: 6, scale: 0.88 },
] as const;

const CARD_W = 300;
const GAP = 24;
const ROW = SUBJECTS.map((_, i) => ({
  x: -(i * (CARD_W + GAP)),
  y: 60,
  rotate: 0,
}));

export default function HeroPhilosophyTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=500",
          scrub: 0.3,
          pin: true,
          pinSpacing: true,
          // markers: true,
        },
      });

      // Philosophy topyekûn aşağıdan yukarı yükseliyor
      tl.fromTo(
        philosophyRef.current,
        { yPercent: 100 },
        { yPercent: 0, ease: "none" },
        0
      );

      // Kartlar fan'dan satıra dönüşüyor, aynı zaman aralığında
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        tl.fromTo(
          card,
          { x: FAN[i].x, y: FAN[i].y, rotate: FAN[i].rotate, scale: FAN[i].scale },
          { x: ROW[i].x, y: ROW[i].y, rotate: ROW[i].rotate, ease: "none" },
          0
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-screen overflow-hidden">
      {/* HERO KATMANI — sabit, arkada */}
      <section
        dir="rtl"
        className="absolute inset-0 z-0 bg-neutral-900 pt-[150px] overflow-hidden"
      >
        <HeroGlassRibbons />
        {/* mevcut dekoratif SVG aynen buraya */}

        <SectionContainer>
          <div className="relative md:min-h-120">
            <Reveal className="max-w-[760px] ms-auto me-0">
              <div className="inline-flex items-center gap-2.5 text-caption font-semibold tracking-[0.08em] text-primary-light mb-6 before:content-[''] before:w-[22px] before:h-px before:bg-primary-light">
                منهجنا
              </div>
              <h1 className="font-thmanyah-display font-bold text-hero leading-[1.35] text-neutral-0 mb-7 max-md:text-h2">
                من المعرفة إلى{" "}
                <span className="bg-gradient-aurora bg-clip-text text-transparent">
                  الإتقان
                </span>
                ، بخطواتٍ تعرف إلى أين تقودك.
              </h1>
              <p className="font-thmanyah-display font-bold text-lead max-w-[560px] text-neutral-200 max-md:text-body">
                في راوي، لا نبني الدروس لتُشاهَد ثم تُنسى، بل نصمم كل دورة لتأخذ
                المتعلم من بناء الأساس، إلى الفهم، ثم التطبيق، وصولًا إلى مهارة
                يستطيع استخدامها بثقة.
              </p>
              <Button href={LINKS.support} className="mt-10" variant="outline">
                تواصل معنا
              </Button>
            </Reveal>
          </div>
        </SectionContainer>
      </section>

      {/* KARTLAR — en üst katman, Philosophy'nin üzerinden geçer */}
      <div className="absolute top-[220px] right-[7%] z-50 h-[620px] w-[510px] max-md:hidden">
        {SUBJECTS.map((subject, i) => (
          <div
            key={subject.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-0 right-0 w-[300px] rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/15 overflow-hidden shadow-[0_40px_80px_-30px_rgba(9,9,11,0.5)]"
            style={{ zIndex: 40 - i * 10 }}
          >
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 30%, transparent 55%)",
              }}
            />
            <div className="relative h-[400px] w-full overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(closest-side, color-mix(in srgb, ${subject.color} 20%, transparent), transparent 75%)`,
                }}
              />
              <Image
                src={subject.photo}
                alt={subject.title}
                fill
                className="object-contain object-bottom opacity-90 mix-blend-overlay"
                sizes="280px"
              />
            </div>
            <div className="relative px-7 pb-7 pt-2 bg-neutral-0">
              <span
                className="block w-8 h-px mb-3"
                style={{ backgroundColor: subject.color }}
              />
              <p className="font-thmanyah-display text-h3 text-neutral-900 leading-tight">
                {subject.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* PHILOSOPHY KATMANI — aşağıdan yükselir */}
      <section
        ref={philosophyRef}
        dir="rtl"
        className="absolute inset-0 z-10 bg-neutral-100 py-[90px] translate-y-full"
      >
        <SectionContainer>
          <div className="grid grid-cols-[1.1fr_.9fr] gap-[70px] items-center max-md:grid-cols-1 max-md:gap-10">
            <div>
              <h2 className="font-thmanyah-display text-h2 leading-[1.5] text-neutral-900 mb-5 max-md:text-h2-sm">
                التعلّم عندنا رحلة، لا مجموعة دروس.
              </h2>
              <p className="text-body max-w-[460px] text-neutral-700">
                نؤمن أن التعلم الحقيقي لا يحدث بمجرد إنهاء الدروس، بل عندما
                تتحول المعرفة إلى فهم، والفهم إلى ممارسة، والممارسة إلى مهارة
                يمكن الاعتماد عليها.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 items-end max-md:items-start">
              {PHILOSOPHY_STEPS.map((step, i) => {
                const sizes = [
                  "text-h3-sm text-neutral-300",
                  "text-h3 text-neutral-300 me-[26px] max-md:me-0",
                  "text-h2-sm text-neutral-300 me-[52px] max-md:me-0",
                  "text-h2 text-neutral-300 me-[78px] max-md:me-0",
                  "text-hero text-primary font-bold me-[104px] max-md:me-0",
                ];
                return (
                  <div
                    key={step}
                    className={`font-thmanyah-display flex items-center gap-3.5 ${sizes[i]}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {step}
                  </div>
                );
              })}
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}