"use client";

import { ChevronLeft } from "lucide-react";
import { SectionContainer } from "../components/layout/SectionContainer";

export default function StartWithWhatMatters() {
  return (
    <section dir="rtl" className="relative pt-28">
      <SectionContainer>
        <div className="relative border border-neutral-200 rounded-0 overflow-hidden shadow-sm">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/backgrounds/bg-10.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scaleX(-1)",
            }}
          />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 px-6 sm:px-10 py-7">
            <div className="text-center sm:text-right max-w-2xl">
              <h3 className="font-thmanyah-display font-bold text-neutral-900 text-h3-sm sm:text-h2-sm leading-snug">
                ليس كل ما يُدرَّس يستحق أن يُتعلَّم
              </h3>
              <p className="font-thmanyah-text text-body leading-8 text-neutral-500 mt-3">
                كل معرفةٍ تتعلّمها تمنحها جزءًا من عمرك، فاختر ما يستحق أن تمنحه
                سنواتك.
              </p>
            </div>

            <button className="shrink-0 inline-flex items-center gap-2 font-thmanyah-text font-semibold text-body text-neutral-0 bg-primary hover:bg-primary-hover hover:cursor-pointer transition-colors rounded-sm px-6 py-3">
              ابدأ بما يستحق
              <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}