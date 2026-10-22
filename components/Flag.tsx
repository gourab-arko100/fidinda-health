// Simplified national flags drawn as SVG, so they look the same on every device
// (emoji flags don't show on Windows) and need no external images.

export type FlagCode = "KH" | "IN" | "MY" | "SG" | "TW" | "VN" | "EG";

type Props = {
  code: FlagCode;
  /** Width in px when used in HTML, or in SVG units when nested inside another SVG */
  width?: number;
  x?: number;
  y?: number;
  title?: string;
  className?: string;
};

// Star polygon points
function star(cx: number, cy: number, outer: number, inner: number, n = 5, rot = -90) {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = ((rot + (i * 180) / n) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

function Shapes({ code }: { code: FlagCode }) {
  switch (code) {
    case "KH": // Cambodia
      return (
        <>
          <rect width="30" height="20" fill="#032EA1" />
          <rect y="5" width="30" height="10" fill="#E00025" />
          <g fill="#FFFFFF">
            <rect x="8.5" y="12.6" width="13" height="1.2" />
            <rect x="9.5" y="11" width="11" height="1.8" />
            <polygon points="14,11 15,6.4 16,11" />
            <polygon points="11.2,11 12,8 12.8,11" />
            <polygon points="17.2,11 18,8 18.8,11" />
            <polygon points="9.6,11 10.1,9.2 10.6,11" />
            <polygon points="19.4,11 19.9,9.2 20.4,11" />
          </g>
        </>
      );
    case "IN": // India
      return (
        <>
          <rect width="30" height="6.67" fill="#FF9933" />
          <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
          <rect y="13.33" width="30" height="6.67" fill="#138808" />
          <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.45" />
          <circle cx="15" cy="10" r="0.5" fill="#000080" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 12;
            return (
              <line key={i} x1={15 - 2.6 * Math.cos(a)} y1={10 - 2.6 * Math.sin(a)} x2={15 + 2.6 * Math.cos(a)} y2={10 + 2.6 * Math.sin(a)} stroke="#000080" strokeWidth="0.18" />
            );
          })}
        </>
      );
    case "MY": // Malaysia
      return (
        <>
          {Array.from({ length: 14 }, (_, i) => (
            <rect key={i} y={(i * 20) / 14} width="30" height={20 / 14 + 0.02} fill={i % 2 === 0 ? "#CC0001" : "#FFFFFF"} />
          ))}
          <rect width="15" height={(20 * 8) / 14} fill="#010066" />
          <circle cx="5.6" cy="5.7" r="3.6" fill="#FFCC00" />
          <circle cx="6.6" cy="5.7" r="3" fill="#010066" />
          <polygon points={star(11.2, 5.7, 2.4, 1.05, 14)} fill="#FFCC00" />
        </>
      );
    case "SG": // Singapore
      return (
        <>
          <rect width="30" height="10" fill="#EF3340" />
          <rect y="10" width="30" height="10" fill="#FFFFFF" />
          <circle cx="6.2" cy="5" r="3.3" fill="#FFFFFF" />
          <circle cx="7.4" cy="5" r="3.1" fill="#EF3340" />
          {Array.from({ length: 5 }, (_, i) => {
            const a = ((-90 + i * 72) * Math.PI) / 180;
            return <polygon key={i} points={star(9.6 + 1.6 * Math.cos(a), 5 + 1.6 * Math.sin(a), 0.6, 0.25)} fill="#FFFFFF" />;
          })}
        </>
      );
    case "TW": // Taiwan
      return (
        <>
          <rect width="30" height="20" fill="#FE0000" />
          <rect width="15" height="10" fill="#000095" />
          <polygon points={star(7.5, 5, 3.8, 2.4, 12)} fill="#FFFFFF" />
          <circle cx="7.5" cy="5" r="2.1" fill="#000095" />
          <circle cx="7.5" cy="5" r="1.75" fill="#FFFFFF" />
        </>
      );
    case "VN": // Vietnam
      return (
        <>
          <rect width="30" height="20" fill="#DA251D" />
          <polygon points={star(15, 10.4, 6, 2.4)} fill="#FFFF00" />
        </>
      );
    case "EG": // Egypt
      return (
        <>
          <rect width="30" height="6.67" fill="#CE1126" />
          <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
          <rect y="13.33" width="30" height="6.67" fill="#000000" />
          <g fill="#C09300">
            <polygon points="15,7.4 16.6,8.6 16.2,12.4 15,12.9 13.8,12.4 13.4,8.6" />
            <polygon points="13.4,8.8 11.4,9.6 12.6,11.6 13.6,11.2" />
            <polygon points="16.6,8.8 18.6,9.6 17.4,11.6 16.4,11.2" />
          </g>
        </>
      );
  }
}

const NAMES: Record<FlagCode, string> = {
  KH: "Cambodia", IN: "India", MY: "Malaysia", SG: "Singapore", TW: "Taiwan", VN: "Vietnam", EG: "Egypt",
};

export default function Flag({ code, width = 30, x, y, title, className }: Props) {
  const height = (width * 2) / 3;
  return (
    <svg
      className={className ?? "flag"}
      x={x}
      y={y}
      width={width}
      height={height}
      viewBox="0 0 30 20"
      role="img"
      aria-label={title ?? `Flag of ${NAMES[code]}`}
      preserveAspectRatio="none"
    >
      <Shapes code={code} />
      <rect width="30" height="20" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="0.6" />
    </svg>
  );
}
