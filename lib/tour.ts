// The tour: seven stops, in the order a visitor reads the site. Every line below is drawn from
// the pages themselves (lib/copy.ts, lib/process.ts, lib/projects.ts, lib/site.ts), so the tour
// never says something the site does not.

import type { Photo } from "./projects";
import { closingPromise, hero, idealCustomer, positioning, promise, services, why } from "./copy";
import { steps } from "./process";
import { commercial, interiors, lookbook, residential } from "./projects";
import { site } from "./site";

export type Stop = {
  id: string;
  /** The page's name as the nav says it. */
  label: string;
  href: string;
  /** What the page is for, in one line. */
  purpose: string;
  /** What is there, as the page says it. */
  lines: string[];
  /** Short items the page carries, in its own order. */
  list?: string[];
  listLabel?: string;
  photo: Photo;
  caption: string;
  /** The link's wording. */
  go: string;
};

export const tourIntro = {
  title: "The tour",
  lead: "Seven stops, in the order a visitor reads the site. Each one says what is there and takes you to it.",
  note: "About four minutes. Skip ahead from the list at any point.",
};

export const stops: Stop[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    purpose: "The front door.",
    lines: [
      "On a first visit the red door opens once, onto a kitchen that becomes the first picture on the page. After that the page itself: the promise, what we do, the work, how a project runs, who we work with, and the questions owners ask before they call.",
      hero.headline,
      positioning.uncertainty,
    ],
    photo: residential.gallery[3],
    caption: "The kitchen behind the door, a Red Door project.",
    go: "Open the home page",
  },
  {
    id: "services",
    label: "What we do",
    href: "/services/",
    purpose: "Five kinds of work, each with its own section and a photograph.",
    lines: [positioning.body[0]],
    listLabel: "The five, in the page's order",
    list: services.map((s) => `${s.title}. ${s.lead[0]}`),
    photo: residential.gallery[5],
    caption: "A living room, a Red Door project.",
    go: "Go to What we do",
  },
  {
    id: "process",
    label: "Our process",
    href: "/design-process/",
    purpose: "Seven steps, in this order, on every project.",
    lines: [`${positioning.differenceLead} ${positioning.difference}`, steps[2].close?.[0] ?? ""],
    listLabel: "The seven steps",
    list: steps.map((s) => `${s.title}. ${s.short}`),
    photo: residential.gallery[4],
    caption: "A kitchen with painted cabinets and dark beams, a Red Door project.",
    go: "Go to Our process",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects/",
    purpose: "Before-and-after pairs, every project in a strip, interiors, and a three-minute film.",
    lines: [
      `${residential.feature.name}: ${residential.feature.headline.toLowerCase()}. ${residential.feature.body} ${residential.feature.recognition}.`,
      `Then ${commercial.slice(0, 3).map((c) => c.name).join(", ")}, each with its before and its after. ${interiors.title} follows, and ${lookbook.title} closes the page.`,
    ],
    photo: residential.feature.after,
    caption: `${residential.feature.name}, after.`,
    go: "Go to Projects",
  },
  {
    id: "about",
    label: "About",
    href: "/about/",
    purpose: "Who is behind the door.",
    lines: [
      positioning.detail[0],
      `${site.leadership.map((p) => p.name).join(" and ")}, principals, working together since 2000. ${site.awards.map((a) => a.name).join(" and ")}. ${closingPromise.lead}`,
    ],
    listLabel: "Why owners choose Red Door",
    list: why.map((w) => w.title),
    photo: residential.gallery[2],
    caption: "A cedar-shingle home, a Red Door project.",
    go: "Go to About",
  },
  {
    id: "portal",
    label: "Client portal",
    href: "/client-portal/",
    purpose: "For current clients: the project, from anywhere.",
    lines: [
      "Owners receive regular updates throughout the project. Clients and trade partners find documents, messages, and project status in the client portal during a build.",
      "It is one click from the top of every page, and from the menu on a phone.",
    ],
    listLabel: "What is inside",
    list: ["Project status", "Messages", "Documents"],
    photo: interiors.photos[2],
    caption: "A creative office, a Red Door project.",
    go: "Go to the Client portal",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact/",
    purpose: "Request a consultation.",
    lines: [
      `${steps[0].intro[0]} The form checks each field as you go and sends to Red Door. ${site.phone.display} and ${site.email} are on the page as well, with the three steps that follow a request.`,
      `${idealCustomer.forLead} ${idealCustomer.for.slice(0, 4).map((f) => f.toLowerCase()).join(", ")}, and ${idealCustomer.for[idealCustomer.for.length - 1].toLowerCase()}.`,
    ],
    listLabel: "What happens next",
    list: steps.slice(0, 3).map((s) => `${s.title}. ${s.short}`),
    photo: residential.gallery[0],
    caption: "A restored two-story home, a Red Door project.",
    go: "Go to Contact",
  },
];

export const tourEnd = {
  title: "That is the site.",
  lead: promise.title,
  lines: closingPromise.verbs,
};
