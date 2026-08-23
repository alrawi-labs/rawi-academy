import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Button from "@/app/src/components/ui/Button";
import {
  courses,
  getCourseWithInstructor,
  type CourseSubject,
} from "@/app/src/data/courses";
import { getInstructorDisplayName } from "@/app/src/data/instructors";
import { CourseTabs } from "./CourseTabs";
import { CourseFaqList } from "./CourseFaqList";

const SUBJECT_STYLES: Record<
  CourseSubject,
  { label: string; badgeBg: string; badgeText: string; badgeSolid: string; ring: string }
> = {
  quran: {
    label: "القرآن والسنة",
    badgeBg: "bg-visual-teal/15",
    badgeText: "text-visual-teal",
    badgeSolid: "bg-visual-teal",
    ring: "ring-visual-teal/25",
  },
  code: {
    label: "البرمجة",
    badgeBg: "bg-visual-purple/15",
    badgeText: "text-visual-purple",
    badgeSolid: "bg-visual-purple",
    ring: "ring-visual-purple/25",
  },
  math: {
    label: "الرياضيات",
    badgeBg: "bg-visual-orange/15",
    badgeText: "text-visual-orange",
    badgeSolid: "bg-visual-orange",
    ring: "ring-visual-orange/25",
  },
  languages: {
    label: "اللغات",
    badgeBg: "bg-visual-pink/15",
    badgeText: "text-visual-pink",
    badgeSolid: "bg-visual-pink",
    ring: "ring-visual-pink/25",
  },
};

export function generateStaticParams() {
  return courses.map((course) => ({ id: course.id }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = getCourseWithInstructor(id);
  if (!result) notFound();

  const { course, instructor } = result;
  const style = SUBJECT_STYLES[course.subject];
  const lessonsCount = course.curriculum?.reduce((sum, s) => sum + s.lessons.length, 0);
  const sectionsCount = course.curriculum?.length;

  return (
    <main dir="rtl" className="pt-28 bg-neutral-100">
      <SectionContainer>
        {/* Üst blok: rozet + başlık + istatistik satırı — sade, ortalanmamış */}
        <div className="max-w-3xl">
          <span className={`relative inline-block ${style.badgeText}`}>
            <span className="relative z-10 font-thmanyah-display text-body text-neutral-900">
              {style.label}
            </span>
            <svg
              viewBox="0 0 120 14"
              preserveAspectRatio="none"
              className="absolute inset-x-0 -bottom-0.5 h-3 w-full"
              aria-hidden="true"
            >
              <path
                d="M2 9 C 18 5, 34 11, 50 7 C 68 3, 86 10, 102 6 C 108 5, 114 6, 118 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </span>
          <h1 className="mt-4 font-thmanyah-display text-h2-sm text-neutral-900 md:text-h2">
            {course.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-neutral-500">
            {course.studentsCount && (
              <span>+{course.studentsCount} طالب</span>
            )}
            {lessonsCount !== undefined && (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-neutral-300" />
                <span>{lessonsCount} درسًا</span>
              </>
            )}
            {course.level && (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-neutral-300" />
                <span>{course.level}</span>
              </>
            )}
          </div>
        </div>

        {/* Ana içerik: solda sekmeler, sağda fiyat kartı — asimetrik, sticky sidebar */}
        <div className="mt-10 grid gap-10 pb-16 md:grid-cols-[1fr_300px] md:gap-16">
          <div>
            <div
              className={`relative mb-10 aspect-video w-full max-w-2xl overflow-hidden rounded-3xl ring-1 ${style.ring}`}
            >
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="(min-width: 768px) 640px, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <CourseTabs
              course={course}
              instructor={instructor}
              accentText={style.badgeText}
              accentBg={style.badgeBg}
              accentRing={style.ring}
            />

            {course.faqs && course.faqs.length > 0 && (
              <div className="mt-16 max-w-2xl border-t border-neutral-200 pt-10">
                <p className="font-thmanyah-display text-h3 text-neutral-900">
                  الأسئلة الشائعة
                </p>
                <div className="mt-6">
                  <CourseFaqList faqs={course.faqs} />
                </div>
              </div>
            )}
          </div>

          {/* Fiyat kartı — sticky, sağ sütunda, tam kutu şeklinde değil sade */}
          <aside className="md:sticky md:top-28 md:h-fit">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-0 p-6">
              <p className="font-thmanyah-display text-h2-sm text-neutral-900">
                {course.price}
              </p>
              {course.price !== "مجانًا" && (
                <p className="mt-0.5 text-caption text-neutral-500">اشتراك مدى الحياة</p>
              )}

              <Button href="#" variant="primary" size="lg" className="mt-5 w-full justify-center">
                اشترك الآن
              </Button>

              <p className="mt-3 text-caption text-neutral-500">
                {course.seatsLeft} مقاعد متبقية
              </p>

              {instructor && (
                <Link
                  href={`/instructors/${instructor.id}`}
                  className="mt-5 flex items-center gap-3 border-t border-neutral-200 pt-5"
                >
                  <div className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ${style.ring}`}>
                    <Image
                      src={instructor.avatar}
                      alt={instructor.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-caption text-neutral-500">المعلّم</p>
                    <p className="truncate text-body font-medium text-neutral-900">
                      {getInstructorDisplayName(instructor)}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </aside>
        </div>
      </SectionContainer>
    </main>
  );
}