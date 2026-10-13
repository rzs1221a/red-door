import Link from "next/link";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <Logo inverse />
          <p className="mt-5 max-w-sm text-[0.95rem] text-white/70">{site.promise}</p>
          <p className="mt-5 text-[0.95rem]">
            <a href={`tel:${site.phone.tel}`} className="hover:underline">{site.phone.display}</a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
          </p>
        </div>

        <div>
          <h2 className="text-[0.95rem] font-semibold text-white">Pages</h2>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[0.95rem] font-semibold text-white">Already building with us</h2>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            <li><a href={site.portalUrl} className="hover:underline">Client portal login</a></li>
            <li><Link href="/client-portal/" className="hover:underline">How the portal works</Link></li>
          </ul>
          <h2 className="mt-7 text-[0.95rem] font-semibold text-white">Commercial work in Atlanta</h2>
          <p className="mt-3 text-[0.95rem]">
            <a href={site.atlantaUrl} className="hover:underline">reddoorrevivals.com</a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-5 py-5 text-[0.85rem] text-white/55 md:px-8">
          <p>© {year} Red Door Revivals. Serving {site.serviceArea.join(", ")}.</p>
          <p>
            <a href={site.social.instagram} className="hover:text-white">Instagram</a>
            <span className="mx-2">/</span>
            <a href={site.social.facebook} className="hover:text-white">Facebook</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
