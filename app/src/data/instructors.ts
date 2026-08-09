// Merkezi eğitmen verisi. courses.ts içindeki her kayıt, kendi `instructorId`
// alanıyla buradaki bir eğitmene işaret eder. Bir eğitmen birden fazla kursta
// yer alabilir — o yüzden ilişki instructor -> courses değil, course -> instructor
// yönünde tek bir id üzerinden kuruluyor (course.instructorId).
//
// Yeni bir eğitmen eklemek için sadece bu diziye yeni bir kayıt eklemen yeterli;
// sonra ilgili kursta instructorId'yi bu kaydın id'siyle eşleştir.

export type Instructor = {
  id: string;
  name: string;
  /** Örn: "الشيخ", "الدكتورة", "الأستاذ", "المهندس" — isimden ayrı, unvan rozetlerinde kullanmak için. */
  title: string;
  bio: string;
  /** /public altında gerçek fotoğraf yolu. */
  avatar: string;
};

// ⚠️ Placeholder veri — bio ve avatar yollarını gerçek içerikle değiştir.
export const instructors: Instructor[] = [
  // القرآن
  {
    id: "abdullah-alhomsi",
    name: "عبد الله الحمصي",
    title: "الشيخ",
    bio: "مُجاز بالقراءات، متخصص في تحفيظ القرآن الكريم ومتابعة الطلاب بخطط مراجعة أسبوعية.",
    avatar: "/instructors/abdullah-alhomsi.png",
  },
  {
    id: "sarah-alnuaimi",
    name: "سارة النعيمي",
    title: "الدكتورة",
    bio: "باحثة في التفسير وأسباب النزول، تركّز على ربط النص القرآني بواقع الحياة اليومية.",
    avatar: "/instructors/sarah-alnuaimi.png",
  },
  {
    id: "yusuf-alatasi",
    name: "يوسف الأتاسي",
    title: "الشيخ",
    bio: "متخصص في أحكام التجويد ومخارج الحروف، بخبرة طويلة في التصحيح الصوتي المباشر.",
    avatar: "/instructors/yusuf-alatasi.jpg",
  },
  {
    id: "ahmad-alrifai",
    name: "أحمد الرفاعي",
    title: "الشيخ",
    bio: "مهتم بشرح السنة النبوية وربطها بآداب السلوك اليومي للطالب.",
    avatar: "/instructors/ahmad-alrifai.jpg",
  },

  // اللغات
  {
    id: "aysha-yilmaz",
    name: "أيشه يلماز",
    title: "الأستاذة",
    bio: "مدرّبة لغة تركية للناطقين بالعربية، متخصصة في تأسيس المبتدئين من الصفر.",
    avatar: "/instructors/aysha-yilmaz.jpg",
  },
  {
    id: "murat-kaya",
    name: "مراد كايا",
    title: "الأستاذ",
    bio: "يركّز على المحادثة والطلاقة عبر مواقف حياتية حقيقية بدل الحفظ النظري.",
    avatar: "/instructors/murat-kaya.jpg",
  },
  {
    id: "rana-khalil",
    name: "رنا خليل",
    title: "الأستاذة",
    bio: "متخصصة في الإنجليزية لبيئة العمل، بخبرة في تدريب المصطلحات المهنية.",
    avatar: "/instructors/rana-khalil.jpg",
  },
  {
    id: "ibrahim-demirtas",
    name: "إبراهيم ديميرتاش",
    title: "الأستاذ",
    bio: "مدرّس لغة عربية مبني منهجه خصيصًا لمتعلم يتحدث التركية أصلًا.",
    avatar: "/instructors/ibrahim-demirtas.jpg",
  },

  // الرياضيات
  {
    id: "firas-oudeh",
    name: "فراس عودة",
    title: "الأستاذ",
    bio: "يشرح أساسيات الجبر بخطوات واضحة وأمثلة محلولة سطرًا بسطر.",
    avatar: "/instructors/firas-oudeh.jpg",
  },
  {
    id: "heba-rashid",
    name: "هبة رشيد",
    title: "الدكتورة",
    bio: "متخصصة في تدريس البراهين الهندسية بأسلوب منهجي خطوة بخطوة.",
    avatar: "/instructors/heba-rashid.jpg",
  },
  {
    id: "yusuf-alnajjar",
    name: "يوسف النجار",
    title: "الأستاذ",
    bio: "يبسّط مفاهيم التفاضل والتكامل بشرح مرئي يقدّم الفكرة قبل الرمز.",
    avatar: "/instructors/yusuf-alnajjar.jpg",
  },
  {
    id: "sarah-qasem",
    name: "سارة قاسم",
    title: "الأستاذة",
    bio: "تدرّس الإحصاء وتحليل البيانات بأمثلة من الحياة اليومية.",
    avatar: "/instructors/sarah-qasem.jpg",
  },

  // البرمجة
  {
    id: "karim-alshami",
    name: "كريم الشامي",
    title: "المهندس",
    bio: "متخصص في الخوارزميات وهياكل البيانات، بخبرة عملية في تحليل التعقيد الزمني.",
    avatar: "/instructors/karim-alshami.jpg",
  },
  {
    id: "lina-farhat",
    name: "لينا فرحات",
    title: "المهندسة",
    bio: "تعلّم بايثون للمبتدئين عبر مشاريع عملية وتمارين مباشرة بعد كل جلسة.",
    avatar: "/instructors/lina-farhat.jpg",
  },
  {
    id: "omar-bilal",
    name: "عمر بيلال",
    title: "المهندس",
    bio: "مطوّر Frontend، يركّز على React ومبادئ التصميم التفاعلي عبر مشاريع حقيقية.",
    avatar: "/instructors/omar-bilal.jpg",
  },
  {
    id: "tariq-mansour",
    name: "طارق منصور",
    title: "الدكتور",
    bio: "متخصص في هياكل البيانات المتقدمة وحل مسائل المقابلات التقنية.",
    avatar: "/instructors/tariq-mansour.jpg",
  },
];

export function getInstructorById(id: string): Instructor | undefined {
  return instructors.find((instructor) => instructor.id === id);
}

/** Eğitmenin unvan + isim birleşik gösterimi, örn. "الشيخ عبد الله الحمصي". */
export function getInstructorDisplayName(instructor: Instructor): string {
  return `${instructor.title} ${instructor.name}`;
}