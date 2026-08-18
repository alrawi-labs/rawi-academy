"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

const ELASTIC_EASE = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

/* ----------------------------------------------------------------------- */
/* Diller — her biri kendi rengi, kendi kod parçası, kendi "çalıştırma"    */
/* çıktısıyla. Renkler kasıtlı olarak sitenin dört visual-* token'ına      */
/* (teal/purple/orange/pink) sabitlendi; sekiz dil bu dört renk arasında   */
/* döner.                                                                  */
/* ----------------------------------------------------------------------- */

type Accent = "teal" | "purple" | "orange" | "pink";

const ACCENT_VAR: Record<Accent, string> = {
  teal: "var(--color-visual-teal)",
  purple: "var(--color-visual-purple)",
  orange: "var(--color-visual-orange)",
  pink: "var(--color-visual-pink)",
};

type CodeLine = { indent?: 0 | 1 | 2; content: ReactNode };

type Language = {
  id: string;
  name: string;
  filename: string;
  accent: Accent;
  lines: CodeLine[];
  output: string;
};

const LANGUAGES: Language[] = [
  {
    id: "python",
    name: "Python",
    filename: "main.py",
    accent: "purple",
    lines: [
      {
        content: (
          <>
            <span className="text-visual-purple">def</span>{" "}
            <span className="text-visual-pink">greet</span>(name):
          </>
        ),
      },
      {
        indent: 1,
        content: (
          <>
            <span className="text-visual-purple">return</span>{" "}
            <span className="text-visual-orange">f&quot;Hello, {"{name}"}!&quot;</span>
          </>
        ),
      },
      { content: <>&nbsp;</> },
      {
        content: (
          <>
            print(greet(<span className="text-visual-orange">&quot;Rawi&quot;</span>))
          </>
        ),
      },
    ],
    output: "Hello, Rawi!",
  },
  {
    id: "javascript",
    name: "JavaScript",
    filename: "app.js",
    accent: "orange",
    lines: [
      {
        content: (
          <>
            <span className="text-visual-purple">const</span> user = {"{"}
          </>
        ),
      },
      {
        indent: 1,
        content: (
          <>
            name: <span className="text-visual-orange">&quot;Rawi&quot;</span>,
          </>
        ),
      },
      { content: <>{"}"};</> },
      {
        content: (
          <>
            console.<span className="text-visual-pink">log</span>(
            <span className="text-visual-orange">`Hi ${"{user.name}"}`</span>);
          </>
        ),
      },
    ],
    output: "Hi Rawi",
  },
  {
    id: "rust",
    name: "Rust",
    filename: "main.rs",
    accent: "pink",
    lines: [
      {
        content: (
          <>
            <span className="text-visual-purple">fn</span>{" "}
            <span className="text-visual-pink">main</span>() {"{"}
          </>
        ),
      },
      {
        indent: 1,
        content: (
          <>
            <span className="text-visual-purple">let</span> name ={" "}
            <span className="text-visual-orange">&quot;Rawi&quot;</span>;
          </>
        ),
      },
      {
        indent: 1,
        content: (
          <>
            println!(<span className="text-visual-orange">&quot;Hi, {"{}"}!&quot;</span>, name);
          </>
        ),
      },
      { content: <>{"}"}</> },
    ],
    output: "Compiling… Finished",
  },
  {
    id: "go",
    name: "Go",
    filename: "main.go",
    accent: "teal",
    lines: [
      {
        content: (
          <>
            <span className="text-visual-purple">func</span>{" "}
            <span className="text-visual-pink">main</span>() {"{"}
          </>
        ),
      },
      {
        indent: 1,
        content: (
          <>
            name := <span className="text-visual-orange">&quot;Rawi&quot;</span>
          </>
        ),
      },
      {
        indent: 1,
        content: (
          <>
            fmt.<span className="text-visual-pink">Println</span>(
            <span className="text-visual-orange">&quot;Hi,&quot;</span>, name)
          </>
        ),
      },
      { content: <>{"}"}</> },
    ],
    output: "go run main.go ✓",
  },
  {
    id: "typescript",
    name: "TypeScript",
    filename: "main.ts",
    accent: "purple",
    lines: [
      {
        content: (
          <>
            <span className="text-visual-purple">const</span> greet = (name:{" "}
            <span className="text-visual-teal">string</span>) {"=>"} {"{"}
          </>
        ),
      },
      {
        indent: 1,
        content: (
          <>
            <span className="text-visual-purple">return</span>{" "}
            <span className="text-visual-orange">`Hi, ${"{name}"}!`</span>;
          </>
        ),
      },
      { content: <>{"}"};</> },
      {
        content: (
          <>
            console.<span className="text-visual-pink">log</span>(greet(
            <span className="text-visual-orange">&quot;Rawi&quot;</span>));
          </>
        ),
      },
    ],
    output: "Hi, Rawi!",
  },
  {
    id: "java",
    name: "Java",
    filename: "Main.java",
    accent: "orange",
    lines: [
      {
        content: (
          <>
            <span className="text-visual-purple">class</span>{" "}
            <span className="text-visual-pink">Main</span> {"{"}
          </>
        ),
      },
      {
        indent: 1,
        content: (
          <>
            <span className="text-visual-purple">static void</span> greet() {"{"}
          </>
        ),
      },
      {
        indent: 2,
        content: (
          <>
            System.out.<span className="text-visual-pink">println</span>(
            <span className="text-visual-orange">&quot;Hi, Rawi!&quot;</span>);
          </>
        ),
      },
      { content: <>{"}"}{"}"}</> },
    ],
    output: "Hi, Rawi!",
  },
  {
    id: "cpp",
    name: "C++",
    filename: "main.cpp",
    accent: "pink",
    lines: [
      {
        content: (
          <>
            #include <span className="text-visual-orange">&lt;iostream&gt;</span>
          </>
        ),
      },
      { content: <>&nbsp;</> },
      {
        content: (
          <>
            <span className="text-visual-purple">int</span>{" "}
            <span className="text-visual-pink">main</span>() {"{"}
          </>
        ),
      },
      {
        indent: 1,
        content: (
          <>
            std::cout &lt;&lt; <span className="text-visual-orange">&quot;Hi, Rawi!&quot;</span>;
          </>
        ),
      },
    ],
    output: "g++ main.cpp && ./a.out",
  },
  {
    id: "php",
    name: "PHP",
    filename: "index.php",
    accent: "teal",
    lines: [
      { content: <>&lt;?php</> },
      {
        content: (
          <>
            <span className="text-visual-purple">function</span>{" "}
            <span className="text-visual-pink">greet</span>($name) {"{"}
          </>
        ),
      },
      {
        indent: 1,
        content: (
          <>
            <span className="text-visual-purple">return</span>{" "}
            <span className="text-visual-orange">&quot;Hi, $name!&quot;</span>;
          </>
        ),
      },
      { content: <>{"}"}</> },
    ],
    output: "Hi, Rawi!",
  },
];

/* ----------------------------------------------------------------------- */
/* Zemin dokusu — düz stok görsel yerine çok hafif nokta-ızgara + tek        */
/* yönlü parıltı. Sembolik/simetrik blob yok.                              */
/* ----------------------------------------------------------------------- */

function DeskSurface() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-[28px]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 10%, color-mix(in srgb, var(--color-visual-purple) 14%, transparent) 0%, transparent 60%), var(--color-neutral-950)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute inset-0 border border-white/[0.06] rounded-[28px]" />
    </div>
  );
}

/** Hover'da beliren renkli, tek yönlü dönen kenar parıltısı — kartın accent'ine göre renklenir. */
function AccentGlow({ accent }: { accent: Accent }) {
  const v = ACCENT_VAR[accent];
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-0 scale-[0.9] transition-all duration-500 ease-[cubic-bezier(0.34,1.8,0.64,1)] group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100"
      style={{
        padding: "1.5px",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <span
        className="absolute inset-[-60%]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 52%, color-mix(in srgb, ${v} 55%, transparent) 63%, ${v} 71%, color-mix(in srgb, ${v} 55%, transparent) 79%, transparent 90%, transparent 100%)`,
          animation: "lang-border-spin 2.6s linear infinite",
        }}
      />
    </span>
  );
}

/**
 * LanguageWindow — açık bir kod editörü penceresi. Sakin durur, hover'da
 * hafifçe öne çıkar. Üstte ince bir cam kenar çizgisi ve mount'ta çok kısa,
 * sade bir belirme animasyonu dışında ekstra süsleme yok.
 */
function LanguageWindow({
  lang,
  className = "",
  delayMs = 0,
}: {
  lang: Language;
  className?: string;
  delayMs?: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <article
      dir="ltr"
      tabIndex={0}
      className={`group relative w-[15.5rem] sm:w-[17.5rem] shrink-0 rounded-xl bg-neutral-950/95 backdrop-blur-md border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 transition-[transform,box-shadow,opacity] duration-500 ${ELASTIC_EASE} ${className}`}
      style={
        {
          "--tw-ring-color": ACCENT_VAR[lang.accent],
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transitionDelay: `${delayMs}ms`,
        } as React.CSSProperties
      }
    >
      <AccentGlow accent={lang.accent} />

      {/* Cam kenarı — üstte ince, sabit bir ışık çizgisi */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-xl"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 100%)",
        }}
      />

      <div className="relative flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/10 bg-white/[0.03] rounded-t-xl">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: ACCENT_VAR[lang.accent], opacity: 0.85 }}
        />
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
        <span className="ml-2 font-mono text-[11px] text-neutral-500 truncate">
          {lang.filename}
        </span>
        <span
          className="ml-auto font-mono text-[10px] tracking-wide uppercase"
          style={{ color: ACCENT_VAR[lang.accent] }}
        >
          {lang.name}
        </span>
      </div>

      <div className="relative px-4 py-3.5 font-mono text-[12.5px] leading-[1.9] text-neutral-300">
        {lang.lines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-neutral-700 select-none w-4 text-right shrink-0">
              {i + 1}
            </span>
            <span
              className="whitespace-pre"
              style={{ paddingLeft: `${(line.indent ?? 0) * 14}px` }}
            >
              {line.content}
            </span>
          </div>
        ))}
      </div>

      {/* Terminal çıktısı — kapalı halde yükseklik 0, hover/focus'ta açılır */}
      <div className="relative grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
        <div className="overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-t border-white/10 bg-white/[0.025]">
            <span
              className="font-mono text-[11px] font-bold shrink-0"
              style={{ color: ACCENT_VAR[lang.accent] }}
            >
              ❯
            </span>
            <span className="font-mono text-[11px] text-neutral-400 truncate">
              {lang.output}
            </span>
            <span
              className="ml-auto w-[6px] h-[12px] rounded-[1px] lang-cursor-blink"
              style={{ background: ACCENT_VAR[lang.accent] }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes lang-border-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes lang-cursor-blink {
          0%,
          45% {
            opacity: 1;
          }
          50%,
          95% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .lang-cursor-blink {
          animation: lang-cursor-blink 1.1s step-end infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .lang-cursor-blink,
          :global(.lang-border-spin) {
            animation: none !important;
          }
        }
      `}</style>
    </article>
  );
}

/* Masaüstü: sekiz pencere, iki gevşek "sıra" halinde ama katı bir ızgaraya  */
/* oturmadan — kağıtlar gibi dağılmış, açılı, kısmen çakışan bir masa       */
/* düzeni. Hover'da düzleşip öne çıkar.                                     */
const DESK_LAYOUT: Record<
  string,
  { top: string; left: string; rotate: number; z: number; delay: number }
> = {
  python: { top: "0%", left: "2%", rotate: -4, z: 40, delay: 0 },
  javascript: { top: "6%", left: "27%", rotate: 5, z: 30, delay: 60 },
  rust: { top: "0%", left: "52%", rotate: -3, z: 20, delay: 120 },
  go: { top: "8%", left: "76%", rotate: 4, z: 10, delay: 180 },
  typescript: { top: "48%", left: "0%", rotate: 3, z: 25, delay: 240 },
  java: { top: "54%", left: "25%", rotate: -5, z: 15, delay: 300 },
  cpp: { top: "46%", left: "50%", rotate: 5, z: 35, delay: 360 },
  php: { top: "52%", left: "74%", rotate: -4, z: 5, delay: 420 },
};

export default function LanguagesShowcase() {
  return (
    <section
      dir="rtl"
      className="relative bg-neutral-950 py-20 lg:py-28 overflow-hidden"
    >
      <SectionContainer className="relative">
        <div className="max-w-[560px]">
          <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 text-neutral-0 leading-[1.3]">
            لغة واحدة اليوم، مشروع حقيقي غدًا
          </h2>
          <p className="font-thmanyah-text text-body text-neutral-400 leading-7 mt-5">
            بايثون، جافاسكريبت، تايب سكريبت، جافا، ++C، رَست، PHP، وGo — كل لغة
            بمسارها الخاص، ومشاريعها الخاصة، ومدرّسها المختص.
          </p>
        </div>

        {/* Masaüstü: dağınık, çakışan, açılı pencereler — iki gevşek sıra */}
        <div className="hidden lg:block relative mt-16 h-[46rem]">
          <DeskSurface />
          {LANGUAGES.map((lang) => {
            const pos = DESK_LAYOUT[lang.id];
            return (
              <div
                key={lang.id}
                className={`absolute transition-[transform,z-index] duration-500 ${ELASTIC_EASE} hover:z-50 focus-within:z-50 hover:!rotate-0 focus-within:!rotate-0`}
                style={{
                  top: pos.top,
                  left: pos.left,
                  zIndex: pos.z,
                  transform: `rotate(${pos.rotate}deg)`,
                }}
              >
                <LanguageWindow
                  lang={lang}
                  delayMs={pos.delay}
                  className="hover:-translate-y-2 focus-within:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75)]"
                />
              </div>
            );
          })}
        </div>

        {/* Mobil: yatay kaydırmalı şerit, açı yok — dokunma önceliği */}
        <div className="lg:hidden mt-10 -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LANGUAGES.map((lang, i) => (
            <div key={lang.id} className="snap-center">
              <LanguageWindow lang={lang} delayMs={i * 60} />
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}