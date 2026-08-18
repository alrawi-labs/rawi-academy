"use client";

import { useState } from "react";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * تركيبة "عنوان ثابت + أكورديون" — نفس نمط FAQSection المستخدم في باقي
 * الموقع. العمود الثابت (`lg:sticky`) يبقى في الجهة اليمنى لأن الصفحة
 * RTL، والأكورديون يشغل الباقي. بدل أيقونة +/‏− جاهزة، المؤشر عبارة عن
 * خطين رفيعين بلون العلامة (`visual-orange`) يتحولان من زائد إلى شرطة
 * عند الفتح — إمضاء بصري متّسق مع الخط القصير في بطاقات المعلمين، وليس
 * أيقونة عامة من مكتبة خارجية.
 */

const MATH_FAQS = [
  {
    question: "هل كورسات الرياضيات مناسبة للمبتدئين؟",
    answer:
      "نعم، توجد مسارات تناسب مختلف المستويات، ويمكن للطالب البدء من المستوى الذي يناسب معرفته الحالية.",
  },
  {
    question: "هل أحتاج إلى معرفة سابقة بالرياضيات؟",
    answer: "ليس بالضرورة. بعض المسارات تبدأ من الأساسيات، ثم تبني المفاهيم خطوةً بخطوة.",
  },
  {
    question: "كيف أعرف المستوى المناسب لي؟",
    answer:
      "نساعدك في تحديد نقطة البداية بناءً على مستواك الحالي، والمرحلة الدراسية، والهدف الذي تريد الوصول إليه.",
  },
  {
    question: "هل تركزون على الحفظ أم الفهم؟",
    answer:
      "نركز على الفهم أولًا؛ نريد للطالب أن يعرف لماذا تعمل القاعدة وكيف يستخدمها، وليس أن يحفظ خطوات الحل فقط.",
  },
  {
    question: "هل توجد تمارين وتطبيقات بعد الدروس؟",
    answer: "نعم، التطبيق جزء أساسي من التعلم، لأن فهم الفكرة يكتمل عندما يستطيع الطالب استخدامها بنفسه.",
  },
  {
    question: "ماذا لو كان الطالب ضعيفًا جدًا في الرياضيات؟",
    answer:
      "لا مشكلة. المهم أن يبدأ من النقطة الصحيحة. نبني الأساس تدريجيًا بدل القفز إلى مفاهيم لم تترسخ بعد.",
  },
  {
    question: "هل الدروس مباشرة أم مسجلة؟",
    answer:
      "تختلف طريقة تقديم الدروس بحسب البرنامج، وتتوفر المسارات التي تعتمد على التفاعل المباشر والتوجيه أثناء التعلم.",
  },
  {
    question: "هل يتابع المعلم مستوى الطالب وتقدمه؟",
    answer: "نعم، الهدف ليس إنهاء الدروس فقط، بل معرفة مدى فهم الطالب وما يحتاج إلى مزيد من التدريب عليه.",
  },
  {
    question: "هل يمكن الدراسة من الهاتف؟",
    answer: "نعم، يمكن متابعة التعلم من الهاتف والكمبيوتر والأجهزة اللوحية التي تدعم منصة راوي.",
  },
  {
    question: "هل الرياضيات التي أتعلمها ستفيدني خارج الدراسة؟",
    answer:
      "بالتأكيد. تعلم الرياضيات يدربك على التحليل، وتفكيك المشكلات، وربط الأفكار، والوصول إلى الحل بطريقة منظمة.",
  },
];

export function MathFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section dir="rtl" className="bg-neutral-100 pt-28 lg:pt-36">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
          {/* العنوان الثابت */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="mt-3 font-thmanyah-display text-h2 text-neutral-900">
                أسئلة قد تكون
                <br />
                في بالك
              </h2>
            </div>
          </div>

          {/* الأكورديون */}
          <div className="lg:col-span-8">
            <ul className="border-t border-neutral-200">
              {MATH_FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <li key={faq.question} className="border-b border-neutral-200">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-6 text-right"
                    >
                      <span
                        className={`font-thmanyah-display text-h3-sm transition-colors ${
                          isOpen ? "text-neutral-900" : "text-neutral-700"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span className="relative h-4 w-4 shrink-0">
                        <span className="bg-visual-orange absolute top-1/2 right-0 h-[1.5px] w-4 -translate-y-1/2" />
                        <span
                          className={`bg-visual-orange absolute top-1/2 right-0 h-[1.5px] w-4 -translate-y-1/2 origin-center transition-transform duration-300 ${
                            isOpen ? "rotate-0 scale-x-0" : "rotate-90"
                          }`}
                        />
                      </span>
                    </button>

                    <div
                      className={`grid overflow-hidden transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <p className="font-thmanyah-text text-body max-w-xl leading-relaxed text-neutral-600">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default MathFAQSection;