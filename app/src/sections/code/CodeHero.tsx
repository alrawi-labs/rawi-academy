"use client";

import CodeGlassBars from "@/app/src/components/3D/CodeGlassBars";
import MarqueeStrip from "../../components/code/MarqueeStrip";

export default function CodeHero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-neutral-900 text-neutral-0"
    >
      {/* Zemin: derin doku + çok hafif purple glow, düz foto değil */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 85% 8%, color-mix(in srgb, var(--color-visual-purple) 22%, transparent) 0%, transparent 55%), linear-gradient(180deg, var(--color-neutral-900) 0%, color-mix(in srgb, var(--color-neutral-900) 92%, transparent) 60%, var(--color-neutral-900) 100%)",
          }}
        />
      </div>
      <CodeGlassBars />

      <div className="relative z-10 min-h-[100dvh] lg:min-h-[92vh] flex flex-col">
        {/* Orta gövde: tek sütun, aşırı geniş başlık, ayraç çizgisiyle bölünmüş */}
        <div className="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-0">
          <h1 className="font-thmanyah-display font-medium text-[2.4rem] leading-[1.08] sm:text-6xl md:text-7xl lg:text-[6rem] lg:leading-[1.05] tracking-tight max-w-4xl">
 في عالمٍ يُبنى <span className="text-visual-purple">بالكود</span>،
  <br />
  من لا يفهمه سيكتفي <span className="text-visual-purple">باستهلاكه</span> 
</h1>

          <div className="mt-10 lg:mt-14 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
            <div className="hidden lg:block w-px self-stretch bg-white/15" />

            <p className="font-thmanyah-text text-body sm:text-lead leading-relaxed text-neutral-300 max-w-md">
             البرمجة لم تعد طريقًا لمن يريد أن يصبح مبرمجًا فقط. إنها طريقة لفهم التقنية، وصناعة الأدوات، وحل المشكلات، وتحويل الأفكار إلى أشياء تعمل.
            </p>
          </div>
        </div>
  
      <MarqueeStrip
  items={["Python", "JavaScript", "React", "Node.js", "SQL", "Git", "TypeScript", "Algorithms"]}
  accentVar="--color-visual-purple"
  bgVar="--color-neutral-0"
/>
      </div>
    </section>
  );
}