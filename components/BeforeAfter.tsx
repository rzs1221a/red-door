"use client";

import { useId, useRef, useState } from "react";
import type { Photo } from "@/lib/projects";
import { pictureAttrs } from "./Picture";

// Before/after comparison. A range input drives the split (keyboard works natively);
// pointer dragging anywhere on the image also moves it.
export default function BeforeAfter({
  before,
  after,
  sizes,
  label,
  start = 50,
  className = "",
  ratio,
  cropBottom,
  priority = false,
}: {
  before: Photo;
  after: Photo;
  sizes: string;
  label?: string;
  start?: number;
  className?: string;
  /** Override aspect ratio (defaults to the "after" photo's). */
  ratio?: string;
  /** Fraction of the bottom edge to crop (hides labels burned into the source photos). */
  cropBottom?: number;
  /** Eager-load both images (use when the pair is the page's first big visual). */
  priority?: boolean;
}) {
  const [pos, setPos] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const id = useId();

  const set = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const b = pictureAttrs(before);
  const a = pictureAttrs(after);
  const aspect = ratio ?? (cropBottom ? `${after.w} / ${after.h * (1 - cropBottom)}` : `${after.w} / ${after.h}`);
  const imgCls = `absolute inset-0 h-full w-full object-cover ${cropBottom ? "object-top" : ""}`;

  return (
    <figure className={className}>
      <div
        ref={ref}
        className="group relative select-none overflow-hidden rounded-[3px] bg-paper-2 shadow-card"
        style={{ aspectRatio: aspect, touchAction: "pan-y" }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          set(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && set(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...b} sizes={sizes} alt={before.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" draggable={false} className={imgCls} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...a} sizes={sizes} alt={after.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" draggable={false} className={imgCls} />
        </div>

        {/* Divider + handle */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -left-px w-[2px] bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lift ring-1 ring-ink/10 transition-transform duration-300 group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
            </svg>
          </div>
        </div>

        <span aria-hidden="true" className="absolute left-3 top-3 rounded-[2px] bg-ink/75 px-2 py-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-white backdrop-blur">
          Before
        </span>
        <span aria-hidden="true" className="absolute right-3 top-3 rounded-[2px] bg-door px-2 py-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-white">
          After
        </span>

        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after"
          aria-valuetext={`${Math.round(pos)} percent after`}
          className="ba-range absolute inset-0 h-full w-full"
        />
      </div>
      {label && <figcaption className="mt-3 text-[0.9rem] text-ink-soft">{label}</figcaption>}
    </figure>
  );
}
