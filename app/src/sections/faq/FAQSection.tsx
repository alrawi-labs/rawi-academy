"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

function toArabicIndicNumber(n: number): string {
  return String(n)
    .split("")
    .map((digit) => ARABIC_INDIC_DIGITS[Number(digit)])
    .join("");
}

const faqs = [
  {
    q: "ما هي أكاديمية راوي؟",
    a: "راوي أكاديمية تعليمية تجمع مسارات متنوعة في مكان واحد، من القرآن واللغات والرياضيات والبرمجة والذكاء الاصطناعي، بهدف تقديم تجربة تعلم واضحة وعملية تساعد الطالب على التطور خطوةً بخطوة.",
  },
  {
    q: "هل راوي مناسبة للمبتدئين؟",
    a: "نعم. صُممت المسارات بحيث يستطيع الطالب البدء من المستوى الذي يناسبه، حتى لو لم تكن لديه معرفة سابقة بالمجال الذي يريد تعلمه.",
  },
  {
    q: "كيف أعرف المسار المناسب لي؟",
    a: "لا تحتاج أن تعرف ذلك وحدك. يمكنك الاطلاع على المسارات ومحتواها، وإذا كنت غير متأكد من نقطة البداية، يمكن لفريق راوي مساعدتك في اختيار المسار الأنسب لمستواك وهدفك.",
  },
  {
    q: "هل أحتاج إلى معرفة سابقة قبل التسجيل؟",
    a: "يعتمد ذلك على المسار والمستوى الذي تختاره. توجد مسارات تبدأ من الأساسيات، وأخرى مخصصة لمن لديهم معرفة سابقة ويريدون تطويرها.",
  },
  {
    q: "هل التعلم في راوي نظري أم عملي؟",
    a: "نحن لا نريد أن ينتهي التعلم بمجرد مشاهدة الدرس. بحسب المسار، يتضمن التعلم تطبيقات وتمارين ومشاريع ومراجعة وتقييمًا للتقدم، بحيث يتحول ما تتعلمه إلى قدرة تستطيع استخدامها فعليًا.",
  },
  {
    q: "هل الدروس مباشرة أم مسجلة؟",
    a: "تختلف طريقة تقديم المحتوى بحسب البرنامج. بعض المسارات تعتمد على الدروس المباشرة والتفاعل مع المعلم، بينما قد تتضمن مسارات أخرى محتوى مسجلًا ومواد تعليمية إضافية.",
  },
  {
    q: "هل يوجد معلم يتابع تقدمي؟",
    a: "نعم، في البرامج التي تعتمد على المتابعة التعليمية، لا يكون دور المعلم مجرد تقديم الدرس؛ بل يساعد في معرفة مستوى الطالب، وتصحيح الأخطاء، وتوجيهه نحو الخطوة التالية.",
  },
  {
    q: "هل يمكنني التعلم من الهاتف؟",
    a: "نعم، يمكن الوصول إلى تجربة التعلم من الأجهزة التي تدعم منصة راوي، بما فيها الهاتف والكمبيوتر والأجهزة اللوحية.",
  },
  {
    q: "هل يمكنني التسجيل في أكثر من مسار؟",
    a: "نعم، يمكنك تعلم أكثر من مجال بحسب البرامج المتاحة، لكننا ننصح بأن تبدأ بمسار واضح وتبني تقدمًا حقيقيًا فيه قبل تشتيت تركيزك بين عدة مسارات.",
  },
  {
    q: "ماذا لو بدأت ثم اكتشفت أن المسار لا يناسبني؟",
    a: "يمكنك التواصل مع فريق راوي لمراجعة وضعك ومعرفة الخيار الأنسب لك. الهدف هو أن تكون في المسار الذي يخدم هدفك فعلًا، وليس مجرد إكمال التسجيل.",
  },
  {
    q: "هل يحصل الطالب على شهادة؟",
    a: "تختلف الشهادات وآلية الحصول عليها بحسب البرنامج. إذا كان البرنامج يقدم شهادة، فستجد تفاصيلها ومتطلباتها ضمن معلومات البرنامج.",
  },
  {
    q: "هل أستطيع التعلم بجانب الدراسة أو العمل؟",
    a: "نعم، صُممت تجربة راوي لتكون مرنة قدر الإمكان، ويمكن اختيار المسار والوتيرة المناسبة لظروفك بحسب طبيعة البرنامج.",
  },
  {
    q: "كيف أعرف أنني أتقدم فعلًا؟",
    a: "التقدم لا يُقاس بعدد الدروس التي أنهيتها فقط، بل بقدرتك على فهم ما تعلمته وتطبيقه. لذلك تعتمد البرامج المناسبة على التمارين والتطبيق والمراجعة والتقييم بحسب طبيعة كل مسار.",
  },
  {
    q: "هل يمكن أن أبدأ من الصفر ثم أصل إلى مستوى متقدم؟",
    a: "نعم. الفكرة الأساسية في راوي هي بناء التعلم تدريجيًا؛ تبدأ من الأساس الذي تحتاجه، ثم تنتقل إلى مستويات أكثر تقدمًا مع تطورك.",
  },
  {
    q: "هل راوي مناسبة للأطفال والكبار؟",
    a: "تختلف الفئات العمرية بحسب المسار والبرنامج، لذلك ننصح باختيار البرنامج وفق عمر الطالب ومستواه وهدفه التعليمي.",
  },
  {
    q: "ماذا يميز راوي عن مجرد مشاهدة الدروس على الإنترنت؟",
    a: "المعلومة وحدها لا تصنع تعلمًا. في راوي نحاول أن نجمع بين المحتوى، والمسار الواضح، والتطبيق، والمتابعة، والتدرج؛ حتى يعرف الطالب ماذا يتعلم، ولماذا يتعلمه، وما الخطوة التي تأتي بعد ذلك.",
  },
  {
    q: "هل أستطيع التواصل معكم قبل التسجيل؟",
    a: "بالتأكيد. إذا كان لديك سؤال عن المسارات أو المستوى المناسب أو طريقة التعلم، لا تتردد في التواصل معنا قبل اتخاذ قرارك.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      dir="rtl"
      id="faq"
      className="bg-neutral-100 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,320px)_1fr] gap-8 sm:gap-10 md:gap-20">
        {/* Sağ sütun — sabit başlık bloğu */}
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 leading-[1.35] text-neutral-900">
            الأسئلة الشائعة
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
                    {toArabicIndicNumber(i + 1)}
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