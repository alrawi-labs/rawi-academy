// src/components/consultations/ConsultationsHero.tsx
import Button from "@/app/src/components/ui/Button";
import {SectionContainer} from "@/app/src/components/layout/SectionContainer";
import {SectionLede} from "@/app/src/components/layout/SectionLede";
import { UltraPremiumGradientBar } from "../../components/3D/UltraPremiumGradientBar";

// تركيب بصري: مشكلة → خبير → خطة، بأحجام وأوضاع مختلفة ومتصلة بمسار واحد،
// وليست ثلاث بطاقات متساوية. لا صور Stock ولا Illustrations عامة.
function ProblemToPlanComposition() {
  return (
    <div className="relative w-full max-w-[420px] h-[560px] lg:mr-4">
      {/* مسار الاتصال الخافت بين المراحل الثلاث */}
      <svg
        viewBox="0 0 420 560"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <path
          d="M 300 96 C 220 150, 120 190, 96 268 C 76 336, 220 372, 300 440"
          fill="none"
          stroke="var(--color-neutral-300)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
        />
        <circle cx="300" cy="96" r="3.5" fill="var(--color-neutral-400)" />
        <circle cx="96" cy="268" r="3.5" fill="var(--color-primary)" />
        <circle cx="300" cy="440" r="3.5" fill="var(--color-primary)" />
      </svg>

      {/* 1. المشكلة — بطاقة صغيرة، أعلى اليمين، خافتة */}
      <div className="absolute top-0 right-2 w-[220px] rotate-[-2deg] border border-neutral-200 rounded-lg bg-neutral-0 p-5 shadow-[0_20px_40px_-24px_rgba(20,16,40,0.15)]">
        <p className="font-thmanyah-sans text-micro text-neutral-500 tracking-wide">المشكلة</p>
        <p className="mt-2 font-thmanyah-text text-body text-neutral-700 leading-snug">
          عالق بين خيارات كثيرة، ولا تعرف من أين تبدأ.
        </p>
      </div>

      {/* 2. الخبير — بطاقة أكبر، منتصف اليسار، هي مركز التركيب */}
      <div className="absolute top-[220px] right-[110px] w-[250px] border border-neutral-200 rounded-lg bg-neutral-0 p-6 shadow-[0_24px_48px_-24px_rgba(20,16,40,0.18)]">
        <p className="font-thmanyah-sans text-micro text-primary tracking-wide">جلسة مباشرة</p>
        <p className="mt-2 font-thmanyah-display font-bold text-h3-sm text-neutral-900">
          خبير راوي
        </p>
        <p className="mt-2 font-thmanyah-text text-caption text-neutral-500 leading-relaxed">
          يستمع لحالتك تحديدًا، لا يعطيك نصيحة عامة صالحة للجميع.
        </p>
      </div>

      {/* 3. الخطة — أسفل اليمين، بحدود بلون العلامة كإشارة وصول */}
      <div className="absolute bottom-0 right-2 w-[220px] rotate-[1.5deg] border border-primary/30 rounded-lg bg-neutral-0 p-5 shadow-[0_20px_40px_-24px_rgba(20,16,40,0.15)]">
        <p className="font-thmanyah-sans text-micro text-neutral-500 tracking-wide">النتيجة</p>
        <p className="mt-2 font-thmanyah-text text-body text-neutral-700 leading-snug">
          خطوات واضحة تعرف تنفيذها من اليوم التالي.
        </p>
      </div>
    </div>
  );
}

export default function ConsultationsHero() {
  return (
    <section dir="rtl" className="relative overflow-hidden bg-neutral-0 pt-20 pb-24 lg:pt-28 lg:pb-36">
      <UltraPremiumGradientBar offsetY={250} />
      <SectionContainer>
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-10 items-center">
          {/* العمود الأيمن: النص + CTA */}
          <div className="lg:col-span-6 lg:order-2">
            <SectionLede
              lead="استشارات راوي"
              sub="لا تواجه المشكلة وحدك."
              body="سواء كنت عالقًا في مشكلة تقنية، محتارًا في اختيار مسارك، تحتاج إلى توجيه في مشروعك، أو تبحث عن رأي خبير، يمكنك حجز جلسة خاصة مع أحد خبراء راوي والحصول على توجيه عملي يناسب حالتك."
            />

            {/* <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/consultations/book" variant="primary" size="lg">
                احجز استشارتك
              </Button>
              <Button href="#experts" variant="outline" size="lg">
                استكشف الخبراء
              </Button>
            </div> */}
          </div>

          {/* العمود الأيسر: التركيب البصري */}
          <div className="lg:col-span-6 lg:order-1 flex justify-center lg:justify-start">
            <ProblemToPlanComposition />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}