"use client";

import { getInstructorById, type Instructor } from "@/app/src/data/instructors";
import {SectionContainer} from "@/app/src/components/layout/SectionContainer";

/** Kur'an grubu — instructors.ts'te subject alanı olmadığı için id'ler elle seçildi. */
const QURAN_INSTRUCTOR_IDS = [
  "abdullah-alhomsi",
  "sarah-alnuaimi",
  "yusuf-alatasi",
  "ahmad-alrifai",
] as const;

function InstructorCard({
  instructor,
  offset,
}: {
  instructor: Instructor;
  offset?: boolean;
}) {
  return (
    <div className={`relative ${offset ? "lg:mt-10" : ""}`}>
      {/* Her hocanın kendi deseni — burada shared section background değil, kartın kendi arka planı */}
      <div
        className="relative aspect-[1] rounded-lg overflow-hidden bg-cover bg-center border border-neutral-0/60"
        style={{
          backgroundImage: "url(/backgrounds/bg-38.png)",
          boxShadow: "0 30px 50px -25px rgba(9,60,50,0.2)",
        }}
      >
        {/* Kesilmiş (transparent) portre, desenin üstünde, alt hizalı */}
        <img
          src={instructor.avatar}
          alt={instructor.name}
          className="absolute inset-x-0 bottom-0 w-full h-[92%] object-contain object-bottom"
        />

        {/* Unvan + isim — cam etiket, kartın alt köşesinde */}
        <div
          dir="rtl"
  className="absolute bottom-3 left-0 right-3 rounded-l-none rounded-r-xl bg-neutral-0/70 backdrop-blur-xl border border-neutral-0/80 px-4 py-2.5"
        >
          <p className="font-thmanyah-display font-bold text-caption text-neutral-900 leading-snug">
            {instructor.title} {instructor.name}
          </p>
        </div>
      </div>

      <p
        dir="rtl"
        className="font-thmanyah-text text-[11px] text-neutral-600 leading-6 mt-4"
      >
        {instructor.bio}
      </p>
    </div>
  );
}

export default function QuranInstructorsSection() {
  const instructors = QURAN_INSTRUCTOR_IDS.map(getInstructorById).filter(
    (instructor): instructor is Instructor => Boolean(instructor)
  );

  return (
    <section dir="rtl" className="relative py-20 sm:py-28 bg-neutral-0">
      <SectionContainer>
        <div className="max-w-[560px] mb-14 sm:mb-20">
          <span className="text-caption text-visual-teal font-semibold tracking-wide">
            معلمو القرآن
          </span>
          <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 text-neutral-900 leading-[1.3] mt-3">
            يرافقونك في كل آية، بخبرة سنوات
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {instructors.map((instructor, i) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              offset={i % 2 === 1}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}