import { CheckCircle2 } from "lucide-react";
import Button from "@/app/src/components/ui/Button";

type SupportSuccessProps = {
  ticketId: string;
  onReset: () => void;
};

export function SupportSuccess({ ticketId, onReset }: SupportSuccessProps) {
  return (
    <div className="rounded-sm border border-neutral-200 bg-white p-8 text-center sm:p-12">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
        <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
      </span>

      <h2 className="mt-5 font-thmanyah-display text-h3-sm font-bold text-neutral-900 sm:text-h3">
        تم إرسال طلبك بنجاح
      </h2>
      <p className="mt-2 font-thmanyah-text text-caption text-neutral-600 sm:text-body">
        شكرًا لتواصلك معنا. تم تسجيل طلبك بنجاح.
      </p>

      <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-sm border border-neutral-200 bg-neutral-50 px-4 py-2">
        <span className="font-thmanyah-text text-[13px] text-neutral-500">
          رقم الطلب
        </span>
        <span dir="ltr" className="font-thmanyah-text text-[13px] font-semibold text-neutral-900">
          #{ticketId}
        </span>
      </div>

      <div className="mt-7">
        <Button variant="outline" size="md" onClick={onReset}>
          العودة إلى مركز الدعم
        </Button>
      </div>
    </div>
  );
}