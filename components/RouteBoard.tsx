import Flag, { type FlagCode } from "./Flag";

// Schematic route map: Cambodia at the centre, lines to each focus destination.
const HUB = { x: 300, y: 205 };
const POINTS = [
  { name: "India", x: 170, y: 92, code: "IN" as FlagCode },
  { name: "Egypt", x: 62, y: 150, code: "EG" as FlagCode },
  { name: "Taiwan", x: 442, y: 70, code: "TW" as FlagCode },
  { name: "Vietnam", x: 452, y: 170, code: "VN" as FlagCode },
  { name: "Malaysia", x: 168, y: 300, code: "MY" as FlagCode },
  { name: "Singapore", x: 300, y: 322, code: "SG" as FlagCode },
];

const dots: { x: number; y: number }[] = [];
for (let x = 14; x < 520; x += 22) for (let y = 14; y < 370; y += 22) dots.push({ x, y });

export default function RouteBoard() {
  return (
    <figure className="board" style={{ margin: 0 }}>
      <svg
        viewBox="0 0 520 370"
        role="img"
        aria-label="Route map from Cambodia to India, Egypt, Taiwan, Vietnam, Malaysia, Singapore and other destinations"
      >
        <defs>
          <linearGradient id="routeGrad" gradientUnits="userSpaceOnUse" x1="300" y1="205" x2="60" y2="60">
            <stop offset="0" stopColor="#1D0C59" />
            <stop offset="1" stopColor="#CA162F" />
          </linearGradient>
        </defs>
        {dots.map((d) => (
          <circle key={`${d.x}-${d.y}`} className="rb-dot" cx={d.x} cy={d.y} r={1.4} />
        ))}
        {POINTS.map((p) => {
          const cx = Math.round((HUB.x + p.x) / 2);
          const cy = Math.min(HUB.y, p.y) - 40;
          return <path key={`r-${p.code}`} className="rb-route" d={`M${HUB.x},${HUB.y} Q${cx},${cy} ${p.x},${p.y}`} />;
        })}
        <path className="rb-route other" d="M300,205 Q420,280 470,300" />
        <rect className="rb-box" x={404} y={283} width={112} height={34} rx={9} style={{ strokeDasharray: "4 4" }} />
        <text className="rb-s" x={460} y={304} textAnchor="middle">Other destinations</text>

        <circle className="rb-ring" cx={HUB.x} cy={HUB.y} r={34} />
        <circle className="rb-ring" cx={HUB.x} cy={HUB.y} r={22} />
        <circle className="rb-hub" cx={HUB.x} cy={HUB.y} r={12} />
        <circle cx={HUB.x} cy={HUB.y} r={4} style={{ fill: "#fff" }} />
        <Flag code="KH" x={HUB.x - 15} y={HUB.y + 38} width={30} />
        <text className="rb-hubt" x={HUB.x} y={HUB.y + 74} textAnchor="middle">Cambodia</text>
        <text className="rb-s" x={HUB.x} y={HUB.y + 89} textAnchor="middle">Patients start here</text>

        {POINTS.map((p) => {
          const w = 24 + p.name.length * 9 + 32;
          const left = Math.round(p.x - w / 2);
          return (
            <g key={`b-${p.code}`}>
              <rect className="rb-box" x={left} y={p.y - 17} width={w} height={34} rx={9} />
              <Flag code={p.code} x={left + 8} y={p.y - 8} width={24} />
              <text className="rb-t" x={left + 38} y={p.y + 5}>{p.name}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="board-cap">
        <span><b>Our focus destinations</b></span>
        <span>Healthcare destinations for Cambodian patients</span>
      </figcaption>
    </figure>
  );
}
