"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronDown, Sparkles, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/ui/Button";
import NavLink from "../components/ui/NavLink";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const links = [
     {
      key: "curriculum",
      label: "منهجنا",
      href: "/curriculum",
    },
    {
      key: "subjects",
      label: "المواد الدراسية",
      href: "#",
      children: [
        { key: "quran", label: "القرآن الكريم", href: "/subjects/quran" },
        { key: "programming", label: "البرمجة", href: "/subjects/programming" },
        { key: "languages", label: "اللغات", href: "/subjects/languages" },
        { key: "math", label: "الرياضيات", href: "/subjects/math" },
      ],
    },
    {
      key: "parents",
      label: "لأولياء الأمور",
      href: "#",
      children: [
        {
          key: "how-it-works",
          label: "كيف تعمل المنصة",
          href: "/parents/how-it-works",
        },
        { key: "pricing", label: "الأسعار والباقات", href: "/parents/pricing" },
        { key: "faq", label: "الأسئلة الشائعة", href: "/parents/faq" },
      ],
    },
    {
      key: "teachers",
      label: "للمعلّمين",
      href: "#",
    },
  ];

  // Portal için: component client'ta mount olduktan sonra document.body erişilebilir
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mobil menü açıkken arka plan scroll'unu kilitle
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const mobileMenu = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] bg-neutral-900/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />

          <motion.div
            dir="rtl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[9999] w-full max-w-[360px] sm:max-w-[400px] bg-neutral-0 shadow-2xl lg:hidden flex flex-col"
          >
            {/* Üst bar */}
            <div className="flex items-center justify-between px-5 sm:px-6 h-[64px] sm:h-[70px] border-b border-neutral-200 shrink-0">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logos/cropped_logo.png"
                  alt="راوي"
                  width={2048}
                  height={2048}
                  className="w-8 h-8 object-contain"
                />
                <span className="font-extrabold text-body text-neutral-900 tracking-tight">
                  أكاديمية راوي
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Menüyü kapat"
                className="flex items-center justify-center w-9 h-9 rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* İçerik — kaydırılabilir */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6">
              <div className="flex flex-col gap-1">
                {links.map((link) => {
                  const hasChildren = !!link.children?.length;
                  const isOpen = openAccordion === link.key;

                  if (!hasChildren) {
                    return (
                      <a
                        key={link.key}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-3.5 text-h3-sm font-thmanyah-display font-semibold text-neutral-900 border-b border-neutral-200"
                      >
                        {link.label}
                      </a>
                    );
                  }

                  return (
                    <div key={link.key} className="border-b border-neutral-200">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenAccordion(isOpen ? null : link.key)
                        }
                        className="w-full flex items-center justify-between py-3.5"
                      >
                        <span className="text-h3-sm font-thmanyah-display font-semibold text-neutral-900">
                          {link.label}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-neutral-500 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pb-3 pr-3">
                              {link.children!.map((child) => (
                                <a
                                  key={child.key}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-2 text-body text-neutral-700 hover:text-primary transition-colors"
                                >
                                  {child.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <a
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="py-3.5 text-h3-sm font-thmanyah-display font-semibold text-neutral-900 border-b border-neutral-200"
                >
                  الأسعار
                </a>

                <a
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 py-4 text-body font-medium text-primary-alt"
                >
                  <Sparkles size={14} />
                  دليلني
                </a>
              </div>
            </div>

            {/* Alt aksiyon butonları */}
            <div className="flex flex-col gap-3 px-5 sm:px-6 py-6 border-t border-neutral-200 shrink-0">
              <Button
                variant="orange"
                href="#"
                size="md"
                className="w-full justify-center"
              >
                سجل الان{" "}
              </Button>
              <Button
                variant="primary-alt"
                href="#"
                icon={<ChevronDown size={13} className="rotate-90" />}
                className="font-bold w-full justify-center"
                size="md"
              >
                تواصل معنا
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <nav
      dir="rtl"
      className="w-full absolute top-0 left-0 z-50 border backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-[64px] sm:h-[70px] lg:h-[76px]">
          {/* الشعار */}
          <div className="flex items-center shrink-0">
            <Image
              src="/logos/cropped_logo.png"
              alt="راوي"
              width={2048}
              height={2048}
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain"
              priority
            />
            <span className="font-extrabold text-body sm:text-h3-sm text-neutral-900 tracking-tight whitespace-nowrap">
              أكاديمية راوي
            </span>
          </div>

          {/* الروابط — sadece geniş ekranlarda */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {links.map((link) => (
              <NavLink
                context="navbar"
                key={link.key}
                href={link.href}
                items={link.children}
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink context="navbar" href="#">
              الأسعار
            </NavLink>

            <span className="w-px h-4 bg-neutral-200" />
            <a
              href="#"
              className="flex items-center gap-1.5 text-body font-medium text-primary-alt hover:text-primary-alt-hover transition-colors whitespace-nowrap"
            >
              <Sparkles size={14} />
              دليلني
            </a>
          </div>

          {/* الأزرار — geniş ekran */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Button variant="orange" href="#" size="sm">
              سجل الان{" "}
            </Button>

            <Button
              variant="primary-alt"
              href="#"
              icon={<ChevronDown size={13} className="rotate-90" />}
              className="font-bold"
              size="sm"
            >
              تواصل معنا
            </Button>
          </div>

          {/* Mobil / tablet: hamburger butonu */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Menüyü aç"
            className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-neutral-900 hover:bg-neutral-100 transition-colors shrink-0"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobil menü artık body'ye portal ile render ediliyor */}
      {mounted && createPortal(mobileMenu, document.body)}
    </nav>
  );
}
