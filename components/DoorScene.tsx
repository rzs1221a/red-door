"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "@/lib/projects";
import { pictureAttrs } from "./Picture";

// The red door from the supplied preview, made live: it swings open on arrival, and the visitor
// can drag the leaf, move the slider, and choose which finished Red Door room stands behind it.
// Without script the door stands open on the first room (see the <noscript> style).

const OPEN = 54; // the preview's resting angle (≈ -38deg)

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
  controls,
}: {
  rooms: { label: string; photo: Photo }[];
  interactive?: boolean;
  /** Resting angle 0–100 when not interactive (the 404 page shows it shut). */
  initialAngle?: number;
  className?: string;
  region?: string;
  /** id of an element to render the controls into (the hero puts them in the band under the door). */
  controls?: string;
}) {
  const [angle, setAngle] = useState(interactive ? 0 : initialAngle);
  const [room, setRoom] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; a: number } | null>(null);
  const id = useId();

  useEffect(() => {
    if (controls) setTarget(document.getElementById(controls));
  }, [controls]);

  // Swing open once the page has settled (CSS transitions the leaf from 0 to OPEN).
  useEffect(() => {
    if (!interactive) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setAngle(OPEN), reduced ? 0 : 450);
    return () => window.clearTimeout(t);
  }, [interactive]);

  const clamp = (v: number) => Math.min(100, Math.max(0, v));

  const panel = interactive ? (
    <div className={controls ? "w-full max-w-[360px]" : "mx-auto mt-2 max-w-[410px]"}>
      <label htmlFor={id} className="block">Open the door</label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={Math.round(angle)}
        onChange={(e) => setAngle(Number(e.target.value))}
        className="range"
        aria-valuetext={`${Math.round(angle)} percent open`}
      />
      <p className="flex max-w-none flex-wrap items-baseline gap-x-4 gap-y-1" aria-label="What stands behind the door">
        <span className="text-muted">Behind it:</span>
        {rooms.map((r, i) => (
          <button
            key={r.label}
            type="button"
            aria-pressed={i === room}
            onClick={() => {
              setRoom(i);
              if (angle < 30) setAngle(OPEN);
            }}
            className={`link min-h-[44px] ${i === room ? "link-on" : "text-muted"}`}
          >
            {r.label}
          </button>
        ))}
      </p>
    </div>
  ) : null;

  return (
    <div className={className}>
      <noscript>
        <style>{`[data-ui].door{--door-angle:${OPEN}}`}</style>
      </noscript>
      <figure
        ref={ref}
        data-ui
        className={`door ${dragging ? "is-dragging" : ""}`}
        style={{ "--door-angle": angle } as React.CSSProperties}
        aria-label={`A red front door opening onto a finished ${rooms[room].label.toLowerCase()}, a Red Door Revivals project in the ${region}`}
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
                setAngle(clamp(drag.current.a + ((e.clientX - drag.current.x) / w) * 180));
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
      </figure>
      {panel && (controls ? (target ? createPortal(panel, target) : null) : panel)}
    </div>
  );
}
