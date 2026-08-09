"use client";

import { useEffect, useState } from "react";

interface Ayah {
  text: string;
  source: string;
}

const AYAHS: Ayah[] = [
  { text: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", source: "سورة العلق — آية ١" },
  { text: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا", source: "سورة المزّمّل — آية ٤" },
  { text: "وَقُل رَّبِّ زِدْنِي عِلْمًا", source: "سورة طه — آية ١١٤" },
  { text: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ", source: "حديث شريف — رواه البخاري" },
];

const INTERVAL_MS = 6000;

// İnce, tek çizgili mühür — ayraç olarak kullanılıyor (nokta/emoji değil).
function AyahMark() {
  return (
    <svg viewBox="-10 -10 20 20" className="w-4 h-4 shrink-0" aria-hidden="true">
      <polygon
        points="0,-8 2.2,-2.2 8,0 2.2,2.2 0,8 -2.2,2.2 -8,0 -2.2,-2.2"
        stroke="var(--color-visual-teal)"
        strokeWidth={0.9}
        strokeOpacity={0.85}
        fill="none"
      />
    </svg>
  );
}

export default function AyahTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return; // hareket tercihi kapalıysa sabit ilk ayette kalır
    const id = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % AYAHS.length);
        setVisible(true);
      }, 500); // fade-out süresiyle eşleşiyor
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const current = AYAHS[index];

  return (
    <section
      dir="rtl"
      className="relative z-10 border-t border-white/10 bg-neutral-900 py-6"
    >
      {/* Ekran okuyucular için tüm ayetler statik listelenir, geçiş animasyonu aria-hidden */}
      <span className="sr-only">
        {AYAHS.map((a) => `${a.text} — ${a.source}`).join(" | ")}
      </span>

      <div
        aria-hidden="true"
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 flex items-center justify-center gap-3 transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <AyahMark />
        <p className="font-thmanyah-display text-body sm:text-h3-sm text-neutral-200 whitespace-nowrap">
          {current.text}
          <span className="mx-3 text-neutral-500">—</span>
          <span className="font-thmanyah-text text-caption text-neutral-500">
            {current.source}
          </span>
        </p>
        <AyahMark />
      </div>
    </section>
  );
}