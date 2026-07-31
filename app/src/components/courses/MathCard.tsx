"use client";

import { Expand } from "lucide-react";
import MathPlot from "./MathPlot";
import ChalkboardSteps from "./ChalkboardSteps";
import GeometryProofCard from "./GeometryProofCard";
import { BridgeSentence } from "./BridgeSentence";
import { CardHeader } from "./CardHeader";

function DecorativeOverlays() {
  return (
    <>
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

      <svg
        className="absolute -bottom-20 -right-20 w-56 sm:w-72 lg:w-90 h-56 sm:h-72 lg:h-90 pointer-events-none opacity-[0.22]"
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

      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-110 sm:w-140 lg:w-180 h-90 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(242,180,120,0.12) 0%, transparent 70%)",
        }}
      />

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

export default function MathCard() {
  return (
    <div className="relative bg-neutral-0 border border-neutral-200 rounded-lg overflow-hidden shadow-sm lg:col-span-2">
      <CardHeader title="الرياضيات — تفكيرٌ منطقي، خطوة بخطوة" color="orange" />

      <div className="relative h-96 sm:h-105 md:h-115 lg:h-125 mt-2 overflow-hidden bg-neutral-0">
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{
            backgroundImage: "url(/backgrounds/bg-24.png)",
          }}
        />

        <DecorativeOverlays />

        {/* Karmaşık geçiş çizgisi küçük ekranda kalabalık yapıyordu, md ve üstünde gösteriliyor */}
        <div className="hidden md:block">
          <BridgeSentence />
        </div>

        {/* السبورة — يسار */}
        <div className="absolute left-4 sm:left-8 md:left-14 bottom-4 sm:bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 scale-75 sm:scale-90 lg:scale-100 origin-bottom-left md:origin-left">
          <ChalkboardSteps />
        </div>

        {/* قرص الرسم البياني — يمين، ينسحب جزئيًا خارج الإطار */}
        <div className="absolute -right-10 sm:-right-14 lg:-right-16 top-1/2 -translate-y-1/2 w-52 sm:w-72 md:w-90 lg:w-115 h-52 sm:h-72 md:h-90 lg:h-115">
          <MathPlot className="relative w-full h-full" />
        </div>

        {/* بطاقة البرهان الهندسي — المنتصف */}
        <div className="scale-75 sm:scale-90 lg:scale-100 origin-center">
          <GeometryProofCard />
        </div>

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