"use client";

import {SectionContainer} from "@/app/src/components/layout/SectionContainer";

type TajweedStep = {
  number: string;
  title: string;
  description: string;
  emphasis?: string;
  terms?: string[];
};

const STEPS: TajweedStep[] = [
  {
    number: "01",
    title: "مخارج الحروف",
    description:
      "تعلّم من أين يخرج كل حرف، وكيف تميّز بين الحروف المتشابهة في النطق.",
    terms: ["الجوف", "الحلق", "اللسان", "الشفتان", "الخيشوم"],
  },
  {
    number: "02",
    title: "صفات الحروف",
    description:
      "تعرّف على الصفات التي تميّز الحروف، وتعرف كيف تؤثر في طريقة نطقها.",
    terms: ["الاستعلاء", "الاستفال", "الشدة", "الرخاوة", "الهمس", "الجهر"],
  },
  {
    number: "03",
    title: "أحكام النون الساكنة والتنوين",
    description: "تتعلّم الأحكام التي تظهر عند قراءة النون الساكنة والتنوين.",
    terms: ["الإظهار", "الإدغام", "الإقلاب", "الإخفاء"],
  },
  {
    number: "04",
    title: "أحكام الميم الساكنة",
    description: "تتعلم كيفية نطق الميم الساكنة بحسب الحرف الذي يأتي بعدها.",
    terms: ["الإظهار الشفوي", "الإدغام الشفوي", "الإخفاء الشفوي"],
  },
  {
    number: "05",
    title: "المدود",
    description: "تعرف متى يُمدّ الصوت، وكم مقدار المد في كل موضع.",
    terms: [
      "المد الطبيعي",
      "المد المتصل",
      "المد المنفصل",
      "المد اللازم",
      "المد العارض للسكون",
    ],
  },
  {
    number: "06",
    title: "التفخيم والترقيق",
    description: "تتعلّم متى يكون صوت الحرف مفخّمًا ومتى يكون مرقّقًا.",
    terms: ["الراء", "لام لفظ الجلالة", "حروف الاستعلاء"],
  },
  {
    number: "07",
    title: "أحكام اللام والراء",
    description: "تطبيق خاص على أكثر المواضع التي تحتاج إلى دقة أثناء التلاوة.",
  },
  {
    number: "08",
    title: "الوقف والابتداء",
    description: "تتعلم أين تقف، وأين تبدأ، وكيف تحافظ على المعنى أثناء القراءة.",
    terms: ["وقف صحيح", "ابتداء صحيح", "تجنب الوقف المخل بالمعنى"],
  },
  {
    number: "09",
    title: "التطبيق على القرآن",
    emphasis: "وهنا أهم جزء.",
    description:
      "لا نتعلم التجويد لنعرف القاعدة، بل لِنقرأ بها. يقرأ الطالب آيات من القرآن، ثم يطبّق الأحكام التي تعلّمها ويصحح أخطاءه مع المعلم.",
  },
];

/** Ayet sonu işaretini çağrıştıran özel rozet — dosya-lokal (§6). */
function AyahMarker({ number, filled }: { number: string; filled?: boolean }) {
  const petals = [
    [52, 28],
    [45, 45],
    [28, 52],
    [11, 45],
    [4, 28],
    [11, 11],
    [28, 4],
    [45, 11],
  ];

  return (
    <svg
      viewBox="0 0 56 56"
      className="h-12 w-12 sm:h-14 sm:w-14 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      {petals.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={2}
          className={filled ? "fill-visual-teal" : "fill-visual-teal/45"}
        />
      ))}
      <circle
        cx="28"
        cy="28"
        r="20"
        className={
          filled
            ? "fill-visual-teal"
            : "fill-visual-teal/[0.12] stroke-visual-teal"
        }
        strokeWidth={filled ? 0 : 1.5}
      />
      <text
        x="28"
        y="28"
        dy="0.35em"
        textAnchor="middle"
        className={`font-thmanyah-text text-[13px] font-semibold ${
          filled ? "fill-neutral-900" : "fill-visual-teal"
        }`}
      >
        {number}
      </text>
    </svg>
  );
}

function TermsRow({ terms }: { terms: string[] }) {
  return (
    <p className="font-thmanyah-text text-caption text-neutral-500 mt-3 leading-6">
      {terms.map((term, i) => (
        <span key={term}>
          {i > 0 && <span className="text-visual-teal mx-2">·</span>}
          {term}
        </span>
      ))}
    </p>
  );
}

export default function TajweedSection() {
  return (
    <section dir="rtl" className="relative bg-neutral-900 py-20 sm:py-28">
      <SectionContainer>
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-20">
          {/* Sağ sütun — sticky lede, dark zeminde manuel kontrast kontrolü */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="font-thmanyah-text text-caption text-visual-teal font-semibold tracking-wide">
              التجويد
            </span>
            <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 text-neutral-0 leading-[1.3] mt-3">
              اقرأ القرآن كما أُنزل
            </h2>
            <p className="font-thmanyah-text text-body text-neutral-400 leading-7 mt-5 max-w-[420px]">
              تعلّم قواعد التجويد بالتدرّج، وطبّقها مباشرة أثناء التلاوة حتى
              تصبح القراءة الصحيحة عادةً لا مجموعة قواعد تحفظها.
            </p>
          </div>

          {/* Sol sütun — bağlayıcı çizgili dikey adım yolu */}
          <ol className="relative flex flex-col gap-10 sm:gap-12">
            <div className="absolute top-6 bottom-6 right-6 w-px bg-neutral-800 lg:right-7" />

            {STEPS.map((step, i) => {
              const isLast = i === STEPS.length - 1;
              return (
                <li
                  key={step.number}
                  className={`relative flex gap-5 sm:gap-6 ${
                    i % 2 === 1 ? "lg:pr-6" : ""
                  } ${
                    isLast
                      ? "bg-visual-teal/[0.08] border border-visual-teal/25 rounded-lg p-5 sm:p-7 -mt-2"
                      : ""
                  }`}
                >
                  <AyahMarker number={step.number} filled={isLast} />

                  <div className="pt-1">
                    <h4 className="font-thmanyah-display font-bold text-h3-sm text-neutral-0">
                      {step.title}
                    </h4>

                    {step.emphasis && (
                      <p className="font-thmanyah-text text-body text-visual-teal font-semibold mt-2">
                        {step.emphasis}
                      </p>
                    )}

                    <p className="font-thmanyah-text text-body text-neutral-400 leading-7 mt-2 max-w-[560px]">
                      {step.description}
                    </p>

                    {step.terms && <TermsRow terms={step.terms} />}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </SectionContainer>
    </section>
  );
}