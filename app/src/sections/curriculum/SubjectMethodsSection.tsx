import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";

// Fixed 1:1 subject → accent color mapping, same as CardHeader's `color` prop
const subjects = [
  {
    name: "القرآن",
    tags: ["حفظ", "فهم", "مراجعة"],
    accent: "text-visual-teal",
    ring: "34, 197, 178", // matches --color-visual-teal for the stroke/glow use below
    offset: "",
  },
  {
    name: "البرمجة",
    tags: ["منطق", "تطبيق", "بناء"],
    accent: "text-visual-purple",
    ring: "128, 89, 232",
    offset: "mt-[34px] max-md:mt-0",
  },
  {
    name: "اللغات",
    tags: ["فهم", "ممارسة", "تواصل"],
    accent: "text-visual-pink",
    ring: "236, 72, 153",
    offset: "",
  },
  {
    name: "الرياضيات",
    tags: ["فهم", "تحليل", "حل"],
    accent: "text-visual-orange",
    ring: "242, 101, 34",
    offset: "mt-[56px] max-md:mt-0",
  },
];

const ordinals = ["١", "٢", "٣", "٤"];

export default function SubjectMethodsSection() {
  return (
    <section dir="rtl" className="relative bg-neutral-900 py-[120px] max-md:py-16 overflow-hidden">
      {/* Fine grain texture — breaks up the flat dark background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <SectionContainer>
        <Reveal>
        
          <h2 className="font-thmanyah-display text-h2-sm text-neutral-0 max-w-[500px] mb-2">
            لكل علم طريقته، لكن الهدف واحد.
          </h2>
          <p className="text-body text-neutral-400 max-w-[520px] mb-[70px] max-md:mb-10">
            تختلف طبيعة العلوم التي يتعلمها الطالب، لذلك تختلف طريقة تقديمها
            وتطبيقها، بينما تبقى المبادئ التي نبني عليها التجربة واحدة: فهم
            واضح، ممارسة مستمرة، وتقدم حقيقي.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-4 max-md:grid-cols-2 gap-y-14">
          {subjects.map((subj, i) => (
            <div
              key={subj.name}
              className={`group relative px-6 max-md:px-0 ${subj.offset}`}
            >
              {/* Gradient divider — fades top & bottom instead of a flat border */}
              {i > 0 && (
                <span
                  aria-hidden
                  className="absolute inset-y-2 start-0 w-px max-md:hidden"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(255,255,255,0.14), transparent)",
                  }}
                />
              )}

              {/* Ghost ordinal — large outlined numeral sitting behind the heading */}
              <span
                aria-hidden
                className="absolute -top-3 start-6 select-none font-thmanyah-display text-[64px] leading-none transition-colors duration-500 group-hover:text-transparent"
                style={{
                  color: "transparent",
                  WebkitTextStroke: `1px rgba(${subj.ring}, 0.35)`,
                }}
              >
                {ordinals[i]}
              </span>

              <div className="relative pt-9">
                <h3 className="font-thmanyah-display text-h3-sm text-neutral-0 mb-3 inline-block">
                  {subj.name}
                  <span
                    aria-hidden
                    className={`block h-px mt-2 origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${subj.accent.replace(
                      "text-",
                      "bg-"
                    )}`}
                  />
                </h3>
                <div className="text-caption text-neutral-400">
                  {subj.tags.map((tag, idx) => (
                    <span key={tag}>
                      <b className="font-semibold text-neutral-100">{tag}</b>
                      {idx < subj.tags.length - 1 && (
                        <span className="mx-1.5 text-neutral-600">•</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </SectionContainer>
    </section>
  );
}