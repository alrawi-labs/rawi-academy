import  Button  from "@/app/src/components/ui/Button";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { AboutIdentityRibbon } from "@/app/src/components/3D/AboutIdentityRibbon";
import { UltraPremiumGradientBar } from "../../components/3D/UltraPremiumGradientBar";

/**
 * AboutHero
 * ---------------------------------------------------------------------------
 * Deliberately does NOT open with "من نحن؟". Opens with the philosophy
 * statement instead, per the brief. Uses the existing aurora gradient wash
 * (established brand pattern, not an ad-hoc symmetric blob) plus the
 * identity ribbon threading low behind the copy — same 3D-gradient
 * technique used elsewhere on the site, at low opacity so it reads as
 * atmosphere rather than a competing headline.
 */
export function AboutHero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-neutral-100 pt-40 pb-32 md:pt-48 md:pb-40"
    >
      <UltraPremiumGradientBar offsetY={250} />

      <SectionContainer>
        <div className="relative max-w-3xl">
          <span className="text-caption tracking-[0.3em] text-neutral-500 uppercase">
            عن راوي
          </span>

          <h1 className="font-thmanyah-display text-hero md:text-[52px] leading-[1.15] text-neutral-900 mt-6">
            التعليم لا يغيّر ما تعرفه فقط،
            <br />
            بل يغيّر ما تستطيع أن تفعله.
          </h1>

          <p className="font-thmanyah-text text-lead text-neutral-600 mt-8 max-w-xl leading-relaxed">
            ومن هنا بدأت راوي؛ أكاديمية تؤمن أن التعلم الحقيقي لا يُقاس بعدد
            الدروس التي أنهيتها، بل بما أصبحت قادرًا على فهمه، وتطبيقه،
            وبنائه.
          </p>

          <div className="mt-12">
            <Button href="#why-founded" variant="outline" size="lg">
              اكتشف راوي ↓
            </Button>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}