// Home page copy deck, composed only from lib/copy.ts, lib/process.ts and lib/site.ts
// (see .taste-skill/notes.md). Nothing here is a new claim.
import { closingPromise, idealCustomer, promise, services } from "./copy";
import { steps } from "./process";
import { commercial, interiors, residential, type Photo } from "./projects";

/** The statement, authored as five lines for the staircase. */
export const statement = {
  lines: ["You shouldn’t", "have to become", "a construction expert", "to renovate", "your property."],
  full: closingPromise.shouldnt[0],
  note: promise.answer.join(" "),
};

/** What stands behind the door: three real Red Door rooms (all Atlanta-area work). */
export const doorRooms: { label: string; photo: Photo }[] = [
  { label: "Kitchen", photo: residential.gallery[10] },
  { label: "Living room", photo: residential.gallery[5] },
  { label: "Library", photo: residential.gallery[7] },
];

const svc = (id: string) => services.find((s) => s.id === id)!;

/** Three full-bleed frames, one per kind of renovation. */
export const frames = [
  {
    id: "rental",
    title: svc("rental").title,
    line: svc("rental").lead[0],
    fact: "Kitchens, bathrooms, flooring, paint and fixtures, where the investment produces the greatest benefit.",
    photo: residential.gallery[5],
    small: residential.gallery[3],
  },
  {
    id: "investment",
    title: svc("investment").title,
    line: "We can be involved before construction begins.",
    fact: svc("investment").defs!.map((d) => d.term.toLowerCase()).join(", ").replace(/^\w/, (c) => c.toUpperCase()) + ".",
    photo: residential.gallery[0],
    small: residential.gallery[2],
  },
  {
    id: "whole-property",
    title: svc("whole-property").title,
    line: svc("whole-property").lead.join(" "),
    fact: "Paint, flooring, trim, doors, lighting, fixtures, hardware, kitchens, bathrooms and outdoor spaces.",
    photo: residential.gallery[8],
    small: residential.gallery[4],
  },
];

/** Strips of photographs for the work section. The right-hand line is an award or the region. */
export type Strip = { name: string; descriptor: string; right: string; photos: Photo[]; kind: "residential" | "commercial" };
export const strips: Strip[] = [
  {
    name: residential.feature.name,
    descriptor: residential.feature.headline,
    right: "National Register of Historic Places",
    photos: [residential.feature.before, residential.feature.after],
    kind: "residential",
  },
  {
    name: "Residential",
    descriptor: "Porches, kitchens, restorations",
    right: "Atlanta area",
    photos: residential.gallery,
    kind: "residential",
  },
  {
    name: "Commercial renovation",
    descriptor: "Historic Roswell, Roswell Junction, Roswell Depot",
    right: "Winner, Roswell HPC and NAIOP Georgia",
    photos: commercial.slice(0, 3).flatMap((c) => [c.before!, c.after!]),
    kind: "commercial",
  },
  {
    name: "New construction",
    descriptor: "Roswell Historic Gateway, Birmingham Crossroads",
    right: "Atlanta area",
    photos: commercial.slice(3).flatMap((c) => c.photos!),
    kind: "commercial",
  },
  {
    name: interiors.title,
    descriptor: "Offices, wellness, fitness",
    right: "Atlanta area",
    photos: interiors.photos,
    kind: "commercial",
  },
];

/** Seven moments for the drag row, with a photograph each. */
export const moments = steps.map((s, i) => ({
  title: s.title,
  text: s.short,
  photo: [
    residential.gallery[0],
    residential.feature.before,
    residential.gallery[3],
    residential.gallery[4],
    commercial[1].after!,
    residential.gallery[5],
    residential.feature.after,
  ][i],
  space: [96, 128, 80, 140, 104, 88, 120][i],
}));

/** Who we work with: each with the service that usually fits and a line from the copy. */
export const owners = idealCustomer.for.map((name, i) => ({
  name,
  service: [
    svc("rental").title,
    svc("rental").title,
    svc("investment").title,
    svc("whole-property").title,
    svc("rental").title,
    "Kitchen and bathroom renovations",
    "Project management",
  ][i],
  text: [
    "Improvements that increase rental rates, improve guest reviews, reduce maintenance and increase occupancy.",
    "Durable finishes and fixtures that extend their useful life between tenants.",
    "Property assessment, a detailed scope of work and a clear budget before construction begins.",
    "A property that looks newer, feels better and performs better, without a gut renovation.",
    "One accountable team coordinating trades, materials, deliveries and inspections.",
    "Design decisions made before construction, reducing costly changes and surprises later.",
    "Regular updates, and documents, messages and project status in the client portal from anywhere.",
  ][i],
  photo: [
    residential.gallery[3],
    residential.gallery[10],
    residential.gallery[0],
    residential.gallery[8],
    commercial[0].after!,
    residential.gallery[4],
    residential.gallery[5],
  ][i],
}));
