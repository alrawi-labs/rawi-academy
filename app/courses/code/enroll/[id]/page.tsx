import { EnrollPage } from "../../../_shared/EnrollPage";
import { getCoursesBySubject } from "@/app/src/data/courses";

export function generateStaticParams() {
  return getCoursesBySubject("code").map((course) => ({ id: course.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EnrollPage id={id} expectedSubject="code" />;
}