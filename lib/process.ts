// The Red Door Process, from the positioning document (Sept 1, 2026).
// Edit wording here; the home page and the process page both read from this file.

export type Step = {
  title: string;
  /** One line for the home page summary. */
  short: string;
  /** Opening sentence(s) on the process page. */
  intro: string[];
  /** Lead-in to the list, if any. */
  listLead?: string;
  items?: string[];
  /** Closing sentence(s). */
  close?: string[];
};

export const steps: Step[] = [
  {
    title: "Consultation",
    short: "We meet with the property owner and understand the property’s objectives.",
    intro: ["We meet with the property owner and understand the property’s objectives."],
    listLead: "What are you trying to accomplish?",
    items: [
      "Sell?",
      "Rent?",
      "Increase rental income?",
      "Modernize?",
      "Improve appearance?",
      "Reduce maintenance?",
      "Prepare for vacation rental?",
      "Increase property value?",
    ],
  },
  {
    title: "Property Assessment",
    short: "We evaluate the property and separate the work into Must Do, Should Do, and Could Do.",
    intro: ["We evaluate the property and identify the work that needs to be done."],
    listLead: "We separate:",
    items: ["Must Do", "Should Do", "Could Do"],
    close: ["This allows the owner to make informed decisions rather than simply receiving a giant renovation bill."],
  },
  {
    title: "Design",
    short: "Our designer works with the owner to establish the look and feel of the project.",
    intro: ["Our designer works with the owner to establish the look and feel of the project."],
    listLead: "We help coordinate:",
    items: ["Finishes", "Flooring", "Cabinets", "Countertops", "Tile", "Paint", "Fixtures", "Lighting", "Hardware"],
    close: ["Design decisions happen before construction—not while the contractor is standing in the kitchen."],
  },
  {
    title: "Detailed Project Plan",
    short: "You know what we’re doing before we start doing it.",
    intro: [],
    listLead: "Before construction begins, we develop a detailed project plan outlining:",
    items: [
      "Scope of work",
      "Materials",
      "Finishes",
      "Labor",
      "Project sequence",
      "Responsibilities",
      "Estimated schedule",
      "Pricing",
      "Allowances",
      "Exclusions",
      "Potential contingencies",
    ],
    close: ["You know what we’re doing before we start doing it."],
  },
  {
    title: "Project Management",
    short: "The owner shouldn’t have to coordinate five different trades. That’s our job.",
    intro: ["This is where Red Door Revivals separates itself from many contractors."],
    listLead: "We coordinate the moving pieces.",
    items: [
      "Scheduling",
      "Subcontractors",
      "Materials",
      "Deliveries",
      "Inspections",
      "Progress",
      "Communication",
      "Change orders",
      "Punch lists",
    ],
    close: ["The owner shouldn’t have to coordinate five different trades.", "That’s our job."],
  },
  {
    title: "Communication",
    short: "Owners receive regular updates throughout the project.",
    intro: [
      "Owners receive regular updates throughout the project.",
      "We believe that good project management isn’t simply about getting people to show up. It’s about keeping the owner informed.",
    ],
    items: [
      "If there is a problem, we communicate it.",
      "If something changes, we explain why.",
      "If something costs more, we identify it before the work proceeds whenever practical.",
    ],
  },
  {
    title: "Completion",
    short: "We don’t disappear when the major work is finished.",
    intro: [],
    listLead: "Before we consider a project complete:",
    items: [
      "Final walkthrough",
      "Punch-list review",
      "Corrections",
      "Final cleaning/cleanup",
      "Completion documentation",
      "Owner approval",
    ],
    close: ["We don’t disappear when the major work is finished."],
  },
];
