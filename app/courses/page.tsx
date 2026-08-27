import { CoursesHeroSection } from "../src/sections/courses/CoursesHeroSection";
import { CourseTracksSection } from "../src/sections/courses/CourseTracksSection";
import { buildMetadata } from "@/app/src/lib/seo";

export const metadata = buildMetadata("courses");

export default function CoursesPage() {
  return (
    <main dir="rtl" lang="ar" className="overflow-x-clip bg-neutral-100">
  <CoursesHeroSection />
  <CourseTracksSection />
    </main>
  );
}
