"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueeStrip from "../MarqueeStrip";

export const SUBJECTS = [
  {
    id: "quran",
    title: "القرآن",
    description:
      "يبدأ الطالب من حيث هو، لا من حيث يفترض الناس أن يكون. يتدرّج في التلاوة، ثم الحفظ، ثم الفهم، مع متابعةٍ مستمرة تجعل كل خطوةٍ مبنيةً على ما قبلها.",
    color: "var(--color-visual-teal)",
    photo: "/subjects/quran.png",
  },
  {
    id: "code",
    title: "البرمجة",
    description:
      "لا يحتاج الطالب إلى أي خبرةٍ مسبقة. نبدأ معه من الأساس، ثم نبني مهاراته تدريجيًا حتى يصبح قادرًا على تطوير برامج ومشاريع يفهم كل جزءٍ فيها بنفسه.",
    color: "var(--color-primary)",
    photo: "/subjects/code.png",
  },
  {
    id: "lang",
    title: "اللغات",
    description:
      "لا نعتمد على حفظ الكلمات والقواعد وحدها، بل ندرّب الطالب على الفهم والاستماع والمحادثة، حتى تصبح اللغة جزءًا طبيعيًا من تواصله اليومي.",
    color: "var(--color-visual-pink)",
    photo: "/subjects/languages.png",
  },
  {
    id: "math",
    title: "الرياضيات",
    description:
      "كثيرٌ من الطلاب يحفظون طريقة الحل دون أن يفهموا السبب. لذلك يبدأ كل درسٍ بالفكرة، ثم ينتقل إلى التطبيق، حتى يصبح الحل نتيجةً للفهم لا للحفظ.",
    color: "var(--color-orange)",
    photo: "/subjects/math2.png",
  },
] as const;

type Subject = (typeof SUBJECTS)[number];

// --- Breakpoint'ler ---
// STACK_BREAKPOINT altı: mobil — SAF CSS ile statik alt alta, GSAP hiç çalışmaz.
// >= ROW_BREAKPOINT   : masaüstü, 4 kart tek satırda (fan -> satır)
// STACK_BREAKPOINT..ROW_BREAKPOINT : tablet, 2 kart yan yana / 2 satır (fan -> 2x2 grid)
const STACK_BREAKPOINT = 900; // bu değerin altı SAF CSS ile "min-[901px]:hidden" / "max-[900px]:hidden" ile kontrol ediliyor
const ROW_BREAKPOINT = 1160;

const MIN_CARD_W = 220;
const MAX_CARD_W = 330;
const MIN_VW = STACK_BREAKPOINT;
const MAX_VW = 1440;
const BASE_GAP_X = 24;
const BASE_GAP_Y = 32;

type LayoutMode = "row" | "grid";

function getLayoutMode(vw: number): LayoutMode {
  return vw >= ROW_BREAKPOINT ? "row" : "row";
}

function getResponsiveCardWidth(vw: number) {
  const t = Math.min(1, Math.max(0, (vw - MIN_VW) / (MAX_VW - MIN_VW)));
  return MIN_CARD_W + t * (MAX_CARD_W - MIN_CARD_W);
}

const FAN_BASE = [
  { x: 0, y: 0, rotate: -2, scale: 1, zIndex: 40 },
  { x: 72, y: 26, rotate: 4, scale: 0.96, zIndex: 30 },
  { x: 138, y: 56, rotate: -5, scale: 0.92, zIndex: 20 },
  { x: 198, y: 88, rotate: 6, scale: 0.88, zIndex: 10 },
] as const;

const ROW_Y = 660;

function buildFan(ratio: number) {
  return FAN_BASE.map((f) => ({ ...f, x: f.x * ratio, y: f.y * ratio }));
}

function centerShiftFor(
  totalWidth: number,
  containerRect: DOMRect,
  stageRect: DOMRect,
) {
  const rightTarget = containerRect.left + (containerRect.width + totalWidth) / 2;
  return stageRect.right - rightTarget;
}

function buildRow(
  cardW: number,
  gapX: number,
  containerRect: DOMRect,
  stageRect: DOMRect,
) {
  const totalWidth = SUBJECTS.length * cardW + (SUBJECTS.length - 1) * gapX;
  const centerShift = centerShiftFor(totalWidth, containerRect, stageRect);
  return SUBJECTS.map((_, i) => ({
    x: -centerShift - i * (cardW + gapX),
    y: ROW_Y,
    rotate: 0,
  }));
}

function buildGrid(
  cardW: number,
  cardH: number,
  gapX: number,
  gapY: number,
  containerRect: DOMRect,
  stageRect: DOMRect,
) {
  const cols = 2;
  const totalWidth = cols * cardW + (cols - 1) * gapX;
  const centerShift = centerShiftFor(totalWidth, containerRect, stageRect);
  return SUBJECTS.map((_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      x: -centerShift - col * (cardW + gapX),
      y: ROW_Y + row * (cardH + gapY),
      rotate: 0,
    };
  });
}

const MARQUEE_WRAP_END_Y = -20;
const MARQUEE_INNER_END_Y = 740;
const TRIGGER_OFFSET = 100;
const PIN_DISTANCE = 0;
const SNAP_DURATION = 0.6;
const SNAP_EASE = "power3.out";

const CARD_BASE_CLASS =
  "rounded-lg bg-white/10 backdrop-blur-xl border border-white/15 overflow-hidden shadow-[0_40px_80px_-30px_rgba(9,9,11,0.5)]";

function SubjectCardBody({
  subject,
  descRef,
  startHidden,
}: {
  subject: Subject;
  descRef?: (el: HTMLParagraphElement | null) => void;
  startHidden: boolean;
}) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 30%, transparent 55%)",
        }}
      />
      <div className="relative h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(closest-side, color-mix(in srgb, ${subject.color} 20%, transparent), transparent 75%)`,
          }}
        />
        <Image
          src={subject.photo}
          alt={subject.title}
          fill
          className="object-contain object-bottom opacity-90 mix-blend-overlay"
          sizes="280px"
        />
      </div>
      <div className="relative px-7 pb-7 pt-2 bg-neutral-0">
        <span
          className="block w-8 h-px mb-3"
          style={{ backgroundColor: subject.color }}
        />
        <p className="font-thmanyah-display text-h2 text-neutral-900 leading-tight">
          {subject.title}
        </p>
        <p
          ref={descRef}
          hidden={startHidden}
          className="font-thmanyah-display text-h3 text-neutral-700 leading-tight"
        >
          {subject.description}
        </p>
      </div>
    </>
  );
}

// Mobil (<=900px): tamamen statik, GSAP'a hiç bulaşmayan ayrı bir bileşen.
// ref/animasyon YOK — bu yüzden hiçbir JS zamanlama sorunu görsel olarak
// hero'da takılı kalma yaratamaz. Görünürlüğü CSS media query kontrol eder.
function MobileSubjectStack() {
  return (
    <div className="min-[901px]:hidden flex flex-col gap-6 px-4">
      {SUBJECTS.map((subject) => (
        <div
          key={subject.id}
          className={`relative w-full max-w-[380px] mx-auto ${CARD_BASE_CLASS}`}
        >
          <SubjectCardBody subject={subject} startHidden={false} />
        </div>
      ))}
    </div>
  );
}

// Masaüstü/tablet (>900px): mevcut GSAP fan -> satır/grid animasyonu.
function DesktopSubjectStack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const marqueeWrapRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const [layoutMode, setLayoutMode] = useState<LayoutMode>("row");
  const [cardWidth, setCardWidth] = useState(MAX_CARD_W);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const vw = window.innerWidth;
      setLayoutMode(getLayoutMode(vw));
      setCardWidth(getResponsiveCardWidth(vw));
    };
    update();

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(update, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const ratio = cardWidth / MAX_CARD_W;
  const gapX = Math.round(BASE_GAP_X * ratio);
  const gapY = Math.round(BASE_GAP_Y * ratio);
  const stageWidth = Math.round(cardWidth + 180);

  useLayoutEffect(() => {
    // 900px ve altında bu bileşen zaten CSS ile gizli render ediliyor,
    // ama yine de güvenlik için gerçek genişliği burada da kontrol ediyoruz.
    if (typeof window === "undefined" || window.innerWidth <= STACK_BREAKPOINT)
      return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heroSection = stageRef.current?.closest("section");
      const triggerEl = heroSection ?? stageRef.current;

      const contentContainer =
        (stageRef.current?.closest('[class*="mx-auto"]') as HTMLElement | null) ??
        heroSection ??
        stageRef.current;

      const containerRect = contentContainer?.getBoundingClientRect();
      const stageRect = stageRef.current?.getBoundingClientRect();

      const FAN = buildFan(ratio);
      const descEls = descRefs.current.filter(
        (el): el is HTMLParagraphElement => el !== null,
      );

      let ROW: { x: number; y: number; rotate: number }[];

      if (layoutMode === "row") {
        ROW =
          containerRect && stageRect
            ? buildRow(cardWidth, gapX, containerRect, stageRect)
            : SUBJECTS.map((_, i) => ({
                x: -(i * (cardWidth + gapX)),
                y: ROW_Y,
                rotate: 0,
              }));
      } else {
        descEls.forEach((el) => el.removeAttribute("hidden"));
        const heights = cardRefs.current.map(
          (el) => el?.getBoundingClientRect().height ?? 0,
        );
        descEls.forEach((el) => el.setAttribute("hidden", ""));
        const cardH = Math.max(...heights, 0) || 520;

        ROW =
          containerRect && stageRect
            ? buildGrid(cardWidth, cardH, gapX, gapY, containerRect, stageRect)
            : SUBJECTS.map((_, i) => ({
                x: -((i % 2) * (cardWidth + gapX)),
                y: ROW_Y + Math.floor(i / 2) * (cardH + gapY),
                rotate: 0,
              }));
      }

      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top top",
        end: `+=${PIN_DISTANCE}`,
        pin: stageRef.current,
        pinSpacing: true,
      });

      if (marqueeWrapRef.current) {
        gsap.to(marqueeWrapRef.current, {
          y: MARQUEE_WRAP_END_Y,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top top",
            end: `+=${PIN_DISTANCE}`,
            scrub: 0.3,
          },
        });
      }

      const cardsTl = gsap.timeline({
        paused: true,
        defaults: { ease: SNAP_EASE, duration: SNAP_DURATION },
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        cardsTl.fromTo(
          card,
          { x: FAN[i].x, y: FAN[i].y, rotate: FAN[i].rotate, scale: FAN[i].scale },
          { x: ROW[i].x, y: ROW[i].y, rotate: ROW[i].rotate, scale: 1 },
          0,
        );
      });

      if (marqueeInnerRef.current) {
        cardsTl.fromTo(
          marqueeInnerRef.current,
          { y: 0 },
          { y: MARQUEE_INNER_END_Y },
          0,
        );
      }

      if (descEls.length) {
        cardsTl.call(
          () => {
            const isReversed = cardsTl.reversed();
            descEls.forEach((el) => {
              if (isReversed) el.setAttribute("hidden", "");
              else el.removeAttribute("hidden");
            });
          },
          [],
          0.3,
        );
      }

      ScrollTrigger.create({
        trigger: triggerEl,
        start: `top top-=${TRIGGER_OFFSET}`,
        onEnter: () => cardsTl.play(),
        onLeaveBack: () => cardsTl.reverse(),
      });
    }, stageRef);

    return () => ctx.revert();
  }, [cardWidth, gapX, gapY, ratio, layoutMode]);

  return (
    <div className="max-[900px]:hidden">
      <div
        ref={marqueeWrapRef}
        className="absolute -bottom-150 -right-100 w-[200%] h-[1300px] bg-neutral-100 overflow-hidden z-0"
      >
        <div ref={marqueeInnerRef} className="w-full h-full">
          <MarqueeStrip />
        </div>
      </div>
      <div ref={stageRef} className="relative h-[1300px]" style={{ width: stageWidth }}>
        {SUBJECTS.map((subject, i) => (
          <div
            key={subject.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`absolute top-0 right-0 ${CARD_BASE_CLASS}`}
            style={{ zIndex: FAN_BASE[i].zIndex, width: cardWidth }}
          >
            <SubjectCardBody
              subject={subject}
              descRef={(el) => {
                descRefs.current[i] = el;
              }}
              startHidden={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SubjectCardStack() {
  return (
    <div>
      <MobileSubjectStack />
      <DesktopSubjectStack />
    </div>
  );
}