"use client";

import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/projects";
import { pictureAttrs } from "./Picture";
import { revealChildren } from "./Reveal";

type Owner = { name: string; service: string; text: string; photo: Photo };

// Sticky photograph, active list: the row in the middle of the screen (or under the hand) is
// active, its description opens, and the photograph crossfades to its image.
export default function OwnersList({ heading, owners }: { heading: string; owners: Owner[] }) {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const hovering = useRef(false);
  const list = useRef<HTMLUListElement>(null);
  useEffect(() => (list.current ? revealChildren(list.current, "up", 70) : undefined), []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (hovering.current) return;
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      // On the phone the photograph holds the top of the screen, so the active band sits below it.
      { rootMargin: window.matchMedia("(min-width: 768px)").matches ? "-45% 0px -45% 0px" : "-44% 0px -36% 0px", threshold: 0 },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="owners-heading" className="wrap">
      <div className="grid12 items-start">
        <h2 id="owners-heading" className="head col-span-12 mb-8 md:col-span-5 md:col-start-7 md:row-start-1 md:mb-12">{heading}</h2>
        <div className="sticky top-0 z-10 col-span-12 bg-bg pb-3 md:top-[12vh] md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1 md:pb-0">
          <div className="ph relative h-[38svh] overflow-hidden md:aspect-[4/5] md:h-auto">
          {owners.map((o, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={o.photo.src}
              {...pictureAttrs(o.photo)}
              sizes="(min-width: 768px) 40vw, 100vw"
              alt={i === active ? o.photo.alt : ""}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: i === active ? 1 : 0, transition: "opacity 300ms ease" }}
            />
          ))}
          </div>
        </div>
        <div className="col-span-12 pt-10 md:col-span-5 md:col-start-7 md:row-start-2 md:pt-0">
          <ul ref={list} onMouseEnter={() => (hovering.current = true)} onMouseLeave={() => (hovering.current = false)}>
            {owners.map((o, i) => (
              <li
                key={o.name}
                data-i={i}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                className="min-h-[56px] py-3.5 md:py-4"
                onMouseEnter={() => setActive(i)}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={i === active}
                  className={`flex w-full flex-col items-start gap-0.5 text-left transition-colors duration-200 md:flex-row md:items-baseline md:justify-between md:gap-6 ${i === active ? "text-ink" : "text-muted"}`}
                >
                  <span className="index-name">{o.name}</span>
                  <span className="small text-muted md:max-w-[45%] md:text-right">{o.service}</span>
                </button>
                <div className="faq-panel" style={{ gridTemplateRows: i === active ? "1fr" : "0fr" }}>
                  <div>
                    <p className="note max-w-[34ch] pt-2 text-muted">{o.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
