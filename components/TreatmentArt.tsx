// Original illustrations for each treatment area, drawn in the Fidinda palette.
// Each one sits on a soft gradient card (320 × 180).

export type ArtName =
  | "heart" | "cancer" | "brain" | "bone" | "liver" | "kidney"
  | "women" | "child" | "dental" | "diabetes" | "checkup" | "rehab";

const NAVY = "#1D0C59";
const RED = "#CA162F";
const PINK = "#F6C3CC";
const S = { stroke: NAVY, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Scene({ name, id }: { name: ArtName; id: string }) {
  const red = `url(#${id}-red)`;
  switch (name) {
    case "heart":
      return (
        <>
          <path d="M160 150 C100 115 92 70 120 55 C140 45 155 55 160 68 C165 55 180 45 200 55 C228 70 220 115 160 150 Z" fill={red} />
          <path d="M126 66 C118 72 116 84 121 94" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" />
          <polyline points="36,102 108,102 122,82 138,128 152,66 166,114 176,102 284,102" fill="none" stroke={NAVY} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        </>
      );
    case "cancer":
      return (
        <>
          <path d="M160 40 C180 40 190 60 180 80 L140 152" fill="none" stroke="#9E1027" strokeWidth="17" strokeLinecap="round" />
          <path d="M160 40 C140 40 130 60 140 80 L180 152" fill="none" stroke={red} strokeWidth="17" strokeLinecap="round" />
          <path d="M150 52 C146 58 146 66 150 72" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="4" strokeLinecap="round" />
          {[[98, 60, 7], [84, 112, 5], [226, 58, 6], [238, 116, 8], [110, 140, 4], [214, 146, 5]].map(([x, y, r]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="none" stroke={NAVY} strokeWidth="2.5" />
          ))}
        </>
      );
    case "brain":
      return (
        <>
          <path d="M160 42 C132 34 104 48 104 72 C88 80 90 108 106 116 C108 138 134 146 160 136 C186 146 212 138 214 116 C230 108 232 80 216 72 C216 48 188 34 160 42 Z" fill={PINK} {...S} />
          <path d="M160 42 C154 70 166 100 160 136" fill="none" {...S} />
          {["M120 70 C130 62 142 66 146 76", "M112 98 C124 92 134 100 144 96", "M126 122 C136 112 148 116 150 108"].map((d) => (
            <g key={d}>
              <path d={d} fill="none" {...S} />
              <path d={d} fill="none" {...S} transform="translate(320 0) scale(-1 1)" />
            </g>
          ))}
          <path d="M160 136 L167 156" fill="none" stroke={RED} strokeWidth="9" strokeLinecap="round" />
        </>
      );
    case "bone":
      return (
        <>
          <path d="M138 28 L182 28 L177 68 C198 72 202 92 187 99 L133 99 C118 92 122 72 143 68 Z" fill="#fff" {...S} />
          <path d="M131 113 L189 113 C198 121 188 132 179 132 L175 162 L145 162 L141 132 C132 132 122 121 131 113 Z" fill="#fff" {...S} />
          <path d="M138 106 L182 106" stroke={RED} strokeWidth="3" strokeDasharray="5 6" strokeLinecap="round" />
          <circle cx="200" cy="104" r="11" fill={red} />
          <path d="M226 64 l10 0 m-5 -5 l0 10 M90 132 l10 0 m-5 -5 l0 10" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
        </>
      );
    case "liver":
      return (
        <>
          <path d="M84 72 C118 48 212 42 234 62 C247 75 238 97 214 101 C186 106 162 130 128 130 C96 130 72 98 84 72 Z" fill={red} />
          <path d="M160 52 C156 76 164 100 158 124" fill="none" stroke="#7E0C20" strokeWidth="3" strokeLinecap="round" />
          <path d="M100 76 C112 64 130 60 146 60" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="176" cy="118" rx="10" ry="14" fill={NAVY} transform="rotate(-20 176 118)" />
        </>
      );
    case "kidney": {
      const bean = "M112 48 C84 48 74 88 86 116 C96 140 124 136 127 116 C129 102 117 98 119 88 C121 76 133 70 129 60 C127 52 121 48 112 48 Z";
      return (
        <>
          <path d={bean} fill={red} />
          <path d={bean} fill={red} transform="translate(320 0) scale(-1 1)" />
          <path d="M125 100 C140 112 150 132 156 150" fill="none" {...S} />
          <path d="M195 100 C180 112 170 132 164 150" fill="none" {...S} />
          <ellipse cx="160" cy="156" rx="20" ry="11" fill={PINK} {...S} />
          <path d="M96 66 C92 78 92 92 96 102" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="4" strokeLinecap="round" />
        </>
      );
    }
    case "women":
      return (
        <>
          <circle cx="160" cy="74" r="34" fill="none" stroke={red} strokeWidth="11" />
          <path d="M160 110 L160 158 M140 136 L180 136" stroke={red} strokeWidth="11" strokeLinecap="round" />
          <path d="M160 88 C150 80 140 72 146 64 C150 58 157 60 160 66 C163 60 170 58 174 64 C180 72 170 80 160 88 Z" fill={NAVY} />
          {[[92, 56], [234, 70], [104, 128], [222, 136]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill={NAVY} opacity=".7" />
          ))}
        </>
      );
    case "child":
      return (
        <>
          <circle cx="128" cy="48" r="17" fill={PINK} {...S} />
          <circle cx="192" cy="48" r="17" fill={PINK} {...S} />
          <ellipse cx="160" cy="138" rx="42" ry="32" fill={PINK} {...S} />
          <circle cx="160" cy="76" r="38" fill={PINK} {...S} />
          <ellipse cx="160" cy="92" rx="15" ry="11" fill="#fff" {...S} />
          <circle cx="146" cy="70" r="4" fill={NAVY} />
          <circle cx="174" cy="70" r="4" fill={NAVY} />
          <path d="M156 88 L164 88 M160 88 L160 96" {...S} />
          <rect x="174" y="40" width="28" height="11" rx="4" fill="#fff" stroke={RED} strokeWidth="2.5" transform="rotate(-30 188 46)" />
          <circle cx="160" cy="138" r="13" fill={red} />
          <path d="M160 131 L160 145 M153 138 L167 138" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </>
      );
    case "dental":
      return (
        <>
          <path d="M96 50 C80 50 74 70 80 90 C86 110 88 140 98 140 C106 140 106 116 112 108 C118 116 118 140 126 140 C136 140 138 110 144 90 C150 70 144 50 128 50 C120 50 116 56 112 56 C108 56 104 50 96 50 Z" fill="#fff" {...S} />
          <path d="M90 66 C88 74 90 84 92 90" fill="none" stroke={PINK} strokeWidth="5" strokeLinecap="round" />
          <path d="M174 92 C194 62 246 62 266 92 C246 122 194 122 174 92 Z" fill="#fff" {...S} />
          <circle cx="220" cy="92" r="17" fill={red} />
          <circle cx="220" cy="92" r="7" fill={NAVY} />
          <circle cx="225" cy="86" r="3" fill="#fff" />
        </>
      );
    case "diabetes":
      return (
        <>
          <rect x="112" y="30" width="20" height="26" rx="3" fill="#fff" {...S} />
          <rect x="100" y="48" width="74" height="108" rx="16" fill={NAVY} />
          <rect x="112" y="62" width="50" height="36" rx="7" fill="#fff" />
          <text x="137" y="88" textAnchor="middle" style={{ font: "800 19px Montserrat, sans-serif", fill: NAVY }}>5.6</text>
          <circle cx="122" cy="126" r="7" fill={PINK} />
          <circle cx="152" cy="126" r="7" fill={red} />
          <path d="M220 56 C220 56 194 90 194 108 C194 123 206 134 220 134 C234 134 246 123 246 108 C246 90 220 56 220 56 Z" fill={red} />
          <path d="M206 108 C206 116 211 122 218 123" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case "checkup":
      return (
        <>
          <rect x="104" y="38" width="104" height="128" rx="12" fill="#fff" {...S} />
          <rect x="134" y="28" width="44" height="18" rx="6" fill={NAVY} />
          {[72, 102, 132].map((y) => (
            <g key={y}>
              <path d={`M120 ${y} l7 7 l12 -14`} fill="none" stroke={RED} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d={`M150 ${y + 2} L192 ${y + 2}`} stroke={NAVY} strokeWidth="4" strokeLinecap="round" opacity=".35" />
            </g>
          ))}
          <path d="M238 54 C238 96 222 120 236 140" fill="none" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
          <circle cx="238" cy="148" r="13" fill="none" stroke={red} strokeWidth="7" />
        </>
      );
    case "rehab":
      return (
        <>
          <circle cx="146" cy="44" r="13" fill={NAVY} />
          <path d="M146 60 L138 104" stroke={NAVY} strokeWidth="11" strokeLinecap="round" />
          <path d="M144 70 L124 92 M144 70 L166 88" stroke={NAVY} strokeWidth="8" strokeLinecap="round" />
          <path d="M138 104 L120 142 M138 104 L160 130 L164 156" fill="none" stroke={NAVY} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M92 160 L236 160" stroke={NAVY} strokeWidth="3" strokeLinecap="round" opacity=".3" />
          <path d="M190 142 C204 120 212 98 226 74" fill="none" stroke={red} strokeWidth="6" strokeLinecap="round" />
          <path d="M212 76 L228 70 L232 86" fill="none" stroke={red} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
  }
}

export default function TreatmentArt({ name, title }: { name: ArtName; title: string }) {
  const id = `ta-${name}`;
  return (
    <svg className="tart" viewBox="0 0 320 180" role="img" aria-label={`Illustration: ${title}`}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--ta-a)" }} />
          <stop offset="1" style={{ stopColor: "var(--ta-b)" }} />
        </linearGradient>
        <linearGradient id={`${id}-red`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E63A52" />
          <stop offset="1" stopColor="#A90F25" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill={`url(#${id}-bg)`} />
      <circle cx="34" cy="28" r="46" style={{ fill: "var(--ta-dot)" }} />
      <circle cx="296" cy="164" r="58" style={{ fill: "var(--ta-dot)" }} />
      <path d="M270 30 l12 0 m-6 -6 l0 12 M36 150 l10 0 m-5 -5 l0 10" stroke={RED} strokeWidth="2.5" strokeLinecap="round" opacity=".45" />
      <Scene name={name} id={id} />
    </svg>
  );
}
