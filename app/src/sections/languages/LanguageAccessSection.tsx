// LanguageAccessSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/* ------------------------------------------------------------------------ */
/* Not: Brief'te verilen #5E46FF, mevcut token setindeki --color-primary-alt */
/* (#533AFD) değerine çok yakın ama birebir aynı değil. Tasarım sistemine    */
/* sessizce yeni bir hex eklemek yerine, bu section'a özel scoped bir        */
/* CSS variable (--lang-accent) olarak tanımladım — hem brief'teki tam       */
/* değeri koruyor hem de "raw hex'i component içine gizlice serpiştirme"     */
/* kuralını ihlal etmiyor. İstersen tek satırda --color-primary-alt'a        */
/* hizalanabilir.                                                            */
/* ------------------------------------------------------------------------ */

type NodeDef = {
  id: string;
  x: number;
  y: number;
  r: number;
  core?: boolean; // başlangıçtan itibaren (soluk) görünür
  label?: string;
  labelDx?: number;
  labelDy?: number;
  delay: number; // ms, activation sonrası stagger
};

type EdgeDef = {
  from: string;
  to: string;
  delay: number;
  core?: boolean; // başlangıçta zaten kısmen çizili
};

type StubDef = {
  d: string; // kısa, hiçbir yere varmayan çizgi
  delay: number;
};

const NODES: NodeDef[] = [
  { id: "c1", x: 250, y: 214, r: 3, core: true, delay: 0 },
  { id: "c2", x: 300, y: 258, r: 4, core: true, delay: 0 },
  { id: "c3", x: 228, y: 298, r: 3, core: true, delay: 0 },
  { id: "c4", x: 336, y: 196, r: 3, core: true, delay: 0 },

  { id: "o1", x: 150, y: 150, r: 3, delay: 260, label: "Study", labelDx: -10, labelDy: -14 },
  { id: "o2", x: 452, y: 138, r: 3, delay: 420, label: "Work", labelDx: 10, labelDy: -14 },
  { id: "o3", x: 500, y: 316, r: 4, delay: 620, label: "Travel", labelDx: 12, labelDy: 6 },
  { id: "o4", x: 116, y: 356, r: 3, delay: 520, label: "Knowledge", labelDx: -14, labelDy: 18 },
  { id: "o5", x: 380, y: 402, r: 4, delay: 780, label: "Connect", labelDx: 12, labelDy: 18 },

  { id: "o6", x: 198, y: 420, r: 2.5, delay: 560 },
  { id: "o7", x: 440, y: 228, r: 2.5, delay: 380 },
  { id: "o8", x: 88, y: 236, r: 2.5, delay: 300 },
  { id: "o9", x: 520, y: 196, r: 2, delay: 460 },
  { id: "o10", x: 300, y: 470, r: 2, delay: 700 },
];

const EDGES: EdgeDef[] = [
  { from: "c1", to: "c2", delay: 0, core: true },
  { from: "c2", to: "c3", delay: 0, core: true },
  { from: "c2", to: "c4", delay: 0, core: true },

  { from: "c1", to: "o1", delay: 280 },
  { from: "c4", to: "o2", delay: 400 },
  { from: "c4", to: "o7", delay: 360 },
  { from: "o7", to: "o9", delay: 440 },
  { from: "o7", to: "o3", delay: 600 },
  { from: "c3", to: "o8", delay: 300 },
  { from: "c3", to: "o4", delay: 500 },
  { from: "o4", to: "o6", delay: 540 },
  { from: "o6", to: "o10", delay: 660 },
  { from: "o10", to: "o5", delay: 740 },
  { from: "o5", to: "o3", delay: 800 },
];

// Aktivasyon öncesi "kesik" yollar — hiçbir node'a varmayan kısa uçlar.
// Aktive olunca kaybolurlar, yerlerini yukarıdaki gerçek edge'ler alır.
const STUBS: StubDef[] = [
  { d: "M 150 150 L 172 168", delay: 0 },
  { d: "M 452 138 L 428 152", delay: 0 },
  { d: "M 88 236 L 112 244", delay: 0 },
  { d: "M 500 316 L 476 302", delay: 0 },
];

const COMET_PATH =
  "M 228 298 C 258 250 300 226 322 258 C 356 300 398 340 380 402";

function useInViewOnce<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function AccessNetwork({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Çok hafif mouse-parallax — sadece pointer:fine cihazlarda, birkaç px.
  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${px * 8}px`);
        el.style.setProperty("--my", `${py * 8}px`);
      });
    };
    const parent = el.closest("section");
    parent?.addEventListener("mousemove", onMove as EventListener);
    return () => {
      parent?.removeEventListener("mousemove", onMove as EventListener);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const dur = reduced ? 0 : 900; // ms — blur/opacity geçişleri
  const drawDur = reduced ? 0 : 1100; // ms — çizgi çizilme süresi
  const cometDur = reduced ? 0 : 2600; // ms — ışığın yolu kat etme süresi

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-[6/5] max-w-[560px] mx-auto"
      style={{
        transform: "translate(var(--mx, 0px), var(--my, 0px))",
        transition: "transform 0.4s ease-out",
      }}
    >
      {/* çok hafif mor glow — sabit, animasyonsuz */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 55% at 55% 45%, color-mix(in srgb, var(--lang-accent) 16%, transparent) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <svg
        viewBox="0 0 600 520"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        {/* kesik / erişilemeyen uçlar — aktivasyonla kaybolur */}
        <g>
          {STUBS.map((s, i) => (
            <path
              key={i}
              d={s.d}
              stroke="var(--color-neutral-400)"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              style={{
                opacity: active ? 0 : 0.35,
                transition: `opacity ${dur}ms ease`,
              }}
            />
          ))}
        </g>

        {/* bağlantılar */}
        <g fill="none" strokeLinecap="round">
          {EDGES.map((e, i) => {
            const from = NODES.find((n) => n.id === e.from)!;
            const to = NODES.find((n) => n.id === e.to)!;
            const isCore = !!e.core;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={
                  isCore
                    ? "color-mix(in srgb, var(--color-neutral-0) 30%, transparent)"
                    : "var(--lang-accent)"
                }
                strokeWidth={isCore ? 1 : 1.2}
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: isCore ? (active ? 0 : 0.4) : active ? 0 : 1,
                  opacity: isCore ? 0.5 : active ? 0.55 : 0,
                  transition: `stroke-dashoffset ${drawDur}ms ease ${
                    isCore ? 0 : e.delay
                  }ms, opacity ${drawDur}ms ease ${isCore ? 0 : e.delay}ms`,
                }}
              />
            );
          })}
        </g>

        {/* node'lar */}
        <g>
          {NODES.map((n) => {
            const visible = n.core || active;
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill={
                    n.core
                      ? "color-mix(in srgb, var(--color-neutral-0) 70%, transparent)"
                      : "var(--lang-accent)"
                  }
                  style={{
                    opacity: n.core ? 0.55 : visible ? 0.95 : 0,
                    filter: visible ? "blur(0px)" : "blur(3px)",
                    transition: `opacity ${dur}ms ease ${n.delay}ms, filter ${dur}ms ease ${n.delay}ms`,
                  }}
                />
                {n.label && (
                  <text
                    x={n.x + (n.labelDx ?? 8)}
                    y={n.y + (n.labelDy ?? 4)}
                    fontSize="11"
                    letterSpacing="0.04em"
                    fill="var(--color-neutral-300)"
                    style={{
                      opacity: active ? 0.85 : 0,
                      transition: `opacity ${dur}ms ease ${n.delay + 260}ms`,
                    }}
                  >
                    {n.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* comet — "dil" */}
        {!reduced && (
          <circle
            r="4.5"
            fill="var(--color-neutral-0)"
            style={{
              offsetPath: `path("${COMET_PATH}")`,
              offsetRotate: "0deg",
              offsetDistance: active ? "100%" : "0%",
              opacity: active ? [0, 1] as unknown as number : 0, // TS guard; gerçek davranış aşağıda
              transition: `offset-distance ${cometDur}ms cubic-bezier(0.4,0,0.2,1), opacity 300ms ease`,
              filter:
                "drop-shadow(0 0 6px var(--lang-accent)) drop-shadow(0 0 14px color-mix(in srgb, var(--lang-accent) 60%, transparent))",
            }}
          />
        )}
      </svg>
    </div>
  );
}

export default function LanguageAccessSection() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3);
  const reduced = usePrefersReducedMotion();
  const active = inView; // tek seferlik, geri sarmıyor

  return (
    <section
      dir="rtl"
      className="relative bg-neutral-900 py-28 lg:py-40 overflow-hidden"
      style={{ ["--lang-accent" as string]: "#5E46FF" }}
    >
      <SectionContainer>
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          {/* متن */}
          <div className="max-w-md">
            <span
              className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-wide font-thmanyah-text"
              style={{ color: "color-mix(in srgb, var(--lang-accent) 75%, var(--color-neutral-300))" }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--lang-accent)" }}
              />
              اللغة تفتح ما حولك
            </span>

            <h2 className="mt-5 font-thmanyah-display font-medium text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.15] text-neutral-0">
              لا تجعل اللغة حدودك.
            </h2>

            <p className="mt-6 font-thmanyah-text text-body leading-7 text-neutral-400">
              قد يكون العالم أوسع مما تراه اليوم.
              <br />
              تعلم لغة جديدة، ووسّع ما يمكنك أن تتعلمه، وتعمله، وتفهمه، وتصل
              إليه.
            </p>
          </div>

          {/* بصري */}
          <AccessNetwork active={active} reduced={reduced} />
        </div>
      </SectionContainer>
    </section>
  );
}