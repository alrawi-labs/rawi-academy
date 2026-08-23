// Merkezi eğitmen verisi. courses.ts içindeki her kayıt, kendi `instructorId`
// alanıyla buradaki bir eğitmene işaret eder. Bir eğitmen birden fazla kursta
// yer alabilir — o yüzden ilişki instructor -> courses değil, course -> instructor
// yönünde tek bir id üzerinden kuruluyor (course.instructorId).
//
// Yeni bir eğitmen eklemek için sadece bu diziye yeni bir kayıt eklemen yeterli;
// sonra ilgili kursta instructorId'yi bu kaydın id'siyle eşleştir.

export type Subject = "القرآن والسنة" | "البرمجة" | "الرياضيات" | "اللغات";

export type Instructor = {
  id: string;
  name: string;
  /** Örn: "الشيخ", "الدكتورة", "الأستاذ", "المهندس" — isimden ayrı, unvan rozetlerinde kullanmak için. */
  title: string;
  /** Kart rengini ve gruplamayı belirleyen sabit eşleme — design system §1. */
  subject: Subject;
  bio: string;
  /** /public altında gerçek fotoğraf yolu. */
  avatar: string;
  /**
   * Uzun görev tanımı (örn. "مهندس حاسوب ومدرب برمجة"). Opsiyonel — TeamSection
   * gibi alıntı kartlarında `title`'dan daha detaylı bir açıklama gerektiğinde
   * kullanılır. Yoksa bileşenler `title` alanına düşer.
   */
  role?: string;
  /** Çalıştığı/çalıştığı kurumlar listesi (TeamSection alıntı kartında rozet olarak gösteriliyor). */
  companies?: string[];
  /** true ise TeamSection'daki öne çıkan alıntı kartlarında gösterilir. */
  featured: boolean;
  /**
   * Kısa iş/kurum unvanı (örn. "مؤسس أكاديمية راوي"). Opsiyonel — herkeste
   * olması gerekmiyor. InstructorsSection kartında isim satırının altında,
   * rozetsiz düz yazı olarak gösterilir.
   */
  position?: string;
};

// ⚠️ Placeholder veri — bio ve avatar yollarını gerçek içerikle değiştir.
export const instructors: Instructor[] = [
  // القرآن
  {
    id: "abdullah-alhomsi",
    name: "عبد الله الحمصي",
    title: "الشيخ",
    subject: "القرآن والسنة",
    bio: "مُجاز بالقراءات، متخصص في تحفيظ القرآن الكريم ومتابعة الطلاب بخطط مراجعة أسبوعية.",
    avatar: "/instructors/abdullah-alhomsi.png",
    featured: false,
  },
  {
    id: "sarah-alnuaimi",
    name: "سارة النعيمي",
    title: "الدكتورة",
    subject: "القرآن والسنة",
    bio: "باحثة في التفسير وأسباب النزول، تركّز على ربط النص القرآني بواقع الحياة اليومية.",
    avatar: "/instructors/sarah-alnuaimi.png",
    featured: false,
  },
  {
    id: "yusuf-alatasi",
    name: "يوسف الأتاسي",
    title: "الشيخ",
    subject: "القرآن والسنة",
    bio: "متخصص في أحكام التجويد ومخارج الحروف، بخبرة طويلة في التصحيح الصوتي المباشر.",
    avatar: "/instructors/yusuf-alatasi.jpg",
    featured: false,
  },
  {
    id: "ahmad-alrifai",
    name: "أحمد الرفاعي",
    title: "الشيخ",
    subject: "القرآن والسنة",
    bio: "مهتم بشرح السنة النبوية وربطها بآداب السلوك اليومي للطالب.",
    avatar: "/instructors/ahmad-alrifai.jpg",
    featured: false,
  },

  // اللغات
  {
    id: "aysha-yilmaz",
    name: "أيشه يلماز",
    title: "الأستاذة",
    subject: "اللغات",
    bio: "مدرّبة لغة تركية للناطقين بالعربية، متخصصة في تأسيس المبتدئين من الصفر.",
    avatar: "/instructors/aysha-yilmaz.jpg",
    featured: false,
  },
  {
    id: "murat-kaya",
    name: "مراد كايا",
    title: "الأستاذ",
    subject: "اللغات",
    bio: "يركّز على المحادثة والطلاقة عبر مواقف حياتية حقيقية بدل الحفظ النظري.",
    avatar: "/instructors/murat-kaya.jpg",
    featured: false,
  },
  {
    id: "rana-khalil",
    name: "رنا خليل",
    title: "الأستاذة",
    subject: "اللغات",
    bio: "متخصصة في الإنجليزية لبيئة العمل، بخبرة في تدريب المصطلحات المهنية.",
    avatar: "/instructors/rana-khalil.jpg",
    featured: false,
  },
  {
    id: "ibrahim-demirtas",
    name: "إبراهيم ديميرتاش",
    title: "الأستاذ",
    subject: "اللغات",
    bio: "مدرّس لغة عربية مبني منهجه خصيصًا لمتعلم يتحدث التركية أصلًا.",
    avatar: "/instructors/ibrahim-demirtas.jpg",
    featured: false,
  },
  {
    id: "hussein-alkhafaji",
    name: "حسين الخفاجي",
    title: "الأستاذ",
    subject: "اللغات",
    bio: "تؤمن أن تعلّم لغةٍ جديدة رحلة وليس اختبارًا، فبَنَت أسلوبًا يجعل الطالب يفكّر باللغة قبل أن يتقنها.",
    avatar: "/instructors/huseyinkhafaji.png",
    role: "معلّم اللغة الإنجليزية",
    companies: ["Microsoft", "British Council"],
    featured: true,
  },

  // الرياضيات
  {
    id: "firas-oudeh",
    name: "فراس عودة",
    title: "الأستاذ",
    subject: "الرياضيات",
    bio: "يشرح أساسيات الجبر بخطوات واضحة وأمثلة محلولة سطرًا بسطر.",
    avatar: "/instructors/firas-oudeh.jpg",
    featured: false,
  },
  {
    id: "heba-rashid",
    name: "هبة رشيد",
    title: "الدكتورة",
    subject: "الرياضيات",
    bio: "متخصصة في تدريس البراهين الهندسية بأسلوب منهجي خطوة بخطوة.",
    avatar: "/instructors/heba-rashid.jpg",
    featured: false,
  },
  {
    id: "yusuf-alnajjar",
    name: "يوسف النجار",
    title: "الأستاذ",
    subject: "الرياضيات",
    bio: "يبسّط مفاهيم التفاضل والتكامل بشرح مرئي يقدّم الفكرة قبل الرمز.",
    avatar: "/instructors/yusuf-alnajjar.jpg",
    featured: false,
  },
  {
    id: "sarah-qasem",
    name: "سارة قاسم",
    title: "الأستاذة",
    subject: "الرياضيات",
    bio: "تدرّس الإحصاء وتحليل البيانات بأمثلة من الحياة اليومية.",
    avatar: "/instructors/sarah-qasem.jpg",
    featured: false,
  },
  {
    id: "mansour-salam",
    name: "منصور سلام",
    title: "الأستاذ",
    subject: "الرياضيات",
    bio: "خبرة تمتد لسنوات في تبسيط المفاهيم المعقّدة، وتحويلها إلى دروسٍ يفهمها الطالب من أول مرة دون أن يشعر أنه يتلقّى محاضرة.",
    avatar: "/instructors/mansurselam.png",
    role: "معلّم الرياضيات وعلوم الحاسب",
    companies: ["Google", "Cairo University"],
    featured: true,
  },

  // البرمجة
  {
    id: "karim-alshami",
    name: "كريم الشامي",
    title: "المهندس",
    subject: "البرمجة",
    bio: "متخصص في الخوارزميات وهياكل البيانات، بخبرة عملية في تحليل التعقيد الزمني.",
    avatar: "/instructors/karim-alshami.jpg",
    featured: false,
  },
  {
    id: "lina-farhat",
    name: "لينا فرحات",
    title: "المهندسة",
    subject: "البرمجة",
    bio: "تعلّم بايثون للمبتدئين عبر مشاريع عملية وتمارين مباشرة بعد كل جلسة.",
    avatar: "/instructors/lina-farhat.jpg",
    featured: false,
  },
  {
    id: "omar-bilal",
    name: "عمر بيلال",
    title: "المهندس",
    subject: "البرمجة",
    bio: "مطوّر Frontend، يركّز على React ومبادئ التصميم التفاعلي عبر مشاريع حقيقية.",
    avatar: "/instructors/omar-bilal.jpg",
    featured: false,
  },
  {
    id: "tariq-mansour",
    name: "طارق منصور",
    title: "الدكتور",
    subject: "البرمجة",
    bio: "متخصص في هياكل البيانات المتقدمة وحل مسائل المقابلات التقنية.",
    avatar: "/instructors/tariq-mansour.jpg",
    featured: false,
  },
  {
    id: "yasir-alrawi",
    name: "ياسر الراوي",
    title: "المهندس",
    subject: "البرمجة",
    bio: "قضى سنواتٍ في بناء أنظمةٍ حقيقية قبل أن يتفرّغ لتعليم الجيل القادم كيف يفكّر كمبرمج، لا كيف يحفظ الأكواد فقط.",
    avatar: "/instructors/yasiralrawi.png",
    role: "مهندس حاسوب ومدرب برمجة",
    companies: ["Bayraktar Solar Enerji", "KKÜ Information Technology Department"],
    featured: true,
    position: "مؤسس أكاديمية راوي",
  },
];

export function getInstructorById(id: string): Instructor | undefined {
  return instructors.find((instructor) => instructor.id === id);
}

/** Eğitmenin unvan + isim birleşik gösterimi, örn. "الشيخ عبد الله الحمصي". */
export function getInstructorDisplayName(instructor: Instructor): string {
  return `${instructor.title} ${instructor.name}`;
}