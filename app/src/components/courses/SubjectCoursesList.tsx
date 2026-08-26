"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { getCoursesBySubject, type CourseSubject } from "@/app/src/data/courses";
import { getInstructorById, getInstructorDisplayName } from "@/app/src/data/instructors";
import { subjectConfig } from "@/app/src/data/subjectConfig";
import { LINKS } from "../../lib/links";

export default function SubjectCoursesList({
  subject,
}: {
  subject: CourseSubject;
}) {
  const courses = getCoursesBySubject(subject);
  const style = subjectConfig[subject];

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {courses.map((course) => {
        const instructor = getInstructorById(course.instructorId);

        return (
          <div
            key={course.id}
            className={`w-full rounded-sm border border-neutral-200 bg-neutral-0 overflow-hidden
              flex flex-col sm:flex-row transition-colors ${style.borderHoverClass}`}
          >
            <div className="relative w-full h-52 sm:w-64 sm:h-auto shrink-0">
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="(max-width: 640px) 100vw, 256px"
                className="object-cover"
              />
              <div className={`absolute inset-0 mix-blend-multiply ${style.photoOverlayClass}`} />

              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-sm bg-neutral-900/70 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span className="font-thmanyah-text text-micro font-bold tracking-wide text-neutral-0">
                  مباشر
                </span>
              </span>
            </div>

            <div className="flex-1 min-w-0 p-6 sm:p-8 flex flex-col text-right">
              <h3 className="font-thmanyah-display font-bold text-h3-sm sm:text-h3 text-neutral-900">
                {course.title}
              </h3>

              {instructor && (
                <span className="font-thmanyah-text text-caption text-neutral-700 mt-1">
                  {getInstructorDisplayName(instructor)}
                </span>
              )}

              <p className="font-thmanyah-text text-body text-neutral-700 mt-3 leading-relaxed line-clamp-2">
                {course.description}
              </p>

              <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-thmanyah-text text-micro font-bold text-orange">
                    بقي {course.seatsLeft} مقاعد فقط
                  </span>
                </div>
                <div>
                  <span
                    className={`rounded-sm px-2.5 py-1 font-thmanyah-text text-caption font-bold backdrop-blur-sm ${
                      course.price === "مجانًا" ? "text-primary" : "text-neutral-900"
                    }`}
                  >
                    {course.price}
                  </span>
                  {style.buttonVariant ? (
                    <Button href={LINKS.course(course.subject, course.id)} variant={style.buttonVariant}>تفاصيل الدورة</Button>
                  ) : (
                    <Button href={LINKS.course(course.subject, course.id)} className={style.buttonClassName}>تفاصيل الدورة</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}