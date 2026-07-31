"use client";

import { useEffect, useState, type CSSProperties } from "react";

const BRIDGE_PATH =
  "M 8 92 C 55 68, 108 62, 150 78 C 188 92, 208 122, 194 152 C 182 178, 152 190, 126 178 C 104 168, 96 144, 110 128 C 120 117, 136 118, 142 130";

// خاصية CSS مخصّصة (--mc-len) تُستخدم في keyframes الأنيميشن؛
// TypeScript لا يعرفها ضمن CSSProperties الرسمية، لذا نوسّع النوع محليًا.
type BridgeLineStyle = CSSProperties & { "--mc-len"?: number | string };

export function BridgeSentence() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const bridgeLineStyle: BridgeLineStyle = { "--mc-len": 430 };

  return (
    <div className="hidden md:block absolute left-[35%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-67.5 h-67.5 pointer-events-none">
      <style>{`
        @keyframes mc-bridge-draw {
          from { stroke-dashoffset: var(--mc-len); }
          to { stroke-dashoffset: 0; }
        }
        @keyframes mc-bridge-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .mc-bridge-line {
          stroke-dasharray: var(--mc-len);
          stroke-dashoffset: var(--mc-len);
          animation: mc-bridge-draw 2.4s 0.3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .mc-bridge-glyph {
          opacity: 0;
          animation: mc-bridge-fade-in 0.8s ease-out forwards;
        }
        .mc-bridge-label {
          opacity: 0;
          animation: mc-bridge-fade-in 0.9s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .mc-bridge-line { animation: none; stroke-dashoffset: 0; }
          .mc-bridge-glyph, .mc-bridge-label { animation: none; opacity: 1; }
        }
      `}</style>

      <svg viewBox="0 0 220 220" className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id="bridgeStroke" x1="8" y1="92" x2="150" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-accent-purple)" />
            <stop offset="55%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-outline-hover)" />
          </linearGradient>
          <filter id="bridgeGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* الخط الأساسي — يرسم نفسه من البساطة إلى الالتفاف الحلزوني */}
        <path
          d={BRIDGE_PATH}
          fill="none"
          stroke="url(#bridgeStroke)"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="mc-bridge-line"
          style={bridgeLineStyle}
        />

        {/* نقطة توهّج تتجول ببطء على طول المسار — إشارة فكرة تنتقل من البسيط إلى المعقد */}
        {!reduceMotion && (
          <circle r="2.6" fill="var(--color-outline-hover)" filter="url(#bridgeGlow)">
            <animateMotion dur="7s" repeatCount="indefinite" path={BRIDGE_PATH} rotate="auto" begin="2.6s" />
          </circle>
        )}

        {/* رموز رياضية تتصاعد في تعقيدها مع تقدّم الخط */}
        <text x="19" y="90" fontSize="15" fill="var(--color-accent-purple)" className="mc-bridge-glyph" style={{ animationDelay: "0.6s" }}>
          - +
        </text>
        <text x="120" y="68" fontSize="15" fill="var(--color-primary)" className="mc-bridge-glyph" style={{ animationDelay: "1.4s" }}>
          √
        </text>
        <text
          x="132"
          y="140"
          fontSize="15"
          fontWeight="700"
          fill="var(--color-outline-hover)"
          filter="url(#bridgeGlow)"
          className="mc-bridge-glyph"
          style={{ animationDelay: "2.2s" }}
        >
          ∫
        </text>

        {/* نقطة الوصول — توهّج ثابت عند مركز الالتفاف */}
        <circle cx="110" cy="128" r="3.4" fill="var(--color-outline-hover)" filter="url(#bridgeGlow)" className="mc-bridge-glyph" style={{ animationDelay: "2.6s" }} />
      </svg>

      <div
        dir="rtl"
        className="mc-bridge-label absolute left-[2%] top-[27%] font-thmanyah-display text-body font-medium tracking-wide text-neutral-500 whitespace-nowrap"
        style={{ animationDelay: "0.5s", transform: "rotate(-4deg)" }}
      >
        من الأساسيات
      </div>

      <div
        dir="rtl"
        className="mc-bridge-label absolute left-[28%] top-[66%] font-thmanyah-display text-[21px] font-bold text-neutral-800 leading-snug whitespace-nowrap"
        style={{ animationDelay: "2.4s" }}
      >
        إلى أصعب المسائل
      </div>
    </div>
  );
}