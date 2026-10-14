"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

// The tour's guide: on wide screens a list of the stops that stays in view, the current one marked;
// on a phone one line at the top of the screen, "Stop 3 of 7", with the way to the next. Both read
// the stops already on the page, so the page itself is complete without them.
export default function TourRail({ items }: { items: Item[] }) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = items.map((s) => document.getElementById(`stop-${s.id}`)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(sections.indexOf(e.target as HTMLElement));
        }
      },
      // The stop crossing the band just below the top of the screen is the current one.
      { rootMargin: "-18% 0px -72% 0px", threshold: 0 },
    );
    sections.forEach((el) => io.observe(el));
    const onTop = () => { if (window.scrollY < 40) setActive(-1); };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onTop); };
  }, [items]);

  const current = active < 0 ? null : items[active];
  const next = active + 1 < items.length ? items[active + 1] : null;

  return (
    <>
      <ol className="tour-rail" aria-label="Stops">
        {items.map((s, i) => (
          <li key={s.id} className={i === active ? "is-current" : ""} aria-current={i === active ? "step" : undefined}>
            <a href={`#stop-${s.id}`} className="link">
              <span className="tour-rail-n">{i + 1}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
      <div className={`tour-strip ${current ? "is-on" : ""}`} aria-hidden={!current}>
        <span>
          <span className="text-muted">Stop {active + 1} of {items.length} · </span>
          {current?.label}
        </span>
        {next ? <a href={`#stop-${next.id}`} className="link">Next: {next.label}</a> : <a href="#tour-end" className="link">The end</a>}
      </div>
    </>
  );
}
