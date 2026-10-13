"use client";

import { useEffect, useState } from "react";
import type { Photo } from "@/lib/projects";
import { pictureAttrs } from "./Picture";

// The first still is server-rendered and is the LCP image. The other stills, and the
// crossfade/drift animation, are added after the page is idle so they never compete
// with the first paint. Reduced motion keeps the single still.
export default function HeroMedia({ stills, className = "" }: { stills: Photo[]; className?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: number | undefined;
    const start = () => setReady(true);
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const t = window.setTimeout(() => {
      if (idle) id = idle(start, { timeout: 2000 });
      else start();
    }, 1500);
    return () => {
      window.clearTimeout(t);
      if (id !== undefined) (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    };
  }, []);

  const sizes = "(max-width: 640px) 640px, 100vw";
  return (
    <div className={`hero-stills absolute inset-0 overflow-hidden ${ready ? "hero-stills--animate" : ""} ${className}`} aria-hidden="true">
      <div className="hero-still">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...pictureAttrs(stills[0])} sizes={sizes} alt="" loading="eager" fetchPriority="high" decoding="async" />
      </div>
      {ready &&
        stills.slice(1).map((ph) => (
          <div key={ph.src} className="hero-still">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...pictureAttrs(ph)} sizes={sizes} alt="" decoding="async" />
          </div>
        ))}
    </div>
  );
}
