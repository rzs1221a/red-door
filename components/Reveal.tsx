"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Scroll-reveal that never changes server markup: the "pending" class is added only after
// mount and only to elements below the fold, so no-JS visitors and the LCP are untouched.

let observer: IntersectionObserver | null = null;
function observe(el: Element) {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer!.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
  }
  observer.observe(el);
}

type Variant = "up" | "fade" | "left" | "scale";

export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  style,
  ...rest
}: {
  children: ReactNode;
  as?: "div" | "section" | "li" | "article" | "figure" | "p" | "span" | "header" | "ul" | "ol";
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // already on screen: leave it alone
    el.classList.add("reveal-pending", `reveal-${variant}`);
    observe(el);
    return () => observer?.unobserve(el);
  }, [variant]);

  const T = Tag as "div";
  return (
    <T
      ref={ref as never}
      className={className}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style}
      {...rest}
    >
      {children}
    </T>
  );
}

/** Observes its own direct children; each gets an --i index for CSS stagger via .reveal-group. */
export function RevealGroup({
  children,
  className = "",
  stagger = 90,
  as: Tag = "div",
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
  variant?: Variant;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const pending: HTMLElement[] = [];
    kids.forEach((k, i) => {
      k.style.setProperty("--i", String(i));
      if (k.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      k.classList.add("reveal-pending", `reveal-${variant}`);
      observe(k);
      pending.push(k);
    });
    return () => pending.forEach((k) => observer?.unobserve(k));
  }, [variant]);

  const T = Tag as "div";
  return (
    <T ref={ref as never} className={`reveal-group ${className}`} style={{ "--stagger": `${stagger}ms` } as CSSProperties}>
      {children}
    </T>
  );
}
