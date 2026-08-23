"use client";

import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

/**
 * Input — Button ile aynı vizüel dili paylaşan temel metin girişi.
 * `rounded-sm`, `border-neutral-200`, `font-thmanyah-text` — proje genelinde
 * tutarlılık için Button'daki sınır/renk mantığıyla eşleşiyor.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", ...rest }, ref) => {
    const inputId = id ?? rest.name;
    const describedBy = error
      ? `${inputId}-error`
      : hint
      ? `${inputId}-hint`
      : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="font-thmanyah-text text-[13px] font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`w-full rounded-sm border bg-white px-4 py-2.5 font-thmanyah-text text-body text-neutral-900 placeholder:text-neutral-400 transition-colors focus:outline-none focus:ring-2 ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-neutral-200 focus:border-primary focus:ring-primary/15"
          } ${className}`}
          {...rest}
        />
        {error ? (
          <span id={`${inputId}-error`} className="font-thmanyah-text text-[13px] text-red-500">
            {error}
          </span>
        ) : hint ? (
          <span id={`${inputId}-hint`} className="font-thmanyah-text text-[13px] text-neutral-500">
            {hint}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";