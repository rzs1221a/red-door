"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { pictureAttrs } from "./Picture";
import DoorScene from "./DoorScene";
import { hero } from "@/lib/copy";
import { residential } from "@/lib/projects";
import { site } from "@/lib/site";

const SESSION_KEY = "red-door-arrival-v1";
const OPEN = 52; // the door artwork's fully open angle
const HOLD = "door-intro-holding"; // on <html> while the page beneath is held still (scroll lock, paused entrances)

/** y for a given x on a CSS cubic-bezier, so the easing can be baked into keyframes. */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  return (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = sampleX(t) - x;
      if (Math.abs(dx) < 1e-5) break;
      const d = (3 * ax * t + 2 * bx) * t + cx;
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    return sampleY(Math.min(1, Math.max(0, t)));
  };
}
const ease = cubicBezier(0.76, 0, 0.24, 1);

/** Where object-fit: cover; object-position: 58% center puts a w0×h0 picture in a w×h box. */
function cover(w: number, h: number, w0: number, h0: number) {
  const s = Math.max(w / w0, h / h0);
  const dw = w0 * s, dh = h0 * s;
  return { x: (w - dw) * 0.58, y: (h - dh) * 0.5, w: dw, h: dh };
}

// The room behind the door is the hero's own picture, so walking through lands on it.
const rooms = [{ label: "Kitchen", photo: residential.gallery[3] }];

/**
 * A bounded, once-per-session arrival: dark, then a light comes on behind the door, the lever
 * turns, the leaf opens, a held breath, and the view moves through the opening onto the page.
 * It never gates navigation or form submission; Skip and Escape end it at once.
 */
export default function DoorIntro() {
  // The room behind the door is the first large paint of the visit: ask for its exact candidate early.
  const room = pictureAttrs(rooms[0].photo);
  preload(room.src, { as: "image", imageSrcSet: room.srcSet, imageSizes: "320px", fetchPriority: "high" });
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("waiting");
  const [angle, setAngle] = useState(0);
  const timers = useRef<number[]>([]);
  const stepOut = useRef<HTMLDivElement | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    stepOut.current?.remove();
    stepOut.current = null;
    document.documentElement.classList.remove("door-intro-pending", HOLD);
    const shell = document.getElementById("site-shell");
    if (shell) shell.inert = false;
    const active = document.activeElement;
    if (active === skip.current || active === root.current) {
      if (previousFocus.current && previousFocus.current !== document.body) previousFocus.current.focus({ preventScroll: true });
      else document.getElementById("main")?.focus({ preventScroll: true });
    }
    try { sessionStorage.setItem(SESSION_KEY, "seen"); } catch { /* Storage can be unavailable in private browsing. */ }
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (!document.documentElement.classList.contains("door-intro-pending")) {
      setVisible(false);
      return;
    }
    let cancelled = false;
    const shell = document.getElementById("site-shell");
    previousFocus.current = document.activeElement as HTMLElement;
    if (shell) shell.inert = true;
    // Focus the screen itself, not the button, so no focus ring flashes on arrival; Tab reaches Skip.
    root.current?.focus({ preventScroll: true });
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timers.current.push(id);
    };
    // The hand-off: the room seen through the door steps out of the doorway and settles into its
    // place as the hero photograph, measured, while the dark ground brightens to the paper. Only
    // transforms and clip-path move (the compositor does the work, the page never lays out), and the
    // easing is baked into the keyframes so the picture keeps its proportions the whole way. Pages
    // without the hero picture simply have the lights come up around the door.
    let move: (() => void) | null = null;
    const prepare = async () => {
      const interior = document.querySelector<HTMLElement>(".door-intro .door-interior");
      const heroBox = document.querySelector<HTMLElement>(".hero-project .ph");
      const heroImg = heroBox?.querySelector("img");
      if (!interior || !heroBox || !heroImg) return;
      const from = interior.getBoundingClientRect();
      const to = heroBox.getBoundingClientRect();
      if (from.width === 0 || to.width === 0) return;
      const w0 = room.width, h0 = room.height;
      // The picture as the door shows it (cover, then the artwork's own 3% scale about the centre).
      const c1 = cover(from.width, from.height, w0, h0);
      const S1 = { w: c1.w * 1.03, h: c1.h * 1.03, x: from.left + from.width / 2 + (c1.x - from.width / 2) * 1.03, y: from.top + from.height / 2 + (c1.y - from.height / 2) * 1.03 };
      // The picture as the hero shows it.
      const c2 = cover(to.width, to.height, w0, h0);
      const S2 = { w: c2.w, h: c2.h, x: to.left + c2.x, y: to.top + c2.y };

      const box = document.createElement("div");
      box.className = "door-intro-stepout";
      Object.assign(box.style, { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px` });
      const img = document.createElement("img");
      img.src = heroImg.currentSrc || room.src; // the candidate the page has already decoded
      img.alt = "";
      Object.assign(img.style, { left: `${c2.x}px`, top: `${c2.y}px`, width: `${c2.w}px`, height: `${c2.h}px` });
      box.appendChild(img);
      await Promise.race([img.decode().catch(() => undefined), new Promise((r) => setTimeout(r, 250))]);
      if (cancelled) return;

      const sx = from.width / to.width, sy = from.height / to.height;
      const steps = 30;
      const outer: Keyframe[] = [], inner: Keyframe[] = [];
      const filterAt = (e: number) => `brightness(${0.92 + 0.08 * e}) saturate(${0.8 + 0.2 * e})`;
      for (let i = 0; i <= steps; i++) {
        const p = i / steps, e = ease(p);
        const tx = (from.left - to.left) * (1 - e), ty = (from.top - to.top) * (1 - e);
        const kx = sx + (1 - sx) * e, ky = sy + (1 - sy) * e;
        const clip = 58 * (1 - Math.min(1, p / 0.3));
        outer.push({ offset: p, transform: `translate(${tx}px, ${ty}px) scale(${kx}, ${ky})`, clipPath: `inset(0 0 0 ${clip}%)` });
        // Where the picture must be on screen at this moment, then the inner transform that puts it there under the outer one.
        const S = { x: S1.x + (S2.x - S1.x) * e, y: S1.y + (S2.y - S1.y) * e, w: S1.w + (S2.w - S1.w) * e, h: S1.h + (S2.h - S1.h) * e };
        const ax = (S.x - to.left - tx) / kx - c2.x, ay = (S.y - to.top - ty) / ky - c2.y;
        const bx = S.w / (kx * c2.w), by = S.h / (ky * c2.h);
        inner.push({ offset: p, transform: `translate(${ax}px, ${ay}px) scale(${bx}, ${by})`, filter: filterAt(e) });
      }
      // Stand it in the doorway now, identical to the room behind the leaf, so it is rasterised
      // before the move; the move then only starts the animations from this exact state.
      box.style.transform = outer[0].transform as string;
      box.style.clipPath = outer[0].clipPath as string;
      img.style.transform = inner[0].transform as string;
      img.style.filter = inner[0].filter as string;
      document.body.appendChild(box);
      stepOut.current = box;
      move = () => {
        const opts: KeyframeAnimationOptions = { duration: 900, easing: "linear", fill: "forwards" };
        box.animate(outer, opts);
        img.animate(inner, opts);
      };
    };
    const through = () => {
      setPhase("through");
      move?.();
    };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => { if (motion.matches) dismiss(); };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
      // The skip button is the only focusable element in the arrival screen.
      if (event.key === "Tab") { event.preventDefault(); skip.current?.focus(); }
    };
    motion.addEventListener("change", onMotion);
    document.addEventListener("keydown", onKey);

    // Wait for the real first-view assets (fonts, the room behind the door, the hero picture it
    // lands on), with a deadline for slow or failed requests.
    const decode = (sel: string) => document.querySelector<HTMLImageElement>(sel)?.decode().catch(() => undefined) ?? Promise.resolve();
    const assets = Promise.allSettled([document.fonts.ready, decode(".door-intro .door-interior img"), decode(".hero-project img")]);
    const deadline = new Promise<void>(resolve => later(resolve, 1500));
    Promise.race([assets, deadline]).then(() => {
      if (cancelled || !document.documentElement.classList.contains("door-intro-pending")) return;
      setPhase("lit"); // t=0: a light comes on behind the door
      later(() => setPhase("opening"), 600); // the lever turns
      later(() => setAngle(OPEN), 1300); // the latch releases, the leaf swings (2.2s)
      later(prepare, 3450); // the leaf has settled: stand the room in the doorway, ready
      later(through, 3700); // after a held breath, the room steps out of the doorway
      later(() => {
        // Release the page a beat before the screen goes, so its entrances and the scroll lock
        // are not in the same frame as the unmount.
        document.documentElement.classList.remove(HOLD);
        setPhase("exiting");
      }, 4600);
      later(dismiss, 4900);
    });
    later(dismiss, 7000); // also covers a failed image, font, or interrupted transition

    return () => {
      cancelled = true;
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
      if (shell) shell.inert = false;
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("keydown", onKey);
    };
  }, [dismiss, visible]);

  if (!visible) return null;
  return (
    <div ref={root} tabIndex={-1} className={`door-intro is-${phase}`} role="dialog" aria-modal="true" aria-label="Welcome to Red Door Revivals">
      <div className="door-intro-header">
        <span className="door-intro-brand">Red Door Revivals</span>
        <button ref={skip} className="door-intro-skip" type="button" onClick={dismiss}>Skip</button>
      </div>
      <div className="door-intro-art" aria-hidden="true"><DoorScene rooms={rooms} angle={angle} /></div>
      <div className="door-intro-footer"><p>{hero.headline}</p><span>{site.city}, Florida</span></div>
    </div>
  );
}
