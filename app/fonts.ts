import localFont from "next/font/local";

// Self-hosted via @fontsource files; next/font preloads them and sets size-adjusted fallbacks.
export const display = localFont({
  src: "../node_modules/@fontsource/libre-caslon-display/files/libre-caslon-display-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-display-src",
  adjustFontFallback: "Times New Roman",
});

export const sans = localFont({
  src: [
    { path: "../node_modules/@fontsource/public-sans/files/public-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/public-sans/files/public-sans-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/public-sans/files/public-sans-latin-600-normal.woff2", weight: "600" },
  ],
  display: "swap",
  variable: "--font-sans-src",
  adjustFontFallback: "Arial",
});
