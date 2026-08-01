"use client";

import { RotateCw } from "lucide-react";

export default function FollowCard({ title = "متابعةٌ تصنع الفرق" }) {
  return (
    <div className="relative w-full max-w-[403px] mx-auto md:mx-0 bg-neutral-0 border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
      {/* Title — now its own small card, sitting above the mockup panel */}
      <div
        dir="rtl"
        className="absolute z-10 left-1/2 -translate-x-1/2 top-[4%] w-[72%] sm:w-[260px] rounded-lg px-4 py-4 sm:px-5"
      >
        <h3 className="font-thmanyah-display text-center font-semibold text-h3 sm:text-h2-sm leading-[1.45] text-neutral-900">
          {title}
        </h3>
      </div>

      {/* Content mockup — the glass panel plays the role of the reference's
          product screenshot: quiet, mostly white, sitting inside the gradient */}
      <div
        dir="rtl"
        className="absolute left-[7%] sm:left-[12%] top-[58%] -translate-y-1/2 w-[84%] sm:w-[300px] rounded-lg overflow-hidden bg-neutral-0 border border-neutral-200 shadow-[0_20px_45px_-20px_rgba(9,9,11,0.25)]"
      >
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-primary-light">
          <span className="w-2 h-2 rounded-full bg-orange" />
          <span className="w-2 h-2 rounded-full bg-accent-orange" />
          <span className="w-2 h-2 rounded-full bg-visual-teal" />
          <span className="mx-auto flex items-center gap-1.5 text-micro text-neutral-400">
            متابعة الأسبوع
          </span>
        </div>

        <div className="p-4 sm:p-5">
          {/* ملخص التقدّم — دائرة نسبة + رقم متسلسل الأيام */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <svg width="44" height="44" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="var(--color-primary-light)"
                  strokeWidth="4"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - 0.78)}`}
                  transform="rotate(-90 22 22)"
                />
                <text
                  x="22"
                  y="26"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--color-neutral-900)"
                >
                  %78
                </text>
              </svg>
              <div>
                <p className="text-caption font-semibold text-neutral-900 leading-tight">
                  تقدّم هذا الأسبوع
                </p>
                <p className="text-micro text-neutral-400 mt-0.5">
                  4 من 5 دروس
                </p>
              </div>
            </div>
          </div>

          {/* أعمدة الأيام السبعة — يوم اليوم مميّز */}
          <div className="flex items-end justify-between gap-1.5 h-16 mb-4">
            {[
              { d: "س", h: 55 },
              { d: "ح", h: 80 },
              { d: "ن", h: 40 },
              { d: "ث", h: 95 },
              { d: "ر", h: 65 },
              { d: "خ", h: 100, active: true },
              { d: "ج", h: 20 },
            ].map((day) => (
              <div
                key={day.d}
                className="flex flex-col items-center gap-1.5 flex-1"
              >
                <div className="w-full h-12 flex items-end rounded-md overflow-hidden bg-neutral-100">
                  <div
                    className="w-full rounded-md"
                    style={{
                      height: `${day.h}%`,
                      background: day.active
                        ? "linear-gradient(180deg, var(--color-accent-purple) 0%, var(--color-primary-hover) 100%)"
                        : "var(--color-primary-light)",
                    }}
                  />
                </div>
                <span
                  className="text-micro"
                  style={{
                    color: day.active
                      ? "var(--color-primary-hover)"
                      : "var(--color-neutral-300)",
                    fontWeight: day.active ? 700 : 500,
                  }}
                >
                  {day.d}
                </span>
              </div>
            ))}
          </div>

          <p
            className="font-thmanyah-display text-caption text-center leading-[1.8] text-neutral-700 pt-3 border-t border-primary-light"
            style={{ letterSpacing: "-0.005em" }}
          >
            لأن التعلّم لا يحدث في يومٍ واحد، صُممت المتابعة في راوي لترافق
            الطالب في كل مرحلة، وتكشف نقاط قوته، وتساعده على تجاوز ما يصعب عليه،
            حتى يتقدّم بثقة نحو الإتقان.
          </p>
        </div>
      </div>
      {/* Gradient field — recolored using the closest theme tokens available
          for each stop in the original reference gradient */}
      <div className="w-full h-96 sm:h-110 lg:h-125 mt-2 bg-gradient-aurora" />
    </div>
  );
}