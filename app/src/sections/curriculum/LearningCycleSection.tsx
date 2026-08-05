import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";

// Order matters: sequential learning stages, first → last (cycle closes back to first)
const nodes = [
  { label: "تعلّم", x: 280, y: 60 },
  { label: "طبّق", x: 470, y: 140 },
  { label: "اختبر", x: 520, y: 320 },
  { label: "راجع", x: 380, y: 430 },
  { label: "تقدّم", x: 150, y: 380 },
  { label: "أتقن", x: 90, y: 180 },
];

// Progressive emphasis: dot size + fill opacity grow toward mastery — encodes the
// section's own message ("كل خطوة تقود إلى التي بعدها") instead of six identical nodes.
const emphasis = [
  { r: 5, opacity: 0.1, textClass: "text-[13px] font-medium fill-neutral-500" },
  { r: 5.5, opacity: 0.22, textClass: "text-[14px] font-medium fill-neutral-600" },
  { r: 6, opacity: 0.36, textClass: "text-[14px] font-medium fill-neutral-700" },
  { r: 6.5, opacity: 0.52, textClass: "text-[14px] font-medium fill-neutral-700" },
  { r: 7, opacity: 0.7, textClass: "text-[14px] font-semibold fill-neutral-800" },
  { r: 9, opacity: 1, textClass: "font-thmanyah-display text-[20px] font-semibold fill-primary" },
];

// Centroid of the loop, used to push labels + leader lines outward radially.
const cx = 315;
const cy = 252;

function outward(x: number, y: number, dist: number) {
  const dx = x - cx;
  const dy = y - cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: x + (dx / len) * dist, y: y + (dy / len) * dist };
}

type Point = { x: number; y: number };

// Smooth closed path through 6 irregular points (quadratic "rounded polygon" technique).
function buildLoopPath(pts: Point[]) {
  const mid = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const m = pts.map((p, i) => mid(p, pts[(i + 1) % pts.length]));
  const start = m[m.length - 1];
  let d = `M${start.x},${start.y} `;
  pts.forEach((p, i) => {
    d += `Q${p.x},${p.y} ${m[i].x},${m[i].y} `;
  });
  return { d: d + "Z", m };
}

export default function LearningCycleSection() {
  const { d: loopPath, m } = buildLoopPath(nodes);

  // A second, slightly jittered pass through the same points — the faint "second stroke"
  // a hand actually leaves when inking a curve twice. Pure SVG, no illustration asset.
  const jittered: Point[] = [
    { x: 283, y: 57 },
    { x: 467, y: 144 },
    { x: 523, y: 317 },
    { x: 377, y: 433 },
    { x: 153, y: 377 },
    { x: 93, y: 183 },
  ];
  const { d: loopPathSketch } = buildLoopPath(jittered);

  // "Final stretch" toward mastery (راجع → تقدّم → أتقن) traced as its own gradient-lit
  // path, ending exactly where the restart arrow begins — the visual payoff of the piece.
  const finalStretch = `M${m[2].x},${m[2].y} Q${nodes[3].x},${nodes[3].y} ${m[3].x},${m[3].y} Q${nodes[4].x},${nodes[4].y} ${m[4].x},${m[4].y} Q${nodes[5].x},${nodes[5].y} ${m[5].x},${m[5].y}`;

  // Cycle-restart arrow (أتقن → تعلّم), rotated to the closing tangent.
  const last = nodes[nodes.length - 1];
  const first = nodes[0];
  const closeMid = { x: (last.x + first.x) / 2, y: (last.y + first.y) / 2 };
  const angle = (Math.atan2(first.y - last.y, first.x - last.x) * 180) / Math.PI;

  const masteryNode = nodes[5];

  return (
    <section dir="rtl" className="relative bg-neutral-100 py-[110px] pb-[130px] overflow-hidden max-md:py-16">
      {/* Layered grain — fine + coarse — instead of a flat matte background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.35' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E\")",
        }}
      />

      <SectionContainer>
        <div className="grid md:grid-cols-[340px_1fr] gap-16 items-center max-md:gap-10">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-primary/70" />
              <span className="text-micro tracking-[0.2em] text-neutral-500">حلقة التعلّم</span>
            </div>
            <h2 className="font-thmanyah-display text-h2-sm text-neutral-900 mb-4 max-w-[380px]">
              كل خطوة تقود إلى التي بعدها.
            </h2>
            <p className="text-body text-neutral-500 max-w-[380px]">
              لا ينتقل المتعلم في راوي لمجرد أن الدرس انتهى، بل لأن المعرفة
              التي اكتسبها أصبحت أساسًا للخطوة التالية.
            </p>
          </Reveal>

          <Reveal className="flex justify-center">
            <svg viewBox="0 0 600 500" className="w-[min(560px,100%)] h-auto overflow-visible">
              <defs>
                <linearGradient
                  id="finalStretchGradient"
                  gradientUnits="userSpaceOnUse"
                  x1={m[2].x}
                  y1={m[2].y}
                  x2={m[5].x}
                  y2={m[5].y}
                >
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
                  <stop offset="55%" stopColor="var(--color-primary)" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.9" />
                </linearGradient>
                <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="7" />
                </filter>
                <filter id="diagramShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0F0F12" floodOpacity="0.08" />
                </filter>
              </defs>

              <g filter="url(#diagramShadow)">
                {/* Hand-inked double line: faint sketch pass beneath the clean pass */}
                <path d={loopPathSketch} fill="none" stroke="var(--color-neutral-300)" strokeWidth="0.75" opacity="0.4" />
                <path d={loopPath} fill="none" stroke="var(--color-neutral-300)" strokeWidth="1" />

                {/* The payoff: final stretch toward mastery, lit up along a gradient */}
                <path d={finalStretch} fill="none" stroke="url(#finalStretchGradient)" strokeWidth="1.75" strokeLinecap="round" />

                {/* Soft focal glow behind the mastery node only — a destination, not a decoration */}
                <circle cx={masteryNode.x} cy={masteryNode.y} r="20" fill="var(--color-primary)" opacity="0.18" filter="url(#softGlow)" />

                {/* Cycle-restart arrow — the single directional marker, placed where it matters */}
                <path
                  d="M -6,-4 L 7,0 L -6,4 Z"
                  fill="var(--color-primary)"
                  opacity="0.65"
                  transform={`translate(${closeMid.x}, ${closeMid.y}) rotate(${angle})`}
                />

                {nodes.map((node, i) => {
                  const em = emphasis[i];
                  const leaderEnd = outward(node.x, node.y, 15);
                  const labelPos = outward(node.x, node.y, i === 5 ? 48 : 40);
                  const captionPos = outward(node.x, node.y, i === 5 ? 68 : 60);
                  return (
                    <g key={node.label} className="group cursor-default">
                      <line
                        x1={node.x}
                        y1={node.y}
                        x2={leaderEnd.x}
                        y2={leaderEnd.y}
                        stroke="var(--color-neutral-300)"
                        strokeWidth="1"
                        className="transition-colors duration-300 group-hover:stroke-primary"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={em.r}
                        fill="var(--color-primary)"
                        fillOpacity={em.opacity}
                        stroke="var(--color-primary)"
                        strokeOpacity={Math.min(em.opacity + 0.25, 1)}
                        strokeWidth="1.25"
                        className="transition-transform duration-300 ease-out group-hover:scale-125"
                        style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      />
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={`${em.textClass} transition-colors duration-300 group-hover:fill-primary`}
                      >
                        {node.label}
                      </text>
                      {(i === 0 || i === 5) && (
                        <text
                          x={captionPos.x}
                          y={captionPos.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-micro fill-neutral-400 tracking-[0.15em]"
                        >
                          {i === 0 ? "البداية" : "الإتقان"}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}