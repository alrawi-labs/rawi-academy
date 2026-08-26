import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

type SubjectColor = "teal" | "orange" | "purple" | "pink" | "ai";

/**
 * NOTE: verify these utility class names against the live `globals.css` /
 * `@theme inline` mapping before shipping — the skill flags a possible
 * double-dash typo in an earlier pass of the `--color-visual-*` tokens.
 * "الذكاء الاصطناعي" isn't in the fixed 4-subject color table, so it
 * borrows `primary-alt` (an existing token) rather than inventing a new hex.
 */
const colorMap: Record<SubjectColor, { text: string; bg: string }> = {
  teal: { text: "text-visual-teal", bg: "bg-visual-teal" },
  orange: { text: "text-visual-orange", bg: "bg-visual-orange" },
  purple: { text: "text-visual-purple", bg: "bg-visual-purple" },
  pink: { text: "text-visual-pink", bg: "bg-visual-pink" },
  ai: { text: "text-primary-alt", bg: "bg-primary-alt" },
};

const subjects: {
  index: string;
  name: string;
  reason: string;
  color: SubjectColor;
}[] = [
  {
    index: "٠١",
    name: "القرآن الكريم",
    reason: "لأن العلم يبدأ بما يبني الإنسان من الداخل.",
    color: "teal",
  },
  {
    index: "٠٢",
    name: "الرياضيات",
    reason: "لأنها تدرب العقل على التحليل والتفكير.",
    color: "orange",
  },
  {
    index: "٠٣",
    name: "البرمجة",
    reason: "لأن الفكرة تصبح أقوى عندما تستطيع بناءها.",
    color: "purple",
  },
  {
    index: "٠٤",
    name: "اللغات",
    reason: "لأن لغة جديدة توسّع ما يمكنك معرفته والوصول إليه.",
    color: "pink",
  },

];

/**
 * SubjectsSection — Chapter ٠٣
 * ---------------------------------------------------------------------------
 * Explicitly NOT a grid of icon-circle cards. A contents-page style list:
 * each row carries a slim colored start-bar, a colored index numeral, the
 * subject name set huge in display serif, and the reasoning line. Rows
 * alternate a small vertical offset so the rhythm feels editorial rather
 * than a rigid table.
 */
export function SubjectsSection() {
  return (
    <section dir="rtl" className="bg-neutral-100 py-28 md:py-36">
      <SectionContainer>

        <h2 className="font-thmanyah-display text-h2 md:text-[40px] leading-[1.25] text-neutral-900 max-w-2xl mb-20">
          مجالات نؤمن أنها تستحق أن تُتعلّم.
        </h2>

        <div className="border-t border-neutral-200">
          {subjects.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <div
                key={s.name}
                className={`group relative flex flex-col md:flex-row md:items-center gap-3 md:gap-10 border-b border-neutral-200 py-8 md:py-10 ps-5 ${
                  i % 2 === 1 ? "md:ps-14" : ""
                }`}
              >
                {/* Slim colored start-bar */}
                <span
                  className={`absolute inset-y-0 start-0 w-[3px] ${c.bg}`}
                  aria-hidden="true"
                />

                <span
                  className={`font-thmanyah-display text-h3-sm ${c.text} md:w-16 shrink-0`}
                >
                  {s.index}
                </span>

                <h3 className="font-thmanyah-display text-h2-sm md:text-h2 text-neutral-900 md:w-[340px] shrink-0 transition-colors group-hover:opacity-80">
                  {s.name}
                </h3>

                <p className="font-thmanyah-text text-body text-neutral-600 leading-relaxed max-w-md">
                  {s.reason}
                </p>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}