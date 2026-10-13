import Link from "next/link";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";
import { ArrowRight, Facebook, Instagram, Mail, Phone, Pin } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain bg-ink-deep pb-24 text-white/80 md:pb-0">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10">
        {/* Big line */}
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 py-14 md:py-20">
          <div>
            <p className="eyebrow eyebrow-rule text-white/60" style={{ "--eyebrow-rule": "rgba(255,255,255,0.6)" } as React.CSSProperties}>Start a conversation</p>
            <p className="display mt-4 max-w-3xl text-display-lg text-white">{site.promise}</p>
          </div>
          <Link
            href="/contact/"
            className="arrow-nudge inline-flex items-center gap-3 rounded-[3px] bg-white px-6 py-4 font-medium text-ink transition-colors hover:bg-cream"
          >
            Request a consultation <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:py-16">
          <div>
            <Logo inverse />
            <p className="mt-5 max-w-sm text-[0.95rem] text-white/65">{site.description}</p>
            <ul className="mt-6 space-y-2.5 text-[0.95rem]">
              <li>
                <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-2.5 hover:text-white">
                  <Phone size={16} className="text-white/50" /> {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                  <Mail size={16} className="text-white/50" /> {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <Pin size={16} className="text-white/50" /> {site.city}, Florida
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-white/50">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline hover:text-white">{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/privacy/" className="link-underline hover:text-white">Privacy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-white/50">Clients</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li><a href={site.portalUrl} className="link-underline hover:text-white">Client portal login</a></li>
              <li><Link href="/client-portal/" className="link-underline hover:text-white">How the portal works</Link></li>
            </ul>
            <h2 className="eyebrow mt-8 text-white/50">Atlanta</h2>
            <p className="mt-4 text-[0.95rem]">
              <a href={site.atlantaUrl} className="link-underline hover:text-white">reddoorrevivals.com</a>
            </p>
          </div>

          <div>
            <h2 className="eyebrow text-white/50">Where we work</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {site.serviceArea.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <a href={site.social.instagram} aria-label="Instagram" className="rounded-full border border-white/20 p-2.5 transition-colors hover:border-white hover:text-white">
                <Instagram size={18} />
              </a>
              <a href={site.social.facebook} aria-label="Facebook" className="rounded-full border border-white/20 p-2.5 transition-colors hover:border-white hover:text-white">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 text-[0.82rem] text-white/45">
          <p>© {year} Red Door Revivals, LLC. Serving {site.serviceArea.join(", ")}.</p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
