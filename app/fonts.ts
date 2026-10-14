import localFont from "next/font/local";

// Boska (Indian Type Foundry, via Fontshare), self-hosted from public/fonts.
// One family does every job on the site. Two files on first paint (400 and 500); italics are not used.
export const boska = localFont({
  src: [
    { path: "../public/fonts/boska-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/boska-500-normal.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-boska-src",
  adjustFontFallback: "Times New Roman",
});
