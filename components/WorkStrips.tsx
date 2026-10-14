"use client";

import { useEffect, useRef, useState } from "react";
import { revealChildren } from "./Reveal";
import type { Strip } from "@/lib/home";
import { pictureAttrs } from "./Picture";

// One strip per project: 190px-tall photographs at natural width, cut off by the right edge.
export default function WorkStrips({ strips, title ="Projects" }: { strips: Strip[]; title?: string }) {
  const [filter, setFilter] = useState<"all" |"residential" |"commercial">("all");
  const shown = strips.filter((s) => filter ==="all" || s.kind === filter);
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => (list.current ? revealChildren(list.current, "right", 110) : undefined), []);
  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
  ];
  return (
    <div className="lg:grid lg:grid-cols-[minmax(200px,14%)_1fr]">
      <div className="mb-6 flex items-baseline justify-between gap-6 lg:mb-0 lg:block">
        <div className="lg:sticky lg:top-6">
          <h2 className="head">{title}</h2>
          <p className="small mt-1 flex gap-5 lg:mt-4 lg:flex-col lg:gap-1">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`link inline-flex min-h-[44px] min-w-[44px] items-center text-left lg:min-h-0 lg:min-w-0 ${filter === f.id ? "link-on text-ink" : "text-muted"}`}
              >
                {f.label}
              </button>
            ))}
          </p>
        </div>
      </div>
      <div ref={list} className="strips space-y-11 overflow-clip">
        {shown.map((s) => (
          <article key={s.name} className="strip-row">
            <div className="strip ph">
              {s.photos.map((ph) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={ph.src} {...pictureAttrs(ph)} sizes="420px" alt={ph.alt} loading="lazy" decoding="async" />
              ))}
            </div>
            <p className="small mt-2 flex max-w-none justify-between gap-4">
              <span className="text-ink">{s.name}</span>
              <span className="hidden text-muted lg:inline">{s.descriptor}</span>
              <span className="text-right text-muted">{s.right}</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
