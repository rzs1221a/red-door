import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "rental-owners/", "design-process/", "projects/", "about/", "contact/", "client-portal/"];
  return paths.map((p) => ({
    url: `${site.url}/${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
