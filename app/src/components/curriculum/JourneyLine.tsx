"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vertical self-drawing line that runs behind the six curriculum stages.
 * Same "self-drawing" motif as FAQSection's answer underline, applied here
 * to a full-height path instead of a short accent.
 */
export default function JourneyLine() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute top-0 bottom-0 right-[6%] w-[2px] md:right-[6%] max-md:right-[22px]"
    >
      <svg
        viewBox="0 0 4 1200"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <path
          d="M2 0 L2 1200"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          style={{
            strokeDasharray: 1400,
            strokeDashoffset: drawn ? 0 : 1400,
            transition: "stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </svg>
    </div>
  );
}

