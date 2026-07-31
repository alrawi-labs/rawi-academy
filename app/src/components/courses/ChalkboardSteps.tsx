"use client";

const steps = [
  { text: "x² - 5x + 6 = 0", final: false },
  { text: "x² - 2x - 3x + 6 = 0", final: false },
  { text: "x(x - 2) - 3(x - 2) = 0", final: false },
  { text: "(x - 2)(x - 3) = 0", final: false },
  { text: "x = 2   أو   x = 3", final: true },
];

export default function ChalkboardSteps() {
  return (
    <div className="relative w-57 h-80 -rotate-2">
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-neutral-0/40 backdrop-blur-xl border border-neutral-0/60 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)]">
        {/* شريط النافذة العلوي — زجاجي، بنفس مفردة نافذة الفيديو في بطاقة اللغات */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-neutral-0/30 backdrop-blur-md border-b border-neutral-0/50">
          <span className="w-2 h-2 rounded-full bg-neutral-0/70" />
          <span className="w-2 h-2 rounded-full bg-neutral-0/70" />
          <span className="w-2 h-2 rounded-full bg-neutral-0/70" />
          <span
            dir="rtl"
            className="mx-auto text-[10px] tracking-widest text-neutral-600"
          >
            حل بالتحليل
          </span>
        </div>

        {/* منطقة الحل — زجاجية شبه شفافة */}
        <div className="relative h-[calc(100%-41px)] bg-neutral-0/15 backdrop-blur-sm px-5 py-6 overflow-hidden">
          {/* لمعة زجاجية قطرية خفيفة أعلى المنطقة */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
            }}
          />

          <div
            dir="ltr"
            className="relative h-full flex flex-col justify-center gap-4.5"
          >
            {steps.map((step, i) => (
              <div key={step.text} className="chalk-line-wrap overflow-hidden">
                <span
                  className="chalk-line inline-flex items-center font-mono text-caption whitespace-nowrap"
                  style={{
                    color: step.final ? "var(--color-visual-teal)" : "var(--color-neutral-700)",
                    fontWeight: step.final ? 700 : 500,
                    animationDelay: `${i * 1.05}s`,
                  }}
                >
                  {step.final && (
                    <span className="ml-1.5" style={{ color: "var(--color-visual-teal)" }}>✓</span>
                  )}
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .chalk-line-wrap {
          width: fit-content;
        }
        .chalk-line {
          animation: chalkWrite 9.3s ease-in-out infinite;
        }
        @keyframes chalkWrite {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
          }
          4% {
            opacity: 1;
          }
          20% {
            clip-path: inset(0 0 0 0);
          }
          75% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
          88% {
            opacity: 0;
            clip-path: inset(0 0 0 0);
          }
          100% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .chalk-line {
            animation: none;
            opacity: 1;
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </div>
  );
}