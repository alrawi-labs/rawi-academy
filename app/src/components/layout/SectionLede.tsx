// components/SectionLede.tsx
import { ReactNode } from "react";

interface SectionLedeProps {
  lead?: ReactNode;
  sub?: ReactNode;
  body?: ReactNode;
  className?: string;
}

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