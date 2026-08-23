"use client";

import { useId, useRef, useState, type DragEvent } from "react";
import { Paperclip, X } from "lucide-react";

type FileUploadProps = {
  label?: string;
  hint?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
};

/**
 * FileUpload — basit, tek dosyalı, sürükle-bırak destekli upload alanı.
 * Talep gereği küçük ve mütevazı — dev bir dropzone değil.
 */
export function FileUpload({
  label,
  hint,
  value,
  onChange,
  accept = "image/*,.pdf",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputId = useId();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onChange(file);
  };

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

      {value ? (
        <div className="flex items-center justify-between rounded-sm border border-neutral-200 bg-white px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <Paperclip className="h-4 w-4 shrink-0 text-neutral-500" strokeWidth={2} />
            <span className="truncate font-thmanyah-text text-[13px] text-neutral-700">
              {value.name}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="إزالة الملف"
            className="shrink-0 rounded-sm p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          className={`flex cursor-pointer items-center gap-2.5 rounded-sm border border-dashed px-4 py-3 transition-colors ${
            isDragging
              ? "border-primary bg-primary-light"
              : "border-neutral-300 bg-neutral-50 hover:border-neutral-400"
          }`}
        >
          <Paperclip className="h-4 w-4 shrink-0 text-neutral-500" strokeWidth={2} />
          <span className="font-thmanyah-text text-[13px] text-neutral-600">
            إرفاق صورة أو ملف
          </span>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
        </div>
      )}

      {hint && (
        <span className="font-thmanyah-text text-[13px] text-neutral-500">{hint}</span>
      )}
    </div>
  );
}