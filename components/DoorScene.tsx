"use client";

import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/projects";
import { pictureAttrs } from "./Picture";

// The red door from the supplied preview, made live without any control beside it: it swings
// open on arrival, leans with the pointer, opens wider as the page is scrolled into, and swings
// if the visitor takes hold of the leaf. The finished room behind it changes on its own. Without
// script the door stands open on the first room (see the <noscript> style).

const OPEN = 54; // the preview's resting angle (≈ -38deg)
const ARRIVAL_MS = 450;
const ROOM_MS = 6500;

const clamp = (v: number) => Math.min(100, Math.max(0, v));

function Leaf() {
  return (
    <div className="door-leaf">
      <div className="door-face">
        <div className="door-panels">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              <i className="door-panel-well" />
              <i className="door-panel-top" />
              <i className="door-panel-bottom" />
              <i className="door-panel-left" />
              <i className="door-panel-right" />
              <i className="door-panel-rim" />
            </span>
          ))}
        </div>
        <div className="door-escutcheon">
          <span className="door-screw" />
          <i className="door-spindle" />
          <b className="door-lever">
            <span />
          </b>
          <em className="door-keyhole" />
          <span className="door-screw door-screw-bottom" />
        </div>
        <div className="door-kickplate" />
        <div className="door-sheen" />
      </div>
      <div className="door-edge">
        <i className="door-latch" />
      </div>
      <div className="door-top-edge" />
    </div>
  );
}

export default function DoorScene({
  rooms,
  interactive = true,
  initialAngle = OPEN,
  className = "",
  region = "Atlanta area",
  caption = false,
  scroll = false,
}: {
  rooms: { label: string; photo: Photo }[];
  interactive?: boolean;
  /** Resting angle 0–100 when not interactive. */
  initialAngle?: number;
  className?: string;
  region?: string;
  /** Name the room behind the door in a caption under it. */
  caption?: boolean;
  /** Open the door wider as the first screen is scrolled away (the hero). */
  scroll?: boolean;
}) {
  const [angle, setAngle] = useState(interactive ? 0 : initialAngle);
  const [room, setRoom] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [settled, setSettled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; a: number } | null>(null);
  // The angle is composed: a rest that follows the scroll, the visitor's own swing, and a lean
  // that follows the pointer. Kept in refs so the listeners never go stale.
  const parts = useRef({ rest: OPEN, swing: 0, lean: 0 });
  const reduced = useRef(false);

  const compose = () => {
    const p = parts.current;
    setAngle(clamp(p.rest + p.swing + p.lean));
  };

  // Swing open once the page has settled (CSS transitions the leaf from 0 to OPEN).
  useEffect(() => {
    if (!interactive) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setAngle(OPEN), reduced.current ? 0 : ARRIVAL_MS);
    const s = window.setTimeout(() => setSettled(true), reduced.current ? 0 : ARRIVAL_MS + 3400);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(s);
    };
  }, [interactive]);

  // After arrival: lean with a fine pointer, open with the scroll.
  useEffect(() => {
    if (!interactive || !settled || reduced.current) return;
    let raf = 0;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      if (drag.current || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth; // -0.5 … 0.5
      parts.current.lean = Math.max(-14, Math.min(14, dx * 36));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compose);
    };
    const onScroll = () => {
      if (drag.current) return;
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.7)));
      parts.current.rest = OPEN + (100 - OPEN) * p;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compose);
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    if (scroll) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [interactive, settled, scroll]);

  // The room behind the door changes on its own while the door is in view.
  useEffect(() => {
    if (!interactive || rooms.length < 2 || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const start = () => {
      stop();
      timer = window.setInterval(() => setRoom((r) => (r + 1) % rooms.length), ROOM_MS);
    };
    const stop = () => window.clearInterval(timer);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()), { threshold: 0.4 });
    io.observe(ref.current);
    const vis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", vis);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, [interactive, rooms.length]);

  const current = rooms[room];
  const line = `Behind the door, a ${current.label.toLowerCase()} Red Door built in the ${region}.`;

  return (
    <div className={className}>
      <noscript>
        <style>{`[data-ui].door{--door-angle:${OPEN}}`}</style>
      </noscript>
      <figure
        ref={ref}
        data-ui
        className={`door ${dragging ? "is-dragging" : ""} ${settled ? "is-settled" : ""}`}
        style={{ "--door-angle": angle } as React.CSSProperties}
        aria-label={caption ? undefined : `A red front door opening onto a finished ${current.label.toLowerCase()}, a Red Door Revivals project in the ${region}`}
      >
        <div className="door-scene">
          <div className="door-halo" aria-hidden="true" />
          <div className="door-floor" aria-hidden="true" />
          <div className="door-portal" aria-hidden="true">
            <div className="door-cornice" />
            <div className="door-transom">
              <span />
              <span />
              <span />
            </div>
            <div
              className="door-opening"
              onPointerDown={(e) => {
                if (!interactive) return;
                drag.current = { x: e.clientX, a: angle };
                (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
                setDragging(true);
              }}
              onPointerMove={(e) => {
                if (!drag.current) return;
                const w = ref.current?.getBoundingClientRect().width ?? 300;
                const a = clamp(drag.current.a + ((e.clientX - drag.current.x) / w) * 180);
                parts.current.swing = a - parts.current.rest - parts.current.lean;
                setAngle(a);
              }}
              onPointerUp={() => {
                drag.current = null;
                setDragging(false);
              }}
              onPointerCancel={() => {
                drag.current = null;
                setDragging(false);
              }}
            >
              <div className="door-interior">
                {rooms.map((r, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={r.photo.src} {...pictureAttrs(r.photo)} sizes="300px" alt="" className={i === room ? "is-on" : ""} loading={i === 0 ? "eager" : "lazy"} decoding="async" draggable={false} />
                ))}
              </div>
              <div className="door-reveal-shadow" />
              <Leaf />
            </div>
            <span className="door-hinge door-hinge-top" />
            <span className="door-hinge door-hinge-bottom" />
          </div>
          <div className="door-threshold" aria-hidden="true" />
        </div>
        {caption && <figcaption className="door-caption small">{line}</figcaption>}
      </figure>
    </div>
  );
}
