"use client";

import { Expand } from "lucide-react";
import MathPlot from "./MathPlot";
import ChalkboardSteps from "./ChalkboardSteps";
import GeometryProofCard from "./GeometryProofCard";
import { BridgeSentence } from "./BridgeSentence";
import { CardHeader } from "./CardHeader";

/**
 * Purely decorative background layers stacked over the card's photo
 * background: a fine grain texture (bottom half only, masked), golden
 * ratio guide lines, a single faint Fibonacci-style ring in the
 * bottom-right corner, a soft warm glow, and a subtle ground shadow
 * at the bottom edge. None of these carry content — they exist only
 * to add visual depth and warmth behind the math illustrations.
 */
function DecorativeOverlays() {
  return (
    <>
      {/* نسيج حبيبي دقيق جدًا — محصور بالنصف السفلي فقط عبر قناع تدرّجي، فلا يمسّ البياض العلوي إطلاقًا */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
        style={{
          opacity: 0.05,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 40%, black 75%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 40%, black 75%)",
        }}
      >
        <filter id="mathGrainLight">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#mathGrainLight)" />
      </svg>

      {/* خطوط إرشادية بنسب القسمة الذهبية — بلون العلامة التجارية للموقع */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        style={{ opacity: 0.5 }}
      >
        <line
          x1="309"
          y1="0"
          x2="309"
          y2="500"
          stroke="#8059E8"
          strokeWidth="0.5"
          strokeOpacity="0.18"
        />
        <line
          x1="491"
          y1="0"
          x2="491"
          y2="500"
          stroke="#8059E8"
          strokeWidth="0.5"
          strokeOpacity="0.18"
        />
        <line
          x1="0"
          y1="191"
          x2="800"
          y2="191"
          stroke="#8059E8"
          strokeWidth="0.5"
          strokeOpacity="0.13"
        />
        <line
          x1="0"
          y1="309"
          x2="800"
          y2="309"
          stroke="#8059E8"
          strokeWidth="0.5"
          strokeOpacity="0.13"
        />
      </svg>

      {/* حلقة بيكار واحدة، خافتة جدًا — أثر هندسي وحيد أسفل اليمين */}
      <svg
        className="absolute -bottom-20 -right-20 w-90 h-90 pointer-events-none opacity-[0.22]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="46" stroke="#8059E8" strokeWidth="0.35" />
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke="#8059E8"
          strokeWidth="0.25"
          strokeDasharray="1 2.5"
        />
      </svg>

      {/* دفء برتقالي خافت جدًا أسفل الإطار — إحساس ضوء طبيعي منخفض لا توهّج مبتذل */}
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-180 h-90 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(242,180,120,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ظل أرضي خفيف جدًا عند الحافة السفلية — يمنح ثقلًا بصريًا هادئًا دون قتامة */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(60,45,110,0.05) 0%, transparent 100%)",
        }}
      />
    </>
  );
}

/**
 * MathCard — course showcase card for the "الرياضيات" subject, part
 * of the CoursesSection grid. Spans two grid columns (`lg:col-span-2`),
 * same width treatment as `LanguagesCard`.
 *
 * Layer order over the photo background:
 * 1. `DecorativeOverlays` — local; grain, guide lines, ring, glow, shadow.
 * 2. `BridgeSentence` — shared; self-drawing line from "basics" to a
 *    spiral, echoing the same golden-ratio motif as the corner ring.
 * 3. `ChalkboardSteps` — shared; animated algebra solve (left).
 * 4. `MathPlot` — shared; animated function plot disc (right, bleeds
 *    outside the card frame).
 * 5. `GeometryProofCard` — shared; animated Pythagorean proof (center).
 *
 * Route: starts as a near-straight line (the basics), gradually curves
 * into the beginning of a golden spiral (the hardest problems) — same
 * logic as the ring in the bottom-right corner, but here the shape
 * itself "completes" the idea.
 */
export default function MathCard() {
  return (
    <div className="relative bg-neutral-0 border border-neutral-200 rounded-lg overflow-hidden shadow-sm lg:col-span-2">
      <CardHeader title="الرياضيات — تفكيرٌ منطقي، خطوة بخطوة" color="orange" />


      <div className="relative h-125 mt-2 overflow-hidden bg-neutral-0">
        {/* الأساس: يتدرّج بنفس ألوان بطاقة المتابعة */}
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{
            backgroundImage: "url(/backgrounds/bg-24.png)",
          }}
        />

        <DecorativeOverlays />

        {/* الجملة الجسر — خط يرسم نفسه من البساطة إلى الالتفاف الحلزوني، بنفس منطق الفكرة */}
        <BridgeSentence />

        {/* السبورة — يسار */}
        <div className="absolute left-10 md:left-14 top-1/2 -translate-y-1/2 z-20">
          <ChalkboardSteps />
        </div>

        {/* قرص الرسم البياني — يمين، ينسحب جزئيًا خارج الإطار */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-115 h-115">
          <MathPlot className="relative w-full h-full" />
        </div>

        {/* بطاقة البرهان الهندسي — المنتصف */}
        <GeometryProofCard />

        {/*
          NOT: Bu div şu an içerik taşımıyor (LanguagesCard'daki
          CyclingHeadline ile aynı konumda/boyutta ama metin/CyclingWord
          eklenmemiş) — kasıtlı bir "yer tutucu" mu yoksa unutulmuş bir
          taslak mı belirsiz. İçerik eklenmeyecekse kaldırılabilir.
        */}
        <div
          dir="rtl"
          className="absolute right-[8%] top-1/2 -translate-y-1/2 z-10 w-75 text-center pointer-events-none"
        >
          <div className="absolute -inset-8 rounded-[40%] bg-neutral-0/60 blur-3xl -z-10" />
        </div>
      </div>
    </div>
  );
}