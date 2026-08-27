"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Button from "../components/ui/Button";
import { LINKS } from "../lib/links";

// lucide-react marka ikonlarını kaldırdığı için minimal custom SVG'ler
function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 3H22l-7.6 8.7L23 21h-6.8l-5.3-6.9L4.8 21H2l8.1-9.3L2 3h7l4.8 6.3L18.9 3Zm-1.2 16h1.9L7.4 5H5.4l12.3 14Z" />
    </svg>
  );
}

function YoutubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path
        d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

const pillars = [
  { label: "القرآن الكريم", href: LINKS.courses.quran },
  { label: "البرمجة", href: LINKS.courses.code },
  { label: "اللغات", href: LINKS.courses.languages },
  { label: "الرياضيات", href: LINKS.courses.math },
];

const company = [
  { label: "عن راوي", href: LINKS.about },
  { label: "منهجنا", href: LINKS.curriculum },
  { label: "معلمينا", href: LINKS.instructors },
  { label: "كيف تعمل المنصة؟", href: LINKS.howItWorks },
];

const support = [
  { label: "الأسئلة الشائعة", href: LINKS.faq },
  { label: "استشارات", href: LINKS.consultations },
  { label: "تواصل معنا", href: LINKS.support },
  { label: "سياسة الخصوصية", href: LINKS.privacy },
  { label: "الشروط والأحكام", href: LINKS.terms },
];

const socials = [
  { label: "Instagram", href: LINKS.social.instagram, Icon: InstagramIcon },
  { label: "Twitter", href: LINKS.social.twitter, Icon: TwitterIcon },
  { label: "Youtube", href: LINKS.social.youtube, Icon: YoutubeIcon },
];

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="relative w-full bg-neutral-900 overflow-hidden"
    >
      <div className="absolute -bottom-40 -left-24 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] rounded-full opacity-[0.12] blur-3xl pointer-events-none bg-primary" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10">
        {/* Üst satır: logo + açıklama + CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 pb-10 md:pb-14 border-b border-neutral-0/10">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/cropped_logo.png"
              alt="راوي"
              width={2048}
              height={2048}
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0"
            />
            <div>
              <p className="font-thmanyah-display font-bold text-h2-sm leading-tight text-neutral-0">
                أكاديمية راوي
              </p>
              <p className="font-thmanyah-text text-body text-neutral-400 mt-1 max-w-[280px] sm:max-w-[320px]">
                نروي المعرفة بأسلوبٍ يليق بها، خطوة بخطوة، حتى تصل.
              </p>
            </div>
          </div>

          <Button
            variant="primary-alt"
            href={LINKS.register}
            size="md"
            className="font-bold shrink-0 w-full md:w-auto"
          >
           تواصل معنا
          </Button>
        </div>

        {/* Bağlantı sütunları */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 md:gap-10 py-10 md:py-14">
          <div>
            <p className="text-body font-semibold text-neutral-500 mb-4 tracking-wide">
              المواد الدراسية
            </p>
            <ul className="flex flex-col gap-3">
              {pillars.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-caption text-neutral-300 hover:text-neutral-0 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-body font-semibold text-neutral-500 mb-4 tracking-wide">
              أكاديمية راوي
            </p>
            <ul className="flex flex-col gap-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-caption text-neutral-300 hover:text-neutral-0 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-body font-semibold text-neutral-500 mb-4 tracking-wide">
              الدعم
            </p>
            <ul className="flex flex-col gap-3">
              {support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-caption text-neutral-300 hover:text-neutral-0 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            {/* Kare foto + ortalanmış CTA butonu */}
            <div className="relative w-full aspect-3/2 rounded-lg overflow-hidden mb-6">
              <Image
                src="/backgrounds/dark/bg-1.png"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-neutral-900/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="outline"
                  href={LINKS.courses}
                  size="lg"
                  className="font-bold text-7xl"
                >
                  استكشف دوراتنا{" "}
                </Button>
              </div>
            </div>

            <p className="text-body font-semibold text-neutral-500 mb-4 tracking-wide">
              تابعنا
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-neutral-0/10 flex items-center justify-center text-neutral-400 hover:text-neutral-0 hover:border-neutral-0/30 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Alt satır */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-0/10 text-center sm:text-right">
          <p className="text-caption text-neutral-500">
            © {new Date().getFullYear()} أكاديمية راوي. جميع الحقوق محفوظة.
          </p>

          <a
            href="#top"
            className="flex items-center gap-1.5 text-caption text-neutral-400 hover:text-neutral-0 transition-colors"
          >
            العودة إلى الأعلى
            <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}