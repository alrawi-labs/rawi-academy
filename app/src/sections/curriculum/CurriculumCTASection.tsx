"use client";

import Button from "@/app/src/components/ui/Button";

export default function CurriculumCTASection() {
  return (
    <section className="relative pt-16 sm:pt-20 lg:pt-28 mb-30">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="relative bg-neutral-900 border border-neutral-900 rounded-lg overflow-hidden shadow-sm">
          <div
            className="relative overflow-hidden sm:min-h-[480px]"
            style={{
              backgroundImage: "url('/backgrounds/dark/bg-1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* تعتيم بسيط أسفل الصورة فقط، حيث تجلس اللوحة */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(9,9,11,0.1) 0%, rgba(9,9,11,0.25) 55%, rgba(9,9,11,0.65) 100%)",
              }}
            />

            <div
              dir="rtl"
              className="relative z-10 flex items-center justify-center h-full p-6 sm:p-16"
            >
              {/* اللوحة الزجاجية — نظيفة، بلا مصادر ضوء إضافية */}
              <div className="w-full sm:w-[560px] rounded-sm bg-neutral-0/[0.08] backdrop-blur-2xl border border-neutral-0/[0.14] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] p-8 sm:p-12 flex flex-col items-center text-center">
          

                <h3 className="font-thmanyah-display font-bold text-h3-sm sm:text-h2-sm leading-[1.35] text-neutral-0">
                  الخطوة الأولى تبدأ باختيار ما يستحق أن تتعلمه.
                </h3>

                <p className="font-thmanyah-text text-caption sm:text-body leading-6 sm:leading-7 text-neutral-300 mt-5 mb-10 max-w-[400px]">
                  اختر المجال الذي يناسب أهدافك، وابدأ مسارك التعليمي مع راوي.
                </p>

                <Button href="/courses" variant="primary" size="lg">
                  استكشف المسارات
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
