// components/layout/SectionContainer.tsx
import { ReactNode } from "react";

/**
 * Props for the SectionContainer component.
 */
interface SectionContainerProps {
  /** Content to be constrained and centered within the container. */
  children: ReactNode;

  /** Additional classes for spacing/layout only — do not pass color utilities here. */
  className?: string;
}

/**
 * SectionContainer — a reusable content-width wrapper used inside
 * top-level <section> elements across the site.
 *
 * Centralizes the max-width and horizontal padding values so every
 * section's content aligns consistently, without repeating the same
 * `max-w-7xl mx-auto px-10` combination in every file.
 *
 * Background color, vertical spacing (`py-*`/`pt-*`), and RTL direction
 * are intentionally left to the parent <section> — this component only
 * handles horizontal content constraint (tek sorumluluk: içerik genişliği).
 *
 * @example
 * // Standard usage inside a section
 * <section dir="rtl" className="relative bg-neutral-100 pt-28">
 *   <SectionContainer>
 *     <SectionLede lead="..." sub="..." />
 *   </SectionContainer>
 * </section>
 *
 * @example
 * // Overriding spacing for a specific section
 * <SectionContainer className="mb-16">
 *   ...
 * </SectionContainer>
 */
export function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-10 ${className}`}>{children}</div>
  );
}