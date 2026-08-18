"use client";

import Button from "@/app/src/components/ui/Button";

// Button component'inin kendi variant/size union tiplerini tekrar tanımlamak yerine
// oradan türetiyoruz — Button.tsx'te tip değişirse burası otomatik güncel kalır.
type ButtonVariant = React.ComponentProps<typeof Button>["variant"];
type ButtonSize = React.ComponentProps<typeof Button>["size"];

type CTAPanelSectionProps = {
  backgroundImage: string;
  title: string;
  description: string;
  buttonHref: string;
  buttonText: string;
  /** primary | primary-alt | outline | orange — Button.tsx'teki variant seçenekleri */
  buttonVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
  /** Cam panelin arka plan/metin tonu — koyu görsellerde "light", açık/parlak görsellerde "dark" panel gerekebilir. */
  panelTone?: "light" | "dark";
};

export default function CTAPanelSection({
  backgroundImage,
  title,
  description,
  buttonHref,
  buttonText,
  buttonVariant = "primary",
  buttonSize = "lg",
  panelTone = "light",
}: CTAPanelSectionProps) {
  const isLightText = panelTone === "light"; // panel içeriği açık renk mi (koyu zeminler için)

  return (
    <section className="relative pt-16 sm:pt-20 lg:pt-28 mb-30">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className={`relative bg-neutral-900 border border-neutral-${panelTone=="light"?"900": "100"} rounded-lg overflow-hidden shadow-sm`}>
          <div
            className="relative overflow-hidden sm:min-h-[480px]"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  `${panelTone=="light"? "linear-gradient(180deg, rgba(9,9,11,0.1) 0%, rgba(9,9,11,0.25) 55%, rgba(9,9,11,0.65) 100%)": ""}`,
              }}
            />

            <div dir="rtl" className="relative z-10 flex items-center justify-center h-full p-6 sm:p-16">
              <div
                className={
                  isLightText
                    ? "w-full sm:w-[560px] rounded-sm backdrop-blur-2xl border shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] p-8 sm:p-12 flex flex-col items-center text-center bg-neutral-0/[0.08] border-neutral-0/[0.14]"
                    : "relative overflow-hidden w-full sm:w-[560px] rounded-sm backdrop-blur-2xl border shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] p-8 sm:p-12 flex flex-col items-center text-center bg-neutral-900/70 border-neutral-900/40"
                }
              >
                {/* Diyagonal glare katmanı — sadece dark modunda, tasarım sistemindeki cam panel reçetesi */}
                {!isLightText && (
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 30%, transparent 55%)",
                    }}
                  />
                )}

                <h3
                  className={`${isLightText ? "" : "relative "}font-thmanyah-display font-bold text-h3-sm sm:text-h2-sm leading-[1.35] ${
                    isLightText ? "text-neutral-0" : "text-neutral-0"
                  }`}
                >
                  {title}
                </h3>

                <p
                  className={`${isLightText ? "" : "relative "}font-thmanyah-text text-caption sm:text-body leading-6 sm:leading-7 mt-5 mb-10 max-w-[400px] ${
                    isLightText ? "text-neutral-300" : "text-neutral-300"
                  }`}
                >
                  {description}
                </p>

                <div className={isLightText ? "" : "relative"}>
                  <Button href={buttonHref} variant={buttonVariant} size={buttonSize}>
                    {buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}