"use client";

import Button from "@/app/src/components/ui/Button";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { PremiumGradientBar } from "@/app/src/components/3D/PremiumGradientBar";

import { FAQAskInput } from "@/app/src/components/3D/QuestionMarkPanel";

export default function FAQHero() {
  const handleScrollToFaq = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section dir="rtl" className="relative overflow-hidden bg-neutral-100">
      <PremiumGradientBar offsetY={250} />

      <SectionContainer>
        <div className="relative grid grid-cols-1 gap-10 py-24 sm:py-28 lg:grid-cols-[1fr_minmax(0,360px)] lg:gap-16 lg:py-36 mb-50">
          {/* النص الرئيسي — يمين الشاشة (RTL)، غير مُمركز */}
          <div className="max-w-2xl">
            <h1 className="mt-6 font-thmanyah-display text-h2-sm font-bold leading-[1.25] text-neutral-900 sm:text-hero">
              أسئلة قد تكون في بالك
            </h1>

            <p className="mt-6 max-w-lg font-thmanyah-text text-body leading-[1.9] text-neutral-700 sm:text-lead sm:leading-[1.8]">
              قبل أن تبدأ رحلتك في راوي، جمعنا لك إجابات واضحة عن المسارات،
              وطريقة التعلم، والمتابعة، وكل ما قد يشغل بالك قبل التسجيل.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#faq" variant="primary" size="lg" onClick={handleScrollToFaq}>
                استعرض الأسئلة
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                تواصل معنا
              </Button>
            </div>
          </div>

          {/* لوحة زجاجية عائمة — غير مُمركزة، منزاحة لأسفل يسار العمود الثاني */}
          <div className="relative hidden lg:block mt-25">
            <FAQAskInput />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}