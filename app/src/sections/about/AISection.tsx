import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * AISection — Chapter ٠٨
 * ---------------------------------------------------------------------------
 * Second and last inverted section — reserved for the page's most
 * forward-looking idea, so the dark treatment reads as "this is the part
 * about tomorrow" rather than a decorative alternation. A thin
 * primary-alt glow sits low and off to one side, not a centered blob.
 */
export function AISection() {
  return (
    <section dir="rtl" className="relative overflow-hidden bg-neutral-900 py-32 md:py-40">
      <div
        className="pointer-events-none absolute -bottom-40 start-[-10%] h-[420px] w-[420px] rounded-full bg-primary-alt/20 blur-[120px]"
        aria-hidden="true"
      />

      <SectionContainer>
        <div className="relative max-w-3xl">

          <h2 className="font-thmanyah-display text-h2 md:text-[42px] leading-[1.3] text-white">
            ماذا لو كان التعلم يستطيع أن يتكيف معك؟
          </h2>

          <p className="font-thmanyah-text text-lead text-white/70 mt-10 leading-relaxed max-w-2xl">
            نعمل على توظيف الذكاء الاصطناعي ليكون جزءًا من تجربة التعلم؛ يساعد
            الطالب على الفهم، والمراجعة، والتدريب، والوصول إلى المساعدة في
            الوقت الذي يحتاجها فيه. لكننا لا نرى الذكاء الاصطناعي بديلًا عن
            المعلم.
          </p>

          <p className="font-thmanyah-display text-h3 text-primary-alt mt-12 pt-8 border-t border-white/15 max-w-xl leading-relaxed">
            نراه أداة تجعل المعلم أقرب، والتعلم أكثر شخصية.
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}