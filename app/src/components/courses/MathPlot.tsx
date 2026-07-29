"use client";

export default function MathPlot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 460 460" className="w-full h-full">
        <defs>
          <clipPath id="mathDisc">
            <circle cx="230" cy="230" r="196" />
          </clipPath>
          <pattern id="mathGrid" width="23" height="23" patternUnits="userSpaceOnUse">
            <path d="M23 0 L0 0 0 23" fill="none" stroke="rgba(11,15,23,0.07)" strokeWidth="1" />
          </pattern>
          <radialGradient id="mathGlow" cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor="rgba(128,89,232,0)" />
            <stop offset="100%" stopColor="rgba(128,89,232,0.14)" />
          </radialGradient>
        </defs>

        {/* هالة حافة بنفسجية خافتة بدل توهّج أبيض مركزي — تحدّد الدائرة بدل أن "تضيء" فوقها */}
        <circle cx="230" cy="230" r="212" fill="url(#mathGlow)" />
        <circle cx="230" cy="230" r="196" fill="none" stroke="rgba(11,15,23,0.16)" strokeWidth="1.5" />

        <g clipPath="url(#mathDisc)">
          <rect x="34" y="34" width="392" height="392" fill="url(#mathGrid)" />
          <line x1="34" y1="230" x2="426" y2="230" stroke="rgba(11,15,23,0.28)" strokeWidth="1.5" />
          <line x1="230" y1="34" x2="230" y2="426" stroke="rgba(11,15,23,0.28)" strokeWidth="1.5" />

          <path
            d="M70,90 C140,230 170,300 230,300 C290,300 320,230 390,90"
            fill="none"
            stroke="#0B0F17"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            className="math-curve"
          />

          {/* جذور المعادلة — لون العلامة التجارية للموقع، يتناغم مع الخطوط الإرشادية في الخلفية */}
          <circle cx="142" cy="230" r="5" fill="#8059E8" />
          <circle cx="317" cy="230" r="5" fill="#8059E8" />
          <line
            x1="230"
            y1="230"
            x2="230"
            y2="300"
            stroke="rgba(11,15,23,0.4)"
            strokeDasharray="3 4"
            strokeWidth="1.5"
          />
          <circle cx="230" cy="300" r="5.5" fill="#0B0F17" />
        </g>

        <text
          x="230"
          y="450"
          textAnchor="middle"
          fill="rgba(11,15,23,0.55)"
          fontSize="13"
          fontFamily="ui-monospace, monospace"
        >
          f(x) = x² − 4
        </text>
      </svg>

      <style jsx>{`
        .math-curve {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawParabola 3.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        @keyframes drawParabola {
          0% {
            stroke-dashoffset: 1;
          }
          60% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .math-curve {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}