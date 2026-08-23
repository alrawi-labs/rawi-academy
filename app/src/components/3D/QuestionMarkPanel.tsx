"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const FAQ_EXAMPLES = [
  "كيف أختار مساري؟",
  "ما هي طريقة التعلم؟",
  "كيف أتابع تقدّمي؟",
];

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1900;

export function FAQAskInput() {
  
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState(FAQ_EXAMPLES[0]);
  const exampleIndex = useRef(0);
  const charCount = useRef(FAQ_EXAMPLES[0].length);
  const phase = useRef<"holding" | "deleting" | "typing">("holding");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const step = () => {
      if (phase.current === "holding") {
        phase.current = "deleting";
        timeoutId = setTimeout(step, DELETE_MS);
        return;
      }

      if (phase.current === "deleting") {
        charCount.current -= 1;
        setPlaceholder(
          FAQ_EXAMPLES[exampleIndex.current].slice(0, charCount.current)
        );
        if (charCount.current === 0) {
          exampleIndex.current =
            (exampleIndex.current + 1) % FAQ_EXAMPLES.length;
          phase.current = "typing";
        }
        timeoutId = setTimeout(step, DELETE_MS);
        return;
      }

      // phase.current === "typing"
      const target = FAQ_EXAMPLES[exampleIndex.current];
      charCount.current += 1;
      setPlaceholder(target.slice(0, charCount.current));
      if (charCount.current === target.length) {
        phase.current = "holding";
        timeoutId = setTimeout(step, HOLD_MS);
        return;
      }
      timeoutId = setTimeout(step, TYPE_MS);
    };

    timeoutId = setTimeout(step, HOLD_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center gap-3 rounded-2xl border border-white/60 bg-white/40 px-5 py-4 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)] backdrop-blur-xl transition-shadow focus-within:shadow-[0_30px_70px_-15px_rgba(20,16,40,0.32)] focus-within:ring-2 focus-within:ring-primary/25"
      >
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(115deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.08)_30%,transparent_55%)]" />

        <svg
          className="relative z-10 h-5 w-5 shrink-0 text-neutral-500"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M17 17L13.5 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="ابحث عن سؤالك"
          disabled
          className="relative z-10 flex-1 bg-transparent font-thmanyah-text text-body text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
        />

        <button
          type="submit"
          aria-label="بحث"
          className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3L4 8L10 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-thmanyah-text text-caption text-neutral-500">
          أسئلة شائعة:
        </span>
        {FAQ_EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setValue(example)}
            className="rounded-full border border-neutral-200/70 bg-white/30 px-3.5 py-1.5 font-thmanyah-text text-caption text-neutral-700 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary-light hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}