import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import {
  instructors,
  getInstructorById,
  getInstructorDisplayName,
} from "@/app/src/data/instructors";
import { getCoursesByInstructor } from "@/app/src/data/courses";
import { ACCENT_STYLES, SUBJECT_COLOR } from "@/app/src/lib/subject-colors";
import { LINKS } from "@/app/src/lib/links";

export function generateStaticParams() {
  return instructors.map((instructor) => ({ id: instructor.id }));
}

export default async function InstructorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const instructor = getInstructorById(id);
  if (!instructor) notFound();

  const style = ACCENT_STYLES[SUBJECT_COLOR[instructor.subject]];
  const instructorCourses = getCoursesByInstructor(instructor.id);
  const peers = instructors
    .filter((p) => p.subject === instructor.subject && p.id !== instructor.id)
    .slice(0, 3);

  return (
    <main dir="rtl" className="pt-28 bg-neutral-100">
      <SectionContainer>
        {/* Üst blok: mütevazı boyutlu portre + isim/unvan yanında — fotoğraf dekor değil kimlik referansı */}
        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start md:gap-12">
          <div className="mx-auto w-40 shrink-0 md:mx-0 md:w-full md:sticky md:top-24">
            <div
              className={`relative aspect-square w-40 overflow-hidden rounded-3xl ring-1 md:w-full ${style.ring}`}
            >
              <Image
                src={instructor.avatar}
                alt={getInstructorDisplayName(instructor)}
                fill
                sizes="(min-width: 768px) 220px, 160px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="text-center md:text-right">
            <span className={`relative inline-block ${style.badgeText}`}>
              <span className="relative z-10 font-thmanyah-display text-body text-neutral-900">
                {instructor.subject}
              </span>
              <svg
                viewBox="0 0 120 14"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-0.5 h-3 w-full"
                aria-hidden="true"
              >
                <path
                  d="M2 9 C 18 5, 34 11, 50 7 C 68 3, 86 10, 102 6 C 108 5, 114 6, 118 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>
            <h1 className="mt-3 font-thmanyah-display text-h2-sm text-neutral-900 md:text-h2">
              {getInstructorDisplayName(instructor)}
            </h1>
            {instructor.position && (
              <p className="mt-1 text-h3-sm text-neutral-600">{instructor.position}</p>
            )}
          </div>
        </div>

        {/* İçerik: okuma odaklı, geniş satır yüksekliği — fotoğraftan bağımsız tam genişlik metin */}
        <div className="mt-14 grid gap-10 pb-16 md:grid-cols-[220px_1fr] md:gap-12">
          <div className="hidden md:block" aria-hidden="true" />

          <div>
            <span
              aria-hidden="true"
              className="block font-thmanyah-display text-hero leading-none text-neutral-200 select-none"
            >
              “
            </span>
            <p className="-mt-6 max-w-2xl font-thmanyah-text text-lead leading-10 text-neutral-700">
              {instructor.bio}
            </p>

            {instructor.role && (
              <div className="mt-10 max-w-2xl border-t border-neutral-200 pt-6">
                <p className={`text-body font-medium ${style.badgeText}`}>
                  المهمة الحالية
                </p>
                <p className="mt-1 text-h3-sm text-neutral-700">{instructor.role}</p>
              </div>
            )}

            {instructor.companies && instructor.companies.length > 0 && (
              <div className="mt-10 max-w-2xl border-t border-neutral-200 pt-6">
                <p className="text-body font-medium uppercase tracking-wider text-neutral-500">
                  خبرة عمل في
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                  {instructor.companies.map((company) => (
                    <li key={company} className="text-h3-sm text-neutral-700">
                      {company}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 max-w-2xl border-t border-neutral-200 pt-6">
              <p className="text-body font-medium uppercase tracking-wider text-neutral-500">
                الدورات التي يقدّمها
              </p>

              {instructorCourses.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {instructorCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={LINKS.course(course.id)}
                      className="group flex items-center gap-4 rounded-2xl border border-neutral-200 p-3 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-thmanyah-display text-h3-sm text-neutral-900">
                          {course.title}
                        </p>
                        <p className="mt-0.5 text-body text-neutral-500">
                          {course.price} · {course.seatsLeft} مقاعد متبقية
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 text-h3-sm ${style.badgeText} transition-transform group-hover:-translate-x-1`}
                      >
                        ←
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-h3-sm text-neutral-500">
                  لا توجد دورات منشورة حاليًا لهذا المعلّم.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Aynı fenden diğer eğitmenler */}
        {peers.length > 0 && (
          <div className="border-t border-neutral-200 py-16">
            <p className="font-thmanyah-display text-h3 text-neutral-900">
              معلمون آخرون في {instructor.subject}
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              {peers.map((peer) => {
                const peerStyle = ACCENT_STYLES[SUBJECT_COLOR[peer.subject]];
                return (
                  <Link
                    key={peer.id}
                    href={LINKS.instructor(peer.id)}
                    className="group w-44 shrink-0"
                  >
                    <div
                      className={`relative h-52 w-full overflow-hidden rounded-2xl ring-1 ${peerStyle.ring}`}
                    >
                      <Image
                        src={peer.avatar}
                        alt={peer.name}
                        fill
                        sizes="176px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 font-thmanyah-display text-h3-sm text-neutral-900">
                      {getInstructorDisplayName(peer)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </SectionContainer>
    </main>
  );
}