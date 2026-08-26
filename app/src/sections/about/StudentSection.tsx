import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/**
 * StudentSection — Chapter ٠٤
 * ---------------------------------------------------------------------------
 * "خلف كل طالب هدف." The most human section in the page gets the page's
 * first tonal break: inverted to near-black, with a quiet film-grain
 * overlay (per the design system's suggested texture pattern) instead of
 * any card/icon treatment. The copy is set as a large pull-statement, the
 * kind of line that would run alone on a page in print.
 */
export function StudentSection() {
  return (
    <section dir="rtl" className="relative overflow-hidden bg-neutral-900 py-32 md:py-40">
      {/* Film-grain texture overlay */}
      <svg className="absolute inset-0 h-0 w-0" aria-hidden="true">
        <filter id="rawi-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ filter: "url(#rawi-grain)" }}
        aria-hidden="true"
      />

      <SectionContainer>
        <div className="relative max-w-3xl">

          <h2 className="font-thmanyah-display text-h2 md:text-[44px] leading-[1.3] text-white">
            خلف كل طالب هدف.
          </h2>

          <p className="font-thmanyah-text text-lead text-white/70 mt-10 leading-relaxed max-w-2xl">
            لا نرى الطالب رقمًا في قائمة المسجلين، ولا مجموعة دروس تنتظر أن
            تُستهلك.
            <br />
            نراه شخصًا لديه فضول، وهدف، وأسئلة، وقدرات لم تُكتشف كلها بعد.
          </p>

          <p className="font-thmanyah-display text-h3 text-white mt-12 pt-8 border-t border-white/15 max-w-xl leading-relaxed">
            ولهذا نريد أن تكون تجربة التعلم في راوي مبنية حول{" "}
            <span className="text-primary-light">الطالب</span>، لا حول
            المحتوى فقط.
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}