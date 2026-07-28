"use client";

import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { ChevronLeft } from "lucide-react";

type BaseProps = {
  variant?: "primary" | "primary-alt" | "outline" | "orange";
  size?: "sm" | "md" | "lg";
  border?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = AsButton | AsAnchor;

const sizeStyles: Record<NonNullable<BaseProps["size"]>, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-[14.5px]",
  lg: "px-6 py-3 text-[14px]",
};

const variantStyles: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "text-white bg-primary hover:bg-primary-hover rounded-sm",
  "primary-alt":
    "text-white bg-primary-alt hover:bg-primary-alt-hover rounded-sm",
  outline:
    "bg-white text-primary-alt hover:border-outline-hover hover:text-outline-hover rounded-sm",
  "orange":
    "text-orange bg-white/70 hover:border-outline-hover hover:text-outline-hover rounded-sm",
};

// Varyanta göre varsayılan border davranışı (gerekirse `border` prop'u ile override edilir)
const defaultBorder: Record<NonNullable<BaseProps["variant"]>, boolean> = {
  primary: false,
  "primary-alt": false,
  outline: true,
  "orange": false,
};

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

  const resolvedIcon =
    icon ??
    (variant === "primary" || variant === "primary-alt" ? (
      <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
    ) : null);

  const baseClasses = `inline-flex items-center justify-center gap-2 font-thmanyah-text font-semibold transition-colors hover:cursor-pointer ${
    fullWidth ? "w-full" : "shrink-0"
  } ${
    resolvedBorder
      ? "border border-neutral-200"
      : "border border-transparent"
  } ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {resolvedIcon && iconPosition === "start" && resolvedIcon}
      {children}
      {resolvedIcon && iconPosition === "end" && resolvedIcon}
    </>
  );

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