"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";
import { ArrowRight, Phone } from "./icons";

export const normalizePath = (p: string | null) => (p ?? "/").replace(/\/+$/, "") || "/";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = normalizePath(usePathname());
  const home = pathname === "/";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Transparent over the home hero until the page scrolls.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Mobile menu is a native <dialog>: focus trap, Escape, and top layer for free.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.classList.add("scroll-locked");
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  function onClose() {
    document.body.classList.remove("scroll-locked");
    setOpen(false);
    buttonRef.current?.focus();
  }

  const overlay = home && !scrolled && !open;
  const linkBase = "link-underline whitespace-nowrap text-[0.93rem] transition-colors";
  const linkTone = overlay ? "text-white/90 hover:text-white" : "text-ink hover:text-ink";

  return (
    <header
      className={`${home ? "fixed" : "sticky"} inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-500 ${
        overlay
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line/80 bg-paper/92 shadow-[0_1px_0_rgba(29,43,47,0.04)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-6 px-5 md:px-8 lg:h-[72px] lg:px-10">
        <Logo inverse={overlay} size="sm" placeFrom="xl" />

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-7">
          {nav.map((item) => {
            const active = pathname === normalizePath(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} ${linkTone} ${active ? "link-underline-on font-medium" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phone.tel}`}
            className={`hidden items-center gap-2 whitespace-nowrap text-[0.92rem] font-medium xl:inline-flex ${overlay ? "text-white/90 hover:text-white" : "text-ink hover:text-door-deep"}`}
          >
            <Phone size={16} />
            {site.phone.display}
          </a>
          <a
            href={site.portalUrl}
            className={`hidden whitespace-nowrap rounded-[3px] px-3 py-2 text-[0.88rem] font-medium transition-colors 2xl:inline-flex ${
              overlay ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            Client portal
          </a>
          <Link
            href="/contact/"
            className="arrow-nudge inline-flex items-center gap-2 whitespace-nowrap rounded-[3px] bg-door px-4 py-2.5 text-[0.9rem] font-medium text-white transition-colors hover:bg-door-deep"
          >
            Request a consultation
            <ArrowRight size={15} />
          </Link>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className={`group inline-flex items-center gap-3 rounded-[3px] px-2 py-2 text-sm font-medium lg:hidden ${overlay ? "text-white" : "text-ink"}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span>Menu</span>
          <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
            <span className="h-[2px] w-full bg-current" />
            <span className="h-[2px] w-4/6 bg-current" />
            <span className="h-[2px] w-full bg-current" />
          </span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menu"
        onClose={onClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink-deep text-paper backdrop:bg-transparent"
      >
        <div className="grain flex h-full flex-col px-6 pb-8 pt-4">
          <div className="flex items-center justify-between">
            <Logo inverse size="sm" withPlace={false} />
            <button
              type="button"
              className="rounded-[3px] border border-white/30 px-3.5 py-2 text-sm font-medium"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
          </div>
          <nav aria-label="Main" className="mt-10">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="display flex items-baseline gap-4 py-4 text-[2rem] leading-none"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <span className="text-[0.8rem] font-sans tabular-nums text-white/40">0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-3 pt-10">
            <Link
              href="/contact/"
              className="flex items-center justify-center gap-2 rounded-[3px] bg-door py-3.5 text-center font-medium text-white"
            >
              Request a consultation <ArrowRight size={16} />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${site.phone.tel}`} className="flex items-center justify-center gap-2 rounded-[3px] border border-white/30 py-3 text-center font-medium">
                <Phone size={16} /> Call
              </a>
              <a href={site.portalUrl} className="rounded-[3px] border border-white/30 py-3 text-center font-medium">
                Client portal
              </a>
            </div>
            <p className="pt-3 text-[0.8rem] text-white/50">
              {site.serviceArea.join(" · ")}
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
