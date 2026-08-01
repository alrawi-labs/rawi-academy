"use client";

interface BarConfig {
  /** Distance from the left edge of the container, e.g. "6%". */
  left: string;
  /** Top and bottom gradient stops (with alpha) for the glass tint. */
  from: string;
  to: string;
  /** Shadow/glow color cast under the bar. */
  glow: string;
  /** Animation name + duration, e.g. "driftA 9s". */
  drift: string;
}

const BARS: BarConfig[] = [
  {
    left: "2%",
    from: "rgba(253, 121, 0)", // orange
    to: "rgba(255, 145, 90)",
    glow: "rgba(253, 121, 0)",
    drift: "driftA 10s",
  },
  {
    left: "10%",
    from: "rgba(94, 70, 255)", // purple
    to: "rgba(170, 150, 255)",
    glow: "rgba(94, 70, 255)",
    drift: "driftB 9s",
  },
  {
    left: "18%",
    from: "rgba(255, 45, 170, .55)", // pink
    to: "rgba(255, 140, 210, .35)",
    glow: "rgba(255, 45, 170, .48)",
    drift: "driftC 12s",
  },
  {
    left: "26%",
    from: "rgba(0, 210, 190, .58)", // teal
    to: "rgba(110, 235, 220, .38)",
    glow: "rgba(0, 210, 190, .5)",
    drift: "driftD 11s",
  },
];

export default function HeroGlassBars() {
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
        /* faint dot grid so the glass blur has something to refract;
           remove if the container already has imagery/texture behind it */
        .dotgrid {
          position: absolute;
          inset: -10% -10%;
          z-index: -1;
          background-image: radial-gradient(
            rgba(27, 23, 48, 0.14) 1px,
            transparent 1px
          );
          background-size: 26px 26px;
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