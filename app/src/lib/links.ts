import { CourseSubject } from "../data/courses";

const courses = Object.assign("/courses", {
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
