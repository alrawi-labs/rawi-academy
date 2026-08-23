// src/data/consultants.ts
// مصدر بيانات واحد للمجالات والخبراء — عدّل هنا فقط، لا تكرر البيانات داخل الـ Components.
// ملاحظة: القيم أدناه بيانات نموذجية (placeholder) لتوضيح الشكل والبنية فقط.
// استبدلها ببيانات راوي الحقيقية قبل النشر (الأسماء، الصور، الأسعار).

export type ConsultationCategoryId =
  | "code"
  | "ai"
  | "data-science"
  | "web-dev"
  | "tech-projects"
  | "learning"
  | "career"
  | "major-choice"
  | "university-projects"
  | "research";

export interface ConsultationCategory {
  id: ConsultationCategoryId;
  label: string;
  /** فقرة قصيرة تشرح نوع المشاكل التي يغطيها هذا المجال — تُستخدم في Section 4، ليست زخرفة */
  description: string;
  /** هل المجال متاح فعليًا حاليًا؟ الفلاتر تعرض هذا بصدق بدل افتراض التوفر */
  available: boolean;
}

export const CONSULTATION_CATEGORIES: ConsultationCategory[] = [
  {
    id: "code",
    label: "البرمجة",
    description: "من أخطاء بسيطة في الكود إلى قرارات معمارية أكبر.",
    available: true,
  },
  {
    id: "ai",
    label: "الذكاء الاصطناعي",
    description: "من أين تبدأ، وكيف تبني مشروعًا حقيقيًا لا نموذجًا تجريبيًا فقط.",
    available: true,
  },
  {
    id: "data-science",
    label: "علوم البيانات",
    description: "تنظيف البيانات، بناء النماذج، وفهم ما تحتاجه فعليًا لمشروعك.",
    available: true,
  },
  {
    id: "web-dev",
    label: "تطوير الويب",
    description: "من اختيار التقنية المناسبة إلى حل مشاكل الأداء والبنية.",
    available: true,
  },
  {
    id: "tech-projects",
    label: "المشاريع التقنية",
    description: "توجيه في التخطيط والتنفيذ لمشروعك التقني من الفكرة حتى الإطلاق.",
    available: true,
  },
  {
    id: "learning",
    label: "التعلم والدراسة",
    description: "بناء خطة تعلم واقعية تناسب وقتك ومستواك الحالي.",
    available: true,
  },
  {
    id: "career",
    label: "المسار المهني",
    description: "فهم خياراتك المهنية واتخاذ قرارك التالي بثقة أكبر.",
    available: true,
  },
  {
    id: "major-choice",
    label: "اختيار التخصص",
    description: "مقارنة واقعية بين التخصصات بناءً على ميولك وسوق العمل.",
    available: false,
  },
  {
    id: "university-projects",
    label: "المشاريع الجامعية",
    description: "توجيه في مشروع التخرج أو أبحاثك الجامعية من الفكرة إلى التسليم.",
    available: false,
  },
  {
    id: "research",
    label: "البحث والتطوير",
    description: "مساعدة في صياغة سؤال البحث ومنهجيته وخطواته العملية.",
    available: false,
  },
];

export interface Consultant {
  slug: string;
  name: string;
  title: string;
  specialty: string;
  categories: ConsultationCategoryId[];
  bio: string;
  /** المشاكل المحددة التي يستطيع مساعدتك فيها — تُعرض كنقاط قصيرة، ليست وصفًا عامًا */
  helpsWith: string[];
  durationMinutes: number;
  /** null يعني السعر غير معلن بعد — لا تخترع رقمًا */
  price: number | null;
  currency: "SAR" | "USD" | null;
  portraitUrl: string;
  featured?: boolean;
}

export const CONSULTANTS: Consultant[] = [
  {
    slug: "yusuf-a",
    name: "يوسف العتيبي",
    title: "مهندس برمجيات",
    specialty: "بنية الأنظمة وتطوير الواجهات الخلفية",
    categories: ["code", "web-dev", "tech-projects"],
    bio: "8 سنوات في بناء أنظمة إنتاجية، من الشركات الناشئة إلى الفرق الكبيرة. يركّز في الاستشارة على القرارات التي تكلفك وقتًا لاحقًا إن أخطأت فيها الآن.",
    helpsWith: [
      "اختيار البنية التقنية المناسبة لمشروعك",
      "مراجعة كود أو معمارية قائمة",
      "الاستعداد لمقابلات هندسة البرمجيات",
    ],
    durationMinutes: 45,
    price: 150,
    currency: "SAR",
    portraitUrl: "/consultants/yusuf-a.jpg",
    featured: true,
  },
  {
    slug: "layla-h",
    name: "ليلى حمدان",
    title: "باحثة تعلم آلي",
    specialty: "نماذج اللغة وتطبيقات الذكاء الاصطناعي",
    categories: ["ai", "data-science", "research"],
    bio: "تعمل على أبحاث تطبيقية في معالجة اللغة الطبيعية، وسبق أن أشرفت على عدة مشاريع تخرج في نفس المجال.",
    helpsWith: [
      "صياغة فكرة مشروع ذكاء اصطناعي قابلة للتنفيذ",
      "اختيار الأدوات والنماذج المناسبة لحالتك",
      "فهم أساسيات نماذج اللغة دون تعقيد زائد",
    ],
    durationMinutes: 45,
    price: 180,
    currency: "SAR",
    portraitUrl: "/consultants/layla-h.jpg",
    featured: true,
  },
  {
    slug: "omar-s",
    name: "عمر الشريف",
    title: "مستشار مسار مهني تقني",
    specialty: "الانتقال المهني في المجال التقني",
    categories: ["career", "learning"],
    bio: "رافق عشرات المتعلمين في مرحلة الانتقال من التعلم الذاتي إلى أول وظيفة تقنية، ويعرف الفجوة الحقيقية بين الاثنين.",
    helpsWith: [
      "تقييم جاهزيتك الفعلية لسوق العمل",
      "بناء خطة تعلم واقعية للأشهر القادمة",
      "مراجعة سيرتك الذاتية ومسارك المهني",
    ],
    durationMinutes: 30,
    price: 100,
    currency: "SAR",
    portraitUrl: "/consultants/omar-s.jpg",
  },
  {
    slug: "sara-m",
    name: "سارة المطيري",
    title: "مطوّرة واجهات أمامية أولى",
    specialty: "أداء الواجهات وتجربة المستخدم التقنية",
    categories: ["web-dev", "code"],
    bio: "قادت فرق واجهات أمامية في أكثر من منتج تقني، وتحب تبسيط القرارات التقنية المعقدة لمن هم في بداية الطريق.",
    helpsWith: [
      "حل مشاكل أداء محددة في مشروعك",
      "مراجعة قرارات تصميم الواجهة والبنية",
      "التخطيط لتعلم إطار عمل جديد بدون تشتت",
    ],
    durationMinutes: 45,
    price: null,
    currency: null,
    portraitUrl: "/consultants/sara-m.jpg",
  },
];