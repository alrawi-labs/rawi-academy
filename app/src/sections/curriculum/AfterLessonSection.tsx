import Image from "next/image";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";

const items = [
  {
    title: "متابعة",
    body: "تتبّع تقدّم الطالب ونقاط تطوره إجابة الأسئلة وتجاوز الصعوبات.",
  },
  {
    title: "دعم جميع الاعمار",
    body: "معارف لا ترتبط بعمر، بل ترافق الإنسان طوال حياته.",
  },
  {
    title: "شهادات",
    body: "إثبات لما تعلّمه الطالب وأنجزه.",
  },
  {
    title: "اختبارات",
    body: "تكشف نقاط القوة وما يحتاج مراجعة.",
  },
  {
    title: "مجتمع ينمو معك",
    body: "مساحة للمشاركة والتحفيز المستمر.",
  },
  {
    title: "ذكاء اصطناعي",
    body: "شرح وتدريب ومراجعة فورية.",
    featured: true,
  },
];

export default function AfterLessonSection() {
  return (
    <section dir="rtl" className="relative bg-neutral-900 text-neutral-0 py-[90px] overflow-hidden">
      {/* الصورة الخلفية — مقيّدة بعرض 7xl */}
      <div className="absolute inset-0 z-0 max-w-7xl mx-auto">
        <Image
          src="/backgrounds/dark/bg-2.png" // ضع مسار الصورة الفعلية هنا
          alt=""
          fill
          priority={false}
          className="object-cover"
        />
      </div>

      {/* تعتيم عام فوق الصورة — لضمان وضوح النص الأبيض فوقها */}
      <div className="absolute inset-0 z-10 bg-neutral-900/55" />

      {/* تلاشٍ من الأسفل يعود إلى الأسود الصلب، ليندمج القسم بما يليه */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-2/3"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgb(9,9,11) 0%, rgba(9,9,11,0.85) 35%, transparent 100%)",
        }}
      />

      {/* المحتوى فوق الصورة والتعتيم */}
      <div className="relative z-20">
        <SectionContainer>
          <Reveal>
            <h2 className="font-thmanyah-display text-h2-sm max-w-[600px] mb-4">
              بعد الدرس، تبدأ رحلة أخرى.
            </h2>
            <p className="font-thmanyah-text text-body text-neutral-400 max-w-[560px] mb-16 leading-relaxed">
              مراجعة، تطبيق، وتقييم مستمر بعد كل حصة.
            </p>
          </Reveal>

          <Reveal className="flex items-end max-md:flex-col max-md:items-stretch max-md:gap-10">
            {items.map((item, i) => (
              <div
                key={item.title}
                className={`pe-9 max-md:pe-0 ${
                  item.featured ? "flex-[1.4] pb-2" : "flex-1"
                } ${
                  i > 0
                    ? "ps-9 border-s border-white/15 max-md:ps-0 max-md:border-s-0 max-md:border-t max-md:pt-8"
                    : ""
                }`}
              >
                <div
                  className={`h-[2px] mb-4.5 bg-primary-alt ${
                    item.featured ? "w-[52px]" : "w-[26px]"
                  }`}
                />
                <h4
                  className={`mb-2.5 font-thmanyah-display ${
                    item.featured ? "text-lead text-primary" : "text-h3-sm"
                  }`}
                >
                  {item.title}
                </h4>
                <p
                  className={`text-caption ${
                    item.featured
                      ? "text-neutral-200 max-w-[260px]"
                      : "text-neutral-400"
                  }`}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </Reveal>
        </SectionContainer>
      </div>
    </section>
  );
}