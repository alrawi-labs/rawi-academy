"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionContainer } from "../components/layout/SectionContainer";
import { SectionLede } from "../components/layout/SectionLede";
import { LINKS } from "../lib/links";

type Track = {
  title: string;
  description: string;
  href: string;
  accent: string;
  photo: string;
};

const tracks: Track[] = [
  {
    title: "دورات القرآن",
    description: "تفسير، حفظ، ومتابعة مستمرة ضمن برنامجٍ واضح ومتدرّج.",
    href: LINKS.courses.quran,
    accent: "var(--color-visual-teal)",
    photo: "/backgrounds/bg-27.png",
  },
  {
    title: "دورات البرمجة",
    description: "من الأساسيات إلى بناء مشاريع حقيقية، خطوةً بخطوة.",
    href: LINKS.courses.code,
    accent: "var(--color-primary)",
    photo: "/backgrounds/bg-29.png",
  },
  {
    title: "دورات اللغات",
    description: "تعلّم لغة جديدة كرحلة ممتعة، لا كاختبار ينتهي بيومٍ واحد.",
    href: LINKS.courses.languages,
    accent: "var(--color-visual-pink)",
    photo: "/backgrounds/bg-30.png",
  },
  {
    title: "دورات الرياضيات",
    description: "مفاهيم معقّدة تتحوّل إلى دروسٍ واضحة تُفهم من أول مرة.",
    href: LINKS.courses.math,
    accent: "var(--color-orange)",
    photo: "/backgrounds/bg-28.png",
  },
];

export default function ExploreTracksSection() {
  return (
    <section dir="rtl" className="relative pt-20 sm:pt-24 lg:pt-28">
      <SectionContainer>
        <SectionLede
          lead="اكتشف دوراتنا التعليمية"
          sub="اختر المجال الذي يناسب أهدافك، وابدأ رحلتك"
          className="mb-10 sm:mb-12 lg:mb-16"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {tracks.map((track) => (
            <Link key={track.href} href={track.href} className="group block">
              <div className="relative h-44 sm:h-47.5 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-0 transition-shadow duration-500 hover:shadow-[0_20px_44px_-24px_rgba(20,16,40,0.22)]">
                {/* Fotoğraf — solda, düz, hiçbir renk/degrade/karartma katmanı yok */}
                <div
                  className="absolute inset-y-0 left-0 w-[42%] sm:w-1/2 bg-cover bg-right transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url(${track.photo})` }}
                />

                {/* Metin — sağ tarafta */}
                <div className="relative z-10 h-full flex flex-col justify-center pr-5 sm:pr-7 ml-[42%] sm:ml-1/2">
                  <p className="font-thmanyah-text leading-[1.75] text-neutral-700 mb-4">
                    <span className="font-thmanyah-display text-h3-sm sm:text-h3 font-semibold text-neutral-900">
                      {track.title}
                    </span>
                    <br />
                    <span className="text-caption sm:text-body">
                      {track.description}
                    </span>
                  </p>
                  <span
                    className="inline-flex items-center gap-1 font-thmanyah-text text-caption sm:text-body font-medium transition-colors"
                    style={{ color: track.accent }}
                  >
                    استكشف الدورات
                    <ArrowLeft
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                      strokeWidth={2.2}
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}