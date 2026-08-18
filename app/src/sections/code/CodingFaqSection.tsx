"use client";

import { useState } from "react";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/* ----------------------------------------------------------------------- */
/* أسئلة شائعة — نسخة داكنة. أكورديون بعمودين، كل عمود يعمل بشكل مستقل.     */
/* الحركة الوحيدة هي فتح/إغلاق الإجابة (grid-template-rows) وتدوير أيقونة  */
/* +/‑. لا شيء آخر متحرك.                                                  */
/* ----------------------------------------------------------------------- */

type FaqItem = { question: string; answer: string };

const FAQS: FaqItem[] = [
  {
    question: "هل أحتاج إلى معرفة سابقة بالبرمجة؟",
    answer:
      "لا. توجد مسارات تبدأ معك من الأساسيات، وتنتقل بك خطوة بخطوة حتى تبدأ ببناء مشاريعك بنفسك.",
  },
  {
    question: "ماذا سأتعلم في مسار البرمجة؟",
    answer:
      "ستتعلم أساسيات البرمجة، تطوير الويب، التعامل مع التقنيات الحديثة، وبناء مشاريع عملية، ويختلف المحتوى بحسب المسار الذي تختاره.",
  },
  {
    question: "هل سأتعلم البرمجة من خلال المشاريع؟",
    answer:
      "نعم. نحرص على أن لا يبقى التعلم نظريًا، لذلك ستطبق ما تتعلمه من خلال تمارين ومشاريع تزداد في مستواها مع تقدمك.",
  },
  {
    question: "هل أتعلم فقط كتابة الأكواد أم أفهم كيف تعمل الأشياء؟",
    answer:
      "الهدف ليس أن تحفظ الأوامر، بل أن تفهم طريقة التفكير التي تمكنك من حل المشكلات وكتابة الكود بنفسك.",
  },
  {
    question: "هل أستطيع تعلم البرمجة إذا كنت مبتدئًا تمامًا؟",
    answer:
      "نعم. لا تحتاج إلى أن تكون لديك خبرة سابقة، المهم أن تبدأ بالمسار المناسب لمستواك وتستمر في التطبيق.",
  },
  {
    question: "ما اللغات والتقنيات التي سأتعلمها؟",
    answer:
      "يختلف ذلك بحسب المسار، وتشمل رحلة البرمجة تقنيات مثل HTML وCSS وJavaScript وPython وReact وغيرها من الأدوات المستخدمة في بناء المشاريع الحديثة.",
  },
  {
    question: "هل أستطيع التعلم من الهاتف؟",
    answer:
      "يمكنك متابعة الدروس والمحتوى من الأجهزة التي تدعم منصة راوي، لكن تجربة كتابة الكود وبناء المشاريع تكون أفضل باستخدام الكمبيوتر.",
  },
  {
    question: "كيف أعرف أي مسار برمجي مناسب لي؟",
    answer:
      "إذا كنت في البداية، نساعدك على اختيار المسار الذي يناسب مستواك وهدفك، سواء كنت تريد تعلم أساسيات البرمجة أو التخصص في مجال معين.",
  },
  {
    question: "هل يوجد تطبيق وتمارين أثناء التعلم؟",
    answer:
      "نعم. التعلم لا يعتمد على مشاهدة الدروس فقط، بل يتضمن التطبيق والتمارين والمشاريع حتى يتحول ما تعلمته إلى مهارة حقيقية.",
  },
  {
    question: "هل أستطيع بناء مشاريع أضعها في معرض أعمالي؟",
    answer:
      "نعم، المشاريع جزء أساسي من الرحلة، والهدف أن تخرج من التعلم وأنت قادر على عرض أعمال فعلية صنعتها بنفسك.",
  },
  {
    question: "هل البرمجة مناسبة للأطفال والمبتدئين؟",
    answer:
      "نعم، يمكن أن تبدأ رحلة البرمجة من سن مبكرة، مع اختيار المحتوى والمسار الذي يناسب عمر الطالب ومستواه.",
  },
  {
    question: "ماذا لو توقفت أو واجهت مشكلة أثناء التعلم؟",
    answer:
      "لن يكون عليك حل كل مشكلة وحدك؛ يمكنك الاستفادة من الدعم والمتابعة المتاحة لك خلال رحلتك التعليمية.",
  },
  {
    question: "هل يمكنني تعلم البرمجة والانتقال من المستوى المبتدئ إلى المتقدم؟",
    answer:
      "نعم، صُممت المسارات على مراحل حتى تتمكن من بناء أساس قوي ثم الانتقال تدريجيًا إلى مواضيع ومشاريع أكثر تقدمًا.",
  },
  {
    question: "هل سأتعلم الذكاء الاصطناعي أيضًا؟",
    answer:
      "يمكن أن يتضمن مسار البرمجة مشاريع وتطبيقات مرتبطة بالذكاء الاصطناعي بحسب المرحلة والمسار، بحيث تتعلم استخدامه كأداة لبناء مشاريع حقيقية وليس كمجرد موضوع نظري.",
  },
];

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <span
      className="relative w-6 h-6 rounded-full border shrink-0 flex items-center justify-center transition-colors duration-300"
      style={{
        borderColor: open
          ? "var(--color-visual-purple)"
          : "color-mix(in srgb, var(--color-neutral-0) 18%, transparent)",
      }}
    >
      <span
        className="absolute w-2.5 h-px transition-colors duration-300"
        style={{
          background: open ? "var(--color-visual-purple)" : "var(--color-neutral-0)",
        }}
      />
      <span
        className="absolute h-2.5 w-px transition-[transform,background-color] duration-300"
        style={{
          background: open ? "var(--color-visual-purple)" : "var(--color-neutral-0)",
          transform: open ? "scaleY(0)" : "scaleY(1)",
        }}
      />
    </span>
  );
}

function FaqColumn({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className="border-b"
            style={{
              borderColor: "color-mix(in srgb, var(--color-neutral-0) 12%, transparent)",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-right"
              aria-expanded={isOpen}
            >
              <span className="font-thmanyah-display font-bold text-base sm:text-lg text-neutral-0 leading-snug">
                {item.question}
              </span>
              <PlusMinusIcon open={isOpen} />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 font-thmanyah-text text-body text-neutral-400 leading-7 max-w-[480px]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CodingFaqSection() {
  const left = FAQS.filter((_, i) => i % 2 === 0);
  const right = FAQS.filter((_, i) => i % 2 === 1);

  return (
    <section dir="rtl" className="relative bg-neutral-900 py-20 sm:py-28">
      <SectionContainer>
        <div className="max-w-[620px]">
          <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 text-neutral-0 leading-[1.35]">
            أسئلة يتكرر سؤالها
          </h2>
          <p className="font-thmanyah-text text-body text-neutral-400 leading-7 mt-5">
            قبل أن تبدأ، اطّلع على إجابات أكثر الأسئلة التي تصلنا حول رحلة
            تعلّم البرمجة.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-12 mt-12 sm:mt-16">
          <FaqColumn items={left} />
          <FaqColumn items={right} />
        </div>
      </SectionContainer>
    </section>
  );
}