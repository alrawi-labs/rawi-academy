// LanguagesHero.tsx — light mode
"use client";

import LanguageGlassBars from "@/app/src/components/3D/LanguageGlassBars";
import MarqueeStrip from "../../components/code/MarqueeStrip";

export default function LanguagesHero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-neutral-0 text-neutral-900"
    >
      {/* Zemin: açık zeminde hafif pink glow, düz beyaz değil */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 85% 8%, color-mix(in srgb, var(--color-visual-pink) 14%, transparent) 0%, transparent 55%), linear-gradient(180deg, var(--color-neutral-0) 0%, color-mix(in srgb, var(--color-neutral-0) 92%, transparent) 60%, var(--color-neutral-0) 100%)",
          }}
        />
      </div>
      <LanguageGlassBars />

      <div className="relative z-10 min-h-[100dvh] lg:min-h-[92vh] flex flex-col">
        {/* Orta gövde: tek sütun, aşırı geniş başlık, ayraç çizgisiyle bölünmüş */}
        <div className="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-0">
          <h1 className="font-thmanyah-display font-medium text-[2.4rem] leading-[1.08] sm:text-5xl md:text-7xl lg:text-[6rem] lg:leading-[1.05] tracking-tight max-w-4xl">
            كل لغة تتعلمها <span className="text-visual-pink">تفتح لك بابًا</span>{" "}
           لفرص لا تحصى
          </h1>

          <div className="mt-10 lg:mt-14 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
            <div className="hidden lg:block w-px self-stretch bg-neutral-900/15" />

            <p className="font-thmanyah-text text-body sm:text-lead leading-relaxed text-neutral-600 max-w-md">
              تعلّم اللغة لم يعد اختيارًا ثانويًا. إنها القدرة على التواصل، والوصول إلى فرص جديدة، وفهم ثقافات أخرى، وفتح أبواب لم تكن لتُفتح بلغتك وحدها.
            </p>
          </div>
        </div>

        <MarqueeStrip
          items={["الإنجليزية", "التركية", "الفرنسية", "الألمانية", "الإسبانية", "الصينية", "اليابانية", "الروسية"]}
          accentVar="--color-visual-pink"
          bgVar="--color-neutral-900"
        />
      </div>
    </section>
  );
}