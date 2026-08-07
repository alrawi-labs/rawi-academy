// Merkezi kurs verisi. Tüm konulardaki (قرآن/برمجة/رياضيات/لغات) kurslar burada
// tek bir dizide tutulur; bileşenler `getCoursesBySubject` ile kendi konusuna
// ait kayıtları filtreler. Yeni bir kurs eklemek için sadece bu diziye yeni bir
// kayıt eklemen yeterli — hiçbir bileşene dokunmana gerek yok.

export type CourseSubject = "quran" | "languages" | "math" | "programming";

export type Course = {
  id: string;
  subject: CourseSubject;
  title: string;
  instructor: string;
  description: string;
  seatsLeft: number;
  price: string; // "مجانًا" veya "199 TL" gibi — format standartlaşınca number'a çevrilebilir
  image: string; // /public altında gerçek fotoğraf yolu
};

// ⚠️ Placeholder veri — gerçek kurs/eğitmen/fiyat bilgilerini kendi içeriğinle değiştir.
export const courses: Course[] = [
  // القرآن
  {
    id: "hifz",
    subject: "quran",
    title: "حفظ القرآن الكريم",
    instructor: "الشيخ عبد الله الحمصي",
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
    instructor: "الدكتورة سارة النعيمي",
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
    instructor: "الشيخ يوسف الأتاسي",
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
    instructor: "الشيخ أحمد الرفاعي",
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
    instructor: "الأستاذة أيشه يلماز",
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
    instructor: "الأستاذ مراد كايا",
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
    instructor: "الأستاذة رنا خليل",
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
    instructor: "الأستاذ إبراهيم ديميرتاش",
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
    instructor: "الأستاذ فراس عودة",
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
    instructor: "الدكتورة هبة رشيد",
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
    instructor: "الأستاذ يوسف النجار",
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
    instructor: "الأستاذة سارة قاسم",
    description:
      "قراءة البيانات واتخاذ القرار منها، بأمثلة من الحياة اليومية لا من الكتاب فقط.",
    seatsLeft: 13,
    price: "مجانًا",
    image: "/courses/statistics-basics.jpg",
  },

  // البرمجة
  {
    id: "algorithms",
    subject: "programming",
    title: "أساسيات الخوارزميات وهياكل البيانات",
    instructor: "المهندس كريم الشامي",
    description:
      "من الفرز والبحث إلى تحليل التعقيد الزمني، بأمثلة عملية مكتوبة أمامك خطوة بخطوة.",
    seatsLeft: 6,
    price: "299 TL",
    image: "/courses/algorithms.jpg",
  },
  {
    id: "python",
    subject: "programming",
    title: "بايثون للمبتدئين",
    instructor: "المهندسة لينا فرحات",
    description:
      "بناء أول برنامج حقيقي بلا خبرة مسبقة، مع تمارين مباشرة بعد كل جلسة.",
    seatsLeft: 15,
    price: "مجانًا",
    image: "/courses/python.jpg",
  },
  {
    id: "frontend",
    subject: "programming",
    title: "تطوير الويب — Frontend",
    instructor: "المهندس عمر بيلال",
    description:
      "React ومبادئ التصميم التفاعلي، وبناء مشروع كامل ينضم إلى معرض أعمالك.",
    seatsLeft: 3,
    price: "349 TL",
    image: "/courses/frontend.jpg",
  },
  {
    id: "data-structures",
    subject: "programming",
    title: "هياكل البيانات المتقدمة",
    instructor: "الدكتور طارق منصور",
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