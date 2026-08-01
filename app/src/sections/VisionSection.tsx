"use client";

export default function VisionSection() {
  return (
    <section dir="rtl" className="relative pt-16 sm:pt-20 lg:pt-28 mb-16 sm:mb-20 lg:mb-28">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
        {/* Logo'nun kesim dilinden türetilmiş küçük işaret */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div
            className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] bg-primary"
            style={{
              borderRadius: "5px 1.5px 5px 1.5px",
            }}
          />
        </div>

        <h2 className="font-thmanyah-display text-h2-sm sm:text-h2 lg:text-hero font-semibold tracking-[-0.02em] text-neutral-900 mb-6 sm:mb-8 lg:mb-10">
          رؤيتنا
        </h2>

        <div className="space-y-5 sm:space-y-6 lg:space-y-7">
          <p
            className="font-thmanyah-text text-h3-sm sm:text-h3 leading-[1.85] sm:leading-[1.95] text-neutral-700"
            style={{ textWrap: "pretty" }}
          >
            في أكاديمية راوي، نؤمن أن التعليم الحقيقي لا يُقاس بعدد الدروس
            التي تُشاهَد، بل بالأثر الذي يتركه في عقل المتعلم، والمهارة التي
            يبنيها، والثقة التي يمنحها له.
          </p>

          <p
            className="font-thmanyah-text text-h3-sm sm:text-h3 leading-[1.85] sm:leading-[1.95] text-neutral-700"
            style={{ textWrap: "pretty" }}
          >
            لهذا أنشأنا راوي لتكون منصة عربية تجمع بين المحتوى الاحترافي،
            والتطبيق العملي، والذكاء الاصطناعي، في تجربة تعليمية صُممت 
            لتجعل التعلم أكثر وضوحًا، وأكثر متعة، وأكثر فاعلية.
          </p>

          <p
            className="font-thmanyah-text text-h3-sm sm:text-h3 leading-[1.85] sm:leading-[1.95] text-neutral-700"
            style={{ textWrap: "pretty" }}
          >
            رؤيتنا هي بناء جيل يمتلك المعرفة والمهارة، عبر أربعة مجالات
            تعليمية متكاملة، تُقدَّم وفق أحدث الأساليب التعليمية، مع الحفاظ
            على هوية المتعلم، ليكون مستعدًا لمستقبل سريع التغير، وقادرًا على
            المنافسة أينما كان.
          </p>
        </div>
      </div>
    </section>
  );
}