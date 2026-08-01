"use client";

import { ArrowLeft } from "lucide-react";

/**
 * Kimlik korunuyor: #0B0B14 / #4B4560 / #09090B paleti, font-thmanyah-*,
 * ok ikonlu CTA. Kart dili, eklediğin AIModelsCard koduyla aynı tarifi
 * izliyor: beyaz zemin + ince gri kenarlık + rounded-lg + shadow-sm,
 * sabit yükseklikli görsel alan, cam (glass) rozet.
 * Yeni: dış kapsayıcı artık tam genişlik değil, kart genişliğinde (max-w-3xl);
 * arka plan fotoğrafı y ekseninde (yatay, scaleX) aynalandı, metin aynalanmadı.
 */
export default function WorthLearningHero() {
  return (
    <div className="relative w-full bg-white border border-[#E4E7ED] rounded-lg overflow-hidden shadow-sm max-w-3xl mx-auto">
      <div className="w-full relative h-[420px] overflow-hidden">
        {/* Arka plan fotoğrafı — yalnızca bu katman y ekseninde (yatay) aynalanıyor */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/backgrounds/bg-10.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scaleX(-1)",
          }}
        />

        {/* Sağdan sola yumuşak beyaz geçiş — metnin okunurluğu için */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.32) 38%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0) 75%)",
          }}
        />

        <div
          dir="rtl"
          className="relative z-10 flex h-full max-w-md flex-col justify-center px-8 py-10 sm:px-10"
        >
          {/* Cam rozet — eklediğin koddaki backdrop-blur/border tarifiyle aynı */}
          <div className="reveal reveal-1 mb-6 inline-flex w-fit items-center gap-2 self-end rounded-full border border-white/60 bg-white/45 px-4 py-1.5 shadow-sm backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0B0B14]/50" />
            <span className="font-thmanyah-text text-[12px] font-medium text-[#3F3F52]">
              تأمّل
            </span>
          </div>

          <h2 className="reveal reveal-2 font-thmanyah-display text-right text-[26px] font-semibold leading-[1.5] tracking-tight text-[#0B0B14] sm:text-[30px]">
            ليس كل ما يُدرَّس يستحق أن يُتعلَّم.
          </h2>

          <p className="reveal reveal-3 font-thmanyah-text mt-5 max-w-sm text-right text-[15px] leading-[1.9] text-[#4B4560]">
            كل معرفةٍ تتعلّمها تمنحها جزءًا من عمرك، فاختر ما يستحق أن تمنحه
            سنواتك.
          </p>

          <button
            type="button"
            className="reveal reveal-4 group mt-8 inline-flex w-fit items-center gap-2.5 self-end rounded-full bg-[#09090B] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#1A1A1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09090B] focus-visible:ring-offset-2"
          >
            ابدأ بما يستحق
            <ArrowLeft
              size={15}
              className="motion-safe:transition-transform motion-safe:group-hover:-translate-x-0.5"
            />
          </button>
        </div>
      </div>

      <style jsx>{`
        .reveal {
          opacity: 0;
          animation: rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .reveal-1 {
          animation-delay: 0.05s;
        }
        .reveal-2 {
          animation-delay: 0.15s;
        }
        .reveal-3 {
          animation-delay: 0.3s;
        }
        .reveal-4 {
          animation-delay: 0.45s;
        }
        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}