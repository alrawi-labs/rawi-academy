"use client";

import Image from "next/image";
import Button from "../ui/Button";

// ⚠️ Placeholder veri — gerçek kurs/eğitmen/fiyat bilgilerini
// kendi içeriğinle değiştir. `image`: /public altında gerçek fotoğraf.
const courses = [
  {
    id: "algorithms",
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
    title: "هياكل البيانات المتقدمة",
    instructor: "الدكتور طارق منصور",
    description:
      "الأشجار، الرسوم البيانية، والتعامل مع مسائل المقابلات التقنية الحقيقية.",
    seatsLeft: 9,
    price: "299 TL",
    image: "/courses/data-structures.jpg",
  },
];

export default function ProgrammingCoursesList() {
  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="w-full rounded-sm border border-neutral-200 bg-neutral-0 overflow-hidden
            flex flex-col sm:flex-row transition-colors hover:border-primary"
        >
          <div className="relative w-full h-52 sm:w-64 sm:h-auto shrink-0">
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="(max-width: 640px) 100vw, 256px"
              className="object-cover"
            />
            <div className="absolute inset-0 mix-blend-multiply bg-primary/20" />

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
                <Button className="bg-primary hover:bg-primary-hover text-neutral-0">
                  تفاصيل الدورة
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}