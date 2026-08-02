"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { X } from "lucide-react";

export type AccentColor = "teal" | "purple" | "pink" | "orange";

// Tailwind'in class'ları build-time'da tarayabilmesi için (dinamik string birleştirme
// yerine) sabit map'ler kullanıyoruz — aksi halde `focus-visible:ring-${accent}-400`
// gibi bir şey purge edilir ve hiç çalışmaz.
const ringMap: Record<AccentColor, string> = {
  teal: "focus-visible:ring-teal-400",
  purple: "focus-visible:ring-purple-400",
  pink: "focus-visible:ring-pink-400",
  orange: "focus-visible:ring-orange-400",
};

// Kapatma butonu her kartın kendi accent rengini alsın diye (sabit teal yerine)
const closeButtonMap: Record<AccentColor, string> = {
  teal: "bg-teal-200/60 text-teal-700 hover:bg-teal-300",
  purple: "bg-purple-200/90 text-purple-900 hover:bg-purple-300",
  pink: "bg-pink-200/90 text-pink-900 hover:bg-pink-300",
  orange: "bg-orange-200/90 text-orange-900 hover:bg-orange-300",
};

// Backdrop: basit fade
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

// Panel: aşağıdan yukarı, hafif esnek (spring) giriş — kapanışta hızlı ve düz çıkış
const panelVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 30, mass: 0.9 },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
  },
};

interface CardInteractiveShellProps {
  accent: AccentColor;
  title: string;
  description: string;
  /** Grid'de görünen kart yüzü */
  children: ReactNode;
  /** Modal açıldığında gösterilecek, karttan tamamen farklı olabilecek içerik
   *  (ör. kurs listesi). Verilmezse modal, kart yüzünü büyüterek gösterir. */
  modalContent?: ReactNode;
  /** Grid item'a özel class'lar (ör. `lg:col-span-2`). Bu class'lar grid
   *  container'ın DOĞRUDAN çocuğu olan dış sarmalayıcıya uygulanmalı,
   *  aksi halde col-span gibi grid class'ları çalışmaz. */
  className?: string;
}

export default function CardInteractiveShell({
  accent,
  title,
  description,
  children,
  modalContent,
  className = "",
}: CardInteractiveShellProps) {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    // Açılışta scroll konumunu her ihtimale karşı elle en üste al —
    // bazı tarayıcılarda taşan içerikli scroll container'lar başlangıçta
    // en üstte açılmayabiliyor.
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Not: <button> değil role="button" kullanıyoruz — kart içinde
          (ör. PhoneMockup'taki oynat butonu) zaten gerçek <button>'lar var,
          button içine button koymak geçersiz HTML olurdu. */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`${title} — عرض الدورات`}
        className={`group relative cursor-pointer outline-none rounded-lg
          transition-[margin] duration-300 ease-out
          hover:-mx-1 hover:z-10 focus-visible:ring-2 ${ringMap[accent]} ${className}`}
      >
        {children}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            ref={scrollRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-0 z-50
              bg-white/5 backdrop-blur-2xl backdrop-saturate-150
              px-0 sm:px-6 pt-27 sm:pt-29
              overflow-y-auto overscroll-contain
              [scrollbar-width:none] [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full min-h-[94vh] sm:min-h-[92vh] max-w-290 mx-auto
                bg-neutral-0 rounded-t-xl shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="إغلاق"
                className={`absolute top-4 left-4 sm:top-6 sm:left-6 z-20 w-11 h-11 rounded-sm
                  flex items-center justify-center cursor-pointer transition-colors
                  ${closeButtonMap[accent]}`}
              >
                <X size={20} />
              </button>

              <div className="p-6 sm:p-10 md:p-14">
                <h3 className="font-thmanyah-display font-bold text-h2-sm text-neutral-900 mb-3">
                  {title}
                </h3>
                <p className="font-thmanyah-text text-body text-neutral-500 max-w-2xl mb-10">
                  {description}
                </p>

                {modalContent ?? (
                  <div className="w-full origin-top scale-100 sm:scale-110 md:scale-125 pointer-events-none select-none">
                    {children}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}