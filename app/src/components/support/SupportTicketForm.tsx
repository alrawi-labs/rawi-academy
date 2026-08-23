"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import Button from "@/app/src/components/ui/Button";
import { Input } from "@/app/src/components/ui/Input";
import { Textarea } from "@/app/src/components/ui/Textarea";
import { Select } from "@/app/src/components/ui/Select";
import { FileUpload } from "@/app/src/components/ui/FileUpload";
import { PhoneInput } from "@/app/src/components/ui/PhoneInput";

const REQUEST_TYPES = [
  { value: "course_inquiry", label: "استفسار عن دورة" },
  { value: "technical_issue", label: "مشكلة تقنية" },
  { value: "account_issue", label: "مشكلة في الحساب" },
  { value: "billing", label: "الدفع والاشتراك" },
  { value: "suggestion", label: "اقتراح" },
  { value: "other", label: "أخرى" },
];

const MIN_DETAILS_LENGTH = 20;

export type SupportTicketData = {
  fullName: string;
  phoneCountryCode: string;
  phoneNumber: string;
  requestType: string;
  title: string;
  details: string;
  fileName: string | null;
};

type SupportTicketFormProps = {
  onSubmit: (data: SupportTicketData) => Promise<void> | void;
  isSubmitting: boolean;
  submitError: string | null;
  /**
   * "embedded" — kendi çerçevesini (border/bg/başlık) basmaz; ebeveyn
   * (ör. SupportHero'daki cam panel) çerçeveyi zaten sağlıyor.
   * "panel"    — eski bağımsız kullanım, kendi kart çerçevesiyle.
   */
  variant?: "embedded" | "panel";
};

export function SupportTicketForm({
  onSubmit,
  isSubmitting,
  submitError,
  variant = "panel",
}: SupportTicketFormProps) {
  const [fullName, setFullName] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [requestType, setRequestType] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const digitsOnly = phoneNumber.replace(/[\s-]/g, "");
    return {
      fullName: fullName.trim().length >= 2 ? null : "الرجاء كتابة اسمك الكامل",
      phoneCountryCode: phoneCountryCode ? null : "اختر الدولة",
      phoneNumber:
        /^\d{6,12}$/.test(digitsOnly) ? null : "الرجاء إدخال رقم هاتف صحيح",
      requestType: requestType ? null : "الرجاء اختيار نوع الطلب",
      title: title.trim() ? null : "الرجاء كتابة عنوان للطلب",
      details:
        details.trim().length >= MIN_DETAILS_LENGTH
          ? null
          : `الرجاء كتابة ${MIN_DETAILS_LENGTH} حرفًا على الأقل لوصف طلبك`,
    };
  }, [fullName, phoneCountryCode, phoneNumber, requestType, title, details]);

  const isValid = Object.values(errors).every((e) => !e);
  const isEmbedded = variant === "embedded";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || isSubmitting) return;

    await onSubmit({
      fullName: fullName.trim(),
      phoneCountryCode,
      phoneNumber: phoneNumber.replace(/[\s-]/g, ""),
      requestType,
      title: title.trim(),
      details: details.trim(),
      fileName: file?.name ?? null,
    });
  };

  return (
    <form
      id="support-form"
      onSubmit={handleSubmit}
      noValidate
      className={
        isEmbedded
          ? "scroll-mt-24"
          : "scroll-mt-24 rounded-sm border border-neutral-200 bg-white p-6 sm:p-7"
      }
    >
      {!isEmbedded && (
        <>
          <h2 className="font-thmanyah-display text-h3-sm font-semibold text-neutral-900 sm:text-h3">
            إرسال طلب دعم
          </h2>
          <p className="mt-2 font-thmanyah-text text-caption text-neutral-500 sm:text-body">
            اختر نوع الطلب واكتب لنا التفاصيل حتى نتمكن من مساعدتك بشكل أفضل.
          </p>
        </>
      )}

      <div className={isEmbedded ? "flex flex-col gap-4" : "mt-6 flex flex-col gap-5"}>
        <Input
          label="الاسم الكامل"
          placeholder="اكتب اسمك الكامل"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={touched ? errors.fullName ?? undefined : undefined}
        />

        <PhoneInput
          countryCode={phoneCountryCode}
          onCountryCodeChange={setPhoneCountryCode}
          number={phoneNumber}
          onNumberChange={setPhoneNumber}
          countryError={touched ? errors.phoneCountryCode ?? undefined : undefined}
          numberError={touched ? errors.phoneNumber ?? undefined : undefined}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="نوع الطلب"
            placeholder="اختر نوع الطلب"
            options={REQUEST_TYPES}
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            error={touched ? errors.requestType ?? undefined : undefined}
          />

          <Input
            label="عنوان الطلب"
            placeholder="اكتب عنوانًا مختصرًا"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={touched ? errors.title ?? undefined : undefined}
          />
        </div>

        <Textarea
          label="تفاصيل الطلب"
          placeholder="اشرح لنا المشكلة أو الاستفسار بالتفصيل..."
          rows={isEmbedded ? 4 : 5}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          error={touched ? errors.details ?? undefined : undefined}
        />

        <FileUpload
          label="إرفاق ملف"
          hint="يمكنك إرفاق صورة توضح المشكلة (اختياري)"
          value={file}
          onChange={setFile}
        />
      </div>

      {submitError && (
        <div
          role="alert"
          className="mt-5 rounded-sm border border-red-200 bg-red-50 px-4 py-3 font-thmanyah-text text-[13px] text-red-600"
        >
          {submitError}
        </div>
      )}

      <div className={isEmbedded ? "mt-6" : "mt-7"}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={(touched && !isValid) || isSubmitting}
        >
          {isSubmitting ? "جارٍ إرسال الطلب..." : "إرسال طلب الدعم"}
        </Button>

        {isEmbedded && (
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center font-thmanyah-text text-[12px] text-neutral-500">
            <Mail className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            <span>الرد خلال 24 ساعة عمل، أو راسلنا على</span>
            <a
              href="mailto:support@rawi.academy"
              dir="ltr"
              className="font-medium text-primary hover:underline"
            >
              support@rawi.academy
            </a>
          </p>
        )}
      </div>
    </form>
  );
}