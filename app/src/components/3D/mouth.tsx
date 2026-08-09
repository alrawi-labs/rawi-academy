/* ---- BUNU MEVCUT "const PROFILE_PATH = ..." SATIRIYLA DEĞİŞTİRİN ---- */

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
   dot that migrates to the active area's coordinate. */

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