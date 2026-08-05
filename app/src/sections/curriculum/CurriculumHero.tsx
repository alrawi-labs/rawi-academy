import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";
import HeroGlassRibbons from "../../components/3D/HeroGlassRibbons";
import SubjectCardStack from "../../components/curriculum/SubjectCardStack";
import Button from "../../components/ui/Button";
import MarqueeStrip from "../../components/MarqueeStrip";

export default function CurriculumHero() {
  return (
    <section
      dir="rtl"
      className="relative isolate bg-neutral-900 pt-[150px] pb-[120px] overflow-hidden"
    >
      <HeroGlassRibbons />

       <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -top-[60px] -left-[140px] w-[520px] h-[520px] opacity-45 max-md:w-[320px] max-md:h-[320px] max-md:-left-[120px]"
      >
        <path
          d="M20 320 C 90 260, 60 140, 160 100 C 250 65, 300 150, 260 230 C 230 290, 130 270, 140 200"
          fill="none"
          stroke="var(--color-neutral-0)"
          strokeWidth="1.4"
          opacity="0.5"
        />
        <path
          d="M40 340 C 110 280, 80 160, 180 120"
          fill="none"
          stroke="var(--color-primary-light)"
          strokeWidth="1"
          opacity="0.4"
        />
        <path
          d="M60 300 C 120 250, 100 170, 190 140"
          fill="none"
          stroke="var(--color-visual-teal)"
          strokeWidth="0.8"
          strokeDasharray="1 6"
          opacity="0.4"
        />
        <circle
          cx="160"
          cy="100"
          r="3"
          fill="var(--color-orange)"
          opacity="0.5"
        />
        <circle
          cx="260"
          cy="230"
          r="2"
          fill="var(--color-primary-alt)"
          opacity="0.45"
        />
        <circle
          cx="190"
          cy="140"
          r="1.6"
          fill="var(--color-visual-pink, var(--color-primary))"
          opacity="0.5"
        />
      </svg>

      <SectionContainer>
        <div className="relative z-10 grid grid-cols-[510px_minmax(0,760px)] gap-10 items-start max-[900px]:grid-cols-1">
          {/* Kartlar önce (dir=rtl'de start/right kenara oturur) */}
          <div className="max-[900px]:order-2">
            <SubjectCardStack />
          </div>

          <Reveal>
            <div className="inline-flex items-center gap-2.5 text-caption font-semibold tracking-[0.08em] text-primary-light mb-6 before:content-[''] before:w-[22px] before:h-px before:bg-primary-light">
              منهجنا
            </div>

            <h1 className="font-thmanyah-display font-bold text-hero leading-[1.35] text-neutral-0 mb-7 max-md:text-h2">
              من المعرفة إلى{" "}
              <span className="bg-gradient-aurora bg-clip-text text-transparent">
                الإتقان
              </span>
              ، بخطواتٍ تعرف إلى أين تقودك.
            </h1>

            <p className="font-thmanyah-display font-bold text-lead max-w-[560px] text-neutral-200 max-md:text-body">
              في راوي، لا نبني الدروس لتُشاهَد ثم تُنسى، بل نصمم كل مسار ليأخذ
              المتعلم من بناء الأساس، إلى الفهم، ثم التطبيق، وصولًا إلى مهارة
              يستطيع استخدامها بثقة.
            </p>

            <Button className="mt-10" variant="outline">
              تواصل معنا
            </Button>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}