import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: P) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const ArrowRight = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowDown = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const Phone = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);

export const Check = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const Play = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)} fill="currentColor" stroke="none">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

export const Close = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ChevronDown = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ChevronLeft = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const ChevronRight = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const Mail = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const Pin = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z" />
    <circle cx="12" cy="10" r="2.25" />
  </svg>
);

export const Instagram = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const Facebook = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8z" />
  </svg>
);

/* Icons for the "why" cards; keys match why[].title in lib/copy.ts */
export const Years = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const Design = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" />
    <path d="M13 8l3 3" />
  </svg>
);
export const Plan = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);
export const Shield = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
export const Speak = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M4 5h16v10H9l-5 4V5z" />
  </svg>
);
export const Award = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="9" r="5" />
    <path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" />
  </svg>
);
export const Status = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M4 18V8M10 18v-6M16 18V5M22 18H2" />
  </svg>
);
export const Doc = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5" />
  </svg>
);
