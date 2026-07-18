"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

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
  className="w-full bg-transparent absolute top-0 left-0 z-50 border-b border-[var(--border-color)]"
>
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex items-center justify-between h-[76px]">
          {/* الشعار */}
          <div className="flex items-center gap-2 shrink-0">
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <defs>
                <linearGradient id="rlogo" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#7C6CFF" />
                  <stop offset="55%" stopColor="#5B4FE8" />
                  <stop offset="100%" stopColor="#22D3B8" />
                </linearGradient>
              </defs>
              <path
                d="M50 4 L78 26 L57 26 L57 44 L78 62 L57 62 L50 96 L36 62 L22 62 L22 40 L36 40 L36 62 L22 62 L22 26 L50 4 Z"
                fill="url(#rlogo)"
                fillRule="evenodd"
              />
            </svg>
            <span className="font-extrabold text-lg text-[#09090B] tracking-tight">
              راوي
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
                className="flex items-center gap-1 text-[15px] font-medium text-[#3F3F52] hover:text-[#09090B] transition-colors"
              >
                {link.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform text-[#9a9ab0] ${
                    hovered === link.key ? "rotate-180" : ""
                  }`}
                />
              </a>
            ))}

            <a
              href="#"
              className="text-[15px] font-medium text-[#3F3F52] hover:text-[#09090B] transition-colors"
            >
              الأسعار
            </a>

            <span className="w-px h-4 bg-[#d8d8e2]" />

            <a
              href="#"
              className="flex items-center gap-1.5 text-[15px] font-medium text-[#5B4FE8] hover:text-[#4438d6] transition-colors"
            >
              <Sparkles size={14} />
              دليلني
            </a>
          </div>

          {/* الأزرار */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="text-[14.5px] font-semibold text-[#F26522] bg-white border border-transparent px-5 py-2.5 rounded-sm hover:bg-[#FFF4EE] transition-colors"
            >
              تسجيل الدخول
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-[14.5px] font-bold text-white bg-[#635BFF] px-5 py-2.5 rounded-sm hover:bg-[#5349e6] transition-colors"
            >
              تواصل معنا
              <ChevronDown size={13} className="rotate-90" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}