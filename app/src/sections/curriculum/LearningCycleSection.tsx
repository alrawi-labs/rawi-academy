import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";

// Order matters: sequential learning stages, first → last (cycle closes back to first)
const stages = ["تعلّم", "طبّق", "اختبر", "راجع", "تقدّم", "أتقن"];
const ordinals = ["١", "٢", "٣", "٤", "٥", "٦"];

// Evenly spaced around the circle, starting at the top (-90°), clockwise
const ANGLES = [-90, -30, 30, 90, 150, 210];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const CX = 280;
const CY = 280;
const R = 178;

export default function LearningCycleSection() {
  const nodePts = ANGLES.map((a) => polarToCartesian(CX, CY, R, a));

  // Progress arc: from stage 0 (تعلّم) through stage 4 (تقدّم) up to stage 5 (أتقن) —
  // 300° of the circle. The remaining 60° (أتقن → تعلّم) is the faint "restart" segment.
  const arcStart = nodePts[0];
  const arcEnd = nodePts[5];
  const progressArc = `M ${arcStart.x} ${arcStart.y} A ${R} ${R} 0 1 1 ${arcEnd.x} ${arcEnd.y}`;

  // Restart arrow tangent direction at the closing point
  const restartAngle = ANGLES[0] + 90;

  return (
    <section dir="rtl" className="relative bg-neutral-100 py-[130px] max-md:py-16 overflow-hidden">
      {/* Whisper of ambient light behind the diagram — not a decoration you notice, just feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[100px] max-md:hidden"
      />

      {/* Barely-there grain to keep the white from feeling flat/digital */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <SectionContainer>
        <div className="grid md:grid-cols-[340px_1fr] gap-16 items-center max-md:gap-12">
          <Reveal>
            <h2 className="font-thmanyah-display text-h2-sm text-neutral-900 mb-4 max-w-[380px]">
              كل خطوة تقود إلى التي بعدها.
            </h2>
            <p className="text-body text-neutral-500 max-w-[380px] leading-relaxed">
              لا ينتقل المتعلم في راوي لمجرد أن الدرس انتهى، بل لأن المعرفة
              التي اكتسبها أصبحت أساسًا للخطوة التالية.
            </p>
          </Reveal>

          <Reveal className="flex justify-center">
            <svg viewBox="0 0 560 560" className="w-[min(500px,100%)] h-auto overflow-visible">
              <defs>
                <linearGradient
                  id="cycleGradient"
                  gradientUnits="userSpaceOnUse"
                  x1={arcStart.x}
                  y1={arcStart.y}
                  x2={arcEnd.x}
                  y2={arcEnd.y}
                >
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.12" />
                  <stop offset="70%" stopColor="var(--color-primary)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="1" />
                </linearGradient>
                <filter id="masteryGlow" x="-150%" y="-150%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="10" />
                </filter>
              </defs>

              {/* Faint outer frame — pure ornament, kept very quiet */}
              <circle cx={CX} cy={CY} r={R + 42} fill="none" stroke="var(--color-neutral-200)" strokeWidth="1" strokeDasharray="1 7" opacity="0.6" />

              {/* Base track */}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-neutral-200)" strokeWidth="1.5" />

              {/* Progress arc — the entire visual argument of the section */}
              <path d={progressArc} fill="none" stroke="url(#cycleGradient)" strokeWidth="2.5" strokeLinecap="round" />

              {/* Restart segment — quiet, thin, just enough to read as "loop" */}
              <path
                d={`M ${nodePts[5].x} ${nodePts[5].y} A ${R} ${R} 0 0 1 ${nodePts[0].x} ${nodePts[0].y}`}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="1"
                strokeDasharray="1 5"
                opacity="0.35"
              />
              <path
                d="M -5,-3.5 L 6,0 L -5,3.5 Z"
                fill="var(--color-primary)"
                opacity="0.55"
                transform={`translate(${(nodePts[5].x + nodePts[0].x) / 2}, ${(nodePts[5].y + nodePts[0].y) / 2}) rotate(${restartAngle})`}
              />

              {/* Soft focal glow behind the mastery node — a destination, not decoration */}
              <circle cx={nodePts[5].x} cy={nodePts[5].y} r="26" fill="var(--color-primary)" opacity="0.15" filter="url(#masteryGlow)" />

              {stages.map((label, i) => {
                const pt = nodePts[i];
                const isLast = i === stages.length - 1;
                const labelPt = polarToCartesian(CX, CY, R + 46, ANGLES[i]);
                const ordinalPt = polarToCartesian(CX, CY, R + (isLast ? 78 : 68), ANGLES[i]);

                return (
                  <g key={label} className="group cursor-default">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isLast ? 8 : 5}
                      fill={isLast ? "var(--color-primary)" : "var(--color-neutral-0)"}
                      stroke="var(--color-primary)"
                      strokeWidth={isLast ? 0 : 1.5}
                      strokeOpacity={isLast ? 1 : 0.3 + i * 0.12}
                      className="transition-transform duration-300 ease-out group-hover:scale-125"
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    />
                    <text
                      x={labelPt.x}
                      y={labelPt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={
                        isLast
                          ? "font-thmanyah-display text-[22px] font-semibold fill-primary"
                          : "text-[15px] font-medium fill-neutral-700"
                      }
                    >
                      {label}
                    </text>
                    <text
                      x={ordinalPt.x}
                      y={ordinalPt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-micro fill-neutral-300 tracking-[0.15em]"
                    >
                      {ordinals[i]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}