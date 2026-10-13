"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { ArrowRight, Phone } from "./icons";

const hiddenOn = new Set(["/contact", "/client-portal"]);

export default function MobileCtaBar() {
  const pathname = (usePathname() ?? "/").replace(/\/+$/, "") || "/";
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShown(window.scrollY > 320));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (hiddenOn.has(pathname)) return null;

  return (
    <div
      className={`pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-md transition-transform duration-500 ease-out-expo md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!shown}
    >
      <div className="grid grid-cols-[1fr_1.4fr] gap-2 px-3 py-2.5">
        <a
          href={`tel:${site.phone.tel}`}
          className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-ink/80 py-3 text-[0.92rem] font-medium"
          tabIndex={shown ? 0 : -1}
        >
          <Phone size={16} /> Call
        </a>
        <Link
          href="/contact/"
          className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-door py-3 text-[0.92rem] font-medium text-white"
          tabIndex={shown ? 0 : -1}
        >
          Get a consultation <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
