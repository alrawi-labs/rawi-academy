"use client";

import MarqueeStrip from "@/app/src/components/MarqueeStrip";
import Button from "@/app/src/components/ui/Button";
import QuranGlassBars from "@/app/src/components/3D/QuranGlassBars";
import QuranGeometricPattern from "@/app/src/components/3D/QuranGeometricPattern";
import AyahTicker from "../../components/quran/AyahTicker";

// İnce, tek çizgili yıldız motifi — köşe süsü değil, ayracın içinde duran bir mühür.
function QuranSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      <circle cx="0" cy="0" r="1.6" fill="var(--color-visual-teal)" />
      <polygon
        points="0,-38 10,-10 38,0 10,10 0,38 -10,10 -38,0 -10,-10"
        stroke="var(--color-visual-teal)"
        strokeWidth={0.75}
        strokeOpacity={0.8}
        fill="none"
      />
      <circle
        cx="0"
        cy="0"
        r="46"
        stroke="var(--color-visual-teal)"
        strokeWidth={0.5}
        strokeOpacity={0.3}
        fill="none"
      />
    </svg>
  );
}

export default function QuranHero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-neutral-900 text-neutral-0"
    >
      {/* Zemin: derin doku + çok hafif teal glow, düz foto değil */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 85% 8%, color-mix(in srgb, var(--color-visual-teal) 22%, transparent) 0%, transparent 55%), linear-gradient(180deg, var(--color-neutral-900) 0%, color-mix(in srgb, var(--color-neutral-900) 92%, transparent) 60%, var(--color-neutral-900) 100%)",
          }}
        />
      </div>
<QuranGlassBars />

      <div className="relative z-10 min-h-[100dvh] lg:min-h-[92vh] flex flex-col">
       
        {/* Orta gövde: tek sütun, aşırı geniş başlık, ayraç çizgisiyle bölünmüş */}
        <div className="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-0">
          <h1 className="font-thmanyah-display font-medium text-[2.4rem] leading-[1.08] sm:text-6xl md:text-7xl lg:text-[6rem] lg:leading-[1.05] tracking-tight max-w-4xl">
            رفيقك في تلاوة
            <br />
            <span className="text-visual-teal">القرآن</span> وحفظه
          </h1>

          <div className="mt-10 lg:mt-14 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
            <div className="hidden lg:block w-px self-stretch bg-white/15" />

            <p className="font-thmanyah-text text-body sm:text-lead leading-relaxed text-neutral-300 max-w-md">
              من أول آية تحفظها إلى ختمة كاملة، بمتابعة يومية ومراجعة منتظمة
              — بلا استعجال، خطوة تلو أخرى.
            </p>

            
          </div>
        </div>

      </div>

      <AyahTicker />  
    </section>
  );
}