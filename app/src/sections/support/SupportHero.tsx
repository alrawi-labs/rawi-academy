"use client";

import { CheckCircle2 } from "lucide-react";
import Button from "@/app/src/components/ui/Button";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { PremiumGradientBar } from "@/app/src/components/3D/PremiumGradientBar";
import {
  SupportTicketForm,
  type SupportTicketData,
} from "@/app/src/components/support/SupportTicketForm";

type SupportHeroProps = {
  onSubmit: (data: SupportTicketData) => Promise<void> | void;
  isSubmitting: boolean;
  submitError: string | null;
  ticketId: string | null;
  onReset: () => void;
};

export default function SupportHero({
  onSubmit,
  isSubmitting,
  submitError,
  ticketId,
  onReset,
}: SupportHeroProps) {
  return (
    <section dir="rtl" className="relative overflow-hidden bg-neutral-100">
      <PremiumGradientBar offsetY={250} />

      <SectionContainer>
        <div className="relative grid grid-cols-1 items-start gap-10 py-24 sm:py-28 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16 lg:py-32">
          {/* النص الرئيسي — يمين الشاشة (RTL) */}
          <div className="max-w-2xl lg:pt-10">
            <h1 className="mt-6 font-thmanyah-display text-h2-sm font-bold leading-[1.25] text-neutral-900 sm:text-hero">
              نحن هنا لمساعدتك
            </h1>

            <p className="mt-6 max-w-lg font-thmanyah-text text-body leading-[1.9] text-neutral-700 sm:text-lead sm:leading-[1.8]">
              لديك سؤال أو واجهت مشكلة؟
              <br />
              تواصل مع فريق راوي وسنساعدك في الوصول إلى الحل
            </p>
          </div>

          {/* نموذج الدعم — لوحة زجاجية عائمة، يسار الشاشة */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)] backdrop-blur-xl">
              {/* Diyagonal parıltı — §4 reçetesi birebir */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(115deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.08)_30%,transparent_55%)]" />

              <div className="relative z-10 p-6 sm:p-7">
                {ticketId ? (
                  <div className="py-3 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                      <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
                    </span>

                    <h2 className="mt-5 font-thmanyah-display text-h3-sm font-bold text-neutral-900">
                      تم إرسال طلبك بنجاح
                    </h2>
                    <p className="mt-2 font-thmanyah-text text-caption text-neutral-600">
                      شكرًا لتواصلك معنا. سنعود إليك في أقرب وقت.
                    </p>

                    <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2">
                      <span className="font-thmanyah-text text-[13px] text-neutral-500">
                        رقم الطلب
                      </span>
                      <span
                        dir="ltr"
                        className="font-thmanyah-text text-[13px] font-semibold text-neutral-900"
                      >
                        #{ticketId}
                      </span>
                    </div>

                    <div className="mt-6">
                      <Button variant="outline" size="md" onClick={onReset}>
                        إرسال طلب آخر
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>

                    <h2 className="font-thmanyah-text text-body font-semibold text-neutral-900">
                      أرسل طلب دعم
                    </h2>
                    <p className="mb-5 mt-1.5 font-thmanyah-text text-caption leading-[1.8] text-neutral-600">
                      سنرد عليك في أقرب وقت ممكن.
                    </p>

                    <SupportTicketForm
                      variant="embedded"
                      onSubmit={onSubmit}
                      isSubmitting={isSubmitting}
                      submitError={submitError}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}