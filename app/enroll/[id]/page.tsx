import { notFound } from "next/navigation";
import { courses, getCourseWithInstructor } from "@/app/src/data/courses";
import {
  ACCENT_STYLES,
  COURSE_SUBJECT_COLOR,
  COURSE_SUBJECT_BUTTON_VARIANT,
} from "@/app/src/lib/subject-colors";
import EnrollHero from "./EnrollHero";

export function generateStaticParams() {
  return courses.map((course) => ({ id: course.id }));
}

export default async function EnrollPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = getCourseWithInstructor(id);
  if (!result) notFound();

  const { course, instructor } = result;
  const style = ACCENT_STYLES[COURSE_SUBJECT_COLOR[course.subject]];
  const buttonVariant = COURSE_SUBJECT_BUTTON_VARIANT[course.subject];

  return (
    <EnrollHero
      course={course}
      instructor={instructor}
      buttonVariant={buttonVariant}
      ringClass={style.ring}
    />
  );
}