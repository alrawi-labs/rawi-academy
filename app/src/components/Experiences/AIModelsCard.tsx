"use client";

export default function AIModelsCard() {
  return (
    <div className="relative bg-neutral-0 border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/backgrounds/bg-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* غلالة بيضاء خفيفة جدًا فقط لضمان وضوح البطاقات فوق الصورة دون إخفاء ألوانها */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--color-neutral-0) 12%, transparent) 0%, color-mix(in srgb, var(--color-neutral-0) 4%, transparent) 45%, color-mix(in srgb, var(--color-neutral-0) 30%, transparent) 100%)",
          }}
        />

        {/* İçerik sarmalayıcı: mobilde normal akış (dikey stack),
            lg ve üzerinde orijinal absolute konumlandırmaya geçiş */}
        <div className="relative z-10 flex flex-col gap-5 px-5 py-7 sm:px-6 sm:py-8 lg:block lg:p-0 lg:h-[560px]">
          {/* عنوان ووصف البطاقة */}
          <div
            dir="rtl"
            className="lg:absolute lg:top-10 lg:right-10 lg:z-30 max-w-full lg:max-w-sm"
          >
            <h3 className="font-thmanyah-display font-bold text-[20px] sm:text-[23px] lg:text-[26px] leading-[1.3] text-neutral-900">
              دعم الذكاء الاصطناعي
            </h3>
            <p className="font-thmanyah-text text-[13px] sm:text-[14px] leading-6 sm:leading-7 text-neutral-700 mt-2.5 sm:mt-3">
              بينما ينتهي الدرس، تبدأ مرحلةٌ جديدة من التعلّم. طوّر فريق راوي من
              المعلمين والمهندسين نماذج ذكاء اصطناعي ترافق الطالب في كل خطوة؛
              تشرح المفاهيم، وتجيب عن الأسئلة، وتقترح تمارين تناسب مستواه،
              وتتابع تقدّمه، ليبقى باب التعلّم مفتوحًا في أي وقت.
            </p>
          </div>

          {/* النافذة الزجاجية — المشهد المتحرك: فيديو الدرس / مكتب + روبوت */}
          <div
            dir="rtl"
            className="w-full lg:absolute lg:left-[6%] lg:top-[36%] lg:-translate-y-1/2 lg:w-[580px] rounded-xl overflow-hidden bg-neutral-0/45 backdrop-blur-xl border border-neutral-0/60 shadow-[0_35px_70px_-25px_rgba(20,16,40,0.3)]"
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-neutral-0/40 backdrop-blur-md border-b border-neutral-0/50">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="mx-auto flex items-center gap-1.5 text-[11px] sm:text-[12px] text-neutral-500">
                تدريس مدعوم بالذكاء الاصطناعي
              </span>
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              <svg
                viewBox="0 0 540 230"
                className="w-full h-auto ai-scene-svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="premStrokeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-neutral-300)" />
                    <stop offset="45%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-primary-hover)" />
                  </linearGradient>

                  <filter id="premLineGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3.2" />
                  </filter>

                  <linearGradient id="premPlayRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent-purple)" />
                    <stop offset="100%" stopColor="var(--color-primary-hover)" />
                  </linearGradient>

                  <linearGradient id="premDesk" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--color-neutral-300)" stopOpacity="0" />
                    <stop offset="15%" stopColor="var(--color-neutral-300)" stopOpacity="0.9" />
                    <stop offset="85%" stopColor="var(--color-neutral-300)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--color-neutral-300)" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient id="premHeadphone" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-visual-orange)" />
                    <stop offset="100%" stopColor="var(--color-orange)" />
                  </linearGradient>

                  <radialGradient id="premGloss" cx="35%" cy="25%" r="75%">
                    <stop offset="0%" stopColor="var(--color-neutral-0)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--color-neutral-0)" stopOpacity="0" />
                  </radialGradient>

                  <filter id="premSoftBlur" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="7" />
                  </filter>
                </defs>

                <circle cx="393" cy="140" r="98" fill="url(#premGlow)" filter="url(#premSoftBlur)" />

                <line x1="10" y1="200" x2="530" y2="200" stroke="url(#premDesk)" strokeWidth="2.5" />
                <line x1="26" y1="200" x2="19" y2="222" stroke="var(--color-neutral-300)" strokeOpacity="0.7" strokeWidth="1.5" />

                <ellipse cx="394" cy="204" rx="50" ry="4.5" fill="var(--color-primary)" opacity="0.12" transform="translate(-20, 20)" />

                <g fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(-20, 20)">
                  <path
                    d="M 342 200 C 333 170 340 138 360 122 C 369 115 378 111 386 110 L 394 110 C 402 111 411 115 420 122 C 440 138 447 170 438 200"
                    stroke="url(#premStrokeGrad)"
                    strokeWidth="10"
                    strokeOpacity="0.32"
                    filter="url(#premLineGlow)"
                  />
                  <circle cx="390" cy="92" r="27" stroke="url(#premStrokeGrad)" strokeWidth="10" strokeOpacity="0.28" filter="url(#premLineGlow)" />
                  <path
                    d="M 342 200 C 333 170 340 138 360 122 C 369 115 378 111 386 110 L 394 110 C 402 111 411 115 420 122 C 440 138 447 170 438 200"
                    stroke="url(#premStrokeGrad)"
                    strokeWidth="3.5"
                  />
                  <path d="M 352 196 C 345 168 352 140 366 126" stroke="var(--color-primary-light)" strokeOpacity="0.55" strokeWidth="1.5" />
                  <path d="M 374 112 L 390 128 L 406 112" stroke="url(#premStrokeGrad)" strokeWidth="3" />
                  <path d="M 380 110 L 390 122 L 400 110" stroke="url(#premStrokeGrad)" strokeWidth="1.6" strokeOpacity="0.5" />
                  <circle cx="390" cy="92" r="27" stroke="url(#premStrokeGrad)" strokeWidth="3.5" />
                </g>

                <g opacity="0.85">
                  <line x1="430" y1="50" x2="451" y2="70" stroke="var(--color-primary)" strokeOpacity="0.35" strokeWidth="1" />
                  <line x1="430" y1="50" x2="414" y2="38" stroke="var(--color-primary)" strokeOpacity="0.35" strokeWidth="1" />
                  <circle className="ai-node ai-node-1" cx="430" cy="50" r="3" fill="var(--color-primary)" />
                  <circle className="ai-node ai-node-2" cx="451" cy="70" r="2" fill="var(--color-visual-teal)" />
                  <circle className="ai-node ai-node-3" cx="414" cy="38" r="2" fill="var(--color-visual-orange)" />
                </g>

                <g className="scene scene-video">
                  <rect x="10" y="14" width="290" height="160" rx="18" fill="var(--color-neutral-0)" stroke="var(--color-neutral-200)" strokeWidth="1.5" />
                  <rect x="10" y="14" width="290" height="160" rx="18" fill="none" stroke="var(--color-primary)" strokeOpacity="0.08" strokeWidth="6" />
                  <circle cx="26" cy="30" r="4.5" fill="var(--color-visual-orange)" className="motion-safe:animate-pulse" />

                  <rect x="26" y="34" width="120" height="96" rx="8" fill="none" stroke="var(--color-primary)" strokeOpacity="0.28" strokeWidth="1.5" />
                  <path d="M 38 48 L 84 48" stroke="var(--color-primary)" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 38 58 L 68 58" stroke="var(--color-primary)" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" />

                  <path
                    className="progress-curve"
                    d="M 38 116 L 58 100 L 78 108 L 100 82 L 122 68"
                    fill="none"
                    stroke="url(#premStrokeGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1"
                  />
                  <circle cx="38" cy="116" r="2.5" fill="var(--color-primary-hover)" />
                  <circle cx="78" cy="108" r="2.5" fill="var(--color-primary-hover)" />
                  <circle cx="122" cy="68" r="3" fill="var(--color-primary-hover)" />

                  <path d="M 188 150 L 240 150" stroke="var(--color-primary)" strokeOpacity="0.15" strokeWidth="1.5" strokeLinecap="round" />

                  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path
                      d="M 196 150 C 191 128 196 112 210 106 C 216 103 226 103 232 106 C 246 112 251 128 246 150"
                      stroke="url(#premStrokeGrad)"
                      strokeWidth="2.5"
                    />
                    <path className="teacher-arm" d="M 200 116 C 182 110 164 100 152 92" stroke="url(#premStrokeGrad)" strokeWidth="2.5" />
                    <path d="M 214 106 L 221 113 L 228 106" stroke="url(#premStrokeGrad)" strokeWidth="2" />
                    <circle cx="221" cy="88" r="16" stroke="url(#premStrokeGrad)" strokeWidth="2.5" />
                    <path d="M 208 79 Q 221 66 234 79" stroke="url(#premStrokeGrad)" strokeWidth="2" />
                  </g>

                  <circle className="play-ring" cx="155" cy="94" r="46" fill="var(--color-primary)" opacity="0.05" filter="url(#premSoftBlur)" />
                  <circle cx="155" cy="94" r="40" fill="var(--color-primary)" opacity="0.07" />
                  <circle cx="155" cy="94" r="32" fill="var(--color-neutral-0)" fillOpacity="0.94" stroke="url(#premPlayRing)" strokeWidth="2.5" />
                  <path d="M 145 79 L 145 109 L 171 94 Z" fill="url(#premPlayRing)" />
                </g>

                <g className="scene scene-robot">
                  <path d="M 165 208 L 205 190 L 415 190 L 375 208 Z" fill="url(#premDesk)" opacity="0.95" />
                  <path d="M 415 190 L 205 190 L 205 184 L 415 184 Z" fill="var(--color-primary-hover)" opacity="0.16" />
                  <path d="M 165 208 L 375 208" stroke="var(--color-neutral-0)" strokeOpacity="0.4" strokeWidth="1.5" />
                  <path d="M 205 190 L 415 190" stroke="var(--color-neutral-0)" strokeOpacity="0.5" strokeWidth="1.5" />
                  <line x1="385" y1="187" x2="390" y2="176" stroke="var(--color-neutral-300)" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" />
                  <line x1="220" y1="187" x2="215" y2="176" stroke="var(--color-neutral-300)" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" />

                  <ellipse cx="269" cy="192" rx="44" ry="4" fill="var(--color-primary-hover)" opacity="0.14" filter="url(#premSoftBlur)" />

                  <path
                    d="M 230 190 L 238 182 L 300 182 L 308 190 Z"
                    fill="var(--color-neutral-0)"
                    fillOpacity="0.96"
                    stroke="url(#premPlayRing)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <rect x="259" y="185" width="20" height="3" rx="1.5" fill="url(#premPlayRing)" opacity="0.3" />
                  <g transform="rotate(8 269 182)">
                    <rect x="238" y="128" width="62" height="54" rx="7" fill="url(#premStrokeGrad)" stroke="url(#premPlayRing)" strokeWidth="2" />
                    <ellipse cx="250" cy="138" rx="16" ry="9" fill="url(#premGloss)" />
                    <path d="M 248 158 L 272 158" stroke="var(--color-neutral-0)" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 248 166 L 264 166" stroke="var(--color-neutral-0)" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
                  </g>

                  <g className="robot-float">
                    <circle cx="165" cy="112" r="78" fill="var(--color-primary)" opacity="0.05" filter="url(#premSoftBlur)" />
                    <circle cx="165" cy="112" r="64" fill="var(--color-primary)" opacity="0.06" />
                    <ellipse cx="165" cy="192" rx="48" ry="7" fill="var(--color-primary-hover)" opacity="0.14" filter="url(#premSoftBlur)" />

                    <line x1="165" y1="34" x2="165" y2="17" stroke="url(#premPlayRing)" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="165" cy="14" r="7" fill="var(--color-primary)" opacity="0.18" filter="url(#premSoftBlur)" />
                    <circle cx="165" cy="14" r="4.5" fill="url(#premHeadphone)" />

                    <rect x="118" y="34" width="94" height="60" rx="28" fill="var(--color-neutral-0)" fillOpacity="0.96" stroke="url(#premPlayRing)" strokeWidth="2.5" />
                    <ellipse cx="140" cy="50" rx="26" ry="14" fill="url(#premGloss)" />

                    <rect x="132" y="49" width="66" height="28" rx="14" fill="url(#premStrokeGrad)" />
                    <rect x="145" y="57" width="11" height="13" rx="5.5" fill="var(--color-neutral-0)" />
                    <rect x="180" y="57" width="11" height="13" rx="5.5" fill="var(--color-neutral-0)" />
                    <circle cx="148" cy="59.5" r="1.4" fill="var(--color-neutral-300)" />
                    <circle cx="183" cy="59.5" r="1.4" fill="var(--color-neutral-300)" />

                    <rect x="122" y="96" width="86" height="78" rx="27" fill="var(--color-neutral-0)" fillOpacity="0.96" stroke="url(#premPlayRing)" strokeWidth="2.5" />
                    <ellipse cx="146" cy="112" rx="24" ry="12" fill="url(#premGloss)" transform="rotate(-12 146 112)" />

                    <rect x="139" y="112" width="52" height="36" rx="13" fill="none" stroke="url(#premPlayRing)" strokeOpacity="0.28" strokeWidth="1.6" />
                    <circle cx="165" cy="130" r="4.5" fill="url(#premHeadphone)" className="motion-safe:animate-pulse" />

                    <path className="robot-arm-wave" d="M 208 122 C 222 118 232 104 229 88" fill="none" stroke="url(#premPlayRing)" strokeWidth="4" strokeLinecap="round" />
                    <circle className="robot-hand-wave" cx="229" cy="86" r="6.5" fill="var(--color-neutral-0)" stroke="url(#premPlayRing)" strokeWidth="2.5" />

                    <path d="M 122 128 C 108 134 100 148 103 162" fill="none" stroke="url(#premPlayRing)" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="103" cy="164" r="6.5" fill="var(--color-neutral-0)" stroke="url(#premPlayRing)" strokeWidth="2.5" />
                  </g>
                </g>
              </svg>

              <div className="flex items-center justify-between pt-2 mt-1 border-t border-neutral-0/40">
                <span className="text-[10px] sm:text-[10.5px] text-neutral-500">
                  بينما ينتهي الدرس، تبدأ مرحلةٌ جديدة من التعلّم...
                </span>
              </div>
            </div>
          </div>

          {/* النافذة الزجاجية — محادثة مع المعلّم الذكي الخاص بالطالب */}
{/* ⬇️ DEĞİŞTİ: hidden lg:block eklendi — bu kart artık sadece masaüstünde
    (lg ve üzeri) görünüyor, mobil/tablette gizli. Mobile özel genişlik
    class'ları (w-full, sm:max-w-96, sm:mx-auto) artık gereksiz olduğu için
    kaldırıldı. lg: altındaki diğer tüm class'lar (konum, boyut, görünüm)
    aynen korundu. */}
<div
  dir="rtl"
  className="hidden lg:block lg:absolute lg:right-[6%] lg:top-[66%] lg:-translate-y-1/2 lg:w-[380px] rounded-xl overflow-hidden bg-neutral-0/45 backdrop-blur-xl border border-neutral-0/60 shadow-[0_35px_70px_-25px_rgba(20,16,40,0.3)]"
>
  <div className="flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-neutral-0/40 backdrop-blur-md border-b border-neutral-0/50">
    <span className="w-2.5 h-2.5 rounded-full bg-neutral-0/70" />
    <span className="w-2.5 h-2.5 rounded-full bg-neutral-0/70" />
    <span className="w-2.5 h-2.5 rounded-full bg-neutral-0/70" />
    <span className="mx-auto flex items-center gap-1.5 text-[11px] sm:text-[12px] text-neutral-500">
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      معلّمك الذكي
    </span>
  </div>

  <div className="p-4 sm:p-5 space-y-3">
    <div className="flex justify-start">
      <div className="max-w-[80%] bg-neutral-0/70 backdrop-blur-md rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-sm">
        <p className="text-[12px] sm:text-[12.5px] text-neutral-700 leading-6">
          لاحظت أنك تتقن الجمع لكن تحتاج مزيدًا من التدريب على القسمة،
          سأركّز الدرس القادم عليها.
        </p>
      </div>
    </div>
    <div className="flex justify-end">
      <div className="max-w-[70%] bg-primary rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
        <p className="text-[12px] sm:text-[12.5px] text-neutral-0 leading-6">
          تمام، ممكن أمثلة أكثر؟
        </p>
      </div>
    </div>
    <div className="flex items-center justify-between pt-2 mt-1 border-t border-neutral-0/40">
      <span className="text-[10px] sm:text-[10.5px] text-neutral-500">
        نموذج الرياضيات — مخصص لك
      </span>
      <span className="text-[10px] font-semibold text-visual-teal">
        يتعلّم معك
      </span>
    </div>
  </div>
</div>

          {/* بطاقة إحصائية عائمة */}
          <div
            dir="rtl"
            className="w-full sm:max-w-96 sm:mx-auto lg:mx-0 lg:absolute lg:bottom-6 lg:right-[6%] bg-neutral-0/80 backdrop-blur-md border border-neutral-0/70 rounded-xl shadow-[0_20px_45px_-18px_rgba(80,60,180,0.3)] px-5 py-3.5 lg:max-w-[260px]"
          >
            <p className="text-[15px] sm:text-[17px] font-bold text-neutral-900 leading-snug">
              التعلم لا ينتهي بأنتهاء الدرس
            </p>
            <p className="text-[10.5px] sm:text-[11px] text-neutral-500 mt-1">
              مساعدٌ ذكي يرافق الطالب في كل خطوة من رحلته التعليمية.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scene {
          transform-box: fill-box;
        }

        .scene-video {
          transform-origin: 45% 42%;
          animation: sceneVideoCycle 11s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        .scene-robot {
          transform-origin: 55% 65%;
          animation: sceneRobotCycle 11s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        @keyframes sceneVideoCycle {
          0%,
          32% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
          40% {
            opacity: 0;
            transform: scale(0.93) translateY(-6px);
            filter: blur(9px);
          }
          90% {
            opacity: 0;
            transform: scale(0.93) translateY(-6px);
            filter: blur(9px);
          }
          98%,
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
        }

        @keyframes sceneRobotCycle {
          0%,
          38% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
            filter: blur(9px);
          }
          48% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
          84% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
          94%,
          100% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
            filter: blur(9px);
          }
        }

        .progress-curve {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawCurve 11s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes drawCurve {
          0% {
            stroke-dashoffset: 1;
          }
          10%,
          32% {
            stroke-dashoffset: 0;
          }
          40%,
          100% {
            stroke-dashoffset: 1;
          }
        }

        .play-ring {
          animation: playPulse 2.6s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes playPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.05;
          }
          50% {
            transform: scale(1.18);
            opacity: 0.14;
          }
        }

        .teacher-arm {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: teacherPoint 3.4s ease-in-out infinite;
        }
        @keyframes teacherPoint {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-3deg);
          }
        }

        .robot-float {
          animation: robotFloat 3.6s ease-in-out infinite;
        }
        @keyframes robotFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .robot-arm-wave,
        .robot-hand-wave {
          transform-box: fill-box;
          transform-origin: 30% 100%;
          animation: robotWave 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }
        @keyframes robotWave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        .ai-node {
          animation: nodeTwinkle 2.4s ease-in-out infinite;
        }
        .ai-node-1 {
          animation-delay: 0s;
        }
        .ai-node-2 {
          animation-delay: 0.6s;
        }
        .ai-node-3 {
          animation-delay: 1.2s;
        }
        @keyframes nodeTwinkle {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.35);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scene-video,
          .scene-robot,
          .progress-curve,
          .play-ring,
          .teacher-arm,
          .robot-float,
          .robot-arm-wave,
          .robot-hand-wave,
          .ai-node {
            animation: none !important;
          }
          .scene-video {
            opacity: 1;
            filter: none;
            transform: none;
          }
          .scene-robot {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}