"use client";

import { useEffect, useRef, useState } from "react";

// A figure that counts up once, the first time it is seen. Reduced motion shows the figure at once.
export default function CountUp({ value, className, style }: { value: string; className?: string; style?: React.CSSProperties }) {
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? Number(m[1]) : NaN;
  const suffix = m ? m[2] : "";
  const [n, setN] = useState<number | null>(null);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target) || target === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1100;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setN(0);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <p ref={ref} className={className} style={{ ...style, fontVariantNumeric: "tabular-nums" }}>
      {Number.isNaN(target) ? value : `${n ?? target}${suffix}`}
    </p>
  );
}
