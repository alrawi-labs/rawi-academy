"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  GraduationCap,
  Play,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SectionContainer } from "../../components/layout/SectionContainer";
import { SectionLede } from "../../components/layout/SectionLede";
import Button from "../../components/ui/Button";
import { useRouter } from "next/navigation";
import { LINKS } from "../../lib/links";
import PromoBanner from "../../components/PromoBanner";

type PillData = {
  icon: LucideIcon;
  label: string;
};

type CourseTrack = {
  id: "quran" | "math" | "code" | "languages";
  title: string;
  description: string;
  accentVar: string;
  // "split-photo": عمود صورة منفصل + عمود محتوى (القرآن).
  // "photo-bg": صورة تغطّي البطاقة كاملة (الرياضيات/اللغات) — لا تُلمس الصورة نفسها.
  // "inset-media": لوحة وسائط مضمّنة بحواف داخلية (محرّر الأكواد).
  layout: "split-photo" | "photo-bg" | "inset-media";
  bgSrc?: string;
};

const COURSE_TRACKS: CourseTrack[] = [
  {
    id: "quran",
    title: "القرآن والسنة",
    description: "حفظ وفهم وتدبّر بمنهج متكامل يرتقي بك في الدنيا والآخرة.",
    accentVar: "var(--color-visual-teal)",
    layout: "split-photo",
  },
  {
    id: "math",
    title: "الرياضيات",
    description: "من الأساسيات إلى المسائل المتقدّمة، بشرح واضح وتطبيق عملي.",
    accentVar: "var(--color-visual-orange)",
    layout: "photo-bg",
    bgSrc: "/courses/bg-math.png",
  },
  {
    id: "code",
    title: "البرمجة",
    description: "منطق وتفكير ومشاريع حقيقية تصنع منك مبرمجًا مميزًا.",
    accentVar: "var(--color-visual-purple)",
    layout: "inset-media",
  },
  {
    id: "languages",
    title: "اللغات",
    description: "تعلّم اللغة لتستخدمها وتتواصل بها بثقة وطلاقة.",
    accentVar: "var(--color-visual-pink)",
    layout: "photo-bg",
    bgSrc: "/courses/bg-languages.png",
  },
];

/* ---------------------------------------------------------------------- */
/* علامات المواد — شكل مختلف تمامًا لكل مادة بدل الشارة الموحّدة           */
/* (مربّع مُدوَّر + أيقونة lucide) التي تتكرر بنفس الهيئة أربع مرات.        */
/* كل علامة هنا مبنية بتركيبة/مادة بصرية مختلفة عن البقية.                 */
/* ---------------------------------------------------------------------- */

// القرآن: زخرفة أشبه بعلامة "وقف/نهاية آية" — نجمة مشعّة حول رقم السورة
// (١٨ = سورة الكهف، بما يتوافق مع لوحة "آخر حفظ" أدناه في البطاقة).
function QuranMark({ accentVar }: { accentVar: string }) {
  return (
    <span className="relative -rotate-2 inline-flex h-12 w-12 shrink-0 items-center justify-center">
      <svg viewBox="0 0 48 48" className="h-12 w-12">
        <circle
          cx="24"
          cy="24"
          r="19"
          fill="none"
          stroke={accentVar}
          strokeWidth="1.4"
          opacity="0.35"
        />
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 24 + Math.cos(angle) * 13;
          const y1 = 24 + Math.sin(angle) * 13;
          const x2 = 24 + Math.cos(angle) * 19;
          const y2 = 24 + Math.sin(angle) * 19;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={accentVar}
              strokeWidth={i % 2 === 0 ? 2.2 : 1.1}
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="24" cy="24" r="8.5" fill={accentVar} opacity="0.12" />
        <circle
          cx="24"
          cy="24"
          r="8.5"
          fill="none"
          stroke={accentVar}
          strokeWidth="1.6"
        />
        <text
          x="24"
          y="27.5"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="700"
          fill={accentVar}
        >
          ١٨
        </text>
      </svg>
    </span>
  );
}

// الرياضيات: بطاقة/ورقة صغيرة مائلة بحواف مقصوصة (لا مستطيل ولا دائرة)،
// عليها معادلة بخط عريض — إحساس "ورقة ملاحظات" لا "أيقونة موضوع".
function MathMark({ accentVar }: { accentVar: string }) {
  return (
    <span
      className="relative -rotate-3 inline-flex h-12 items-center justify-center px-3.5 max-w-sm"
      style={{
        background: `color-mix(in srgb, ${accentVar} 9%, var(--color-neutral-0) 91%)`,
        border: `1.4px solid color-mix(in srgb, ${accentVar} 42%, transparent)`,
        boxShadow: "0 14px 26px -16px rgba(20,16,40,0.4)",
        clipPath: "polygon(0 0, 100% 5%, 95% 100%, 3% 95%)",
      }}
    >
      <span
        className="font-thmanyah-display text-[15px] font-bold leading-none"
        style={{ color: accentVar }}
      >
        x² + 1
      </span>
    </span>
  );
}

// البرمجة: شريحة طرفية (terminal chip) مائلة بالقص (skew)، برمز ">"
// وموشّر نابض — امتداد بصري لمحرّر الأكواد المصغّر في نفس البطاقة.
function CodeMark({ accentVar }: { accentVar: string }) {
  return (
    <span
      className="relative inline-flex h-11 skew-x-[-8deg] items-center gap-2 rounded-md px-3.5"
      style={{
        background: "var(--color-neutral-900)",
        boxShadow: "0 14px 26px -14px rgba(20,16,40,0.55)",
      }}
    >
      <span
        className="skew-x-[8deg] font-mono text-[16px] font-bold leading-none"
        style={{ color: accentVar }}
      >
        {">"}
      </span>
      <span
        className="skew-x-[8deg] h-4 w-[2px] animate-pulse"
        style={{ background: accentVar }}
      />
    </span>
  );
}

// اللغات: مونوغرام ثنائي اللغة متراكب (A لاتينية + أ عربية) بدل فقاعة
// كلام عامة — إحالة مباشرة لفكرة "لغتين تلتقيان" بدون أي حاوية شكلية.
function LanguageMark({ accentVar }: { accentVar: string }) {
  return (
    <span className="relative inline-flex h-12 w-14 shrink-0 items-center">
      <span
        className="font-thmanyah-display absolute end-0 top-0 text-[30px] font-bold leading-none"
        style={{
          color: `color-mix(in srgb, ${accentVar} 55%, var(--color-neutral-300))`,
        }}
      >
        A
      </span>
      <span
        className="font-thmanyah-display absolute start-0 bottom-0 text-[26px] font-bold leading-none"
        style={{ color: accentVar }}
      >
        أ
      </span>
    </span>
  );
}

function SubjectMark({
  id,
  accentVar,
}: {
  id: CourseTrack["id"];
  accentVar: string;
}) {
  switch (id) {
    case "quran":
      return <QuranMark accentVar={accentVar} />;
    case "math":
      return <MathMark accentVar={accentVar} />;
    case "code":
      return <CodeMark accentVar={accentVar} />;
    case "languages":
      return <LanguageMark accentVar={accentVar} />;
  }
}

/* ---------------------------------------------------------------------- */
/* شريحة (pill) مصبوغة بلون المادة بدل الحدود المحايدة العامة              */
/* ---------------------------------------------------------------------- */

function PillChip({
  icon: Icon,
  label,
  accentVar,
}: PillData & { accentVar: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-micro font-medium"
      style={{
        borderColor: `color-mix(in srgb, ${accentVar} 22%, transparent)`,
        background: `color-mix(in srgb, ${accentVar} 8%, var(--color-neutral-0) 92%)`,
        color: `color-mix(in srgb, ${accentVar} 50%, var(--color-neutral-800))`,
      }}
    >
      <Icon size={12} style={{ color: accentVar }} />
      {label}
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/* رابط "استكشف المسارات" — رقاقة سهم دائرية غير مركزية بدل نص+سهم عادي   */
/* ---------------------------------------------------------------------- */

function ExploreLink({ accentVar }: { accentVar: string }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-2 text-caption font-semibold"
      style={{ color: accentVar }}
    >
      استكشف المسارات
      <span
        aria-hidden
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300 group-hover:-translate-x-1"
        style={{
          borderColor: `color-mix(in srgb, ${accentVar} 35%, transparent)`,
          background: `color-mix(in srgb, ${accentVar} 10%, transparent)`,
        }}
      >
        <ArrowLeft size={12} />
      </span>
    </span>
  );
}

function ContentStack({ track }: { track: CourseTrack }) {
  return (
    <>
      <SubjectMark id={track.id} accentVar={track.accentVar} />
      <h3 className="font-thmanyah-display text-h3 sm:text-h2-sm mt-5 text-neutral-950">
        {track.title}
      </h3>
      <p className="font-thmanyah-text text-caption mt-2 line-clamp-2 max-w-[36ch] text-neutral-600">
        {track.description}
      </p>
      <div className="mt-6">
        <ExploreLink accentVar={track.accentVar} />
      </div>
    </>
  );
}




/* الصورة نفسها (bg-quran.png) لم تُمس إطلاقًا — نفس bg-cover bg-right */
function QuranMedia({ accentVar }: { accentVar: string }) {
  return (
    <div className="relative h-48 w-full shrink-0 sm:h-full sm:w-[42%]">
      <div
        className="h-full w-full bg-cover bg-right"
        style={{ backgroundImage: "url('/courses/bg-quran3.png')" }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* خلفية-صورة كاملة للبطاقة — الرياضيات واللغات.                          */
/* لم تُلمس صورة الخلفية (bg-math.png / bg-languages.png) ولا طريقة       */
/* عرضها إطلاقًا، بناءً على طلب المستخدم الصريح.                          */
/* ---------------------------------------------------------------------- */

function CardPhotoBackground({ src }: { src: string }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-neutral-100 bg-cover bg-left"
      style={{ backgroundImage: `url('${src}')` }}
    />
  );
}

/* ---------------------------------------------------------------------- */
/* بطاقة البرمجة — محرّر أكواد مصغّر                                       */
/* محتوى الكود نفسه لم يتغيّر — فقط إضافات على الإطار (شريط أعلوي بلون    */
/* المادة، وسم لغة، نقاط ملوّنة) لإحساس أكثر احترافية.                    */
/* ---------------------------------------------------------------------- */

function CodeLine({
  children,
  dim = false,
}: {
  children: ReactNode;
  dim?: boolean;
}) {
  return (
    <div className={`whitespace-pre ${dim ? "text-neutral-0/40" : ""}`}>
      {children}
    </div>
  );
}

function ProgrammingMedia({ accentVar }: { accentVar: string }) {
  return (
    <div className="relative h-48 w-full shrink-0 p-4 sm:h-full sm:w-[46%] sm:p-6">
      <div className="relative h-full overflow-hidden rounded-xl border border-neutral-0/10 bg-neutral-900 shadow-[0_25px_50px_-24px_rgba(20,16,40,0.55)]">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accentVar} 50%, transparent 100%)`,
          }}
        />

        <div className="flex items-center gap-2 border-b border-neutral-0/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-300/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          <span className="ms-2 text-[10px] text-neutral-0/50">main.js</span>
          <span
            className="ms-auto rounded-full px-2 py-0.5 text-[9px] font-medium"
            style={{
              background: `color-mix(in srgb, ${accentVar} 22%, transparent)`,
              color: accentVar,
            }}
          >
            JS
          </span>
        </div>

        <div
          dir="ltr"
          className="flex min-w-0 gap-3 overflow-x-auto p-3 font-mono text-[10.5px] leading-relaxed sm:text-[11px]"
        >
          <div className="select-none text-neutral-0/25">
            {Array.from({ length: 9 }, (_, i) => (
              <CodeLine key={i}>{i + 1}</CodeLine>
            ))}
          </div>
          <div className="text-neutral-0/80">
            <CodeLine>
              <span style={{ color: accentVar }}>function</span> sort(arr) {"{"}
            </CodeLine>
            <CodeLine>{"  return arr.sort((a, b) => {"}</CodeLine>
            <CodeLine>{"    return a - b;"}</CodeLine>
            <CodeLine>{"  });"}</CodeLine>
            <CodeLine>{"}"}</CodeLine>
            <CodeLine>{"\u00A0"}</CodeLine>
            <CodeLine>
              <span style={{ color: accentVar }}>const</span> numbers = [5, 2,
              9, 1];
            </CodeLine>
            <CodeLine>{"console.log(sort(numbers));"}</CodeLine>
            <CodeLine dim>{"// [1, 2, 5, 9]"}</CodeLine>
          </div>
        </div>
      </div>

      <span
        className="absolute bottom-3 start-8 inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-0 shadow-[0_14px_26px_-10px_rgba(20,16,40,0.5)] sm:start-10"
        style={{ background: accentVar }}
      >
        <Play size={14} fill="currentColor" />
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* البطاقة الرئيسية                                                       */
/* ---------------------------------------------------------------------- */

function CourseTile({
  track,
  index,
  reduced,
}: {
  track: CourseTrack;
  index: number;
  reduced: boolean | null;
}) {
  const isRowSplit =
    track.layout === "split-photo" || track.layout === "inset-media";

  // isRowSplit kartlar (Kur'an/Kod): mobilde medya+metin alt alta dizildiği
  // için sabit oran vermiyoruz — içerik ne kadar yer isterse o kadar
  // büyüyebiliyor. Masaüstünde (sm:) satır düzenine geçtiğinde sabit oranı
  // uyguluyoruz, çünkü orada metin ve medya yan yana olduğu için sıkışma
  // riski yok.
  const layoutClasses = isRowSplit
    ? "flex-col sm:aspect-[2.1/1] sm:min-h-[320px] sm:flex-row"
    : "aspect-[5/4] sm:aspect-[2.1/1] min-h-[300px] sm:min-h-[320px] flex-col";

  const cardStyle: CSSProperties = {
    background: `radial-gradient(140% 120% at 100% -10%, color-mix(in srgb, ${track.accentVar} 12%, transparent) 0%, transparent 55%), var(--color-neutral-0)`,
    boxShadow:
      "0 30px 60px -34px rgba(20,16,40,0.35), 0 10px 24px -18px rgba(20,16,40,0.18), 0 1px 0 rgba(255,255,255,0.7) inset",
  };

  const body = (
    <a
      href={LINKS.courseTrack(track.id)}
      className={
        "course-tile group relative isolate flex w-full min-w-0 overflow-hidden rounded-lg border border-neutral-100 transition-transform duration-300 hover:-translate-y-1 " +
        layoutClasses
      }
      style={cardStyle}
    >
      {track.layout === "split-photo" && (
        <>
          <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center p-6 sm:p-7">
            <ContentStack track={track} />
          </div>
          <QuranMedia accentVar={track.accentVar} />
        </>
      )}

      {track.layout === "inset-media" && (
        <>
          <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center p-6 sm:p-7">
            <ContentStack track={track} />
          </div>
          <ProgrammingMedia accentVar={track.accentVar} />
        </>
      )}

      {track.layout === "photo-bg" && track.bgSrc && (
        <>
          <CardPhotoBackground src={track.bgSrc} />
          <div className="relative z-10 flex h-full w-full min-w-0 flex-col justify-center p-6 sm:p-7">
            <ContentStack track={track} />
          </div>
        </>
      )}
    </a>
  );

  if (reduced) return body;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.5,
        delay: 0.08 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {body}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------- */
/* رأس القسم + بطاقة "لا تعرف أي مجال يناسبك؟"                            */
/* ---------------------------------------------------------------------- */

export function CourseTracksSection() {
  const reduced = useReducedMotion();
  const router = useRouter();

  return (
    <section dir="rtl" className="relative py-20 sm:py-28">
      <SectionContainer>
        <SectionLede
          lead="أربع مجالات، رحلة تعليمية واحدة"
          sub="في راوي، تجمع المعرفة التي تستحق أن تتعلمها في تجربة واحدة؛ من القرآن والسنة، إلى البرمجة والرياضيات واللغات."
        />

        <div className="mt-10 grid min-w-0 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
          {COURSE_TRACKS.map((track, i) => (
            <CourseTile
              key={track.id}
              track={track}
              index={i}
              reduced={reduced}
            />
          ))}
        </div>

        <PromoBanner
          title="لا تعرف أي مجال يناسبك؟"
          description="اختر هدفك وسنساعدك في تحديد المسار الأنسب لك"
          buttonText="ساعدني في الاختيار"
          href={LINKS.support}
        />
      </SectionContainer>
    </section>
  );
}
