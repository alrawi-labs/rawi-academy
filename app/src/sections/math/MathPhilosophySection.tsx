// MathPhilosophySection.tsx — light mode
"use client";

const CARDS = [
  {
    n: "01",
    title: "تفهم",
    body: "بدل حفظ القوانين، تفهم لماذا تعمل وكيف تستخدمها.",
  },
  {
    n: "02",
    title: "تحلّل",
    body: "تتعلم تفكيك المسألة الكبيرة إلى خطوات صغيرة وواضحة.",
  },
  {
    n: "03",
    title: "تستنتج",
    body: "تصل للحل بنفسك، بدل أن تنتظر من يخبرك بالطريقة.",
  },
];

// مسار الفوضى → الوضوح مبني حول معادلة حقيقية تُحل خطوة بخطوة (تربيعية بالتحليل)،
// وليس رموزًا مجردة. عموديًا من الأعلى للأسفل عن قصد، حتى لا يرتبط اتجاهه بمنطق
// RTL/LTR الأفقي للصفحة — والمعادلات نفسها LTR داخليًا لأنها ترميز رياضي عالمي.
function ChaosToClarityVisual() {
  return (
    <div className="relative w-full max-w-[380px] lg:ml-4 lg:-rotate-1">
      <svg viewBox="0 0 420 700" className="w-full h-auto" aria-hidden="true">
        <defs>
          <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-neutral-400)"
              stopOpacity="0.4"
            />
            <stop
              offset="45%"
              stopColor="var(--color-neutral-400)"
              stopOpacity="0.3"
            />
            <stop
              offset="72%"
              stopColor="var(--color-visual-orange)"
              stopOpacity="0.6"
            />
            <stop
              offset="100%"
              stopColor="var(--color-visual-orange)"
              stopOpacity="1"
            />
          </linearGradient>
          <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tagShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="4"
              floodColor="#09090b"
              floodOpacity="0.12"
            />
          </filter>
          <pattern
            id="notebookDots"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="var(--color-neutral-300)" />
          </pattern>
        </defs>

        {/* خط دليل خافت يمر عبر كل المراحل */}
        <line
          x1="210"
          y1="8"
          x2="210"
          y2="690"
          stroke="var(--color-neutral-200)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />

        {/* لوح مسودة خفيف خلف منطقة الفوضى فقط — نسيج "ورقة حسابات حقيقية" */}
        <rect
          x="18"
          y="14"
          width="384"
          height="168"
          rx="18"
          fill="url(#notebookDots)"
          opacity="0.5"
        />

        {/* ===== 1. الفوضى: محاولة خاطئة مشطوبة ثم المعادلة الصحيحة ===== */}
        <g className="chaos-ink" fontFamily="var(--font-thmanyah-display)">
          {/* محاولة تحليل خاطئة، مشطوبة */}
          <g transform="translate(40 52) rotate(-5)" opacity="0.45">
            <text fontSize="17" fill="var(--color-neutral-500)">
              (x − 1)(x − 4) = 0
            </text>
            <line
              x1="-4"
              y1="-6"
              x2="150"
              y2="-8"
              stroke="var(--color-neutral-400)"
              strokeWidth="1.4"
            />
          </g>

          {/* معادلة أولى، مشطوبة أيضًا (خطأ في الإشارة) */}
          <g transform="translate(230 40) rotate(4)" opacity="0.4">
            <text fontSize="15" fill="var(--color-neutral-500)">
              x² − 5x + 4 = 0
            </text>
            <line
              x1="-3"
              y1="-5"
              x2="128"
              y2="-7"
              stroke="var(--color-neutral-400)"
              strokeWidth="1.2"
            />
          </g>

          {/* المعادلة الصحيحة — واضحة وبارزة */}
          <g transform="translate(70 118) rotate(-1.5)">
            <text
              fontSize="26"
              fontWeight="700"
              fill="var(--color-neutral-900)"
            >
              x² − 5x + 6 = 0
            </text>
          </g>

          {/* دائرة حرة اليد حول "6" للفت الانتباه للحد المهم */}
          <path
            d="M 293 100 C 288 90, 312 86, 316 98 C 320 110, 296 114, 293 100 Z"
            fill="none"
            stroke="var(--color-visual-orange)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* وسم "مسألة" */}
        <g transform="translate(316 18) rotate(-3)" filter="url(#tagShadow)">
          <rect
            width="76"
            height="30"
            rx="15"
            fill="var(--color-neutral-900)"
          />
          <text
            x="38"
            y="20"
            textAnchor="middle"
            fontSize="13"
            fontFamily="var(--font-thmanyah-sans)"
            fill="var(--color-neutral-0)"
          >
            مسألة
          </text>
        </g>

        {/* ===== المسار المتحول: فوضى → نمط → منطق → حل (مع توهج خلفي خفيف) ===== */}
        <path
          d="M 210 185 C 140 240, 270 280, 190 330 C 110 375, 260 440, 215 480 C 190 530, 220 570, 210 620"
          fill="none"
          stroke="url(#spineGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.15"
        />
        <path
          d="M 210 185 C 140 240, 270 280, 190 330 C 110 375, 260 440, 215 480 C 190 530, 220 570, 210 620"
          fill="none"
          stroke="url(#spineGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* ===== 2. النمط: التحليل إلى عاملين + الملاحظة الحسابية ===== */}
        <circle cx="190" cy="330" r="5" fill="var(--color-neutral-500)" />
        <g transform="translate(48 300)">
          <text
            fontFamily="var(--font-thmanyah-display)"
            fontSize="19"
            fontWeight="600"
            fill="var(--color-neutral-900)"
          >
            (x − 2)(x − 3) = 0
          </text>
          <text
            y="22"
            fontFamily="var(--font-thmanyah-sans)"
            fontSize="12"
            fill="var(--color-neutral-500)"
          >
            2 × 3 = 6 &#160;&#160;·&#160;&#160; 2 + 3 = 5
          </text>
        </g>
        <g transform="translate(30 268)" filter="url(#tagShadow)">
          <rect
            width="62"
            height="28"
            rx="14"
            fill="var(--color-neutral-0)"
            stroke="var(--color-neutral-300)"
          />
          <text
            x="31"
            y="19"
            textAnchor="middle"
            fontSize="12.5"
            fontFamily="var(--font-thmanyah-sans)"
            fill="var(--color-neutral-700)"
          >
            نمط
          </text>
        </g>

        {/* ===== 3. المنطق: تطبيق خاصية الضرب الصفري ===== */}
        <circle
          cx="215"
          cy="480"
          r="5"
          fill="var(--color-visual-orange)"
          opacity="0.85"
        />
        <g transform="translate(196 452)">
          <text
            fontFamily="var(--font-thmanyah-display)"
            fontSize="17"
            fontWeight="600"
            fill="var(--color-neutral-900)"
          >
            x − 2 = 0 &#160;∨&#160; x − 3 = 0
          </text>
        </g>
        <g transform="translate(300 420)" filter="url(#tagShadow)">
          <rect
            width="70"
            height="28"
            rx="14"
            fill="var(--color-neutral-0)"
            stroke="var(--color-visual-orange)"
            strokeOpacity="0.45"
          />
          <text
            x="35"
            y="19"
            textAnchor="middle"
            fontSize="12.5"
            fontFamily="var(--font-thmanyah-sans)"
            fill="var(--color-neutral-900)"
          >
            منطق
          </text>
        </g>

        {/* ===== 4. الحل: صندوق نهائي واضح ومضيء ===== */}
        <g filter="url(#softGlow)">
          <circle
            cx="210"
            cy="628"
            r="42"
            fill="var(--color-visual-orange)"
            opacity="0.14"
          />
        </g>
        <g transform="translate(130 600)" filter="url(#tagShadow)">
          <rect
            width="160"
            height="56"
            rx="12"
            fill="var(--color-neutral-0)"
            stroke="var(--color-visual-orange)"
            strokeWidth="1.5"
          />
          <text
            x="80"
            y="34"
            textAnchor="middle"
            fontFamily="var(--font-thmanyah-display)"
            fontSize="19"
            fontWeight="700"
            fill="var(--color-neutral-900)"
          >
            x = 2 , x = 3
          </text>
        </g>
        <g transform="translate(292 606)">
          <circle r="12" fill="var(--color-visual-orange)" />
          <path
            d="M -5 0 L -1.5 4 L 6 -5"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g transform="translate(150 668)">
          <rect
            width="60"
            height="30"
            rx="15"
            fill="var(--color-visual-orange)"
          />
          <text
            x="30"
            y="20"
            textAnchor="middle"
            fontSize="13"
            fontFamily="var(--font-thmanyah-sans)"
            fontWeight="600"
            fill="white"
          >
            الحل
          </text>
        </g>
      </svg>

      <style jsx>{`
        .chaos-ink {
          animation: settleIn 1.4s ease-out both;
        }
        @keyframes settleIn {
          0% {
            opacity: 0;
            transform: translateY(-6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .chaos-ink {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function MathPhilosophySection() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-neutral-100 text-neutral-900 pt-24 lg:pt-36"
    >
      {/* توهج خافت غير مركزي، ينسجم مع لون الرياضيات (orange) دون أن يتحول لكرة متماثلة */}
      <div
        className="absolute inset-0 pointer-events-none"
  
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-10 items-start">
          {/* العمود الأيمن (الأساسي في RTL): العنوان + النص + البطاقات */}
          <div className="lg:col-span-7 lg:order-2">

            <h2 className="mt-5 font-thmanyah-display font-medium text-h2-sm sm:text-h2 lg:text-[3.25rem] leading-[1.2] max-w-xl">
              نحن لا نعلّمك كيف تجد الإجابة.
              <br />
              <span className="text-neutral-500">نعلّمك كيف تصل إليها.</span>
            </h2>

            <p className="mt-6 font-thmanyah-text text-body sm:text-lead leading-relaxed text-neutral-600 max-w-md">
              كل مسألة رياضية هي تدريب صغير لعقلك على التحليل، اكتشاف الأنماط،
              وربط الأشياء ببعضها. ومع الوقت، ما كان يبدو معقدًا يبدأ بالوضوح.
            </p>

            {/* 3 بطاقات — أرقام كبيرة بدل أيقونات دائرية عامة، بإزاحة رأسية بسيطة لكسر التماثل */}
            <div className="mt-14 grid sm:grid-cols-3 gap-5 sm:gap-6">
              {CARDS.map((c, i) => (
                <div
                  key={c.n}
                  className={`group relative border border-neutral-200 rounded-lg p-6 pt-8 bg-neutral-0 hover:border-visual-orange/50 transition-colors duration-300 ${
                    i === 1 ? "sm:mt-8" : i === 2 ? "sm:-mt-2" : ""
                  }`}
                >
                  <span className="block font-thmanyah-display text-[2.5rem] leading-none text-visual-orange/20 group-hover:text-visual-orange/40 transition-colors duration-300">
                    {c.n}
                  </span>
                  <h3 className="mt-3 font-thmanyah-display font-bold text-h3-sm">
                    {c.title}
                  </h3>
                  <p className="mt-2 font-thmanyah-text text-caption sm:text-body text-neutral-600 leading-6">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* العمود الأيسر: الرسم المتحول من الفوضى إلى الوضوح، ثابت أثناء التمرير وغير مُركّز */}
          <div className="lg:col-span-5 lg:order-1">
            <div className="lg:sticky lg:top-28">
              <ChaosToClarityVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
