// Line icons for the twelve services (24×24, stroke-based).
export type IconName =
  | "records" | "hospital" | "opinion" | "compare" | "video" | "calendar"
  | "plane" | "bed" | "language" | "support" | "discharge" | "followup"
  | "check" | "info" | "arrow" | "sun" | "moon";

const PATHS: Record<IconName, React.ReactNode> = {
  records: (<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M8 13h8M8 16h5" /></>),
  hospital: (<><path d="M4 21V8l8-4 8 4v13" /><path d="M9 21v-5h6v5" /><path d="M12 8v4M10 10h4" /></>),
  opinion: (<><path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-3-3h-3" /><path d="M7 10h6" /></>),
  compare: (<><path d="M12 3v18M5 21h14" /><path d="M6 7h12" /><path d="M6 7l-3 7h6z" /><path d="M18 7l-3 7h6z" /></>),
  video: (<><rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l6-3v10l-6-3" /><circle cx="9" cy="11" r="2" /><path d="M5.5 16c.7-1.4 2-2 3.5-2s2.8.6 3.5 2" /></>),
  calendar: (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M9 15l2 2 4-4" /></>),
  plane: (<><path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15 12.5l.5 8L14 22l-2.5-7.5" /><path d="M5 19l3-3" /></>),
  bed: (<><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>),
  language: (<><path d="M4 5h9M8.5 3v2M6 5c1 3 3 5.5 6 7M11 5c-1 3-3.5 6-7 8" /><path d="M13 21l4-9 4 9M14.5 18h5" /></>),
  support: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /><path d="M17 4.5a5 5 0 0 1 0 7" /></>),
  discharge: (<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3v2h6V3" /><path d="M9 11h6M9 15h4" /><path d="M15.5 16.5l1.5 1.5 3-3" /></>),
  followup: (<><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M12 17s-3-1.8-3-3.6A1.6 1.6 0 0 1 12 13a1.6 1.6 0 0 1 3 .4C15 15.2 12 17 12 17z" /></>),
  check: (<path d="M5 12.5l4.5 4.5L19 7.5" />),
  info: (<><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></>),
  arrow: (<path d="M5 12h14M13 6l6 6-6 6" />),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: (<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />),
};

export default function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
