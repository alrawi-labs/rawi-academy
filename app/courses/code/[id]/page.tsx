import type { Metadata } from "next";
import { CourseDetailPage } from "../../_shared/CourseDetailPage";
import { generateCourseMetadata } from "../../_shared/generateCourseMetadata";
import { getCoursesBySubject } from "@/app/src/data/courses";

export function generateStaticParams() {
  return getCoursesBySubject("code").map((course) => ({ id: course.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return generateCourseMetadata(id, "code");
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CourseDetailPage id={id} expectedSubject="code" />;
}