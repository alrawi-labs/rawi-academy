// components/ui/SectionLede.tsx
import { ReactNode } from "react";

/**
 * Props for the SectionLede component.
 */
interface SectionLedeProps {
  /**
   * The primary, emphasized statement of the section (bold, dark text).
   * Typically the first thing a reader sees under a section title.
   */
  lead?: ReactNode;

  /**
   * Supporting text that follows `lead` on a new line (lighter, muted text).
   * Only renders a line break before it if `lead` is also present.
   */
  sub?: ReactNode;

  /**
   * A separate paragraph of body text rendered below the lead/sub block,
   * with its own spacing and typography.
   */
  body?: ReactNode;

  /** Additional classes for spacing/layout only — do not pass color utilities here. */
  className?: string;
}

/**
 * SectionLede — a reusable section intro block used at the top of
 * page sections, combining an emphasized lead statement, a muted
 * supporting sentence, and an optional separate body paragraph.
 *
 * All three parts (`lead`, `sub`, `body`) are optional and render
 * independently — passing only `body`, for example, renders just
 * the body paragraph with no lead/sub block at all.
 *
 * Colors and typography are controlled internally — never pass color
 * utilities through `className`. This keeps section intros visually
 * consistent across the site.
 *
 * @example
 * // Full intro: lead + sub + body
 * <SectionLede
 *   lead="في راوي، نؤمن أن التعليم لا يقتصر على مادةٍ واحدة"
 *   sub="لهذا بنينا تجربة تعليمية تجمع ما يحتاجه أبناؤنا في دينهم ودنياهم."
 *   body="نقدّم المعرفة بلغةٍ عربية واضحة، ومنهجٍ متدرّج."
 * />
 *
 * @example
 * // Only a lead statement, no sub or body
 * <SectionLede lead="عنوان القسم هنا" />
 *
 * @example
 * // Only a body paragraph (no lead/sub block rendered at all)
 * <SectionLede body="نص توضيحي قصير هنا." />
 */
export function SectionLede({
  lead,
  sub,
  body,
  className = "",
}: SectionLedeProps) {
  return (
    <div className={`max-w-4xl ${className}`}>
      {(lead || sub) && (
        <p className="font-thmanyah-display leading-[1.65] tracking-tight">
          {lead && (
            <span className="text-neutral-900 font-semibold text-lead">
              {lead}
            </span>
          )}
          {/* sub tek başına sunulduğunda gereksiz satır atlamasını önlemek için sadece ikisi birlikteyken <br /> eklenir */}
          {lead && sub && <br />}
          {sub && (
            <span className="text-neutral-400 font-normal text-h2-sm">
              {sub}
            </span>
          )}
        </p>
      )}

      {body && (
        <p className="font-thmanyah-text text-h3 leading-8 text-neutral-400 mt-4">
          {body}
        </p>
      )}
    </div>
  );
}