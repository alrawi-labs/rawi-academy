"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GuideBuildVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const blocks = container.querySelectorAll<SVGGraphicsElement>("[data-block]");
    const cursorCore = container.querySelector<SVGCircleElement>("[data-cursor-core]");
    const cursorHalo = container.querySelector<SVGCircleElement>("[data-cursor-halo]");
    const typingDots = container.querySelectorAll<SVGCircleElement>("[data-dot]");
    const sendGlow = container.querySelector<SVGCircleElement>("[data-send-glow]");
    const finaleGlow = container.querySelector<SVGCircleElement>("[data-finale-glow]");
    const finaleText = container.querySelector<HTMLDivElement>("[data-finale-text]");

    if (prefersReduced) {
      gsap.set(blocks, { scale: 1, opacity: 1 });
      gsap.set([cursorCore, cursorHalo, sendGlow, finaleGlow], { opacity: 0 });
      gsap.set(finaleText, { opacity: 0 });
      return;
    }

    gsap.set(blocks, { transformOrigin: "right center", scale: 0.92, opacity: 0 });
    gsap.set([cursorCore, cursorHalo], { opacity: 0 });
    gsap.set(sendGlow, { opacity: 0, scale: 0.3, transformOrigin: "center" });
    gsap.set(finaleGlow, { opacity: 0, scale: 0.2, transformOrigin: "center" });
    gsap.set(finaleText, { opacity: 0, scale: 0.7, filter: "blur(14px)" });

    // نبض متواصل وهادئ جدًا لنقاط "يكتب الآن..." — تبدأ فورًا وتستمر طوال الوقت
    gsap.to(typingDots, {
      y: -3,
      duration: 0.45,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.14, repeat: -1, yoyo: true },
    });

    const anchors: [string, number, number][] = [
      ["header", 250, 27],
      ["divider", 160, 50],
      ["bubble1", 121, 83],
      ["bubble2", 91, 126],
      ["userbubble", 222, 174],
      ["typing", 48, 223],
      ["chips", 200, 255],
      ["inputrow", 200, 285],
    ];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power3.out" } });

      anchors.forEach(([key, x, y], i) => {
        const el = container.querySelector<SVGGraphicsElement>(`[data-block="${key}"]`);
        if (!el) return;

        const isLast = key === "inputrow";

        tl.to(
          [cursorCore, cursorHalo],
          { opacity: 1, x, y, duration: i === 0 ? 0.01 : 0.42 },
          i === 0 ? 0 : "+=0.1",
        ).to(
          el,
          {
            scale: 1,
            opacity: 1,
            duration: isLast ? 0.55 : 0.48,
            ease: isLast ? "back.out(2.2)" : "power4.out",
          },
          "-=0.08",
        );

        if (isLast) {
          tl.to(sendGlow, { opacity: 0.55, scale: 2.4, duration: 0.7, ease: "power2.out" }, "<")
            .to(sendGlow, { opacity: 0, duration: 0.4 }, ">-0.2");
        }
      });

      tl.to([cursorCore, cursorHalo], { opacity: 0, duration: 0.3 }, "+=0.25").to(
        {},
        { duration: 0.9 },
      );

      // === لحظة الاكتمال: انهيار أنيق نحو المركز، وميض، ثم "قريبًا" ===
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
          <radialGradient id="guideAmbient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="guideAmbientSoft" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="guideCursorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="guideFinaleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
            <stop offset="55%" stopColor="var(--color-primary)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <filter id="guideBlur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="guideFinaleBlur" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="guideShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="2"
              style={{ floodColor: "var(--color-neutral-900)" }}
              floodOpacity="0.08"
            />
          </filter>
          <pattern id="guideDots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--color-neutral-900)" />
          </pattern>
        </defs>

        {/* نسيج نقطي خافت جدًا — ثابت، لإضافة عمق دون أي حركة */}
        <rect x="0" y="0" width="320" height="300" fill="url(#guideDots)" opacity="0.05" />

        {/* إضاءتان محيطيتان ثابتتان — عمق بصري غير متماثل */}
        <circle cx="270" cy="230" r="80" fill="url(#guideAmbient)" filter="url(#guideBlur)" />
        <circle cx="40" cy="40" r="60" fill="url(#guideAmbientSoft)" filter="url(#guideBlur)" />

        {/* === رأس المحادثة === */}
        <g data-block="header">
          <circle cx="294" cy="27" r="13" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.25" />
          <circle cx="294" cy="27" r="10" fill="var(--color-primary-light)" />
          <path
            d="M294,20.5 C294.6,23.4 296.1,24.9 299,25.5 C296.1,26.1 294.6,27.6 294,30.5 C293.4,27.6 291.9,26.1 289,25.5 C291.9,24.9 293.4,23.4 294,20.5 Z"
            fill="var(--color-primary)"
          />
          <circle cx="283" cy="35" r="2.5" fill="var(--color-primary)" />
          <rect x="194" y="21" width="80" height="10" rx="5" fill="var(--color-neutral-200)" />
          <rect x="222" y="35" width="50" height="6" rx="3" fill="var(--color-neutral-200)" opacity="0.6" />
        </g>

        <rect data-block="divider" x="16" y="50" width="288" height="1" fill="var(--color-neutral-200)" opacity="0.7" />

        {/* === فقاعة الذكاء الاصطناعي — رسالة أولى === */}
        <g data-block="bubble1">
          <rect x="16" y="62" width="210" height="42" rx="16" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1" filter="url(#guideShadow)" />
          <rect x="32" y="76" width="160" height="8" rx="4" fill="var(--color-neutral-200)" />
          <rect x="32" y="90" width="120" height="8" rx="4" fill="var(--color-neutral-200)" />
        </g>

        {/* رسالة متابعة — مجمّعة، بدون تكرار الأفاتار */}
        <g data-block="bubble2">
          <rect x="16" y="112" width="150" height="28" rx="14" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1" filter="url(#guideShadow)" />
          <rect x="32" y="122" width="110" height="8" rx="4" fill="var(--color-neutral-200)" />
          <rect x="16" y="146" width="28" height="5" rx="2.5" fill="var(--color-neutral-200)" opacity="0.4" />
        </g>

        {/* رد المستخدم — مع إيصال قراءة */}
        <g data-block="userbubble">
          <rect x="140" y="158" width="164" height="32" rx="16" fill="var(--color-primary-light)" filter="url(#guideShadow)" />
          <rect x="156" y="170" width="112" height="8" rx="4" fill="var(--color-primary)" opacity="0.35" />
          <rect x="266" y="196" width="28" height="5" rx="2.5" fill="var(--color-neutral-200)" opacity="0.4" />
          <path d="M292,196.5 L294.5,199 L299,194" fill="none" stroke="var(--color-primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* مؤشر "يكتب الآن..." — نقاط تنبض باستمرار طالما ظاهرة */}
        <g data-block="typing">
          <rect x="16" y="210" width="64" height="26" rx="13" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1" filter="url(#guideShadow)" />
          <circle data-dot cx="32" cy="223" r="2.6" fill="var(--color-primary)" opacity="0.8" />
          <circle data-dot cx="42" cy="223" r="2.6" fill="var(--color-primary)" opacity="0.8" />
          <circle data-dot cx="52" cy="223" r="2.6" fill="var(--color-primary)" opacity="0.8" />
        </g>

        {/* شرائح الردود السريعة */}
        <g data-block="chips">
          <rect x="240" y="246" width="64" height="18" rx="9" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1" />
          <rect x="252" y="252" width="40" height="6" rx="3" fill="var(--color-neutral-200)" />
          <rect x="168" y="246" width="64" height="18" rx="9" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1" />
          <rect x="180" y="252" width="40" height="6" rx="3" fill="var(--color-neutral-200)" />
          <rect x="96" y="246" width="64" height="18" rx="9" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1" />
          <rect x="108" y="252" width="40" height="6" rx="3" fill="var(--color-neutral-200)" />
        </g>

        {/* شريط الإدخال + زر الإرسال */}
        <g data-block="inputrow">
          <rect x="16" y="274" width="248" height="22" rx="11" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1" />
          <circle data-send-glow cx="290" cy="285" r="13" fill="url(#guideCursorGlow)" />
          <circle cx="290" cy="285" r="12" fill="var(--color-primary)" filter="url(#guideShadow)" />
          <path d="M294,285 L287,281 L287,289 Z" fill="var(--color-neutral-0)" />
        </g>

        {/* مؤشر البناء — نواة + هالة متوهجة */}
        <circle data-cursor-halo r="9" fill="url(#guideCursorGlow)" filter="url(#guideBlur)" />
        <circle data-cursor-core r="3" fill="var(--color-primary)" />

        {/* وميض اللحظة النهائية */}
        <circle data-finale-glow cx="160" cy="150" r="50" fill="url(#guideFinaleGlow)" filter="url(#guideFinaleBlur)" />
      </svg>

      <div
        data-finale-text
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="font-thmanyah-display text-h2-sm font-bold text-primary sm:text-h2">
          قريبًا
        </span>
      </div>
    </div>
  );
}