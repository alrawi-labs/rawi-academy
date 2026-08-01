"use client";

import Image from "next/image";
import type { AccentColor } from "./CardInteractiveShell";
import Button from "../ui/Button";

// ⚠️ Placeholder veri — gerçek kurs/eğitmen/tarih/fiyat bilgilerini
// kendi içeriğinle değiştir. `image`: /public altında gerçek fotoğraf.
const courses = [
  {
    id: "hifz",
    title: "حفظ القرآن الكريم",
    instructor: "الشيخ عبد الله الحمصي",
    description:
      "برنامج مباشر بمجموعات صغيرة، بخطة مراجعة أسبوعية تثبّت المحفوظ وتمنع النسيان.",
    seatsLeft: 4,
    price: "مجانًا",
    image: "/courses/hifz.jpg",
  },
  {
    id: "tafsir",
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
    title: "السنة النبوية",
    instructor: "الشيخ أحمد الرفاعي",
    description:
      "أحاديث نبوية مختارة وشروحها، وربطها بآداب السلوك اليومي للطالب.",
    seatsLeft: 18,
    price: "مجانًا",
    image: "/courses/sunnah.jpg",
  },
];

// Kart aksanı → gerçek CSS değişkenlerine eşleniyor.
// Yumuşak tonlar (badge/border/overlay) için accent-*/primary-light/orange-bg-hover,
// güçlü tonlar (buton, live nokta) için visual-*/primary/orange kullanılıyor.
const accentBorderHover: Record<AccentColor, string> = {
  teal: "hover:border-accent-teal",
  purple: "hover:border-primary",
  pink: "hover:border-accent-pink",
  orange: "hover:border-orange",
};

const photoOverlay: Record<AccentColor, string> = {
  teal: "bg-accent-teal/20",
  purple: "bg-primary/20",
  pink: "bg-accent-pink/20",
  orange: "bg-orange/20",
};

const accentButton: Record<AccentColor, string> = {
  teal: "bg-visual-teal hover:bg-teal-500 hover:opacity-90",
  purple: "bg-primary hover:bg-primary-hover",
  pink: "bg-visual-pink hover:opacity-90",
  orange: "bg-orange hover:opacity-90",
};

export default function QuranCoursesList({
  accent = "teal",
}: {
  accent?: AccentColor;
}) {
  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className={`w-full rounded-sm border border-neutral-200 bg-neutral-0 overflow-hidden
            flex flex-col sm:flex-row transition-colors ${accentBorderHover[accent]}`}
        >
          <div className="relative w-full h-52 sm:w-64 sm:h-auto shrink-0">
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="(max-width: 640px) 100vw, 256px"
              className="object-cover"
            />
            <div
              className={`absolute inset-0 mix-blend-multiply ${photoOverlay[accent]}`}
            />

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
                    course.price === "مجانًا"
                      ? "text-primary"
                      : "text-neutral-900"
                  }`}
                >
                  {course.price}
                </span>
                <Button className={`${accentButton[accent]} text-neutral-0`}>
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
