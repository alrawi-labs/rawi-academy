"use client";

import { ChevronLeft } from "lucide-react";
import { getCoursesBySubject } from "@/app/src/data/courses";
import { getInstructorById, getInstructorDisplayName } from "@/app/src/data/instructors";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { SectionLede } from "@/app/src/components/layout/SectionLede";
import { CardHeader } from "@/app/src/components/courses/CardHeader";

const ELASTIC_EASE = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";


// Kenarlık boyunca sürekli dönen ince bir ışık halkası (conic-gradient).
// Hover'da elastic (overshoot'lu) bir "spring" ile beliriyor; içerideki
// dönüş animasyonu ile yüzeyin transform'u çakışmasın diye iki katmana ayrıldı:
// dış katman opacity/scale'i, iç katman ise sürekli rotate'i yönetiyor.
function AnimatedBorder() {
  return (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-0 scale-[0.88] transition-all duration-500 ease-[cubic-bezier(0.34,1.8,0.64,1)] group-hover:opacity-100 group-hover:scale-100`}
        style={{
          padding: "1.5px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        <span
          className="absolute inset-[-60%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 52%, color-mix(in srgb, var(--color-visual-teal) 55%, transparent) 63%, var(--color-visual-teal) 71%, color-mix(in srgb, var(--color-visual-teal) 55%, transparent) 79%, transparent 90%, transparent 100%)",
            animation: "border-spin 2.6s linear infinite",
          }}
        />
      </span>
      <style jsx>{`
        @keyframes border-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}

function SeatsBadge({ seatsLeft }: { seatsLeft: number }) {
  const urgent = seatsLeft <= 5;
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-micro tracking-wide ${
        urgent ? "text-orange" : "text-neutral-400"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${urgent ? "bg-orange" : "bg-neutral-400"}`}
      />
      {urgent ? `متبقّي ${seatsLeft} مقاعد فقط` : `${seatsLeft} مقعدًا متاحًا`}
    </span>
  );
}

function FeaturedCourseCard({ courseId }: { courseId: string }) {
  const course = getCoursesBySubject("quran").find((c) => c.id === courseId);
  if (!course) return null;
  const instructor = getInstructorById(course.instructorId);

  return (
    <a
      href={`/quran/courses/${course.id}`}
      className={`group relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-0 transition-transform duration-500 ${ELASTIC_EASE} hover:scale-[1.01]`}
    >
      <AnimatedBorder />

      <div className="p-6 sm:px-8 flex flex-col justify-between gap-6 text-right order-2 lg:order-1">
        <div className="flex flex-col gap-3">
          <CardHeader title={course.title} color="teal" size="lg" />
          <p className="font-thmanyah-text text-body text-neutral-600 leading-relaxed max-w-md">
            {course.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 py-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {instructor && (
                <>
                  <img
                    src={instructor.avatar}
                    alt={getInstructorDisplayName(instructor)}
                    className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                  />
                  <span className="font-thmanyah-text text-caption text-neutral-600 whitespace-nowrap">
                    {getInstructorDisplayName(instructor)}
                  </span>
                </>
              )}
            </div>
            <span className="font-mono text-caption text-visual-teal shrink-0">
              {course.price}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
            <SeatsBadge seatsLeft={course.seatsLeft} />
            <ChevronLeft
              className={`w-4 h-4 text-neutral-400 transition-transform duration-500 ${ELASTIC_EASE} group-hover:-translate-x-1.5`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="relative min-h-[14rem] lg:min-h-full bg-neutral-100 order-1 lg:order-2 overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-700 ${ELASTIC_EASE} group-hover:scale-105`}
          style={{
            backgroundImage: `url('${course.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </a>
  );
}

function CourseCard({ courseId }: { courseId: string }) {
  const course = getCoursesBySubject("quran").find((c) => c.id === courseId);
  if (!course) return null;
  const instructor = getInstructorById(course.instructorId);

  return (
    <a
      href={`/quran/courses/${course.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-neutral-0 transition-transform duration-500 ${ELASTIC_EASE} hover:scale-[1.01]`}
    >
      <AnimatedBorder />

      <div className="p-5 sm:p-6 pb-4 text-right">
        <CardHeader title={course.title} color="teal" size="sm" />
      </div>

      <div className="relative mx-5 sm:mx-6 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
        <div
          className={`absolute inset-0 transition-transform duration-700 ${ELASTIC_EASE} group-hover:scale-105`}
          style={{
            backgroundImage: `url('${course.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      <div className="p-5 sm:p-6 pt-4 flex flex-col gap-3 text-right">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {instructor && (
              <>
                <img
                  src={instructor.avatar}
                  alt={getInstructorDisplayName(instructor)}
                  className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                />
                <span className="font-thmanyah-text text-caption text-neutral-600 whitespace-nowrap">
                  {getInstructorDisplayName(instructor)}
                </span>
              </>
            )}
          </div>
          <span className="font-mono text-caption text-visual-teal shrink-0">
            {course.price}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <SeatsBadge seatsLeft={course.seatsLeft} />
          <ChevronLeft
            className={`w-4 h-4 text-neutral-400 transition-transform duration-500 ${ELASTIC_EASE} group-hover:-translate-x-1.5`}
            aria-hidden="true"
          />
        </div>
      </div>
    </a>
  );
}

export default function QuranCoursesSection() {
  const quranCourses = getCoursesBySubject("quran");
  const [featured, ...rest] = quranCourses;

  return (
    <section dir="rtl" className="relative bg-neutral-0 py-20 lg:py-28">
      <SectionContainer>
        <SectionLede
          lead="القرآن والسنة"
          sub="اختر برنامجك وابدأ اليوم"
          body="من الحفظ إلى التفسير والتجويد، بمجموعات صغيرة ومتابعة أسبوعية مباشرة من معلّمين مُجازين."
        />

        <div className="mt-10 lg:mt-14 flex flex-col gap-5 lg:gap-6">
          {featured && <FeaturedCourseCard courseId={featured.id} />}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
            {rest.map((course) => (
              <CourseCard key={course.id} courseId={course.id} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}