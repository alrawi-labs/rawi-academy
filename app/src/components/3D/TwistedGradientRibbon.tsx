type TwistedGradientRibbonProps = {
  className?: string;
  /**
   * الشريط يتمركز رأسيًا افتراضيًا (top-1/2 + translateY(-50%)).
   * مرّر قيمة موجبة لتنزيله قليلاً، أو سالبة لرفعه — بالبكسل.
   * لا تحاول التحكم بالموضع عبر `className`، فستتعارض مع تمركز
   * `top-1/2` الافتراضي ولن يظهر أي تغيير.
   */
  offsetY?: number;
};

/**
 * شريط متدرج الألوان يمر عبر ألوان المواد الأربعة، مع "عقدة" في المنتصف
 * تلتف فوقه بزاوية معاكسة — توحي بربطة/كردية حقيقية بدل شريط مسطح بلا
 * عمق. زخرفة مستقلة، بلا نص أو منطق داخلي، تُستخدم خلف محتوى الهيرو أو
 * أي قسم آخر يحتاج نفس اللمسة.
 *
 * الاستخدام: ضعه داخل حاوية أب لها `relative overflow-hidden`.
 */
export function TwistedGradientRibbon({
  className = "",
  offsetY = 0,
}: TwistedGradientRibbonProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1400 420"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 top-1/2 h-[220px] w-full sm:h-[300px] ${className}`}
      style={{ transform: `translateY(calc(-50% + ${offsetY}px))` }}
    >
      <defs>
        <linearGradient id="ribbonFront" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-visual-teal)" />
          <stop offset="30%" stopColor="var(--color-primary)" />
          <stop offset="65%" stopColor="var(--color-visual-orange)" />
          <stop offset="100%" stopColor="var(--color-visual-pink)" />
        </linearGradient>
        <linearGradient id="ribbonFold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--color-primary) 60%, black)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--color-primary) 82%, black)" />
        </linearGradient>
        <linearGradient id="ribbonGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="ribbonElevation" x="-20%" y="-80%" width="140%" height="260%">
          <feDropShadow
            dx="0"
            dy="26"
            stdDeviation="24"
            floodColor="color-mix(in srgb, var(--color-primary) 55%, black)"
            floodOpacity="0.22"
          />
        </filter>
      </defs>

      {/* الشريط الأساسي، بميلان لطيف من أقصى اليمين إلى أقصى اليسار */}
      <g filter="url(#ribbonElevation)" transform="rotate(5 700 210)">
        <rect x="-40" y="150" width="1480" height="110" rx="55" fill="url(#ribbonFront)" />
        <rect x="-40" y="150" width="1480" height="50" rx="25" fill="url(#ribbonGloss)" />
      </g>

      {/* عقدة الالتفاف — قطعة مائلة بعكس اتجاه الشريط، توحي بأنه ينثني
          فوق نفسه كربطة حقيقية بدل خط مستقيم بلا عمق */}
      <g transform="rotate(-14 700 210)">
        <path d="M 610 130 L 790 130 L 830 290 L 650 290 Z" fill="url(#ribbonFold)" />
        <path d="M 610 130 L 790 130 L 778 175 L 622 175 Z" fill="#FFFFFF" opacity="0.25" />
      </g>
    </svg>
  );
}