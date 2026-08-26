"use client";

import { useState, type FormEvent } from "react";
import type { Course } from "@/app/src/data/courses";
import { PhoneInput } from "@/app/src/components/ui/PhoneInput";

export type EnrollTicketData = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type FieldErrors = Partial<Record<"name" | "email" | "phoneNumber", string>>;

export function EnrollForm({
  course,
  buttonVariant,
  onSubmit,
  isSubmitting,
  submitError,
}: {
  course: Course;
  buttonVariant: "primary" | "pink" | "orange-solid" | "teal";
  onSubmit: (data: EnrollTicketData) => void | Promise<void>;
  isSubmitting: boolean;
  submitError: string | null;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+90");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const buttonSolidClass: Record<typeof buttonVariant, string> = {
    primary: "bg-primary hover:bg-primary-hover",
    pink: "bg-visual-pink hover:opacity-90",
    "orange-solid": "bg-orange hover:opacity-90",
    teal: "bg-visual-teal hover:opacity-90",
  };

  const focusRingClass: Record<typeof buttonVariant, string> = {
    primary: "focus:border-primary focus:ring-primary/20",
    pink: "focus:border-visual-pink focus:ring-visual-pink/20",
    "orange-solid": "focus:border-orange focus:ring-orange/20",
    teal: "focus:border-visual-teal focus:ring-visual-teal/20",
  };

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "الاسم مطلوب.";
    if (!email.trim()) {
      next.email = "البريد الإلكتروني مطلوب.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = "صيغة البريد الإلكتروني غير صحيحة.";
    }
    if (!phoneNumber.trim()) next.phoneNumber = "رقم الهاتف مطلوب.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      name,
      email,
      phone: `${phoneCountryCode} ${phoneNumber}`,
      notes,
    });
  }

  const inputClass = `w-full rounded-xl border border-neutral-200 bg-neutral-0 px-4 py-3 text-body text-neutral-900 outline-none transition-colors focus:ring-2 ${focusRingClass[buttonVariant]}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-caption font-medium text-neutral-700"
        >
          الاسم الكامل
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="مثال: أحمد محمد"
        />
        {errors.name && (
          <p className="mt-1 text-caption text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-caption font-medium text-neutral-700"
        >
          البريد الإلكتروني
        </label>
        <input
          id="email"
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputClass} text-right`}
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-caption text-red-500">{errors.email}</p>
        )}
      </div>

      <PhoneInput
        countryCode={phoneCountryCode}
        onCountryCodeChange={setPhoneCountryCode}
        number={phoneNumber}
        onNumberChange={setPhoneNumber}
        numberError={errors.phoneNumber}
      />

      <div>
        <label
          htmlFor="notes"
          className="mb-1.5 block text-caption font-medium text-neutral-700"
        >
          ملاحظات <span className="text-neutral-400">(اختياري)</span>
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="أي شيء تود إخبارنا به قبل البدء؟"
        />
      </div>

      {submitError && (
        <p className="text-caption text-red-500">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-sm px-6 py-3 text-body font-semibold text-white transition-colors disabled:opacity-60 ${buttonSolidClass[buttonVariant]}`}
      >
        {isSubmitting ? "جارٍ الإرسال..." : "تأكيد التسجيل"}
      </button>
    </form>
  );
}
