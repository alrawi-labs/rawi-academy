"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { SectionLede } from "@/app/src/components/layout/SectionLede";
import Button from "@/app/src/components/ui/Button";

/**
 * "لا تجعل اللغة حدودًا لما يمكنك الوصول إليه"
 *
 * نفس المفهوم (موزاييك غير متماثل، أيقونات تُرسم، كلمة عملاقة مفرغة) لكن
 * العنوان والفقرة الآن يُبنيان عبر SectionLede المشترك بدل markup مخصص —
 * هذا يعني التخلي عن كشف العنوان سطرًا-سطرًا (SectionLede لا يكشف عن
 * refs داخلية) لصالح كشف واحد نظيف للكتلة كاملة، وهو الأنسب فعليًا لمكوّن
 * مشترك يجب أن يبقى متسقًا عبر الموقع.
 */

interface Opportunity {
  title: string;
  body: string;
  span: string;
  icon: React.ReactNode;
}

const opportunities: Opportunity[] = [
  {
    title: "منحة دراسية",
    body: "قد تجد البرنامج الذي يناسبك، لكن متطلبات اللغة تحدد ما إذا كنت تستطيع التقديم إليه.",
    span: "lg:col-span-7 lg:col-start-1 lg:row-start-1",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
        <path
          data-draw
          d="M8 24 L32 14 L56 24 L32 34 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          data-draw
          d="M20 28 V42 Q32 48 44 42 V28"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          data-draw
          d="M32 34 V47"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle
          data-draw
          cx="32"
          cy="50"
          r="2.2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "فرصة عمل",
    body: "قد تكون مؤهلًا للوظيفة، لكن معرفة لغة أخرى تفتح لك وظائف وبيئات عمل لم تكن متاحة لك من قبل.",
    span: "lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-16",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
        <rect
          data-draw
          x="10"
          y="22"
          width="44"
          height="26"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          data-draw
          d="M24 22 V16 Q24 12 28 12 H36 Q40 12 40 16 V22"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          data-draw
          d="M10 34 H54"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "الدراسة والمعرفة",
    body: "الكثير مما تريد تعلمه وقراءته ومتابعته موجود بلغات أخرى، ومعرفة اللغة تجعله أقرب إليك.",
    span: "lg:col-span-5 lg:col-start-1 lg:row-start-2 mt-3",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
        <path
          data-draw
          d="M8 14 Q20 8 32 14 V50 Q20 44 8 50 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          data-draw
          d="M56 14 Q44 8 32 14 V50 Q44 44 56 50 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "العالم من حولك",
    body: "كلما زادت اللغات التي تستطيع استخدامها، قلّت الأشياء التي تحتاج أن تبقى بعيدة عنك.",
    span: "lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:mb-12 ",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
        <circle
          data-draw
          cx="32"
          cy="32"
          r="22"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <ellipse
          data-draw
          cx="32"
          cy="32"
          rx="9"
          ry="22"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          data-draw
          d="M10 32 H54"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
];

export function LanguageOpportunitiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ledeRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const closingLineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(ledeRef.current, { opacity: 1, y: 0 });
        gsap.set(cardRefs.current, { opacity: 1, y: 0 });
        gsap.set(closingLineRef.current, { scaleX: 1 });
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

      cardRefs.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );

        const svg = card.querySelector("svg");
        if (svg) {
          const shapes = Array.from(
            svg.querySelectorAll<SVGGeometryElement>("[data-draw]"),
          );
          shapes.forEach((shape) => {
            const length = shape.getTotalLength();
            shape.style.strokeDasharray = `${length}`;
            shape.style.strokeDashoffset = `${length}`;
          });
          gsap.to(shapes, {
            strokeDashoffset: 0,
            duration: 1,
            delay: 0.25,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
        }
      });

      if (closingLineRef.current) {
        gsap.fromTo(
          closingLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power2.out",
            transformOrigin: "right center",
            scrollTrigger: {
              trigger: closingLineRef.current,
              start: "top 92%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative overflow-hidden bg-neutral-100 pt-28 lg:pt-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 560px at 88% -6%, color-mix(in srgb, var(--color-primary-light) 70%, transparent), transparent 62%)",
        }}
      />


      <SectionContainer>
        <div className="relative">

          <div ref={ledeRef}>
            <SectionLede
              lead="لا تجعل اللغة حدودًا لما يمكنك الوصول إليه"
              body="قد تمر أمامك فرصة للدراسة، أو منحة، أو عمل، أو معرفة كنت تبحث عنها منذ وقت طويل — وأحيانًا لا يكون ما ينقصك القدرة، بل لغة لم تتعلمها بعد."
            />
          </div>

          {/* الموزاييك غير المتماثل */}
          <div className="relative mt-20 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            {opportunities.map((item) => (
              <div
                key={item.title}
                ref={(el) => {
                  cardRefs.current[
                    opportunities.findIndex((o) => o.title === item.title)
                  ] = el;
                }}
                className={`group relative overflow-hidden rounded-lg border border-neutral-200/70 bg-neutral-0 p-9 shadow-[0_20px_44px_-28px_rgba(9,9,11,0.16)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-neutral-200 hover:shadow-[0_30px_60px_-24px_rgba(9,9,11,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:p-11 ${item.span}`}
              >
                <div className="mb-8 h-14 w-14 text-visual-pink transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3">
                  {item.icon}
                </div>
                <h3 className="font-thmanyah-display text-h3 text-neutral-900">
                  {item.title}
                </h3>
                <p className="font-thmanyah-text mt-3 text-body leading-relaxed text-neutral-500">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* الخاتمة */}
          <div className="mt-24 flex flex-col gap-8 pt-10 sm:flex-row sm:items-center sm:justify-center">
            <div className="relative w-full sm:w-auto">
              <div
                ref={closingLineRef}
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-right bg-gradient-to-l from-visual-pink via-neutral-300 to-transparent"
              />
              <p className="font-thmanyah-display my-6 text-h2-sm text-neutral-900">
                بعض الفرص لا تنتظر أن تكون مستعدًا.
              </p>
                <div
                ref={closingLineRef}
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-right bg-gradient-to-l from-transparent via-neutral-300 to-visual-pink"
              />
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default LanguageOpportunitiesSection;
