"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const normalize = (p: string | null) => (p ?? "/").replace(/\/+$/, "") || "/";

// Phone only (globals.css hides it from 768px up): one primary action and a call, in thumb reach,
// after the first screen has been read. Not on the contact page (the form is the action) or the
// portal page. Hidden while the keyboard is up and in short landscape screens.
export default function ActionBar() {
  const pathname = normalize(usePathname());
  const [on, setOn] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const hidden = pathname === "/contact" || pathname === "/client-portal";

  useEffect(() => {
    if (hidden) return;
    const onScroll = () => setOn(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const vv = window.visualViewport;
    const onResize = () => setKeyboard(!!vv && vv.height < window.innerHeight * 0.75);
    vv?.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      vv?.removeEventListener("resize", onResize);
    };
  }, [hidden]);

  if (hidden) return null;
  return (
    <div className={`action-bar ${on && !keyboard ? "is-on" : ""}`} aria-label="Get in touch">
      <Link href="/contact/" className="btn">Request a consultation</Link>
      <a href={`tel:${site.phone.tel}`} className="btn btn--ink">Call</a>
    </div>
  );
}
