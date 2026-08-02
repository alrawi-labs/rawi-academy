"use client";

import Image from "next/image";
import Button from "../ui/Button";

// ⚠️ Placeholder veri — gerçek kurs/eğitmen/fiyat bilgilerini
// kendi içeriğinle değiştir. `image`: /public altında gerçek fotoğraf.
const courses = [
  {
    id: "turkish-a1",
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
    title: "العربية للناطقين بالتركية",
    instructor: "الأستاذ إبراهيم ديميرتاش",
    description:
      "قواعد ومفردات عملية، مبنية خصيصًا لمتعلم يتحدث التركية أصلًا.",
    seatsLeft: 14,
    price: "مجانًا",
    image: "/courses/arabic-for-turkish.jpg",
  },
];

export default function LanguageCoursesList() {
  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="w-full rounded-sm border border-neutral-200 bg-neutral-0 overflow-hidden
            flex flex-col sm:flex-row transition-colors hover:border-accent-pink"
        >
          <div className="relative w-full h-52 sm:w-64 sm:h-auto shrink-0">
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="(max-width: 640px) 100vw, 256px"
              className="object-cover"
            />
            <div className="absolute inset-0 mix-blend-multiply bg-accent-pink/20" />

            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-sm bg-neutral-900/70 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="font-thmanyah-text text-micro font-bold tracking-wide text-neutral-0">
                مباشر
              </span>
            </span>
          </div>

          <div className="flex-1 min-w-0 p-6 sm:p-8 flex flex-col text-right">
            <h3 className="font-thmanyah-display font-bold text-h3-sm sm:text-h3 text-neutral-900">
              {course.title}
            </h3>

            <span className="font-thmanyah-text text-caption text-neutral-700 mt-1">
              {course.instructor}
            </span>

            <p className="font-thmanyah-text text-body text-neutral-700 mt-3 leading-relaxed line-clamp-2">
              {course.description}
            </p>

            <div className="mt-auto pt-6 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-thmanyah-text text-micro font-bold text-orange">
                  بقي {course.seatsLeft} مقاعد فقط
                </span>
              </div>
              <div>
                <span
                  className={`rounded-sm px-2.5 py-1 font-thmanyah-text text-caption font-bold backdrop-blur-sm ${
                    course.price === "مجانًا" ? "text-primary" : "text-neutral-900"
                  }`}
                >
                  {course.price}
                </span>
                <Button variant="pink">تفاصيل الدورة</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}