"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DoorScene from "./DoorScene";
import { hero } from "@/lib/copy";
import { residential } from "@/lib/projects";
import { site } from "@/lib/site";

const SESSION_KEY = "red-door-arrival-v1";
const OPEN = 52; // the door artwork's fully open angle

// The room behind the door is the hero's own picture, so walking through lands on it.
const rooms = [{ label: "Kitchen", photo: residential.gallery[3] }];

/**
 * A bounded, once-per-session arrival: dark, then a light comes on behind the door, the lever
 * turns, the leaf opens, a held breath, and the view moves through the opening onto the page.
 * It never gates navigation or form submission; Skip and Escape end it at once.
 */
export default function DoorIntro() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("waiting");
  const [angle, setAngle] = useState(0);
  const timers = useRef<number[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    document.documentElement.classList.remove("door-intro-pending");
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
      later(() => setPhase("through"), 3700); // after a held breath, move through the opening
      later(() => setPhase("exiting"), 4100);
      later(dismiss, 4600);
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
