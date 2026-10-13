// A painted six-panel door with a transom, drawn in SVG. The leaf swings open on load.
// `idPrefix` keeps SVG gradient ids unique when the door appears more than once on a page.

function Leaf({ idPrefix }: { idPrefix: string }) {
  const lacquer = `${idPrefix}-lacquer`;
  const brass = `${idPrefix}-brass`;
  const sheen = `${idPrefix}-sheen`;
  const panels = [
    { x: 22, y: 22, w: 66, h: 74 },
    { x: 112, y: 22, w: 66, h: 74 },
    { x: 22, y: 118, w: 66, h: 156 },
    { x: 112, y: 118, w: 66, h: 156 },
    { x: 22, y: 296, w: 66, h: 118 },
    { x: 112, y: 296, w: 66, h: 118 },
  ];
  return (
    <svg viewBox="0 0 200 436" className="block h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={lacquer} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8a1612" />
          <stop offset="0.55" stopColor="#a51e19" />
          <stop offset="1" stopColor="#7a130f" />
        </linearGradient>
        <linearGradient id={brass} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#d9bb72" />
          <stop offset="1" stopColor="#8a6a2c" />
        </linearGradient>
        <linearGradient id={sheen} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="200" height="436" fill={`url(#${lacquer})`} />
      {panels.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} fill="#6e110e" opacity="0.55" />
          <rect x={p.x + 6} y={p.y + 6} width={p.w - 12} height={p.h - 12} fill="#a01d18" />
          <path
            d={`M${p.x + 6} ${p.y + p.h - 6} V${p.y + 6} H${p.x + p.w - 6}`}
            stroke="#c4413a"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      ))}
      <rect width="200" height="436" fill={`url(#${sheen})`} />
      <circle cx="176" cy="238" r="7.5" fill={`url(#${brass})`} />
      <rect x="171" y="250" width="10" height="20" rx="3" fill={`url(#${brass})`} />
      <rect x="0" y="420" width="200" height="16" fill={`url(#${brass})`} opacity="0.9" />
    </svg>
  );
}

export default function Door({
  className = "",
  idPrefix = "door",
  closed = false,
  tone = "light",
}: {
  className?: string;
  idPrefix?: string;
  closed?: boolean;
  /** "dark" puts a darker casing on, for use over photos and dark bands. */
  tone?: "light" | "dark";
}) {
  const casing = tone === "dark" ? "bg-[#e9ebe7] ring-white/20" : "bg-[#f7f8f6] ring-ink/15";
  return (
    <div className={`relative ${className}`} role="img" aria-label={closed ? "A red front door" : "A red front door, opening"}>
      {/* casing + transom */}
      <div className={`rounded-t-[2px] p-[5%] pb-0 shadow-[0_40px_80px_-30px_rgba(18,28,31,0.6)] ring-1 ${casing}`}>
        <div className="mb-[4%] grid aspect-[200/52] grid-cols-4 gap-[3px] bg-ink/70 p-[3px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gradient-to-b from-[#dfe9ea] to-[#b9cdd0]" />
          ))}
        </div>
        {/* opening: warm light behind the leaf */}
        <div className="relative aspect-[200/436] overflow-hidden bg-gradient-to-br from-[#f6e3bf] via-[#e9c88f] to-[#c9a46a]">
          <div className="absolute inset-y-0 left-[52%] w-[48%] bg-gradient-to-l from-[#fff4dc]/60 to-transparent" />
          <div className={`door-leaf absolute inset-0 ${closed ? "door-leaf--closed" : ""}`}>
            <Leaf idPrefix={idPrefix} />
          </div>
        </div>
      </div>
      <div className={`h-[10px] ring-1 ${tone === "dark" ? "bg-[#c9cfc9] ring-white/10" : "bg-[#d9ddd9] ring-ink/10"}`} />
    </div>
  );
}
