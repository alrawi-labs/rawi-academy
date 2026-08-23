import type { CourseSubject } from "./courses";

// Sabit 1:1 konu → renk eşlemesi (design system'deki subject accent mapping).
// Programlama/matematik/lisan için Button'un hazır `variant` değerleri kullanılıyor;
// القرآن için henüz bir "teal" variant olmadığından custom className ile aynı görünüm
// korunuyor (orijinal QuranCoursesList'teki accentButton haritasıyla birebir aynı).
type SubjectStyle = {
  borderHoverClass: string;
  photoOverlayClass: string;
  buttonVariant?: "primary" | "pink" | "orange-solid";
  buttonClassName?: string;
};

export const subjectConfig: Record<CourseSubject, SubjectStyle> = {
  quran: {
    borderHoverClass: "hover:border-accent-teal",
    photoOverlayClass: "bg-accent-teal/20",
    buttonClassName: "bg-visual-teal hover:bg-teal-500 hover:opacity-90 text-neutral-0",
  },
  languages: {
    borderHoverClass: "hover:border-accent-pink",
    photoOverlayClass: "bg-accent-pink/20",
    buttonVariant: "pink",
  },
  math: {
    borderHoverClass: "hover:border-orange",
    photoOverlayClass: "bg-orange/20",
    buttonVariant: "orange-solid",
  },
  code: {
    borderHoverClass: "hover:border-primary",
    photoOverlayClass: "bg-primary/20",
    buttonVariant: "primary",
  },
};