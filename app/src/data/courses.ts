// Merkezi kurs verisi. Tüm konulardaki (قرآن/برمجة/رياضيات/لغات) kurslar burada
// tek bir dizide tutulur; bileşenler `getCoursesBySubject` ile kendi konusuna
// ait kayıtları filtreler. Yeni bir kurs eklemek için sadece bu diziye yeni bir
// kayıt eklemen yeterli — hiçbir bileşene dokunmana gerek yok.
//
// Eğitmen bilgisi burada değil; her kurs sadece `instructorId` ile
// `instructors.ts`'deki kayda işaret eder. Eğitmenin adını/unvanını/fotoğrafını
// göstermek için `getInstructorById(course.instructorId)` kullan.

import { getInstructorById } from "./instructors";

export type CourseSubject = "quran" | "languages" | "math" | "code";

export type CourseLevel = "مبتدئ" | "متوسط" | "متقدم";

export type CourseLesson = {
  title: string;
};

export type CourseSection = {
  title: string;
  lessons: CourseLesson[];
};

export type CourseFaq = {
  question: string;
  answer: string;
};

export type Course = {
  id: string;
  subject: CourseSubject;
  title: string;
  instructorId: string;
  description: string;
  seatsLeft: number;
  price: string; // "مجانًا" veya "199 TL" gibi — format standartlaşınca number'a çevrilebilir
  image: string; // /public altında gerçek fotoğraf yolu
  /** Opsiyonel — kurs kartında/detayda seviye rozeti. Yoksa rozet hiç gösterilmez. */
  level?: CourseLevel;
  /** Opsiyonel — örn. 500 → detay sayfasında "+500 طالب" olarak gösterilir. */
  studentsCount?: number;
  /**
   * Detay sayfasının "وصف الدورة" sekmesindeki uzun tanıtım metni (paragraf paragraf).
   * Opsiyonel — yoksa sekme kısa `description` alanına düşer.
   */
  overview?: string[];
  /**
   * Müfredat: bölüm + ders listesi, "منهج الدورة" sekmesinde akordeon olarak gösterilir.
   * Ders/bölüm sayıları buradan otomatik hesaplanır — elle ayrı bir sayı alanı TUTMA.
   * Opsiyonel — yoksa "منهج الدورة" sekmesi hiç render edilmez.
   */
  curriculum?: CourseSection[];
  /** Kursla gelen özellikler listesi, örn. "شهادة موثقة". Opsiyonel. */
  features?: string[];
  /** Sık sorulan sorular. Opsiyonel. */
  faqs?: CourseFaq[];
};

// ⚠️ Placeholder veri — gerçek kurs/fiyat bilgilerini kendi içeriğinle değiştir.
export const courses: Course[] = [
  // القرآن
  {
    id: "hifz",
    subject: "quran",
    title: "حفظ القرآن الكريم",
    instructorId: "abdullah-alhomsi",
    description:
      "برنامج مباشر بمجموعات صغيرة، بخطة مراجعة أسبوعية تثبّت المحفوظ وتمنع النسيان.",
    seatsLeft: 4,
    price: "مجانًا",
    image: "/courses/quran/hifz.png",
  },
  {
    id: "tafsir",
    subject: "quran",
    title: "فهم وتفسير القرآن",
    instructorId: "sarah-alnuaimi",
    description:
      "فهم معاني الآيات وأسباب النزول، بأسلوبٍ ميسّر يربط النص بواقع الحياة.",
    seatsLeft: 12,
    price: "199 TL",
    image: "/courses/tafsir.jpg",
  },
  {
    id: "tajweed",
    subject: "quran",
    title: "أحكام التجويد",
    instructorId: "yusuf-alatasi",
    description:
      "أحكام التلاوة الصحيحة ومخارج الحروف، بتطبيق عملي مسموع وتصحيح مباشر لكل طالب.",
    seatsLeft: 2,
    price: "249 TL",
    image: "/courses/tajweed.jpg",
  },
  {
    id: "sunnah",
    subject: "quran",
    title: "السنة النبوية",
    instructorId: "ahmad-alrifai",
    description:
      "أحاديث نبوية مختارة وشروحها، وربطها بآداب السلوك اليومي للطالب.",
    seatsLeft: 18,
    price: "مجانًا",
    image: "/courses/sunnah.jpg",
  },

  // اللغات
  {
    id: "turkish-a1",
    subject: "languages",
    title: "التركية للمبتدئين — A1",
    instructorId: "aysha-yilmaz",
    description:
      "أول خطوة حقيقية في التركية: الحروف، النطق، والجمل اليومية التي تستخدمها فورًا.",
    seatsLeft: 10,
    price: "مجانًا",
    image: "/courses/turkish-a1.jpg",
  },
  {
    id: "turkish-conversation",
    subject: "languages",
    title: "محادثة تركية — مستوى متوسط",
    instructorId: "murat-kaya",
    description:
      "جلسات حوارية مباشرة تركز على الطلاقة، بمواقف حياتية حقيقية لا حفظ نظري.",
    seatsLeft: 5,
    price: "229 TL",
    image: "/courses/turkish-conversation.jpg",
  },
  {
    id: "english-business",
    subject: "languages",
    title: "الإنجليزية لبيئة العمل",
    instructorId: "rana-khalil",
    description:
      "مفردات وصياغات الاجتماعات والإيميلات المهنية، بتدريب مباشر على مواقف واقعية.",
    seatsLeft: 8,
    price: "279 TL",
    image: "/courses/english-business.jpg",
  },
  {
    id: "arabic-for-turkish",
    subject: "languages",
    title: "العربية للناطقين بالتركية",
    instructorId: "ibrahim-demirtas",
    description:
      "قواعد ومفردات عملية، مبنية خصيصًا لمتعلم يتحدث التركية أصلًا.",
    seatsLeft: 14,
    price: "مجانًا",
    image: "/courses/arabic-for-turkish.jpg",
  },

  // الرياضيات
  {
    id: "algebra-foundations",
    subject: "math",
    title: "أساسيات الجبر",
    instructorId: "firas-oudeh",
    description:
      "المعادلات والمتباينات من الصفر، بخطوات واضحة وأمثلة محلولة أمامك سطرًا بسطر.",
    seatsLeft: 11,
    price: "مجانًا",
    image: "/courses/algebra-foundations.jpg",
  },
  {
    id: "geometry-proofs",
    subject: "math",
    title: "البراهين الهندسية",
    instructorId: "heba-rashid",
    description:
      "منطق البرهان الهندسي خطوة بخطوة، مع تدريب على حل المسائل بأسلوب منهجي.",
    seatsLeft: 7,
    price: "259 TL",
    image: "/courses/geometry-proofs.jpg",
  },
  {
    id: "calculus-1",
    subject: "math",
    title: "التفاضل والتكامل — المستوى الأول",
    instructorId: "yusuf-alnajjar",
    description:
      "من مفهوم النهايات إلى المشتقات الأولى، بشرح مرئي يبسّط الفكرة قبل الرمز.",
    seatsLeft: 4,
    price: "319 TL",
    image: "/courses/calculus-1.jpg",
  },
  {
    id: "statistics-basics",
    subject: "math",
    title: "الإحصاء وتحليل البيانات",
    instructorId: "sarah-qasem",
    description:
      "قراءة البيانات واتخاذ القرار منها، بأمثلة من الحياة اليومية لا من الكتاب فقط.",
    seatsLeft: 13,
    price: "مجانًا",
    image: "/courses/statistics-basics.jpg",
  },

  // البرمجة
  {
    id: "algorithms",
    subject: "code",
    title: "أساسيات الخوارزميات وهياكل البيانات",
    instructorId: "karim-alshami",
    description:
      "من الفرز والبحث إلى تحليل التعقيد الزمني، بأمثلة عملية مكتوبة أمامك خطوة بخطوة.",
    seatsLeft: 6,
    price: "299 TL",
    image: "/courses/algorithms.jpg",
  },
  {
    id: "python",
    subject: "code",
    title: "بايثون للمبتدئين",
    instructorId: "lina-farhat",
    description:
      "بناء أول برنامج حقيقي بلا خبرة مسبقة، مع تمارين مباشرة بعد كل جلسة.",
    seatsLeft: 15,
    price: "مجانًا",
    image: "/courses/python.jpg",
    level: "مبتدئ",
    studentsCount: 500,
    overview: [
      "هل أنت مستعد لتعلم إحدى أشهر لغات البرمجة؟ تبدأ هذه الدورة من الصفر وتأخذك خطوة بخطوة نحو كتابة أول برنامج حقيقي بلغة بايثون.",
      "بايثون لغة ممتازة للمبتدئين لأنها سهلة القراءة، ومجالات استخدامها واسعة جدًا: تطوير الويب، تحليل البيانات، الأتمتة، وأكثر.",
      "في هذه الدورة ستتعلم تثبيت بايثون وتشغيلها من سطر الأوامر، والتعامل مع المتغيرات وأنواع البيانات، والكود الشرطي، وصولًا إلى كتابة دوال (functions) خاصة بك.",
      "بحلول نهاية الدورة، ستكون قادرًا على كتابة برامج بسيطة، واكتشاف الأخطاء الشائعة وإصلاحها بنفسك.",
    ],
    curriculum: [
      {
        title: "لماذا نتعلم البرمجة؟",
        lessons: [{ title: "مقدمة الدورة" }, { title: "مواد الدورة" }],
      },
      {
        title: "أساسيات البرمجة",
        lessons: [
          { title: "ما هي البرمجة؟" },
          { title: "تثبيت بايثون" },
          { title: "تشغيل أول كود" },
          { title: "استخدام سطر الأوامر" },
        ],
      },
      {
        title: "تركيب جمل البرمجة",
        lessons: [
          { title: "بنية الكود" },
          { title: "التعليقات (Comments)" },
          { title: "الأخطاء الشائعة وإصلاحها" },
        ],
      },
      {
        title: "المتغيرات وأنواع البيانات",
        lessons: [
          { title: "تعريف المتغيرات" },
          { title: "الأرقام والسلاسل النصية" },
          { title: "المسافات البيضاء" },
          { title: "تمرين تطبيقي" },
        ],
      },
      {
        title: "الكود الشرطي",
        lessons: [
          { title: "جمل if / else" },
          { title: "العمليات المنطقية" },
          { title: "تمرين تطبيقي" },
        ],
      },
      {
        title: "الكود المعياري (الدوال)",
        lessons: [
          { title: "إنشاء دالة واستدعاؤها" },
          { title: "المعاملات والقيم المُرجعة" },
          { title: "التسليم النهائي للدورة" },
        ],
      },
    ],
    features: [
      "شهادة موثقة عند إتمام الدورة",
      "قياس مستوى التقدم والإنجاز عبر الدورة",
      "إجابة من مشرفي الطلاب على كل الأسئلة",
      "اشتراك مدى الحياة",
    ],
    faqs: [
      {
        question: "كيف أبدأ تعلم البرمجة باستخدام بايثون؟",
        answer:
          "تبدأ هذه الدورة معك من الصفر: المتغيرات، أنواع البيانات، وتركيب جمل البرمجة، وصولًا إلى كتابة برامج بسيطة بنفسك.",
      },
      {
        question: "هل أحتاج خبرة سابقة في البرمجة؟",
        answer:
          "لا، الدورة مصممة للمبتدئين تمامًا ولا تفترض أي خلفية برمجية مسبقة.",
      },
      {
        question: "ما هي استخدامات لغة بايثون؟",
        answer:
          "تطوير الويب، تحليل البيانات، الأتمتة، والذكاء الاصطناعي — من أكثر اللغات استخدامًا في هذه المجالات.",
      },
    ],
  },
  {
    id: "frontend",
    subject: "code",
    title: "تطوير الويب — Frontend",
    instructorId: "omar-bilal",
    description:
      "React ومبادئ التصميم التفاعلي، وبناء مشروع كامل ينضم إلى معرض أعمالك.",
    seatsLeft: 3,
    price: "349 TL",
    image: "/courses/frontend.jpg",
  },
  {
    id: "data-structures",
    subject: "code",
    title: "هياكل البيانات المتقدمة",
    instructorId: "tariq-mansour",
    description:
      "الأشجار، الرسوم البيانية، والتعامل مع مسائل المقابلات التقنية الحقيقية.",
    seatsLeft: 9,
    price: "299 TL",
    image: "/courses/data-structures.jpg",
  },
];

export function getCoursesBySubject(subject: CourseSubject): Course[] {
  return courses.filter((course) => course.subject === subject);
}

/** Bir eğitmenin verdiği tüm kursları döndürür (instructor detay sayfasında kullanılır). */
export function getCoursesByInstructor(instructorId: string): Course[] {
  return courses.filter((course) => course.instructorId === instructorId);
}

/** Bir kursu, bağlı olduğu eğitmen kaydıyla birlikte döndürür (join). */
export function getCourseWithInstructor(courseId: string) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return undefined;
  return { course, instructor: getInstructorById(course.instructorId) };
}