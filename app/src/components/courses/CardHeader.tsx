"use client";

import { ReactNode } from "react";
import { Expand } from "lucide-react";

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

const colorStyles: Record<
  CardHeaderColor,
  { bg: string; border: string; icon: string; hoverBg: string }
> = {
  teal: {
    bg: "bg-teal-400/10",
    border: "border-teal-200",
    icon: "text-teal-400",
    hoverBg: "hover:bg-teal-400/16",
  },
  purple: {
    bg: "bg-purple-400/10",
    border: "border-purple-200",
    icon: "text-purple-400",
    hoverBg: "hover:bg-purple-400/16",
  },
  orange: {
    bg: "bg-orange-400/10",
    border: "border-orange-200",
    icon: "text-orange-400",
    hoverBg: "hover:bg-orange-400/16",
  },
  pink: {
    bg: "bg-pink-400/10",
    border: "border-pink-200",
    icon: "text-pink-400",
    hoverBg: "hover:bg-pink-400/16",
  },
};

const sizeStyles: Record<
  CardHeaderSize,
  { wrapper: string; title: string }
> = {
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
 * CardHeader — shared title row used at the top of every subject card
 * in `CoursesSection`, pairing the subject name with an accented
 * "expand details" icon button.
 *
 * The accent color is driven entirely by the `color` prop — never
 * pass color utilities through `className` — so each subject keeps a
 * consistent identity color everywhere its header appears:
 * teal (Quran & Sunnah), purple (Programming), orange (Math), pink (Languages).
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
        className={`w-9 h-9 shrink-0 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.hoverBg} transition-colors`}
      >
        <Expand size={15} className={colors.icon} />
      </button>
    </div>
  );
}