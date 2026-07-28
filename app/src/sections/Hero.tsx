"use client";

import { ChevronLeft } from "lucide-react";
import HeroGlassBars from "../components/HeroGlassBars";
import MarqueeStrip from "../components/MarqueeStrip";
import Button from "../components/ui/Button";
import { GoogleIcon } from "../components/Icons/GoogleIcon";

export default function Hero() {
  return (
    <section dir="rtl" className="relative overflow-hidden border bg-neutral-0">
      {/* الريبون - نفس أربع قطع الشعار */}
      <div>
        <HeroGlassBars />
      </div>

      <div className="max-w-7xl mx-auto px-30 relative z-10 border">
        <div className="grid grid-cols-1 lg:grid-cols-[5.4fr_0.95fr] items-center min-h-[640px]">
          <div className="pt-[130px] pb-10">
            {/* الإحصائية العلوية */}
            <div className="flex items-center gap-2 mb-7 font-mono text-[13px] text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal" />
              نسبة الطلاب الذين طوّروا مهاراتهم مع راوي:{" "}
              <b className="text-secondary font-medium">92.4%</b>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="font-thmanyah-display font-bold text-[44px] leading-[1.25] tracking-tight">
              <span className="text-secondary">
                أربعة أركان لبناء معرفة تكبر مع أبنائك.{" "}
              </span>
              <br />
              <span className="text-neutral-500">
                القرآن، والبرمجة، واللغات، والرياضيات في مسار تعليمي واحد
                مترابط.
              </span>
              <br />
              <span className="text-neutral-500">
                من الدرس الأول إلى إتقان المهارة الكاملة
              </span>
            </h1>

            {/* أزرار الدعوة للإجراء */}
            <div className="flex items-center gap-3.5 mt-9 flex-wrap">
              <Button
                variant="primary-alt"
                href="#"
                icon={<ChevronLeft className="w-4 h-4" strokeWidth={2.5} />}
              >
                ابدأ الآن
              </Button>
              <Button variant="outline" href="#" icon={<GoogleIcon />}>
                التسجيل عبر جوجل
              </Button>
            </div>
          </div>

          <div />
        </div>
      </div>
      <MarqueeStrip />
    </section>
  );
}
