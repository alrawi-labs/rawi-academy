"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const arabicNumerals = ["١", "٢", "٣", "٤", "٥", "٦"];

const faqs = [
  {
    q: "هل أحتاج خبرة سابقة؟",
    a: "لا، تبدأ جميع الدورات من المستوى المناسب، سواء كنت مبتدئًا أو لديك أساسيات مسبقة.",
  },
  {
    q: "هل توجد شهادة بعد الإكمال؟",
    a: "نعم، تحصل على شهادة بعد إتمام الدورة بنجاح.",
  },
  {
    q: "هل يمكنني التعلم من الهاتف؟",
    a: "نعم، يمكنك الوصول إلى الدروس من الهاتف أو الحاسوب في أي وقت.",
  },
  {
    q: "هل توجد متابعة أثناء التعلم؟",
    a: "نعم، نوفر متابعة ودعمًا يساعدك على الاستمرار والتقدم بثقة.",
  },
  {
    q: "هل المحتوى مناسب للأطفال؟",
    a: "نعم، توجد دورات مخصصة للأطفال بأسلوب تعليمي مبسط ومناسب لأعمارهم.",
  },
  {
    q: "كيف أبدأ؟",
    a: "اختر الدورة المناسبة لك، ثم ابدأ رحلتك التعليمية بخطوات واضحة ومتدرجة.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      dir="rtl"
      className="bg-neutral-100 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,320px)_1fr] gap-8 sm:gap-10 md:gap-20">
        {/* Sağ sütun — sabit başlık bloğu */}
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 leading-[1.35] text-neutral-900">
            اسئلة شائعة
          </h2>
          <div className="w-10 h-[3px] rounded-full bg-primary mt-5 sm:mt-7" />
        </div>

        {/* Sol sütun — soru listesi */}
        <div className="flex flex-col">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="border-b border-neutral-200 first:border-t">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start gap-3 sm:gap-4 py-5 sm:py-6 text-right group"
                >
                  <span
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-caption font-semibold font-thmanyah-text transition-colors ${
                      isOpen
                        ? "border-primary text-primary bg-primary-light"
                        : "border-neutral-300 text-neutral-500 group-hover:border-primary group-hover:text-primary"
                    }`}
                  >
                    {arabicNumerals[i]}
                  </span>

                  <span
                    className={`font-thmanyah-display font-semibold text-h3-sm sm:text-h3 leading-[1.55] pt-0.5 transition-colors ${
                      isOpen ? "text-neutral-900" : "text-neutral-700 group-hover:text-neutral-900"
                    }`}
                  >
                    {item.q}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pr-10 sm:pr-12 pb-5 sm:pb-6">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                          style={{ transformOrigin: "right" }}
                          className="h-px bg-primary/30 mb-4 w-16"
                        />
                        <p className="font-thmanyah-text text-caption sm:text-body leading-[1.85] sm:leading-[1.95] text-neutral-700 max-w-[540px]">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}