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
  consultations: "/consultations",
  howItWorks: "/how-it-works",
  faq: "/faq",
  courses,


  // --- Footer'a özgü ---
  about: "#",
  parents: "#",
  instructors: "/instructors",
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
