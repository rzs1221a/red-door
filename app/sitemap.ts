import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Update a date when that page's content changes.
const pages: { path: string; updated: string; priority: number }[] = [
  { path: "", updated: "2026-10-13", priority: 1 },
  { path: "services/", updated: "2026-10-13", priority: 0.9 },
  { path: "design-process/", updated: "2026-10-13", priority: 0.8 },
  { path: "projects/", updated: "2026-10-13", priority: 0.8 },
  { path: "about/", updated: "2026-10-13", priority: 0.7 },
  { path: "contact/", updated: "2026-10-13", priority: 0.9 },
  { path: "client-portal/", updated: "2026-10-13", priority: 0.4 },
  { path: "tour/", updated: "2026-10-14", priority: 0.5 },
  { path: "privacy/", updated: "2026-10-13", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${site.url}/${p.path}`,
    lastModified: p.updated,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
