"use client";

import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { ChevronLeft } from "lucide-react";

/**
 * Shared props between button and anchor variants of Button.
 */
type BaseProps = {
  /**
   * Visual style of the button.
   * - "primary": solid brand purple, white text (default).
   * - "primary-alt": solid alternate brand color, white text.
   * - "outline": white background, bordered, colored text.
   * - "orange": subtle translucent background with orange text.
   */
  variant?: "primary" | "primary-alt" | "outline" | "orange";

  /** Controls padding and font size. Defaults to "md". */
  size?: "sm" | "md" | "lg";

  /**
   * Forces the border on or off, overriding the variant's default
   * border behavior (see `defaultBorder`).
   */
  border?: boolean;

  /**
   * Custom icon to render alongside the label. If omitted, "primary"
   * and "primary-alt" variants automatically get a chevron icon.
   * Pass `null` explicitly to render no icon at all.
   */
  icon?: ReactNode;

  /** Where the icon renders relative to the children. Defaults to "end". */
  iconPosition?: "start" | "end";

  /** Stretches the button to fill its parent's width. */
  fullWidth?: boolean;

  /** Additional classes for spacing/layout only — do not pass color utilities here. */
  className?: string;

  /** Visible label of the button. */
  children: ReactNode;
};

/** Renders as a native <button>. `href` must not be set. */
type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

/** Renders as a native <a>. `href` is required. */
type AsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

/**
 * Props for the Button component.
 * Union of `AsButton` and `AsAnchor` — passing `href` switches the
 * rendered element from <button> to <a> automatically.
 */
type ButtonProps = AsButton | AsAnchor;

const sizeStyles: Record<NonNullable<BaseProps["size"]>, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-[14.5px]",
  lg: "px-6 py-3 text-[14px]",
};

const variantStyles: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary: "text-white bg-primary hover:bg-primary-hover rounded-sm",
  "primary-alt":
    "text-white bg-primary-alt hover:bg-primary-alt-hover rounded-sm",
  outline:
    "bg-white text-primary-alt hover:border-outline-hover hover:text-outline-hover rounded-sm",
  orange:
    "text-orange bg-white/70 hover:border-outline-hover hover:text-outline-hover rounded-sm",
};

// Varyanta göre varsayılan border davranışı (gerekirse `border` prop'u ile override edilir)
const defaultBorder: Record<NonNullable<BaseProps["variant"]>, boolean> = {
  primary: false,
  "primary-alt": false,
  outline: true,
  orange: false,
};

/**
 * Button — a single reusable button component rendered as either a
 * native <button> or <a>, used across the whole site.
 *
 * Handles four visual variants out of the box:
 * 1. "primary" — solid brand purple call-to-action
 * 2. "primary-alt" — solid alternate brand color call-to-action
 * 3. "outline" — bordered, transparent background
 * 4. "orange" — subtle translucent accent button
 *
 * Automatically renders as an <a> when `href` is passed, and as a
 * <button> otherwise — no separate `as` prop needed, the element
 * type is inferred from the presence of `href` (tek kaynak, tek karar noktası).
 *
 * Colors and border behavior are controlled via the `variant` prop —
 * never pass color classes manually through `className`. This keeps
 * button styling consistent and centralized in one place.
 *
 * @example
 * // Plain primary button
 * <Button>ابدأ الآن</Button>
 *
 * @example
 * // Outline button as a link
 * <Button variant="outline" href="/pricing">الأسعار</Button>
 *
 * @example
 * // Custom icon at the start, full width
 * <Button icon={<Star className="w-4 h-4" />} iconPosition="start" fullWidth>
 *   تقييم
 * </Button>
 *
 * @example
 * // Suppressing the automatic chevron icon
 * <Button variant="primary" icon={null}>
 *   متابعة
 * </Button>
 */
export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    border,
    icon,
    iconPosition = "end",
    fullWidth,
    className = "",
    children,
    ...rest
  } = props;

  const resolvedBorder = border ?? defaultBorder[variant];

  // icon === null anlamına gelen bilinçli tercihleri koru, sadece
  // undefined ise varsayılan chevron'a düş
  const resolvedIcon =
    icon ??
    (variant === "primary" || variant === "primary-alt" ? (
      <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
    ) : null);

  const baseClasses = `inline-flex items-center justify-center gap-2 font-thmanyah-text font-semibold transition-colors hover:cursor-pointer ${
    fullWidth ? "w-full" : "shrink-0"
  } ${
    resolvedBorder ? "border border-neutral-200" : "border border-transparent"
  } ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {resolvedIcon && iconPosition === "start" && resolvedIcon}
      {children}
      {resolvedIcon && iconPosition === "end" && resolvedIcon}
    </>
  );

  // href varlığı tek karar noktası: <a> mi <button> mı render edileceğini belirler
  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={baseClasses} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}