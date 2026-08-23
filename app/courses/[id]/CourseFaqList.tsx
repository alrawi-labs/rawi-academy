"use client";

import { useState } from "react";
import type { CourseFaq } from "@/app/src/data/courses";

export function CourseFaqList({ faqs }: { faqs: CourseFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-2xl divide-y divide-neutral-200 border-t border-neutral-200">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-4 text-right"
              aria-expanded={isOpen}
            >
              <span className="text-h3-sm font-medium text-neutral-900">{faq.question}</span>
              <span
                className={`shrink-0 text-h3-sm text-neutral-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>
            {isOpen && (
              <p className="pb-4 font-thmanyah-text text-lead leading-10 text-neutral-600">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}