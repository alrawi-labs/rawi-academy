"use client";

import { useEffect, useRef, useState } from "react";

// مسائل مُصغّرة من فروع الرياضيات المختلفة — لتغذية كومة بطاقات الحل المتحركة
const mathProblems = [
  { expr: "x² - 5x + 6 = 0", hint: "x = ٢ , x = ٣", topic: "جبر" },
  { expr: "أ = π نق²", hint: "مساحة الدائرة", topic: "هندسة" },
  { expr: "∫ 2x dx", hint: "= x² + C", topic: "تفاضل وتكامل" },
  { expr: "sin²θ + cos²θ", hint: "= ١", topic: "مثلثات" },
  { expr: "١٤٤ ÷ ١٢", hint: "= ١٢", topic: "حساب" },
  { expr: "لو(١٠٠٠)", hint: "= ٣", topic: "لوغاريتمات" },
  { expr: "!٣", hint: "= ٦", topic: "تباديل" },
];

// كل بطاقة تُختم بحبر مختلف بحسب فرع الرياضيات — استمرارًا لنفس مفردة الختم في بطاقات اللغات
const topicSeal: Record<string, { ink: string; mark: string }> = {
  جبر: { ink: "#8059E8", mark: "ج" },
  هندسة: { ink: "#22C1A0", mark: "هن" },
  "تفاضل وتكامل": { ink: "#A6462B", mark: "تف" },
  مثلثات: { ink: "#2F7A63", mark: "مث" },
  حساب: { ink: "#8059E8", mark: "حس" },
  لوغاريتمات: { ink: "#A6462B", mark: "لو" },
  تباديل: { ink: "#22C1A0", mark: "تب" },
};

const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function toArabicNumeral(n: number, pad = 2) {
  return String(n)
    .padStart(pad, "0")
    .split("")
    .map((d) => arabicDigits[Number(d)])
    .join("");
}

export default function MathProblemStack() {
  const [queue, setQueue] = useState(mathProblems);
  const [exiting, setExiting] = useState(false);
  const timers = useRef<{
    interval?: ReturnType<typeof setInterval>;
    exit?: ReturnType<typeof setTimeout>;
  }>({});

  useEffect(() => {
    timers.current.interval = setInterval(() => {
      setExiting(true);
      timers.current.exit = setTimeout(() => {
        setQueue((q) => [...q.slice(1), q[0]]);
        setExiting(false);
      }, 520);
    }, 2600);

    return () => {
      clearInterval(timers.current.interval);
      clearTimeout(timers.current.exit);
    };
  }, []);

  const visible = queue.slice(0, 4);

  const cardStyle = (depth: number, isExiting: boolean) => {
    if (isExiting) {
      return {
        transform: "translate(8px, -52px) rotate(-9deg) scale(0.82)",
        opacity: 0,
      };
    }
    const config = [
      { x: 0, y: 0, r: -1.5, s: 1, o: 1 },
      { x: -10, y: 16, r: -3.5, s: 0.95, o: 0.82 },
      { x: 9, y: 30, r: 3, s: 0.9, o: 0.52 },
      { x: -16, y: 42, r: -5, s: 0.85, o: 0.28 },
    ][depth];
    return {
      transform: `translate(${config.x}px, ${config.y}px) rotate(${config.r}deg) scale(${config.s})`,
      opacity: config.o,
    };
  };

  return (
    <div className="relative w-[228px] h-[292px]">
      {visible.map((problem, depth) => {
        const seal = topicSeal[problem.topic] ?? topicSeal["جبر"];
        const catalogNo = mathProblems.findIndex(
          (p) => p.expr === problem.expr
        );

        return (
          <div
            key={problem.expr}
            className="absolute inset-0 transition-all duration-500 ease-out"
            style={{
              ...cardStyle(depth, exiting && depth === 0),
              zIndex: 10 - depth,
            }}
          >
            <div className="relative w-full h-full bg-[#FAF6EE] rounded-[3px] border border-[#241F2E]/[0.09] shadow-[0_22px_44px_-26px_rgba(36,26,20,0.45)] overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#241F2E 0.5px, transparent 0.5px)",
                  backgroundSize: "3px 3px",
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(115deg, #241F2E 0px, #241F2E 1px, transparent 1px, transparent 7px)",
                }}
              />
              <div
                className="absolute top-0 left-0 w-6 h-6 pointer-events-none"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                  background:
                    "linear-gradient(135deg, rgba(36,31,46,0.05), rgba(36,31,46,0.13))",
                }}
              />

              <div className="relative h-full flex flex-col px-5 pt-4 pb-4">
                <div
                  dir="ltr"
                  className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#6B6478]"
                >
                  <span>
                    {toArabicNumeral(catalogNo + 1)} /{" "}
                    {toArabicNumeral(mathProblems.length)}
                  </span>
                  <span dir="rtl" className="italic tracking-normal text-[#6B6478]/70">
                    بطاقة مسألة
                  </span>
                </div>

                <div className="h-px bg-[#241F2E]/10 my-3 shrink-0" />

                <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 min-h-0">
                  <p
                    dir="ltr"
                    className="font-mono text-[20px] leading-[1.25] text-[#241F2E] break-words"
                  >
                    {problem.expr}
                  </p>

                  <div className="relative rotate-[-2deg]">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-[#241F2E]/[0.06] rounded-[1px]" />
                    <p
                      dir="ltr"
                      className="font-mono text-[12px] text-[#6B6478] italic border-b border-dashed border-[#6B6478]/40 pb-0.5 px-1"
                    >
                      {problem.hint}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center pt-2 shrink-0">
                  <div
                    className="relative w-14 h-14 flex items-center justify-center rounded-full"
                    style={{ border: `1.5px solid ${seal.ink}`, opacity: 0.9 }}
                  >
                    <div
                      className="absolute inset-[3px] rounded-full"
                      style={{ border: `1px dashed ${seal.ink}`, opacity: 0.5 }}
                    />
                    <span
                      className="font-serif text-[12px]"
                      style={{ color: seal.ink }}
                    >
                      {seal.mark}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}