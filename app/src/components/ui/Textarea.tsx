"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = "", rows = 5, ...rest }, ref) => {
    const areaId = id ?? rest.name;
    const describedBy = error
      ? `${areaId}-error`
      : hint
      ? `${areaId}-hint`
      : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={areaId}
            className="font-thmanyah-text text-[13px] font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={areaId}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`w-full resize-none rounded-sm border bg-white px-4 py-3 font-thmanyah-text text-body text-neutral-900 placeholder:text-neutral-400 transition-colors focus:outline-none focus:ring-2 ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-neutral-200 focus:border-primary focus:ring-primary/15"
          } ${className}`}
          {...rest}
        />
        {error ? (
          <span id={`${areaId}-error`} className="font-thmanyah-text text-[13px] text-red-500">
            {error}
          </span>
        ) : hint ? (
          <span id={`${areaId}-hint`} className="font-thmanyah-text text-[13px] text-neutral-500">
            {hint}
          </span>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";