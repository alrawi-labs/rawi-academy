"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { PremiumGradientBar } from "@/app/src/components/3D/PremiumGradientBar";
import Button from "@/app/src/components/ui/Button";

type Track = {
  id: string;
  name: string;
  accentVar: string;
  area: string;
  corner: string;
  featured?: boolean;
};

const TRACKS: Track[] = [
  {
    id: "math",
    name: "الرياضيات",
    accentVar: "var(--color-visual-orange)",
    area: "a",
    corner: "100% 0%",
    featured: true,
  },
  {
    id: "quran",
    name: "القرآن والسنة",
    accentVar: "var(--color-visual-teal)",
    area: "b",
    corner: "0% 0%",
  },
  {
    id: "languages",
    name: "اللغات",
    accentVar: "var(--color-visual-pink)",
    area: "c",
    corner: "100% 100%",
  },
  {
    id: "programming",
    name: "البرمجة",
    accentVar: "var(--color-visual-purple)",
    area: "d",
    corner: "0% 100%",
  },
];

// دوّامة نويز خفيفة جدًا — لمسة "غراين" على سطح الزجاج بدل الملمس الرقمي المسطّح
const GRAIN_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter>
      <rect width="100%" height="100%" filter="url(#n)"/>
    </svg>`,
  );

export function CoursesHeroSection() {
  const reduced = useReducedMotion();

  return (
    <section dir="rtl" className="relative overflow-hidden py-28 sm:py-36">
      {/* حلقة الحدّ الدوّارة — معرّفة مرة واحدة هنا، تُستخدم في كل TrackCard */}
      <style jsx global>{`
        @property --border-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes track-border-spin {
          to {
            --border-angle: 360deg;
          }
        }
        .track-comet-ring {
          animation: track-border-spin 5.5s linear infinite;
        }
        .track-card-shell {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }
        .track-card-shell:hover {
          transform: translateY(-3px);
        }
        .track-card-shell:hover .track-comet-ring {
          opacity: 1;
        }
      `}</style>

      {/* الشريط الآن ثابت خلف كل شيء بوضوح، بدل التنافس مع النص */}
      <PremiumGradientBar offsetY={40} className=" opacity-70" />

      <SectionContainer>
        <div dir="ltr" className="grid items-center gap-16 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-20">
          {/* شبكة المسارات */}
          <div dir="rtl" className="relative order-2 lg:order-1 lg:mt-10">
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: "1.2fr 1fr",
                gridTemplateRows: "minmax(150px,auto) minmax(92px,auto) minmax(92px,auto)",
                gridTemplateAreas: `"a b" "a c" "d c"`,
              }}
            >
              {TRACKS.map((track, i) => (
                <TrackCard key={track.id} track={track} index={i} reduced={reduced} />
              ))}
            </div>
          </div>

          {/* النص */}
          <div dir="rtl" className="relative z-10 order-1 text-right lg:order-2">
            {/* توهّج خلفي ناعم جدًا يرفع تباين النص فوق الشريط الملوّن دون أن يبدو كصندوق */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 rounded-[32px]"
              style={{
                background:
                  "radial-gradient(65% 100% at 30% 40%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 45%, transparent 75%)",
                filter: "blur(18px)",
              }}
            />
            <h1
              className="font-thmanyah-display text-hero text-neutral-950"
              style={{ textShadow: "0 1px 24px rgba(255,255,255,0.9)" }}
            >
              تعلّم ما يبني مستقبلك
            </h1>
            <p
              className="mt-6 max-w-xl font-thmanyah-text text-lead text-neutral-800"
              style={{ textShadow: "0 1px 16px rgba(255,255,255,0.7)" }}
            >
              أربعة مسارات عربية الهوية — القرآن، البرمجة، الرياضيات، واللغات — بمسار واضح من أول
              خطوة حتى الإتقان.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

function TrackCard({
  track,
  index,
  reduced,
}: {
  track: Track;
  index: number;
  reduced: boolean | null;
}) {
  const cardClassName =
    "track-card-shell relative isolate flex items-end overflow-hidden rounded-[18px] backdrop-blur-xl";

  const cardStyle: React.CSSProperties = {
    gridArea: track.area,
    background: `radial-gradient(130% 110% at ${track.corner}, color-mix(in srgb, ${track.accentVar} 26%, transparent) 0%, transparent 60%), rgba(255,255,255,0.4)`,
    // ظل متعدد الطبقات: عمق محايد + توهّج ملوّن بلون المسار (بدل ظل أسود مسطّح)
    boxShadow: `0 34px 64px -26px color-mix(in srgb, ${track.accentVar} 38%, rgba(20,16,40,0.5)), 0 2px 0 rgba(255,255,255,0.7) inset`,
  };

  // حلقة الحدّ الثابتة — خط شعرة رفيع، أساس دائم تحت الـ"كوميت"
  const baseRing = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[18px]"
      style={{
        padding: 1,
        background: `linear-gradient(160deg, rgba(255,255,255,0.55) 0%, color-mix(in srgb, ${track.accentVar} 30%, transparent) 100%)`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
  );

  // شعاع "كوميت" دوّار حول الحافة — لمسة البريميوم الفعلية، يشتد عند الـ hover
  const cometRing = (
    <div
      aria-hidden
      className="track-comet-ring pointer-events-none absolute inset-0 rounded-[18px]"
      style={{
        opacity: track.featured ? 0.9 : 0.55,
        padding: track.featured ? 1.5 : 1.25,
        background: `conic-gradient(from var(--border-angle), transparent 0%, transparent 78%, color-mix(in srgb, ${track.accentVar} 90%, white) 88%, white 92%, transparent 96%)`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        transition: "opacity 0.4s ease",
      }}
    />
  );

  const glare = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
      }}
    />
  );

  const grain = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage: `url("${GRAIN_DATA_URI}")`,
        backgroundSize: "120px 120px",
      }}
    />
  );

  const content = (
    <div className="relative px-5 py-5">
      <span
        aria-hidden
        className="mb-2 block h-[3px] w-6 rounded-full"
        style={{
          backgroundColor: track.accentVar,
          boxShadow: `0 0 6px ${track.accentVar}`,
        }}
      />
      <span
        className={
          track.featured
            ? "font-thmanyah-display text-h2-sm tracking-tight text-neutral-900"
            : "font-thmanyah-text text-h3-sm text-neutral-700"
        }
      >
        {track.name}
      </span>
    </div>
  );

  if (reduced) {
    return (
      <div className={cardClassName} style={cardStyle}>
        {glare}
        {grain}
        {content}
        {baseRing}
      </div>
    );
  }

  return (
    <motion.div
      className={cardClassName}
      style={cardStyle}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {glare}
      {grain}
      {content}
      {baseRing}
      {cometRing}
    </motion.div>
  );
}
