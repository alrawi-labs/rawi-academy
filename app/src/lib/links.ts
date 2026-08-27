import { CourseSubject } from "../data/courses";

function createLinkGroup<T extends Record<string, string>>(
  base: string,
  children: T
): string & T {
  return new Proxy(children, {
    get(target, prop, receiver) {
      if (prop === Symbol.toPrimitive || prop === "toString" || prop === "valueOf") {
        return () => base;
      }
      if (prop === "toJSON") {
        return () => base;
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as unknown as string & T;
}

const courses = createLinkGroup("/courses", {
  quran: "/courses/quran",
  code: "/courses/code",
  languages: "/courses/languages",
  math: "/courses/math",
});

export const LINKS = {
  home: "/",
  support: "/support", // tek yerden değiştirirsin: "/support" -> "/contact"
  register: "#", // henüz sayfa yoksa
  curriculum: "/curriculum",
  howItWorks: "/how-it-works",
  faq: "/faq",
  guide: "/guide",
  
  // --- Instructors ---
  instructors: "/instructors",
  instructor: (instructorId: string) => `/instructors/${instructorId}`,
  
  // --- Enroll ---
  enroll: (subject: CourseSubject, id: string) => `/courses/${subject}/enroll/${id}`,
  
  // --- Courses ---
  courses,
  course: (subject: CourseSubject, id: string) => `/courses/${subject}/${id}`,
  courseTrack: (trackId: string) => `/courses/${trackId}`,
  
  // --- Consultations ---
  consultations: "/consultations",
  consultation: (consultationSlug: string) => `/consultations/${consultationSlug}`,
  
  // --- Footer'a özgü ---
  about: "/about",
  parents: "#",
  pricing: "#",
  privacy: "#",
  terms: "#",
  exploreCourses: "#",
  social: {
    instagram: "#",
    twitter: "#",
    youtube: "#",
  },
} as const;
