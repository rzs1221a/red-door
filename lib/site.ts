// Single source for business facts. Items marked CONFIRM are pending from Red Door.
// Phone, email, portal, social, leadership, and awards come from the Atlanta site
// (reddoorrevivals.com), not from the Florida package; confirm each for Florida.

export const site = {
  name: "Red Door Revivals",
  shortName: "Red Door Revivals Florida",
  // CONFIRM: final Florida domain (RedDoorRevivalsFlorida.com, RedDoorAtTheBeach.com, or a subdomain)
  url: "https://reddoor2.netlify.app",
  tagline: "Clear plans. Clear pricing. Beautiful results.",
  promise: "You own the property. We'll manage the project.",
  description:
    "Renovation, restoration, and turnkey project management for rental owners and residential investors in Fernandina Beach and Amelia Island. 30+ years of residential and commercial experience.",

  // CONFIRM: Florida phone. This is the Atlanta main line from reddoorrevivals.com.
  phone: { display: "404.319.8088", tel: "+14043198088" },
  // CONFIRM: Florida inbox (Will's address on reddoorrevivals.com). Form submissions go to Netlify.
  email: "will@reddoorrevivals.com",

  // CONFIRM: street address for Google Business Profile, or service-area only.
  // CONFIRM: the package names Fernandina Beach only; Amelia Island, Yulee, and Nassau County are unconfirmed.
  city: "Fernandina Beach",
  region: "FL",
  serviceArea: ["Fernandina Beach", "Amelia Island", "Yulee", "Nassau County"],

  // CONFIRM with CoConstruct admin access (Atlanta site links RedDoor.co-construct.com).
  portalUrl: "https://reddoor.co-construct.com",
  atlantaUrl: "https://reddoorrevivals.com",

  social: {
    facebook: "https://www.facebook.com/Red-Door-Revivals-974876839212209/",
    instagram: "https://www.instagram.com/reddoorrevivals",
  },

  leadership: [
    { name: "Will Colley", title: "Principal" },
    { name: "Ken Parsons", title: "Principal" },
  ],

  awards: [
    { name: "Renovation of the Year", by: "Greater Atlanta Home Builders Association" },
    { name: "Commercial Renovation of the Year", by: "Roswell Historical Society" },
  ],
} as const;

export const nav = [
  { href: "/services/", label: "What we do" },
  { href: "/design-process/", label: "Our process" },
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;
