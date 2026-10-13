"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroDoor.module.css";

/** A real hinge in a shared perspective scene. Never blocks navigation or scroll. */
export default function HeroDoor() {
  const root = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [ready, setReady] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setReducedMotion(media.matches); if (media.matches) setPlaying(false); };
    sync();
    // Cached images may finish before React attaches the onLoad listener.
    if (root.current?.querySelector("img")?.complete) setReady(true);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion || !root.current) return;
    // Start only when this visual is visible; a hidden mobile hero never runs it.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setPlaying(true); observer.disconnect(); }
    }, { threshold: 0.35 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [ready, reducedMotion]);

  return (
    <figure ref={root} className={styles.visual} aria-label="A red door opens onto a completed Red Door Revivals kitchen renovation">
      <div className={styles.eyebrow}><span /> A new chapter begins</div>
      <div key={run} className={`${styles.scene} ${playing && !reducedMotion ? styles.playing : ""}`}>
        <div className={styles.drawing} aria-hidden="true"><i /><i /><i /><i /></div>
        <div className={styles.halo} aria-hidden="true" />
        <div className={styles.floor} aria-hidden="true" />
        <div className={styles.portal} aria-hidden="true">
          <div className={styles.cornice} />
          <div className={styles.transom}><span /><span /><span /></div>
          <div className={styles.opening}>
            <div className={styles.interior}>
              {/* Small, existing project asset; the first hero still keeps LCP priority. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/projects/res-kitchen-island.webp" alt="" decoding="async"
                onLoad={() => setReady(true)} onError={() => setReady(true)} />
            </div>
            <div className={styles.revealShadow} />
            <div className={styles.leaf}>
              <div className={styles.face}>
                <div className={styles.panels}>
                  {Array.from({ length: 6 }, (_, i) => <span key={i}><i className={styles.panelWell} /><i className={styles.panelTop} /><i className={styles.panelBottom} /><i className={styles.panelLeft} /><i className={styles.panelRight} /><i className={styles.panelRim} /></span>)}
                </div>
                <div className={styles.escutcheon}><span className={styles.screw} /><i className={styles.spindle} /><b className={styles.lever}><span /></b><em /><span className={`${styles.screw} ${styles.screwBottom}`} /></div>
                <div className={styles.kickplate} />
                <div className={styles.sheen} />
              </div>
              <div className={styles.edge}><i className={styles.latch} /></div>
              <div className={styles.topEdge} />
            </div>
            <span className={`${styles.hinge} ${styles.hingeTop}`} />
            <span className={`${styles.hinge} ${styles.hingeBottom}`} />
          </div>
          <div className={styles.threshold} />
        </div>
      </div>
      <figcaption className={styles.caption}>
        <div><span className={styles.captionRule} /><p>Open the door<br /><em>to what’s possible.</em></p></div>
        {!reducedMotion && <button type="button" className={styles.replay}
          aria-label="Replay door opening animation"
          onClick={() => { setPlaying(true); setRun(n => n + 1); }}>
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1.5 7M4 4v6h6" /></svg>
          <span>Replay</span>
        </button>}
      </figcaption>
    </figure>
  );
}
