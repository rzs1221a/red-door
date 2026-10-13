import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Rental Property Renovation in Fernandina Beach | Red Door Revivals",
    template: "%s | Red Door Revivals Florida",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "Red Door Revivals Florida",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Red Door Revivals, Fernandina Beach" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: [{ url: "/favicon-48.png", sizes: "48x48" }, { url: "/icon.png", sizes: "512x512" }], apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#e31b23",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Red Door Revivals",
  url: site.url,
  description: site.description,
  telephone: site.phone.tel,
  email: site.email,
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "US",
  },
  areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name: `${name}, FL` })),
  founder: site.leadership.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.title })),
  award: site.awards.map((a) => `${a.name}, ${a.by}`),
  sameAs: [site.atlantaUrl, site.social.facebook, site.social.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
