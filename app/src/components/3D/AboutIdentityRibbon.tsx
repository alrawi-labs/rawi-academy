type AboutIdentityRibbonProps = {
  className?: string;
  /**
   * الشريط يتمركز رأسيًا افتراضيًا (top-1/2 + translateY(-50%)).
   * مرّر قيمة موجبة لتنزيله قليلاً، أو سالبة لرفعه — بالبكسل.
   * لا تحاول التحكم بالموضع عبر `className` (مثل `-bottom-5`)، فستتعارض
   * مع تمركز `top-1/2` الافتراضي ولن يظهر أي تغيير.
   */
  offsetY?: number;
};

/**
 * شريط الهوية ثلاثي الأبعاد — نسخة صفحة "عن راوي".
 *
 * إعادة تصميم كاملة عن النسخة الأولى: بدل مستطيل مستقيم بزاوية دوران
 * ثابتة، هذا أنبوب زجاجي منحنٍ (S-curve) يتبع مسار SVG حقيقيًا، مع إضاءة
 * وتظليل عامّين (blend modes) يحاكيان مصدر ضوء واحد يمر فوق الانحناء
 * كله، وبريق (glint) مركّز عند ذروة المنحنى — بدل لمعة مسطحة أعلى شكل
 * مستقيم. هذا ما يعطيه إحساس "زجاج/معدن حقيقي" بدل "شريط ملوّن بحواف
 * دائرية".
 *
 * التدرج الأفقي يمر عبر نفس ألوان المجالات الأربعة + الأساسي (وردي،
 * برتقالي، أساسي، بنفسجي، تركواز) — ألوان "ماذا نعلّم" في هذه الصفحة
 * بالضبط، فيقرأ الشريط كخيط واحد يربط كل المجالات.
 *
 * الاستخدام: ضعه داخل حاوية أب لها `relative overflow-hidden`.
 */
export function AboutIdentityRibbon({
  className = "",
  offsetY = 0,
}: AboutIdentityRibbonProps) {
  const spine =
    "M -40 320 C 260 380, 420 260, 700 210 C 980 160, 1140 40, 1440 100";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1400 460"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 top-1/2 h-[220px] w-full sm:h-[300px] ${className}`}
      style={{ transform: `translateY(calc(-50% + ${offsetY}px))` }}
    >
      <defs>
        {/* لون الهوية عبر المحور الأفقي — نفس ألوان المجالات الخمسة */}
        <linearGradient id="aboutRibbonHue" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1400" y2="0">
          <stop offset="0%" stopColor="var(--color-visual-pink)" />
          <stop offset="28%" stopColor="var(--color-visual-orange)" />
          <stop offset="52%" stopColor="var(--color-primary)" />
          <stop offset="76%" stopColor="var(--color-visual-purple)" />
          <stop offset="100%" stopColor="var(--color-visual-teal)" />
        </linearGradient>

        {/* إضاءة عامة من الأعلى — تُمزج screen فوق الأنبوب الملوّن */}
        <linearGradient id="aboutRibbonLight" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="460">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.42" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* تظليل عام من الأسفل — يُمزج multiply لإعطاء عمق الأنبوب */}
        <linearGradient id="aboutRibbonShadow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="460">
          <stop offset="60%" stopColor="color-mix(in srgb, var(--color-primary) 50%, black)" stopOpacity="0" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--color-primary) 60%, black)" stopOpacity="0.3" />
        </linearGradient>

        {/* بريق زجاجي مركّز، لا يمتد على طول الشريط كله */}
        <linearGradient id="aboutRibbonGlint" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1400" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="22%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="34%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="46%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <filter id="aboutRibbonElevation" x="-20%" y="-60%" width="140%" height="220%">
          <feDropShadow
            dx="0"
            dy="24"
            stdDeviation="24"
            floodColor="color-mix(in srgb, var(--color-primary) 55%, black)"
            floodOpacity="0.22"
          />
        </filter>
      </defs>

      <g filter="url(#aboutRibbonElevation)">
        {/* جسم الأنبوب */}
        <path d={spine} fill="none" stroke="url(#aboutRibbonHue)" strokeWidth="92" strokeLinecap="round" />
        {/* إضاءة علوية عامة */}
        <path
          d={spine}
          fill="none"
          stroke="url(#aboutRibbonLight)"
          strokeWidth="92"
          strokeLinecap="round"
          style={{ mixBlendMode: "screen" }}
        />
        {/* تظليل سفلي عام */}
        <path
          d={spine}
          fill="none"
          stroke="url(#aboutRibbonShadow)"
          strokeWidth="92"
          strokeLinecap="round"
          style={{ mixBlendMode: "multiply" }}
        />
        {/* بريق لامع عند ذروة الانحناء */}
        <path
          d={spine}
          fill="none"
          stroke="url(#aboutRibbonGlint)"
          strokeWidth="10"
          strokeLinecap="round"
          transform="translate(0 -30)"
        />
      </g>
    </svg>
  );
}