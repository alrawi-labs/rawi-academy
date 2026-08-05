// components/3D/HeroGlassRibbons.tsx
"use client";

interface RibbonConfig {
  right: string;
  color: string; // design-system token, e.g. "var(--color-orange)"
  width: string;
  blur: string;
  rotate: string;
  drift: string;
}

const RIBBONS: RibbonConfig[] = [
  {
    right: "0%",
    color: "var(--color-orange)",
    width: "220px",
    blur: "14px",
    rotate: "36deg",
    drift: "driftA 11s",
  },
  {
    right: "9%",
    color: "var(--color-visual-pink, var(--color-primary))",
    width: "190px",
    blur: "16px",
    rotate: "34deg",
    drift: "driftB 13s",
  },
  {
    right: "17%",
    color: "var(--color-primary)",
    width: "240px",
    blur: "14px",
    rotate: "37deg",
    drift: "driftC 10s",
  },
  {
    right: "26%",
    color: "var(--color-primary-alt)",
    width: "200px",
    blur: "15px",
    rotate: "35deg",
    drift: "driftD 12s",
  },
  {
    right: "34%",
    color: "var(--color-visual-teal, var(--color-primary-alt))",
    width: "170px",
    blur: "17px",
    rotate: "38deg",
    drift: "driftE 14s",
  },
  {
    right: "41%",
    color: "var(--color-primary-alt)",
    width: "150px",
    blur: "18px",
    rotate: "33deg",
    drift: "driftF 9s",
  },
];

export default function HeroGlassRibbons() {
  return (
    <div className="glass-ribbons" aria-hidden="true">
      {/* Soft diffuse wash so color bleeds between bars instead of cutting hard */}
      <div className="wash" />

      {RIBBONS.map((r, i) => (
        <div
          key={i}
          className="bar"
          style={{
            right: r.right,
            width: r.width,
            background: `linear-gradient(
              180deg,
              ${r.color},
              color-mix(in srgb, ${r.color} 55%, white)
            )`,
            boxShadow: `0 50px 90px -25px color-mix(in srgb, ${r.color} 60%, transparent)`,
            backdropFilter: `blur(${r.blur}) saturate(220%)`,
            WebkitBackdropFilter: `blur(${r.blur}) saturate(220%)`,
            transform: `rotate(${r.rotate})`,
            animation: `${r.drift} ease-in-out infinite`,
          }}
        />
      ))}

      <style jsx>{`
        .glass-ribbons {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .wash {
          position: absolute;
          inset: -20%;
          filter: blur(90px);
          opacity: 0.35;
          background: linear-gradient(
            240deg,
            var(--color-orange) 0%,
            var(--color-visual-pink, var(--color-primary)) 22%,
            var(--color-primary) 46%,
            var(--color-primary-alt) 72%,
            var(--color-visual-teal, var(--color-primary-alt)) 100%
          );
        }
        .bar {
          position: absolute;
          height: 180%;
          top: -40%;
          border-radius: 120px;
          border: 1px solid rgba(255, 255, 255, 0.55);
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
          box-shadow:
            inset 0 1.5px 1px rgba(255, 255, 255, 0.85),
            inset 0 -30px 50px rgba(255, 255, 255, 0.14),
            inset 20px 0 40px rgba(255, 255, 255, 0.1);
        }

        @keyframes driftA {
          0%, 100% { transform: rotate(36deg) translateY(0) translateX(0); opacity: 1; }
          50% { transform: rotate(31deg) translateY(60px) translateX(26px); opacity: 0.85; }
        }
        @keyframes driftB {
          0%, 100% { transform: rotate(34deg) translateY(0) translateX(0); opacity: 1; }
          50% { transform: rotate(40deg) translateY(-48px) translateX(-18px); opacity: 0.85; }
        }
        @keyframes driftC {
          0%, 100% { transform: rotate(37deg) translateY(0) translateX(0); opacity: 1; }
          50% { transform: rotate(30deg) translateY(52px) translateX(-24px); opacity: 0.85; }
        }
        @keyframes driftD {
          0%, 100% { transform: rotate(35deg) translateY(0) translateX(0); opacity: 1; }
          50% { transform: rotate(42deg) translateY(-54px) translateX(18px); opacity: 0.85; }
        }
        @keyframes driftE {
          0%, 100% { transform: rotate(38deg) translateY(0) translateX(0); opacity: 1; }
          50% { transform: rotate(32deg) translateY(44px) translateX(-20px); opacity: 0.85; }
        }
        @keyframes driftF {
          0%, 100% { transform: rotate(33deg) translateY(0) translateX(0); opacity: 1; }
          50% { transform: rotate(40deg) translateY(-40px) translateX(22px); opacity: 0.85; }
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