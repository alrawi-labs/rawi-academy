"use client";

import { CardHeader } from "./CardHeader";
import CardInteractiveShell from "./CardInteractiveShell";
import QuranCoursesList from "./QuranCoursesList";

function BrowserMockup() {
  return (
    <div
      dir="ltr"
      className="absolute right-[26%] sm:right-[28%] top-5 sm:top-8 lg:top-10 w-[64%] sm:w-[62%] bg-neutral-0 rounded-xl border border-black/5 scale-[0.72] sm:scale-90 lg:scale-100 origin-top-right"
      style={{
        boxShadow:
          "0 30px 60px -20px color-mix(in srgb, var(--color-primary) 25%, transparent)",
      }}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-black/5">
        <span className="w-2 h-2 rounded-full bg-neutral-200" />
        <span className="w-2 h-2 rounded-full bg-neutral-200" />
        <span className="w-2 h-2 rounded-full bg-neutral-200" />
        <span className="mx-auto text-micro text-neutral-400">
          rawi.academy/quran
        </span>
      </div>
      <div dir="rtl" className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-micro font-semibold text-primary">
            سورة الكهف
          </span>
          <span className="text-[10px] font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">
            التفسير
          </span>
        </div>
        <p className="font-thmanyah-text text-[14px] leading-8 text-neutral-700 mt-3 line-clamp-3 sm:line-clamp-4 lg:line-clamp-none">
          الثناء على الله بصفاته التي كلُّها أوصاف كمال، وبنعمه الظاهرة
          والباطنة، الدينية والدنيوية، الذي تفضَّل فأنزل على عبده ورسوله محمد
          صلى الله عليه وسلم القرآن، ولم يجعل فيه شيئًا من الميل عن الحق.
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5">
          <span className="text-[12px] text-neutral-400">
            تفسير الآية الأولى
          </span>
          <span className="text-[12px] font-semibold text-visual-teal">
            تم الفهم بإتقان
          </span>
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="absolute right-3 sm:right-4 bottom-0 w-52.5 scale-[0.58] sm:scale-[0.72] md:scale-[0.85] lg:scale-100 origin-bottom-right">
      <div
        className="rounded-[38px] p-1 border-2 border-neutral-200 bg-neutral-100 opacity-95"
        style={{
          boxShadow:
            "0 40px 70px -25px color-mix(in srgb, var(--color-primary) 40%, transparent)",
        }}
      >
        <div className="rounded-[30px] overflow-hidden bg-neutral-0">
          {/* Status bar */}
          <div
            dir="ltr"
            className="relative h-9 flex items-center justify-between px-5 pt-1.5"
          >
            <span className="text-[10px] font-semibold text-neutral-900">
              9:41
            </span>
            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-16 h-4 bg-neutral-900 rounded-full" />
            <div className="flex items-center gap-1">
              <div className="w-3 h-2 rounded-[1px] border border-neutral-900/70 relative">
                <div className="absolute inset-px right-px bg-neutral-900/70 rounded-[1px]" />
              </div>
            </div>
          </div>

          <div dir="rtl" className="px-4 pb-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-micro font-bold text-neutral-900">
                سورة الكهف
              </span>
              <span className="text-[10px] text-neutral-400">الجزء 15</span>
            </div>

            {/* Progress ring — %68 tamamlanma, sabit değer (bkz. not: dinamikleştirilebilir) */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="27"
                    fill="none"
                    stroke="var(--color-neutral-100)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="27"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 27}
                    strokeDashoffset={2 * Math.PI * 27 * (1 - 0.68)}
                  />
                </svg>
                <div
                  dir="ltr"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-caption font-bold text-neutral-900">
                    68%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-100 rounded-xl px-3.5 py-3.5 mb-3">
              <p className="font-thmanyah-text text-caption leading-loose text-neutral-700 text-center">
                الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ
                وَلَمْ يَجْعَل لَّهُ عِوَجًا
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-primary text-primary text-[8px] mx-1 align-middle">
                  ١
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2.5 mb-4">
              <button
                type="button"
                aria-label="تشغيل التلاوة"
                className="w-7 h-7 shrink-0 rounded-full bg-primary flex items-center justify-center"
              >
                <span className="w-0 h-0 border-y-4 border-y-transparent border-r-[6px] border-r-neutral-0 -mr-0.5" />
              </button>
              <div className="flex-1 h-1 rounded-full bg-neutral-100 overflow-hidden">
                <div className="h-full w-[40%] rounded-full bg-primary" />
              </div>
              <span dir="ltr" className="text-[9px] text-neutral-400">
                1:12
              </span>
            </div>

            <button className="w-full py-2.5 rounded-lg bg-neutral-900 text-neutral-0 text-micro font-semibold">
              متابعة الحفظ
            </button>

            <div className="flex items-center justify-around mt-4 pt-3 border-t border-black/5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuranSunnahCard() {
  return (
    <CardInteractiveShell
      accent="teal"
      title="القرآن الكريم والسنة — حفظٌ وفهمٌ يوميّ"
      description="تفسير ميسّر ومتابعة حفظ تفاعلية، بمنهجٍ متدرّج يواكب عمر الطالب ومستواه."
      modalContent={<QuranCoursesList accent="teal" />}
    >
      <div
        className="relative bg-neutral-0 border-2 border-neutral-200 group-hover:border-teal-400/40
          rounded-lg overflow-hidden shadow-sm 
          transition-[border-color,box-shadow] duration-300"
      >
        <CardHeader
          title="القرآن الكريم والسنة — حفظٌ وفهمٌ يوميّ"
          color="teal"
        />

        <div
          className="relative h-84 sm:h-92 md:h-100 lg:h-105 mt-4 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url(/backgrounds/bg-19.png)",
          }}
        >
          <BrowserMockup />
          <PhoneMockup />
        </div>
      </div>
    </CardInteractiveShell>
  );
}