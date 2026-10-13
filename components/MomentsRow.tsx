"use client";

import { useEffect, useRef, useState } from "react";
import Picture from "./Picture";
import { ArrowLeft, ArrowRight } from "./icons";
import type { Photo } from "@/lib/projects";

// A story told left to right: seven columns in a scroll-snapping row, a 6px progress bar above.
export default function MomentsRow({
  heading,
  moments,
}: {
  heading: string;
  moments: { title: string; text: string; photo: Photo; space: number }[];
}) {
  const ref = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 1;
      setProgress(p);
      setAtStart(el.scrollLeft < 4);
      setAtEnd(el.scrollLeft > max - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="process-heading">
      <div className="wrap flex items-end justify-between gap-6">
        <h2 id="process-heading" className="head">{heading}</h2>
        <div className="hidden gap-2 md:flex">
          <button type="button" className="square-btn" onClick={() => step(-1)} disabled={atStart} aria-label="Earlier steps">
            <ArrowLeft size={20} />
          </button>
          <button type="button" className="square-btn" onClick={() => step(1)} disabled={atEnd} aria-label="Later steps">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="wrap mt-6">
        <div className="h-1.5 w-full bg-surface" aria-hidden="true">
          <div className="h-full bg-ink" style={{ width: `${Math.max(8, Math.round(progress * 100))}%`, transition: "width 120ms linear" }} />
        </div>
      </div>
      <ol ref={ref} className="row-scroll mt-10 pb-4">
        {moments.map((m, i) => (
          <li key={m.title} className="w-[72vw] sm:w-[280px]">
            <p className="font-medium">{m.title}</p>
            <p className="small mt-2 text-muted">{m.text}</p>
            <div aria-hidden="true" style={{ height: `clamp(32px, ${m.space / 2}px + 2vw, ${m.space}px)` }} />
            <Picture photo={m.photo} sizes="280px" className="aspect-[4/5] overflow-hidden" imgClassName="h-full object-cover" priority={i === 0} />
          </li>
        ))}
      </ol>
    </section>
  );
}
