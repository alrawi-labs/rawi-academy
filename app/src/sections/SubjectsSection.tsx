// components/curriculum/SubjectSections.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Button from "@/app/src/components/ui/Button";
import { courses, type CourseSubject } from "@/app/src/data/courses";
import { getInstructorById, getInstructorDisplayName } from "@/app/src/data/instructors";

type SubjectMeta = {
  key: CourseSubject;
  label: string;
  tagline: string;
  href: string;
  color: "teal" | "purple" | "orange" | "pink";
};

const SUBJECTS: SubjectMeta[] = [
  {
    key: "quran",
    label: "القرآن",
    tagline: "حفظ · فهم · مراجعة",
    href: "/courses/quran",
    color: "teal",
  },
  {
    key: "programming",
    label: "البرمجة",
    tagline: "منطق · تطبيق · بناء",
    href: "/courses/programming",
    color: "purple",
  },
  {
    key: "languages",
    label: "اللغات",
    tagline: "فهم · ممارسة · تواصل",
    href: "/courses/languages",
    color: "pink",
  },
  {
    key: "math",
    label: "الرياضيات",
    tagline: "فهم · تحليل · حل",
    href: "/courses/math",
    color: "orange",
  },
];

const accentText: Record<SubjectMeta["color"], string> = {
  teal: "text-visual-teal",
  purple: "text-primary",
  orange: "text-orange",
  pink: "text-visual-pink",
};

const accentBg: Record<SubjectMeta["color"], string> = {
  teal: "bg-visual-teal",
  purple: "bg-primary",
  orange: "bg-orange",
  pink: "bg-visual-pink",
};

export function SubjectSections() {
  return (
    <div dir="rtl">
      {SUBJECTS.map((subject, index) => (
        <SubjectSection
          key={subject.key}
          subject={subject}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}

function SubjectSection({
  subject,
  isFirst,
}: {
  subject: SubjectMeta;
  isFirst: boolean;
}) {
  const subjectCourses = courses.filter((c) => c.subject === subject.key);
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(subjectCourses.length <= 1);

  const GAP = 20;

  // يتحقق من موضع التمرير الحالي لتفعيل/تعطيل الأسهم — يعمل بغض النظر عن قيمة scrollLeft الخام
  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    // نطبّع scrollLeft المطلق (سالبًا كان أو موجبًا) إلى مسافة عن نقطة البداية
    const distanceFromStart = Math.abs(el.scrollLeft);
    setAtStart(distanceFromStart <= 2);
    setAtEnd(distanceFromStart >= maxScroll - 2);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    el?.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el?.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  // في RTL الحديث (Chrome/Firefox/Safari موحّدة الآن): scrollLeft = 0 عند البداية (اليمين)،
  // ويصبح سالبًا كلما تقدّمت نحو نهاية القائمة (اليسار). لذا "التالي" = طرح، "السابق" = جمع.
  const scrollByOneCard = (dir: "next" | "prev") => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const step = (firstCard?.offsetWidth ?? 360) + GAP;
    el.scrollBy({ left: dir === "next" ? -step : step, behavior: "smooth" });
  };

  return (
    <section
      className={`py-16 bg-neutral-100 ${isFirst ? "" : "border-t border-neutral-200"}`}
    >
      <SectionContainer>
        {/* رأس القسم */}
        <div className="flex items-baseline justify-between gap-6 mb-8">
          <div>
            <h2 className="text-h2-sm font-thmanyah-display text-neutral-900">
              {subject.label}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button href={subject.href} variant="outline" size="sm">
              عرض المسار
            </Button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollByOneCard("prev")}
                disabled={atStart}
                aria-label="السابق"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ArrowIcon pointing="prev" />
              </button>
              <button
                type="button"
                onClick={() => scrollByOneCard("next")}
                disabled={atEnd}
                aria-label="التالي"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ArrowIcon pointing="next" />
              </button>
            </div>
          </div>
        </div>

        {/* الشريط الأفقي — بطاقات أعرض */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-proximity pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {subjectCourses.map((course) => {
            const instructor = getInstructorById(course.instructorId);

            return (
              <a
                key={course.id}
                data-card
                href={`${subject.href}/${course.id}`}
                className="group snap-start shrink-0 w-[320px] md:w-[400px] flex flex-col rounded-sm border border-neutral-200 hover:border-neutral-300 overflow-hidden transition-colors"
              >
                <div className="relative w-full aspect-[16/10] bg-neutral-100">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(min-width: 768px) 400px, 320px"
                    className="object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-h3-sm font-thmanyah-display text-neutral-900 mb-1.5">
                    {course.title}
                  </h3>
                  {instructor && (
                    <p className="text-caption text-neutral-500 mb-3">
                      {getInstructorDisplayName(instructor)}
                    </p>
                  )}
                  <p className="text-body text-neutral-600 leading-relaxed mb-6 line-clamp-4">
                    {course.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-5 border-t border-neutral-100">
                    <div>
                      <p className="text-body font-semibold text-neutral-900">
                        {course.price}
                      </p>
                      <p className="text-caption text-neutral-400 mt-0.5">
                        {course.seatsLeft} مقاعد
                      </p>
                    </div>
                    <Button variant="primary" className={accentBg[subject.color]}>
                      سجّل الآن
                    </Button>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

function ArrowIcon({ pointing }: { pointing: "prev" | "next" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={pointing === "next" ? "rotate-180" : ""}
    >
      <path
        d="M6 3L11 8L6 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}