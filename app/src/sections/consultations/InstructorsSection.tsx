import Image from "next/image";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { SectionLede } from "@/app/src/components/layout/SectionLede";
import Button from "@/app/src/components/ui/Button";
import {
  instructors,
  getInstructorDisplayName,
  type Instructor,
} from "@/app/src/data/instructors";
import { ACCENT_STYLES, SUBJECT_COLOR } from "@/app/src/lib/subject-colors";
import { LINKS } from "../../lib/links";

export function InstructorsSection() {
  // Öne çıkan (featured: true) eğitmenler grid'de en başta gösterilir.
  const sortedInstructors = [...instructors].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  return (
    <section dir="rtl" className="bg-neutral-0 py-24">
      <SectionContainer>
        <SectionLede
          lead="فريق التدريس"
          sub="نخبة من المعلمين والمعلمات"
          body="كل مادة يقدّمها مختص متمرّس، لكل واحد منهم أسلوبه الخاص في الشرح والمتابعة."
        />

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-10">
          {sortedInstructors.map((person) => (
            <InstructorCard
              key={person.id}
              instructor={person}
              style={ACCENT_STYLES[SUBJECT_COLOR[person.subject]]}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

function InstructorCard({
  instructor,
  style,
}: {
  instructor: Instructor;
  style: (typeof ACCENT_STYLES)[keyof typeof ACCENT_STYLES];
}) {
  return (
    <article className="w-[272px] shrink-0">
      {/* Fotoğraf alanı */}
      <div className={`relative h-72 w-full overflow-hidden rounded-[28px] bg-neutral-100 ring-1 ${style.ring}`}>
        <Image
          src={instructor.avatar}
          alt={getInstructorDisplayName(instructor)}
          fill
          sizes="272px"
          className="object-cover"
        />
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${style.photoTint}`} />
      </div>

      {/* Cam panel — fotoğrafın üstüne hafif biniyor, akışta kalıyor (taşma yapmaz) */}
      <div className="relative z-10 -mt-10 mx-3 rounded-2xl border border-white/60 bg-white/40 p-4 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)] backdrop-blur-xl">
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            backgroundImage:
              "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
          }}
        />
        <p className={`relative text-micro font-medium ${style.badgeText}`}>
          {instructor.subject}
        </p>
        <div className="relative mt-0.5">
          <p className="font-thmanyah-display text-h3-sm text-neutral-900">
            {getInstructorDisplayName(instructor)}
          </p>
          {instructor.position && (
            <p className="mt-0.5 text-caption text-neutral-500">
              {instructor.position}
            </p>
          )}
        </div>
        <p className="relative mt-1 line-clamp-2 text-caption text-neutral-600">
          {instructor.bio}
        </p>

        <Button
          href={LINKS.instructor(instructor.id)}
          variant="outline"
          size="sm"
          className={`relative mt-3 w-full justify-center border-current bg-white/50 hover:bg-white/80 ${style.badgeText}`}
        >
          عرض الملف الشخصي 
        </Button>
      </div>
    </article>
  );
}