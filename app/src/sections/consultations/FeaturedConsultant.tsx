// src/components/consultations/FeaturedConsultant.tsx
import Button from "@/app/src/components/ui/Button";
import {SectionContainer} from "@/app/src/components/layout/SectionContainer";
import { CONSULTANTS } from "@/app/src/data/consultants";

const HOOK_QUESTION = "هل تعمل على مشروع ذكاء اصطناعي ولا تعرف من أين تبدأ؟";

export default function FeaturedConsultant() {
  const consultant =
    CONSULTANTS.find((c) => c.featured && c.categories.includes("ai")) ??
    CONSULTANTS.find((c) => c.featured) ??
    CONSULTANTS[0];

  if (!consultant) return null;

  return (
    <section dir="rtl" className="relative bg-neutral-0 py-24 lg:py-32 border-t border-neutral-100">
      <SectionContainer>
        <div className="relative">
          {/* صورة الخبير الكبيرة — ليست دائرية، جزء من التركيب التحريري */}
          <div
            className="relative w-full lg:w-[72%] aspect-[16/10] lg:aspect-[16/8] bg-neutral-100 bg-cover bg-center rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${consultant.portraitUrl})` }}
            role="img"
            aria-label={consultant.name}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.05) 45%, transparent 70%)",
              }}
            />
          </div>

          {/* اللوحة الزجاجية العائمة — بإزاحة، وليست في المنتصف */}
          <div className="relative lg:absolute lg:-bottom-10 lg:left-0 lg:w-[46%] mt-[-3rem] lg:mt-0 mx-6 lg:mx-0">
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)] rounded-lg p-7 lg:p-8">
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
                }}
              />

              <div className="relative">
                <p className="font-thmanyah-display font-bold text-h3-sm text-neutral-900 leading-snug">
                  {HOOK_QUESTION}
                </p>
                <p className="mt-3 font-thmanyah-sans text-body text-neutral-800">
                  تحدث مع خبير راوي.
                </p>

                <div className="mt-6 pt-6 border-t border-white/60">
                  <p className="font-thmanyah-display font-bold text-body text-neutral-900">
                    {consultant.name}
                  </p>
                  <p className="mt-0.5 font-thmanyah-sans text-caption text-neutral-700">
                    {consultant.title}
                  </p>
                  <p className="mt-3 font-thmanyah-text text-caption text-neutral-700 leading-relaxed">
                    {consultant.bio}
                  </p>

                  <div className="mt-5">
                    <Button href={`/consultations/${consultant.slug}`} variant="primary" size="md">
                      احجز استشارة
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}