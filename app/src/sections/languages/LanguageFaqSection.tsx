"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { SectionLede } from "@/app/src/components/layout/SectionLede";

/**
 * "أسئلة قد تكون في بالك"
 *
 * الإمضاء البصري: أكورديون بلا أيقونات جاهزة — رقم بخط مونو ولون العلامة
 * بدل علامة "+" تقليدية، وخط وردي رفيع (٢px) يُرسم تحت السؤال عند الفتح
 * بدل أي إطار أو ظل، صدى مباشر لإمضاء بطاقات المدرّبين. الإجابة تُفتح عبر
 * قياس ارتفاع فعلي (scrollHeight) لا max-height تقريبي، فتبقى الحركة
 * سلسة بصرف النظر عن طول النص. سؤال واحد مفتوح في كل مرة — لا تكديس.
 */

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "هل كورسات اللغات مناسبة للمبتدئين؟",
    answer:
      "نعم. توجد مسارات تبدأ من الأساسيات، ويمكن اختيار المستوى المناسب بحسب معرفة الطالب الحالية.",
  },
  {
    question: "كيف أعرف المستوى المناسب لي؟",
    answer:
      "يُحدد المسار بحسب مستواك الحالي والهدف الذي تريد الوصول إليه، ويمكن لفريق راوي مساعدتك في اختيار البداية المناسبة.",
  },
  {
    question: "هل الدروس مباشرة أم مسجلة؟",
    answer:
      "تختلف طريقة تقديم الدروس بحسب المسار، وتتوفر البرامج المباشرة عندما يكون التفاعل مع المعلم جزءًا أساسيًا من التعلم.",
  },
  {
    question: "هل أحتاج إلى معرفة سابقة باللغة؟",
    answer:
      "ليس بالضرورة. بعض المسارات مخصصة لمن يبدأ من الصفر، بينما تبدأ مسارات أخرى من مستويات متقدمة.",
  },
  {
    question: "هل يوجد تدريب على المحادثة؟",
    answer:
      "نعم، في المسارات التي تتضمن المحادثة، يكون التركيز على استخدام اللغة والتحدث بها، وليس على دراسة القواعد وحفظ الكلمات فقط.",
  },
  {
    question: "هل أستطيع التعلم من الهاتف؟",
    answer: "نعم، يمكنك متابعة التعلم من الهاتف أو الكمبيوتر أو الجهاز اللوحي.",
  },
  {
    question: "كم أحتاج من الوقت لأتقدم؟",
    answer:
      "يختلف ذلك بحسب مستواك الحالي، واللغة، والوقت الذي تخصصه للتعلم. الاستمرارية أهم من عدد الساعات في يوم واحد.",
  },
];

function FaqRow({
  item,
  isOpen,
  onToggle,
  rowRef,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  rowRef: (el: HTMLDivElement | null) => void;
}) {
  const answerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const underlineRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wrapper = answerRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const targetHeight = isOpen ? inner.scrollHeight : 0;

    if (prefersReducedMotion) {
      gsap.set(wrapper, { height: targetHeight, opacity: isOpen ? 1 : 0 });
    } else {
      gsap.to(wrapper, {
        height: targetHeight,
        duration: 0.55,
        ease: "power3.inOut",
      });
      gsap.to(inner, {
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : -6,
        duration: 0.4,
        delay: isOpen ? 0.1 : 0,
        ease: "power2.out",
      });
    }

    if (underlineRef.current) {
      gsap.to(underlineRef.current, {
        scaleX: isOpen ? 1 : 0,
        duration: 0.5,
        ease: "power2.out",
        transformOrigin: "right center",
      });
    }
    if (numberRef.current) {
      gsap.to(numberRef.current, {
        color: isOpen
          ? "var(--color-visual-pink)"
          : "var(--color-neutral-400)",
        duration: 0.3,
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={rowRef}
      className="border-b border-neutral-200/70 py-6 lg:py-7"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start justify-between gap-6 text-right"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-thmanyah-display text-h3-sm text-neutral-900 lg:text-h3">
            {item.question}
          </span>
        </span>

        <span
          aria-hidden
          className="relative mt-1.5 h-4 w-4 shrink-0 text-neutral-400 transition-colors duration-300 group-hover:text-visual-pink"
        >
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span
            className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ transform: isOpen ? "translate(-50%, -50%) scaleY(0)" : "translate(-50%, -50%) scaleY(1)" }}
          />
        </span>
      </button>

      <div ref={answerRef} className="overflow-hidden" style={{ height: 0 }}>
        <div ref={innerRef} className="pt-4 opacity-0">
          <div className="flex gap-4">
            <span className="w-[2.5rem] shrink-0" aria-hidden />
            <div className="max-w-2xl">
              <div
                ref={underlineRef}
                aria-hidden
                className="mb-4 h-[2px] w-6 origin-right scale-x-0 bg-visual-pink"
              />
              <p className="font-thmanyah-text text-body leading-relaxed text-neutral-600">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LanguageFaqSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ledeRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(ledeRef.current, { opacity: 1, y: 0 });
        gsap.set(rowRefs.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ledeRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ledeRef.current, start: "top 82%" },
        },
      );

      gsap.fromTo(
        rowRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative bg-neutral-100 py-28 lg:py-40"
    >
      <SectionContainer>
        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div ref={ledeRef} className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionLede
                lead="أسئلة قد تكون في بالك"
                body="إن لم تجد إجابتك هنا، فريق راوي جاهز للمساعدة في أي وقت."
              />
            </div>
          </div>

          <div ref={listRef} className="lg:col-span-8">
            <div className="border-t border-neutral-200/70">
              {faqs.map((item, i) => (
                <FaqRow
                  key={item.question}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex((current) => (current === i ? null : i))
                  }
                  rowRef={(el) => {
                    rowRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default LanguageFaqSection;