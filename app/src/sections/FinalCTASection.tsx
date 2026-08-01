"use client";

import { useState } from "react";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function FinalCTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative pt-16 sm:pt-20 lg:pt-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="relative bg-neutral-0 border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
          <div
            className="relative overflow-hidden sm:min-h-[520px]"
            style={{
              backgroundImage: "url('/backgrounds/bg-35.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.28) 100%)",
              }}
            />

            <div
              dir="rtl"
              className="relative z-10 flex flex-col sm:flex-row items-stretch gap-6 sm:gap-10 p-5 sm:p-16 sm:h-full"
            >
              {/* Sol cam panel: İletişim — daha dar */}
              <div className="sm:flex-[0.85] rounded-xl bg-neutral-0/45 backdrop-blur-xl border border-neutral-0/60 shadow-[0_35px_70px_-25px_rgba(20,16,40,0.3)] p-7 sm:p-11 flex flex-col justify-center">
                <div
                  className="w-[14px] h-[14px] mb-7 bg-primary"
                  style={{ borderRadius: "5px 1.5px 5px 1.5px" }}
                />
                <h3 className="font-thmanyah-display font-bold text-h3-sm sm:text-h2-sm leading-[1.3] text-neutral-900">
                  هل لديك استفسار؟
                </h3>
                <p className="font-thmanyah-text text-caption sm:text-body leading-6 sm:leading-7 text-neutral-700 mt-4 mb-9 max-w-[360px]">
                  فريقنا جاهز للإجابة عن جميع استفساراتك، ومساعدتك في اختيار
                  المسار المناسب، لنبدأ رحلتك التعليمية بثقة.
                </p>
                <Button
                  href="/contact"
                  variant="outline"
                  size="lg"
                  className="!self-start"
                >
                  تواصل معنا
                </Button>
              </div>

              {/* Sağ cam panel: Bülten — daha geniş */}
              <div className="sm:flex-[1.25] relative rounded-xl bg-neutral-0/45 backdrop-blur-xl border border-neutral-0/60 shadow-[0_35px_70px_-25px_rgba(20,16,40,0.3)] p-7 sm:p-11 flex items-center gap-8 overflow-hidden">
                {/* İllüstrasyon: kağıt uçak + iki zarf — aynı gradyan/gloss dili, büyütülmüş */}
                <div className="hidden sm:flex shrink-0 items-center justify-center relative w-[150px] h-[150px]">
                  <svg
                    width="150"
                    height="150"
                    viewBox="0 0 150 150"
                    fill="none"
                  >
                    <defs>
                      <linearGradient
                        id="planeGrad"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--color-accent-teal)"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--color-visual-teal)"
                        />
                      </linearGradient>
                      <linearGradient
                        id="envelopeGrad1"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="var(--color-neutral-0)" />
                        <stop
                          offset="100%"
                          stopColor="var(--color-neutral-200)"
                        />
                      </linearGradient>
                      <linearGradient
                        id="envelopeGrad2"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--color-accent-purple)"
                        />
                        <stop offset="100%" stopColor="var(--color-primary)" />
                      </linearGradient>
                      <radialGradient id="planeGloss" cx="35%" cy="25%" r="75%">
                        <stop
                          offset="0%"
                          stopColor="var(--color-neutral-0)"
                          stopOpacity="0.65"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--color-neutral-0)"
                          stopOpacity="0"
                        />
                      </radialGradient>
                      <filter
                        id="planeSoftBlur"
                        x="-60%"
                        y="-60%"
                        width="220%"
                        height="220%"
                      >
                        <feGaussianBlur stdDeviation="8" />
                      </filter>
                    </defs>

                    {/* Arka glow */}
                    <circle
                      cx="75"
                      cy="76"
                      r="64"
                      fill="var(--color-visual-teal)"
                      opacity="0.07"
                      filter="url(#planeSoftBlur)"
                    />

                    {/* Alt zarf — mor gradyan */}
                    <g transform="translate(58 88) rotate(8)">
                      <rect
                        x="0"
                        y="0"
                        width="58"
                        height="40"
                        rx="4"
                        fill="url(#envelopeGrad2)"
                      />
                      <path
                        d="M0 4L29 26L58 4"
                        stroke="var(--color-neutral-0)"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        fill="none"
                      />
                    </g>

                    {/* Üst zarf — beyaz/gri gradyan */}
                    <g transform="translate(38 62) rotate(-6)">
                      <rect
                        x="0"
                        y="0"
                        width="52"
                        height="36"
                        rx="4"
                        fill="url(#envelopeGrad1)"
                        stroke="var(--color-neutral-300)"
                        strokeWidth="1"
                      />
                      <path
                        d="M0 3L26 23L52 3"
                        stroke="var(--color-primary)"
                        strokeOpacity="0.3"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </g>

                    {/* Uçuş izi */}
                    <path
                      d="M14 58C26 50 40 44 54 36"
                      stroke="url(#planeGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="0.5 5"
                      opacity="0.5"
                    />

                    {/* Kağıt uçak gövdesi */}
                    <g transform="rotate(-18 62 44) translate(20 -6)">
                      <path
                        d="M30 58L74 34L58 78L50 60L30 58Z"
                        fill="url(#planeGrad)"
                        stroke="var(--color-neutral-0)"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M50 60L74 34"
                        stroke="var(--color-neutral-0)"
                        strokeOpacity="0.4"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M30 58L50 60L58 78"
                        stroke="var(--color-visual-teal)"
                        strokeOpacity="0.25"
                        strokeWidth="1"
                      />
                      <ellipse
                        cx="44"
                        cy="46"
                        rx="16"
                        ry="8"
                        fill="url(#planeGloss)"
                        transform="rotate(-30 44 46)"
                      />
                    </g>

                    <circle
                      cx="98"
                      cy="26"
                      r="3"
                      fill="var(--color-visual-teal)"
                      className="motion-safe:animate-pulse"
                    />
                    <circle
                      cx="24"
                      cy="40"
                      r="2"
                      fill="var(--color-primary)"
                      opacity="0.5"
                    />
                  </svg>
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div
                    className="w-[14px] h-[14px] mb-6"
                    style={{
                      background: "var(--color-visual-teal)",
                      borderRadius: "5px 1.5px 5px 1.5px",
                    }}
                  />
                  <h3 className="font-thmanyah-display font-bold text-h3-sm sm:text-h2-sm lg:text-h2 leading-[1.25] text-neutral-900">
                    اشترك بقائمتنا البريدية
                  </h3>
                  <p className="font-thmanyah-text text-caption sm:text-body leading-6 sm:leading-7 text-neutral-700 mt-3 mb-8 max-w-[320px]">
                    ابقَ على اطلاع بكل جديد.
                  </p>

                  {submitted ? (
                    <p className="font-thmanyah-text text-body text-neutral-900">
                      تم الاشتراك بنجاح، شكرًا لك.
                    </p>
                  ) : (
                    <form
                      dir="rtl"
                      onSubmit={handleSubmit}
                      className="flex items-center rounded-full bg-neutral-0/60 backdrop-blur-md border border-neutral-0/70 p-1.5 max-w-full sm:max-w-[360px]"
                    >
                      <button
                        type="submit"
                        className="shrink-0 rounded-full bg-primary hover:bg-primary-hover text-neutral-0 font-thmanyah-text text-caption font-semibold px-5 sm:px-6 py-2.5 transition-colors"
                      >
                        اشترك
                      </button>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="بريدك الإلكتروني"
                        dir="ltr"
                        className="flex-1 min-w-0 bg-transparent px-4 font-thmanyah-text text-caption text-neutral-900 placeholder:text-neutral-400 outline-none"
                      />
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}