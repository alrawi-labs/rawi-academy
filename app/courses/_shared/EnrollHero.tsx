"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Button from "@/app/src/components/ui/Button";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { PremiumGradientBar } from "@/app/src/components/3D/PremiumGradientBar";
import { getInstructorDisplayName } from "@/app/src/data/instructors";
import type { getCourseWithInstructor } from "@/app/src/data/courses";
import { EnrollForm, type EnrollTicketData } from "./EnrollForm";
import { LINKS } from "@/app/src/lib/links";

type CourseWithInstructor = NonNullable<ReturnType<typeof getCourseWithInstructor>>;

type EnrollHeroProps = {
  course: CourseWithInstructor["course"];
  instructor: CourseWithInstructor["instructor"];
  buttonVariant: "primary" | "pink" | "orange-solid" | "teal";
  ringClass: string;
};

export default function EnrollHero({
  course,
  instructor,
  buttonVariant,
  ringClass,
}: EnrollHeroProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  async function handleSubmit(_data: EnrollTicketData) {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      // ⚠️ Backend hazır olunca burası gerçek bir API çağrısıyla değiştirilmeli.
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsDone(true);
    } catch {
      setSubmitError("حدث خطأ أثناء إرسال طلبك. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section dir="rtl" className="relative overflow-hidden bg-neutral-100">
      <PremiumGradientBar offsetY={250} />

      <SectionContainer>
        <div className="relative grid grid-cols-1 items-start gap-10 py-24 sm:py-28 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16 lg:py-32">
          {/* النص الرئيسي + ملخص الدورة — يمين الشاشة (RTL) */}
          <div className="max-w-2xl lg:pt-10">
            <Link
              href={LINKS.course(course.subject,course.id)}
              className="text-caption text-neutral-500 transition-colors hover:text-neutral-700"
            >
              → العودة إلى الدورة
            </Link>

            <h1 className="mt-6 font-thmanyah-display text-h2-sm font-bold leading-[1.25] text-neutral-900 sm:text-hero">
              تسجيل الالتحاق
            </h1>

            <p className="mt-6 max-w-lg font-thmanyah-text text-body leading-[1.9] text-neutral-700 sm:text-lead sm:leading-[1.8]">
              أنت على بعد خطوة واحدة من الالتحاق بدورة «{course.title}»
              {instructor ? <> مع {getInstructorDisplayName(instructor)}</> : null}
            </p>

            <div className="mt-8 flex items-center gap-6 border-t border-neutral-200 pt-6">
              <span className="font-thmanyah-display text-h3-sm text-neutral-900">
                {course.price}
              </span>
              <span className="text-caption text-neutral-500">
                {course.seatsLeft} مقعدًا متبقيًا
              </span>
            </div>

            {/* صورة الدورة — غير متمركزة، بحجم أصغر، أسفل النص */}
            <div
              className={`relative mt-10 aspect-video w-64 overflow-hidden rounded-xl ring-1 ${ringClass} sm:w-72`}
            >
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
          </div>

          {/* نموذج التسجيل — لوحة زجاجية عائمة، يسار الشاشة */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)] backdrop-blur-xl">
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(115deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.08)_30%,transparent_55%)]" />

              <div className="relative z-10 p-6 sm:p-7">
                {isDone ? (
                  <div className="py-3 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                      <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
                    </span>

                    <h2 className="mt-5 font-thmanyah-display text-h3-sm font-bold text-neutral-900">
                      تم استلام طلبك بنجاح
                    </h2>
                    <p className="mt-2 font-thmanyah-text text-caption text-neutral-600">
                      سنتواصل معك قريبًا لتأكيد التسجيل في «{course.title}».
                    </p>

                    <div className="mt-6">
                      <Button variant="outline" size="md" onClick={() => setIsDone(false)}>
                        تسجيل شخص آخر
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-thmanyah-text text-body font-semibold text-neutral-900">
                      أكمل بيانات التسجيل
                    </h2>
                    <p className="mb-5 mt-1.5 font-thmanyah-text text-caption leading-[1.8] text-neutral-600">
                      سنتواصل معك لتأكيد مقعدك في الدورة.
                    </p>

                    <EnrollForm
                      course={course}
                      buttonVariant={buttonVariant}
                      onSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      submitError={submitError}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}