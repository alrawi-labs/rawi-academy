"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFoundVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const blocks = container.querySelectorAll<SVGGraphicsElement>("[data-block]");
    const cursorCore = container.querySelector<SVGCircleElement>("[data-cursor-core]");
    const cursorHalo = container.querySelector<SVGCircleElement>("[data-cursor-halo]");
    const caret = container.querySelector<SVGRectElement>("[data-caret]");
    const pulseDots = container.querySelectorAll<SVGCircleElement>("[data-pulse]");
    const breakGlow = container.querySelector<SVGCircleElement>("[data-break-glow]");
    const finaleGlow = container.querySelector<SVGCircleElement>("[data-finale-glow]");
    const finaleText = container.querySelector<HTMLDivElement>("[data-finale-text]");

    if (prefersReduced) {
      gsap.set(blocks, { scale: 1, opacity: 1 });
      gsap.set([cursorCore, cursorHalo, breakGlow, finaleGlow, caret], { opacity: 0 });
      gsap.set(finaleText, { opacity: 0 });
      return;
    }

    gsap.set(blocks, { transformOrigin: "right center", scale: 0.92, opacity: 0 });
    gsap.set([cursorCore, cursorHalo], { opacity: 0 });
    gsap.set(caret, { opacity: 0 });
    gsap.set(breakGlow, { opacity: 0, scale: 0.3, transformOrigin: "center" });
    gsap.set(finaleGlow, { opacity: 0, scale: 0.2, transformOrigin: "center" });
    gsap.set(finaleText, { opacity: 0, scale: 0.7, filter: "blur(14px)" });

    // معاينة تحميل نابضة — تبدأ فورًا وتستمر طوال الوقت
    gsap.to(pulseDots, {
      y: -3,
      duration: 0.45,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.14, repeat: -1, yoyo: true },
    });

    const anchors: [string, number, number][] = [
      ["browserbar", 250, 27],
      ["addressbar", 160, 60],
      ["loadingline", 160, 96],
      ["pagecard", 160, 150],
      ["brokenlink", 160, 150],
      ["statusrow", 200, 255],
    ];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power3.out" } });

      anchors.forEach(([key, x, y], i) => {
        const el = container.querySelector<SVGGraphicsElement>(`[data-block="${key}"]`);
        if (!el) return;

        tl.to(
          [cursorCore, cursorHalo],
          { opacity: 1, x, y, duration: i === 0 ? 0.01 : 0.42 },
          i === 0 ? 0 : "+=0.1",
        ).to(
          el,
          { scale: 1, opacity: 1, duration: 0.48, ease: "power4.out" },
          "-=0.08",
        );

        if (key === "addressbar") {
          tl.to(caret, { opacity: 1, duration: 0.2 }, "<")
            .to(caret, { opacity: 0, duration: 0.2, repeat: 3, yoyo: true }, ">");
        }

        if (key === "brokenlink") {
          tl.to(breakGlow, { opacity: 0.55, scale: 2.6, duration: 0.7, ease: "power2.out" }, "<")
            .to(breakGlow, { opacity: 0, duration: 0.4 }, ">-0.2");
        }
      });

      tl.to([cursorCore, cursorHalo], { opacity: 0, duration: 0.3 }, "+=0.25").to(
        {},
        { duration: 0.9 },
      );

      // === لحظة الكشف: انهيار أنيق نحو المركز، وميض، ثم "٤٠٤" ===
      tl.to(
        blocks,
        {
          opacity: 0,
          scale: 0.82,
          duration: 0.5,
          stagger: { each: 0.02, from: "center" },
          ease: "power2.in",
        },
        "finale",
      )
        .to(finaleGlow, { opacity: 0.9, scale: 3.2, duration: 0.7, ease: "power2.out" }, "finale+=0.15")
        .to(finaleGlow, { opacity: 0, duration: 1, ease: "power2.in" }, "finale+=0.55")
        .to(
          finaleText,
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.75, ease: "back.out(1.6)" },
          "finale+=0.3",
        )
        .to({}, { duration: 1.9 })
        .to(finaleText, { opacity: 0, scale: 0.92, filter: "blur(8px)", duration: 0.45, ease: "power2.in" })
        .set(blocks, { scale: 0.92 })
        .to({}, { duration: 0.3 });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <svg viewBox="0 0 320 300" className="h-auto w-full" fill="none" aria-hidden>
        <defs>
          <radialGradient id="nfAmbient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nfAmbientSoft" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nfCursorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nfFinaleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
            <stop offset="55%" stopColor="var(--color-primary)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <filter id="nfBlur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="nfFinaleBlur" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="nfShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="2"
              style={{ floodColor: "var(--color-neutral-900)" }}
              floodOpacity="0.08"
            />
          </filter>
          <pattern id="nfDots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--color-neutral-900)" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="320" height="300" fill="url(#nfDots)" opacity="0.05" />
        <circle cx="270" cy="230" r="80" fill="url(#nfAmbient)" filter="url(#nfBlur)" />
        <circle cx="40" cy="40" r="60" fill="url(#nfAmbientSoft)" filter="url(#nfBlur)" />

        {/* === شريط المتصفح === */}
        <g data-block="browserbar">
          <circle cx="294" cy="27" r="4" fill="var(--color-neutral-200)" />
          <circle cx="280" cy="27" r="4" fill="var(--color-neutral-200)" />
          <circle cx="266" cy="27" r="4" fill="var(--color-neutral-200)" />
          <rect x="16" y="20" width="230" height="14" rx="7" fill="var(--color-neutral-200)" opacity="0.5" />
        </g>

        {/* === شريط العنوان — يكتب رابطًا خاطئًا === */}
        <g data-block="addressbar">
          <rect x="16" y="46" width="288" height="30" rx="10" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1" filter="url(#nfShadow)" />
          <rect x="30" y="56" width="120" height="9" rx="4" fill="var(--color-neutral-200)" />
          <rect data-caret x="154" y="55" width="1.6" height="12" fill="var(--color-primary)" />
        </g>

        {/* === خط تحميل يتقطّع === */}
        <g data-block="loadingline">
          <rect x="16" y="90" width="288" height="4" rx="2" fill="var(--color-neutral-200)" opacity="0.5" />
          <rect x="16" y="90" width="96" height="4" rx="2" fill="var(--color-primary)" opacity="0.6" />
        </g>

        {/* === بطاقة الصفحة الفارغة === */}
        <g data-block="pagecard">
          <rect x="46" y="112" width="228" height="120" rx="18" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1" filter="url(#nfShadow)" />
        </g>

        {/* === أيقونة الرابط المنقطع + نبض === */}
        <g data-block="brokenlink">
          <circle data-break-glow cx="160" cy="150" r="14" fill="url(#nfCursorGlow)" />
          <path
            d="M148,158 L156,150 M172,142 L164,150 M156,150 L164,142 M156,150 L164,158"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="150" cy="146" r="1.6" fill="var(--color-primary)" opacity="0.5" />
          <circle cx="170" cy="154" r="1.6" fill="var(--color-primary)" opacity="0.5" />

          <rect x="120" y="185" width="80" height="9" rx="4" fill="var(--color-neutral-200)" />
          <g>
            <circle data-pulse cx="146" cy="205" r="2.4" fill="var(--color-primary)" opacity="0.8" />
            <circle data-pulse cx="156" cy="205" r="2.4" fill="var(--color-primary)" opacity="0.8" />
            <circle data-pulse cx="166" cy="205" r="2.4" fill="var(--color-primary)" opacity="0.8" />
          </g>
        </g>

        {/* === صف الحالة السفلي === */}
        <g data-block="statusrow">
          <rect x="140" y="246" width="120" height="20" rx="10" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1" />
          <rect x="160" y="253" width="80" height="6" rx="3" fill="var(--color-neutral-200)" />
        </g>

        {/* مؤشر — نواة + هالة متوهجة */}
        <circle data-cursor-halo r="9" fill="url(#nfCursorGlow)" filter="url(#nfBlur)" />
        <circle data-cursor-core r="3" fill="var(--color-primary)" />

        {/* وميض اللحظة النهائية */}
        <circle data-finale-glow cx="160" cy="150" r="50" fill="url(#nfFinaleGlow)" filter="url(#nfFinaleBlur)" />
      </svg>

      <div
        data-finale-text
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="font-thmanyah-display text-h2-sm font-bold text-primary sm:text-h2">
          ٤٠٤
        </span>
      </div>
    </div>
  );
}