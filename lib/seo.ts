import type { Metadata } from "next";
import { site } from "./site";

/** Per-page metadata with canonical, OpenGraph, and Twitter cards. */
export function pageMeta({
  title,
  description,
  path,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  /** Route path with trailing slash, e.g. "/services/". */
  path: string;
  /** Absolute-from-root image path. Defaults to /og.png. */
  image?: string;
  imageAlt?: string;
}): Metadata {
  const img = image ?? "/og.png";
  const alt = imageAlt ?? `${site.name}, ${site.city}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.shortName,
      locale: "en_US",
      url: path,
      title: `${title} | ${site.shortName}`,
      description,
      images: [{ url: img, width: 1200, height: 630, alt }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.shortName}`, description, images: [img] },
  };
}
