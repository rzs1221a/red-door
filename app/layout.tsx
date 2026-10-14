import type { Metadata, Viewport } from "next";
import "./globals.css";
import { boska } from "./fonts";
import ActionBar from "@/components/ActionBar";
import Nav from "@/components/Nav";
import DoorIntro from "@/components/DoorIntro";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { graph, organization, website } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Rental Property Renovation in Fernandina Beach | Red Door Revivals",
    template: "%s | Red Door Revivals Florida",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.shortName,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Red Door Revivals, Fernandina Beach" }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48" },
      { url: "/icon.png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = { themeColor: "#eff0ec", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={boska.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        {/* Motion recipes only hide things when script runs: see globals.css (.js [data-rise]). */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');
try {
  var seen = false;
  try { seen = sessionStorage.getItem('red-door-arrival-v1') === 'seen'; } catch (_) {}
  if (!seen && !matchMedia('(prefers-reduced-motion: reduce)').matches && !location.hash) {
    document.documentElement.classList.add('door-intro-pending');
    setTimeout(function () {
      document.documentElement.classList.remove('door-intro-pending');
      var shell = document.getElementById('site-shell');
      if (shell) shell.inert = false;
    }, 6500);
  }
} catch (_) {}` }} />
        <DoorIntro />
        <div id="site-shell">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-light-ink">
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <ActionBar />
        <JsonLd data={graph(organization(), website())} />
        </div>
      </body>
    </html>
  );
}
