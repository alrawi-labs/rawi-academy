"use client";

type Step = {
  title: string;
  description: string;
  image: string;
};

const steps: Step[] = [
  {
    title: "اختر الدورة المناسبة",
    description:
      "استكشف دوراتنا المتنوعة واختر الدورة الأنسب لأهدافك واهتماماتك.",
    image: "/backgrounds/bg-6.png",
  },
  {
    title: "تعلّم وطبّق",
    description:
      "تابع الدروس التفاعلية، نفّذ التطبيقات العملية، واستفد من دعم الذكاء الاصطناعي.",
    image: "/backgrounds/bg-8.png",
  },
  {
    title: "أتقن وانطلق",
    description:
      "طوّر مهاراتك، أكمل متطلبات الدورة، واحصل على شهادة تُفتح لك أبواب الفرص.",
    image: "/backgrounds/bg-7.png",
  },
];

const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

function toArabicNumeral(num: number) {
  return String(num)
    .split("")
    .map((d) => arabicDigits[Number(d)])
    .join("");
}

export default function HowToStartSection() {
  return (
    <section dir="rtl" style={{ backgroundColor: "#F7F8FC" }} className="py-16">
      <div className="max-w-7xl mx-auto px-10">
        <div className="max-w-xl mb-10">
          <h3 className="font-thmanyah-display font-extrabold text-[26px] leading-[1.3] text-[#09090B]">
            كيف تبدأ؟
          </h3>
          <p className="font-thmanyah-text text-[14px] leading-7 text-[#3F3F52] mt-3 text-justify">
            رحلتك من اختيار الدورة إلى إتقان المهارة، صمّمنا كل خطوة لتكون واضحة
            وبسيطة، ليبقى تركيزك على التعلّم لا غير.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-lg overflow-hidden h-[180px] border border-[#E4E7ED]"
              style={{
                backgroundImage: `url('${step.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-x-3 bottom-3 rounded-lg bg-white/45 backdrop-blur-xl border border-white/60 p-5 text-center shadow-[0_20px_45px_-18px_rgba(20,16,40,0.35)]">
                <p className="font-thmanyah-display text-[25px] font-bold text-[#09090B] mb-3">
                  {toArabicNumeral(index + 1)} {". "} {step.title}
                </p>
                <p className="font-thmanyah-text text-[15px] leading-[1.7] text-[#3F3F52] text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}