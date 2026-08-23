import { CoursesHeroSection } from "../src/sections/courses/CoursesHeroSection";
import { CourseTracksSection } from "../src/sections/courses/CourseTracksSection";

export default function CoursesPage() {
  return (
    <main dir="rtl" lang="ar" className="overflow-x-clip bg-neutral-100">
  <CoursesHeroSection />
  <CourseTracksSection />
    </main>
  );
}
