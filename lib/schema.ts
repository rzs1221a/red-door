// JSON-LD builders. Every value comes from lib/site.ts, lib/copy.ts, lib/process.ts, or lib/projects.ts.
import { services } from "./copy";
import type { Faq } from "./faq";
import { lookbook } from "./projects";
import { site } from "./site";

const orgId = `${site.url}/#organization`;
const siteId = `${site.url}/#website`;

export function organization() {
  return {
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/icon.png`,
    image: `${site.url}/og.png`,
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
    knowsAbout: services.map((s) => s.title),
    sameAs: [site.atlantaUrl, site.social.facebook, site.social.instagram],
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": siteId,
    url: site.url,
    name: site.shortName,
    publisher: { "@id": orgId },
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function serviceList() {
  return services.map((s) => ({
    "@type": "Service",
    "@id": `${site.url}/services/#${s.id}`,
    name: s.title,
    description: s.lead.join(" "),
    serviceType: s.title,
    provider: { "@id": orgId },
    areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name: `${name}, FL` })),
    url: `${site.url}/services/#${s.id}`,
  }));
}

export function faqPage(items: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function video() {
  return {
    "@type": "VideoObject",
    name: lookbook.title,
    description: "Selected Red Door Revivals residential, commercial, and interior projects from the Atlanta area.",
    thumbnailUrl: `${site.url}${lookbook.poster}`,
    contentUrl: `${site.url}${lookbook.src}`,
    uploadDate: "2026-03-11",
    duration: "PT3M7S",
    publisher: { "@id": orgId },
  };
}

export function contactPage() {
  return {
    "@type": "ContactPage",
    url: `${site.url}/contact/`,
    name: "Request a consultation",
    about: { "@id": orgId },
  };
}

/** Wrap one or more nodes into a single graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes.flat() };
}
