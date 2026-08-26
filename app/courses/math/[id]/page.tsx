import { CourseDetailPage } from "../../_shared/CourseDetailPage";
import { getCoursesBySubject } from "@/app/src/data/courses";

export function generateStaticParams() {
  return getCoursesBySubject("math").map((course) => ({ id: course.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CourseDetailPage id={id} expectedSubject="math" />;
}