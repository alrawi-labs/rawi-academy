import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * TechnologySection — Chapter ٠٧
 * ---------------------------------------------------------------------------
 * Sets up the AI section that follows. Offset split with a thin vertical
 * rule between the statement and the supporting copy — not centered, and
 * the rule sits off-axis (40% rather than 50%) to avoid a symmetric feel.
 */
export function TechnologySection() {
  return (
    <section dir="rtl" className="bg-neutral-100 py-28 md:py-36">
      <SectionContainer>

        <div className="grid md:grid-cols-[2fr_3fr] gap-12">
          <h2 className="font-thmanyah-display text-h2 leading-[1.3] text-neutral-900 md:border-e md:border-neutral-200 md:pe-12">
            التقنية عندنا
            <br />
            وسيلة، وليست غاية.
          </h2>

          <p className="font-thmanyah-text text-lead text-neutral-600 leading-relaxed max-w-xl">
            نستخدم التقنية عندما تجعل التعلم أوضح، أو أسرع، أو أكثر تفاعلًا.
            من التجارب التفاعلية إلى الذكاء الاصطناعي والأدوات الرقمية، نبني
            التقنية حول تجربة الطالب، لا العكس.
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}