"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "/ages_section/steps-1.png",
  "/ages_section/steps-2.png",
  "/ages_section/steps-3.png",
  "/ages_section/steps-4.png",
];

const STEP_DURATION = 2600;
const FADE_DURATION = 900;

export default function AgeCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [enteringIndex, setEnteringIndex] = useState<number | null>(null);

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>;

    const cycle = setInterval(() => {
      setActiveIndex((current) => {
        const upcoming = (current + 1) % STEPS.length;
        setEnteringIndex(upcoming);

        fadeTimer = setTimeout(() => {
          setEnteringIndex(null);
        }, FADE_DURATION);

        return current;
      });
    }, STEP_DURATION);

    return () => {
      clearInterval(cycle);
      clearTimeout(fadeTimer);
    };
  }, []);

  useEffect(() => {
    if (enteringIndex === null) return;
    const commit = setTimeout(() => {
      setActiveIndex(enteringIndex);
    }, FADE_DURATION);
    return () => clearTimeout(commit);
  }, [enteringIndex]);

  return (
    <div className="relative border border-neutral-200 rounded-lg overflow-hidden shadow-sm min-h-140 sm:min-h-150 lg:min-h-127.5">
      {/* Arka plan katmanı */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/backgrounds/bg-5.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Beyaz gradient katmanı — metin ve kartın okunabilirliği için */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-neutral-0) 12%, transparent) 0%, color-mix(in srgb, var(--color-neutral-0) 4%, transparent) 45%, color-mix(in srgb, var(--color-neutral-0) 30%, transparent) 100%)",
        }}
      />

      {/* İçerik sarmalayıcı: mobilde normal akış (block/flow),
          lg ve üzerinde orijinal absolute konumlandırmaya geçiş */}
      <div className="relative z-10 lg:absolute lg:inset-0">
        {/* Metin bloğu */}
        <div
          dir="rtl"
          className="px-5 py-8 sm:px-8 sm:py-10 lg:px-0 lg:py-0 lg:absolute lg:top-10 lg:left-10 max-w-full lg:max-w-105"
        >
          <h3 className="font-thmanyah-display font-bold text-[20px] sm:text-[24px] lg:text-h2-sm leading-[1.3] text-neutral-900 max-w-full">
            تعليم يناسب جميع الأعمار
          </h3>
          <p className="font-thmanyah-text text-caption sm:text-[14px] leading-6 sm:leading-7 text-neutral-700 mt-3 sm:mt-4 w-full lg:w-87.5">
            ليست كل العلوم سواء. بعض المعارف لا ترتبط بعمرٍ معين، بل ترافق
            الإنسان طوال حياته. لذلك ركّزنا على العلوم التي نؤمن بأثرها الحقيقي
            في بناء الفرد، منذ سنواته الأولى وحتى مراحل حياته المختلفة.
          </p>
        </div>

        {/* Adım animasyonu penceresi */}
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:p-0 lg:absolute lg:bottom-3 lg:right-3 w-full lg:w-150 max-w-full lg:max-w-none">
          {/* Sabit yükseklikli iç kutu — aspect-ratio yerine doğrudan yükseklik
              vererek pencerenin çökmesini engelliyor */}
          <div className="relative w-full h-65 sm:h-75 lg:h-75 rounded-lg overflow-hidden bg-neutral-0/45 backdrop-blur-sm border border-neutral-0/60 shadow-[0_35px_70px_-25px_rgba(20,16,40,0.3)]">
            <div className="flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-neutral-0/40 backdrop-blur-md border-b border-neutral-0/50 relative z-20">
              {/* macOS pencere düğmeleri — marka paletinden bağımsız, evrensel kırmızı/sarı/yeşil */}
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28C840]" />
            </div>

            <div className="relative w-full h-[calc(100%-42px)]">
              {STEPS.map((src, i) => {
                const isBase = i === activeIndex;
                const isEntering = i === enteringIndex;
                if (!isBase && !isEntering) return null;

                return (
                  <img
                    key={src}
                    src={src}
                    alt={`step-${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity"
                    style={{
                      opacity: 1,
                      transitionDuration: `${FADE_DURATION}ms`,
                      transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)",
                      zIndex: isEntering ? 2 : 1,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}