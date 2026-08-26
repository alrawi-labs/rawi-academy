import { notFound } from "next/navigation";
import { getCourseWithInstructor, type CourseSubject } from "@/app/src/data/courses";
import {
  ACCENT_STYLES,
  COURSE_SUBJECT_COLOR,
  COURSE_SUBJECT_BUTTON_VARIANT,
} from "@/app/src/lib/subject-colors";
import EnrollHero from "./EnrollHero";

export function EnrollPage({
  id,
  expectedSubject,
}: {
  id: string;
  expectedSubject: CourseSubject;
}) {
  const result = getCourseWithInstructor(id);
  if (!result) notFound();

  const { course, instructor } = result;

  // /courses/math/enroll/hifz gibi yanlış subject/id kombinasyonunu engeller
  if (course.subject !== expectedSubject) notFound();

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