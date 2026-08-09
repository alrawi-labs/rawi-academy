"use client";

import { useState } from "react";
import Button from "@/app/src/components/ui/Button";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "هل كورسات القرآن مناسبة للمبتدئين؟",
    answer:
      "نعم، توجد مسارات تناسب المبتدئ، كما يمكن اختيار المسار المناسب بحسب مستوى الطالب الحالي.",
  },
  {
    question: "ما الأعمار المناسبة لكورسات القرآن؟",
    answer:
      "تختلف الفئات العمرية بحسب المسار، لذلك يمكن اختيار البرنامج الأنسب لعمر الطالب ومستواه.",
  },
  {
    question: "هل يجب أن يكون الطالب حافظًا للقرآن من قبل؟",
    answer:
      "لا. تختلف متطلبات البداية من مسار إلى آخر، وهناك برامج تبدأ من الأساسيات.",
  },
  {
    question: "هل الدروس مباشرة أم مسجلة؟",
    answer:
      "تتوفر الدروس المباشرة في البرامج التي تعتمد على التفاعل مع المعلم وتصحيح أداء الطالب، وقد تختلف طريقة تقديم المحتوى بحسب المسار.",
  },
  {
    question: "هل يتابع المعلم مستوى الطالب؟",
    answer:
      "نعم، تعتمد تجربة التعلم على متابعة مستوى الطالب وتقدمه، وليس على مشاهدة الدروس فقط.",
  },
  {
    question: "هل يمكن الدراسة من الهاتف؟",
    answer:
      "نعم، يمكن للطالب متابعة تعلّمه من الأجهزة التي تدعم منصة راوي، بما فيها الهاتف والكمبيوتر والأجهزة اللوحية.",
  },
  {
    question: "هل توجد مراجعة لما تم تعلمه؟",
    answer:
      "نعم، المراجعة جزء أساسي من رحلة تعلم القرآن، وتختلف آليتها بحسب البرنامج والمسار.",
  },
  {
    question: "كيف أعرف أي مسار يناسبي؟",
    answer:
      "يمكنك التواصل مع فريق راوي، وسنساعدك في اختيار المسار الأنسب بناءً على عمرك ومستواك والهدف الذي تريد الوصول إليه.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`relative border-r-2 pr-5 sm:pr-6 transition-colors duration-300 ${
        isOpen ? "border-visual-teal" : "border-neutral-200"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-right py-5"
      >
        <span
          className={`font-thmanyah-display text-body sm:text-lead leading-snug transition-colors duration-300 ${
            isOpen
              ? "font-bold text-neutral-900"
              : "font-semibold text-neutral-500"
          }`}
        >
          {item.question}
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="font-thmanyah-text text-caption sm:text-body text-neutral-600 leading-7 pb-6 max-w-[520px]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function QuranFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section dir="rtl" className="relative py-20 sm:py-28 bg-neutral-0">
      <SectionContainer>
        <div className="grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-20">
          {/* Sağ — sticky başlık + iletişim kartı */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-caption text-visual-teal font-semibold tracking-wide">
              الأسئلة الشائعة
            </span>
            <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 text-neutral-900 leading-[1.35] mt-3">
              أسئلة قد تدور في بالك
            </h2>
            <p className="font-thmanyah-text text-body text-neutral-600 leading-7 mt-5 max-w-[340px]">
              كل مسار له تفاصيله الخاصة، لكن هذه الإجابات تغطي أكثر ما يُسأل عنه
              قبل التسجيل.
            </p>

            <div
              className="relative mt-8 rounded-2xl overflow-hidden border border-visual-teal/20 p-6"
              style={{
                background:
                  "linear-gradient(160deg, color-mix(in srgb, var(--color-visual-teal) 8%, var(--color-neutral-0)) 0%, var(--color-neutral-0) 60%)",
              }}
            >
              {/* Köşede ince dekoratif motif — markanın nokta-desen dilinden */}
              <div className="absolute -top-3 -left-3 grid grid-cols-4 gap-1.5 opacity-30 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 h-1 rounded-full bg-visual-teal"
                  />
                ))}
              </div>

              <span className="inline-flex w-8 h-8 rounded-full bg-visual-teal/10 border border-visual-teal/25 items-center justify-center">
                <span className="text-teal-900" >؟</span>
              </span>

              <p className="font-thmanyah-display text-body font-bold text-neutral-900 mt-3.5">
                لم تجد إجابتك؟
              </p>
              <p className="text-[11.5px] text-neutral-500 leading-6 mt-1.5 max-w-[240px]">
                تواصل مع فريق راوي، وسنساعدك في اختيار المسار الأنسب لعمرك
                ومستواك.
              </p>

              <div className="mt-5">
                <Button className="bg-teal-400 hover:bg-teal-500" href="/contact" variant="primary" size="sm">
                  تواصل معنا
                </Button>
              </div>
            </div>
          </div>

          {/* Sol — accordion */}
          <div className="flex flex-col">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={item.question}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
