"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

type SelectOption = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
};

/**
 * Select — native <select>, erişilebilirlik için tarayıcı davranışını
 * koruyoruz (custom listbox değil). Ok ikonu RTL'de sola alınıyor çünkü
 * bu, tarayıcıların rtl select'lerde varsayılan olarak yaptığı şey.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, id, className = "", ...rest }, ref) => {
    const selectId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="font-thmanyah-text text-[13px] font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={!!error}
            className={`w-full appearance-none rounded-sm border bg-white py-2.5 pe-4 ps-9 font-thmanyah-text text-body text-neutral-900 transition-colors focus:outline-none focus:ring-2 ${
              error
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-neutral-200 focus:border-primary focus:ring-primary/15"
            } ${rest.value === "" ? "text-neutral-400" : ""} ${className}`}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            strokeWidth={2}
          />
        </div>
        {error && (
          <span className="font-thmanyah-text text-[13px] text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";