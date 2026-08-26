import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * TeacherSection — Chapter ٠٦
 * ---------------------------------------------------------------------------
 * Deliberately quiet: no device, no color block — just a two-column
 * asymmetric split (40/60) so the headline and body don't sit in the same
 * measure, which keeps the page from settling into a single-column rhythm
 * for too long.
 */
export function TeacherSection() {
  return (
    <section dir="rtl" className="bg-neutral-100 py-28 md:py-36">
      <SectionContainer>

        <div className="grid md:grid-cols-[0.8fr_1fr] gap-x-16 gap-y-8">
          <h2 className="font-thmanyah-display text-h2 leading-[1.3] text-neutral-900">
            المعلم ليس مصدر
            <br />
            المعلومة فقط.
          </h2>

          <div className="font-thmanyah-text text-lead text-neutral-600 leading-relaxed space-y-6 md:pt-2">
            <p>
              أفضل المعلمين لا يملؤون رأسك بالمعلومات؛ بل يساعدونك على أن ترى
              ما لم تكن تراه.
            </p>
            <p>
              لذلك نبحث في راوي عن المعلم القادر على الشرح، والتوجيه، وفهم
              اختلاف الطلاب، وتحويل المفاهيم الصعبة إلى أفكار يمكن الوصول
              إليها.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}