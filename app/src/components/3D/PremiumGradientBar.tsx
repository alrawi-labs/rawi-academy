type PremiumGradientBarProps = {
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
 * Şريط ثلاثي الأبعاد متدرج الألوان — يعبر الحاوية الأب قطريًا من أقصى
 * اليمين إلى أقصى اليسار. زخرفة مستقلة، بلا نص أو منطق داخلي، تُستخدم
 * خلف محتوى الهيرو أو أي قسم آخر يحتاج نفس اللمسة.
 *
 * الاستخدام: ضعه داخل حاوية أب لها `relative overflow-hidden`.
 */
export function PremiumGradientBar({ className = "", offsetY = 0 }: PremiumGradientBarProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1400 420"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 top-1/2 h-[220px] w-full sm:h-[300px] ${className}`}
      style={{ transform: `translateY(calc(-50% + ${offsetY}px))` }}
    >
      <defs>
        <linearGradient id="premiumBarCore" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-visual-pink)" />
          <stop offset="35%" stopColor="var(--color-primary-alt)" />
          <stop offset="65%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-visual-teal)" />
        </linearGradient>
        <linearGradient id="premiumBarGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="premiumBarShade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#1A1030" stopOpacity="0.28" />
        </linearGradient>
        <filter id="premiumBarElevation" x="-20%" y="-80%" width="140%" height="260%">
          <feDropShadow dx="0" dy="26" stdDeviation="26" floodColor="#2A1B54" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter="url(#premiumBarElevation)" transform="rotate(5 700 210)">
        {/* جسم الشريط */}
        <rect x="-40" y="140" width="1480" height="130" rx="65" fill="url(#premiumBarCore)" />
        {/* لمعة زجاجية علوية توحي بالعمق */}
        <rect x="-40" y="140" width="1480" height="60" rx="30" fill="url(#premiumBarGloss)" />
        {/* ظل سفلي خفيف يثبّت الشكل ثلاثي الأبعاد */}
        <rect x="-40" y="140" width="1480" height="130" rx="65" fill="url(#premiumBarShade)" />
        {/* خط لمعان رفيع أعلى الشريط */}
        <rect x="10" y="155" width="1360" height="6" rx="3" fill="#FFFFFF" opacity="0.5" />
      </g>
    </svg>
  );
}