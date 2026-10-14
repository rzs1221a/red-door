"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DoorScene from "./DoorScene";
import { doorRooms } from "@/lib/home";

const SESSION_KEY = "red-door-arrival-v1";

/** A bounded, once-per-session arrival. It never gates navigation or form submission. */
export default function DoorIntro() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("waiting");
  const [angle, setAngle] = useState(0);
  const timers = useRef<number[]>([]);
  const skip = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    document.documentElement.classList.remove("door-intro-pending");
    const shell = document.getElementById("site-shell");
    if (shell) shell.inert = false;
    if (document.activeElement === skip.current) {
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
    skip.current?.focus({ preventScroll: true });
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

    // Wait for the real first-view assets, with a deadline for slow or failed requests.
    const image = document.querySelector<HTMLImageElement>(".hero-project img");
    const assets = Promise.allSettled([document.fonts.ready, image?.decode() ?? Promise.resolve()]);
    const deadline = new Promise<void>(resolve => later(resolve, 1500));
    Promise.race([assets, deadline]).then(() => {
      if (cancelled || !document.documentElement.classList.contains("door-intro-pending")) return;
      setPhase("opening");
      later(() => setAngle(38), 480); // lever releases the latch before the leaf moves
      later(() => setPhase("exiting"), 2600);
      later(dismiss, 3250);
    });
    later(dismiss, 5500); // also covers a failed image, font, or interrupted transition

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
    <div className={`door-intro is-${phase}`} role="dialog" aria-modal="true" aria-label="Welcome to Red Door Revivals">
      <div className="door-intro-header">
        <span className="door-intro-brand">Red Door Revivals</span>
        <button ref={skip} className="door-intro-skip" type="button" onClick={dismiss}>Skip intro ↗</button>
      </div>
      <div className="door-intro-art" aria-hidden="true"><DoorScene rooms={doorRooms} angle={angle} /></div>
      <div className="door-intro-footer"><p>A new chapter begins.</p><span>Fernandina Beach, Florida</span></div>
    </div>
  );
}
