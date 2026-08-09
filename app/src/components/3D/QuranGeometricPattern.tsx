"use client";

// Rub el-Hizb tarzı sekiz köşeli yıldız (iki iç içe kare, 45° döndürülmüş)
// üzerine kurulu geometrik doku. Tüm renkler --color-visual-teal üzerinden
// color-mix() ile türetildi (raw hex yok), QuranGlassBars ile aynı token'a
// bağlı kalıyor ama "cam çubuk" yerine klasik İslami geometrik motif kullanıyor.
//
// Yapı:
//  - Arka planda ince çizgili, tekrarlayan küçük yıldız deseni (<pattern>)
//  - Üzerinde, asimetrik konumlanmış 2 büyük "vurgu" yıldızı (glow + yavaş
//    dönüş/nefes animasyonu) — kompozisyonun ortalanmasını engellemek için
//    kasıtlı olarak merkezden kaydırılmış (sağ üst / sol alt)

interface AccentStar {
  /** Konum, container'a göre yüzde. */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  rotate: number;
  opacityFrom: string;
  opacityTo: string;
  drift: string;
}

const ACCENTS: AccentStar[] = [
  {
    top: "-6%",
    right: "-4%",
    size: 420,
    rotate: 12,
    opacityFrom: "color-mix(in srgb, var(--color-visual-teal) 55%, transparent)",
    opacityTo: "color-mix(in srgb, var(--color-visual-teal) 20%, transparent)",
    drift: "breatheA 14s",
  },
  {
    bottom: "-10%",
    left: "4%",
    size: 300,
    rotate: -8,
    opacityFrom: "color-mix(in srgb, var(--color-visual-teal) 42%, transparent)",
    opacityTo: "color-mix(in srgb, var(--color-visual-teal) 14%, transparent)",
    drift: "breatheB 11s",
  },
  {
    top: "28%",
    left: "-6%",
    size: 160,
    rotate: 20,
    opacityFrom: "color-mix(in srgb, var(--color-visual-teal) 65%, transparent)",
    opacityTo: "color-mix(in srgb, var(--color-visual-teal) 28%, transparent)",
    drift: "breatheC 9s",
  },
];

/** İki iç içe kareden oluşan klasik sekiz köşeli yıldız path'i (50,50 merkezli, 100x100 viewBox). */
function EightPointStar({ id }: { id: string }) {
  return (
    <g id={id}>
      <rect x="26" y="26" width="48" height="48" />
      <rect x="26" y="26" width="48" height="48" transform="rotate(45 50 50)" />
    </g>
  );
}

export default function QuranGeometricPattern() {
  return (
    <div className="geo-pattern" aria-hidden="true">
      {/* Zemin: ince çizgili tekrarlayan yıldız deseni */}
      <svg className="tile-layer" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <pattern
            id="star-tile"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke="color-mix(in srgb, var(--color-visual-teal) 32%, transparent)"
              strokeWidth="1.4"
              transform="translate(10 10) scale(1)"
            >
              <EightPointStar id="tile-star" />
            </g>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#star-tile)" />
      </svg>

      {/* Vurgu: büyük, asimetrik konumlanmış yıldızlar */}
      {ACCENTS.map((a, i) => (
        <div
          key={i}
          className="accent"
          style={{
            top: a.top,
            bottom: a.bottom,
            left: a.left,
            right: a.right,
            width: a.size,
            height: a.size,
            animation: `${a.drift} ease-in-out infinite`,
            // @ts-expect-error — CSS custom properties for the keyframes below
            "--from": a.opacityFrom,
            "--to": a.opacityTo,
          }}
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <filter id={`glow-${i}`} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g
              filter={`url(#glow-${i})`}
              fill="var(--accent-fill)"
              stroke="color-mix(in srgb, var(--color-visual-teal) 80%, white)"
              strokeWidth="0.6"
              transform={`rotate(${a.rotate} 50 50)`}
            >
              <EightPointStar id={`accent-star-${i}`} />
            </g>
          </svg>
        </div>
      ))}

      <style jsx>{`
        .geo-pattern {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .tile-layer {
          position: absolute;
          inset: 0;
          opacity: 0.9;
        }
        .accent {
          position: absolute;
          --accent-fill: var(--from);
        }
        .accent svg g {
          fill: var(--accent-fill);
        }

        @keyframes breatheA {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
            --accent-fill: var(--from);
          }
          50% {
            transform: rotate(6deg) scale(1.06);
            --accent-fill: var(--to);
          }
        }
        @keyframes breatheB {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
            --accent-fill: var(--from);
          }
          50% {
            transform: rotate(-5deg) scale(1.08);
            --accent-fill: var(--to);
          }
        }
        @keyframes breatheC {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
            --accent-fill: var(--from);
          }
          50% {
            transform: rotate(10deg) scale(0.94);
            --accent-fill: var(--to);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .accent {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}