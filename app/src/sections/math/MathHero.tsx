// MathHero.tsx — light mode
"use client";

import MathGlassBars from "@/app/src/components/3D/MathGlassBars";
import MarqueeStrip from "../../components/code/MarqueeStrip";

export default function MathHero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-neutral-0 text-neutral-900"
    >
      {/* Zemin: açık zeminde hafif orange glow, düz beyaz değil */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 85% 8%, color-mix(in srgb, var(--color-visual-orange) 14%, transparent) 0%, transparent 55%), linear-gradient(180deg, var(--color-neutral-0) 0%, color-mix(in srgb, var(--color-neutral-0) 92%, transparent) 60%, var(--color-neutral-0) 100%)",
          }}
        />
      </div>
      <MathGlassBars />

      <div className="relative z-10 min-h-[100dvh] lg:min-h-[92vh] flex flex-col">
        {/* Orta gövde: tek sütun, aşırı geniş başlık, ayraç çizgisiyle bölünmüş */}
        <div className="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-0">
          <h1 className="font-thmanyah-display font-medium text-[2.4rem] leading-[1.08] sm:text-5xl md:text-7xl lg:text-[6rem] lg:leading-[1.05] tracking-tight max-w-4xl">
            المسألة التي تخيفك اليوم، <span className="text-visual-orange">ستفهمها</span>{" "} غدًا.
          </h1>

          <div className="mt-10 lg:mt-14 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
            <div className="hidden lg:block w-px self-stretch bg-neutral-900/15" />

            <p className="font-thmanyah-text text-body sm:text-lead leading-relaxed text-neutral-600 max-w-md">
الرياضيات ليست مادة تنجح فيها. إنها طريقة تتعلم بها كيف تفكر.            </p>
          </div>
        </div>

        <MarqueeStrip
          items={["الجبر", "الهندسة", "التفاضل والتكامل", "الإحصاء", "الاحتمالات", "المعادلات", "نظرية الأعداد", "الهندسة التحليلية"]}
          accentVar="--color-visual-orange"
          bgVar="--color-neutral-900"
        />
      </div>
    </section>
  );
}