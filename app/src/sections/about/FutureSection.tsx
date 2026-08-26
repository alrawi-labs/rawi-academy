import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * FutureSection — Chapter ١٠
 * ---------------------------------------------------------------------------
 * Closes the numbered-chapter run. The guiding question is isolated between
 * hairlines as its own statement — the emotional peak right before the CTA
 * lets the page go quiet.
 */
export function FutureSection() {
  return (
    <section dir="rtl" className="bg-neutral-100 py-28 md:py-36">
      <SectionContainer>

        <h2 className="font-thmanyah-display text-h2 md:text-[40px] leading-[1.3] text-neutral-900 max-w-2xl">
          راوي ليست مشروعًا ينتهي عند إطلاق المنصة.
        </h2>

        <p className="font-thmanyah-text text-lead text-neutral-600 mt-8 max-w-2xl leading-relaxed">
          نريد أن تتوسع راوي مع احتياجات طلابها؛ في المجالات التي نقدمها، وفي
          الأدوات التي نبنيها، وفي الطرق التي نجعل بها التعلم أكثر فاعلية. كل
          مسار جديد، وكل تجربة جديدة، وكل تحسين نضيفه، يجب أن يجيب عن سؤال
          واحد:
        </p>

        <p className="font-thmanyah-display text-h2-sm md:text-h2 text-primary mt-14 py-10 border-y border-neutral-200 max-w-2xl">
          هل هذا يجعل الطالب يتعلم بشكل أفضل؟
        </p>
      </SectionContainer>
    </section>
  );
}