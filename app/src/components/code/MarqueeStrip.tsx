"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeStripProps {
  items: string[];
  speed?: number;
  accentVar?: string;
  bgVar?: string;
  className?: string;
}

export default function MarqueeStrip({
  items,
  speed = 18,
  accentVar = "--color-visual-teal",
  bgVar = "--color-neutral-100",
  className = "",
}: MarqueeStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [repeat, setRepeat] = useState(4);

  useEffect(() => {
    const measure = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const setWidth = firstSetRef.current?.offsetWidth ?? 0;
      if (!containerWidth || !setWidth) return;

      const needed = Math.ceil((containerWidth * 2) / setWidth);
      setRepeat(Math.max(2, needed));
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (firstSetRef.current) ro.observe(firstSetRef.current);

    return () => ro.disconnect();
  }, [items]);

  return (
    <div
      ref={containerRef}
      className={`marquee-strip ${className}`}
      style={{
        ["--marquee-speed" as string]: `${speed}s`,
        background: `var(${bgVar})`,
      }}
    >
      <div
        className="marquee-fade marquee-fade--start"
        style={{ background: `linear-gradient(90deg, var(${bgVar}), transparent)` }}
      />
      <div
        className="marquee-fade marquee-fade--end"
        style={{ background: `linear-gradient(270deg, var(${bgVar}), transparent)` }}
      />

      <div
        className="marquee-track"
        style={{ ["--marquee-repeat" as string]: repeat }}
      >
        {Array.from({ length: repeat }).map((_, setIndex) => (
          <div
            key={`set-${setIndex}`}
            ref={setIndex === 0 ? firstSetRef : undefined}
            className="marquee-set"
          >
            {items.map((item, i) => (
              <div className="marquee-item" key={`set-${setIndex}-${item}-${i}`}>
                <span className="font-thmanyah-text text-caption text-neutral-400 whitespace-nowrap">
                  {item}
                </span>
                <span
                  className="marquee-dot"
                  style={{ background: `var(${accentVar})` }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-strip {
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .marquee-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-fade--start {
          right: 0;
        }
        .marquee-fade--end {
          left: 0;
        }
        .marquee-track {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          width: max-content;
          animation: marquee-scroll var(--marquee-speed) linear infinite;
        }
        .marquee-strip:hover .marquee-track {
          animation-play-state: paused;
        }
        .marquee-set {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          flex-shrink: 0;
        }
        .marquee-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 2rem;
          padding-inline-end: 2rem;
          flex-shrink: 0;
        }
        .marquee-dot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          flex-shrink: 0;
          opacity: 0.6;
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% / var(--marquee-repeat)));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
