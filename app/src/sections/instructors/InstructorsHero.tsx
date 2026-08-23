"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { PremiumGradientBar } from "@/app/src/components/3D/PremiumGradientBar";

export function InstructorsHero() {
  const reduced = useReducedMotion();

  return (
    <section dir="rtl" className="relative overflow-hidden py-28 sm:py-36">
      <style jsx global>{`
        @property --border-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes emblem-border-spin {
          to {
            --border-angle: 360deg;
          }
        }
        .emblem-comet-ring {
          animation: emblem-border-spin 6.5s linear infinite;
        }
      `}</style>

      <PremiumGradientBar offsetY={40} className=" opacity-70" />

      <SectionContainer>
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_minmax(0,320px)] lg:gap-20">
          <div className="relative z-10 max-w-2xl text-right">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 rounded-[32px]"
              style={{
                background:
                  "radial-gradient(65% 100% at 70% 40%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 45%, transparent 75%)",
                filter: "blur(18px)",
              }}
            />
            <h1
              className="font-thmanyah-display text-hero text-neutral-950"
              style={{ textShadow: "0 1px 24px rgba(255,255,255,0.9)" }}
            >
              معلّمون يستحقّون أن تتعلّم منهم
            </h1>
            <p
              className="mt-6 max-w-xl font-thmanyah-text text-lead text-neutral-800"
              style={{ textShadow: "0 1px 16px rgba(255,255,255,0.7)" }}
            >
              نخبة من المتخصصين في القرآن والبرمجة والرياضيات واللغات — اختيروا
              لخبرتهم وقدرتهم على التبسيط، لا للشهادات فقط.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}