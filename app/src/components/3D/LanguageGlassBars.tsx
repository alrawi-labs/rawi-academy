// components/3D/LanguageGlassBars.tsx
"use client";

interface BarConfig {
  left: string;
  from: string;
  to: string;
  glow: string;
  drift: string;
}

// Dördü de --color-visual-pink'ten türetildi. --color-accent-pink token'ı
// (tokens.md'de) ölü/unmapped olduğu için ikinci renk kaynağı olarak
// kullanılmadı — çeşitlilik aynı pembe ailesinde farklı color-mix
// oranlarıyla (white/black karışımı, opaklık) sağlanıyor.
const BARS: BarConfig[] = [
  {
    left: "2%",
    from: "color-mix(in srgb, var(--color-visual-pink) 85%, white)",
    to: "color-mix(in srgb, var(--color-visual-pink) 55%, white)",
    glow: "color-mix(in srgb, var(--color-visual-pink) 70%, transparent)",
    drift: "driftA 10s",
  },
  {
    left: "10%",
    from: "color-mix(in srgb, var(--color-visual-pink) 95%, black)",
    to: "color-mix(in srgb, var(--color-visual-pink) 65%, black)",
    glow: "color-mix(in srgb, var(--color-visual-pink) 60%, transparent)",
    drift: "driftB 9s",
  },
  {
    left: "18%",
    from: "color-mix(in srgb, var(--color-visual-pink) 55%, transparent)",
    to: "color-mix(in srgb, var(--color-visual-pink) 35%, white)",
    glow: "color-mix(in srgb, var(--color-visual-pink) 48%, transparent)",
    drift: "driftC 12s",
  },
  {
    left: "26%",
    from: "color-mix(in srgb, var(--color-visual-pink) 40%, black)",
    to: "color-mix(in srgb, var(--color-visual-pink) 60%, black)",
    glow: "color-mix(in srgb, var(--color-visual-pink) 50%, transparent)",
    drift: "driftD 11s",
  },
];

export default function LanguageGlassBars() {
  return (
    <div className="glass-bars" aria-hidden="true">
      {BARS.map((bar, i) => (
        <div
          key={i}
          className="bar"
          style={{
            left: bar.left,
            background: `linear-gradient(180deg, ${bar.from}, ${bar.to})`,
            boxShadow: `0 50px 90px -25px ${bar.glow}`,
            animation: `${bar.drift} ease-in-out infinite`,
          }}
        />
      ))}

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
          backdrop-filter: blur(14px) saturate(240%);
          -webkit-backdrop-filter: blur(14px) saturate(240%);
          border: 1px solid rgba(255, 255, 255, 0.55);
          transform: rotate(-36deg);
        }
        .bar::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.55) 18%,
            rgba(255, 255, 255, 0.08) 34%,
            rgba(255, 255, 255, 0) 55%,
            rgba(255, 255, 255, 0.28) 82%,
            rgba(255, 255, 255, 0) 100%
          );
          mix-blend-mode: screen;
        }
        .bar::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          box-shadow: inset 0 1.5px 1px rgba(255, 255, 255, 0.85),
            inset 0 -30px 50px rgba(255, 255, 255, 0.14),
            inset 20px 0 40px rgba(255, 255, 255, 0.1);
        }

        @keyframes driftA {
          0%, 100% { transform: rotate(-36deg) translateY(0) translateX(0); opacity: 1; }
          50% { transform: rotate(-31deg) translateY(60px) translateX(-26px); opacity: 0.85; }
        }
        @keyframes driftB {
          0%, 100% { transform: rotate(-36deg) translateY(0) translateX(0); opacity: 1; }
          50% { transform: rotate(-41deg) translateY(-52px) translateX(20px); opacity: 0.85; }
        }
        @keyframes driftC {
          0%, 100% { transform: rotate(-36deg) translateY(0) translateX(0); opacity: 1; }
          50% { transform: rotate(-30deg) translateY(48px) translateX(28px); opacity: 0.85; }
        }
        @keyframes driftD {
          0%, 100% { transform: rotate(-36deg) translateY(0) translateX(0); opacity: 1; }
          50% { transform: rotate(-42deg) translateY(-56px) translateX(-20px); opacity: 0.85; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bar { animation: none !important; }
        }
      `}</style>
    </div>
  );
}