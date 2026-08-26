"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { useJourneyScrollProgress } from "@/app/src/components/how-it-works/three/useJourneyScrollProgress";
import { LearningJourneyMobileFallback } from "@/app/src/components/how-it-works/three/LearningJourneyMobileFallback";

// الـCanvas يُحمَّل على العميل فقط — three.js يحتاج window، ولا داعي لحمل
// وزنه في الحزمة الأولى (lazy loading).
const LearningJourneyCanvas = dynamic(
  () => import("@/app/src/components/how-it-works/three/LearningJourneyCanvas").then((m) => m.LearningJourneyCanvas),
  { ssr: false },
);

const CAPTIONS = [
  { title: "تبدأ من حيث أنت", body: "راوي تساعدك على اختيار المسار والمستوى المناسبين لك." },
  { title: "كل درس له هدف واضح", body: "تعرف دائمًا لماذا تتعلم هذه الفكرة تحديدًا." },
  { title: "بعد الفهم، يأتي التطبيق", body: "كل فكرة تتحول إلى فرصة تجربها بنفسك." },
  { title: "تختبر نفسك لتتأكد أنك فهمت", body: "لا انتقال إلى الفكرة التالية دون تأكّد حقيقي." },
  { title: "تعرف دائمًا أين وصلت", body: "رؤية واضحة لتقدّمك في كل مرحلة." },
  { title: "كل خطوة تبقى جزءًا من رحلتك", body: "حتى تتحول إلى معرفة تستطيع الاعتماد عليها." },
];

const STAGE_COUNT = CAPTIONS.length;

export function LearningJourneySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { progressRef, activeStage } = useJourneyScrollProgress(containerRef, STAGE_COUNT);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 1023px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMobile = () => setIsMobile(mq.matches);
    const updateMotion = () => setReducedMotion(motionMq.matches);
    updateMobile();
    updateMotion();
    mq.addEventListener("change", updateMobile);
    motionMq.addEventListener("change", updateMotion);
    return () => {
      mq.removeEventListener("change", updateMobile);
      motionMq.removeEventListener("change", updateMotion);
    };
  }, []);

  const showCanvas = mounted && !isMobile && !reducedMotion;

  // على الموبايل أو مع تقليل الحركة: تكوين ثابت بلا تثبيت طويل للتمرير
  if (mounted && (isMobile || reducedMotion)) {
    return (
      <section dir="rtl" className="bg-neutral-0 py-24">
        <SectionContainer>
          <div className="max-w-lg">
            <span className="text-micro tracking-[0.2em] text-primary">رحلة التعلّم</span>
            <h2 className="mt-3 font-thmanyah-display text-h2 text-neutral-900">
              من أول خطوة، إلى أن تصبح جزءًا منك
            </h2>
          </div>
          <div className="mt-14">
            <LearningJourneyMobileFallback />
          </div>
        </SectionContainer>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      dir="rtl"
      // ارتفاع الحاوية = عدد المراحل × ارتفاع الشاشة، حتى يملك المستخدم
      // مسافة تمرير كافية ليعيش الرحلة الكاملة قبل تحرّر التثبيت
      style={{ height: `${STAGE_COUNT * 100}vh` }}
      className="relative bg-neutral-0"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {showCanvas && <LearningJourneyCanvas progressRef={progressRef} reducedMotion={false} />}

        {/* تدرّج سفلي خفيف لضمان قراءة النص فوق المشهد */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--color-neutral-0) 85%, transparent) 100%)",
          }}
        />

        <div className="relative flex h-full items-end pb-16 lg:pb-24">
          <SectionContainer>
            <div className="max-w-md">
              <span className="text-micro tracking-[0.2em] text-primary">
                {`٠${activeStage + 1} / ٠${STAGE_COUNT}`}
              </span>
              <h2 className="mt-3 font-thmanyah-display text-h2 text-neutral-900">
                {CAPTIONS[activeStage].title}
              </h2>
              <p className="mt-3 font-thmanyah-text text-body text-neutral-600">
                {CAPTIONS[activeStage].body}
              </p>
            </div>
          </SectionContainer>
        </div>
      </div>
    </section>
  );
}

export default LearningJourneySection;