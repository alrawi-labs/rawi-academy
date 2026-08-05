import {SectionContainer} from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";

const items = ["معرفة", "مهارة", "ثقة", "استقلالية"];

export default function OutcomesSection() {
  return (
    <section dir="rtl" className="bg-neutral-900 text-neutral-0 py-[130px] text-center max-md:py-20">
      <SectionContainer>
        <Reveal>
          <h2 className="font-thmanyah-display text-h2-sm max-w-[600px] mx-auto mb-[90px] max-md:mb-14">
            لا نريدك أن تنهي المسار، نريدك أن تخرج منه مختلفًا.
          </h2>
        </Reveal>

        <Reveal>
          <div className="flex items-center justify-center gap-6.5 flex-wrap mb-10 max-md:flex-col max-md:gap-3.5">
            {items.map((item, i) => (
              <span key={item} className="flex items-center gap-6.5 max-md:gap-3.5">
                <span className="font-thmanyah-display text-h3 text-neutral-300">
                  {item}
                </span>
                {i < items.length - 1 && (
                  <span className="text-h3-sm text-primary-alt">+</span>
                )}
              </span>
            ))}
          </div>

          <div className="inline-block font-thmanyah-display text-hero font-bold text-neutral-0 pt-8 border-t border-white/18 mt-2.5 max-md:text-h2">
            متعلم أقوى
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}