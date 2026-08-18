"use client";

import type { ReactNode } from "react";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/* ----------------------------------------------------------------------- */
/* "بعد ما تتعلم، شنو تقدر تسوي؟" — سؤال كل متعلّم قبل أن يبدأ. بدل الكلام،  */
/* بينتو-غريد من موك-أبات مصغّرة (متصفح/طرفية) لكل نوع مشروع، بأسلوب        */
/* محرر الأكواد الذي استُخدم في أقسام أخرى من الموقع.                       */
/* ----------------------------------------------------------------------- */

type Accent = "teal" | "purple" | "orange" | "pink";

const ACCENT_VAR: Record<Accent, string> = {
  teal: "var(--color-visual-teal)",
  purple: "var(--color-visual-purple)",
  orange: "var(--color-visual-orange)",
  pink: "var(--color-visual-pink)",
};

type Size = "normal" | "wide" | "large";

const SIZE_CLASS: Record<Size, string> = {
  normal: "",
  wide: "sm:col-span-2",
  large: "sm:col-span-2 sm:row-span-2",
};

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  accent: Accent;
  size: Size;
};

const PROJECTS: Project[] = [
  {
    id: "personal-site",
    title: "موقع شخصي",
    description: "صفحة تعريفية بمشاريعك ومهاراتك، تصمّمها وتنشرها بنفسك.",
    tags: ["HTML", "CSS", "نشر مباشر"],
    accent: "purple",
    size: "large",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "لوحة تحكم تعرض بيانات حيّة برسوم وبطاقات إحصائية.",
    tags: ["React", "Charts"],
    accent: "teal",
    size: "wide",
  },
  {
    id: "landing-page",
    title: "Landing Page",
    description: "صفحة هبوط لمنتج، بعنوان قوي وزر دعوة واضح.",
    tags: ["Tailwind", "تحويل"],
    accent: "orange",
    size: "normal",
  },
  {
    id: "webapp",
    title: "تطبيق ويب",
    description: "تطبيق بواجهة جانبية وصفحات متعددة، يحفظ حالة المستخدم.",
    tags: ["React", "Routing"],
    accent: "pink",
    size: "normal",
  },
  {
    id: "mobile-app",
    title: "تطبيق أندرويد وآيفون",
    description: "تطبيق واحد يعمل على أندرويد وآيفون، تبنيه بلغة واحدة.",
    tags: ["React Native", "iOS", "Android"],
    accent: "pink",
    size: "normal",
  },
  {
    id: "api",
    title: "API",
    description: "واجهة برمجية تستقبل الطلبات وتُرجع بيانات JSON حقيقية.",
    tags: ["Python", "REST"],
    accent: "teal",
    size: "wide",
  },
  {
    id: "react-project",
    title: "مشروع React",
    description: "تطبيق تفاعلي مبني بمكوّنات قابلة لإعادة الاستخدام.",
    tags: ["React", "Components"],
    accent: "purple",
    size: "normal",
  },
  {
    id: "desktop-app",
    title: "برنامج كمبيوتر",
    description: "تطبيق سطح مكتب مستقل يعمل على ويندوز أو ماك، بواجهة وأدوات خاصة به.",
    tags: ["Desktop", "Electron"],
    accent: "purple",
    size: "normal",
  },
  {
    id: "python-project",
    title: "مشروع Python",
    description: "سكربت أو أداة تعمل من سطر الأوامر لحل مشكلة حقيقية.",
    tags: ["Python", "CLI"],
    accent: "orange",
    size: "normal",
  },
  {
    id: "ai-project",
    title: "مشروع بالذكاء الاصطناعي",
    description: "تطبيق يستخدم نموذج ذكاء اصطناعي للردّ أو التحليل أو التوليد.",
    tags: ["AI", "API"],
    accent: "pink",
    size: "wide",
  },
];

/* --------------------------- موك-أب محتوى كل نوع مشروع -------------------- */

function Bar({ w, tone = "faint" }: { w: string; tone?: "faint" | "mid" | "accent" }) {
  const bg =
    tone === "accent"
      ? "var(--accent)"
      : tone === "mid"
      ? "rgba(255,255,255,0.18)"
      : "rgba(255,255,255,0.09)";
  return <span className="block h-2 rounded-full" style={{ width: w, background: bg }} />;
}

function PersonalSiteMockup() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <span
          className="w-8 h-8 rounded-full shrink-0"
          style={{ background: "var(--accent)", opacity: 0.3 }}
        />
        <div className="flex flex-col gap-1.5">
          <Bar w="5rem" tone="mid" />
          <Bar w="3.5rem" />
        </div>
      </div>
      <div className="flex gap-2">
        <Bar w="2.5rem" />
        <Bar w="2.5rem" />
        <Bar w="2.5rem" />
      </div>
      <div
        className="mt-1 h-16 rounded-lg"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--accent) 28%, transparent), transparent)",
        }}
      />
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 rounded-lg border border-white/10 px-2.5 py-2">
            <Bar w="1.5rem" />
            <div className="mt-1.5">
              <Bar w="2.25rem" tone="accent" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1.5 h-14">
        {[40, 70, 50, 90, 60, 75].map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              background: i % 2 === 0 ? "var(--accent)" : "rgba(255,255,255,0.12)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function LandingPageMockup() {
  return (
    <div className="flex flex-col items-center text-center gap-2.5">
      <Bar w="7rem" tone="mid" />
      <Bar w="5rem" />
      <span
        className="mt-1.5 h-6 w-20 rounded-full"
        style={{ background: "var(--accent)", opacity: 0.7 }}
      />
      <div className="flex gap-1.5 mt-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/15" />
        ))}
      </div>
    </div>
  );
}

function WebAppMockup() {
  return (
    <div className="flex gap-3">
      <div className="w-8 shrink-0 flex flex-col gap-2 items-center pt-0.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-4 h-4 rounded-md"
            style={{
              background: i === 0 ? "var(--accent)" : "rgba(255,255,255,0.08)",
              opacity: i === 0 ? 0.6 : 1,
            }}
          />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <Bar w="6rem" tone="mid" />
        <span className="h-12 rounded-lg border border-white/10 block" />
        <div className="flex gap-2">
          <span className="h-7 flex-1 rounded-md bg-white/5 block" />
          <span className="h-7 flex-1 rounded-md bg-white/5 block" />
        </div>
      </div>
    </div>
  );
}

function MobileAppMockup() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-20 aspect-[9/17] rounded-[1.1rem] border-2 border-white/15 p-1.5 flex flex-col gap-1.5">
        <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 rounded-full bg-white/15" />
        <div
          className="flex-1 mt-3 rounded-lg flex flex-col gap-1.5 p-1.5"
          style={{ background: "color-mix(in srgb, var(--accent) 12%, transparent)" }}
        >
          <Bar w="65%" tone="mid" />
          <Bar w="45%" />
          <div className="flex-1" />
          <span className="h-4 rounded-md" style={{ background: "var(--accent)", opacity: 0.6 }} />
        </div>
        <div className="flex justify-around pb-0.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-white/20" />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopAppMockup() {
  return (
    <div className="flex flex-col gap-2.5 h-full justify-center">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="w-4 h-4 rounded-md bg-white/[0.07]" />
        ))}
      </div>
      <div className="flex-1 grid grid-cols-3 gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="rounded-md"
            style={{
              background: i === 2 ? "var(--accent)" : "rgba(255,255,255,0.06)",
              opacity: i === 2 ? 0.5 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ApiMockup() {
  return (
    <div dir="ltr" className="font-mono text-[11px] leading-[1.9] text-neutral-500">
      <div className="text-neutral-400">{"{"}</div>
      <div className="pl-3">
        &quot;status&quot;: <span style={{ color: "var(--accent)" }}>&quot;ok&quot;</span>,
      </div>
      <div className="pl-3">
        &quot;user&quot;: <span style={{ color: "var(--accent)" }}>&quot;rawi&quot;</span>,
      </div>
      <div className="pl-3">
        &quot;projects&quot;: <span className="text-neutral-400">42</span>
      </div>
      <div className="text-neutral-400">{"}"}</div>
      <div
        className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2 py-0.5 text-[10px]"
        style={{ color: "var(--accent)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
        200 OK
      </div>
    </div>
  );
}

function ReactMockup() {
  return (
    <div dir="ltr" className="font-mono text-[11px] leading-[2] text-neutral-500">
      <div style={{ color: "var(--accent)" }}>{"<App>"}</div>
      <div className="pl-3">{"<Header />"}</div>
      <div className="pl-3">{"<Card />"}</div>
      <div className="pl-3 opacity-60">{"<Footer />"}</div>
      <div style={{ color: "var(--accent)" }}>{"</App>"}</div>
    </div>
  );
}

function PythonMockup() {
  return (
    <div dir="ltr" className="font-mono text-[11px] leading-[1.9] text-neutral-500">
      <div>
        <span style={{ color: "var(--accent)" }}>❯</span> python app.py
      </div>
      <div className="mt-1">Processing dataset…</div>
      <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <span className="block h-full w-3/4 rounded-full" style={{ background: "var(--accent)" }} />
      </div>
      <div className="mt-1.5" style={{ color: "var(--accent)" }}>
        Done ✓
      </div>
    </div>
  );
}

function AiMockup() {
  return (
    <div className="flex flex-col gap-2">
      <div className="self-start max-w-[75%] rounded-xl rounded-tr-sm bg-white/5 px-3 py-2 text-[11px] text-neutral-400">
        كيف أرتب بياناتي؟
      </div>
      <div
        className="self-end max-w-[75%] rounded-xl rounded-tl-sm px-3 py-2 text-[11px]"
        style={{ background: "color-mix(in srgb, var(--accent) 18%, transparent)", color: "var(--accent)" }}
      >
        جرّب فرزها حسب التاريخ أولًا
      </div>
      <div className="self-end flex gap-1 px-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-white/20" />
        ))}
      </div>
    </div>
  );
}

const MOCKUPS: Record<string, () => ReactNode> = {
  "personal-site": PersonalSiteMockup,
  dashboard: DashboardMockup,
  "landing-page": LandingPageMockup,
  webapp: WebAppMockup,
  "mobile-app": MobileAppMockup,
  api: ApiMockup,
  "react-project": ReactMockup,
  "desktop-app": DesktopAppMockup,
  "python-project": PythonMockup,
  "ai-project": AiMockup,
};

/* --------------------------------- الكرت --------------------------------- */

function TagsRow({ tags, accent }: { tags: string[]; accent: Accent }) {
  return (
    <p className="font-thmanyah-text text-[11px] text-neutral-500 leading-5 mt-2">
      {tags.map((tag, i) => (
        <span key={tag}>
          {i > 0 && (
            <span className="mx-1.5" style={{ color: ACCENT_VAR[accent] }}>
              ·
            </span>
          )}
          {tag}
        </span>
      ))}
    </p>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Mockup = MOCKUPS[project.id];
  return (
    <div
      className={`project-card-fade group relative flex flex-col rounded-sm border border-white/10 bg-neutral-900/60 overflow-hidden transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:[border-color:color-mix(in_srgb,var(--accent)_45%,transparent)] ${SIZE_CLASS[project.size]}`}
      style={
        {
          animationDelay: `${index * 50}ms`,
          "--accent": ACCENT_VAR[project.accent],
        } as React.CSSProperties
      }
    >
      <div dir="ltr" className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/10 bg-white/[0.03] shrink-0">
        <span className="w-2 h-2 rounded-full bg-neutral-700" />
        <span className="w-2 h-2 rounded-full bg-neutral-700" />
        <span className="w-2 h-2 rounded-full bg-neutral-700" />
        <span className="mx-auto rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] text-neutral-500">
          rawi.dev
        </span>
      </div>

      <div
        className="relative flex-1 p-5 flex flex-col justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 100% at 100% 0%, color-mix(in srgb, var(--accent) 7%, transparent), transparent 60%)",
        }}
      >
        <Mockup />
      </div>

      <div className="relative px-5 py-4 border-t border-white/10 bg-white/[0.02] shrink-0">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-thmanyah-display font-bold text-base text-neutral-0">
            {project.title}
          </h3>
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: "var(--accent)" }}
          />
        </div>
        <p className="font-thmanyah-text text-[12.5px] text-neutral-500 leading-5 mt-1.5">
          {project.description}
        </p>
        <TagsRow tags={project.tags} accent={project.accent} />
      </div>

      <style jsx>{`
        .project-card-fade {
          animation: project-card-fade-in 0.4s ease-out both;
        }
        @keyframes project-card-fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .project-card-fade {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function CodeProjectsSection() {
  return (
    <section dir="rtl" className="relative bg-neutral-950 py-20 sm:py-28">
      <SectionContainer>
        <div className="max-w-[620px]">
          <h2 className="font-thmanyah-display font-bold text-h2-sm sm:text-h2 text-neutral-0 leading-[1.35]">
            بعد ما تتعلّم، شنو تقدر تسوي؟
          </h2>
          <p className="font-thmanyah-text text-body text-neutral-400 leading-7 mt-5">
            ما تتعلم البرمجة بس لتسمع عنها. كل مسار ينتهي بمشروع حقيقي تبنيه
            بيدك، من أول سطر كود إلى آخر نشر.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[13rem] sm:auto-rows-[14rem] gap-4 sm:gap-5 mt-12 sm:mt-16 [grid-auto-flow:dense]">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}