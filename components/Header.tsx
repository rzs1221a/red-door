"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.95rem] underline-offset-[6px] hover:underline ${
                  active ? "text-door-deep underline decoration-2" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.portalUrl}
            className="rounded-[3px] border border-ink px-4 py-2 text-[0.92rem] font-medium hover:bg-ink hover:text-paper"
          >
            Client portal
          </a>
        </nav>

        <button
          type="button"
          className="rounded-[3px] border border-ink px-3 py-2 text-sm font-medium lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line bg-paper px-5 pb-6 pt-2 lg:hidden">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link href={item.href} className="block py-3.5 text-lg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={`tel:${site.phone.tel}`} className="flex-1 rounded-[3px] bg-door py-3 text-center font-medium text-white">
              Call {site.phone.display}
            </a>
            <a href={site.portalUrl} className="flex-1 rounded-[3px] border border-ink py-3 text-center font-medium">
              Client portal
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
