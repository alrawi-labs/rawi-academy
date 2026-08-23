import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { SectionLede } from "@/app/src/components/layout/SectionLede";
import {
  instructors,
  type Instructor,
  type Subject,
} from "@/app/src/data/instructors";

const SUBJECT_ACCENT: Record<Subject, string> = {
  "القرآن والسنة": "var(--color-visual-teal)",
  "البرمجة": "var(--color-visual-purple)",
  "الرياضيات": "var(--color-visual-orange)",
  "اللغات": "var(--color-visual-pink)",
};

const SUBJECT_ORDER: Subject[] = [
  "القرآن والسنة",
  "البرمجة",
  "الرياضيات",
  "اللغات",
];

function groupBySubject(list: Instructor[]) {
  return SUBJECT_ORDER.map((subject) => ({
    subject,
    accentVar: SUBJECT_ACCENT[subject],
    members: list.filter((instructor) => instructor.subject === subject),
  }));
}

function InstructorCard({
  instructor,
  accentVar,
}: {
  instructor: Instructor;
  accentVar: string;
}) {
  return (
    <div
      className="group relative flex flex-col gap-4 overflow-hidden rounded-lg border border-neutral-100 bg-neutral-0 p-5 transition-transform duration-300 hover:-translate-y-1 sm:flex-row sm:items-center"
      style={{
        boxShadow:
          "0 20px 40px -28px rgba(20,16,40,0.25), 0 1px 0 rgba(255,255,255,0.6) inset",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(120% 140% at 100% -10%, color-mix(in srgb, ${accentVar} 10%, transparent) 0%, transparent 55%)`,
        }}
      />

      <div
        className="relative h-20 w-20 shrink-0 -rotate-2 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-neutral-100 bg-cover bg-center"
        style={{
          backgroundImage: `url('${instructor.avatar}')`,
          boxShadow: `0 0 0 2px color-mix(in srgb, ${accentVar} 45%, transparent)`,
        }}
      />

      <div className="relative min-w-0">
        <span
          className="inline-flex rounded-full px-2.5 py-0.5 text-micro font-medium"
          style={{
            background: `color-mix(in srgb, ${accentVar} 10%, transparent)`,
            color: accentVar,
          }}
        >
          {instructor.title}
        </span>
        <h3 className="font-thmanyah-display text-h3-sm mt-2 text-neutral-950">
          {instructor.name}
        </h3>
        <p className="font-thmanyah-text text-caption mt-1 line-clamp-2 text-neutral-600">
          {instructor.bio}
        </p>
      </div>
    </div>
  );
}

export default function InstructorsSection() {
  const groups = groupBySubject(instructors);

  return (
    <section dir="rtl" className="relative py-20 sm:py-28">
      <SectionContainer>
        <SectionLede
          lead="فريقنا التعليمي"
          sub="نخبة من المعلمين المتخصصين في كل مجال، يرافقونك خطوة بخطوة حتى تصل إلى هدفك."
        />

        <div className="mt-10 flex flex-col gap-14 sm:mt-14">
          {groups.map(({ subject, accentVar, members }) =>
            members.length ? (
              <div key={subject}>
                <h2
                  className="font-thmanyah-display text-h2-sm mb-6"
                  style={{ color: accentVar }}
                >
                  {subject}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {members.map((instructor) => (
                    <InstructorCard
                      key={instructor.id}
                      instructor={instructor}
                      accentVar={accentVar}
                    />
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </div>
      </SectionContainer>
    </section>
  );
}