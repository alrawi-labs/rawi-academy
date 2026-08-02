"use client";

import Image from "next/image";
import Button from "../ui/Button";

// ⚠️ Placeholder veri — gerçek kurs/eğitmen/fiyat bilgilerini
// kendi içeriğinle değiştir. `image`: /public altında gerçek fotoğraf.
const courses = [
  {
    id: "algebra-foundations",
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
    title: "الإحصاء وتحليل البيانات",
    instructor: "الأستاذة سارة قاسم",
    description:
      "قراءة البيانات واتخاذ القرار منها، بأمثلة من الحياة اليومية لا من الكتاب فقط.",
    seatsLeft: 13,
    price: "مجانًا",
    image: "/courses/statistics-basics.jpg",
  },
];

export default function MathCoursesList() {
  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="w-full rounded-sm border border-neutral-200 bg-neutral-0 overflow-hidden
            flex flex-col sm:flex-row transition-colors hover:border-orange"
        >
          <div className="relative w-full h-52 sm:w-64 sm:h-auto shrink-0">
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="(max-width: 640px) 100vw, 256px"
              className="object-cover"
            />
            <div className="absolute inset-0 mix-blend-multiply bg-orange/20" />

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
                <Button variant="orange-solid">تفاصيل الدورة</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}