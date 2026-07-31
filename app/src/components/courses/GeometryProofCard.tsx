"use client";

import { Ruler } from "lucide-react";

// ── Sadece renk paleti değişti; yapı, texture ve konum birebir aynı ──
const INK = "var(--color-neutral-900)";        // soğuk, mora çalan neredeyse-siyah
const INK_MUTED = "var(--color-neutral-400)";
const A_COLOR = "var(--color-outline-hover)"; // ametist — الضلع (a)
const B_COLOR = "var(--color-visual-teal)";   // زمردة خضراء — الضلع (b)
const C_COLOR = "var(--color-accent-orange)"; // ذهبي شامبانيا — اللون الجريء الوحيد، فقط الوتر والخلاصة

const EASE = "cubic-bezier(0.65,0,0.35,1)";

export default function GeometryProofCard() {
  return (
    <div dir="rtl" className="absolute right-[27%] top-6 w-95">
      <div className="relative rounded-lg overflow-hidden bg-neutral-0/40 backdrop-blur-xl border border-nebg-neutral-0/60 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)]">
        {/* لمعة زجاجية قطرية خفيفة أعلى البطاقة */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
          }}
        />

        {/* ترويسة أكاديمية — رقم شكل + عنوان، زجاجية */}
        <div className="relative flex items-center justify-between px-5 pt-4 pb-3 bg-neutral-0/30 backdrop-blur-md">
          <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-neutral-500 uppercase">
            <Ruler size={11} className="text-neutral-500" />
            الشكل ٣
          </span>
          <span className="font-thmanyah-text text-micro italic text-neutral-500/85">
            برهان مساحي — نظرية فيثاغورس
          </span>
        </div>
        <div className="relative h-px bg-neutral-0/50 mx-5" />

        {/* اللوحة الهندسية — زجاجية شبه شفافة */}
        <div className="relative px-4 pt-3 pb-4 flex justify-center bg-neutral-0/15 backdrop-blur-sm">
          <svg viewBox="0 0 300 330" width="300" height="330">
            {/* المثلث القائم */}
            <polygon
              points="110,190 185,190 110,90"
              fill="none"
              stroke={INK}
              strokeWidth="1.5"
              pathLength={1}
              className="proof-triangle"
            />
            {/* علامة الزاوية القائمة */}
            <path
              d="M110,178 L122,178 L122,190"
              fill="none"
              stroke={INK}
              strokeWidth="1.25"
              pathLength={1}
              className="proof-tick"
            />

            {/* المربع على الضلع (a) */}
            <polygon
              points="110,190 110,90 10,90 10,190"
              fill="none"
              stroke={A_COLOR}
              strokeWidth="1.25"
              pathLength={1}
              className="proof-square-a"
            />
            <text
              x="60"
              y="145"
              textAnchor="middle"
              fontFamily="ui-serif, Georgia, serif"
              fontStyle="italic"
              fontSize="15"
              fill={A_COLOR}
              className="proof-label-a"
            >
              a²
            </text>

            {/* المربع على الضلع (b) */}
            <polygon
              points="110,190 185,190 185,265 110,265"
              fill="none"
              stroke={B_COLOR}
              strokeWidth="1.25"
              pathLength={1}
              className="proof-square-b"
            />
            <text
              x="147.5"
              y="232"
              textAnchor="middle"
              fontFamily="ui-serif, Georgia, serif"
              fontStyle="italic"
              fontSize="15"
              fill={B_COLOR}
              className="proof-label-b"
            >
              b²
            </text>

            {/* المربع على الوتر (c) — اللون الجريء الوحيد */}
            <polygon
              points="110,90 185,190 285,115 210,15"
              fill={C_COLOR}
              fillOpacity="0.06"
              stroke={C_COLOR}
              strokeWidth="1.5"
              pathLength={1}
              className="proof-square-c"
            />
            <text
              x="197.5"
              y="107"
              textAnchor="middle"
              fontFamily="ui-serif, Georgia, serif"
              fontStyle="italic"
              fontSize="15"
              fontWeight="600"
              fill={C_COLOR}
              className="proof-label-c"
            >
              c²
            </text>

            {/* الخلاصة — نظرية مؤطّرة بإطار مزدوج، كما في الكتب المدرسية الأصيلة */}
            <rect
              x="57"
              y="280"
              width="181"
              height="36"
              rx="2"
              fill="none"
              stroke={C_COLOR}
              strokeWidth="1.25"
              pathLength={1}
              className="proof-box-outer"
            />
            <rect
              x="61"
              y="284"
              width="173"
              height="28"
              rx="1"
              fill="none"
              stroke={C_COLOR}
              strokeWidth="0.75"
              strokeOpacity="0.5"
              pathLength={1}
              className="proof-box-inner"
            />
            <text
              x="147.5"
              y="303.5"
              textAnchor="middle"
              fontFamily="ui-serif, Georgia, serif"
              fontStyle="italic"
              fontSize="16"
              className="proof-eq-text"
            >
              <tspan fill={A_COLOR} fontWeight="600">a²</tspan>
              <tspan fill={INK_MUTED}> + </tspan>
              <tspan fill={B_COLOR} fontWeight="600">b²</tspan>
              <tspan fill={INK_MUTED}> = </tspan>
              <tspan fill={C_COLOR} fontWeight="600">c²</tspan>
            </text>
          </svg>
        </div>

        <style jsx>{`
          .proof-triangle,
          .proof-tick,
          .proof-square-a,
          .proof-square-b,
          .proof-square-c,
          .proof-box-outer,
          .proof-box-inner {
            stroke-dasharray: 1;
            animation-duration: 9.3s;
            animation-timing-function: ${EASE};
            animation-iteration-count: infinite;
          }
          .proof-label-a,
          .proof-label-b,
          .proof-label-c,
          .proof-eq-text {
            animation-duration: 9.3s;
            animation-timing-function: ${EASE};
            animation-iteration-count: infinite;
          }

          .proof-triangle {
            animation-name: drawTriangle;
          }
          @keyframes drawTriangle {
            0% { opacity: 0; stroke-dashoffset: 1; }
            4% { opacity: 1; stroke-dashoffset: 1; }
            16% { opacity: 1; stroke-dashoffset: 0; }
            84% { opacity: 1; stroke-dashoffset: 0; }
            94% { opacity: 0; }
            100% { opacity: 0; stroke-dashoffset: 1; }
          }

          .proof-tick {
            animation-name: drawTick;
          }
          @keyframes drawTick {
            0%, 14% { opacity: 0; stroke-dashoffset: 1; }
            18% { opacity: 1; stroke-dashoffset: 0; }
            84% { opacity: 1; stroke-dashoffset: 0; }
            94% { opacity: 0; }
            100% { opacity: 0; stroke-dashoffset: 1; }
          }

          .proof-square-a {
            animation-name: drawSquareA;
          }
          @keyframes drawSquareA {
            0%, 18% { opacity: 0; stroke-dashoffset: 1; }
            30% { opacity: 1; stroke-dashoffset: 0; }
            84% { opacity: 1; stroke-dashoffset: 0; }
            94% { opacity: 0; }
            100% { opacity: 0; stroke-dashoffset: 1; }
          }
          .proof-label-a {
            animation-name: fadeLabel;
            animation-delay: 0.05s;
          }

          .proof-square-b {
            animation-name: drawSquareB;
          }
          @keyframes drawSquareB {
            0%, 30% { opacity: 0; stroke-dashoffset: 1; }
            42% { opacity: 1; stroke-dashoffset: 0; }
            84% { opacity: 1; stroke-dashoffset: 0; }
            94% { opacity: 0; }
            100% { opacity: 0; stroke-dashoffset: 1; }
          }
          .proof-label-b {
            animation-name: fadeLabel;
            animation-delay: 1.1s;
          }

          .proof-square-c {
            animation-name: drawSquareC;
          }
          @keyframes drawSquareC {
            0%, 42% { opacity: 0; stroke-dashoffset: 1; }
            56% { opacity: 1; stroke-dashoffset: 0; }
            84% { opacity: 1; stroke-dashoffset: 0; }
            94% { opacity: 0; }
            100% { opacity: 0; stroke-dashoffset: 1; }
          }
          .proof-label-c {
            animation-name: fadeLabel;
            animation-delay: 2.1s;
          }

          @keyframes fadeLabel {
            0% { opacity: 0; }
            34% { opacity: 0; }
            40% { opacity: 1; }
            78% { opacity: 1; }
            88% { opacity: 0; }
            100% { opacity: 0; }
          }

          .proof-box-outer {
            animation-name: drawBoxOuter;
          }
          @keyframes drawBoxOuter {
            0%, 58% { opacity: 0; stroke-dashoffset: 1; }
            68% { opacity: 1; stroke-dashoffset: 0; }
            84% { opacity: 1; stroke-dashoffset: 0; }
            94% { opacity: 0; }
            100% { opacity: 0; stroke-dashoffset: 1; }
          }
          .proof-box-inner {
            animation-name: drawBoxInner;
          }
          @keyframes drawBoxInner {
            0%, 66% { opacity: 0; stroke-dashoffset: 1; }
            74% { opacity: 1; stroke-dashoffset: 0; }
            84% { opacity: 1; stroke-dashoffset: 0; }
            94% { opacity: 0; }
            100% { opacity: 0; stroke-dashoffset: 1; }
          }
          .proof-eq-text {
            animation-name: fadeLabel;
            animation-delay: 4.1s;
          }
        `}</style>
      </div>
    </div>
  );
}