"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LogoRiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // settle once, don't re-trigger on scroll back up
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="glow-section relative isolate flex min-h-[130vh] items-center justify-center overflow-hidden bg-[#FCFBFF]"
    >
      {/* faint paper-like grain — keeps the white field from reading as a
          flat digital fill. multiply blend so it only ever darkens. */}
      <div
        className="pointer-events-none absolute inset-[-20%] z-[1] opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Three soft, asymmetric ambient light fields, lifted straight from
          the logo's own gradient (deep violet → lavender → cyan). These
          drift continuously — the resting state the scene settles into
          after the entrance below. */}
      <div className="light light-violet pointer-events-none absolute -top-[18%] -right-[8%] z-[1] h-[62vh] w-[62vh] rounded-full blur-[120px]" />
      <div className="light light-lavender pointer-events-none absolute top-[8%] -left-[12%] z-[1] h-[40vh] w-[40vh] rounded-full blur-[110px]" />
      <div className="light light-cyan pointer-events-none absolute -bottom-[16%] left-[10%] z-[1] h-[50vh] w-[50vh] rounded-full blur-[120px]" />

      {/* thin directional light seams — color catching an edge, not a wash.
          fades in with the entrance, then breathes gently forever after. */}
      <div
        className="seams pointer-events-none absolute inset-0 z-[1] transition-opacity duration-[1400ms] ease-out"
        style={{ opacity: visible ? 1 : 0, transitionDelay: "400ms" }}
      >
        <div className="absolute left-[10%] top-0 h-full w-px rotate-[8deg] bg-gradient-to-b from-transparent via-[#7C3AED]/20 to-transparent" />
        <div className="absolute right-[16%] top-0 h-full w-px rotate-[-6deg] bg-gradient-to-b from-transparent via-[#22D3EE]/20 to-transparent" />
      </div>

      {/* ============ THE ENTRANCE ============
          A deliberate, staged sequence rather than everything arriving at
          once:
            1) a bright, obvious flash + a small radiating flare — the
               unmistakable "something just happened" beat
            2) that flare hands off into the sustained ambient rim-glow
            3) only once the light has established itself does the logo
               rise — arriving into a scene that already has presence,
               not appearing simultaneously with it
          Everything below is mounted only once `visible` is true, so each
          one-shot keyframe animation plays exactly once, on cue. */}

      {visible && (
        <div
          className="flash-overlay pointer-events-none absolute inset-0 z-[5]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(167,139,250,0.25) 35%, rgba(255,255,255,0) 65%)",
          }}
        />
      )}

      <div className="relative z-10 flex items-center justify-center">
        {visible && (
          <>
            {/* the bright flare core */}
            <div className="flare-core pointer-events-none absolute h-[120px] w-[120px] rounded-full blur-[18px]" />
            {/* radiating rays, spun as a group for a touch of motion */}
            <div className="flare-rays pointer-events-none absolute h-[420px] w-[420px]">
              {[0, 30, 60, 90, 120, 150].map((deg) => (
                <div
                  key={deg}
                  className="flare-ray absolute left-1/2 top-1/2 h-[210px] w-px origin-top"
                  style={{ transform: `translate(-50%, 0) rotate(${deg}deg)` }}
                />
              ))}
            </div>
          </>
        )}

        {/* sustained rim-light halo behind the logo — fades in slightly
            after the flare, taking over as the ambient glow, then breathes
            quietly forever. Split into a reveal wrapper (state-driven) and
            an inner always-animating element so the entrance transition and
            the continuous breathing animation don't fight over the same
            properties. */}
        <div
          className="absolute h-[380px] w-[380px] transition-[opacity,transform] duration-[1400ms] ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.7)",
            transitionDelay: "350ms",
          }}
        >
          <div className="rim-glow h-full w-full rounded-full blur-[75px]" />
        </div>

        {/* the logo itself — deliberately delayed well behind the light,
            so it never reads as "everything popping in together" */}
        <div
          className="relative transition-all ease-out"
          style={{
            transitionDuration: "1200ms",
            transitionDelay: "950ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(72px)",
          }}
        >
          <Image
            src="/logos/cropped_logo.png"
            alt="راوي"
            width={800}
            height={800}
            className="h-auto w-[160px] object-contain md:w-[800px]"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        /* ---- ambient drift (continuous, resting-state) ---- */
        .light-violet {
          background: radial-gradient(
            circle,
            rgba(124, 58, 237, 0.28) 0%,
            rgba(124, 58, 237, 0) 70%
          );
          animation: driftA 17s ease-in-out infinite;
        }
        .light-lavender {
          background: radial-gradient(
            circle,
            rgba(183, 156, 255, 0.26) 0%,
            rgba(183, 156, 255, 0) 70%
          );
          animation: driftB 21s ease-in-out infinite;
        }
        .light-cyan {
          background: radial-gradient(
            circle,
            rgba(34, 211, 238, 0.24) 0%,
            rgba(34, 211, 238, 0) 70%
          );
          animation: driftC 19s ease-in-out infinite;
        }
        @keyframes driftA {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 40px) scale(1.08);
          }
        }
        @keyframes driftB {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(24px, -26px) scale(1.06);
          }
        }
        @keyframes driftC {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-22px, -34px) scale(1.1);
          }
        }

        .seams > div {
          animation: seamShimmer 6s ease-in-out infinite;
        }
        .seams > div:last-child {
          animation-delay: 1.4s;
        }
        @keyframes seamShimmer {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        /* ---- one-shot entrance beats (mounted once, play once) ---- */
        .flash-overlay {
          animation: flashPulse 900ms ease-out forwards;
        }
        @keyframes flashPulse {
          0% {
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .flare-core {
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(167, 139, 250, 0.85) 30%,
            rgba(124, 58, 237, 0.5) 55%,
            rgba(34, 211, 238, 0.3) 75%,
            rgba(34, 211, 238, 0) 88%
          );
          animation: flareCore 1200ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes flareCore {
          0% {
            opacity: 0;
            transform: scale(0.15);
          }
          30% {
            opacity: 1;
            transform: scale(1.5);
          }
          55% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 0;
            transform: scale(1.3);
          }
        }

        .flare-rays {
          animation: flareRaysSpin 1400ms ease-out forwards;
        }
        @keyframes flareRaysSpin {
          0% {
            opacity: 0;
            transform: rotate(0deg);
          }
          25% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: rotate(22deg);
          }
        }
        .flare-ray {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.9),
            rgba(167, 139, 250, 0.4) 35%,
            rgba(167, 139, 250, 0) 100%
          );
        }

        .rim-glow {
          background: radial-gradient(
            circle,
            rgba(167, 139, 250, 0.55) 0%,
            rgba(34, 211, 238, 0.3) 55%,
            rgba(34, 211, 238, 0) 75%
          );
          animation: rimBreathe 6.5s ease-in-out infinite;
        }
        @keyframes rimBreathe {
          0%,
          100% {
            opacity: 0.85;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.06);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .light-violet,
          .light-lavender,
          .light-cyan,
          .seams > div,
          .flash-overlay,
          .flare-core,
          .flare-rays,
          .rim-glow {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}