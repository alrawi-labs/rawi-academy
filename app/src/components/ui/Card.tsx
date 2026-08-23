import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Card — Button'daki border/radius mantığıyla tutarlı, sade kapsayıcı.
 * Glassmorphism / gölge abartısı yok — proje "premium ama sakin" diline uygun.
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-sm border border-neutral-200 bg-white p-6 sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}