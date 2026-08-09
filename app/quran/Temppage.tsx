"use client";

/**
 * Rawi Academy — Quran Experience Page (Fourth Pass — "اقرأ")
 *
 * This is not an iteration on the previous pass. The hero, the section
 * language, and the animation architecture are rebuilt from a blank
 * canvas, per the brief: "throw away the current hero, do not design a
 * hero section, design an opening scene."
 *
 * THE OPENING SCENE
 * ──────────────────
 * The first word ever revealed of the Quran was a command: اقرأ — "Read."
 * That is the literal subject of this hero, not a metaphor bolted onto a
 * generic layout. The scene is one continuous, scroll-scrubbed timeline
 * (scroll is treated as a variable from 0→1, not a trigger for a fixed
 * autoplay clip — brief §18):
 *
 *   a single ink point, alone on a dark field
 *     → radiates into a mathematically real Islamic geometric construction
 *       (point → radial lines → {8/3} star polygon — brief §08)
 *     → the word اقرأ emerges from inside that construction, huge, cropped
 *       by the viewport (brief §06, §11 — typography as architecture,
 *       breaking the rectangle)
 *     → اقرأ dissolves into the full hero verse as the camera pulls back
 *       (brief §05, §10 — depth, not a card)
 *     → the construction compresses into quiet marginalia, paper and ink
 *       texture arrive, and only then does UI (label, copy, CTA) appear
 *
 * Nothing before that point is "hero copy with animation." The user
 * experiences the construction before they read a single word of product
 * copy — brief §02, §03, §24.
 *
 * ONE CONTINUOUS OBJECT (brief §16)
 * ──────────────────────────────────
 * `SEAL_PATH` — the same closed ink-blob path — is what the construction's
 * center point resolves into, what marks a reading position, a
 * memorization state, a completed wird item, and the final ۞ in the
 * closing scene. One shape, five meanings, never re-invented.
 *
 * NO CARDS (brief §12)
 * ──────────────────────
 * Every bordered/shadowed/backdrop-blur panel from the previous pass has
 * been removed. Sections are typographic scenes, full-bleed imagery,
 * dividers, and margin annotations — never boxes. The one glass-panel
 * recipe that remains (hero stat chip) was deliberately cut; see
 * `GenesisHero`.
 *
 * MATERIAL LANGUAGE (brief §21)
 * ────────────────────────────────
 * Paper, ink, light. No gradients-as-decoration, no glow, no neon. Every
 * texture reference in this file is one of those three things.
 *
 * Self-check (brief §25 / prior pass's own checklist):
 *   – Remove the logo → still unmistakably a Quran-specific product: the
 *     construction geometry, the verse choice, and the seal system are
 *     load-bearing, not decorative.
 *   – Remove all animation → the composition still works: giant cropped
 *     typography, full-bleed imagery, asymmetric margins hold on their
 *     own.
 *   – Remove Three.js → the hero still works. The R3F layer
 *     (`GenesisAmbient`) is a faint depth/light layer *behind* the SVG
 *     construction that carries the actual story; it never is the story.
 *
 * Motion stack: GSAP + ScrollTrigger (the entire genesis timeline is one
 * scrubbed GSAP timeline attached to a single ScrollTrigger — brief §18),
 * Motion (micro-interactions, viewport pops, shared-layout underline),
 * React Three Fiber (hero-only ambient depth, optional by design).
 *
 * Requires (peer deps, not bundled here): `gsap`, `motion`, `three`,
 * `@react-three/fiber`, `@react-three/drei`.
 */

import {
  Component,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

import Button from "@/app/src/components/ui/Button";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { SectionLede } from "@/app/src/components/layout/SectionLede";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/*  The signature shape — drawn once, reused everywhere                */
/* ------------------------------------------------------------------ */

const SEAL_PATH =
  "M20 1 C 26 1, 31 6, 34 11 C 38 14, 39 18, 39 20 C 39 22, 38 26, 34 29 " +
  "C 31 34, 26 39, 20 39 C 14 39, 9 34, 6 29 C 2 26, 1 22, 1 20 " +
  "C 1 18, 2 14, 6 11 C 9 6, 14 1, 20 1 Z";

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}

function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setCompact(mq.matches);
    const listener = (e: MediaQueryListEvent) => setCompact(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return compact;
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Reads a CSS custom property token at runtime — never a hardcoded hex. */
function useToken(name: string, fallback = "currentColor") {
  const [value, setValue] = useState(fallback);
  useEffect(() => {
    const read = () =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const v = read();
    if (v) setValue(v);
  }, [name]);
  return value;
}

function toArabicDigits(value: number | string) {
  const map: Record<string, string> = {
    "0": "٠",
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
  };
  return String(value)
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}

/** Verse-marker badge — the recurring seal. Reading position, memorization
 *  state, a finished wird item, and the closing symbol are all this same
 *  shape; only fill and size change with what it means in context. */
function VerseMarker({
  index,
  filled = false,
  size = "md",
  className = "",
}: {
  index: number | string;
  filled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims = { sm: 22, md: 30, lg: 40 }[size];
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center font-thmanyah-text text-micro ${className}`}
      style={{ width: dims, height: dims }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        width={dims}
        height={dims}
        className="absolute inset-0"
      >
        <path
          d={SEAL_PATH}
          fill={filled ? "var(--color-visual-teal)" : "none"}
          fillOpacity={filled ? 0.14 : 0}
          stroke="var(--color-visual-teal)"
          strokeOpacity={filled ? 0.9 : 0.35}
          strokeWidth={1}
        />
      </svg>
      <span
        className={`relative ${filled ? "text-visual-teal" : "text-neutral-400"}`}
      >
        {typeof index === "number" ? toArabicDigits(index) : index}
      </span>
    </span>
  );
}

function PaperGrain({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply"
      style={{ opacity }}
      aria-hidden="true"
    >
      <filter id="rawi-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#rawi-grain)" />
    </svg>
  );
}

/** الخيط الممتد — the thread. A scroll-scrubbed guide line used sparingly
 *  after the hero, as connective tissue between sections rather than the
 *  main event (the genesis construction owns that role now). */
function ScrollThread({
  progressSource,
  className = "",
  strokeOpacity = 0.9,
}: {
  progressSource: React.RefObject<HTMLElement>;
  className?: string;
  strokeOpacity?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!pathRef.current || !progressSource.current || reduced) return;
    const path = pathRef.current;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: progressSource.current,
          start: "top 75%",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [progressSource, reduced]);

  return (
    <svg
      className={`pointer-events-none absolute overflow-visible ${className}`}
      width="2"
      height="100%"
      viewBox="0 0 2 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M1 0 L1 100"
        fill="none"
        stroke="var(--color-visual-teal)"
        strokeOpacity={reduced ? strokeOpacity * 0.4 : strokeOpacity}
        strokeWidth={reduced ? 2 : 1.4}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

class CanvasBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    // Silent — the SVG construction and typography carry the hero's
    // entire narrative, so a WebGL failure degrades gracefully.
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/*  Geometry — a real {8/3} star polygon construction, shared by the    */
/*  hero's SVG genesis sequence and the ambient R3F depth layer.        */
/* ------------------------------------------------------------------ */

function octagonVertices(
  radius: number,
  rotation = 0,
): [number, number, number][] {
  return Array.from({ length: 8 }, (_, i) => {
    const angle = rotation + (i * Math.PI) / 4;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [
      number,
      number,
      number,
    ];
  });
}

/** Classic {8/3} star polygon construction from eight circle-division points. */
function starPolygon(radius: number, rotation = 0): [number, number, number][] {
  const verts = octagonVertices(radius, rotation);
  const path: [number, number, number][] = [];
  for (let i = 0; i <= 8; i++) path.push(verts[(i * 3) % 8]);
  return path;
}

function GeometricLattice({ tone }: { tone: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const outerStar = useMemo(() => starPolygon(2.4), []);
  const outline = useMemo(() => {
    const v = octagonVertices(2.4);
    return [...v, v[0]];
  }, []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.z += 0.0004;
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      state.pointer.y * 0.06,
      0.03,
    );
    g.rotation.y = THREE.MathUtils.lerp(
      g.rotation.y,
      state.pointer.x * 0.08,
      0.03,
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, -2.2]}>
      <Line
        points={outerStar}
        color={tone}
        lineWidth={0.6}
        transparent
        opacity={0.16}
      />
      <Line
        points={outline}
        color={tone}
        lineWidth={0.4}
        transparent
        opacity={0.08}
      />
    </group>
  );
}

function DriftingLight() {
  const light = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    const l = light.current;
    if (!l) return;
    l.position.x = THREE.MathUtils.lerp(
      l.position.x,
      state.pointer.x * 3,
      0.05,
    );
    l.position.y = THREE.MathUtils.lerp(
      l.position.y,
      state.pointer.y * 2,
      0.05,
    );
  });
  return (
    <pointLight
      ref={light}
      position={[0, 0, 3]}
      intensity={2.2}
      distance={9}
      color="white"
    />
  );
}

/** Ambient depth only — ships behind the SVG construction, never carries
 *  the narrative on its own (see CanvasBoundary + self-check in header). */
function GenesisAmbient() {
  const tone = useToken("--color-visual-teal");
  if (tone === "currentColor") return null;
  return (
    <Canvas
      dpr={[1, 1.4]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 6], fov: 34 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <DriftingLight />
      <GeometricLattice tone={tone} />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/*  01 — GENESIS HERO — "اقرأ"                                          */
/*  Not a hero section. One 340vh scroll track pinned at h-screen,      */
/*  driven by a single scrubbed GSAP timeline: point → construction →   */
/*  اقرأ → full verse → pull back to manuscript → UI arrives last.      */
/* ------------------------------------------------------------------ */

function GenesisHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const radialRefs = useRef<(SVGPathElement | null)[]>([]);
  const starRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();
  const compact = useIsCompact();
  const mounted = useMounted();

  const octagon = useMemo(() => octagonVertices(150), []);
  const star = useMemo(() => starPolygon(150), []);
  const starD = useMemo(
    () =>
      `M${star.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" L")}`,
    [star],
  );

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    if (reduced) {
      gsap.set(".genesis-void", { opacity: 0 });
      gsap.set(".genesis-paper", { opacity: 1 });
      gsap.set(".genesis-group", { scale: 0.62 });
      gsap.set(".genesis-word-iqra", { opacity: 0, display: "none" });
      gsap.set(".genesis-verse", { opacity: 1, scale: 1, filter: "blur(0px)" });
      gsap.set(".genesis-markers", { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set(".genesis-ui", { opacity: 1, y: 0, pointerEvents: "auto" });
      return;
    }

    const ctx = gsap.context(() => {
      const radials = radialRefs.current.filter(Boolean) as SVGPathElement[];
      radials.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      if (starRef.current) {
        const len = starRef.current.getTotalLength();
        gsap.set(starRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
      }

      // Interim states start invisible AND non-interactive, so keyboard/AT
      // users can't focus or activate content before it's visually revealed.
      gsap.set(".genesis-verse", {
        opacity: 0,
        scale: 1.5,
        filter: "blur(16px)",
      });
      gsap.set(".genesis-word-iqra", { opacity: 0, scale: 0.82 });
      gsap.set(".genesis-paper", { opacity: 0 });
      gsap.set(".genesis-markers", {
        opacity: 0,
        y: 14,
        pointerEvents: "none",
      });
      gsap.set(".genesis-ui", { opacity: 0, y: 26, pointerEvents: "none" });

      const tl = gsap.timeline({
  scrollTrigger: {
    trigger: trackRef.current,
    start: "top bottom",   // önce: "top top" — artık section viewport'un altından görünür görünmez tetikleniyor
    end: "bottom bottom",
    scrub: 0.6,
  },
});

      // 0 → 1 — the point, alone, breathing.
      tl.to(".genesis-point", { scale: 1.35, duration: 1 }, 0);

      // 1 → 2.9 — construction radiates outward from the point.
      tl.to(
        radials,
        {
          strokeDashoffset: 0,
          stagger: 0.11,
          duration: 1.6,
          ease: "power1.inOut",
        },
        1,
      );

      // 2.8 → 4 — the star polygon connects the points.
      if (starRef.current) {
        tl.to(
          starRef.current,
          { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut" },
          2.8,
        );
      }

      // 3.6 → 4.8 — اقرأ emerges from inside the construction.
      tl.to(
        ".genesis-word-iqra",
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        3.6,
      );

      // 5 → 6.9 — اقرأ dissolves as the full verse takes over.
      tl.to(
        ".genesis-word-iqra",
        { opacity: 0, scale: 1.1, duration: 1, ease: "power1.in" },
        5,
      );
      tl.to(
        ".genesis-verse",
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power2.out",
        },
        5.5,
      );

      // 6 → 8 — the camera pulls back: construction compresses, paper and
      // ink arrive, marginalia settle in.
      tl.to(
        ".genesis-group",
        { scale: 0.6, duration: 1.9, ease: "power2.inOut" },
        6,
      );
      tl.to(".genesis-void", { opacity: 0, duration: 1.6 }, 6);
      tl.to(".genesis-paper", { opacity: 1, duration: 1.8 }, 6.2);
      tl.to(
        ".genesis-markers",
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 1, stagger: 0.08 },
        7.1,
      );

      // 8 → 10 — UI arrives last, once the scene has fully resolved.
      tl.to(
        ".genesis-ui",
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 1.2,
          ease: "power2.out",
        },
        8,
      );
    }, trackRef);

    return () => ctx.revert();
  }, [reduced]);

  // Shorter scroll commitment on compact/mobile viewports — the full
  // cinematic build is a lot to demand via touch scroll.
  const trackHeight = reduced ? "100svh" : compact ? "220vh" : "340vh";

  return (
    <section
      ref={trackRef}
      dir="rtl"
      className="relative bg-neutral-900"
      style={{ height: trackHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="genesis-void absolute inset-0 bg-neutral-900" />

        <div className="genesis-paper absolute inset-0 opacity-100">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/backgrounds/bg-19.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, var(--color-neutral-0) 0%, rgba(255,255,255,0.5) 45%, var(--color-neutral-0) 100%)",
            }}
          />
          <PaperGrain opacity={0.05} />
        </div>

        {mounted && !compact && !reduced && (
          <div className="absolute inset-0">
            <CanvasBoundary>
              <GenesisAmbient />
            </CanvasBoundary>
          </div>
        )}

        <div className="genesis-group absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="-200 -200 400 400"
            width="min(88vw, 620px)"
            height="min(88vw, 620px)"
            className="overflow-visible"
            aria-hidden="true"
          >
            <circle
              className="genesis-point"
              cx="0"
              cy="0"
              r="3"
              fill="var(--color-visual-teal)"
            />
            {octagon.map((v, i) => (
              <path
                key={i}
                ref={(el) => {
                  radialRefs.current[i] = el;
                }}
                d={`M0 0 L${v[0].toFixed(2)} ${v[1].toFixed(2)}`}
                stroke="var(--color-visual-teal)"
                strokeWidth={1}
                strokeOpacity={0.5}
                fill="none"
              />
            ))}
            <path
              ref={starRef}
              d={starD}
              stroke="var(--color-visual-teal)"
              strokeWidth={1.1}
              strokeOpacity={0.75}
              fill="none"
            />
          </svg>

          <p
            aria-hidden="true"
            className="genesis-word-iqra absolute select-none whitespace-nowrap font-thmanyah-display leading-none text-neutral-0"
            style={{ fontSize: "clamp(4rem, 22vw, 13rem)" }}
          >
            اقرأ
          </p>
        </div>

        {/* Screen-reader/SEO heading — the animated verse below is decorative,
            this is the real semantic h1 for the page. */}
        <h1 className="sr-only">
          راوي أكاديمية — تعلّم القرآن الكريم وتلاوته وحفظه ومراجعته
        </h1>

        <div
          aria-hidden="true"
          className="genesis-verse pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center opacity-100"
        >
          <p
            className="mx-auto font-thmanyah-display leading-[1.15] text-neutral-900"
            style={{ fontSize: "clamp(2.4rem, 8vw, 6.5rem)" }}
          >
            وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
          </p>
        </div>

        <div className="genesis-markers absolute bottom-32 left-1/2 flex -translate-x-1/2 items-center gap-4 md:bottom-40 opacity-100">
          {[1, 2, 3, 4, 5].map((n) => (
            <VerseMarker key={n} index={n} filled={n === 1} size="sm" />
          ))}
        </div>

        <div className="genesis-ui absolute inset-x-0 bottom-10 flex flex-col items-center gap-6 px-6 text-center md:bottom-14 opacity-100">
          <p className="font-thmanyah-text text-caption uppercase tracking-[0.24em] text-visual-teal">
            راوي أكاديمية — القرآن الكريم
          </p>
          <p className="max-w-md font-thmanyah-text text-body leading-relaxed text-neutral-600">
            مساحة هادئة لتلاوة القرآن وحفظه ومراجعته وتدبّره، خطوة تلو أخرى، بلا
            استعجال.
          </p>
          <Button href="/quran/start" variant="primary" size="lg">
            ابدأ رحلتك
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const JOURNEY_STAGES = [
  {
    id: "tilawah",
    number: 1,
    term: "التلاوة",
    title: "أول لقاء بالنص",
    description:
      "الصوت قبل المعنى. تبدأ العلاقة بالقرآن من النطق الصحيح، وترتيل الآية كما نزلت، بلا استعجال.",
  },
  {
    id: "tajwid",
    number: 2,
    term: "التجويد",
    title: "ضبط مخارج الحروف",
    description:
      "كل حرف له موضعه من الفم والحلق. حين يستقر النطق، يصبح للتلاوة إيقاع لا يتغيّر من قراءة لأخرى.",
  },
  {
    id: "hifz",
    number: 3,
    term: "الحفظ",
    title: "الآية تسكن الذاكرة",
    description:
      "تكرار محسوب، لا حفظ عشوائي. الآيات تُبنى فوق بعضها كما تُبنى صفحات المصحف، صفحة إثر صفحة.",
  },
  {
    id: "muraja",
    number: 4,
    term: "المراجعة",
    title: "ما حُفظ لا يُترك",
    description:
      "الحفظ بلا مراجعة يتلاشى. هذه هي الحلقة التي تُبقي كل ما سبق حاضرًا، لا ذكرى بعيدة.",
  },
  {
    id: "tadabbur",
    number: 5,
    term: "التدبر",
    title: "المعنى الذي يبقى",
    description:
      "في النهاية، القرآن ليس نصًا يُحفظ فحسب، بل معنى يُعاش. هنا تكتمل الرحلة، ثم تبدأ من جديد.",
  },
] as const;

type VerseState = "memorized" | "reviewing" | "needs-work" | "not-started";

const MEMORIZATION_LEGEND: { state: VerseState; label: string }[] = [
  { state: "memorized", label: "محفوظ" },
  { state: "reviewing", label: "قيد المراجعة" },
  { state: "needs-work", label: "يحتاج تثبيتًا" },
];

const MEMORIZATION_MAP: { surah: string; verses: VerseState[] }[] = [
  { surah: "الفاتحة", verses: Array(7).fill("memorized") },
  {
    surah: "البقرة ١–٢٠",
    verses: [
      "memorized",
      "memorized",
      "memorized",
      "memorized",
      "memorized",
      "memorized",
      "reviewing",
      "reviewing",
      "memorized",
      "memorized",
      "needs-work",
      "reviewing",
      "memorized",
      "memorized",
      "reviewing",
      "memorized",
      "needs-work",
      "memorized",
      "reviewing",
      "memorized",
    ],
  },
  {
    surah: "البقرة ٢١–٤٠",
    verses: [
      "reviewing",
      "not-started",
      "not-started",
      "reviewing",
      "not-started",
      "needs-work",
      "not-started",
      "not-started",
      "reviewing",
      "not-started",
      "not-started",
      "not-started",
      "not-started",
      "not-started",
      "not-started",
      "not-started",
      "not-started",
      "not-started",
      "not-started",
      "not-started",
    ],
  },
];

const TAJWEED_LETTERS = [
  {
    letter: "ء",
    name: "الهمزة",
    makhraj: "أقصى الحلق",
    description:
      "تخرج من أقصى الحلق، وهي أبعد الحروف مخرجًا. يُنطق بها بانطلاقة الصوت من الحنجرة قبل استقراره.",
  },
  {
    letter: "ق",
    name: "القاف",
    makhraj: "أقصى اللسان وما يليه من الحنك الأعلى",
    description:
      "تلتقي أقصى اللسان بأقصى الحنك، فيتولّد صوت مفخّم مستعلٍ يميّزها عن الكاف القريبة منها مخرجًا.",
  },
  {
    letter: "ط",
    name: "الطاء",
    makhraj: "طرف اللسان وأصول الثنايا العليا",
    description:
      "من الحروف المطبقة المستعلية؛ يرتفع وسط اللسان نحو الحنك فيكسبها التفخيم المميز لها عن التاء.",
  },
  {
    letter: "ع",
    name: "العين",
    makhraj: "وسط الحلق",
    description:
      "تخرج من وسط الحلق، بين مخرج الهمزة والحاء وبين مخرج الغين والخاء، بصوت مستقر لا احتكاك فيه.",
  },
  {
    letter: "ل",
    name: "اللام",
    makhraj: "حافة اللسان مع ما يحاذيها من الحنك الأعلى",
    description:
      "تخرج من حافة اللسان بعد مخرج الضاد، وتمتد من أول حافة اللسان إلى منتهى طرفه تقريبًا.",
  },
  {
    letter: "ر",
    name: "الراء",
    makhraj: "طرف اللسان قريبًا من مخرج النون",
    description:
      "تخرج من طرف اللسان مع ما يحاذيه من الحنك الأعلى، وفيها صفة التكرير التي تُضبط فلا تُبالَغ فيها.",
  },
] as const;

const DAILY_REVIEW_ITEMS = [
  { label: "الفاتحة", status: "done" as const, detail: "أُنجزت اليوم" },
  { label: "البقرة ١–١٠", status: "done" as const, detail: "أُنجزت اليوم" },
  {
    label: "البقرة ١١–٢٠",
    status: "in-progress" as const,
    detail: "قيد المراجعة",
  },
  { label: "البقرة ٢١–٣٠", status: "upcoming" as const, detail: "بعد ٣ ساعات" },
];

const TEACHERS = [
  {
    name: "الشيخ يوسف الحمدان",
    focus: "إجازة برواية حفص عن عاصم",
    years: "١٤ سنة تدريس",
    quote: "الإسناد ليس شهادة تُعلَّق، بل أمانة تُروى للطالب كما رُويت لي.",
    featured: true,
  },
  {
    name: "أ. مريم القحطاني",
    focus: "تحفيظ الأطفال",
    years: "٩ سنوات",
    quote: "",
  },
  {
    name: "الشيخ عبد الله الفارسي",
    focus: "التجويد وأحكام التلاوة",
    years: "١١ سنة",
    quote: "",
  },
  {
    name: "أ. هدى الشمري",
    focus: "التفسير الميسّر",
    years: "٧ سنوات",
    quote: "",
  },
];

const PROGRESS_MILESTONES = [
  { date: "محرم ١٤٤٦", label: "بداية الرحلة", detail: "حفظ سورة الفاتحة" },
  {
    date: "صفر ١٤٤٦",
    label: "١٠ آيات ثابتة",
    detail: "البقرة ١–١٠ دون خطأ لثلاث مراجعات",
  },
  {
    date: "ربيع الأول ١٤٤٦",
    label: "أول جزء مبدوء",
    detail: "الانتقال إلى الحفظ اليومي المنتظم",
  },
  {
    date: "اليوم",
    label: "٤٧ يومًا متتاليًا من المراجعة",
    detail: "دون انقطاع",
  },
];

/* ------------------------------------------------------------------ */
/*  02 — الرحلة (Journey) — no card. A giant watermark term fills the   */
/*  sticky viewport; a live readout sits in its margin, un-boxed.       */
/* ------------------------------------------------------------------ */

function MushafPreview() {
  const [progress] = useState(62);
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-thmanyah-text text-caption text-neutral-500">
          سورة البقرة
        </span>
        <span
          dir="ltr"
          className="font-thmanyah-text text-micro text-neutral-400"
        >
          {progress}%
        </span>
      </div>
      <p className="mt-4 font-thmanyah-display text-h3-sm leading-[2.1] text-neutral-900">
        اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ{" "}
        <VerseMarker
          index={255}
          filled
          size="sm"
          className="mx-1 align-middle"
        />{" "}
        لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ
      </p>
      <div className="mt-6 h-[2px] w-full rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-visual-teal transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function JourneySection() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!rootRef.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".journey-step").forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  const stage = JOURNEY_STAGES[active];

  return (
    <section
      ref={rootRef}
      dir="rtl"
      className="relative bg-neutral-0 py-24 md:py-40"
    >
      <ScrollThread
        progressSource={rootRef}
        className="right-6 top-0 hidden h-full md:block"
      />
      <SectionContainer>
        <SectionLede
          lead="الرحلة"
          sub="خمس محطات على خط واحد"
          body="كل محطة تبني على ما قبلها. لا يمكن إتقان التدبر دون تلاوة سليمة، ولا يثبت الحفظ دون مراجعة."
        />
      </SectionContainer>

      <div className="relative mt-16 grid grid-cols-1 md:grid-cols-2">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={stage.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 0.07, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="pointer-events-none select-none whitespace-nowrap font-thmanyah-display text-neutral-900"
              style={{ fontSize: "26vw" }}
              aria-hidden="true"
            >
              {stage.term}
            </motion.p>
          </AnimatePresence>

          <div className="pointer-events-auto absolute bottom-24 right-6 max-w-xs text-right md:right-12">
            <AnimatePresence mode="wait">
              {active === 0 ? (
                <motion.div
                  key="mushaf"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <MushafPreview />
                </motion.div>
              ) : (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <VerseMarker index={stage.number} filled size="md" />
                  <h3 className="mt-4 font-thmanyah-display text-h2-sm text-neutral-900">
                    {stage.term}
                  </h3>
                  <p className="mt-3 font-thmanyah-text text-body leading-relaxed text-neutral-600">
                    {stage.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-6 flex items-center gap-2">
              {JOURNEY_STAGES.map((s, i) => (
                <span
                  key={s.id}
                  className="h-[2px] flex-1 rounded-full transition-colors duration-500"
                  style={{
                    backgroundColor:
                      i <= active
                        ? "var(--color-visual-teal)"
                        : "var(--color-neutral-200)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-24 px-6 md:gap-40 md:px-10">
          {JOURNEY_STAGES.map((s, i) => (
            <div
              key={s.id}
              className="journey-step flex min-h-[50vh] flex-col justify-center"
            >
              <span className="font-thmanyah-text text-micro text-neutral-400">
                {toArabicDigits(i + 1)}
              </span>
              <h4 className="mt-3 font-thmanyah-display text-h3 text-neutral-900">
                {s.title}
              </h4>
              <p className="mt-3 max-w-md font-thmanyah-text text-body text-neutral-600">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  03 — الحفظ (Memorization) — accumulation, not a progress bar and    */
/*  not a bordered grid. Verses sit on a gentle hand-drawn curve.       */
/* ------------------------------------------------------------------ */

const STATE_STYLE: Record<VerseState, { fill: string; label: string }> = {
  memorized: { fill: "var(--color-visual-teal)", label: "محفوظ" },
  reviewing: { fill: "var(--color-primary)", label: "قيد المراجعة" },
  "needs-work": { fill: "var(--color-orange)", label: "يحتاج تثبيتًا" },
  "not-started": { fill: "var(--color-neutral-200)", label: "لم يبدأ بعد" },
};

function MemorizationSection() {
  const [hovered, setHovered] = useState<{
    surah: string;
    index: number;
    state: VerseState;
  } | null>(null);

  return (
    <section dir="rtl" className="relative bg-neutral-50 py-24 md:py-32">
      <SectionContainer>
        <SectionLede
          lead="الحفظ"
          sub="تراكم، لا شريط تقدّم"
          body="كل نقطة آية تراكمت مع سابقتها. مرّر المؤشر فوق أي نقطة لترى حالتها."
        />
      </SectionContainer>

      <div className="mt-16 flex flex-col gap-16 px-6 md:px-10">
        {MEMORIZATION_MAP.map((group, gi) => {
          const width = Math.max(group.verses.length * 26, 200);
          return (
            <div key={group.surah}>
              <p className="font-thmanyah-text text-caption text-neutral-500">
                {group.surah}
              </p>
              <div className="mt-4 overflow-x-auto">
                <svg
                  width={width}
                  height={64}
                  viewBox={`0 0 ${width} 64`}
                  className="max-w-full"
                >
                  {group.verses.map((state, i) => {
                    const x = 13 + i * 26;
                    const y = 32 + Math.sin(i * 0.9 + gi) * 14;
                    const isHovered =
                      hovered?.surah === group.surah && hovered.index === i + 1;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={isHovered ? 7 : 5}
                        fill={STATE_STYLE[state].fill}
                        style={{ cursor: "pointer", transition: "r 0.2s ease" }}
                        tabIndex={0}
                        role="button"
                        aria-label={`آية ${i + 1} — ${STATE_STYLE[state].label}`}
                        onMouseEnter={() =>
                          setHovered({
                            surah: group.surah,
                            index: i + 1,
                            state,
                          })
                        }
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() =>
                          setHovered({
                            surah: group.surah,
                            index: i + 1,
                            state,
                          })
                        }
                        onBlur={() => setHovered(null)}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          );
        })}

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-neutral-200 pt-8">
          {MEMORIZATION_LEGEND.map((item) => (
            <div key={item.state} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: STATE_STYLE[item.state].fill }}
              />
              <span className="font-thmanyah-text text-caption text-neutral-600">
                {item.label}
              </span>
            </div>
          ))}
          <div className="min-h-[1.25rem]">
            <AnimatePresence mode="wait">
              {hovered && (
                <motion.span
                  key={`${hovered.surah}-${hovered.index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-thmanyah-text text-caption text-visual-teal"
                >
                  {hovered.surah} — آية {toArabicDigits(hovered.index)} —{" "}
                  {STATE_STYLE[hovered.state].label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  04 — التجويد (Tajweed) — the letters are the visual object; the     */
/*  selection is an ink underline sliding between them.                 */
/* ------------------------------------------------------------------ */

function TajweedSection() {
  const [selected, setSelected] = useState(0);
  const active = TAJWEED_LETTERS[selected];

  return (
    <section
      dir="rtl"
      className="relative bg-neutral-900 py-24 text-neutral-0 md:py-32"
    >
      <SectionContainer>
        <SectionLede
          lead="التجويد"
          sub="مَخَارِجُ الْحُرُوف"
          body="اختر حرفًا لترى موضعه من النطق. اللغة نفسها هي المادة البصرية هنا، بلا أيقونات."
        />

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="flex flex-wrap gap-6">
            {TAJWEED_LETTERS.map((item, i) => (
              <div key={item.letter} className="relative pb-3">
                <motion.button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={selected === i}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  animate={{
                    color:
                      selected === i
                        ? "var(--color-visual-teal)"
                        : "var(--color-neutral-500)",
                  }}
                  transition={{ duration: 0.25 }}
                  className="font-thmanyah-display leading-none"
                  style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)" }}
                >
                  {item.letter}
                </motion.button>
                {selected === i && (
                  <motion.span
                    layoutId="tajweed-ink-underline"
                    className="absolute inset-x-1 bottom-0 h-[2px] bg-visual-teal"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="border-r border-neutral-700 pr-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.letter}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="font-thmanyah-text text-caption uppercase tracking-[0.18em] text-visual-teal">
                  {active.name}
                </p>
                <p className="mt-3 font-thmanyah-display text-h3 text-neutral-0">
                  {active.makhraj}
                </p>
                <p className="mt-4 max-w-md font-thmanyah-text text-body leading-relaxed text-neutral-400">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  05 — يومياتك (Daily Practice) — a divided list and a margin note,   */
/*  not a glass card grid.                                              */
/* ------------------------------------------------------------------ */

function DailyPracticeSection() {
  return (
    <section dir="rtl" className="relative bg-neutral-50 py-24 md:py-32">
      <SectionContainer>
        <SectionLede
          lead="المتابعة"
          sub="وردك اليومي"
          body="لا حاجة لتذكّر ما بقي. الورد يعرض نفسه، جاهزًا كل صباح، ويتكيّف مع أدائك."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px]">
          <ul className="flex flex-col divide-y divide-neutral-200">
            {DAILY_REVIEW_ITEMS.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-4 py-5"
              >
                <div className="flex items-center gap-4">
                  <VerseMarker
                    index={item.status === "done" ? "✓" : "•"}
                    filled={item.status === "done"}
                    size="md"
                  />
                  <span className="font-thmanyah-display text-h3-sm text-neutral-900">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`font-thmanyah-text text-caption ${item.status === "upcoming" ? "text-neutral-400" : "text-visual-teal"}`}
                >
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-r-2 border-visual-teal/30 pr-6">
            <p className="font-thmanyah-text text-caption uppercase tracking-[0.18em] text-visual-teal">
              مراجعتك اليوم
            </p>
            <p className="mt-4 font-thmanyah-display text-h3-sm leading-relaxed text-neutral-900">
              البقرة، آية ١٧–١٩ تحتاج مراجعة إضافية.
            </p>
            <p className="mt-3 font-thmanyah-text text-caption text-neutral-500">
              أُخطئ فيها مرتين خلال الأسبوع الماضي — أُضيفت إلى ورد الغد. الرحلة
              تتكيّف معك، لا العكس.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  06 — المعلمون والحلقات — full-bleed portrait, no card grid.          */
/* ------------------------------------------------------------------ */

function TeachersSection() {
  const featured = TEACHERS.find((t) => t.featured)!;
  const rest = TEACHERS.filter((t) => !t.featured);

  return (
    <section dir="rtl" className="relative bg-neutral-0 py-24 md:py-32">
      <SectionContainer>
        <SectionLede lead="المعلمون" sub="إسناد، لا شبكة صور" />
      </SectionContainer>

      <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2">
        <div
          className="aspect-[16/7] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/backgrounds/bg-24.png')" }}
        />
      </div>

      <SectionContainer>
        <p
          className="mx-auto mt-12 max-w-3xl font-thmanyah-display leading-[1.6] text-neutral-900"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}
        >
          «{featured.quote}»
        </p>
        <div className="mt-6 flex items-center gap-3">
          <VerseMarker index="؟" size="sm" />
          <div>
            <p className="font-thmanyah-text text-body text-neutral-900">
              {featured.name}
            </p>
            <p className="font-thmanyah-text text-caption text-neutral-500">
              {featured.focus} — {featured.years}
            </p>
          </div>
        </div>

        <ul className="mt-20 flex flex-col gap-8 md:flex-row md:gap-16">
          {rest.map((t) => (
            <li key={t.name}>
              <p className="font-thmanyah-display text-h3-sm text-neutral-900">
                {t.name}
              </p>
              <p className="mt-1 font-thmanyah-text text-caption text-neutral-500">
                {t.focus}
              </p>
              <p className="mt-1 font-thmanyah-text text-micro text-neutral-400">
                {t.years}
              </p>
            </li>
          ))}
        </ul>

        <div className="relative mt-16 overflow-hidden rounded-[6px] bg-neutral-900">
          <div
            className="aspect-video w-full bg-cover bg-center opacity-80"
            style={{ backgroundImage: "url('/backgrounds/bg-25.png')" }}
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[4px] border border-white/20 bg-black/40 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-visual-teal" />
              <span className="font-thmanyah-text text-caption text-neutral-0">
                حلقة البقرة — مباشر الآن
              </span>
            </div>
            <span className="font-thmanyah-text text-micro text-neutral-300">
              {featured.name}
            </span>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  07 — المجتمع (Community)                                           */
/* ------------------------------------------------------------------ */

function CommunitySection() {
  return (
    <section dir="rtl" className="relative bg-neutral-50 py-20 md:py-24">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-thmanyah-text text-caption uppercase tracking-[0.18em] text-visual-teal">
              حلقة اليوم
            </p>
            <h3 className="mt-4 font-thmanyah-display text-h2-sm text-neutral-900">
              لست وحدك في المراجعة
            </h3>
            <p className="mt-4 max-w-md font-thmanyah-text text-body leading-relaxed text-neutral-600">
              مراجعة جماعية أسبوعية، بلا ضغط تنافسي. الهدف الثبات لا الترتيب.
            </p>
          </div>

          <ul className="flex flex-col gap-4 font-thmanyah-text text-body text-neutral-700">
            <li className="flex items-center gap-3">
              <span className="h-px w-8 bg-visual-teal" />
              ١٢ طالبًا يراجعون الآن سورة البقرة
            </li>
            <li className="flex items-center gap-3">
              <span className="h-px w-8 bg-visual-teal" />
              حلقة المراجعة الجماعية — كل خميس، بعد المغرب
            </li>
            <li className="flex items-center gap-3">
              <span className="h-px w-8 bg-visual-teal" />
              يمكن الانضمام أو المتابعة الفردية دون التزام
            </li>
          </ul>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  08 — الخاتمة (Closing Arc) — the construction that opened the hero   */
/*  resolves here: the same seal shape completes the line it started.   */
/* ------------------------------------------------------------------ */

function ClosingArc() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!rootRef.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".closing-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "bottom 75%",
            scrub: true,
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} dir="rtl" className="relative bg-neutral-0">
      {/* Beat 1 — continuity */}
      <div className="py-24 md:py-32">
        <SectionContainer>
          <h3 className="max-w-xl font-thmanyah-display text-h2-sm leading-[1.5] text-neutral-900">
            كل يوم صفحة. كل يوم خطوة. وكل خطوة تقرّبك.
          </h3>

          <div className="relative mt-16 pr-8">
            <div className="absolute right-[3px] top-0 h-full w-px bg-neutral-200" />
            <div className="closing-line absolute right-[3px] top-0 h-full w-px bg-visual-teal" />
            <ul className="flex flex-col gap-12">
              {PROGRESS_MILESTONES.map((m) => (
                <li key={m.label} className="relative">
                  <span className="absolute right-[-30px] top-1.5 h-1.5 w-1.5 rounded-full bg-visual-teal" />
                  <p className="font-thmanyah-text text-micro text-neutral-400">
                    {m.date}
                  </p>
                  <p className="mt-1 font-thmanyah-display text-h3-sm text-neutral-900">
                    {m.label}
                  </p>
                  <p className="mt-1 font-thmanyah-text text-caption text-neutral-500">
                    {m.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </SectionContainer>
      </div>

      {/* Beat 2 — a breathing pause, and the construction's resolution.
          Same seal, same path as the hero's genesis point — the origin,
          arrived at again. */}
      <div className="relative flex min-h-[60vh] items-center justify-center bg-neutral-50 py-28">
        <PaperGrain opacity={0.05} />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <VerseMarker index="۞" size="lg" filled className="mx-auto" />
          </motion.div>
          <p className="mt-8 font-thmanyah-display text-h2 leading-[1.9] text-neutral-900 md:text-[38px]">
            وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ
            لِلْمُؤْمِنِينَ
          </p>
          <p className="mt-6 font-thmanyah-text text-caption text-neutral-500">
            سورة الإسراء، الآية ٨٢
          </p>
        </div>
      </div>

      {/* Beat 3 — the invitation */}
      <div className="relative bg-neutral-900 py-28 text-neutral-0 md:py-36">
        <SectionContainer>
          <div className="mx-auto max-w-xl text-center">
            <h3 className="font-thmanyah-display text-h2-sm text-neutral-0">
              ابدأ رحلتك مع القرآن
            </h3>
            <p className="mt-4 font-thmanyah-text text-body text-neutral-400">
              خطوة واحدة قد تغيّر علاقتك بالقرآن.
            </p>
            <div className="mt-10 flex justify-center">
              <Button href="/quran/ابدأ" variant="primary" size="lg">
                ابدأ الآن
              </Button>
            </div>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function QuranExperiencePage() {
  return (
    <main dir="rtl" lang="ar" className="overflow-x-clip bg-neutral-0">
      <GenesisHero />
      <JourneySection />
      <MemorizationSection />
      <TajweedSection />
      <DailyPracticeSection />
      <TeachersSection />
      <CommunitySection />
      <ClosingArc />
    </main>
  );
}
