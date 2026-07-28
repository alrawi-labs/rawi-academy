"use client";

import { useState, ReactNode, AnchorHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

/**
 * A single item rendered inside a NavLink's dropdown panel.
 */
type NavLinkItem = {
  /** Unique key used for React list rendering. */
  key: string;
  /** Visible label of the dropdown item. */
  label: string;
  /** Destination URL. Defaults to "#" if omitted. */
  href?: string;
};

/**
 * Props for the NavLink component.
 */
type NavLinkProps = {
  /**
   * Visual color context depending on where the link is placed.
   * - "navbar": dark text on light background (default).
   * - "footer": light text on dark background.
   */
  context?: "navbar" | "footer";

  /**
   * Whether this link should render a dropdown chevron and,
   * if `items` are provided, an interactive dropdown panel on hover.
   * @default false
   */
  hasDropdown?: boolean;

  /**
   * List of dropdown items shown when `hasDropdown` is true.
   * Ignored if `hasDropdown` is false or the array is empty.
   */
  items?: NavLinkItem[];

  /**
   * The visible label of the link itself (e.g. "الأسعار").
   * Passed as normal JSX children, same as any React component.
   */
  children: ReactNode;

  /** Additional classes for spacing/layout only — do not pass color utilities here. */
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">;

const contextStyles: Record<
  NonNullable<NavLinkProps["context"]>,
  { text: string; hoverText: string; icon: string }
> = {
  navbar: {
    text: "text-neutral-700",
    hoverText: "hover:text-neutral-900",
    icon: "text-neutral-400",
  },
  footer: {
    text: "text-neutral-300",
    hoverText: "hover:text-white",
    icon: "text-neutral-400",
  },
};

/**
 * NavLink — a single reusable navigation link component used across
 * the navbar and footer.
 *
 * Handles three link states out of the box:
 * 1. Plain link (no dropdown)
 * 2. Link with a chevron icon that rotates on hover (`hasDropdown`)
 * 3. Link with a full dropdown panel (`hasDropdown` + `items`)
 *
 * Colors are controlled via the `context` prop — never pass color
 * classes manually through `className`. This keeps navbar/footer
 * styling consistent and centralized in one place.
 *
 * @example
 * // Plain link
 * <NavLink href="/pricing">الأسعار</NavLink>
 *
 * @example
 * // Link with dropdown
 * <NavLink hasDropdown items={link.children}>
 *   {link.label}
 * </NavLink>
 *
 * @example
 * // Footer variant
 * <NavLink context="footer" href="/about">من نحن</NavLink>
 *
 * @example
 * // Rendering a full nav list dynamically
 * {links.map((link) => (
 *   <NavLink key={link.key} items={link.children} hasDropdown={!!link.children?.length}>
 *     {link.label}
 *   </NavLink>
 * ))}
 */
export default function NavLink({
  context = "navbar",
  hasDropdown = false,
  items,
  children,
  className = "",
  href = "#",
  ...rest
}: NavLinkProps) {
  const [open, setOpen] = useState(false);
  const styles = contextStyles[context];
  const showDropdown = hasDropdown && items && items.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => showDropdown && setOpen(true)}
      onMouseLeave={() => showDropdown && setOpen(false)}
    >
      <a
        href={href}
        className={`flex items-center gap-1 text-body font-medium transition-colors ${styles.text} ${styles.hoverText} ${className}`}
        {...rest}
      >
        {children}
        {hasDropdown && (
          <ChevronDown
            size={14}
            className={`transition-transform ${styles.icon} ${open ? "rotate-180" : ""}`}
          />
        )}
      </a>

      {showDropdown && open && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg border border-neutral-200 shadow-lg py-2 min-w-[180px] z-50">
          {items!.map((item) => (
            <a
              key={item.key}
              href={item.href ?? "#"}
              className="block px-4 py-2 text-body text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}