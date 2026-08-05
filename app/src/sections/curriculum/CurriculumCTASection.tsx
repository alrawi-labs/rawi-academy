import {SectionContainer} from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";
import Button from "@/app/src/components/ui/Button";

export default function CurriculumCTASection() {
  return (
    <section dir="rtl" className="py-[130px] pb-[150px] max-md:py-16">
      <SectionContainer>
        <Reveal className="max-w-[560px]">
          <h2 className="font-thmanyah-display text-h2-sm leading-[1.5] text-neutral-900 mb-4.5">
            الخطوة الأولى تبدأ باختيار ما يستحق أن تتعلمه.
          </h2>
          <p className="text-body text-neutral-500 mb-9">
            اختر المجال الذي يناسب أهدافك، وابدأ مسارك التعليمي مع راوي.
          </p>
          <Button variant="primary" size="lg" href="/courses">
            استكشف المسارات
          </Button>
        </Reveal>
      </SectionContainer>
    </section>
  );
}