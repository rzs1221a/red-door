import Link from "next/link";
import { nav, site } from "@/lib/site";
import { foundCredits } from "@/lib/found";

// A single quiet line after a stretch of empty ground, then the picture credits.
export default function Footer({ credits = true }: { credits?: boolean }) {
  const year = new Date().getFullYear();
  return (
    <footer className="wrap pb-8 pt-[9svh] md:pt-[10svh]">
      <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr] md:items-baseline">
        <p className="text-muted">Renovation and project management, {site.city}, Florida</p>
        <p className="flex flex-wrap gap-x-6 gap-y-0 md:justify-center md:gap-y-1">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="link inline-block min-w-[44px] py-2.5 md:min-w-0 md:py-0">{n.label}</Link>
          ))}
          <a href={site.portalUrl} className="link inline-block py-2.5 md:py-0">Client portal</a>
        </p>
        <p className="text-muted md:text-right">
          © {year} Red Door Revivals, LLC · <Link href="/privacy/" className="link inline-block py-2.5 text-ink md:py-0">Privacy</Link>
        </p>
      </div>
      {credits && (
        <p className="credits mt-8 max-w-none text-muted">
          Pictures of Fernandina Beach:{" "}
          {foundCredits.map((c, i) => (
            <span key={c.file}>
              <a href={c.page} className="link text-ink">“{c.title}”</a> by {c.creator},{" "}
              <a href={c.licenseUrl} className="link text-ink">{c.license}</a>, via Wikimedia Commons
              {i < foundCredits.length - 1 ? ";" : "."}
            </span>
          ))}{" "}
          Project photographs are Red Door Revivals’ own work in the Atlanta area.
        </p>
      )}
    </footer>
  );
}
