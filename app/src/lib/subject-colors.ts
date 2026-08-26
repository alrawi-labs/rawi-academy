// Tüm site genelinde konu (subject) renklerinin TEK kaynağı burası.
//
// NEDEN AYRI BİR DOSYA: Tailwind derleyicisi (JIT) sadece kaynak kodda TAM
// YAZILI class isimlerini tarayıp CSS üretir. Yani şu ÇALIŞMAZ:
//
//   className={`bg-visual-${color}/15`}   // ❌ Tailwind bunu build sırasında
//                                          //    göremez, CSS hiç üretilmez.
//
// Bu yüzden her rengin tam class string'i (bg-visual-teal/15 gibi) burada,
// SADECE BİR KEZ, harfi harfine yazılı olmak zorunda. Ama bu her şeyi her
// dosyada tekrar yazacağız anlamına gelmiyor: geri kalan tüm bileşenler artık
// sadece "teal" / "purple" gibi bir renk anahtarı taşır (instructors.ts,
// courses.ts) ve o anahtarı ACCENT_STYLES üzerinden burada bir kez tanımlanmış
// class'lara çevirir. Yeni bir konu eklemek istediğinde:
//   1) Zaten var olan bir renk kullanacaksan → sadece SUBJECT_COLOR/
//      COURSE_SUBJECT_COLOR eşlemesine bir satır ekle.
//   2) Tamamen yeni bir renk gerekiyorsa → ACCENT_STYLES'a yeni bir anahtar
//      ekle (tam class string'leriyle), sonra 1'deki gibi eşle.

export type AccentColor = "teal" | "purple" | "orange" | "pink";

export const ACCENT_STYLES: Record<
  AccentColor,
  {
    badgeBg: string;
    badgeText: string;
    badgeSolid: string;
    ring: string;
    photoTint: string;
  }
> = {
  teal: {
    badgeBg: "bg-visual-teal/15",
    badgeText: "text-visual-teal",
    badgeSolid: "bg-visual-teal",
    ring: "ring-visual-teal/25",
    photoTint: "from-visual-teal/35 via-visual-teal/5 to-transparent",
  },
  purple: {
    badgeBg: "bg-visual-purple/15",
    badgeText: "text-visual-purple",
    badgeSolid: "bg-visual-purple",
    ring: "ring-visual-purple/25",
    photoTint: "from-visual-purple/35 via-visual-purple/5 to-transparent",
  },
  orange: {
    badgeBg: "bg-visual-orange/15",
    badgeText: "text-visual-orange",
    badgeSolid: "bg-visual-orange",
    ring: "ring-visual-orange/25",
    photoTint: "from-visual-orange/35 via-visual-orange/5 to-transparent",
  },
  pink: {
    badgeBg: "bg-visual-pink/15",
    badgeText: "text-visual-pink",
    badgeSolid: "bg-visual-pink",
    ring: "ring-visual-pink/25",
    photoTint: "from-visual-pink/35 via-visual-pink/5 to-transparent",
  },
};

/** Eğitmen `Subject` (Arapça etiket) değerini renk anahtarına eşler. */
export const SUBJECT_COLOR: Record<
  "القرآن والسنة" | "البرمجة" | "الرياضيات" | "اللغات",
  AccentColor
> = {
  "القرآن والسنة": "teal",
  "البرمجة": "purple",
  "الرياضيات": "orange",
  "اللغات": "pink",
};

/** Kurs `CourseSubject` (İngilizce slug) değerini renk anahtarına eşler. */
export const COURSE_SUBJECT_COLOR: Record<
  "quran" | "code" | "math" | "languages",
  AccentColor
> = {
  quran: "teal",
  code: "purple",
  math: "orange",
  languages: "pink",
};

/**
 * Kurs `CourseSubject` değerini Button bileşeninin `variant` prop'una eşler
 * (bkz. app/src/components/ui/Button.tsx). Programlama marka moruyla
 * (primary) eşleşiyor; diğer üç konunun kendi solid Button varyantı var.
 */
export const COURSE_SUBJECT_BUTTON_VARIANT: Record<
  "quran" | "code" | "math" | "languages",
  "primary" | "pink" | "orange-solid" | "teal"
> = {
  code: "primary",
  languages: "pink",
  math: "orange-solid",
  quran: "teal",
};