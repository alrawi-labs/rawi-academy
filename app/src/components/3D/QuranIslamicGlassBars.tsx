"use client";

// QuranGlassBars ile aynı "diagonal cam çubuk" iskeleti + hareket mantığı,
// ama her çubuğun içi düz cam yerine tekrarlayan bir İslami yıldız/kafes
// (khatam / girih tarzı) deseniyle dolduruluyor. Yani çubuk siluet olarak
// aynı kalıyor (konum, boy, dönüş, sürüklenme animasyonu), sadece dokusu
// "cam" yerine "geometrik motif" oluyor. Tüm renkler yine tek token'dan
// (--color-visual-teal) color-mix() ile türetildi — raw hex yok.

interface BarConfig {
  left: string;
  /** Zemin cam tonu (alt katman, az opak — camsı derinlik hissi için). */
  tintFrom: string;
  tintTo: string;
  /** Desendeki çizgi/motif rengi. */
  pattern: string;
  glow: string;
  drift: string;
  /** Desenin çubuk boyunca tekrar boyu (px) — çubuklar arası ritim farkı için. */
  tileSize: number;
}

const BARS: BarConfig[] = [
  {
    left: "2%",
    tintFrom: "color-mix(in srgb, var(--color-visual-teal) 30%, white)",
    tintTo: "color-mix(in srgb, var(--color-visual-teal) 15%, white)",
    pattern: "color-mix(in srgb, var(--color-visual-teal) 90%, black)",
    glow: "color-mix(in srgb, var(--color-visual-teal) 70%, transparent)",
    drift: "driftA 10s",
    tileSize: 46,
  },
  {
    left: "10%",
    tintFrom: "color-mix(in srgb, var(--color-visual-teal) 42%, white)",
    tintTo: "color-mix(in srgb, var(--color-visual-teal) 20%, white)",
    pattern: "color-mix(in srgb, var(--color-visual-teal) 100%, black 10%)",
    glow: "color-mix(in srgb, var(--color-visual-teal) 65%, transparent)",
    drift: "driftB 9s",
    tileSize: 38,
  },
  {
    left: "18%",
    tintFrom: "color-mix(in srgb, var(--color-visual-teal) 22%, white)",
    tintTo: "color-mix(in srgb, var(--color-visual-teal) 10%, white)",
    pattern: "color-mix(in srgb, var(--color-visual-teal) 75%, black)",
    glow: "color-mix(in srgb, var(--color-visual-teal) 48%, transparent)",
    drift: "driftC 12s",
    tileSize: 54,
  },
  {
    left: "26%",
    tintFrom: "color-mix(in srgb, var(--color-visual-teal) 30%, black)",
    tintTo: "color-mix(in srgb, var(--color-visual-teal) 45%, black)",
    pattern: "color-mix(in srgb, var(--color-visual-teal) 70%, white)",
    glow: "color-mix(in srgb, var(--color-visual-teal) 50%, transparent)",
    drift: "driftD 11s",
    tileSize: 42,
  },
];

/** İki iç içe, 45° döndürülmüş kareden oluşan klasik sekiz köşeli yıldız — çizgi (stroke) olarak. */
function StarMotif() {
  return (
    <g fill="none" strokeWidth="1.6">
      <rect x="12" y="12" width="26" height="26" />
      <rect x="12" y="12" width="26" height="26" transform="rotate(45 25 25)" />
    </g>
  );
}

export default function QuranIslamicGlassBars() {
  return (
    <div className="glass-bars" aria-hidden="true">
      {BARS.map((bar, i) => {
        const patternId = `islamic-tile-${i}`;
        return (
          <div
            key={i}
            className="bar"
            style={{
              left: bar.left,
              boxShadow: `0 50px 90px -25px ${bar.glow}`,
              animation: `${bar.drift} ease-in-out infinite`,
            }}
          >
            {/* Zemin: camsı ton geçişi */}
            <div
              className="bar-tint"
              style={{
                background: `linear-gradient(180deg, ${bar.tintFrom}, ${bar.tintTo})`,
              }}
            />

            {/* Desen: tekrarlayan sekiz köşeli yıldız kafesi */}
            <svg className="bar-pattern" width="100%" height="100%" preserveAspectRatio="none">
              <defs>
                <pattern
                  id={patternId}
                  x="0"
                  y="0"
                  width={bar.tileSize}
                  height={bar.tileSize}
                  patternUnits="userSpaceOnUse"
                  viewBox="0 0 50 50"
                >
                  <g stroke={bar.pattern} opacity="0.55">
                    <StarMotif />
                  </g>
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>

            {/* Cam parıltısı ve iç gölge — aynı QuranGlassBars camsı hissi */}
            <div className="bar-glare" />
            <div className="bar-inset" />
          </div>
        );
      })}

      <style jsx>{`
        .glass-bars {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .bar {
          position: absolute;
          width: 230px;
          height: 180%;
          top: -40%;
          border-radius: 120px;
          overflow: hidden;
          backdrop-filter: blur(14px) saturate(240%);
          -webkit-backdrop-filter: blur(14px) saturate(240%);
          border: 1px solid rgba(255, 255, 255, 0.55);
          transform: rotate(-36deg);
        }
        .bar-tint {
          position: absolute;
          inset: 0;
        }
        .bar-pattern {
          position: absolute;
          inset: 0;
        }
        .bar-glare {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 18%,
            rgba(255, 255, 255, 0.06) 34%,
            rgba(255, 255, 255, 0) 55%,
            rgba(255, 255, 255, 0.22) 82%,
            rgba(255, 255, 255, 0) 100%
          );
          mix-blend-mode: screen;
        }
        .bar-inset {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 1.5px 1px rgba(255, 255, 255, 0.85),
            inset 0 -30px 50px rgba(255, 255, 255, 0.12),
            inset 20px 0 40px rgba(255, 255, 255, 0.08);
        }

        @keyframes driftA {
          0%,
          100% {
            transform: rotate(-36deg) translateY(0) translateX(0);
            opacity: 1;
          }
          50% {
            transform: rotate(-31deg) translateY(60px) translateX(-26px);
            opacity: 0.85;
          }
        }
        @keyframes driftB {
          0%,
          100% {
            transform: rotate(-36deg) translateY(0) translateX(0);
            opacity: 1;
          }
          50% {
            transform: rotate(-41deg) translateY(-52px) translateX(20px);
            opacity: 0.85;
          }
        }
        @keyframes driftC {
          0%,
          100% {
            transform: rotate(-36deg) translateY(0) translateX(0);
            opacity: 1;
          }
          50% {
            transform: rotate(-30deg) translateY(48px) translateX(28px);
            opacity: 0.85;
          }
        }
        @keyframes driftD {
          0%,
          100% {
            transform: rotate(-36deg) translateY(0) translateX(0);
            opacity: 1;
          }
          50% {
            transform: rotate(-42deg) translateY(-56px) translateX(-20px);
            opacity: 0.85;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bar {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}