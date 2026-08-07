# Auto-generated setup script for Rawi Academy /curriculum page
# Run this from the rawi-academy repo root in PowerShell: .\setup-curriculum.ps1

$ErrorActionPreference = 'Stop'

Write-Host 'Creating folders...' -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "G:\rawi-academy-website\rawi-academy\app\curriculum" | Out-Null
Write-Host "  dir -> G:\rawi-academy-website\rawi-academy\app\curriculum"
New-Item -ItemType Directory -Force -Path "G:\rawi-academy-website\rawi-academy\app\src\components\curriculum" | Out-Null
Write-Host "  dir -> G:\rawi-academy-website\rawi-academy\app\src\components\curriculum"
New-Item -ItemType Directory -Force -Path "G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum" | Out-Null
Write-Host "  dir -> G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum"

Write-Host 'Writing files...' -ForegroundColor Cyan

$content = @'
import CurriculumHero from "@/src/sections/curriculum/CurriculumHero";
import PhilosophySection from "@/src/sections/curriculum/PhilosophySection";
import StagesSection from "@/src/sections/curriculum/StagesSection";
import AfterLessonSection from "@/src/sections/curriculum/AfterLessonSection";
import SubjectMethodsSection from "@/src/sections/curriculum/SubjectMethodsSection";
import LearningCycleSection from "@/src/sections/curriculum/LearningCycleSection";
import PersonalizedSection from "@/src/sections/curriculum/PersonalizedSection";
import OutcomesSection from "@/src/sections/curriculum/OutcomesSection";
import CurriculumCTASection from "@/src/sections/curriculum/CurriculumCTASection";

export default function CurriculumPage() {
  return (
    <>
      <CurriculumHero />
      <PhilosophySection />
      <StagesSection />
      <AfterLessonSection />
      <SubjectMethodsSection />
      <LearningCycleSection />
      <PersonalizedSection />
      <OutcomesSection />
      <CurriculumCTASection />
    </>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\curriculum\page.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\curriculum\page.tsx"

$content = @'
import SectionContainer from "@/src/components/layout/SectionContainer";
import Reveal from "@/src/components/curriculum/Reveal";

export default function CurriculumHero() {
  return (
    <section dir="rtl" className="relative bg-neutral-0 pt-[150px] pb-[120px] overflow-hidden">
      {/* Brand ribbon motif, offset — not a centered gradient blob */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -top-[60px] -left-[140px] w-[520px] h-[520px] opacity-55 max-md:w-[320px] max-md:h-[320px] max-md:-left-[120px]"
      >
        <path
          d="M20 320 C 90 260, 60 140, 160 100 C 250 65, 300 150, 260 230 C 230 290, 130 270, 140 200"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1.4"
          opacity="0.5"
        />
        <path
          d="M40 340 C 110 280, 80 160, 180 120"
          fill="none"
          stroke="var(--color-primary-alt)"
          strokeWidth="1"
          opacity="0.35"
        />
      </svg>

      <SectionContainer>
        <Reveal className="max-w-[760px] ms-auto me-0">
          <div className="inline-flex items-center gap-2.5 text-caption font-semibold tracking-wide text-primary mb-6 before:content-[''] before:w-[22px] before:h-px before:bg-primary">
            منهجنا
          </div>

          <h1 className="font-thmanyah-display text-hero leading-[1.35] text-neutral-900 mb-7 max-md:text-h2">
            من المعرفة إلى <span className="text-primary">الإتقان</span>، بخطواتٍ
            تعرف إلى أين تقودك.
          </h1>

          <p className="text-lead max-w-[560px] text-neutral-700 max-md:text-body">
            في راوي، لا نبني الدروس لتُشاهَد ثم تُنسى، بل نصمم كل مسار ليأخذ
            المتعلم من بناء الأساس، إلى الفهم، ثم التطبيق، وصولًا إلى مهارة
            يستطيع استخدامها بثقة.
          </p>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\CurriculumHero.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\CurriculumHero.tsx"

$content = @'
import SectionContainer from "@/src/components/layout/SectionContainer";
import Reveal from "@/src/components/curriculum/Reveal";

const steps = ["معرفة", "فهم", "تطبيق", "تقييم", "إتقان"];

export default function PhilosophySection() {
  return (
    <section dir="rtl" className="bg-neutral-100 py-[90px]">
      <SectionContainer>
        <div className="grid grid-cols-[1.1fr_.9fr] gap-[70px] items-center max-md:grid-cols-1 max-md:gap-10">
          <Reveal>
            <h2 className="font-thmanyah-display text-h2 leading-[1.5] text-neutral-900 mb-5 max-md:text-h2-sm">
              التعلّم عندنا رحلة، لا مجموعة دروس.
            </h2>
            <p className="text-body max-w-[460px] text-neutral-700">
              نؤمن أن التعلم الحقيقي لا يحدث بمجرد إنهاء الدروس، بل عندما
              تتحول المعرفة إلى فهم، والفهم إلى ممارسة، والممارسة إلى مهارة
              يمكن الاعتماد عليها.
            </p>
          </Reveal>

          <Reveal>
            <div className="flex flex-col gap-2.5 items-end max-md:items-start">
              {steps.map((step, i) => {
                const sizes = [
                  "text-h3-sm text-neutral-300",
                  "text-h3 text-neutral-300 me-[26px] max-md:me-0",
                  "text-h2-sm text-neutral-300 me-[52px] max-md:me-0",
                  "text-h2 text-neutral-300 me-[78px] max-md:me-0",
                  "text-hero text-primary font-bold me-[104px] max-md:me-0",
                ];
                return (
                  <div
                    key={step}
                    className={`font-thmanyah-display flex items-center gap-3.5 ${sizes[i]}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {step}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\PhilosophySection.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\PhilosophySection.tsx"

$content = @'
import SectionContainer from "@/src/components/layout/SectionContainer";
import Reveal from "@/src/components/curriculum/Reveal";
import JourneyLine from "@/src/components/curriculum/JourneyLine";

const stages = [
  {
    n: "٠١",
    title: "نبدأ من الأساس",
    body: "كل مسار يبدأ من المستوى المناسب للمتعلم، ويبني المعرفة تدريجيًا دون القفز فوق الأساسيات.",
  },
  {
    n: "٠٢",
    title: "نفهم قبل أن نحفظ",
    body: "نشرح المفاهيم بوضوح ونربطها بما يعرفه المتعلم، حتى يفهم الفكرة قبل أن يحفظ تفاصيلها.",
  },
  {
    n: "٠٣",
    title: "نتعلم بالتطبيق",
    body: "نحول المعرفة إلى ممارسة من خلال التمارين والتطبيقات والمشاريع التي تجعل التعلم قابلًا للاستخدام.",
  },
  {
    n: "٠٤",
    title: "نقيس الفهم",
    body: "اختبارات وتقييمات تكشف ما أتقنه المتعلم وما يحتاج إلى مراجعة قبل الانتقال إلى مرحلة جديدة.",
  },
  {
    n: "٠٥",
    title: "نراجع ونتقدم",
    body: "نستخدم نتائج التعلم لتحديد نقاط القوة وما يحتاج إلى مزيد من التدريب، حتى يستمر التقدم بطريقة واضحة.",
  },
  {
    n: "٠٦",
    title: "نصل إلى الإتقان",
    body: "الهدف ليس إنهاء المسار، بل الوصول إلى مستوى يستطيع فيه المتعلم استخدام ما تعلمه بثقة واستقلالية.",
  },
];

export default function StagesSection() {
  return (
    <section dir="rtl" className="relative py-[130px] pb-[100px] max-md:py-[70px]">
      <SectionContainer>
        <Reveal>
          <h2 className="font-thmanyah-display text-h2 max-w-[520px] mb-[90px] max-md:text-h2-sm max-md:mb-14">
            كيف نبني رحلة التعلم؟
          </h2>
        </Reveal>

        <div className="relative">
          <JourneyLine />

          {stages.map((stage, i) => (
            <Reveal
              key={stage.n}
              className={`relative flex items-start gap-6 py-8 max-w-[640px] ${
                i % 2 === 1 ? "ms-[9%] max-md:ms-0" : ""
              }`}
            >
              <div className="relative z-10 flex-none w-[46px] h-[46px] rounded-full border-[1.5px] border-primary text-primary bg-neutral-0 flex items-center justify-center font-thmanyah-display text-h3-sm font-bold">
                {stage.n}
              </div>
              <div>
                <h3 className="text-h3-sm font-semibold text-neutral-900 mb-2">
                  {stage.title}
                </h3>
                <p className="text-body text-neutral-500 max-w-[420px]">
                  {stage.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\StagesSection.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\StagesSection.tsx"

$content = @'
import SectionContainer from "@/src/components/layout/SectionContainer";
import Reveal from "@/src/components/curriculum/Reveal";

const items = [
  {
    title: "متابعة",
    body: "متابعة تقدم الطالب ومعرفة ما يحتاج إلى تطوير.",
  },
  {
    title: "دعم",
    body: "إجابة عن الأسئلة ومساعدة المتعلم على تجاوز الصعوبات.",
  },
  {
    title: "ذكاء اصطناعي",
    body: "مساعدة فورية في الشرح والتدريب والمراجعة.",
  },
];

export default function AfterLessonSection() {
  return (
    <section dir="rtl" className="bg-neutral-900 text-neutral-0 py-[90px]">
      <SectionContainer>
        <Reveal>
          <h2 className="font-thmanyah-display text-h2-sm max-w-[600px] mb-4">
            حين ينتهي الدرس، تبدأ مرحلة أخرى من التعلم.
          </h2>
          <p className="text-body text-neutral-300 max-w-[560px] mb-16">
            لا نريد أن تكون نهاية الدرس نهاية التعلم. لذلك تمتد تجربة راوي إلى
            ما بعد الحصة من خلال المراجعة، والتطبيق، والتقييم، والدعم
            المستمر.
          </p>
        </Reveal>

        <Reveal className="flex max-md:flex-col gap-0 max-md:gap-8">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`flex-1 pe-9 max-md:pe-0 ${
                i > 0
                  ? "ps-9 border-s border-white/15 max-md:ps-0 max-md:border-s-0 max-md:border-t max-md:pt-7"
                  : ""
              }`}
            >
              <div className="w-[26px] h-[2px] bg-primary-alt mb-4.5" />
              <h4 className="text-h3-sm mb-2.5">{item.title}</h4>
              <p className="text-caption text-neutral-300">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </SectionContainer>
    </section>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\AfterLessonSection.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\AfterLessonSection.tsx"

$content = @'
import SectionContainer from "@/src/components/layout/SectionContainer";
import Reveal from "@/src/components/curriculum/Reveal";

// Fixed 1:1 subject → accent color mapping, same as CardHeader's `color` prop
const subjects = [
  { name: "القرآن", tags: ["حفظ", "فهم", "مراجعة"], barClass: "bg-teal-400", offset: "" },
  { name: "البرمجة", tags: ["منطق", "تطبيق", "بناء"], barClass: "bg-purple-400", offset: "mt-[34px] max-md:mt-0" },
  { name: "اللغات", tags: ["فهم", "ممارسة", "تواصل"], barClass: "bg-pink-400", offset: "" },
  { name: "الرياضيات", tags: ["فهم", "تحليل", "حل"], barClass: "bg-orange-400", offset: "mt-[56px] max-md:mt-0" },
];

export default function SubjectMethodsSection() {
  return (
    <section dir="rtl" className="py-[120px] max-md:py-16">
      <SectionContainer>
        <Reveal>
          <h2 className="font-thmanyah-display text-h2-sm max-w-[500px] mb-2">
            لكل علم طريقته، لكن الهدف واحد.
          </h2>
          <p className="text-body text-neutral-500 max-w-[520px] mb-[70px] max-md:mb-10">
            تختلف طبيعة العلوم التي يتعلمها الطالب، لذلك تختلف طريقة تقديمها
            وتطبيقها، بينما تبقى المبادئ التي نبني عليها التجربة واحدة: فهم
            واضح، ممارسة مستمرة، وتقدم حقيقي.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-4 max-md:grid-cols-2 gap-y-11">
          {subjects.map((subj, i) => (
            <div
              key={subj.name}
              className={`px-6 max-md:px-0 ${
                i > 0 ? "border-s border-neutral-200 max-md:border-s-0" : ""
              } ${subj.offset}`}
            >
              <div className={`w-[34px] h-[3px] mb-5.5 ${subj.barClass}`} />
              <h3 className="text-h3-sm text-neutral-900 mb-3">{subj.name}</h3>
              <div className="text-caption text-neutral-500">
                {subj.tags.map((tag, idx) => (
                  <span key={tag}>
                    <b className="font-semibold text-neutral-900">{tag}</b>
                    {idx < subj.tags.length - 1 && " • "}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </SectionContainer>
    </section>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\SubjectMethodsSection.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\SubjectMethodsSection.tsx"

$content = @'
import SectionContainer from "@/src/components/layout/SectionContainer";
import Reveal from "@/src/components/curriculum/Reveal";

const nodes = [
  { label: "تعلّم", x: 260, y: 70 },
  { label: "طبّق", x: 424.5, y: 165 },
  { label: "اختبر", x: 424.5, y: 355 },
  { label: "راجع", x: 260, y: 450 },
  { label: "تقدّم", x: 95.5, y: 355 },
  { label: "أتقن", x: 95.5, y: 165 },
];

export default function LearningCycleSection() {
  return (
    <section dir="rtl" className="bg-neutral-100 py-[110px] pb-[130px] overflow-hidden max-md:py-16">
      <SectionContainer>
        <Reveal>
          <h2 className="font-thmanyah-display text-h2-sm text-center mb-[70px] max-md:mb-10">
            كل خطوة تقود إلى التي بعدها.
          </h2>
        </Reveal>

        <Reveal className="flex justify-center">
          <svg
            viewBox="0 0 520 520"
            className="w-[min(520px,92vw)] h-auto"
          >
            <circle
              cx="260"
              cy="260"
              r="190"
              fill="none"
              stroke="var(--color-primary)"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="4 8"
              className="origin-[260px_260px] animate-[spin_60s_linear_infinite]"
            />
            <polygon
              points="260,70 424.5,165 424.5,355 260,450 95.5,355 95.5,165"
              fill="none"
              stroke="var(--color-neutral-300)"
              strokeWidth="1"
            />
            {nodes.map((node) => (
              <g key={node.label}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="30"
                  fill="var(--color-neutral-0)"
                  stroke="var(--color-primary)"
                  strokeWidth="1.5"
                />
                <text
                  x={node.x}
                  y={node.y + 6}
                  textAnchor="middle"
                  className="text-[15px] font-semibold fill-neutral-900"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </Reveal>

        <Reveal>
          <p className="text-center text-body text-neutral-500 max-w-[480px] mx-auto mt-12">
            لا ينتقل المتعلم في راوي لمجرد أن الدرس انتهى، بل لأن المعرفة
            التي اكتسبها أصبحت أساسًا للخطوة التالية.
          </p>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\LearningCycleSection.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\LearningCycleSection.tsx"

$content = @'
import SectionContainer from "@/src/components/layout/SectionContainer";
import Reveal from "@/src/components/curriculum/Reveal";

const rows = [
  { title: "شرح أبسط", body: "عندما يحتاج المفهوم إلى طريقة أخرى." },
  { title: "تمارين إضافية", body: "عندما يحتاج الطالب إلى مزيد من الممارسة." },
  { title: "مراجعة موجهة", body: "عندما تظهر فجوة في الفهم." },
  { title: "تقدم مستمر", body: "حتى يعرف الطالب أين وصل وما الخطوة التالية." },
];

export default function PersonalizedSection() {
  return (
    <section dir="rtl" className="py-[120px] max-md:py-16">
      <SectionContainer>
        <div className="grid grid-cols-[.9fr_1.1fr] gap-20 max-md:grid-cols-1 max-md:gap-9">
          <Reveal className="sticky top-[100px] self-start max-md:static">
            <h2 className="font-thmanyah-display text-h2-sm mb-4.5">
              لا يتعلم الجميع بالطريقة نفسها.
            </h2>
            <p className="text-body text-neutral-500">
              صُممت راوي لتتعرف على احتياجات المتعلم وتدعمه بما يناسب
              مستواه، بدل تقديم تجربة واحدة للجميع.
            </p>
          </Reveal>

          <Reveal className="flex flex-col">
            {rows.map((row, i) => (
              <div
                key={row.title}
                className={`py-7 border-t border-neutral-200 ${
                  i === rows.length - 1 ? "border-b" : ""
                }`}
              >
                <h4 className="text-h3-sm text-neutral-900 mb-2">
                  {row.title}
                </h4>
                <p className="text-caption text-neutral-500">{row.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\PersonalizedSection.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\PersonalizedSection.tsx"

$content = @'
import SectionContainer from "@/src/components/layout/SectionContainer";
import Reveal from "@/src/components/curriculum/Reveal";

const items = ["معرفة", "مهارة", "ثقة", "استقلالية"];

export default function OutcomesSection() {
  return (
    <section dir="rtl" className="bg-neutral-900 text-neutral-0 py-[130px] text-center max-md:py-20">
      <SectionContainer>
        <Reveal>
          <h2 className="font-thmanyah-display text-h2-sm max-w-[600px] mx-auto mb-[90px] max-md:mb-14">
            لا نريدك أن تنهي المسار، نريدك أن تخرج منه مختلفًا.
          </h2>
        </Reveal>

        <Reveal>
          <div className="flex items-center justify-center gap-6.5 flex-wrap mb-10 max-md:flex-col max-md:gap-3.5">
            {items.map((item, i) => (
              <span key={item} className="flex items-center gap-6.5 max-md:gap-3.5">
                <span className="font-thmanyah-display text-h3 text-neutral-300">
                  {item}
                </span>
                {i < items.length - 1 && (
                  <span className="text-h3-sm text-primary-alt">+</span>
                )}
              </span>
            ))}
          </div>

          <div className="inline-block font-thmanyah-display text-hero font-bold text-neutral-0 pt-8 border-t border-white/18 mt-2.5 max-md:text-h2">
            متعلم أقوى
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\OutcomesSection.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\OutcomesSection.tsx"

$content = @'
import SectionContainer from "@/src/components/layout/SectionContainer";
import Reveal from "@/src/components/curriculum/Reveal";
import Button from "@/src/components/ui/Button";

export default function CurriculumCTASection() {
  return (
    <section dir="rtl" className="py-[130px] pb-[150px] max-md:py-16">
      <SectionContainer>
        <Reveal className="max-w-[560px]">
          <h2 className="font-thmanyah-display text-h2-sm leading-[1.5] text-neutral-900 mb-4.5">
            الخطوة الأولى تبدأ باختيار ما يستحق أن تتعلمه.
          </h2>
          <p className="text-body text-neutral-500 mb-9">
            اختر المجال الذي يناسب أهدافك، وابدأ مسارك التعليمي مع راوي.
          </p>
          <Button variant="primary" size="lg" href="/courses">
            استكشف المسارات
          </Button>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\CurriculumCTASection.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\sections\curriculum\CurriculumCTASection.tsx"

$content = @'
"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Generic fade-up-on-scroll wrapper. Used instead of a per-section
 * IntersectionObserver so every curriculum section gets identical
 * reveal timing/easing for free.
 */
export default function Reveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
      } ${className}`}
    >
      {children}
    </div>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\components\curriculum\Reveal.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\components\curriculum\Reveal.tsx"

$content = @'
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vertical self-drawing line that runs behind the six curriculum stages.
 * Same "self-drawing" motif as FAQSection's answer underline, applied here
 * to a full-height path instead of a short accent.
 */
export default function JourneyLine() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute top-0 bottom-0 right-[6%] w-[2px] md:right-[6%] max-md:right-[22px]"
    >
      <svg
        viewBox="0 0 4 1200"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <path
          d="M2 0 L2 1200"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          style={{
            strokeDasharray: 1400,
            strokeDashoffset: drawn ? 0 : 1400,
            transition: "stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </svg>
    </div>
  );
}

'@
Set-Content -Path "G:\rawi-academy-website\rawi-academy\app\src\components\curriculum\JourneyLine.tsx" -Value $content -Encoding UTF8
Write-Host "  file -> G:\rawi-academy-website\rawi-academy\app\src\components\curriculum\JourneyLine.tsx"

Write-Host 'Done. 10 section/component files + 1 page.tsx created.' -ForegroundColor Green