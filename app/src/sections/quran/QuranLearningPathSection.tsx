"use client";

import { BookOpenCheck } from "lucide-react";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

type Stage = {
  word: string;
  description: string;
  status: "done" | "current" | "upcoming";
};

const STAGES: Stage[] = [
  { word: "تعلّم", description: "تعرف على القاعدة", status: "done" },
  { word: "طبّق", description: "جرّبها على كلمات وآيات", status: "done" },
  { word: "اقرأ", description: "اقرأ أمام المعلم", status: "current" },
  { word: "صحّح", description: "اعرف خطأك وكيف تصلحه", status: "upcoming" },
  {
    word: "ثبّت",
    description: "كرّر حتى تصبح القراءة طبيعية",
    status: "upcoming",
  },
];

/** Eyebrow yanındaki ince süsleme — arka plandaki altın diagonal çizgiyle konuşuyor. */
function Flourish() {
  return (
    <svg width="28" height="10" viewBox="0 0 28 10" className="shrink-0">
      <line
        x1="0"
        y1="5"
        x2="18"
        y2="5"
        stroke="var(--color-visual-orange)"
        strokeWidth="1"
        strokeOpacity="0.6"
      />
      <circle cx="24" cy="5" r="2.5" className="fill-visual-orange/70" />
    </svg>
  );
}

function StagePathPanel() {
  return (
    <div
      className="relative w-full sm:w-[420px] rounded-lg overflow-hidden bg-neutral-0/55 backdrop-blur-2xl border border-neutral-0/80 -rotate-1 lg:-rotate-1.5"
      style={{
        boxShadow:
          "0 40px 80px -30px color-mix(in srgb, var(--color-visual-teal) 35%, transparent), 0 2px 0 0 rgba(255,255,255,0.6) inset",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 30%, transparent 55%)",
        }}
      />

      <div className="relative flex items-center justify-between px-6 sm:px-7 py-5 border-b border-neutral-900/[0.06]">
        <div className="flex items-center gap-3">
          <span
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(150deg, color-mix(in srgb, var(--color-visual-teal) 22%, transparent), color-mix(in srgb, var(--color-visual-teal) 8%, transparent))",
              boxShadow:
                "inset 0 0 0 1px color-mix(in srgb, var(--color-visual-teal) 30%, transparent)",
            }}
          >
            <BookOpenCheck size={15} className="text-visual-teal" />
          </span>
          <span className="text-caption font-bold text-neutral-900">
            مسارك في التلاوة
          </span>
        </div>
        <span className="text-[10px] font-semibold text-visual-teal border border-visual-teal/35 px-2.5 py-1 rounded-lg bg-visual-teal/[0.06]">
          3 من 5
        </span>
      </div>

      <ol className="relative flex flex-col gap-4.5 px-6 sm:px-7 pt-5 pb-6">
        <div className="absolute top-6 bottom-8 right-[31px] sm:right-[35px] w-px bg-neutral-900/10" />
        {STAGES.map((stage) => (
          <li key={stage.word} className="relative flex items-start gap-4">
            <span
              className={`relative z-10 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border ${
                stage.status === "done"
                  ? "bg-visual-teal border-visual-teal"
                  : stage.status === "current"
                    ? "bg-neutral-0 border-visual-teal ring-4 ring-visual-teal/15"
                    : "bg-neutral-0 border-neutral-900/15"
              }`}
            >
              {stage.status === "done" ? (
                <span className="text-neutral-0 text-[11px] font-bold">✓</span>
              ) : stage.status === "current" ? (
                <span className="w-2 h-2 rounded-lg bg-visual-teal animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-lg bg-neutral-900/20" />
              )}
            </span>

            <div className="pt-0.5">
              <p
                className={`text-caption font-bold ${
                  stage.status === "upcoming"
                    ? "text-neutral-400"
                    : "text-neutral-900"
                }`}
              >
                {stage.word}
              </p>
              <p
                className={`text-[11px] mt-0.5 ${
                  stage.status === "upcoming"
                    ? "text-neutral-400"
                    : "text-neutral-600"
                }`}
              >
                {stage.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="relative px-6 sm:px-7 pb-6">
        <div className="w-full h-1.5 rounded-lg bg-neutral-900/[0.06] overflow-hidden">
          <div
            className="h-full rounded-lg"
            style={{
              width: "60%",
              background:
                "linear-gradient(90deg, var(--color-visual-teal), color-mix(in srgb, var(--color-visual-teal) 60%, var(--color-visual-orange)))",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function QuranLearningPathSection() {
  return (
    <section dir="rtl" className="relative py-24 sm:py-32 overflow-hidden">
      <SectionContainer>
        <div
          className="relative rounded-lg overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url(/backgrounds/bg-37.png)",
          }}
        >
          {/* Sadece üst/alt kenarlarda çok hafif okunabilirlik vinyeti — ortadaki şeritler tam renginde kalıyor */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.18) 100%)",
            }}
          />

          <div className="relative flex flex-col lg:flex-row items-center gap-14 lg:gap-20 p-8 sm:p-16 lg:p-24">
            {/* Sağ — başlık paneli */}
            <div
              className="relative z-10 w-full lg:w-[45%] rounded-lg bg-neutral-0/55 backdrop-blur-2xl border border-neutral-0/80 p-7 sm:p-9"
              style={{
                boxShadow:
                  "0 30px 60px -25px rgba(20,16,40,0.15), 0 1px 0 0 rgba(255,255,255,0.7) inset",
              }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-caption text-visual-teal font-semibold tracking-wide">
                  خمس مراحل
                </span>
                <Flourish />
              </div>
              <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 text-neutral-900 leading-[1.35] mt-4">
                رحلةٌ واضحة من أول آية إلى إتقان التلاوة
              </h2>
              <p className="font-thmanyah-text text-body text-neutral-600 leading-7 mt-5 max-w-[420px]">
                راوي لا يكتفي بتقديم الدروس، بل يرافقك من فهم القاعدة إلى أن
                تصبح القراءة الصحيحة جزءًا طبيعيًا من تلاوتك.
              </p>
            </div>

            {/* Sol — cam panel, hafif eğimli, asimetrik */}
            <div className="relative z-10 w-full lg:w-[55%] flex justify-center lg:justify-start lg:mt-4">
              <StagePathPanel />
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
