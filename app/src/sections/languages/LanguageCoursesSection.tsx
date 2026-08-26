"use client";

import { ChevronLeft } from "lucide-react";
import { getCoursesBySubject } from "@/app/src/data/courses";
import {
  getInstructorById,
  getInstructorDisplayName,
} from "@/app/src/data/instructors";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { CardHeader } from "@/app/src/components/courses/CardHeader";
import { LINKS } from "../../lib/links";

const ELASTIC_EASE = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";
const CARD_BG = "/backgrounds/bg-7.png";

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
              "conic-gradient(from 0deg, transparent 0%, transparent 52%, color-mix(in srgb, var(--color-visual-pink) 55%, transparent) 63%, var(--color-visual-pink) 71%, color-mix(in srgb, var(--color-visual-pink) 55%, transparent) 79%, transparent 90%, transparent 100%)",
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
        urgent ? "text-orange" : "text-neutral-500"
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
  const course = getCoursesBySubject("languages").find((c) => c.id === courseId);
  if (!course) return null;
  const instructor = getInstructorById(course.instructorId);

  return (
    <a
      href={LINKS.course(course.subject ,course.id)}
      className={`group relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-0 transition-transform duration-500 ${ELASTIC_EASE} hover:scale-[1.01]`}
    >
      <AnimatedBorder />

      <div className="relative p-6 sm:px-8 flex flex-col justify-between gap-6 text-right order-2 lg:order-1 overflow-hidden">

        <div className="relative flex flex-col gap-3">
          <CardHeader
            textColor="text-neutral-900"
            title={course.title}
            color="pink"
            size="lg"
          />
          <p className="font-thmanyah-text text-body text-neutral-500 leading-relaxed max-w-md">
            {course.description}
          </p>
        </div>

        <div className="relative flex flex-col gap-3 py-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {instructor && (
                <>
                  <img
                    src={instructor.avatar}
                    alt={getInstructorDisplayName(instructor)}
                    className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                  />
                  <span className="font-thmanyah-text text-caption text-neutral-500 whitespace-nowrap">
                    {getInstructorDisplayName(instructor)}
                  </span>
                </>
              )}
            </div>
            <span className="font-mono text-caption text-visual-pink shrink-0">
              {course.price}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
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
        <div
          className="absolute inset-0 pointer-events-none lg:bg-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(255,255,255,0.35) 0%, transparent 30%)",
          }}
        />
      </div>
    </a>
  );
}

function CourseCard({ courseId }: { courseId: string }) {
  const course = getCoursesBySubject("languages").find((c) => c.id === courseId);
  if (!course) return null;
  const instructor = getInstructorById(course.instructorId);

  return (
    <a
      href={LINKS.course(course.subject ,course.id)}
      className={`group relative flex flex-col min-h-[26rem] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-0 transition-transform duration-500 ${ELASTIC_EASE} hover:scale-[1.01]`}
    >
      <AnimatedBorder />

      <div className="relative p-5 sm:p-6 pb-4 text-right">
        <CardHeader
          textColor="text-neutral-900"
          title={course.title}
          color="pink"
          size="sm"
        />
        <p className="font-thmanyah-text text-body text-neutral-500 leading-relaxed max-w-md">
          {course.description}
        </p>
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

      <div className="relative p-5 sm:p-6 pt-4 flex flex-col gap-3 text-right">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {instructor && (
              <>
                <img
                  src={instructor.avatar}
                  alt={getInstructorDisplayName(instructor)}
                  className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                />
                <span className="font-thmanyah-text text-caption text-neutral-500 whitespace-nowrap">
                  {getInstructorDisplayName(instructor)}
                </span>
              </>
            )}
          </div>
          <span className="font-mono text-caption text-visual-pink shrink-0">
            {course.price}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
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

export default function LanguageCoursesSection() {
  const languageCourses = getCoursesBySubject("languages");
  const [featured, ...rest] = languageCourses;

  return (
    <section dir="rtl" className="relative bg-neutral-100 pt-20 lg:pt-28">
      <SectionContainer>
        <div className="max-w-[560px]">
          <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 text-neutral-900 leading-[1.3] mt-3">
            اختر لغتك وابدأ اليوم
          </h2>
          <p className="font-thmanyah-text text-body text-neutral-500 leading-7 mt-5">
            من التركية إلى الإنجليزية والعربية، بمجموعات صغيرة ومتابعة أسبوعية
            مباشرة من مدرّبين متخصصين.
          </p>
        </div>

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