"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Button from "@/app/src/components/ui/Button";
import { UltraPremiumGradientBar } from "../../components/3D/UltraPremiumGradientBar";

/**
 * لا ثلاث بطاقات عائمة. سطح تفاعل واحد ("بيئة التعلّم") يقصّه الإطار من
 * الأعلى ليوحي بامتداده خارج الرؤية، ويعبره خط سير رأسي واحد (البداية →
 * التعلّم → التطبيق → التقدّم) تتصل به شظايا الحالة الثلاث فعليًا عبر
 * موصلات صغيرة — لا سهم عام ولا Timeline قياسي. المعادلة محتوى تعلّمي
 * حقيقي داخل حالة الدرس، لا زخرفة عائمة. على الموبايل تُعاد صياغة نفس
 * المشهد عموديًا بدل التكديس الحرفي للبطاقات.
 */

const TRAJECTORY_STAGES = [
  { key: "start", label: "البداية", position: 8 },
  { key: "learn", label: "التعلّم", position: 34 },
  { key: "practice", label: "التطبيق", position: 62 },
  { key: "progress", label: "التقدّم", position: 90 },
] as const;

function HeroCopy({
  headingRef,
  bodyRef,
}: {
  headingRef: RefObject<HTMLHeadingElement>;
  bodyRef: RefObject<HTMLDivElement>;
}) {
  return (
    <>
      <span className="text-micro tracking-[0.2em] text-primary">كيف تعمل راوي</span>
      <h1
        ref={headingRef}
        className="mt-4 font-thmanyah-display text-[2.6rem] leading-[1.08] tracking-tight text-neutral-900 sm:text-6xl lg:text-[4.2rem]"
      >
        كيف تعمل راوي؟
      </h1>

      <div ref={bodyRef} className="mt-8 max-w-md space-y-4">
        <p className="font-thmanyah-text text-lead text-neutral-700">
          من أول خطوة... إلى أن يصبح ما تتعلمه جزءًا منك.
        </p>
        <p className="font-thmanyah-text text-body leading-relaxed text-neutral-500">
          صممنا راوي حول رحلة واحدة واضحة: أن تعرف أين تبدأ، ماذا تتعلم، لماذا
          تتعلمه، وكيف تعرف أنك تتقدم.
        </p>
      </div>
    </>
  );
}

function HeroActions() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <Button variant="primary" size="md" href="/paths">
        ابدأ رحلتك
      </Button>
      <Button variant="primary" size="md" href="/paths">
        استكشف المسارات
      </Button>
    </div>
  );
}

/** الخط الرأسي الذي يعبر البيئة ويحمل معنى المراحل الأربع — العمود
 *  الفقري الذي يجعل الشظايا نظامًا واحدًا لا بطاقات متناثرة. */
function LearningTrajectory() {
  return (
    <div className="hero-anchor pointer-events-none absolute right-[38%] top-[6%] bottom-[6%] w-px" data-depth="3">
      <div className="absolute inset-0 bg-neutral-200" />
      <div className="hero-rail-fill absolute inset-x-0 top-0 origin-top bg-primary" style={{ height: "62%" }} />

      {TRAJECTORY_STAGES.map((stage, i) => {
        const passed = i <= 1;
        return (
          <div
            key={stage.key}
            className="hero-node absolute right-1/2 flex translate-x-1/2 items-center gap-2"
            style={{ top: `${stage.position}%` }}
          >
            <span
              className={
                passed
                  ? "h-[7px] w-[7px] rounded-full bg-primary"
                  : "h-[7px] w-[7px] rounded-full border border-neutral-300 bg-neutral-0"
              }
            />
            <span
              dir="rtl"
              className={`translate-x-[calc(100%+10px)] whitespace-nowrap text-micro ${
                passed ? "text-neutral-600" : "text-neutral-400"
              }`}
            >
              {stage.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** موصل بصري قصير يربط شظية بخط السير — يجعل الاتصال فعليًا لا إيحائيًا. */
function RailConnector({ side, top }: { side: "right" | "left"; top: string }) {
  return (
    <span
      className={`hero-connector absolute h-px w-6 bg-neutral-200 ${side === "right" ? "right-[38%]" : "left-[24%]"}`}
      style={{ top }}
    />
  );
}

function LessonState() {
  return (
    <div
      data-depth="16"
      className="hero-fragment absolute right-0 top-0 w-[64%] border border-neutral-200 bg-neutral-0 p-5 shadow-[0_24px_50px_-32px_rgba(20,16,40,0.4)]"
    >
      <div className="flex items-start justify-between">
        <span className="text-micro text-neutral-400">الدرس الحالي</span>
        <span dir="ltr" className="text-micro text-neutral-300">٠٧ / ١٤</span>
      </div>

      <p className="mt-3 font-thmanyah-display text-h3-sm leading-snug text-neutral-900">
        حل المعادلات من الدرجة الثانية
      </p>

      <div className="mt-4 border-y border-neutral-100 py-3">
        <span dir="ltr" className="font-thmanyah-text text-body text-neutral-700">
          x² − 5x + 6 = 0
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
          <div className="h-full w-[68%] rounded-full bg-primary" />
        </div>
        <span className="text-micro text-neutral-400">٦٨٪</span>
      </div>

      <span className="mt-3 block text-micro text-neutral-300">آخر نشاط · قبل ٣ دقائق</span>
    </div>
  );
}

function LearningPathState() {
  return (
    <div
      data-depth="12"
      className="hero-fragment absolute left-0 top-[40%] w-[54%] rounded-sm border border-neutral-200 bg-neutral-0 p-4"
    >
      <span className="text-micro text-neutral-400">المسار</span>
      <p className="mt-1 font-thmanyah-text text-caption text-neutral-700">
        الرياضيات — من الأساس إلى الإتقان
      </p>

      <div className="mt-3 flex items-center gap-1.5">
        {[1, 1, 1, 0, 0].map((filled, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full ${filled ? "bg-primary" : "bg-neutral-100"}`}
          />
        ))}
      </div>
      <span className="mt-2 block text-micro text-neutral-300">٣ من ٥ وحدات</span>
    </div>
  );
}

function ProgressState() {
  return (
    <div
      data-depth="18"
      className="hero-fragment absolute bottom-0 right-[16%] w-[46%] border border-neutral-200 bg-neutral-0 px-4 py-3"
    >
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0 -rotate-90">
          <circle cx="16" cy="16" r="13" fill="none" stroke="var(--color-neutral-100)" strokeWidth="3" />
          <circle
            cx="16"
            cy="16"
            r="13"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="81.7"
            strokeDashoffset="20.4"
          />
        </svg>
        <div>
          <p className="font-thmanyah-text text-caption text-neutral-700">
            أنجزت ١٢ تمرينًا هذا الأسبوع
          </p>
          <span className="text-micro text-neutral-300">مستوى متوسط</span>
        </div>
      </div>
    </div>
  );
}

function LearningSystemVisual() {
  return (
    <div className="relative">
      {/* المشهد العمودي — موبايل وتابلت صغيرة */}
      <div className="lg:hidden">
        <div className="relative border-r border-neutral-200 pr-6">
          <div className="hero-fragment border border-neutral-200 bg-neutral-0 p-5">
            <div className="flex items-start justify-between">
              <span className="text-micro text-neutral-400">الدرس الحالي</span>
              <span dir="ltr" className="text-micro text-neutral-300">٠٧ / ١٤</span>
            </div>
            <p className="mt-3 font-thmanyah-display text-h3-sm leading-snug text-neutral-900">
              حل المعادلات من الدرجة الثانية
            </p>
            <div className="mt-4 border-y border-neutral-100 py-3">
              <span dir="ltr" className="font-thmanyah-text text-body text-neutral-700">
                x² − 5x + 6 = 0
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full w-[68%] rounded-full bg-primary" />
              </div>
              <span className="text-micro text-neutral-400">٦٨٪</span>
            </div>
          </div>

          <div className="hero-fragment mt-6 rounded-sm border border-neutral-200 bg-neutral-0 p-4">
            <span className="text-micro text-neutral-400">المسار</span>
            <p className="mt-1 font-thmanyah-text text-caption text-neutral-700">
              الرياضيات — من الأساس إلى الإتقان
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              {[1, 1, 1, 0, 0].map((filled, i) => (
                <span key={i} className={`h-1 flex-1 rounded-full ${filled ? "bg-primary" : "bg-neutral-100"}`} />
              ))}
            </div>
          </div>

          <div className="hero-fragment mt-6 border border-neutral-200 bg-neutral-0 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 text-micro text-primary">
                ١٢
              </span>
              <p className="font-thmanyah-text text-caption text-neutral-700">
                أنجزت ١٢ تمرينًا هذا الأسبوع
              </p>
            </div>
          </div>

          {/* عقد المراحل تلاصق الخط الفاصل على اليمين */}
          <div className="pointer-events-none absolute -right-[1px] top-0 bottom-0">
            {TRAJECTORY_STAGES.map((stage, i) => (
              <span
                key={stage.key}
                className={`absolute right-0 h-[7px] w-[7px] translate-x-1/2 rounded-full ${
                  i <= 1 ? "bg-primary" : "border border-neutral-300 bg-neutral-0"
                }`}
                style={{ top: `${stage.position}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* التركيبة الرئيسية — لوحة واحدة، ديسكتوب وتابلت */}
      <div className="hero-desktop-scene relative mx-auto hidden aspect-[3/4] w-full max-w-lg overflow-hidden lg:block">
        <div
          className="hero-scene-frame absolute top-0 bottom-0 left-0 -right-8 border border-neutral-200 bg-neutral-0"
          data-depth="6"
        >
          <span dir="ltr" className="absolute right-4 top-3 text-micro text-neutral-300">٠٤</span>
        </div>

        <LearningTrajectory />
        <RailConnector side="right" top="14%" />
        <RailConnector side="left" top="46%" />

        <LessonState />
        <LearningPathState />
        <ProgressState />
      </div>
    </div>
  );
}

export function HowItWorksHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const targets = [
        headingRef.current,
        bodyRef.current,
        ".hero-scene-frame",
        ".hero-anchor",
        ".hero-node",
        ".hero-connector",
        ".hero-fragment",
        ".hero-rail-fill",
      ];

      if (prefersReducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0, scaleY: 1, scaleX: 1 });
        return;
      }

      gsap.set(".hero-rail-fill", { scaleY: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(headingRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(bodyRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(
          ".hero-scene-frame",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.5",
        )
        .fromTo(
          ".hero-anchor",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".hero-connector",
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.4, stagger: 0.08 },
          "-=0.3",
        )
        .fromTo(
          ".hero-fragment",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 },
          "-=0.3",
        )
        .to(".hero-rail-fill", { scaleY: 1, duration: 0.9, ease: "power2.inOut" }, "-=0.5")
        .fromTo(
          ".hero-node",
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, stagger: 0.1, ease: "back.out(1.6)" },
          "-=0.7",
        );
    }, sectionRef);

    // فيزيائية خفيفة جدًا: طبقات العمق تتحرك بمقدار ضئيل مع المؤشر
    let cleanupPointer = () => {};
    if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
      const scene = visualRef.current?.querySelector<HTMLElement>(".hero-desktop-scene");
      const layers = scene
        ? Array.from(scene.querySelectorAll<HTMLElement>("[data-depth]"))
        : [];
      const movers = layers.map((el) =>
        gsap.quickTo(el, "x", { duration: 0.6, ease: "power2.out" }),
      );
      const moversY = layers.map((el) =>
        gsap.quickTo(el, "y", { duration: 0.6, ease: "power2.out" }),
      );

      const handleMove = (e: MouseEvent) => {
        const bounds = sectionRef.current?.getBoundingClientRect();
        if (!bounds) return;
        const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
        const relY = (e.clientY - bounds.top) / bounds.height - 0.5;
        layers.forEach((el, i) => {
          const depth = Number(el.dataset.depth ?? 0);
          movers[i](relX * depth);
          moversY[i](relY * depth * 0.6);
        });
      };

      window.addEventListener("mousemove", handleMove);
      cleanupPointer = () => window.removeEventListener("mousemove", handleMove);
    }

    return () => {
      ctx.revert();
      cleanupPointer();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative overflow-hidden bg-neutral-0 pt-20 pb-28 lg:pt-28 lg:pb-40"
    >
      <UltraPremiumGradientBar offsetY={250} />
      <SectionContainer>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <HeroCopy headingRef={headingRef} bodyRef={bodyRef} />
            <HeroActions />
          </div>

          <div ref={visualRef} className="lg:col-span-6">
            <LearningSystemVisual />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default HowItWorksHero;