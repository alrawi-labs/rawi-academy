"use client";

import { useState } from "react";
import SupportHero from "@/app/src/sections/support/SupportHero";
import type { SupportTicketData } from "@/app/src/components/support/SupportTicketForm";


const STORAGE_KEY = "rawi_support_tickets";

function generateTicketId() {
  const random = 1000 + Math.floor(Math.random() * 9000);
  return `RA-${random}`;
}

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = async (data: SupportTicketData) => {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      const id = generateTicketId();
      const record = {
        id,
        ...data,
        phone: `${data.phoneCountryCode} ${data.phoneNumber}`,
        createdAt: new Date().toISOString(),
      };

      const existingRaw = window.localStorage.getItem(STORAGE_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...existing, record]),
      );

      setTicketId(id);
    } catch {
      setSubmitError("حدث خطأ أثناء إرسال طلبك. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-100">
      <SupportHero
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
        ticketId={ticketId}
        onReset={() => setTicketId(null)}
      />
    </div>
  );
}