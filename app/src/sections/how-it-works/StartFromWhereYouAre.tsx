"use client";

import { useMemo, useState } from "react";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import Button from "@/app/src/components/ui/Button";

/**
 * تجربة اختيار واحدة متصلة بدل شبكة بطاقات: قائمة مواد نصية + شرائح
 * مستوى، ولوحة توصية حيّة ثابتة (`lg:sticky`) تتحدث كلما تغيّر الاختيار.
 * لا أيقونات — الحالة المختارة تُقرأ من اللون والخط الجانبي فقط.
 */

const SUBJECTS = [
  { id: "quran", label: "القرآن والسنة" },
  { id: "code", label: "البرمجة" },
  { id: "languages", label: "اللغات" },
  { id: "math", label: "الرياضيات" },
] as const;

const LEVELS = [
  { id: "beginner", label: "مبتدئ" },
  { id: "basics", label: "لدي أساسيات" },
  { id: "advanced", label: "متقدم" },
] as const;

type SubjectId = (typeof SUBJECTS)[number]["id"];
type LevelId = (typeof LEVELS)[number]["id"];

const RECOMMENDATIONS: Record<SubjectId, Record<LevelId, string>> = {
  quran: {
    beginner: "التجويد التأسيسي — قراءة صحيحة من الصفر",
    basics: "حفظ وتثبيت — خطة مراجعة أسبوعية",
    advanced: "التفسير التحليلي — أسباب النزول",
  },
  code: {
    beginner: "Python — من الأساس إلى بناء المشاريع",
    basics: "هياكل البيانات والخوارزميات",
    advanced: "React — بناء واجهات تفاعلية حقيقية",
  },
  languages: {
    beginner: "التركية للناطقين بالعربية — من الصفر",
    basics: "المحادثة والطلاقة اليومية",
    advanced: "الإنجليزية لبيئة العمل الاحترافية",
  },
  math: {
    beginner: "أساسيات الجبر — خطوة بخطوة",
    basics: "الهندسة والبراهين المنهجية",
    advanced: "التفاضل والتكامل بالشرح المرئي",
  },
};

export function StartFromWhereYouAre() {
  const [subject, setSubject] = useState<SubjectId | null>(null);
  const [level, setLevel] = useState<LevelId | null>(null);

  const recommendation = useMemo(() => {
    if (!subject || !level) return null;
    return RECOMMENDATIONS[subject][level];
  }, [subject, level]);

  return (
    <section dir="rtl" className="bg-neutral-0 py-24 lg:py-32">
      <SectionContainer>
        <div className="max-w-lg">
          <h2 className="font-thmanyah-display text-h2 text-neutral-900">تبدأ من حيث أنت.</h2>
          <p className="mt-3 font-thmanyah-text text-body text-neutral-500">
            لا تحتاج أن تعرف من أين تبدأ. راوي تساعدك على اختيار المسار والمستوى
            المناسبين لك.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="text-micro tracking-[0.15em] text-neutral-400">
              ماذا تريد أن تتعلم؟
            </span>
            <ul className="mt-4 border-t border-neutral-200">
              {SUBJECTS.map((s) => {
                const active = subject === s.id;
                return (
                  <li key={s.id} className="border-b border-neutral-200">
                    <button
                      type="button"
                      onClick={() => setSubject(s.id)}
                      className="flex w-full items-center justify-between py-4 text-right"
                    >
                      <span
                        className={`font-thmanyah-display text-h3-sm transition-colors ${
                          active ? "text-primary" : "text-neutral-800"
                        }`}
                      >
                        {s.label}
                      </span>
                      <span
                        className={`h-[2px] w-6 bg-primary transition-opacity ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <span className="mt-10 block text-micro tracking-[0.15em] text-neutral-400">
              مستواك الحالي؟
            </span>
            <div className="mt-4 flex flex-wrap gap-3">
              {LEVELS.map((l) => {
                const active = level === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLevel(l.id)}
                    className={`rounded-full border px-5 py-2 font-thmanyah-text text-caption transition-colors ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* لوحة التوصية */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="min-h-[220px] rounded-xl border border-neutral-200 bg-neutral-0 p-7">
                {recommendation ? (
                  <div className="animate-[fadeIn_0.4s_ease-out]">
                    <span className="text-micro tracking-[0.15em] text-primary">
                      المسار المقترح لك
                    </span>
                    <p className="mt-3 font-thmanyah-display text-h3 leading-snug text-neutral-900">
                      {recommendation}
                    </p>
                    <Button variant="primary" size="sm" href="/paths" className="mt-6">
                      ابدأ المسار
                    </Button>
                  </div>
                ) : (
                  <p className="font-thmanyah-text text-body text-neutral-400">
                    اختر مادة ومستواك لنقترح عليك المسار المناسب.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default StartFromWhereYouAre;
