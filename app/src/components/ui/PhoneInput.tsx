"use client";

import { Select } from "@/app/src/components/ui/Select";
import { Input } from "@/app/src/components/ui/Input";

export const COUNTRY_CODES = [
  { value: "+966", label: "السعودية (+966)" },
  { value: "+971", label: "الإمارات (+971)" },
  { value: "+974", label: "قطر (+974)" },
  { value: "+965", label: "الكويت (+965)" },
  { value: "+973", label: "البحرين (+973)" },
  { value: "+968", label: "عُمان (+968)" },
  { value: "+962", label: "الأردن (+962)" },
  { value: "+961", label: "لبنان (+961)" },
  { value: "+964", label: "العراق (+964)" },
  { value: "+20", label: "مصر (+20)" },
  { value: "+963", label: "سوريا (+963)" },
  { value: "+970", label: "فلسطين (+970)" },
  { value: "+967", label: "اليمن (+967)" },
  { value: "+218", label: "ليبيا (+218)" },
  { value: "+216", label: "تونس (+216)" },
  { value: "+213", label: "الجزائر (+213)" },
  { value: "+212", label: "المغرب (+212)" },
  { value: "+249", label: "السودان (+249)" },
  { value: "+90", label: "تركيا (+90)" },
  { value: "+1", label: "الولايات المتحدة (+1)" },
  { value: "+44", label: "المملكة المتحدة (+44)" },
];

type PhoneInputProps = {
  label?: string;
  countryCode: string;
  onCountryCodeChange: (value: string) => void;
  number: string;
  onNumberChange: (value: string) => void;
  countryError?: string;
  numberError?: string;
};

/**
 * PhoneInput — composite field: dial-code Select + number Input.
 * Reuses §4b's exact focus/error recipe via the underlying Select/Input,
 * so no new styling is introduced — only the layout (side-by-side row)
 * is new.
 */
export function PhoneInput({
  label = "رقم الهاتف",
  countryCode,
  onCountryCodeChange,
  number,
  onNumberChange,
  countryError,
  numberError,
}: PhoneInputProps) {
  const error = countryError || numberError;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-thmanyah-text text-[13px] font-medium text-neutral-700">
        {label}
      </label>

      <div className="flex gap-2">
        <div className="w-[136px] shrink-0">
          <Select
            aria-label="مفتاح الدولة"
            placeholder="الدولة"
            options={COUNTRY_CODES}
            value={countryCode}
            onChange={(e) => onCountryCodeChange(e.target.value)}
            className={countryError ? "border-red-300" : undefined}
          />
        </div>

        <input
          type="tel"
          dir="ltr"
          inputMode="numeric"
          placeholder="5xx xxx xxxx"
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
          aria-label="رقم الهاتف"
          aria-invalid={!!numberError}
          className={`w-full rounded-sm border bg-white px-4 py-2.5 text-start font-thmanyah-text text-body text-neutral-900 placeholder:text-neutral-400 transition-colors focus:outline-none focus:ring-2 ${
            numberError
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-neutral-200 focus:border-primary focus:ring-primary/15"
          }`}
        />
      </div>

      {error && (
        <span className="font-thmanyah-text text-[13px] text-red-500">{error}</span>
      )}
    </div>
  );
}