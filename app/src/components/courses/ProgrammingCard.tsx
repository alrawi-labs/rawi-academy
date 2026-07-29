"use client";

import { Expand, GitBranch, Sparkles, FileCode2, Route } from "lucide-react";
import { CardHeader } from "./CardHeader";

/**
 * Glass code-editor mockup showing a Python bubble-sort algorithm,
 * with an editor tab bar, syntax-highlighted body, a status bar
 * (git branch + language + cursor position), and a floating
 * "Tab to accept" AI-suggestion hint.
 */
function CodeEditorMockup() {
  return (
    <>
      <div
        dir="ltr"
        className="absolute right-4 top-6 w-75 rounded-xl overflow-hidden bg-neutral-0/40 backdrop-blur-xl border border-neutral-0/60 shadow-[0_35px_70px_-25px_rgba(20,16,40,0.3)]"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
          }}
        />

        {/* Window chrome + file tabs */}
        <div className="relative bg-neutral-0/30 backdrop-blur-md">
          <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 border-b border-neutral-0/40">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-0/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-0/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-0/70" />
          </div>
          <div className="flex items-center px-3 border-b border-neutral-0/40">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-0/25 rounded-t-md border-t-2 border-primary -mb-px">
              <FileCode2 size={12} className="text-primary" />
              <span className="text-micro text-neutral-900 font-mono">
                algorithm.py
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 opacity-50">
              <FileCode2 size={12} className="text-neutral-500" />
              <span className="text-micro text-neutral-500 font-mono">
                README.md
              </span>
            </div>
          </div>
        </div>

        {/* Syntax-highlighted code body */}
        <div className="relative bg-neutral-0/15 backdrop-blur-sm flex text-micro leading-loose">
          <div className="font-mono text-neutral-500 text-left pl-4 pr-3 py-3 select-none border-r border-neutral-0/40">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n}>{n}</div>
            ))}
          </div>

          <div className="font-mono py-3 pl-3 pr-4 flex-1 overflow-hidden">
            <div>
              <span className="text-primary font-medium">class</span>{" "}
              <span className="text-visual-pink font-medium">Algorithm</span>
              <span className="text-neutral-700">:</span>
            </div>
            <div>
              <span className="pl-4 text-primary font-medium">def</span>{" "}
              <span className="text-visual-pink font-medium">bubble_sort</span>
              <span className="text-neutral-700">(self, arr):</span>
            </div>

            <div className="relative flex items-center">
              <span className="pl-8 text-neutral-500 italic"># </span>
              <span dir="rtl" className="italic text-orange-400 whitespace-nowrap">
                الخوارزميات هي اساس التفكير
              </span>
              <span className="w-[1.5px] h-3 bg-primary ml-1 animate-pulse" />
            </div>

            <div>
              <span className="pl-8 text-primary font-medium">for</span>{" "}
              <span className="text-neutral-700">i in</span>{" "}
              <span className="text-visual-pink font-medium">range</span>
              <span className="text-neutral-700">(len(arr)):</span>
            </div>
            <div>
              <span className="pl-12 text-primary font-medium">for</span>{" "}
              <span className="text-neutral-700">j in</span>{" "}
              <span className="text-visual-pink font-medium">range</span>
              <span className="text-neutral-700">(len(arr)-i-1):</span>
            </div>
            <div>
              <span className="pl-16 text-primary font-medium">if</span>{" "}
              <span className="text-neutral-700">arr[j] &gt; arr[j+1]:</span>
            </div>
            <div className="pl-20 text-neutral-700">
              arr[j], arr[j+1] = arr[j+1], arr[j]
            </div>
            <div className="pl-4">
              <span className="text-primary font-medium">return</span>{" "}
              <span className="text-neutral-700">arr</span>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="relative bg-primary/85 backdrop-blur-md px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <GitBranch size={11} className="text-neutral-0/90" />
              <span className="text-[10px] text-neutral-0/90 font-mono">main</span>
            </div>
            <span className="text-[10px] text-neutral-0/70 font-mono">
              Python 3.11
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-neutral-0/90" />
            <span className="text-[10px] text-neutral-0/90 font-mono">Ln 3</span>
          </div>
        </div>
      </div>

      {/* "Tab to accept" AI suggestion hint, floats over the code body */}
      <div
        dir="ltr"
        className="absolute right-13 top-41 flex items-center gap-1 bg-neutral-900/55 backdrop-blur-md rounded-md px-2 py-1 border border-neutral-0/10 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.4)]"
      >
        <kbd className="text-[9px] font-mono text-neutral-0/70 bg-neutral-0/10 rounded px-1">
          Tab
        </kbd>
        <span dir="rtl" className="text-[9.5px] text-neutral-0/60">
          لقبول الاقتراح
        </span>
      </div>
    </>
  );
}

/**
 * Glass panel showing overall programming-path progress: lessons
 * completed out of total, a gradient progress bar, and an 18-day
 * activity bar chart.
 */
function ProgressPanel() {
  // Sabit aktivite verisi (mockup amaçlı) — gerçek veriyle değiştirilecekse
  // prop olarak geçirilmesi gerekir
  const activityBars = [
    30, 42, 38, 55, 48, 62, 58, 70, 65, 80, 74, 90, 84, 96, 88, 72, 60, 50,
  ];

  return (
    <div
      dir="rtl"
      className="absolute left-4 bottom-6 w-57.5 rounded-2xl overflow-hidden bg-neutral-0/40 backdrop-blur-xl border border-neutral-0/60 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)]"
    >
      <div className="relative p-5">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
          }}
        />
        <div className="relative flex items-center gap-3 mb-4">
          <div className="w-9 h-9 shrink-0 rounded-full bg-neutral-0/40 backdrop-blur-md border border-neutral-0/50 flex items-center justify-center">
            <Route size={16} className="text-orange-400" />
          </div>
          <div>
            <p className="text-caption font-bold text-neutral-900">
              مسار البرمجة
            </p>
            <p className="text-micro text-neutral-500">المستوى الثاني</p>
          </div>
        </div>

        <div className="relative mb-3">
          <p className="text-micro text-neutral-500 mb-1">
            الدروس المكتملة
          </p>
          <p className="text-caption font-semibold text-neutral-900">
            24 من 30 درسًا
          </p>
        </div>

        <div className="relative w-full h-1.5 rounded-full bg-neutral-0/40 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: "80%",
              background:
                "linear-gradient(90deg, var(--color-primary), var(--color-pink-400), var(--color-orange-400))",
            }}
          />
        </div>
      </div>

      <div className="relative bg-neutral-0/20 backdrop-blur-sm border-t border-neutral-0/40 px-5 py-4">
        <p className="text-micro text-neutral-500">
          الدروس المنجزة آخر 30 يومًا
        </p>
        <p className="text-h3-sm font-bold text-neutral-900 mt-0.5">
          342 درسًا
        </p>
        <div dir="ltr" className="flex items-end gap-0.75 h-10 mt-3">
          {activityBars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i % 3 === 0
                    ? "var(--color-primary)"
                    : i % 3 === 1
                    ? "var(--color-pink-400)"
                    : "var(--color-orange-400)",
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * ProgrammingCard — course showcase card for the "البرمجة والمهارات"
 * subject, part of the CoursesSection grid.
 *
 * Composed of two local sub-components layered on a background image:
 * 1. `CodeEditorMockup` — glass code editor (bubble-sort example) with
 *    its floating "Tab to accept" hint.
 * 2. `ProgressPanel` — a glass panel showing lesson progress + activity chart.
 *
 * These sub-components are kept local to this file since they are not
 * currently reused elsewhere. If a future card needs the same mockup,
 * extract it into its own file under `components/ui/`.
 *
 * Note: several hex colors here (`var(--color-orange-400)`, `#C23B82`, `var(--color-pink-400)`,
 * `#6E6584`, `#8B87A3`) are off-palette and not yet tokenized — see
 * README "Known Issues" for tracking.
 */
export default function ProgrammingCard() {
  return (
    <div className="relative bg-neutral-0 border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
      <CardHeader title="البرمجة والمهارات — تعلّمٌ يواكب عالم اليوم" color="purple" />

      <div
        className="relative h-105 mt-4 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url(/backgrounds/bg-5.png)" }}
      >
        <CodeEditorMockup />
        <ProgressPanel />
      </div>
    </div>
  );
}