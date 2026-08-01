"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/ui/Button";

const LOGO_SRC = "/logos/cropped_logo.png"; // uploaded logo'yu public/ altına koyup burayı güncelleyin

type Feature = {
  title: string;
  description: string;
  pos: { top: string; left: string };
  from: { x: number; y: number; rotate: number };
};

const features: Feature[] = [
  {
    title: "محتوى متكامل",
    description:
      "كل ما تحتاجه للتعلّم موجود في مكان واحد؛ دروس، تطبيقات، اختبارات، ومواد داعمة دون الحاجة للتنقل بين المصادر.",
    pos: { top: "16%", left: "14%" },
    from: { x: -80, y: -50, rotate: -4 },
  },
  {
    title: "متابعة شخصية",
    description:
      "دعم ومتابعة مستمرة خلال رحلتك التعليمية، مع توجيه عملي يساعدك على تجاوز كل تحدٍ بثقة.",
    pos: { top: "16%", left: "86%" },
    from: { x: 80, y: -50, rotate: 4 },
  },
  {
    title: "تعليم فعال",
    description:
      "أسلوب تعليمي يجمع بين الشرح الواضح، والتطبيق العملي، والتقييم المستمر لضمان فهم أعمق واستيعاب أفضل.",
    pos: { top: "50%", left: "6%" },
    from: { x: -100, y: 0, rotate: -3 },
  },
  {
    title: "دراسة عملية",
    description:
      "مشاريع واقعية تحاكي بيئات العمل، تمنحك خبرة عملية وتحوّل المعرفة إلى مهارة حقيقية.",
    pos: { top: "50%", left: "94%" },
    from: { x: 100, y: 0, rotate: 3 },
  },
  {
    title: "تعلم من الأفضل",
    description:
      "تعلّم على يد نخبة من الخبراء والمدربين ذوي الخبرة العملية في بناء المشاريع والتقنيات الحديثة.",
    pos: { top: "90%", left: "35%" },
    from: { x: -50, y: 80, rotate: -3 },
  },
  {
    title: "دعم الذكاء الأصطناعي",
    description:
      "تقنيات ذكاء اصطناعي صُممت لدعم تعلّمك، تمنحك شرحًا فوريًا، وإجابات دقيقة، وتجربة تعليمية أكثر كفاءة.",
    pos: { top: "84%", left: "74%" },
    from: { x: 50, y: 80, rotate: 3 },
  },
];

// Mobil/tablet blok için tasarım-token tabanlı aksanlar (yeni responsive yapı bunu kullanıyor)
const CARD_ACCENTS = [
  "var(--color-visual-purple)",
  "var(--color-visual-purple)",
  "var(--color-visual-teal)",
  "var(--color-accent-purple)",
  "var(--color-visual-purple)",
  "var(--color-visual-purple)",
];

// Masaüstü blok için ESKİ, orijinal hard-coded hex aksanlar — tasarım burada birebir eskisi gibi
const DESKTOP_CARD_ACCENTS = [
  "#8946FF",
  "#5B95FF",
  "#18E5FB",
  "#B88CFF",
  "#8946FF",
  "#5B95FF",
];

export default function WhyRawiSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleCardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaCardRef = useRef<HTMLDivElement>(null);

  // Mobil bölüm için ayrı ref'ler — pin YOK, scrub YOK.
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCtaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // gsap.matchMedia — breakpoint'e göre hangi animasyonun kurulacağını
    // GSAP'in kendisi yönetiyor, ekran yeniden boyutlandırılırsa otomatik geçiş yapar.
    const mm = gsap.matchMedia();

    // ============ MASAÜSTÜ (≥1024px): ORİJİNAL PIN'Lİ ORBIT ANİMASYONU ============
    mm.add("(min-width: 1024px)", () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.92,
        filter: "blur(6px)",
      });
      gsap.set(titleCardRef.current, {
        opacity: 0,
        y: 26,
        scale: 0.96,
        filter: "blur(8px)",
      });
      gsap.set(ctaCardRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        filter: "blur(8px)",
      });
      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          x: features[i].from.x,
          y: features[i].from.y,
          rotate: features[i].from.rotate,
          scale: 0.94,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=4400",
          scrub: 1,
          pin: pinnedRef.current,
          anticipatePin: 1,
        },
      });

      tl.to(logoRef.current, {
        opacity: 1,
        scale: 0.4,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
      });

      tl.to(
        titleCardRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        },
        "+=0.2",
      );

      tl.to(
        titleCardRef.current,
        {
          y: -220,
          scale: 0.88,
          duration: 1,
          ease: "power2.inOut",
        },
        "+=0.15",
      );

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.4)",
          },
          i === 0 ? "+=0.1" : "<+=0.28",
        );
      });

      tl.to(
        [titleCardRef.current, logoRef.current, ...cards],
        {
          opacity: 0,
          y: "-=24",
          filter: "blur(4px)",
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.02,
        },
        "+=0.6",
      );
      tl.to(
        ctaCardRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.3",
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // ============ MOBİL/TABLET (<1024px): SADE, PIN'SİZ STAGGER REVEAL ============
    mm.add("(max-width: 1023px)", () => {
      const mobileCards = mobileCardRefs.current.filter(
        Boolean,
      ) as HTMLDivElement[];

      gsap.set(mobileCards, { opacity: 0, y: 32 });
      gsap.set(mobileCtaRef.current, { opacity: 0, y: 24 });

      const playIn = () => {
        gsap.to(mobileCards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
        });
        gsap.to(mobileCtaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: mobileSectionRef.current,
        start: "top 85%",
        once: true,
        onEnter: playIn,
      });

      // Bölüm, ScrollTrigger kurulduğu anda zaten görünür alandaysa
      // "onEnter" hiç tetiklenmeyebilir — bu yüzden mevcut durumu kontrol edip
      // gerekirse animasyonu hemen oynatıyoruz.
      if (trigger.isActive || trigger.progress > 0) {
        playIn();
        trigger.kill();
      }

      return () => {
        trigger.kill();
      };
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-neutral-100">
      {/* ================= MOBİL / TABLET (<lg) — YENİ, RESPONSIVE ================= */}
      <div
        ref={mobileSectionRef}
        className="lg:hidden relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        >
          <div
            className="absolute -top-[10%] -left-[20%] w-[70%] h-[35%] rounded-full blur-[90px] opacity-[0.3]"
            style={{ background: "var(--color-accent-purple)" }}
          />
          <div
            className="absolute -bottom-[8%] -right-[20%] w-[65%] h-[32%] rounded-full blur-[95px] opacity-[0.24]"
            style={{ background: "var(--color-accent-teal)" }}
          />
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Image
              src={LOGO_SRC}
              alt="Rawi Academy"
              width={400}
              height={400}
              className="w-28 sm:w-36 h-auto drop-shadow-[0_18px_40px_rgba(128,89,232,0.18)]"
            />
          </div>

          <div className="bg-neutral-0/50 backdrop-blur-2xl border border-neutral-0/70 rounded-2xl px-6 py-5 sm:px-8 sm:py-6 shadow-[0_30px_70px_-25px_rgba(9,9,11,0.22)] mb-10 sm:mb-12">
            <p className="font-thmanyah-display text-h3 sm:text-h2-sm font-semibold text-neutral-900 leading-snug">
              لماذا يختار الآف الطلاب أكاديمية راوي؟
            </p>
          </div>

          <div
            dir="rtl"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-right"
          >
            {features.map((feature, i) => {
              const accent = CARD_ACCENTS[i];
              return (
                <div
                  key={feature.title}
                  ref={(el) => {
                    mobileCardRefs.current[i] = el;
                  }}
                  className="group relative bg-neutral-0/60 backdrop-blur-md border border-neutral-0/80 p-5 sm:p-6"
                  style={{
                    borderRadius: "24px 6px 24px 6px",
                    boxShadow: "0 18px 40px -24px rgba(9,9,11,0.24)",
                  }}
                >
                  <div
                    className="absolute top-6 bottom-6 right-0 w-[2.5px] rounded-full opacity-70"
                    style={{ background: accent }}
                  />
                  <div
                    className="w-[16px] h-[16px] mb-4"
                    style={{
                      background: accent,
                      borderRadius: "6px 2px 6px 2px",
                    }}
                  />
                  <p className="font-thmanyah-display text-body sm:text-h3-sm font-semibold leading-snug tracking-[-0.01em] text-neutral-900 mb-2">
                    {feature.title}
                  </p>
                  <p className="font-thmanyah-text text-caption sm:text-body leading-[1.65] text-neutral-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div ref={mobileCtaRef} className="mt-12 sm:mt-14 max-w-md mx-auto">
            <div
              className="relative bg-neutral-0/70 backdrop-blur-2xl border border-neutral-0/85 px-6 py-10 sm:px-10 sm:py-12"
              style={{
                borderRadius: "32px 8px 32px 8px",
              }}
            >
              <div className="absolute top-0 left-8 right-8 sm:left-10 sm:right-10 h-px bg-gradient-to-r from-transparent via-[var(--color-visual-purple)]/40 to-transparent" />

              <p
                className="font-thmanyah-display text-h3 sm:text-lead font-medium leading-[1.55] tracking-[-0.01em] text-neutral-900 mb-4 sm:mb-6"
                style={{ textWrap: "balance" }}
              >
                كل رحلة تبدأ بخطوة، فبأي مسار ستبدأ؟
              </p>

              <p className="font-thmanyah-text text-caption sm:text-h3-sm leading-[1.75] text-neutral-400 max-w-[280px] mx-auto mb-8 sm:mb-10">
                اختر المجال الذي يصنع الفرق في مستقبلك، ودعنا نرافقك في كل خطوة.
              </p>

              <Button
                href="/masarat"
                variant="primary"
                size="md"
                className="!px-8 !py-3 tracking-[0.02em] text-caption sm:text-h3-sm"
              >
                استكشف المسارات
              </Button>

              <div className="absolute bottom-0 left-8 right-8 sm:left-10 sm:right-10 h-px bg-gradient-to-r from-transparent via-[var(--color-visual-purple)]/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MASAÜSTÜ (lg ve üzeri) — ESKİ TASARIM BİREBİR GERİ GETİRİLDİ ================= */}
      <div className="hidden lg:block" style={{ background: "#F7F8FC" }}>
        <div
          ref={pinnedRef}
          className="relative h-screen w-full overflow-hidden flex items-center justify-center"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
          >
            <div
              className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] rounded-full blur-[110px] opacity-[0.34]"
              style={{ background: "#A78BFA" }}
            />
            <div
              className="absolute -bottom-[15%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-[0.28]"
              style={{ background: "#5EEAD4" }}
            />
            <div
              className="absolute top-[35%] right-[15%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-[0.20]"
              style={{ background: "#F0A8E0" }}
            />
          </div>

          <div className="relative w-full max-w-[1180px] h-[720px] mx-auto">
            <div
              ref={logoRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <Image
                src={LOGO_SRC}
                alt="Rawi Academy"
                width={1280}
                height={1280}
                priority
                className="drop-shadow-[0_18px_40px_rgba(128,89,232,0.18)]"
              />
            </div>

            <div
              ref={titleCardRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="bg-white/50 backdrop-blur-2xl border border-white/70 rounded-2xl px-10 py-5 shadow-[0_30px_70px_-25px_rgba(20,16,40,0.22)]">
                <p className="font-thmanyah-display text-[24px] sm:text-[28px] font-semibold text-[#09090B] whitespace-nowrap">
                  لماذا يختار الآف الطلاب أكاديمية راوي؟
                </p>
              </div>
            </div>

            {features.map((feature, i) => {
              const accent = DESKTOP_CARD_ACCENTS[i];
              return (
                <div
                  key={feature.title}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute w-[340px] -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ top: feature.pos.top, left: feature.pos.left }}
                >
                  <div
                    className="group relative bg-white/60 backdrop-blur-md border border-white/80 p-6 pt-6 transition-all duration-500 ease-out hover:-translate-y-1"
                    style={{
                      borderRadius: "28px 6px 28px 6px",
                      boxShadow: "0 22px 48px -28px rgba(20,16,40,0.28)",
                    }}
                  >
                    <div
                      className="absolute top-7 bottom-7 right-0 w-[2.5px] rounded-full opacity-70"
                      style={{ background: accent }}
                    />
                    <div
                      className="w-[18px] h-[18px] mb-5 transition-transform duration-500 group-hover:rotate-[8deg]"
                      style={{
                        background: accent,
                        borderRadius: "6px 2px 6px 2px",
                      }}
                    />
                    <p className="font-thmanyah-display text-[18.5px] font-semibold leading-snug tracking-[-0.01em] text-[#09090B] mb-2">
                      {feature.title}
                    </p>
                    <p className="font-thmanyah-text text-[14.5px] leading-[1.68] text-[#5F6B85]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            ref={ctaCardRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[560px] text-center"
          >
            <div
              className="relative bg-white/70 backdrop-blur-2xl border border-white/85 px-12 py-14"
              style={{
                borderRadius: "36px 8px 36px 8px",
                boxShadow: "0 40px 90px -32px rgba(20,16,40,0.24)",
              }}
            >
              <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#8946FF]/40 to-transparent" />

              <p
                className="font-thmanyah-display text-[28px] sm:text-[30px] font-medium leading-[1.65] tracking-[-0.01em] text-[#1C1C24] mb-6"
                style={{ textWrap: "balance" }}
              >
                كل رحلة تبدأ بخطوة، فبأي مسار ستبدأ؟
              </p>

              <p className="font-thmanyah-text text-[18.5px] leading-[1.8] text-[#8A8FA3] max-w-[300px] mx-auto mb-10">
                اختر المجال الذي يصنع الفرق في مستقبلك، ودعنا نرافقك في كل خطوة.
              </p>

              <Button
                href="/masarat"
                variant="primary"
                size="md"
                className="!px-9 !py-3.5 tracking-[0.02em] text-[20px]"
              >
                استكشف المسارات
              </Button>

              <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#5B95FF]/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}