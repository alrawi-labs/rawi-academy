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
 * 3. Link with a full glassmorphic dropdown panel (`hasDropdown` + `items`)
 *
 * Colors are controlled via the `context` prop — never pass color
 * classes manually through `className`. This keeps navbar/footer
 * styling consistent and centralized in one place.
 *
 * The dropdown panel follows the site's glassmorphism language
 * (bg-white/45 + backdrop-blur-xl + soft purple-tinted shadow),
 * matching components like AIModelsCard.
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
  items,
  children,
  className = "",
  href = "#",
  ...rest
}: NavLinkProps) {
  const [open, setOpen] = useState(false);
  const styles = contextStyles[context];
  const hasDropdown = !!items?.length; // tek kaynak, tek karar noktası

  const accentColors = [
    "#FD9120", // orange
    "#8059E8", // purple
    "#22C1A0", // teal
    "#F386C4", // pink
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => hasDropdown && setOpen(false)}
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
            className={`transition-transform duration-300 ${styles.icon} ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </a>

      {hasDropdown && (
        // Dış sarmalayıcı: görsel boşluk artık padding ile oluşturuluyor
        // (margin değil) — böylece hover alanı kesintisiz kalır ve
        // imleç panele giderken dropdown kaybolmaz.
        <div
          className={`absolute top-full right-0 pt-3 min-w-[200px] z-50 transition-all duration-200 ${
            open
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-1 invisible pointer-events-none"
          }`}
        >
          <div
            dir="rtl"
            className="relative overflow-hidden rounded-sm bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_35px_70px_-25px_rgba(20,16,40,0.3)] py-2"
          >
            {/* üstteki ince marka gradyanı — AIModelsCard ile aynı renk paleti */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0"
              style={{
                background:
                  "linear-gradient(90deg, #FD9120 0%, #F386C4 50%, #8059E8 100%)",
              }}
            />

            {items!.map((item, index) => {
              const color = accentColors[index % accentColors.length];
              return (
                <a
                  key={item.key}
                  href={item.href ?? "#"}
                  className="group relative block px-4 py-2.5 font-thmanyah-text text-[13.5px] text-[#3F3F52] transition-colors duration-200 hover:text-[#09090B]"
                >
                  <span
                    className="absolute inset-0 rounded-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ backgroundColor: `${color}0F` /* ~%6 opaklık */ }}
                  />
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
