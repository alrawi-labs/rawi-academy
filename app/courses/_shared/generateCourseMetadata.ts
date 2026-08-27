import type { Metadata } from "next";
import {
  getCourseWithInstructor,
  type CourseSubject,
} from "@/app/src/data/courses";

const SUBJECT_LABELS: Record<CourseSubject, string> = {
  quran: "القرآن والسنة",
  code: "البرمجة",
  math: "الرياضيات",
  languages: "اللغات",
};

export function generateCourseMetadata(
  id: string,
  expectedSubject: CourseSubject,
): Metadata {
  const result = getCourseWithInstructor(id);

  if (!result || result.course.subject !== expectedSubject) {
    return {
      title: "الدورة غير موجودة",
      description: "لم يتم العثور على هذه الدورة في أكاديمية راوي.",
    };
  }

  const { course } = result;
  const label = SUBJECT_LABELS[course.subject];
  const description = `تعرّف على تفاصيل دورة ${course.title} في ${label} ضمن أكاديمية راوي، وابدأ رحلتك التعليمية اليوم.`;

  return {
    title: course.title,
    description,
    openGraph: {
      title: course.title,
      description,
      images: course.image ? [course.image] : undefined,
    },
    twitter: {
      title: course.title,
      description,
    },
  };
}

export function generateEnrollMetadata(
  id: string,
  expectedSubject: CourseSubject,
): Metadata {
  const result = getCourseWithInstructor(id);
  const validCourse = result && result.course.subject === expectedSubject;

  return {
    title: validCourse
      ? `التسجيل في ${result!.course.title}`
      : "التسجيل في الدورة",
    description: validCourse
      ? `أكمل تسجيلك في دورة ${result!.course.title} في أكاديمية راوي.`
      : "أكمل تسجيلك في الدورة المطلوبة في أكاديمية راوي.",
    robots: {
      index: false,
      follow: false,
    },
  };
}