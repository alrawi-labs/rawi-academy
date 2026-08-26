import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

const principles = [
  {
    ordinal: "الأول",
    title: "ابدأ من حيث أنت",
    body: "لا نطلب منك أن تكون جاهزًا قبل أن تبدأ. نساعدك على معرفة مستواك ونقطة البداية المناسبة لك.",
  },
  {
    ordinal: "الثاني",
    title: "افهم قبل أن تحفظ",
    body: "المعلومة التي تفهمها تصبح معرفة تستطيع استخدامها، لا شيئًا تحاول استرجاعه وقت الحاجة.",
  },
  {
    ordinal: "الثالث",
    title: "طبّق ما تتعلمه",
    body: "التعلم الحقيقي يبدأ عندما تتحول الفكرة إلى ممارسة، ومسألة، ومشروع، ومهارة.",
  },
  {
    ordinal: "الرابع",
    title: "اعرف إلى أين تتجه",
    body: "لا نريدك أن تتعلم بشكل عشوائي. كل خطوة يجب أن تقود إلى الخطوة التي تليها.",
  },
];

/**
 * PhilosophySection — Chapter ٠٢
 * ---------------------------------------------------------------------------
 * "نحن لا نبني مكتبة دروس. نبني رحلة تعلّم." Four principles rendered as a
 * quiet typographic list — hairline top rule per item, ordinal word instead
 * of an icon, and items 2 & 4 nudged down slightly so the grid doesn't read
 * as a perfectly symmetric 2x2 card block.
 */
export function PhilosophySection() {
  return (
    <section dir="rtl" className="bg-neutral-100 py-28 md:py-36">
      <SectionContainer>

        <h2 className="font-thmanyah-display text-h2 md:text-[40px] leading-[1.25] text-neutral-900 max-w-2xl mb-20">
          نحن لا نبني مكتبة دروس.
          <br />
          نبني رحلة تعلّم.
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className={`border-t border-neutral-300 pt-6 ${
                i % 2 === 1 ? "md:mt-14" : ""
              }`}
            >
              <span className="text-caption text-neutral-400">
                المبدأ {p.ordinal}
              </span>
              <h3 className="font-thmanyah-display text-h3 text-neutral-900 mt-3">
                {p.title}
              </h3>
              <p className="font-thmanyah-text text-body text-neutral-600 mt-3 leading-relaxed max-w-sm">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}