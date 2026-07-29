"use client";

import { useEffect, useRef, useState } from "react";

// قائمة مُصغّرة من أشهر لغات العالم — بخطوطها الأصلية، لتغذية كومة بطاقات التعلّم المتحركة
const worldLanguages = [
  { native: "العربية", ar: "العربية", region: "آسيا" },
  { native: "English", ar: "الإنجليزية", region: "أوروبا" },
  { native: "Français", ar: "الفرنسية", region: "أوروبا" },
  { native: "Español", ar: "الإسبانية", region: "أوروبا" },
  { native: "Deutsch", ar: "الألمانية", region: "أوروبا" },
  { native: "Italiano", ar: "الإيطالية", region: "أوروبا" },
  { native: "Türkçe", ar: "التركية", region: "آسيا" },
  { native: "فارسی", ar: "الفارسية", region: "آسيا" },
  { native: "Bahasa Indonesia", ar: "الإندونيسية", region: "آسيا" },
  { native: "Українська", ar: "الأوكرانية", region: "أوروبا" },
];
// كومة بطاقات تعلّم متحركة بأسلوب الزجاج الفاتح: شفافية + بلور + حدود بيضاء رفيعة،
// مع إبقاء النص داكناً حتى يبقى مقروءاً على أي خلفية فاتحة
export default function LanguageFlashcardStack() {
  const [queue, setQueue] = useState(worldLanguages);
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
      {visible.map((lang, depth) => (
        <div
          key={lang.native}
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            ...cardStyle(depth, exiting && depth === 0),
            zIndex: 10 - depth,
          }}
        >
          <div className="w-full h-full bg-white/60 backdrop-blur-md backdrop-saturate-150 rounded-lg border border-white/60 shadow-[0_30px_60px_-20px_rgba(120,80,220,0.25)] p-5 flex flex-col relative overflow-hidden">
            {/* حافة علوية لامعة توحي بانعكاس الضوء على الزجاج */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" />

            <div className="flex items-center justify-between relative">
              <span className="text-[10px] font-semibold tracking-[0.15em] text-[#9A9AB0] uppercase">
                بطاقة تعلّم
              </span>
              <span className="text-[10px] font-medium text-[#8059E8] bg-white/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/50">
                {lang.region}
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center px-2 relative">
              <p className="text-[30px] leading-tight font-semibold text-[#09090B] break-words">
                {lang.native}
              </p>
              <p
                dir="rtl"
                className="font-thmanyah-text text-[13px] text-[#7A7F94] mt-2"
              >
                {lang.ar}
              </p>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-white/50 relative">
              <div className="h-[3px] rounded-full bg-white/40 w-full" />
              <div className="h-[3px] rounded-full bg-white/40 w-4/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}