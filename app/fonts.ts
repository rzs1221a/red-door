import localFont from "next/font/local";

// Boska (Indian Type Foundry, via Fontshare), self-hosted from public/fonts.
// One family does every job on the site: display, text, italics for emphasis.
export const boska = localFont({
  src: [
    { path: "../public/fonts/boska-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/boska-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/boska-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/boska-500-italic.woff2", weight: "500", style: "italic" },
  ],
  display: "swap",
  variable: "--font-boska-src",
  adjustFontFallback: "Times New Roman",
});
