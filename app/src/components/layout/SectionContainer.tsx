// components/layout/SectionContainer.tsx
import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

export function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-10 ${className}`}>{children}</div>
  );
}