"use client";

import { ChevronLeft } from "lucide-react";
import HeroGlassBars from "../components/3D/HeroGlassBars";
import MarqueeStrip from "../components/MarqueeStrip";
import Button from "../components/ui/Button";
import { GoogleIcon } from "../components/Icons/GoogleIcon";
import { LINKS } from "../lib/links";

export default function Hero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden border bg-neutral-0 min-h-[100dvh] sm:min-h-[90dvh] md:min-h-[85dvh] lg:min-h-fit flex flex-col"
    >
      {/* Mobilde arka plan derinliği için aurora gradient — sadece lg altında görünür */}
      <div className="absolute inset-0 bg-gradient-aurora opacity-60 lg:hidden pointer-events-none" />

      {/* الريبون - نفس أربع قطع الشعار */}
      <div>
        <HeroGlassBars />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-30 relative z-10 border flex-1 flex">
        <div className="grid grid-cols-1 lg:grid-cols-[5.4fr_0.95fr] items-center flex-1 lg:min-h-160">
          <div className="pt-14 sm:pt-20 md:pt-24 lg:pt-32.5 pb-12 sm:pb-12 lg:pb-10 flex flex-col items-center text-center lg:items-start lg:text-right">
            {/* الإحصائية العلوية */}
            <div className="inline-flex items-center gap-2 my-6 lg:mb-7 px-3.5 py-1.5 font-mono text-micro sm:text-caption text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal shrink-0" />
              <span className="leading-none">
                نسبة الطلاب الذين طوّروا مهاراتهم مع راوي:{" "}
                <b className="text-secondary font-medium">92.4%</b>
              </span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="font-thmanyah-display font-bold text-[1.75rem] leading-[1.25] sm:text-4xl md:text-5xl lg:text-hero lg:leading-tight tracking-tight max-w-[22rem] sm:max-w-lg md:max-w-2xl lg:max-w-none">
              <span className="text-secondary">
                أربعة أركان لبناء معرفة تكبر مع أبنائك.{" "}
              </span>
              <span className="text-neutral-500">
                القرآن، والبرمجة، واللغات، والرياضيات في مسار تعليمي واحد
                مترابط.
              </span>
              <br className="hidden lg:block" />
              <span className="text-neutral-500 block lg:inline mt-1 lg:mt-0">
                من الدرس الأول إلى إتقان المهارة الكاملة
              </span>
            </h1>

            {/* أزرار الدعوة للإجراء */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mt-8 sm:mt-8 lg:mt-9 w-full sm:w-auto">
              <Button
                variant="primary-alt"
                href={LINKS.courses}
                className="w-full sm:w-auto justify-center"
              >
                ابدأ الآن
              </Button>
              {/* <Button
                variant="outline"
                href="#"
                icon={<GoogleIcon />}
                className="w-full sm:w-auto justify-center"
              >
                التسجيل عبر جوجل
              </Button> */}
            </div>
          </div>

          <div />
        </div>
      </div>
      <MarqueeStrip />
    </section>
  );
}