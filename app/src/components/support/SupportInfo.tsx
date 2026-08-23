import { Hash } from "lucide-react";
import { Card } from "@/app/src/components/ui/Card";

export function SupportInfo() {
  return (
    <Card className="h-fit">
      <h3 className="font-thmanyah-display text-h3-sm font-semibold text-neutral-900">
        هل تحتاج مساعدة؟
      </h3>
      <p className="mt-2 font-thmanyah-text text-caption leading-[1.8] text-neutral-600 sm:text-body">
        إذا لم تكن متأكدًا من نوع طلبك، لا تقلق. اكتب لنا التفاصيل وسنقوم
        بتوجيهك إلى الحل المناسب.
      </p>

      <div className="mt-6 flex items-start gap-3 border-t border-neutral-100 pt-5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary-light text-primary">
          <Hash className="h-4 w-4" strokeWidth={2} />
        </span>
        <div>
          <p className="font-thmanyah-text text-[13px] font-semibold text-neutral-900">
            متابعة الطلب
          </p>
          <p className="mt-1 font-thmanyah-text text-[13px] leading-[1.8] text-neutral-500">
            بعد إرسال الطلب سيظهر لك رقم مرجعي يمكنك استخدامه لمتابعة طلبك.
          </p>
        </div>
      </div>
    </Card>
  );
}