import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, sans } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
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

export const viewport: Viewport = {
  themeColor: "#e31b23",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[3px] focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        <JsonLd data={graph(organization(), website())} />
      </body>
    </html>
  );
}
