import type { MetadataRoute } from "next";
import { getCoursesBySubject } from "@/app/src/data/courses";
import { instructors } from "@/app/src/data/instructors";

const baseUrl = "https://rawi-academy.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/consultations`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/courses`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/courses/code`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/courses/languages`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/courses/math`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/courses/quran`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/curriculum`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/guide`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/how-it-works`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/instructors`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const subjects = ["code", "languages", "math", "quran"] as const;

  const courseRoutes: MetadataRoute.Sitemap = subjects.flatMap((subject) =>
    getCoursesBySubject(subject).map((course) => ({
      url: `${baseUrl}/courses/${subject}/${course.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  const instructorRoutes: MetadataRoute.Sitemap = instructors.map((instructor) => ({
    url: `${baseUrl}/instructors/${instructor.id}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...courseRoutes, ...instructorRoutes];
}