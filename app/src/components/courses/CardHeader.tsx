"use client";

import { ReactNode } from "react";

/**
 * Accent color for the card header's icon button, mapped 1:1 to a
 * subject: teal → Quran & Sunnah, purple → Programming, orange → Math,
 * pink → Languages.
 */
type CardHeaderColor = "teal" | "purple" | "orange" | "pink";

/**
 * Layout size of the header.
 * - "sm": narrow subject cards (Quran, Programming) — px-8 pt-8 pb-2, text-h3.
 * - "lg": wide, col-span-2 subject cards (Math, Languages) — px-10 pt-4 pb-0, text-h2-sm.
 */
type CardHeaderSize = "sm" | "lg";

/**
 * Props for the CardHeader component.
 */
interface CardHeaderProps {
  /** The subject title text. */
  title: ReactNode;

  /** Accent color, tied to the subject (see `CardHeaderColor`). */
  color: CardHeaderColor;

  /** Layout size. Defaults to "sm". */
  size?: CardHeaderSize;

  /** Additional classes for the outer wrapper only. */
  className?: string;
}

/**
 * NOT: `hover:*` değil `group-hover:*` kullanıyoruz. Bu buton, üst
 * component'lerde (`CardInteractiveShell`) `className="group ..."` olan
 * dış kart div'inin içinde render ediliyor. `group-hover:` sayesinde
 * kartın HERHANGİ bir yerine hover yapıldığında (sadece bu butonun
 * üstüne değil) ikon da tepki verir.
 */
const colorStyles: Record<
  CardHeaderColor,
  {
    bg: string;
    border: string;
    icon: string;
    groupHoverBg: string;
    groupHoverBorder: string;
    groupHoverIcon: string;
  }
> = {
  teal: {
    bg: "bg-teal-400/10",
    border: "border-teal-200",
    icon: "text-teal-400",
    groupHoverBg: "group-hover:bg-teal-400/20",
    groupHoverBorder: "group-hover:border-teal-300",
    groupHoverIcon: "group-hover:text-teal-500",
  },
  purple: {
    bg: "bg-purple-400/10",
    border: "border-purple-200",
    icon: "text-purple-400",
    groupHoverBg: "group-hover:bg-purple-400/20",
    groupHoverBorder: "group-hover:border-purple-300",
    groupHoverIcon: "group-hover:text-purple-500",
  },
  orange: {
    bg: "bg-orange-400/10",
    border: "border-orange-200",
    icon: "text-orange-400",
    groupHoverBg: "group-hover:bg-orange-400/20",
    groupHoverBorder: "group-hover:border-orange-300",
    groupHoverIcon: "group-hover:text-orange-500",
  },
  pink: {
    bg: "bg-pink-400/10",
    border: "border-pink-200",
    icon: "text-pink-400",
    groupHoverBg: "group-hover:bg-pink-400/20",
    groupHoverBorder: "group-hover:border-pink-300",
    groupHoverIcon: "group-hover:text-pink-500",
  },
};

const sizeStyles: Record<CardHeaderSize, { wrapper: string; title: string }> = {
  sm: {
    wrapper: "px-8 pt-8 pb-2",
    title: "text-h3 max-w-[75%]",
  },
  lg: {
    wrapper: "px-10 pt-4 pb-0",
    title: "text-h2-sm",
  },
};

/**
 * ExpandCornersIcon — çapraz iki köşeden oluşan (sağ üst + sol alt),
 * kalın stroke'lu bir "expand" ikonu. Hover'da normal hali fade-out
 * olur, ters çevrilmiş (statik olarak aynalanmış) hali aynı pozisyonda
 * fade-in ile belirir. Transform kullanılmıyor — sadece opacity crossfade,
 * bu yüzden küçülüp büyüme hissi yok.
 */
function ExpandCornersIcon({ className }: { className?: string }) {
  // Transform yok — sadece opacity crossfade. Bu yüzden hiç küçülüp
  // büyüme hissi olmuyor, sadece iki durum arasında yumuşak bir geçiş var.
  const fade = "transition-opacity duration-500 ease-out";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* varsayılan durum */}
      <g className={`${fade} group-hover:opacity-0`}>
        <path d="M13 7h4v4" />
        <path d="M11 17H7v-4" />
      </g>
      {/* hover'da fade-in ile beliren, ters çevrilmiş durum — geometrisi
          statik olarak "aynalanmış" halde yazıldı, transform kullanılmadı */}
      <g
        className={`${fade} opacity-0 group-hover:opacity-100`}
        style={{ transitionDelay: "60ms" }}
      >
        <path d="M13 7h4v4" style={{transform: "translate(2px, -2px)"}} />
        <path d="M11 17H7v-4" style={{transform: "translate(-2px, 2px)"}}  />
      </g>
    </svg>
  );
}

/**
 * CardHeader — shared title row used at the top of every subject card
 * in `CoursesSection`, pairing the subject name with an accented
 * "expand details" icon button.
 *
 * The accent color is driven entirely by the `color` prop — never
 * pass color utilities through `className` — so each subject keeps a
 * consistent identity color everywhere its header appears:
 * teal (Quran & Sunnah), purple (Programming), orange (Math), pink (Languages).
 *
 * The icon button reacts to hovering the WHOLE card (via `group-hover`),
 * not just itself — it must be rendered inside a `className="group"`
 * ancestor (e.g. `CardInteractiveShell`) for this to work. On hover,
 * the icon crossfades to its mirrored state — no transform, just opacity.
 *
 * @example
 * // Narrow card (Quran & Sunnah)
 * <CardHeader title="القرآن الكريم والسنة — حفظٌ وفهمٌ يوميّ" color="teal" />
 *
 * @example
 * // Wide, col-span-2 card (Math)
 * <CardHeader
 *   title="الرياضيات — تفكيرٌ منطقي، خطوة بخطوة"
 *   color="orange"
 *   size="lg"
 * />
 */
export function CardHeader({
  title,
  color,
  size = "sm",
  className = "",
}: CardHeaderProps) {
  const colors = colorStyles[color];
  const layout = sizeStyles[size];

  return (
    <div
      className={`flex items-start justify-between ${layout.wrapper} ${className}`}
    >
      <h3
        className={`font-thmanyah-display font-bold leading-[1.4] text-neutral-900 ${layout.title}`}
      >
        {title}
      </h3>
      <button
        type="button"
        aria-label="عرض تفاصيل المادة"
        className={`w-9 h-9 shrink-0 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center transition-colors ${colors.groupHoverBg} ${colors.groupHoverBorder}`}
      >
        <ExpandCornersIcon
          className={`w-5 h-5 ${colors.icon} transition-colors ${colors.groupHoverIcon}`}
        />
      </button>
    </div>
  );
}
