"use client";

import { ChevronLeft } from "lucide-react";
import { SectionContainer } from "../components/layout/SectionContainer";
import Button from "./ui/Button";

export interface PromoBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
  backgroundImage?: string;
  flipBackground?: boolean;
}

export default function PromoBanner({
  title = "ليس كل ما يُدرَّس يستحق أن يُتعلَّم",
  description = "كل معرفةٍ تتعلّمها تمنحها جزءًا من عمرك، فاختر ما يستحق أن تمنحه سنواتك.",
  buttonText = "ابدأ بما يستحق",
  href = "",
  backgroundImage = "/backgrounds/bg-10.png",
  flipBackground = true,

}: PromoBannerProps) {
  return (
    <section dir="rtl" className="relative pt-28">
      <SectionContainer>
        <div className="relative border border-neutral-200 rounded-0 overflow-hidden shadow-sm">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: flipBackground ? "scaleX(-1)" : undefined,
            }}
          />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 px-6 sm:px-10 py-7">
            <div className="text-center sm:text-right max-w-2xl">
              <h3 className="font-thmanyah-display font-bold text-neutral-900 text-h3-sm sm:text-h2-sm leading-snug">
                {title}
              </h3>
              <p className="font-thmanyah-text text-body leading-8 text-neutral-500 mt-3">
                {description}
              </p>
            </div>

            <Button
            href={href}
              className="shrink-0 inline-flex items-center gap-2 font-thmanyah-text font-semibold text-body text-neutral-0 bg-primary hover:bg-primary-hover hover:cursor-pointer transition-colors rounded-sm px-6 py-3"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}