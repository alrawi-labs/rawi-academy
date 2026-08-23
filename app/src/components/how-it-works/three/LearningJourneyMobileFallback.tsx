"use client";

/**
 * بدل تصغير المشهد ثلاثي الأبعاد على الموبايل، هذا تكوين مسطّح مصغّر
 * يحافظ على نفس المفردات البصرية (سطح محايد، لمسة لون واحدة لكل مرحلة،
 * خط ناحوت واصل) بأقل تكلفة ممكنة — بلا WebGL إطلاقًا.
 */

const STAGES = [
  { label: "اكتشف", accent: "var(--color-visual-teal)" },
  { label: "تعلّم", accent: "var(--color-primary)" },
  { label: "طبّق", accent: "var(--color-primary)" },
  { label: "اختبر", accent: "var(--color-neutral-700)" },
  { label: "تقدّم", accent: "var(--color-primary)" },
  { label: "أتقن", accent: "var(--color-visual-pink)" },
];

export function LearningJourneyMobileFallback() {
  return (
    <div className="relative mx-auto flex max-w-xs flex-col items-center py-4">
      <div className="relative flex flex-col items-center gap-8">
        <div
          aria-hidden
          className="absolute top-2 bottom-2 w-px bg-neutral-300"
          style={{ right: "50%" }}
        />
        {STAGES.map((stage, i) => (
          <div key={stage.label} className="relative flex flex-col items-center gap-2">
            <div
              className="h-16 w-24 rounded-md border border-neutral-200 bg-neutral-0 shadow-[0_12px_28px_-18px_rgba(20,16,40,0.25)]"
              style={{
                transform: `translateY(${i % 2 === 0 ? 0 : 4}px)`,
              }}
            >
              <div className="h-1 w-8 rounded-full" style={{ backgroundColor: stage.accent, margin: "10px auto 0" }} />
            </div>
            <span className="font-thmanyah-text text-caption text-neutral-600">{stage.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningJourneyMobileFallback;