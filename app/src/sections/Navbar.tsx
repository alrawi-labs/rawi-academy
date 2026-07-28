"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);

  const links = [
    { key: "subjects", label: "المواد الدراسية" },
    { key: "parents", label: "لأولياء الأمور" },
    { key: "teachers", label: "للمعلّمين" },
  ];

  return (
    <nav
      dir="rtl"
      className="w-full absolute top-0 left-0 z-50 border backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex items-center justify-between h-[76px]">
          {/* الشعار */}
          <div className="flex items-center shrink-0">
            <Image
              src="/logos/cropped_logo.png"
              alt="راوي"
              width={2048}
              height={2048}
              className="w-10 h-10 object-contain"
              priority
            />
            <span className="font-extrabold text-lg text-neutral-900 tracking-tight">
              أكاديمية راوي
            </span>
          </div>

          {/* الروابط */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.key}
                href="#"
                onMouseEnter={() => setHovered(link.key)}
                onMouseLeave={() => setHovered(null)}
                className="flex items-center gap-1 text-[15px] font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                {link.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform text-neutral-400 ${
                    hovered === link.key ? "rotate-180" : ""
                  }`}
                />
              </a>
            ))}

            <a
              href="#"
              className="text-[15px] font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              الأسعار
            </a>

            <span className="w-px h-4 bg-neutral-200" />

            <a
              href="#"
              className="flex items-center gap-1.5 text-[15px] font-medium text-primary-alt hover:text-primary-alt-hover transition-colors"
            >
              <Sparkles size={14} />
              دليلني
            </a>
          </div>

          {/* الأزرار */}
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="orange" href="#" size="sm">
              تسجيل الدخول
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
        </div>
      </div>
    </nav>
  );
}