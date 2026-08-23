"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { readRawiTokens } from "./tokens";

/**
 * البيئة: منصّة أرضية محايدة تحمل ست "منشآت" مجرّدة — لا أيقونات حرفية.
 * كل منشأة تُبنى من هندسات أولية (صناديق/أسطوانات/حلقات) بمواد مطفأة
 * (roughness عالٍ) لإحساس السيراميك/الورق، مع لمسة لون واحدة رفيعة لكل
 * منشأة بدل تلوين الجسم كله. الخط الواصل بينها منحوت في السطح (Tube رفيع)
 * لا خط زخرفي عائم.
 *
 * الكاميرا تسير على منحنى مواز للمسار وتُحدَّث كل فريم من progressRef —
 * بدون setState، تفاديًا لإعادة الرسم أثناء التمرير.
 */

type SceneContentProps = {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
};

// نقاط تحكم المسار — إزاحات أفقية/عمقية غير متماثلة عمدًا
const PATH_POINTS: [number, number, number][] = [
  [-5.2, 0, 1.4], // اكتشف
  [-3.1, 0, -0.6], // تعلّم
  [-0.8, 0, 1.1], // طبّق
  [1.6, 0, -0.4], // اختبر
  [3.9, 0, 0.9], // تقدّم (يبدأ الارتفاع من هنا)
  [6.2, 0.9, -0.2], // أتقن (منصّة مرتفعة)
];

function useJourneyCurve() {
  return useMemo(
    () => new THREE.CatmullRomCurve3(PATH_POINTS.map((p) => new THREE.Vector3(...p)), false, "catmullrom", 0.35),
    [],
  );
}

function Platform({ tokens }: { tokens: ReturnType<typeof readRawiTokens> }) {
  return (
    <mesh position={[0.6, -0.15, 0.3]} receiveShadow>
      <boxGeometry args={[13.5, 0.3, 4.8]} />
      <meshPhysicalMaterial color={tokens.neutral100} roughness={0.9} metalness={0} clearcoat={0.05} />
    </mesh>
  );
}

type StageProps = {
  position: THREE.Vector3;
  tokens: ReturnType<typeof readRawiTokens>;
  revealRef: React.MutableRefObject<number[]>;
  index: number;
};

// اكتشف — حلقة منحوتة مسطّحة في السطح، إشارة إلى نقطة بداية غير مؤكدة بعد
function DiscoverMark({ position, tokens, revealRef, index }: StageProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const reveal = revealRef.current[index] ?? 0;
    if (ref.current) ref.current.scale.setScalar(0.4 + reveal * 0.6);
  });
  return (
    <group ref={ref} position={[position.x, 0.02, position.z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.32, 0.4, 48]} />
        <meshStandardMaterial color={tokens.quran} roughness={0.6} />
      </mesh>
    </group>
  );
}

// تعلّم — صفحات مطبقة تنفتح قليلًا
function LearnStack({ position, tokens, revealRef, index }: StageProps) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    const reveal = revealRef.current[index] ?? 0;
    if (group.current) {
      group.current.scale.setScalar(0.3 + reveal * 0.7);
      group.current.rotation.y = -0.15 + reveal * 0.05;
    }
  });
  const pages = 5;
  return (
    <group ref={group} position={[position.x, 0.05, position.z]}>
      {Array.from({ length: pages }).map((_, i) => (
        <mesh key={i} position={[0, i * 0.045, 0]} rotation={[0, 0, i * 0.03]} castShadow>
          <boxGeometry args={[1.1, 0.02, 0.78]} />
          <meshStandardMaterial color={tokens.neutral0} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

// طبّق — كتل معيارية مختلفة الارتفاع، مساحة عمل مصغّرة
function PracticeBlocks({ position, tokens, revealRef, index }: StageProps) {
  const group = useRef<THREE.Group>(null);
  const heights = [0.3, 0.55, 0.4];
  useFrame(() => {
    if (!group.current) return;
    const reveal = revealRef.current[index] ?? 0;
    group.current.children.forEach((child, i) => {
      const target = heights[i];
      child.scale.y = 0.05 + reveal * (target - 0.05);
      child.position.y = child.scale.y / 2;
    });
  });
  return (
    <group ref={group} position={[position.x, 0, position.z]}>
      {heights.map((_, i) => (
        <mesh key={i} position={[i * 0.42 - 0.42, 0.1, 0]} castShadow>
          <boxGeometry args={[0.32, 1, 0.32]} />
          <meshPhysicalMaterial color={tokens.code} roughness={0.55} clearcoat={0.15} />
        </mesh>
      ))}
    </group>
  );
}

// اختبر — سطح دقيق بخطوط شبكة منحوتة
function AssessSurface({ position, tokens, revealRef, index }: StageProps) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    const reveal = revealRef.current[index] ?? 0;
    if (group.current) group.current.scale.setScalar(0.4 + reveal * 0.6);
  });

  const gridLines = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const size = 0.9;
    const divisions = 5;
    for (let i = 0; i <= divisions; i++) {
      const t = -size / 2 + (size / divisions) * i;
      points.push(new THREE.Vector3(t, 0, -size / 2), new THREE.Vector3(t, 0, size / 2));
      points.push(new THREE.Vector3(-size / 2, 0, t), new THREE.Vector3(size / 2, 0, t));
    }
    return points;
  }, []);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(gridLines), [gridLines]);

  return (
    <group ref={group} position={[position.x, 0.03, position.z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[0.95, 0.02, 0.95]} />
        <meshPhysicalMaterial color={tokens.neutral0} roughness={0.4} clearcoat={0.2} />
      </mesh>
      <lineSegments position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={geometry} attach="geometry" />
        <lineBasicMaterial color={tokens.neutral700} transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

// تقدّم — درج معماري صاعد
function ProgressStairs({ position, tokens, revealRef, index }: StageProps) {
  const group = useRef<THREE.Group>(null);
  const steps = 5;
  useFrame(() => {
    if (!group.current) return;
    const reveal = revealRef.current[index] ?? 0;
    group.current.children.forEach((child, i) => {
      if (i >= steps) return; // يستثني كتلة الحافة المعدنية من التحجيم
      const stepReveal = THREE.MathUtils.clamp(reveal * steps - i, 0, 1);
      const targetHeight = 0.12 + i * 0.11;
      child.scale.y = 0.02 + stepReveal * targetHeight;
      child.position.y = child.scale.y / 2;
    });
  });
  return (
    <group ref={group} position={[position.x, 0, position.z]}>
      {Array.from({ length: steps }).map((_, i) => (
        <mesh key={i} position={[i * 0.32 - 0.6, 0, 0]} castShadow>
          <boxGeometry args={[0.3, 1, 0.5]} />
          <meshPhysicalMaterial color={tokens.neutral0} roughness={0.5} clearcoat={0.1} />
        </mesh>
      ))}
      {/* حافة معدنية مصقولة رفيعة على آخر درجة كتلميح مكافأة */}
      <mesh position={[i_last(steps) * 0.32 - 0.6, 0.62, 0.26]}>
        <boxGeometry args={[0.3, 0.015, 0.02]} />
        <meshStandardMaterial color={tokens.primary} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}
function i_last(steps: number) {
  return steps - 1;
}

// أتقن — منصّة مرتفعة مكتملة بسطح شبه شفاف
function MasteryPlinth({ position, tokens, revealRef, index }: StageProps) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    const reveal = revealRef.current[index] ?? 0;
    if (group.current) {
      group.current.scale.setScalar(0.5 + reveal * 0.5);
      group.current.position.y = position.y - 0.4 + reveal * 0.4;
    }
  });
  return (
    <group ref={group} position={[position.x, position.y, position.z]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.35, 1.3]} />
        <meshPhysicalMaterial color={tokens.neutral0} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[1.05, 0.06, 1.05]} />
        <meshPhysicalMaterial
          color={tokens.neutral0}
          transmission={0.85}
          thickness={0.4}
          roughness={0.25}
          ior={1.3}
        />
      </mesh>
      <mesh position={[0.3, 0.26, 0.3]}>
        <boxGeometry args={[0.16, 0.01, 0.02]} />
        <meshStandardMaterial color={tokens.languages} metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  );
}

// الخط المنحوت الواصل بين كل المراحل
function CarvedPath({ curve, tokens }: { curve: THREE.CatmullRomCurve3; tokens: ReturnType<typeof readRawiTokens> }) {
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 120, 0.008, 6, false), [curve]);
  return (
    <mesh position={[0, 0.01, 0]} geometry={geometry}>
      <meshStandardMaterial color={tokens.neutral700} roughness={0.7} transparent opacity={0.5} />
    </mesh>
  );
}

function CameraRig({ curve, progressRef, reducedMotion }: { curve: THREE.CatmullRomCurve3; progressRef: React.MutableRefObject<number>; reducedMotion: boolean }) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3());

  useFrame(() => {
    const t = reducedMotion ? 0.5 : THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const pointOnPath = curve.getPointAt(t);
    const aheadT = Math.min(1, t + 0.08);
    const aheadPoint = curve.getPointAt(aheadT);

    // إزاحة الكاميرا فوق المسار وإلى جانبه — منظور تصوير منتج، لا علوي مباشر
    const targetPos = new THREE.Vector3(pointOnPath.x - 0.6, pointOnPath.y + 2.1, pointOnPath.z + 3.4);
    camera.position.lerp(targetPos, reducedMotion ? 1 : 0.08);

    lookTarget.current.lerp(aheadPoint, reducedMotion ? 1 : 0.08);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

export function SceneContent({ progressRef, reducedMotion }: SceneContentProps) {
  const tokens = useMemo(() => readRawiTokens(), []);
  const curve = useJourneyCurve();
  const points = useMemo(() => PATH_POINTS.map((p) => new THREE.Vector3(...p)), []);

  const stageRevealRef = useRef<number[]>(new Array(PATH_POINTS.length).fill(0));
  const stageWindow = 1 / PATH_POINTS.length;

  useFrame(() => {
    const t = reducedMotion ? 1 : progressRef.current;
    for (let i = 0; i < PATH_POINTS.length; i++) {
      const threshold = i * stageWindow;
      const local = THREE.MathUtils.clamp((t - threshold) / stageWindow + 0.15, 0, 1);
      stageRevealRef.current[i] = local;
    }
  });

  // كل منشأة تقرأ نصيبها من التقدّم مباشرة من stageRevealRef داخل useFrame
  // الخاص بها (بلا setState)، فتتحدّث بسلاسة مع كل فريم تمرير.
  return (
    <>
      <hemisphereLight args={[tokens.neutral0.getHex(), tokens.neutral700.getHex(), 0.55]} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <ambientLight intensity={0.25} />

      <Platform tokens={tokens} />
      <CarvedPath curve={curve} tokens={tokens} />

      <DiscoverMark position={points[0]} tokens={tokens} revealRef={stageRevealRef} index={0} />
      <LearnStack position={points[1]} tokens={tokens} revealRef={stageRevealRef} index={1} />
      <PracticeBlocks position={points[2]} tokens={tokens} revealRef={stageRevealRef} index={2} />
      <AssessSurface position={points[3]} tokens={tokens} revealRef={stageRevealRef} index={3} />
      <ProgressStairs position={points[4]} tokens={tokens} revealRef={stageRevealRef} index={4} />
      <MasteryPlinth position={points[5]} tokens={tokens} revealRef={stageRevealRef} index={5} />

      <CameraRig curve={curve} progressRef={progressRef} reducedMotion={reducedMotion} />
    </>
  );
}