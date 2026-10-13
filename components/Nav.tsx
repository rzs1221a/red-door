"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";

const normalize = (p: string | null) => (p ??"/").replace(/\/+$/,"") ||"/";

// Wordmark at one end, five plain links, one action. No bar, no border, no blur.
// On the home page it sits over the hero photograph.
export default function Nav() {
  const pathname = normalize(usePathname());
  const home = pathname ==="/";
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.classList.add("scroll-locked");
    } else if (!open && d.open) d.close();
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  function onClose() {
    document.body.classList.remove("scroll-locked");
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <header className={`${home ? "absolute inset-x-0 top-0" : "relative"} z-40`}>
      <div className="wrap flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link href="/" aria-label="Red Door Revivals, home" className="inline-flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/reddoor-logo-reverse-2x.png" alt="Red Door Revivals" width={313} height={104} className="h-9 w-auto" loading="eager" fetchPriority="high" decoding="async" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === normalize(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`link small ${active ? "link-on" : ""}`}>
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact/" className="btn ml-2 !py-2.5 !small">Request a consultation</Link>
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <Link href="/contact/" className="btn !px-3.5 !py-2 !small">Consultation</Link>
          <button ref={buttonRef} type="button" className="link small" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>
            Menu
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="menu"
        aria-label="Menu"
        onClose={onClose}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink"
      >
        <div className="wrap flex h-full flex-col pb-8 pt-4">
          <div className="flex h-16 items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/reddoor-logo-reverse-2x.png" alt="" width={313} height={104} className="h-9 w-auto" />
            <button type="button" className="link small" onClick={() => dialogRef.current?.close()}>Close</button>
          </div>
          <nav aria-label="Main" className="mt-10">
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="head link block py-1">{item.label}</Link>
                </li>
              ))}
              <li>
                <a href={site.portalUrl} className="head link block py-1">Client portal</a>
              </li>
            </ul>
          </nav>
          <div className="mt-auto space-y-4 pt-10">
            <Link href="/contact/" className="btn w-full">Request a consultation</Link>
            <p>
              <a href={`tel:${site.phone.tel}`} className="link">{site.phone.display}</a>
              <br />
              <span className="text-muted">{site.serviceArea.join(", ")}</span>
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
