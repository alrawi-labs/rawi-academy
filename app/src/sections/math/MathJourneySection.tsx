"use client";

import {SectionContainer} from "@/app/src/components/layout/SectionContainer";

/**
 * MathJourneySection — "رحلة التعلّم"
 *
 * Third section of the Math landing page, placed directly after the
 * "لا نعلّمك كيف تجد الإجابة / نعلّمك كيف تصل إليها" statement.
 *
 * Composition: one continuous mathematical trajectory (a single SVG path)
 * running top-to-bottom through five stages of increasing — then resolving —
 * complexity. The headline sits in a narrower text column; the trajectory
 * runs beside it and crosses the section's vertical padding at top and
 * bottom, so nothing is boxed into a symmetric grid.
 *
 * The same artwork reflows edge-to-edge on mobile, since the trajectory is
 * already vertical by construction — no separate mobile layout was needed.
 *
 * Motion: left static/quiet by design (see brief: "no constant movement").
 * The trajectory path has id="journey-path" and each stage group carries
 * data-stage so a future scroll-driver can call getTotalLength()/
 * setProperty('--progress', …) without touching this markup.
 */

type Stage = {
  n: string;
  title: string;
  desc: string;
  x: number; // node position inside the 0..560 / 0..820 viewBox
  y: number;
  side: "start" | "end"; // which side of the node the label sits on
};

const STAGES: Stage[] = [
  {
    n: "01",
    title: "الأساسيات",
    desc: "ابنِ أساسًا قويًا.",
    x: 150,
    y: 60,
    side: "end",
  },
  {
    n: "02",
    title: "الفهم",
    desc: "اكتشف لماذا تعمل الأشياء.",
    x: 262,
    y: 216,
    side: "start",
  },
  {
    n: "03",
    title: "التطبيق",
    desc: "حوّل المعرفة إلى حل.",
    x: 140,
    y: 384,
    side: "end",
  },
  {
    n: "04",
    title: "حل المشكلات",
    desc: "فكّك التعقيد إلى خطوات واضحة.",
    x: 302,
    y: 566,
    side: "start",
  },
  {
    n: "05",
    title: "الإتقان",
    desc: "فكّر كصاحب الحل، لا كحافظ للقانون.",
    x: 188,
    y: 742,
    side: "end",
  },
];

const VB_W = 560;
const VB_H = 820;

const spinePath = `M ${STAGES[0].x},${STAGES[0].y}
  C 224,112 236,150 ${STAGES[1].x},${STAGES[1].y}
  C 300,270 158,300 ${STAGES[2].x},${STAGES[2].y}
  C 118,462 344,478 ${STAGES[3].x},${STAGES[3].y}
  C 258,642 152,660 ${STAGES[4].x},${STAGES[4].y}`;

export default function MathJourneySection() {
  return (
    <section
      dir="rtl"
      lang="ar"
      className="relative overflow-hidden bg-neutral-100 py-24 md:py-32"
    >
      {/* whisper-quiet grain, not a texture cliché — 3% max opacity */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <SectionContainer>
        <div className="relative grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          {/* ── Text column ───────────────────────────────────────── */}
          <div className="md:col-span-5 md:pt-6 lg:col-span-4 lg:col-start-1">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-[3px] w-[3px] rounded-[1px]"
                style={{ background: "var(--color-orange)" }}
              />
              <span className="text-micro font-medium tracking-[0.08em] text-neutral-500">
                رحلة التعلّم
              </span>
            </div>

            <h2 className="font-thmanyah-display text-h2 md:text-hero mt-6 text-neutral-900 leading-[1.15]">
              كل فكرة تبدأ بسيطة.
              <br />
              ثم تبدأ أنت برؤيتها بشكل مختلف.
            </h2>

            <p className="text-body mt-7 max-w-[42ch] text-neutral-700 leading-relaxed">
              صممنا رحلة الرياضيات حتى تنتقل من الفهم الأولي إلى التفكير
              المتقدم، خطوة بخطوة، بدون قفزات أو تعقيد غير ضروري.
            </p>

            <div className="mt-12 hidden items-center gap-3 md:flex">
              <span
                aria-hidden
                className="h-px w-10"
                style={{ background: "var(--color-neutral-300)" }}
              />
              <span className="text-micro text-neutral-400">٠١ — ٠٥</span>
            </div>
          </div>

          {/* ── Trajectory column ─────────────────────────────────── */}
          <div className="relative md:col-span-7 lg:col-span-7 lg:col-start-6">
            <div
              className="relative mx-auto -mt-4 w-full max-w-[420px] md:-mt-16 md:mb-[-72px] md:max-w-none lg:-mt-24 lg:mb-[-96px]"
              style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
            >
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <defs>
                  <pattern
                    id="mj-grid"
                    width="22"
                    height="22"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 22 0 L 0 0 0 22"
                      fill="none"
                      stroke="var(--color-neutral-200)"
                      strokeWidth="0.6"
                    />
                  </pattern>
                  <clipPath id="mj-grid-clip">
                    <rect x="30" y="330" width="360" height="270" rx="2" />
                  </clipPath>
                </defs>

                {/* faint coordinate field — only where stages 03/04 sit */}
                <rect
                  x="30"
                  y="330"
                  width="360"
                  height="270"
                  fill="url(#mj-grid)"
                  opacity="0.55"
                  clipPath="url(#mj-grid-clip)"
                />

                {/* the single continuous trajectory */}
                <path
                  id="journey-path"
                  d={spinePath}
                  fill="none"
                  stroke="var(--color-neutral-300)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />

                {/* Stage 01 — a point, a line. nothing else. */}
                <g data-stage="01" transform={`translate(${STAGES[0].x} ${STAGES[0].y})`}>
                  <line
                    x1="0"
                    y1="0"
                    x2="30"
                    y2="21"
                    stroke="var(--color-neutral-400)"
                    strokeWidth="1.2"
                  />
                  <circle r="3.5" fill="var(--color-neutral-900)" />
                </g>

                {/* Stage 02 — a relationship appears */}
                <g data-stage="02" transform={`translate(${STAGES[1].x} ${STAGES[1].y})`}>
                  <line
                    x1="0"
                    y1="0"
                    x2="-24"
                    y2="-16"
                    stroke="var(--color-neutral-400)"
                    strokeWidth="1"
                  />
                  <path
                    d="M -24,-16 L -24,-4 L -12,-4"
                    fill="none"
                    stroke="var(--color-neutral-300)"
                    strokeWidth="1"
                  />
                  <circle cx="-24" cy="-16" r="2.4" fill="var(--color-neutral-700)" />
                  <circle r="3" fill="var(--color-neutral-900)" />
                </g>

                {/* Stage 03 — becomes functional and structured */}
                <g data-stage="03" transform={`translate(${STAGES[2].x} ${STAGES[2].y})`}>
                  <path
                    d="M 0,0 L 36,0 L 36,-36 Z"
                    fill="none"
                    stroke="var(--color-neutral-300)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 8,-2 A 8,8 0 0 1 2,-8"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="1.2"
                    opacity="0.55"
                  />
                  <line x1="14" y1="0" x2="14" y2="-4" stroke="var(--color-neutral-400)" strokeWidth="0.8" />
                  <line x1="36" y1="-14" x2="32" y2="-14" stroke="var(--color-neutral-400)" strokeWidth="0.8" />
                  <circle r="3" fill="var(--color-neutral-900)" />
                </g>

                {/* Stage 04 — a tangle resolves into clear steps */}
                <g data-stage="04" transform={`translate(${STAGES[3].x} ${STAGES[3].y})`}>
                  <g stroke="var(--color-neutral-300)" strokeWidth="0.9">
                    <line x1="-38" y1="-6" x2="-20" y2="6" />
                    <line x1="-36" y1="8" x2="-16" y2="-8" />
                    <line x1="-30" y1="-16" x2="-14" y2="2" />
                    <line x1="-34" y1="2" x2="-12" y2="-10" />
                  </g>
                  <path
                    d="M 8,10 L 22,10 L 22,-4 L 36,-4 L 36,-18"
                    fill="none"
                    stroke="var(--color-neutral-500)"
                    strokeWidth="1.3"
                  />
                  <circle r="3" fill="var(--color-neutral-900)" />
                </g>

                {/* Stage 05 — clear, balanced, intentional */}
                <g data-stage="05" transform={`translate(${STAGES[4].x} ${STAGES[4].y})`}>
                  <circle r="17" fill="none" stroke="var(--color-neutral-200)" strokeWidth="1" />
                  {[0, 60, 120, 180, 240, 300].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    const x2 = Math.cos(rad) * 15;
                    const y2 = Math.sin(rad) * 15;
                    return (
                      <line
                        key={deg}
                        x1="0"
                        y1="0"
                        x2={x2}
                        y2={y2}
                        stroke="var(--color-orange)"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    );
                  })}
                  <circle r="4.5" fill="var(--color-orange)" />
                </g>

                {/* selective mathematical notation — never decoration */}
                <text x="286" y="196" className="mj-glyph" fontSize="15" fill="var(--color-neutral-400)">
                  √
                </text>
                <text x="352" y="546" className="mj-glyph" fontSize="16" fill="var(--color-neutral-400)">
                  ∑
                </text>
                <text x="222" y="722" className="mj-glyph" fontSize="14" fill="var(--color-neutral-400)" opacity="0.8">
                  π
                </text>
              </svg>

              {/* typographic stage labels — real HTML for correct Arabic shaping */}
              {STAGES.map((s) => (
                <div
                  key={s.n}
                  className="absolute w-[168px]"
                  style={{
                    left: `${(s.x / VB_W) * 100}%`,
                    top: `${(s.y / VB_H) * 100}%`,
                    transform:
                      s.side === "end"
                        ? "translate(calc(-100% - 20px), -50%)"
                        : "translate(20px, -50%)",
                    textAlign: s.side === "end" ? "right" : "left",
                  }}
                >
                  <div
                    className="flex items-baseline gap-2"
                    style={{
                      flexDirection: s.side === "end" ? "row-reverse" : "row",
                    }}
                  >
                    <span
                      className="text-micro font-medium"
                      style={{
                        color:
                          s.n === "05"
                            ? "var(--color-orange)"
                            : "var(--color-neutral-400)",
                      }}
                    >
                      {s.n}
                    </span>
                    <span className="text-caption font-medium text-neutral-900">
                      {s.title}
                    </span>
                  </div>
                  <p className="text-micro mt-1 leading-snug text-neutral-500">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      <style>{`
        .mj-glyph {
          font-family: var(--font-thmanyah-text, inherit);
        }
        @media (min-width: 768px) {
          section[dir="rtl"] svg text.mj-glyph { opacity: 0.9; }
        }
      `}</style>
    </section>
  );
}