"use client";

import { ChevronLeft } from "lucide-react";

export default function Hero() {
  return (
    <section dir="rtl" className="relative overflow-hidden bg-white">
      {/* الريبون - نفس أربع قطع الشعار */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          viewBox="0 0 900 640"
          preserveAspectRatio="xMinYMid slice"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id="rib1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7C6CFF" />
              <stop offset="100%" stopColor="#5B4FE8" />
            </linearGradient>
            <linearGradient id="rib2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5B4FE8" />
              <stop offset="100%" stopColor="#22D3B8" />
            </linearGradient>
            <linearGradient id="rib3" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#22D3B8" />
              <stop offset="100%" stopColor="#8FF0DE" />
            </linearGradient>
            <linearGradient id="rib4" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B7AEFF" />
              <stop offset="100%" stopColor="#7C6CFF" />
            </linearGradient>
          </defs>
          <g opacity="0.95" transform="scale(-1,1) translate(-900,0)">
            <path d="M -50 -50 L 260 -50 L 60 220 L -50 220 Z" fill="url(#rib1)" />
            <path d="M 300 -60 L 560 -60 L 220 380 L -20 380 Z" fill="url(#rib4)" opacity="0.9" />
            <path d="M 560 -60 L 780 -60 L 360 560 L 160 560 Z" fill="url(#rib2)" />
            <path d="M 760 -60 L 950 -60 L 620 690 L 430 690 Z" fill="url(#rib3)" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center min-h-[640px]">
          <div className="pt-[130px] pb-10">
            {/* الإحصائية العلوية */}
            <div className="flex items-center gap-2 mb-7 font-mono text-[13px] text-[#6E6E85]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3B8]" />
              نسبة الطلاب الذين طوّروا مهاراتهم مع راوي:{" "}
              <b className="text-[#09090B] font-medium">92.4%</b>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="font-thmanyah-display font-bold text-[44px] leading-[1.25] tracking-tight max-w-[620px]">
              <span className="text-[#09090B]">
                أربعة أركان لبناء معرفة تكبر مع أبنائك.{" "}
              </span>
              <span className="text-[#5F6B85]">
                القرآن، والتقنية، واللغات، والعلوم في مسار تعليمي واحد
                مترابط — من الدرس الأول إلى إتقان المهارة الكاملة.
              </span>
            </h1>

            {/* أزرار الدعوة للإجراء */}
            <div className="flex items-center gap-3.5 mt-9 flex-wrap">
              <a
                href="#"
                className="flex items-center gap-2 bg-[#5B4FE8] text-white font-bold text-[15.5px] px-6 py-3.5 rounded-lg hover:bg-[#4d42d1] transition-colors"
              >
                ابدأ الآن
                <ChevronLeft size={15} />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-white text-[#09090B] font-semibold text-[15.5px] px-5 py-3.5 rounded-lg border border-[var(--border-color)] hover:border-[#cfcfe0] transition-colors"
              >
                <svg width="17" height="17" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.86 2.7-6.62z" />
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 009 18z" />
                  <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 013.68 9c0-.59.1-1.17.27-1.7V4.97H.98A9 9 0 000 9c0 1.45.35 2.83.98 4.03l2.97-2.33z" />
                  <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 00.98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
                </svg>
                التسجيل عبر جوجل
              </a>
            </div>
          </div>

          <div />
        </div>
      </div>

      {/* شريط الجهات الموثوقة */}
      <div className="relative z-10 border-t border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex items-center gap-12 py-8 flex-wrap opacity-80">
            <span className="text-[14px] text-[#6E6E85] font-medium whitespace-nowrap">
              موثوق من قِبل مراكز ومدارس تعليمية
            </span>
            <div className="flex items-center gap-11 flex-wrap">
              <span className="font-thmanyah-display font-bold text-[16px] text-[#8A8AA0]">مسار</span>
              <span className="font-thmanyah-display font-bold text-[16px] text-[#8A8AA0]">إتقان</span>
              <span className="font-thmanyah-display font-bold text-[16px] text-[#8A8AA0]">ينبوع</span>
              <span className="font-thmanyah-display font-bold text-[16px] text-[#8A8AA0]">الرسالة</span>
              <span className="font-thmanyah-display font-bold text-[16px] text-[#8A8AA0]">بيان</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}