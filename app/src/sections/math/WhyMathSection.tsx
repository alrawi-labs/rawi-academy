"use client";

import { ChevronLeft } from "lucide-react";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Button  from "@/app/src/components/ui/Button";

/**
 * WhyMathSection — "لماذا الرياضيات، ولماذا راوي"
 *
 * A single glass panel floating over the brand's aurora gradient — the
 * established "floating panel over gradient" pattern (see design system §4),
 * not a full-bleed glass background. Inside, the panel steps down in
 * opacity by role: header (text) → body (the two-argument list) → footer
 * (CTA), exactly like the existing subject-card anatomy.
 *
 * Two arguments, not five bullets: why mathematics itself is worth the
 * time (orange — the subject's own accent), and why Rawi specifically
 * (purple — the brand accent). No invented statistics; the case rests on
 * method, which is what Rawi can actually back up.
 */

type Reason = {
  n: string;
  title: string;
  body: string;
};

const MATH_REASONS: Reason[] = [
  {
    n: "01",
    title: "طريقة تفكير",
    body: "الرياضيات تدرّب عقلك على تفكيك أي مشكلة إلى خطوات واضحة — مهارة تستخدمها في كل مجال، لا في الامتحان فقط.",
  },
  {
    n: "02",
    title: "أساس لكل شيء",
    body: "من البرمجة إلى الهندسة والاقتصاد، كل تخصص تقني يقوم على نفس الأساس الرياضي الذي تبنيه اليوم.",
  },
  {
    n: "03",
    title: "تدريب على الدقة",
    body: "تتعلّم الوصول إلى إجابة واحدة صحيحة عبر منطق واضح، خطوة تلو الأخرى — لا عبر التخمين.",
  },
  {
    n: "04",
    title: "ثقة تدوم",
    body: "حين تفهم الفكرة بدل حفظها، تبقى معك هذه الثقة في كل مادة ومرحلة تأتي بعدها.",
  },
];

const RAWI_REASONS: Reason[] = [
  {
    n: "01",
    title: "الفهم قبل الحفظ",
    body: "نبني كل درس من سؤال «لماذا» قبل سؤال «كيف»، فيبقى ما تتعلّمه معك بعد الامتحان بوقت طويل.",
  },
  {
    n: "02",
    title: "رحلة واحدة متصلة",
    body: "من الأساسيات إلى الإتقان، بلا قفزات ولا فجوات — كل درس يبني مباشرة على الذي قبله.",
  },
  {
    n: "03",
    title: "متابعة حقيقية",
    body: "مجموعات صغيرة مع مدرّب يعرف اسمك ومستواك، لا مقعد في قاعة مليئة بالوجوه.",
  },
  {
    n: "04",
    title: "بالعربية، لك",
    body: "شرح بلغتك وبأسلوب يفهم سياقك، لا ترجمة حرفية لمنهج صُمّم لطالب آخر.",
  },
];

function ReasonList({
  label,
  reasons,
  accent,
}: {
  label: string;
  reasons: Reason[];
  accent: "orange" | "primary";
}) {
  return (
    <div>
      <span className="text-micro font-medium tracking-[0.08em] text-neutral-600">
        {label}
      </span>
      <ul className="mt-6 divide-y divide-white/50">
        {reasons.map((reason) => (
          <li key={reason.n} className="flex gap-4 py-6 first:pt-0">
            <span
              className="font-mono text-caption text-orange shrink-0 pt-0.5"
            >
              {reason.n}
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-thmanyah-display text-h3-sm text-neutral-900">
                {reason.title}
              </h3>
              <p className="font-thmanyah-text text-body text-neutral-700 leading-relaxed max-w-md">
                {reason.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhyMathSection() {
  return (
    <section dir="rtl" className="relative overflow-hidden bg-neutral-100 py-24 lg:py-36">

      <SectionContainer>
        <div className="relative mx-auto max-w-[1040px] overflow-hidden rounded-[28px] border border-white/60 bg-white/40 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)] backdrop-blur-xl">
          {/* diagonal glare */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
            }}
          />

          {/* header — text zone */}
          <div className="relative bg-white/30 px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
            <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 text-neutral-900 leading-[1.3] mt-4 max-w-[620px]">
              تعلّم الرياضيات لتفهم العالم.
              <br />
              تعلّمها معنا لتفهمها فعلًا.
            </h2>
            <p className="font-thmanyah-text text-body text-neutral-700 leading-7 mt-5 max-w-[560px]">
              قبل أن تختار الكورس المناسب، من المهم أن تعرف لماذا الرياضيات
              نفسها تستحق وقتك — ولماذا نؤمن أن الطريقة التي نُعلّمها بها تصنع
              فرقًا حقيقيًا.
            </p>
          </div>

          {/* body — the two arguments */}
          <div className="relative bg-white/15 px-8 py-10 sm:px-12 lg:px-16 lg:py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12">
              <div className="md:border-l md:border-white/50 md:pl-14">
                <ReasonList label="لماذا الرياضيات" reasons={MATH_REASONS} accent="orange" />
              </div>
              <div className="lg:pl-14">
                <ReasonList label="لماذا راوي" reasons={RAWI_REASONS} accent="primary" />
              </div>
            </div>
          </div>

          {/* footer — CTA, grounded and more opaque */}
          <div className="relative bg-white/85 px-8 py-8 sm:px-12 lg:px-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-white/60">
            <p className="font-thmanyah-text text-h3-sm text-neutral-700 max-w-md">
              ابدأ من حيث أنت، ودعنا نأخذك خطوة بخطوة نحو فهم حقيقي 
            </p>
            <Button href="/math" variant="orange-solid" size="md">
           تواصل معنا
            </Button>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}