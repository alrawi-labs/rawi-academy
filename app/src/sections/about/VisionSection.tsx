import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * VisionSection — Chapter ٠٩
 * ---------------------------------------------------------------------------
 * The only place on the page the word "رؤية" is used, per the brief. Set as
 * a wide-measure pull-statement offset toward the reading-start side rather
 * than centered — a narrower column than the section width, not full-bleed.
 */
export function VisionSection() {
  return (
    <section dir="rtl" className="bg-neutral-100 py-28 md:py-36">
      <SectionContainer>

        <div className="max-w-2xl">
          <h2 className="font-thmanyah-display text-h2 md:text-[38px] leading-[1.35] text-neutral-900">
            نريد أن نجعل التعلم الجيد أقرب إلى كل من يبحث عنه.
          </h2>

          <p className="font-thmanyah-text text-lead text-neutral-600 mt-8 leading-relaxed">
            نطمح إلى بناء أكاديمية عربية حديثة تجمع بين جودة التعليم، ووضوح
            المسارات، والتقنية، والإنسانية؛ لتمنح الطالب تجربة تعلم يستطيع أن
            يبني عليها مستقبله.
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}