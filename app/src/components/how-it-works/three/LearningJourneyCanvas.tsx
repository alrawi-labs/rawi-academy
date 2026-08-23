"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import { SceneContent } from "./SceneContent";

type LearningJourneyCanvasProps = {
  progressRef: MutableRefObject<number>;
  reducedMotion: boolean;
};

/**
 * غلاف الـCanvas: حدود دقة الجهاز (DPR) بين ١ و١.75 لضبط الأداء، ظلال
 * ناعمة محدودة، وكاميرا بزاوية رؤية معتدلة (٣٥) تفاديًا لتشوّه العدسة
 * الواسعة. Suspense هنا شكلي فقط — كل الهندسات إجرائية بلا تحميل أصول.
 */
export function LearningJourneyCanvas({ progressRef, reducedMotion }: LearningJourneyCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 35, near: 0.1, far: 50, position: [-6, 3, 6] }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <SceneContent progressRef={progressRef} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

export default LearningJourneyCanvas;