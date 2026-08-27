import type { Metadata } from "next";
import { EnrollPage } from "../../../_shared/EnrollPage";
import { generateEnrollMetadata } from "../../../_shared/generateCourseMetadata";
import { getCoursesBySubject } from "@/app/src/data/courses";

export function generateStaticParams() {
  return getCoursesBySubject("math").map((course) => ({ id: course.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return generateEnrollMetadata(id, "math");
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EnrollPage id={id} expectedSubject="math" />;
}