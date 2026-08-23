"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * يتابع تقدّم التمرير داخل حاوية مثبّتة (pinned) طويلة ويكتب القيمة (٠ إلى ١)
 * في ref مباشرة — لا setState لكل فريم، حتى لا يعيد React الرسم ٦٠ مرة
 * بالثانية. الحالة الوحيدة التي تتغيّر فعليًا هي رقم المرحلة النشطة،
 * وتُحدَّث فقط عند تغيّرها فعلًا (لعرض التسمية النصية المرافقة).
 */
export function useJourneyScrollProgress(
  containerRef: RefObject<HTMLElement | null>,
  stageCount: number,
) {
  const progressRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const stage = Math.min(stageCount - 1, Math.floor(self.progress * stageCount));
        setActiveStage((prev) => (prev === stage ? prev : stage));
      },
    });

    return () => trigger.kill();
  }, [containerRef, stageCount]);

  return { progressRef, activeStage };
}