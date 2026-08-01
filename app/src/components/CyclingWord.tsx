"use client";

import { useEffect, useState } from "react";

/**
 * CyclingWord
 * -----------
 * Renders one word from `words`, cross-fading to the next every `intervalMs`.
 * Only the word itself swaps — put it inline next to your fixed text:
 *
 *   <p><CyclingWord words={["تواصل","تحدث","تفاعل"]} /> مع العالم بثقة.</p>
 *
 * Implementation note: uses `key={index}` to force React to remount the
 * inner <span> on every word change, which restarts the CSS keyframe
 * animation cleanly — simpler and more reliable than manually juggling
 * opacity state across two overlapping spans.
 */

interface CyclingWordProps {
  words: string[];
  intervalMs?: number;
  className?: string;
  accentColor?: string;
}

export default function CyclingWord({
  words,
  intervalMs = 2600,
  className = "",
  accentColor = "#8059E8",
}: CyclingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <span
      className="relative inline-block align-baseline"
      style={{ minWidth: "2.6em", paddingBottom: "0.12em" }}
    >
      <span key={index} className={`inline-block cycling-word ${className}`}>
        {words[index]}
      </span>
      <span
        key={`u-${index}`}
        className="cycling-underline absolute right-0 bottom-0 h-[2px] rounded-full"
        style={{ background: accentColor }}
      />
      <style jsx>{`
        .cycling-word {
          animation: wordReveal ${intervalMs}ms cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: 50% 100%;
          will-change: opacity, filter, transform;
        }
        @keyframes wordReveal {
          0% {
            opacity: 0;
            filter: blur(9px);
            letter-spacing: 0.05em;
            transform: translateY(16px) scale(0.9);
          }
          14% {
            opacity: 1;
            filter: blur(0px);
            letter-spacing: 0em;
            transform: translateY(0) scale(1);
          }
          82% {
            opacity: 1;
            filter: blur(0px);
            letter-spacing: 0em;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            filter: blur(6px);
            letter-spacing: -0.01em;
            transform: translateY(-10px) scale(1.04);
          }
        }

        .cycling-underline {
          width: 0%;
          opacity: 0;
          animation: underlineSweep ${intervalMs}ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes underlineSweep {
          0% {
            width: 0%;
            opacity: 0;
          }
          18% {
            width: 100%;
            opacity: 0.55;
          }
          78% {
            width: 100%;
            opacity: 0.55;
          }
          100% {
            width: 0%;
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cycling-word {
            animation: fadeOnly ${intervalMs}ms ease-in-out;
          }
          .cycling-underline {
            animation: none;
            width: 0%;
          }
          @keyframes fadeOnly {
            0% {
              opacity: 0;
            }
            14% {
              opacity: 1;
            }
            82% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        }
      `}</style>
    </span>
  );
}