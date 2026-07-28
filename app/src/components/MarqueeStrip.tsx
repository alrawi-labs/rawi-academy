"use client";

const SENTENCES = [
  "أعظم استثمار... هو ما تزرعه في عقول أبنائك",
  "ابنِ اليوم ما سيفتخر به أبناؤك غدًا",
  "امنح أبناءك بداية تستحق أن تكبر معهم",
];

export default function MarqueeStrip() {
  // 3 cümleyi 1 kez daha kopyalayarak 6 cümlelik "base" grubunu oluşturuyoruz.
  // Bu, her bir şeridin ekranı kaplayacak kadar uzun olmasını sağlar ama Safari'yi bozacak kadar devasa olmaz.
  const base = [...SENTENCES, ...SENTENCES];

  return (
    <section className="relative z-10 border-t border-[var(--border-color)] overflow-hidden">
      <span className="sr-only">{SENTENCES.join(" — ")}</span>

      <div className="marquee-mask py-10" aria-hidden="true">
        {/* İki şeridi (track) yan yana tutan ana kapsayıcı */}
        <div className="flex w-full" dir="ltr">
          
          {/* 1. ŞERİT (TRACK) */}
          <div className="marquee-track flex items-center shrink-0 w-max">
            {base.map((sentence, i) => (
              <div key={`track1-${i}`} className="flex items-center gap-14 shrink-0 px-7">
                <span className="font-thmanyah-display font-semibold text-h3 md:text-h2-sm leading-none text-neutral-900 whitespace-nowrap">
                  {sentence}
                </span>
                <span className="w-2 h-2 rounded-full bg-accent-teal shrink-0" />
              </div>
            ))}
          </div>

          {/* 2. ŞERİT (KOPYA) - Birinci şerit sağa kaydıkça soldan ekranı bu dolduracak */}
          <div className="marquee-track flex items-center shrink-0 w-max">
            {base.map((sentence, i) => (
              <div key={`track2-${i}`} className="flex items-center gap-14 shrink-0 px-7">
                <span className="font-thmanyah-display font-semibold text-h3 md:text-h2-sm leading-none text-neutral-900 whitespace-nowrap">
                  {sentence}
                </span>
                <span className="w-2 h-2 rounded-full bg-accent-teal shrink-0" />
              </div>
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        .marquee-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .marquee-track {
          /* DİKKAT: Artık -50% değil -100% kaydırıyoruz */
          animation: marqueeLTR 55s linear infinite;
        }

        @keyframes marqueeLTR {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}