import type { SVGProps } from "react";
import { steps } from "@/lib/process";

// One symbol per step of the Red Door Process, in the order of lib/process.ts. Drawn in the same
// hand as components/icons.tsx: 24-unit grid, 2px strokes, square caps, no fills. Each is
// aria-hidden; the step's title beside it is the accessible name.
type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size: number, props: P) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  ...props,
});

/** Consultation: two speech bubbles, the owner's and ours. */
export const Consultation = ({ size = 24, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M3 4h11v8H8l-3 3v-3H3z" />
    <path d="M14 9h7v8h-2v3l-3-3h-2v-2" />
  </svg>
);
/** Property Assessment: a house under a magnifier. */
export const Assessment = ({ size = 24, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M3 11l8-7 8 7" />
    <path d="M5 10v10h6" />
    <circle cx="15.5" cy="15.5" r="3.5" />
    <path d="M18 18l3 3" />
  </svg>
);
/** Design: a pencil over a rule. */
export const Design = ({ size = 24, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M14 4l6 6-9 9H5v-6z" />
    <path d="M11 7l6 6" />
    <path d="M3 21h18" />
  </svg>
);
/** Detailed Project Plan: a document with its lines and a check. */
export const Plan = ({ size = 24, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 3h10l4 4v14H5z" />
    <path d="M15 3v4h4" />
    <path d="M8 11h8M8 15h8" />
    <path d="M8 19h3" />
  </svg>
);
/** Project Management: a calendar with the trades laid in. */
export const Management = ({ size = 24, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M3 5h18v16H3z" />
    <path d="M3 9h18" />
    <path d="M7 3v4M17 3v4" />
    <path d="M6 13h6M10 17h8" />
  </svg>
);
/** Communication: a handset with its signal. */
export const Communication = ({ size = 24, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
    <path d="M14 3a7 7 0 0 1 7 7" />
    <path d="M14 7a3 3 0 0 1 3 3" />
  </svg>
);
/** Completion: the house, and the check. */
export const Completion = ({ size = 24, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v11h14V10" />
    <path d="M9 15l2.5 2.5L15.5 13" />
  </svg>
);

export const stepIcons = [Consultation, Assessment, Design, Plan, Management, Communication, Completion];

/** The symbol for step `index` of the process, by position in lib/process.ts. */
export default function StepIcon({ index, size = 24, className = "" }: { index: number; size?: number; className?: string }) {
  const Icon = stepIcons[index % stepIcons.length];
  return <Icon size={size} className={className} />;
}

// A guard at build time: one symbol per step, no more and no fewer.
if (stepIcons.length !== steps.length) {
  throw new Error(`StepIcons: ${stepIcons.length} icons for ${steps.length} steps`);
}
