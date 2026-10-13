// Frequently asked questions. Every answer is composed from copy that already exists in
// lib/copy.ts, lib/process.ts, and lib/site.ts so nothing here is a new claim.
import { idealCustomer, services, why } from "./copy";
import { steps } from "./process";
import { site } from "./site";

export type Faq = { q: string; a: string };

const list = (items: string[]) => items.join(", ").replace(/\?/g, "");
const bonded = why.find((w) => w.title === "Bonded & Insured")!;
const design = why.find((w) => w.title === "Design + Construction")!;
const rental = services.find((s) => s.id === "rental")!;

export const faqs: Faq[] = [
  {
    q: "What happens first?",
    a: `${steps[0].intro[0]} ${steps[0].listLead} ${list(steps[0].items!)}. From there we evaluate the property and separate the work into Must Do, Should Do, and Could Do.`,
  },
  {
    q: "How do you decide what work gets done?",
    a: `${steps[1].intro[0]} We separate it into ${steps[1].items!.join(", ")}. ${steps[1].close![0]}`,
  },
  {
    q: "Do I need to find my own designer?",
    a: `${design.body.join(" ")} ${steps[2].intro[0]} ${steps[2].close![0]}`,
  },
  {
    q: "What is in the detailed project plan?",
    a: `${steps[3].listLead} ${list(steps[3].items!)}. ${steps[3].close![0]}`,
  },
  {
    q: "How will I know what is happening during the project?",
    a: `${steps[5].intro.join(" ")} ${steps[5].items!.join(" ")}`,
  },
  {
    q: "Are you bonded and insured?",
    a: bonded.body[0],
  },
  {
    q: "Do you work with owners who live outside the area?",
    a: `Yes. ${idealCustomer.forLead} ${idealCustomer.for.join(", ").toLowerCase()}. Owners receive regular updates throughout the project, and clients find documents, messages, and project status in our client portal during a build.`,
  },
  {
    q: "Do you handle vacation rentals and investment properties?",
    a: `${rental.lead[0]} ${rental.listLead} ${rental.items!.map((i) => i.toLowerCase()).join(", ")}. For investors purchasing or repositioning properties, we can become involved before construction begins.`,
  },
  {
    q: "Where do you work?",
    a: `${site.serviceArea.join(", ")}, Florida. Our commercial work in Atlanta continues under reddoorrevivals.com.`,
  },
  {
    q: "What happens at the end of the project?",
    a: `${steps[6].listLead} ${list(steps[6].items!)}. ${steps[6].close![0]}`,
  },
];

/** Short subset for pages that only need a few. */
export const faqsShort = faqs.slice(0, 5);
