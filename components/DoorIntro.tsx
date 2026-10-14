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
const MOVE = 1200; // the room's move out of the doorway, ms
const WAIT = 6000; // the longest the dark screen waits for its pictures and fonts, ms
const EASE = "cubic-bezier(.7, 0, .15, 1)"; // a slow start and a long, soft landing

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
const ease = cubicBezier(0.7, 0, 0.15, 1);

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
    // The page's own fallback (app/layout.tsx) is for a script that never runs; from here the
    // arrival keeps its own time, so a late start is never cut short.
    window.clearTimeout((window as Window & { __doorIntroFallback?: number }).__doorIntroFallback);
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
    // place as the hero photograph, measured, while the dark ground brightens to the paper. Three
    // nested layers move, each by translation only (the window's near corner, its far corner, and
    // the picture inside it at one uniform scale), so every frame is composed on the compositor
    // from bitmaps drawn once: nothing is laid out, painted, clipped or filtered on the way. The
    // easing is baked into dense keyframes so the layers stay in step and the picture keeps its
    // proportions. Pages without the hero picture simply have the lights come up around the door.
    let move: (() => void) | null = null;
    const prepare = async () => {
      const intro = root.current;
      const interior = intro?.querySelector<HTMLElement>(".door-interior");
      const heroBox = document.querySelector<HTMLElement>(".hero-project .ph");
      const heroImg = heroBox?.querySelector("img");
      const roomImg = interior?.querySelector("img");
      if (!intro || !interior || !heroBox || !heroImg) return;
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
      // How much of the doorway the open leaf still hides, from its projected edge, plus a little
      // of its cast on the room.
      let leafRight = from.left;
      intro.querySelectorAll<HTMLElement>(".door-leaf, .door-back").forEach((part) => { leafRight = Math.max(leafRight, part.getBoundingClientRect().right); });
      const covered = Math.min(0.9, Math.max(0, (leafRight - from.left) / from.width + 0.025));
      const vw = window.innerWidth, vh = window.innerHeight;

      const make = (className: string, parent: HTMLElement | null, size: [number, number]) => {
        const el = document.createElement("div");
        el.className = className;
        Object.assign(el.style, { width: `${size[0]}px`, height: `${size[1]}px` });
        parent?.appendChild(el);
        return el;
      };
      // The window is the overlap of two viewport-sized clips: one holds its near corner, the
      // other its far corner. Inside, the picture at the hero's size, as the door lit it and as the
      // page shows it, the second fading in over the first.
      const box = make("door-intro-stepout", null, [vw, vh]);
      const end = make("door-intro-stepout-end", box, [vw, vh]);
      const pic = make("door-intro-stepout-pic", end, [c2.w, c2.h]);
      // The candidate the page has already loaded; if the hero picture is still on its way, the
      // room's own copy, which is on screen already.
      const src = (heroImg.complete && heroImg.naturalWidth > 0 && heroImg.currentSrc) || roomImg?.currentSrc || room.src;
      const [, lit] = [0, 1].map(() => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        pic.appendChild(img);
        return img;
      });
      // The doorway's own shading over the room (the artwork's own shading at the jamb and the top, the warm fall-off at
      // the floor, the leaf's faint cast), laid out at the doorway's size so it matches to the
      // pixel when the room is stood in place; it lifts as the room comes out.
      const veil = make("door-intro-stepout-veil", box, [from.width, from.height]);
      await Promise.race([lit.decode().catch(() => undefined), new Promise((r) => setTimeout(r, 250))]);
      if (cancelled) return;

      const steps = 96;
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const px = (n: number) => `${Math.round(n * 100) / 100}px`;
      const kBox: Keyframe[] = [], kEnd: Keyframe[] = [], kPic: Keyframe[] = [], kVeil: Keyframe[] = [];
      for (let i = 0; i <= steps; i++) {
        const p = i / steps, e = ease(p);
        // The window: the doorway becoming the hero's frame, less the strip the leaf still hides,
        // which it gives up over the first part of the move.
        const l = lerp(from.left, to.left, e), t = lerp(from.top, to.top, e);
        const r = l + lerp(from.width, to.width, e), b = t + lerp(from.height, to.height, e);
        const near = l + (r - l) * covered * (1 - Math.min(1, e / 0.35));
        // Where the picture is on screen at this moment: both crops show the same photograph, so
        // it moves at one uniform scale.
        const S = { x: lerp(S1.x, S2.x, e), y: lerp(S1.y, S2.y, e), w: lerp(S1.w, S2.w, e) };
        kBox.push({ offset: p, transform: `translate(${px(near)}, ${px(t)})` });
        kEnd.push({ offset: p, transform: `translate(${px(r - vw - near)}, ${px(b - vh - t)})` });
        kPic.push({ offset: p, transform: `translate(${px(S.x - (r - vw))}, ${px(S.y - (b - vh))}) scale(${Math.round((S.w / c2.w) * 1e5) / 1e5})` });
        kVeil.push({ offset: p, transform: `translate(${px(l - near)}, 0px) scale(${Math.round(((r - l) / from.width) * 1e5) / 1e5}, ${Math.round(((b - t) / from.height) * 1e5) / 1e5})` });
      }
      // Stand it in the doorway now, identical to the room behind the leaf, so its layers are
      // drawn before the move; the move then only starts the animations from this exact state.
      box.style.transform = kBox[0].transform as string;
      end.style.transform = kEnd[0].transform as string;
      pic.style.transform = kPic[0].transform as string;
      veil.style.transform = kVeil[0].transform as string;
      document.body.appendChild(box);
      stepOut.current = box;
      move = () => {
        const opts: KeyframeAnimationOptions = { duration: MOVE, easing: "linear", fill: "forwards" };
        box.animate(kBox, opts);
        end.animate(kEnd, opts);
        pic.animate(kPic, opts);
        veil.animate(kVeil, opts);
        veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: MOVE * 0.4, easing: "ease-out", fill: "forwards" });
        lit.animate([{ opacity: 0 }, { opacity: 1 }], { duration: MOVE, easing: EASE, fill: "forwards" });
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

    // Nothing starts until everything the visitor will see has arrived: the fonts, the room
    // behind the door, the hero picture it lands on and the logo above it. A picture is ready
    // when it has loaded. Safari can leave img.decode() unsettled for ever, so the room's
    // visibility never waits on it: decoding is warmed on a detached copy, for half a second at
    // most, and the room is drawn with synchronous decoding so it can never paint late.
    const loaded = (img: HTMLImageElement | null) =>
      new Promise<boolean>((resolve) => {
        if (!img) return resolve(true);
        if (img.complete) return resolve(img.naturalWidth > 0);
        img.addEventListener("load", () => resolve(true), { once: true });
        img.addEventListener("error", () => resolve(false), { once: true });
      });
    const warm = (img: HTMLImageElement | null) =>
      new Promise<void>((resolve) => {
        const src = img?.currentSrc || img?.src;
        if (!src) return resolve();
        const copy = new Image();
        copy.src = src;
        copy.decode().then(() => resolve(), () => resolve());
        window.setTimeout(resolve, 500);
      });
    const roomImg = root.current?.querySelector<HTMLImageElement>(".door-interior img") ?? null;
    const heroImg = document.querySelector<HTMLImageElement>(".hero-project img");
    const logo = document.querySelector<HTMLImageElement>("#site-shell header img");
    if (roomImg) roomImg.decoding = "sync";
    let roomReady = !roomImg;
    const roomArrived = loaded(roomImg).then((ok) => {
      if (!ok) return dismiss(); // no room to walk into: straight to the page
      roomReady = true;
      if (roomImg) roomImg.dataset.ready = "1";
      return warm(roomImg);
    });
    const assets = Promise.all([
      roomArrived,
      loaded(heroImg).then((ok) => (ok ? warm(heroImg) : undefined)),
      loaded(logo),
      document.fonts.ready,
    ]).then(() => true, () => true);
    const deadline = new Promise<boolean>((resolve) => later(() => resolve(false), WAIT));
    let started = false;
    const start = () => {
      if (started || cancelled || !document.documentElement.classList.contains("door-intro-pending")) return;
      started = true;
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
      }, 3700 + MOVE);
      later(dismiss, 4000 + MOVE);
      later(dismiss, 7000); // also covers an interrupted transition
    };
    // On a connection too slow for the room to arrive in time, the door never opens onto an
    // empty doorway: the visitor goes straight to the page.
    Promise.race([assets, deadline]).then(() => (roomReady ? start() : dismiss()));

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
