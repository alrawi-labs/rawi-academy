"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";

/* ============================================================================
   مخارج الحروف — Rawi Academy
   ----------------------------------------------------------------------------
   بنية الرحلة التعليمية:
     مقدمة → المناطق الخمس → التفاصيل داخل كل منطقة → الحرف الواحد →
     النطق → العلاقة بين الحروف → تطبيق → تصحيح ومراجعة

   العنصر البصري المحوري (signature element): مقطع الرأس الجانبي (profile)
   يُرسم بنفسه عند الدخول، ثم يبقى "مرساة مكانية" هادئة طوال الرحلة —
   نقطة توهج واحدة تنتقل عليه لتُخبرك أين أنت الآن، دون قوائم جانبية
   ولا فتات خبز تقليدية.
   ========================================================================== */

/* ------------------------------- Data model ------------------------------- */

type AreaId = "jawf" | "halq" | "lisan" | "shafatan" | "khaishum";

type Letter = {
  id: string;
  glyph: string;
  areaId: AreaId;
  pointId: string;
  description: string;
  compareNote?: string;
  example: string;
  audioSrc?: string;
  altFormId?: string; // ex: waw/ya have two articulation identities
  altFormLabel?: string;
};

type Point = {
  id: string;
  areaId: AreaId;
  label: string;
  note?: string;
  letterIds: string[];
};

type Area = {
  id: AreaId;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  detail: string;
  pointIds: string[];
  coord: { x: number; y: number };
};

const AREAS: Area[] = [
  {
    id: "jawf",
    number: "١",
    name: "الجوف",
    subtitle: "التجويف الممتد",
    description: "لا نقطة تلامس هنا؛ الصوت يخرج حرًّا من التجويف بين الفم والحلق.",
    detail:
      "الجوف ليس نقطة، بل مسافة. حروف المدّ الثلاثة — الألف والواو والياء الساكنتان بعد ما يناسبهما من الحركة — تخرج من هذا الفراغ الممتد دون أن يلمس اللسان أو الشفتان شيئًا. لهذا سُمّيت \"حروف الهواء\": الصوت يمتد فيها بلا حاجز.",
    pointIds: ["jawf-madd"],
    coord: { x: 200, y: 200 },
  },
  {
    id: "halq",
    number: "٢",
    name: "الحلق",
    subtitle: "ثلاث نقاط متتالية",
    description: "من أقصى الحلق قرب الصدر، مرورًا بوسطه، وانتهاءً بأدناه الأقرب للفم.",
    detail:
      "الحلق أنبوب واحد، لكنه يُقسَّم تعليميًّا إلى ثلاث مراحل متتالية. كل زوج من الحروف يشترك في نفس المرحلة، ويفترق في صفة واحدة: الشدة أو الرخاوة، الهمس أو الجهر. أقصى الحلق أبعد نقطة عن الفم، وأدنى الحلق أقربها.",
    pointIds: ["halq-aqsa", "halq-wasat", "halq-adna"],
    coord: { x: 158, y: 340 },
  },
  {
    id: "lisan",
    number: "٣",
    name: "اللسان",
    subtitle: "أكبر المخارج وأدقّها",
    description: "عشر نقاط تلامس بين اللسان والحنك أو الأسنان، من أقصاه إلى طرفه.",
    detail:
      "وحده اللسان مسؤول عن ثمانية عشر حرفًا تقريبًا — أكثر من نصف اللغة. يتحرك من أقصاه عند اللهاة إلى طرفه عند أصول الثنايا، مغيّرًا نقطة تلامسه بدرجات دقيقة جدًّا. الفرق بين حرفين متجاورين هنا قد لا يتجاوز مليمترات على سطح اللسان، ومع ذلك يُغيّر الحرف كليًّا.",
    pointIds: [
      "lisan-q",
      "lisan-k",
      "lisan-jsy",
      "lisan-dad",
      "lisan-lam",
      "lisan-nr",
      "lisan-tdt",
      "lisan-szs",
      "lisan-zdth",
    ],
    coord: { x: 172, y: 232 },
  },
  {
    id: "shafatan",
    number: "٤",
    name: "الشفتان",
    subtitle: "تلامس، انطباق، انفتاح",
    description: "ثلاث حالات مختلفة: تلامس جزئي مع الأسنان، انطباق تام، أو انفتاح مستدير.",
    detail:
      "الشفتان أبسط أعضاء النطق حركةً وأوضحها للعين. تارة تكتفي الشفة السفلى بلمس أطراف الثنايا العليا، وتارة تنطبق الشفتان كليًّا، وتارة تنفتحان في استدارة لا تلامس فيها إطلاقًا — وهذه الحالة الأخيرة هي التي تصنع حرف المدّ الواوي، أخو الواو الساكنة التي تخرج من الجوف.",
    pointIds: ["shafatan-f", "shafatan-bm", "shafatan-w"],
    coord: { x: 233, y: 183 },
  },
  {
    id: "khaishum",
    number: "٥",
    name: "الخيشوم",
    subtitle: "مخرج الغنّة",
    description: "لا حرف مستقل يخرج منه، بل صفة الغنّة التي تلازم النون والميم.",
    detail:
      "الخيشوم هو التجويف الأنفي، ولا يخرج منه حرف بذاته — بل يخرج منه \"الغنّة\"، وهي صوت يُصاحب النون والميم في حالات محددة: عند التشديد، وعند الإخفاء، والإدغام بغنة، والإقلاب. أدرْ إصبعك على أنفك وأنت تُشدِّد الميم — ستشعر بالاهتزاز هناك.",
    pointIds: ["khaishum-ghunna"],
    coord: { x: 232, y: 118 },
  },
];

const POINTS: Point[] = [
  { id: "jawf-madd", areaId: "jawf", label: "امتداد الجوف", letterIds: ["alif", "waw-madd", "ya-madd"] },
  { id: "halq-aqsa", areaId: "halq", label: "أقصى الحلق", letterIds: ["hamza", "ha6"] },
  { id: "halq-wasat", areaId: "halq", label: "وسط الحلق", letterIds: ["ain", "haa"] },
  { id: "halq-adna", areaId: "halq", label: "أدنى الحلق", letterIds: ["ghain", "kha"] },
  { id: "lisan-q", areaId: "lisan", label: "أقصى اللسان مع الحنك واللهاة", letterIds: ["qaf"] },
  { id: "lisan-k", areaId: "lisan", label: "أقصى اللسان، أسفل مخرج القاف", letterIds: ["kaf"] },
  { id: "lisan-jsy", areaId: "lisan", label: "وسط اللسان مع وسط الحنك", letterIds: ["jim", "shin", "ya-mutaharrik"] },
  { id: "lisan-dad", areaId: "lisan", label: "حافة اللسان مع الأضراس العليا", letterIds: ["dad"] },
  { id: "lisan-lam", areaId: "lisan", label: "حافة اللسان مع اللثة العليا", letterIds: ["lam"] },
  { id: "lisan-nr", areaId: "lisan", label: "طرف اللسان مع اللثة", letterIds: ["nun", "ra"] },
  { id: "lisan-tdt", areaId: "lisan", label: "طرف اللسان مع أصول الثنايا", letterIds: ["ta2", "dal", "taa"] },
  { id: "lisan-szs", areaId: "lisan", label: "طرف اللسان قرب الثنايا", letterIds: ["sad", "zay", "sin"] },
  { id: "lisan-zdth", areaId: "lisan", label: "طرف اللسان مع أطراف الثنايا", letterIds: ["za", "thal", "tha"] },
  { id: "shafatan-f", areaId: "shafatan", label: "بطن الشفة السفلى مع الثنايا العليا", letterIds: ["fa"] },
  { id: "shafatan-bm", areaId: "shafatan", label: "انطباق الشفتين", letterIds: ["ba", "mim"] },
  { id: "shafatan-w", areaId: "shafatan", label: "انفتاح الشفتين واستدارتهما", letterIds: ["waw-shafawi"] },
  { id: "khaishum-ghunna", areaId: "khaishum", label: "الغنّة", note: "ليست حرفًا مستقلًا", letterIds: ["nun-ghunna", "mim-ghunna"] },
];

const LETTERS: Letter[] = [
  { id: "alif", glyph: "ا", areaId: "jawf", pointId: "jawf-madd", example: "قَالَ", description: "امتداد صوتي حر من الجوف، لا يسبقه إلا فتحة، ولا يتحرك بذاته أبدًا." },
  { id: "waw-madd", glyph: "و", areaId: "jawf", pointId: "jawf-madd", example: "نُوحٌ", description: "مدّ ساكن يخرج من الجوف إذا سبقته ضمة، بلا تلامس للشفتين.", altFormId: "waw-shafawi", altFormLabel: "و المتحركة (الشفتان)" },
  { id: "ya-madd", glyph: "ي", areaId: "jawf", pointId: "jawf-madd", example: "قِيلَ", description: "مدّ ساكن يخرج من الجوف إذا سبقته كسرة، دون تلامس اللسان بالحنك.", altFormId: "ya-mutaharrik", altFormLabel: "ي المتحركة (وسط اللسان)" },

  { id: "hamza", glyph: "ء", areaId: "halq", pointId: "halq-aqsa", example: "أَمَرَ", description: "من أقصى الحلق، بانطباق تام للوترين الصوتيين ثم انفراجهما فجأة.", compareNote: "شديدة، بخلاف الهاء الرخوة المجاورة لها." },
  { id: "ha6", glyph: "ه", areaId: "halq", pointId: "halq-aqsa", example: "هُدًى", description: "من أقصى الحلق أيضًا، لكن بجريان الصوت لا بانحباسه.", compareNote: "رخوة مهموسة، بخلاف الهمزة الشديدة." },
  { id: "ain", glyph: "ع", areaId: "halq", pointId: "halq-wasat", example: "عِلْمٌ", description: "من وسط الحلق، صوت مجهور يهتز فيه الوتران الصوتيان بوضوح.", compareNote: "مجهورة، بخلاف الحاء المهموسة المجاورة." },
  { id: "haa", glyph: "ح", areaId: "halq", pointId: "halq-wasat", example: "حَكِيمٌ", description: "من نفس نقطة العين تقريبًا، لكن بصوت مهموس لا اهتزاز فيه.", compareNote: "مهموسة، بخلاف العين المجهورة." },
  { id: "ghain", glyph: "غ", areaId: "halq", pointId: "halq-adna", example: "غَفُورٌ", description: "من أدنى الحلق، الأقرب إلى الفم، بصوت مجهور رخو.", compareNote: "مجهورة، بخلاف الخاء المهموسة." },
  { id: "kha", glyph: "خ", areaId: "halq", pointId: "halq-adna", example: "خَبِيرٌ", description: "من نفس نقطة الغين، لكن بهمس واحتكاك أخشن.", compareNote: "مهموسة، بخلاف الغين المجهورة." },

  { id: "qaf", glyph: "ق", areaId: "lisan", pointId: "lisan-q", example: "قَلَمٌ", description: "أقصى اللسان يرتفع ليلامس ما يقابله من الحنك الأعلى عند اللهاة.", compareNote: "أبعد نقطة لسانية عن الفم، ولذلك صوتها الأعمق." },
  { id: "kaf", glyph: "ك", areaId: "lisan", pointId: "lisan-k", example: "كَرِيمٌ", description: "أقصى اللسان أيضًا، لكن أسفل مخرج القاف قليلًا وأقرب إلى مقدمة الفم.", compareNote: "أقرب إلى الفم من القاف، فصوتها أخف." },
  { id: "jim", glyph: "ج", areaId: "lisan", pointId: "lisan-jsy", example: "جَنَّةٌ", description: "وسط اللسان يرتفع إلى وسط الحنك الأعلى في تلامس تام.", compareNote: "شديدة مجهورة، بخلاف الشين الرخوة المجاورة." },
  { id: "shin", glyph: "ش", areaId: "lisan", pointId: "lisan-jsy", example: "شَمْسٌ", description: "نفس نقطة الجيم تقريبًا، لكن بتفريج يسمح للهواء بالجريان.", compareNote: "رخوة مهموسة، ينتشر صوتها (تفشٍّ) أكثر من الجيم." },
  { id: "ya-mutaharrik", glyph: "ي", areaId: "lisan", pointId: "lisan-jsy", example: "يُسْرٌ", description: "حين تكون متحركة لا ساكنة ممدودة، يقترب وسط اللسان من وسط الحنك دون التصاق كامل.", altFormId: "ya-madd", altFormLabel: "ي الساكنة الممدودة (الجوف)" },
  { id: "dad", glyph: "ض", areaId: "lisan", pointId: "lisan-dad", example: "ضَرَبَ", description: "إحدى حافتي اللسان (أو كلتاهما) تلامس الأضراس العليا في أطول مسافة تلامس بين المخارج.", compareNote: "أصعب الحروف نطقًا لغير أهل العربية؛ مطبقة مفخمة." },
  { id: "lam", glyph: "ل", areaId: "lisan", pointId: "lisan-lam", example: "لَيْلٌ", description: "حافة اللسان من طرفه تقريبًا إلى وسطه تلامس لثة الأسنان العليا وما يحاذيها من الحنك." },
  { id: "nun", glyph: "ن", areaId: "lisan", pointId: "lisan-nr", example: "نُورٌ", description: "طرف اللسان يلامس اللثة العليا، أسفل مخرج اللام قليلًا.", compareNote: "قريبة من مخرج الراء، لكنها أخف تلامسًا." },
  { id: "ra", glyph: "ر", areaId: "lisan", pointId: "lisan-nr", example: "رَحْمَةٌ", description: "قريب من مخرج النون، لكن ظهر اللسان يدخل أكثر قليلًا، وفيها انحراف وتكرار خفيف.", compareNote: "أدخل في ظهر اللسان من النون، وفيها تكرار لا يُبالَغ فيه." },
  { id: "ta2", glyph: "ط", areaId: "lisan", pointId: "lisan-tdt", example: "طَيِّبٌ", description: "طرف اللسان مع أصول الثنايا العليا، مع إطباق يرفع ظهر اللسان نحو الحنك فيُفخَّم الصوت.", compareNote: "مطبقة مفخمة، بخلاف التاء والدال المرقّقتين." },
  { id: "dal", glyph: "د", areaId: "lisan", pointId: "lisan-tdt", example: "دُنْيَا", description: "نفس نقطة الطاء، لكن دون إطباق، وبصوت مجهور شديد.", compareNote: "مجهورة، بخلاف التاء المهموسة المجاورة." },
  { id: "taa", glyph: "ت", areaId: "lisan", pointId: "lisan-tdt", example: "تَقْوَى", description: "نفس النقطة أيضًا، لكن بهمس لا اهتزاز فيه.", compareNote: "مهموسة، بخلاف الدال المجهورة." },
  { id: "sad", glyph: "ص", areaId: "lisan", pointId: "lisan-szs", example: "صَبْرٌ", description: "طرف اللسان قرب الثنايا مع صفير وإطباق يُفخِّم الصوت.", compareNote: "مطبقة صفيرية، أثقل من السين المرقّقة." },
  { id: "zay", glyph: "ز", areaId: "lisan", pointId: "lisan-szs", example: "زَيْتُونٌ", description: "نفس النقطة، صفير مع جهر بلا إطباق." },
  { id: "sin", glyph: "س", areaId: "lisan", pointId: "lisan-szs", example: "سَلَامٌ", description: "نفس النقطة، صفير مع همس بلا إطباق.", compareNote: "الصاد والزاي والسين نقطة واحدة، يفرّقها الإطباق والهمس والجهر." },
  { id: "za", glyph: "ظ", areaId: "lisan", pointId: "lisan-zdth", example: "ظُلْمٌ", description: "طرف اللسان بين الثنايا العليا والسفلى، مع إطباق وجهر.", compareNote: "مطبقة مجهورة، أثقل أخواتها." },
  { id: "thal", glyph: "ذ", areaId: "lisan", pointId: "lisan-zdth", example: "ذِكْرٌ", description: "نفس النقطة، جهر بلا إطباق." },
  { id: "tha", glyph: "ث", areaId: "lisan", pointId: "lisan-zdth", example: "ثَوَابٌ", description: "نفس النقطة، همس بلا إطباق.", compareNote: "الظاء والذال والثاء نقطة واحدة بين الأسنان، يفرّقها الإطباق والجهر." },

  { id: "fa", glyph: "ف", areaId: "shafatan", pointId: "shafatan-f", example: "فَجْرٌ", description: "باطن الشفة السفلى يلامس أطراف الثنايا العليا برفق." },
  { id: "ba", glyph: "ب", areaId: "shafatan", pointId: "shafatan-bm", example: "بَيْتٌ", description: "انطباق تام للشفتين، صوت شديد مجهور ينفجر عند الانفتاح.", compareNote: "بلا غنة، بخلاف الميم المجاورة لها في نفس المخرج." },
  { id: "mim", glyph: "م", areaId: "shafatan", pointId: "shafatan-bm", example: "مَاءٌ", description: "نفس انطباق الباء، لكن الهواء يمرّ عبر الخيشوم فتصحبها غنة.", compareNote: "تشارك الباء المخرج، وتنفرد بالغنة الخيشومية." },
  { id: "waw-shafawi", glyph: "و", areaId: "shafatan", pointId: "shafatan-w", example: "وَعْدٌ", description: "حين تكون متحركة لا ممدودة، تنفتح الشفتان وتستديران دون أي تلامس.", altFormId: "waw-madd", altFormLabel: "و الساكنة الممدودة (الجوف)" },

  { id: "nun-ghunna", glyph: "ن", areaId: "khaishum", pointId: "khaishum-ghunna", example: "إِنَّ", description: "عند تشديد النون أو إخفائها أو إدغامها بغنة، يعبر جزء من الصوت إلى الخيشوم." },
  { id: "mim-ghunna", glyph: "م", areaId: "khaishum", pointId: "khaishum-ghunna", example: "ثُمَّ", description: "عند تشديد الميم أو إخفائها الشفوي، تظهر الغنة من الخيشوم بوضوح أكبر." },
];

const AREA_MAP = new Map(AREAS.map((a) => [a.id, a]));
const POINT_MAP = new Map(POINTS.map((p) => [p.id, p]));
const LETTER_MAP = new Map(LETTERS.map((l) => [l.id, l]));

function lettersOfPoint(pointId: string): Letter[] {
  const point = POINT_MAP.get(pointId);
  if (!point) return [];
  return point.letterIds.map((id) => LETTER_MAP.get(id)!).filter(Boolean);
}
function lettersOfArea(areaId: AreaId): Letter[] {
  return LETTERS.filter((l) => l.areaId === areaId);
}
function neighborsOf(letter: Letter): Letter[] {
  return lettersOfPoint(letter.pointId).filter((l) => l.id !== letter.id);
}

/* --------------------------------- Stages --------------------------------- */

type Stage = "intro" | "map" | "area" | "letter" | "practice" | "review";

const STAGE_ORDER: { id: Stage; number: string; label: string }[] = [
  { id: "intro", number: "١", label: "مقدمة" },
  { id: "map", number: "٢", label: "المناطق" },
  { id: "area", number: "٣", label: "التفاصيل" },
  { id: "letter", number: "٤", label: "الحروف" },
  { id: "practice", number: "٥", label: "التطبيق" },
];

/* ------------------------------- Practice model ------------------------------ */

type Question =
  | { kind: "identify-area"; letterId: string; options: AreaId[]; correct: AreaId }
  | { kind: "select-letters"; pointId: string; options: string[]; correct: string[] }
  | { kind: "odd-one-out"; letterIds: string[]; correct: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(): Question[] {
  const qs: Question[] = [];

  // 1) identify-area — from a spread of letters
  const sampleLetters = shuffle(LETTERS).slice(0, 4);
  for (const l of sampleLetters) {
    const distractors = shuffle(AREAS.map((a) => a.id).filter((id) => id !== l.areaId)).slice(0, 2);
    qs.push({
      kind: "identify-area",
      letterId: l.id,
      options: shuffle([l.areaId, ...distractors]),
      correct: l.areaId,
    });
  }

  // 2) select-letters — points with 2+ letters
  const richPoints = POINTS.filter((p) => p.letterIds.length >= 2);
  for (const p of shuffle(richPoints).slice(0, 3)) {
    const correct = p.letterIds;
    const otherLetters = LETTERS.filter((l) => l.pointId !== p.id).map((l) => l.id);
    const distractors = shuffle(otherLetters).slice(0, Math.max(2, 6 - correct.length));
    qs.push({
      kind: "select-letters",
      pointId: p.id,
      options: shuffle([...correct, ...distractors]),
      correct,
    });
  }

  // 3) odd-one-out
  for (const p of shuffle(richPoints).slice(0, 2)) {
    const same = shuffle(p.letterIds).slice(0, Math.min(3, p.letterIds.length));
    const oddCandidates = LETTERS.filter((l) => l.pointId !== p.id);
    const odd = shuffle(oddCandidates)[0];
    if (!odd) continue;
    qs.push({
      kind: "odd-one-out",
      letterIds: shuffle([...same, odd.id]),
      correct: odd.id,
    });
  }

  return shuffle(qs);
}

/* --------------------------------- Helpers -------------------------------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ---- Anatomically-shaped sagittal head/mouth profile (viewBox 0 0 360 480) ----
   Face oriented right: forehead → nose → lips → chin → jaw → neck.
   Coordinates were checked against AREAS[].coord so the glowing dots land on
   the correct anatomical spots (nose/nasal cavity, lips, tongue, pharynx). */

const HEAD_PATH =
  "M 150.0,45.0 C 168.8,40.0 187.8,52.8 200.0,60.0 C 212.2,67.2 212.7,76.7 223.0,88.0 " +
  "C 233.3,99.3 258.5,116.3 262.0,128.0 C 265.5,139.7 245.0,149.0 244.0,158.0 " +
  "C 243.0,167.0 257.8,174.3 256.0,182.0 C 254.2,189.7 235.3,196.0 233.0,204.0 " +
  "C 230.7,212.0 247.2,221.0 242.0,230.0 C 236.8,239.0 214.5,249.3 202.0,258.0 " +
  "C 189.5,266.7 175.7,271.7 167.0,282.0 C 158.3,292.3 154.2,305.7 150.0,320.0 " +
  "C 145.8,334.3 149.3,360.0 142.0,368.0 C 134.7,376.0 113.3,376.0 106.0,368.0 " +
  "C 98.7,360.0 102.0,334.3 98.0,320.0 C 94.0,305.7 86.0,298.7 82.0,282.0 " +
  "C 78.0,265.3 75.7,242.0 74.0,220.0 C 72.3,198.0 69.8,171.7 72.0,150.0 " +
  "C 74.2,128.3 74.0,107.5 87.0,90.0 C 100.0,72.5 131.2,50.0 150.0,45.0 Z";

const NASAL_PATH =
  "M 262.0,128.0 C 258.0,125.2 251.2,118.2 242.0,114.0 C 232.8,109.8 226.4,109.0 216.0,107.0 " +
  "C 205.6,105.0 200.0,103.4 190.0,104.0 C 180.0,104.6 174.0,106.4 166.0,110.0 " +
  "C 158.0,113.6 153.2,119.6 150.0,122.0";

const PALATE_PATH =
  "M 256.0,182.0 C 250.0,179.2 237.2,172.8 226.0,168.0 C 214.8,163.2 210.4,161.2 200.0,158.0 " +
  "C 189.6,154.8 184.0,159.2 174.0,152.0 C 164.0,144.8 154.8,128.0 150.0,122.0";

const PHARYNX_PATH =
  "M 150.0,122.0 C 147.2,129.2 141.2,142.4 136.0,158.0 C 130.8,173.6 128.0,182.4 124.0,200.0 " +
  "C 120.0,217.6 118.4,228.0 116.0,246.0 C 113.6,264.0 112.0,273.2 112.0,290.0 " +
  "C 112.0,306.8 115.2,322.0 116.0,330.0";

const TONGUE_PATH =
  "M 246.0,194.0 C 245.0,189.5 229.7,190.0 222.0,187.0 C 214.3,184.0 207.3,179.5 200.0,176.0 " +
  "C 192.7,172.5 185.3,167.5 178.0,166.0 C 170.7,164.5 162.3,164.3 156.0,167.0 " +
  "C 149.7,169.7 143.5,175.2 140.0,182.0 C 136.5,188.8 134.0,200.0 135.0,208.0 " +
  "C 136.0,216.0 140.2,224.7 146.0,230.0 C 151.8,235.3 161.0,239.0 170.0,240.0 " +
  "C 179.0,241.0 190.3,240.3 200.0,236.0 C 209.7,231.7 220.3,221.0 228.0,214.0 " +
  "C 235.7,207.0 247.0,198.5 246.0,194.0 Z";

const TEETH_UPPER = "M258,187 L270,181";
const TEETH_LOWER = "M237,201 L249,197";

/* ----------------------------- ProfileAnchor ------------------------------ */
/* Persistent spatial anchor: draws itself once (real sagittal head profile
   with nasal cavity, palate, pharynx and tongue), then shows a single glowing
   dot that migrates to the active area's coordinate. This is the experience's
   one signature element — quiet everywhere except where it matters. */

function ProfileAnchor({
  size,
  activeAreaId,
  interactive,
  onSelectArea,
}: {
  size: "hero" | "rail";
  activeAreaId: AreaId | null;
  interactive: boolean;
  onSelectArea?: (id: AreaId) => void;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const reduced = usePrefersReducedMotion();
  const drawnOnce = useRef(false);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || drawnOnce.current || size !== "hero") return;
    drawnOnce.current = true;
    if (reduced) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", delay: 0.2 });
  }, [reduced, size]);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || !activeAreaId) return;
    const area = AREA_MAP.get(activeAreaId)!;
    if (reduced) {
      gsap.set(dot, { attr: { cx: area.coord.x, cy: area.coord.y } });
      return;
    }
    gsap.to(dot, {
      attr: { cx: area.coord.x, cy: area.coord.y },
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, [activeAreaId, reduced]);

  return (
    <svg
      viewBox="0 0 360 480"
      className={size === "hero" ? "h-full w-full" : "h-full w-full opacity-70"}
      fill="none"
      role="img"
      aria-label="مقطع توضيحي لمناطق النطق"
    >
      <defs>
        <filter id="mkh-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* الرأس — المخطط الخارجي (سحب ذاتي عند الدخول) */}
      <path d={HEAD_PATH} stroke="var(--color-visual-teal)" strokeOpacity="0.25" strokeWidth="8" strokeLinejoin="round" filter="url(#mkh-glow)" />
      <path ref={pathRef} d={HEAD_PATH} stroke="var(--color-neutral-300)" strokeOpacity="0.6" strokeWidth="1.6" strokeLinejoin="round" />

      {/* اللسان — ممتلئ */}
      <path d={TONGUE_PATH} fill="var(--color-visual-teal)" fillOpacity="0.12" stroke="var(--color-neutral-500)" strokeOpacity="0.5" strokeWidth="1" />

      {/* الحنك وسقف الفم */}
      <path d={PALATE_PATH} fill="none" stroke="var(--color-neutral-500)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 3" />

      {/* البلعوم / الحلق */}
      <path d={PHARYNX_PATH} fill="none" stroke="var(--color-neutral-500)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 3" />

      {/* التجويف الأنفي */}
      <path d={NASAL_PATH} fill="none" stroke="var(--color-neutral-500)" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="1.5 3" />

      {/* الأسنان عند فتحة الفم */}
      <path d={TEETH_UPPER} stroke="var(--color-neutral-400)" strokeOpacity="0.6" strokeWidth="1.4" />
      <path d={TEETH_LOWER} stroke="var(--color-neutral-400)" strokeOpacity="0.6" strokeWidth="1.4" />

      {activeAreaId && (
        <>
          <circle
            cx={AREA_MAP.get(activeAreaId)!.coord.x}
            cy={AREA_MAP.get(activeAreaId)!.coord.y}
            r="14"
            fill="var(--color-visual-teal)"
            opacity="0.16"
            filter="url(#mkh-glow)"
          />
          <circle ref={dotRef} cx={AREA_MAP.get(activeAreaId)!.coord.x} cy={AREA_MAP.get(activeAreaId)!.coord.y} r="4.5" fill="var(--color-visual-teal)" />
        </>
      )}

      {interactive &&
        AREAS.map((a) => (
          <g key={a.id}>
            <circle
              cx={a.coord.x}
              cy={a.coord.y}
              r="20"
              fill="transparent"
              className="cursor-pointer"
              onClick={() => onSelectArea?.(a.id)}
              role="button"
              aria-label={a.name}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelectArea?.(a.id);
              }}
            />
            <circle
              cx={a.coord.x}
              cy={a.coord.y}
              r={a.id === activeAreaId ? 9 : 6}
              fill="none"
              stroke={a.id === activeAreaId ? "var(--color-visual-teal)" : "var(--color-neutral-500)"}
              strokeWidth="1.4"
              className="pointer-events-none transition-all duration-300"
            />
          </g>
        ))}
    </svg>
  );
}

/* --------------------------------- StageRail -------------------------------- */

function StageRail({
  stage,
  maxReachedIndex,
  onJump,
}: {
  stage: Stage;
  maxReachedIndex: number;
  onJump: (s: Stage) => void;
}) {
  const currentIndex = STAGE_ORDER.findIndex((s) => s.id === stage);
  return (
    <nav aria-label="مراحل الرحلة التعليمية" className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1">
      {STAGE_ORDER.map((s, i) => {
        const reached = i <= maxReachedIndex;
        const isCurrent = s.id === stage;
        return (
          <button
            key={s.id}
            type="button"
            disabled={!reached}
            onClick={() => reached && onJump(s.id)}
            className={`group flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-micro tracking-wide transition-colors duration-300 ${
              isCurrent
                ? "border-visual-teal/50 bg-visual-teal/10 text-visual-teal"
                : reached
                ? "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
                : "border-neutral-900 text-neutral-700 cursor-not-allowed"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                isCurrent ? "border-visual-teal text-visual-teal" : "border-current"
              }`}
            >
              {s.number}
            </span>
            {s.label}
          </button>
        );
      })}
      {currentIndex >= 0 && (
        <span className="ms-1 hidden shrink-0 font-mono text-micro text-neutral-600 sm:inline">
          {currentIndex + 1} / {STAGE_ORDER.length}
        </span>
      )}
    </nav>
  );
}

/* -------------------------------- Pronunciation ------------------------------- */

function PronunciationButton({ letter }: { letter: Letter }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    if (!letter.audioSrc) return;
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }, [playing, letter.audioSrc]);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        disabled={!letter.audioSrc}
        aria-label={letter.audioSrc ? `استمع لنطق ${letter.glyph}` : "النطق الصوتي غير متاح بعد"}
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
          letter.audioSrc
            ? "border-visual-teal text-visual-teal hover:bg-visual-teal/10"
            : "border-neutral-800 text-neutral-700 cursor-not-allowed"
        }`}
      >
        <span className="flex items-end gap-[3px] h-4">
          {[6, 12, 8, 14, 5].map((h, i) => (
            <span
              key={i}
              className={`w-[2.5px] rounded-full bg-current ${playing ? "motion-safe:animate-[mkh-bar_0.9s_ease-in-out_infinite]" : ""}`}
              style={{ height: `${h}px`, animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </span>
      </button>
      <div className="flex flex-col">
        <span className="font-thmanyah-text text-caption text-neutral-300">مثال: {letter.example}</span>
        <span className="font-mono text-micro text-neutral-600">
          {letter.audioSrc ? "اضغط للاستماع" : "التسجيل الصوتي قريبًا"}
        </span>
      </div>
      {letter.audioSrc && (
        <audio ref={audioRef} src={letter.audioSrc} onEnded={() => setPlaying(false)} className="hidden" />
      )}
    </div>
  );
}

/* ----------------------------------- Stages ----------------------------------- */

function IntroStage({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col gap-6">
        <h2 className="font-thmanyah-display text-h2 lg:text-hero text-neutral-0">مخارج الحروف</h2>
        <p className="font-thmanyah-text text-body lg:text-lead text-neutral-400 leading-relaxed max-w-lg">
          كل حرف عربي يُولد من موضع محدد في الفم أو الحلق أو الأنف. هذا الموضع
          هو <span className="text-neutral-100">مخرجه</span>. حين تعرف مخرج الحرف، تعرف كيف يُنطق بدقة —
          لا بالتخمين.
        </p>
        <p className="font-thmanyah-text text-body text-neutral-500 leading-relaxed max-w-lg">
          في هذه الرحلة ستنتقل من نظرة عامة على خمس مناطق رئيسة، إلى تفاصيل كل
          منطقة، إلى كل حرف على حدة، ثم تختبر فهمك.
        </p>
        <div>
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-full bg-visual-teal px-7 py-3 font-thmanyah-text text-body text-neutral-900 transition-transform duration-300 hover:scale-[1.03]"
          >
            ابدأ الاستكشاف
            <span aria-hidden="true">←</span>
          </button>
        </div>
      </div>
      <div className="lg:col-span-6 order-1 lg:order-2">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm lg:max-w-md">
          <ProfileAnchor size="hero" activeAreaId={null} interactive={false} />
          <span className="absolute bottom-0 right-0 font-mono text-micro text-neutral-600">
            مقطع توضيحي — غير تشريحي دقيق
          </span>
        </div>
      </div>
    </div>
  );
}

function MapStage({
  activeAreaId,
  onSelectArea,
  onEnterArea,
  visitedAreas,
}: {
  activeAreaId: AreaId;
  onSelectArea: (id: AreaId) => void;
  onEnterArea: (id: AreaId) => void;
  visitedAreas: Set<AreaId>;
}) {
  const active = AREA_MAP.get(activeAreaId)!;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      <div className="lg:col-span-6 order-1">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
          <ProfileAnchor size="hero" activeAreaId={activeAreaId} interactive onSelectArea={onSelectArea} />
        </div>
      </div>

      <div className="lg:col-span-6 order-2">
        <div className="flex flex-wrap gap-2 mb-6">
          {AREAS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onSelectArea(a.id)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-micro tracking-wide transition-colors duration-300 ${
                a.id === activeAreaId
                  ? "border-visual-teal/50 bg-visual-teal/10 text-visual-teal"
                  : "border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300"
              }`}
            >
              <span>{a.number}</span>
              <span>{a.name}</span>
              {visitedAreas.has(a.id) && <span className="h-1.5 w-1.5 rounded-full bg-visual-teal" aria-hidden="true" />}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-7 sm:p-9">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-visual-teal font-mono text-caption text-visual-teal">
              {active.number}
            </span>
            <span className="font-mono text-micro tracking-[0.2em] text-neutral-500 uppercase">{active.subtitle}</span>
          </div>
          <h3 className="font-thmanyah-display text-h2-sm text-neutral-0 mb-4">{active.name}</h3>
          <p className="font-thmanyah-text text-body text-neutral-400 leading-relaxed mb-6">{active.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {lettersOfArea(active.id)
              .filter((l, i, arr) => arr.findIndex((x) => x.glyph === l.glyph) === i)
              .map((l) => (
                <span
                  key={l.id}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 font-thmanyah-display text-lead text-visual-teal"
                >
                  {l.glyph}
                </span>
              ))}
          </div>
          <button
            type="button"
            onClick={() => onEnterArea(active.id)}
            className="inline-flex items-center gap-2 rounded-full border border-visual-teal px-6 py-2.5 font-thmanyah-text text-caption text-visual-teal transition-colors duration-300 hover:bg-visual-teal/10"
          >
            استكشف {active.name} بالتفصيل
            <span aria-hidden="true">←</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function AreaStage({
  areaId,
  onOpenLetter,
  onBack,
}: {
  areaId: AreaId;
  onOpenLetter: (id: string) => void;
  onBack: () => void;
}) {
  const area = AREA_MAP.get(areaId)!;
  const points = area.pointIds.map((id) => POINT_MAP.get(id)!);
  const [openPointId, setOpenPointId] = useState<string>(points[0]?.id ?? "");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      <div className="lg:col-span-4 order-1 hidden lg:block">
        <div className="sticky top-24">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px]">
            <ProfileAnchor size="rail" activeAreaId={areaId} interactive={false} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 order-2">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-1.5 font-mono text-micro text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          <span aria-hidden="true">←</span> المناطق الخمس
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-visual-teal font-mono text-caption text-visual-teal">
            {area.number}
          </span>
          <span className="font-mono text-micro tracking-[0.2em] text-neutral-500 uppercase">{area.subtitle}</span>
        </div>
        <h3 className="font-thmanyah-display text-h2-sm text-neutral-0 mb-4">{area.name}</h3>
        <p className="font-thmanyah-text text-body text-neutral-400 leading-relaxed mb-10 max-w-2xl">{area.detail}</p>

        <div className="flex flex-col divide-y divide-neutral-800 border-y border-neutral-800">
          {points.map((p, idx) => {
            const isOpen = p.id === openPointId;
            const letters = lettersOfPoint(p.id);
            return (
              <div key={p.id} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenPointId(isOpen ? "" : p.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 text-right"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-micro text-neutral-600">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="font-thmanyah-text text-body text-neutral-100">{p.label}</span>
                    {p.note && <span className="font-mono text-micro text-neutral-600">({p.note})</span>}
                  </span>
                  <span
                    className={`h-[1px] w-5 shrink-0 bg-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="mt-4 flex flex-wrap gap-3 ps-7">
                    {letters.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => onOpenLetter(l.id)}
                        className="group flex items-center gap-2 rounded-full border border-neutral-800 py-1.5 pe-4 ps-1.5 transition-colors duration-300 hover:border-visual-teal/50 hover:bg-visual-teal/10"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 font-thmanyah-display text-body text-visual-teal group-hover:border-visual-teal">
                          {l.glyph}
                        </span>
                        <span className="font-thmanyah-text text-caption text-neutral-400 group-hover:text-neutral-200">
                          استكشف
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LetterStage({
  letterId,
  onSelectLetter,
  onBackToArea,
}: {
  letterId: string;
  onSelectLetter: (id: string) => void;
  onBackToArea: (areaId: AreaId) => void;
}) {
  const letter = LETTER_MAP.get(letterId)!;
  const area = AREA_MAP.get(letter.areaId)!;
  const point = POINT_MAP.get(letter.pointId)!;
  const neighbors = neighborsOf(letter);
  const altForm = letter.altFormId ? LETTER_MAP.get(letter.altFormId) : undefined;

  const glyphRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!glyphRef.current || reduced) return;
    gsap.fromTo(
      glyphRef.current,
      { opacity: 0, y: 8, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" }
    );
  }, [letterId, reduced]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      <div className="lg:col-span-5 order-1">
        <button
          type="button"
          onClick={() => onBackToArea(area.id)}
          className="mb-6 inline-flex items-center gap-1.5 font-mono text-micro text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          <span aria-hidden="true">←</span> {area.name}
        </button>
        <div ref={glyphRef} className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-10 flex flex-col items-center text-center gap-6">
          <span className="font-thmanyah-display text-[7rem] leading-none text-visual-teal">{letter.glyph}</span>
          <span className="font-mono text-micro tracking-[0.2em] text-neutral-500 uppercase">
            {area.name} ← {point.label}
          </span>
        </div>
      </div>

      <div className="lg:col-span-7 order-2 flex flex-col gap-8">
        <p className="font-thmanyah-text text-lead text-neutral-100 leading-relaxed">{letter.description}</p>

        {letter.compareNote && (
          <div className="border-e-2 border-visual-teal/40 ps-4 pe-0">
            <span className="font-mono text-micro tracking-wide text-visual-teal">الفرق عن جاراتها</span>
            <p className="font-thmanyah-text text-caption text-neutral-400 mt-1">{letter.compareNote}</p>
          </div>
        )}

        <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-6">
          <PronunciationButton letter={letter} />
        </div>

        {altForm && (
          <button
            type="button"
            onClick={() => onSelectLetter(altForm.id)}
            className="flex items-center justify-between gap-4 rounded-lg border border-dashed border-neutral-700 p-5 text-right transition-colors hover:border-visual-teal/50"
          >
            <span className="font-thmanyah-text text-caption text-neutral-400">
              لهذا الحرف مخرج آخر حسب موضعه في الكلمة — {letter.altFormLabel}
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-700 font-thmanyah-display text-body text-visual-teal">
              {altForm.glyph}
            </span>
          </button>
        )}

        {neighbors.length > 0 && (
          <div>
            <span className="font-mono text-micro tracking-wide text-neutral-500 uppercase">حروف من نفس المخرج</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {neighbors.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => onSelectLetter(n.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 font-thmanyah-display text-lead text-neutral-300 transition-colors duration-300 hover:border-visual-teal hover:text-visual-teal"
                >
                  {n.glyph}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PracticeStage({ onFinish }: { onFinish: (score: number, total: number, missed: Question[]) => void }) {
  const [questions] = useState<Question[]>(() => buildQuestions());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<Question[]>([]);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [wasCorrect, setWasCorrect] = useState(false);

  const q = questions[index];

  const promptText = useMemo(() => {
    if (!q) return "";
    if (q.kind === "identify-area") return "ما مخرج هذا الحرف؟";
    if (q.kind === "select-letters") return `أي الحروف تخرج من: ${POINT_MAP.get(q.pointId)!.label}؟`;
    return "أيّ حرف مخرجه مختلف عن البقية؟";
  }, [q]);

  const toggleSelect = (val: string) => {
    if (answered) return;
    if (q.kind === "select-letters") {
      setSelected((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
    } else {
      setSelected([val]);
    }
  };

  const submit = () => {
    if (!q || answered) return;
    let correct = false;
    if (q.kind === "identify-area") correct = selected[0] === q.correct;
    if (q.kind === "odd-one-out") correct = selected[0] === q.correct;
    if (q.kind === "select-letters") {
      const a = [...selected].sort().join(",");
      const b = [...q.correct].sort().join(",");
      correct = a === b;
    }
    setWasCorrect(correct);
    setAnswered(true);
    if (correct) setScore((s) => s + 1);
    else setMissed((m) => [...m, q]);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      onFinish(score, questions.length, missed);
      return;
    }
    setIndex((i) => i + 1);
    setAnswered(false);
    setSelected([]);
  };

  if (!q) return null;

  const explanation = (() => {
    if (q.kind === "identify-area") {
      const l = LETTER_MAP.get(q.letterId)!;
      return `${l.glyph} يخرج من ${AREA_MAP.get(q.correct)!.name} — ${l.description}`;
    }
    if (q.kind === "select-letters") {
      const letters = q.correct.map((id) => LETTER_MAP.get(id)!.glyph).join(" · ");
      return `الحروف الصحيحة: ${letters} — كلها تشترك في نفس نقطة التلامس: ${POINT_MAP.get(q.pointId)!.label}.`;
    }
    const odd = LETTER_MAP.get(q.correct)!;
    return `${odd.glyph} وحده من منطقة مختلفة عن بقية الحروف في هذا السؤال.`;
  })();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <span className="font-mono text-micro tracking-wide text-neutral-500">
          سؤال {index + 1} من {questions.length}
        </span>
        <span className="font-mono text-micro tracking-wide text-visual-teal">النتيجة: {score}</span>
      </div>

      <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-7 sm:p-10">
        <h3 className="font-thmanyah-display text-h3 text-neutral-0 mb-8">{promptText}</h3>

        {q.kind === "identify-area" && (
          <>
            <div className="mb-8 flex justify-center">
              <span className="font-thmanyah-display text-[5rem] leading-none text-visual-teal">
                {LETTER_MAP.get(q.letterId)!.glyph}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {q.options.map((areaId) => {
                const a = AREA_MAP.get(areaId)!;
                const isSelected = selected[0] === areaId;
                const showState = answered && (areaId === q.correct || isSelected);
                return (
                  <button
                    key={areaId}
                    type="button"
                    onClick={() => toggleSelect(areaId)}
                    disabled={answered}
                    className={`rounded-lg border px-4 py-3 font-thmanyah-text text-caption transition-colors duration-300 ${
                      showState
                        ? areaId === q.correct
                          ? "border-visual-teal bg-visual-teal/10 text-visual-teal"
                          : "border-red-400/50 bg-red-400/5 text-red-300"
                        : isSelected
                        ? "border-visual-teal/50 bg-visual-teal/10 text-visual-teal"
                        : "border-neutral-800 text-neutral-300 hover:border-neutral-600"
                    }`}
                  >
                    {a.name}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {q.kind === "select-letters" && (
          <div className="flex flex-wrap gap-3">
            {q.options.map((id) => {
              const l = LETTER_MAP.get(id)!;
              const isSelected = selected.includes(id);
              const isCorrectAnswer = q.correct.includes(id);
              const showState = answered && (isCorrectAnswer || isSelected);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleSelect(id)}
                  disabled={answered}
                  className={`flex h-14 w-14 items-center justify-center rounded-full border font-thmanyah-display text-h3-sm transition-colors duration-300 ${
                    showState
                      ? isCorrectAnswer
                        ? "border-visual-teal bg-visual-teal/10 text-visual-teal"
                        : "border-red-400/50 bg-red-400/5 text-red-300"
                      : isSelected
                      ? "border-visual-teal/50 bg-visual-teal/10 text-visual-teal"
                      : "border-neutral-700 text-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {l.glyph}
                </button>
              );
            })}
          </div>
        )}

        {q.kind === "odd-one-out" && (
          <div className="flex flex-wrap gap-3">
            {q.letterIds.map((id) => {
              const l = LETTER_MAP.get(id)!;
              const isSelected = selected[0] === id;
              const showState = answered && (id === q.correct || isSelected);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleSelect(id)}
                  disabled={answered}
                  className={`flex h-16 w-16 items-center justify-center rounded-full border font-thmanyah-display text-h2-sm transition-colors duration-300 ${
                    showState
                      ? id === q.correct
                        ? "border-visual-teal bg-visual-teal/10 text-visual-teal"
                        : "border-red-400/50 bg-red-400/5 text-red-300"
                      : isSelected
                      ? "border-visual-teal/50 bg-visual-teal/10 text-visual-teal"
                      : "border-neutral-700 text-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {l.glyph}
                </button>
              );
            })}
          </div>
        )}

        {answered && (
          <div className={`mt-8 rounded-lg border p-5 ${wasCorrect ? "border-visual-teal/30 bg-visual-teal/5" : "border-neutral-700 bg-neutral-900"}`}>
            <span className={`font-mono text-micro tracking-wide ${wasCorrect ? "text-visual-teal" : "text-neutral-300"}`}>
              {wasCorrect ? "إجابة صحيحة" : "ليست تمامًا"}
            </span>
            <p className="font-thmanyah-text text-caption text-neutral-400 mt-2 leading-relaxed">{explanation}</p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          {!answered ? (
            <button
              type="button"
              onClick={submit}
              disabled={selected.length === 0}
              className="rounded-full bg-visual-teal px-7 py-2.5 font-thmanyah-text text-caption text-neutral-900 disabled:opacity-30 transition-opacity"
            >
              تحقق
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-visual-teal px-7 py-2.5 font-thmanyah-text text-caption text-visual-teal hover:bg-visual-teal/10 transition-colors"
            >
              {index + 1 >= questions.length ? "عرض النتيجة" : "السؤال التالي"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewStage({
  score,
  total,
  missed,
  onRetry,
  onReviewLetter,
}: {
  score: number;
  total: number;
  missed: Question[];
  onRetry: () => void;
  onReviewLetter: (letterId: string) => void;
}) {
  const ratio = total > 0 ? score / total : 0;
  const headline = ratio >= 0.85 ? "إتقان واضح" : ratio >= 0.6 ? "أساس جيد" : "تحتاج مراجعة";

  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="font-mono text-micro tracking-[0.25em] text-visual-teal uppercase">النتيجة النهائية</span>
      <h3 className="font-thmanyah-display text-h2 text-neutral-0 mt-3 mb-2">
        {score} / {total}
      </h3>
      <p className="font-thmanyah-text text-body text-neutral-400 mb-10">{headline}</p>

      {missed.length > 0 ? (
        <div className="text-right flex flex-col gap-4 mb-10">
          <span className="font-mono text-micro tracking-wide text-neutral-500 uppercase">نقاط تحتاج مراجعة</span>
          {missed.map((q, i) => {
            const letterId = q.kind === "identify-area" ? q.letterId : q.kind === "odd-one-out" ? q.correct : q.correct[0];
            const l = LETTER_MAP.get(letterId)!;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onReviewLetter(l.id)}
                className="flex items-center justify-between gap-4 rounded-lg border border-neutral-800 p-5 text-right transition-colors hover:border-visual-teal/50"
              >
                <span className="font-thmanyah-text text-caption text-neutral-400">
                  {AREA_MAP.get(l.areaId)!.name} ← {POINT_MAP.get(l.pointId)!.label}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-700 font-thmanyah-display text-body text-visual-teal">
                  {l.glyph}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="font-thmanyah-text text-caption text-neutral-500 mb-10">لم تُخطئ في أي سؤال — أحسنت.</p>
      )}

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-full bg-visual-teal px-7 py-3 font-thmanyah-text text-body text-neutral-900 transition-transform duration-300 hover:scale-[1.03]"
      >
        أعد التطبيق
      </button>
    </div>
  );
}

/* ----------------------------------- Root ----------------------------------- */

export default function MakharijExperience() {
  const [stage, setStage] = useState<Stage>("intro");
  const [activeAreaId, setActiveAreaId] = useState<AreaId>("jawf");
  const [activeLetterId, setActiveLetterId] = useState<string>("alif");
  const [visitedAreas, setVisitedAreas] = useState<Set<AreaId>>(new Set());
  const [result, setResult] = useState<{ score: number; total: number; missed: Question[] }>({
    score: 0,
    total: 0,
    missed: [],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const railStage: Stage = stage === "review" ? "practice" : stage;
  const maxReachedIndex = STAGE_ORDER.findIndex((s) => s.id === railStage);

  useEffect(() => {
    if (!contentRef.current || reduced) return;
    gsap.fromTo(contentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  }, [stage, reduced]);

  const goToArea = useCallback((id: AreaId) => {
    setActiveAreaId(id);
    setStage("area");
    setVisitedAreas((prev) => new Set(prev).add(id));
  }, []);

  const goToLetter = useCallback((id: string) => {
    setActiveLetterId(id);
    setStage("letter");
  }, []);

  const jumpStage = (s: Stage) => setStage(s);

  return (
    <section dir="rtl" className="relative overflow-hidden bg-neutral-900 py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(closest-side, var(--color-visual-teal), transparent)" }}
      />

      <SectionContainer>
        {stage !== "intro" && (
          <div className="mb-12">
            <StageRail stage={railStage} maxReachedIndex={maxReachedIndex} onJump={jumpStage} />
          </div>
        )}

        <div ref={contentRef} className="relative">
          {stage === "intro" && <IntroStage onStart={() => setStage("map")} />}

          {stage === "map" && (
            <MapStage
              activeAreaId={activeAreaId}
              onSelectArea={setActiveAreaId}
              onEnterArea={goToArea}
              visitedAreas={visitedAreas}
            />
          )}

          {stage === "area" && (
            <AreaStage areaId={activeAreaId} onOpenLetter={goToLetter} onBack={() => setStage("map")} />
          )}

          {stage === "letter" && (
            <LetterStage
              letterId={activeLetterId}
              onSelectLetter={setActiveLetterId}
              onBackToArea={(areaId) => {
                setActiveAreaId(areaId);
                setStage("area");
              }}
            />
          )}

          {stage === "practice" && (
            <PracticeStage
              onFinish={(score, total, missed) => {
                setResult({ score, total, missed });
                setStage("review");
              }}
            />
          )}

          {stage === "review" && (
            <ReviewStage
              score={result.score}
              total={result.total}
              missed={result.missed}
              onRetry={() => setStage("practice")}
              onReviewLetter={(letterId) => {
                setActiveLetterId(letterId);
                setStage("letter");
              }}
            />
          )}
        </div>

        {stage === "map" && visitedAreas.size >= 3 && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setStage("practice")}
              className="inline-flex items-center gap-2 rounded-full border border-visual-teal px-7 py-3 font-thmanyah-text text-caption text-visual-teal transition-colors duration-300 hover:bg-visual-teal/10"
            >
              جاهز للتطبيق الآن
              <span aria-hidden="true">←</span>
            </button>
          </div>
        )}
      </SectionContainer>

      <style jsx>{`
        @keyframes mkh-bar {
          0%,
          100% {
            transform: scaleY(0.6);
          }
          50% {
            transform: scaleY(1.4);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </section>
  );
}