import * as THREE from "three";

/**
 * راوي تستخدم متغيرات CSS للألوان (--color-primary, --color-visual-orange...).
 * هذه الدالة تقرأ القيمة الفعلية من الجذر وقت التشغيل بدل تثبيت hex في
 * الكود، حتى يبقى المشهد ثلاثي الأبعاد متزامنًا مع نظام الألوان دائمًا.
 * تُستدعى فقط على العميل (بعد mount) لأنها تحتاج DOM.
 */
export function readCssVarColor(varName: string, fallbackHex: string): THREE.Color {
  if (typeof window === "undefined") return new THREE.Color(fallbackHex);

  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  if (!raw) return new THREE.Color(fallbackHex);

  try {
    return new THREE.Color(raw);
  } catch {
    return new THREE.Color(fallbackHex);
  }
}

export type RawiTokens = {
  neutral0: THREE.Color;
  neutral100: THREE.Color;
  neutral300: THREE.Color;
  neutral700: THREE.Color;
  neutral900: THREE.Color;
  primary: THREE.Color; // اللمسة البنفسجية الأساسية
  quran: THREE.Color; // teal
  code: THREE.Color; // purple / primary
  math: THREE.Color; // orange
  languages: THREE.Color; // pink
};

// القيم الاحتياطية هنا تقريبية فقط لحال عدم توفر المتغير — لا تُستخدم كمصدر حقيقة.
export function readRawiTokens(): RawiTokens {
  return {
    neutral0: readCssVarColor("--color-neutral-0", "#ffffff"),
    neutral100: readCssVarColor("--color-neutral-100", "#f4f3f1"),
    neutral300: readCssVarColor("--color-neutral-300", "#d8d5d0"),
    neutral700: readCssVarColor("--color-neutral-700", "#57534e"),
    neutral900: readCssVarColor("--color-neutral-900", "#1c1a17"),
    primary: readCssVarColor("--color-primary", "#6d5bd0"),
    quran: readCssVarColor("--color-visual-teal", "#2f9e8f"),
    code: readCssVarColor("--color-primary", "#6d5bd0"),
    math: readCssVarColor("--color-visual-orange", "#e07a3f"),
    languages: readCssVarColor("--color-visual-pink", "#d9668a"),
  };
}