// Site copy, taken from the Red Door Revivals positioning and web copy document
// (sent by Steve Ruddy, Sept 11, 2026). Only change: "30 Years" now reads "30+ years",
// per Steve (Sept 15): 30+ years, residential and commercial.
// Red Door's own copy draft can replace any of this in place.

export const hero = {
  categories: ["Renovation", "Construction", "Rental Properties", "Investment Properties"],
  headline: "You own the property. We’ll manage the project.",
  proof: "30+ Years of Experience. Professional Design. Detailed Project Management.",
  lead:
    "Red Door Revivals is a Florida-based renovation and construction company specializing in rental properties, investment properties, and residential renovations.",
};

export const positioning = {
  title: "Renovation & Construction for Rental Properties and Homeowners",
  body: [
    "We help property owners transform outdated or underperforming properties through professionally managed renovations—including kitchens, bathrooms, flooring, painting, fixtures, interior updates, and larger property improvements.",
  ],
  differenceLead: "Our difference is simple:",
  difference:
    "We bring a professional project-management process to an industry that too often relies on guesswork.",
  detail: [
    "With 30+ years of experience, an experienced designer, detailed project planning, professional subcontractor management, and transparent communication, Red Door Revivals gives property owners a level of organization and accountability that is often missing from the middle-market contracting experience.",
    "We are bonded and insured, and we manage the project from planning through completion.",
  ],
  // Steve's recommended line from the same document.
  uncertainty:
    "Too many renovation projects leave owners wondering what’s happening next. Red Door Revivals eliminates that uncertainty with professional planning, detailed scopes, design support, and disciplined project management.",
  // The "complete package" line used under the uncertainty statement on the home page.
  package:
    "Qualified contractors are hard to find, and most offer one piece of the job at a time. We bring the whole package: 30+ years of residential and commercial building, award-winning design, and disciplined project management.",
};

export const promise = {
  eyebrow: "Our promise",
  title: "No Guesswork. No Runaround. No Surprises.",
  lead: ["Renovating a property can be stressful.", "Owners often find themselves dealing with:"],
  pains: [
    "Contractors who are difficult to reach",
    "Vague estimates",
    "Constantly changing timelines",
    "Unclear scopes of work",
    "Subcontractors showing up unexpectedly",
    "Material delays",
    "Unanticipated costs",
    "Poor communication",
    "Projects that seem to grow without explanation",
    "Contractors who appear to be managing the project “off the cuff”",
  ],
  answerLead: "Red Door Revivals was built to provide a different experience.",
  answer: [
    "Before work begins, we develop the plan.",
    "During the project, we manage the details.",
    "When the project is complete, we make sure it is done right.",
  ],
};

export type Service = {
  id: string;
  title: string;
  lead: string[];
  body?: string[];
  listLead?: string;
  items?: string[];
  /** Label + description pairs (investment services). */
  defs?: { term: string; desc: string }[];
  close?: string[];
};

// Ordered rental-first for the Florida audience. The document lists kitchens first.
export const services: Service[] = [
  {
    id: "rental",
    title: "Rental Property Renovations",
    lead: ["Rental properties have different requirements than owner-occupied homes."],
    body: [
      "The renovation has to make financial sense.",
      "We help owners balance:",
      "Cost + durability + appearance + rental appeal + return on investment.",
      "Our goal isn’t to build the most expensive property possible.",
      "It’s to determine where the investment will produce the greatest benefit.",
    ],
    listLead: "We can help owners identify improvements that can:",
    items: [
      "Increase rental rates",
      "Improve guest reviews",
      "Reduce maintenance",
      "Increase occupancy",
      "Improve property appeal",
      "Extend the useful life of finishes and fixtures",
    ],
  },
  {
    id: "investment",
    title: "Investment Property Renovations",
    lead: [
      "For investors purchasing or repositioning properties, Red Door Revivals can become involved before construction begins.",
    ],
    listLead: "We can help with:",
    defs: [
      { term: "Property Assessment", desc: "Identify obvious renovation requirements and opportunities." },
      { term: "Project Planning", desc: "Develop a detailed scope of work." },
      { term: "Design", desc: "Our designer helps establish finishes, materials, colors, fixtures and the overall aesthetic." },
      { term: "Budgeting", desc: "Develop a clear project budget." },
      { term: "Construction", desc: "Coordinate qualified trades and manage the project." },
      { term: "Completion", desc: "Conduct a final walkthrough and punch list." },
    ],
  },
  {
    id: "whole-property",
    title: "Whole-Property Updates",
    lead: ["Sometimes a property doesn’t need a complete gut renovation.", "It simply needs to be revived."],
    listLead: "We coordinate improvements such as:",
    items: [
      "Interior painting",
      "Flooring",
      "Trim",
      "Doors",
      "Lighting",
      "Ceiling fans",
      "Fixtures",
      "Hardware",
      "Drywall",
      "Kitchens",
      "Bathrooms",
      "Outdoor spaces",
      "Cosmetic updates",
    ],
    close: ["The result is a property that looks newer, feels better, and performs better."],
  },
  {
    id: "kitchens",
    title: "Kitchen Renovations",
    lead: ["From cosmetic updates to complete kitchen transformations."],
    items: [
      "Cabinet updates",
      "Countertops",
      "Backsplashes",
      "Flooring",
      "Lighting",
      "Fixtures",
      "Appliances",
      "Painting",
      "Hardware",
      "Layout improvements",
    ],
    close: [
      "Our designer helps owners make decisions before construction begins, reducing costly changes and surprises later.",
    ],
  },
  {
    id: "bathrooms",
    title: "Bathroom Renovations",
    lead: ["Transform outdated bathrooms into attractive, functional spaces."],
    items: [
      "Vanities",
      "Countertops",
      "Showers",
      "Tub conversions",
      "Tile",
      "Flooring",
      "Lighting",
      "Plumbing fixtures",
      "Mirrors",
      "Hardware",
      "Paint",
    ],
  },
];

export const why = [
  {
    title: "30+ Years of Experience",
    body: [
      "We’ve spent decades working around businesses, properties, customers, vendors and complex projects.",
      "We understand that successful projects require more than construction skills. They require planning, communication, accountability and follow-through.",
    ],
  },
  {
    title: "Design + Construction",
    body: [
      "You don’t have to find a designer and then find a contractor and hope they communicate.",
      "Red Door Revivals brings design and construction management together.",
    ],
  },
  {
    title: "Detailed Project Plans",
    body: ["You shouldn’t have to wonder: “What’s happening next?”", "Our projects are planned before construction begins."],
  },
  {
    title: "Bonded & Insured",
    body: ["Red Door Revivals operates with the appropriate bonding and insurance protections for the work we perform."],
  },
  {
    title: "Transparent Communication",
    body: ["We believe owners deserve to know:"],
    items: ["What we’re doing.", "Why we’re doing it.", "What it costs.", "When it’s happening."],
  },
] as { title: string; body: string[]; items?: string[] }[];

export const difference = {
  title: "The Red Door Difference",
  lead: "There is a big difference between:",
  a: "“A guy who can do the work”",
  b: "“A company that can manage the project.”",
  body: "A renovation involves dozens of decisions, dependencies and moving pieces.",
  needs: [
    "Materials need to arrive.",
    "Trades need to be scheduled.",
    "Measurements need to be correct.",
    "Design decisions need to be made.",
    "Problems need to be identified.",
    "Changes need to be documented.",
    "Someone needs to be accountable.",
  ],
  close: ["That’s project management.", "And that’s what Red Door Revivals brings to every project."],
};

export const idealCustomer = {
  title: "Our Ideal Customer",
  valuesLead: "Red Door Revivals is designed for property owners who value:",
  values: ["Quality", "Communication", "Organization", "Accountability", "Professionalism", "Predictability"],
  forLead: "We are particularly well suited for:",
  for: [
    "Vacation-rental owners",
    "Long-term rental owners",
    "Real-estate investors",
    "Second-home owners",
    "Property managers",
    "Homeowners undertaking significant renovations",
    "Owners who live outside the area",
  ],
};

export const closingPromise = {
  title: "The Red Door Revivals Promise",
  lead: "We eliminate the guesswork.",
  shouldnt: [
    "You shouldn’t have to become a construction expert to renovate your property.",
    "You shouldn’t have to manage every subcontractor.",
    "You shouldn’t have to wonder whether the project is on schedule.",
    "You shouldn’t have to chase your contractor for answers.",
  ],
  therefore: "That’s why you hire Red Door Revivals.",
  verbs: ["We plan it.", "We coordinate it.", "We communicate it.", "We build it.", "We finish it."],
};
