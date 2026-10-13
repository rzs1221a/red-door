// Real pictures of Red Door's new home town, from the open collections. They show the place,
// never the client's own work, and are credited in the footer (lib/credits.json).
import type { Photo } from "./projects";
import credits from "./credits.json";

export const found = {
  centreStreet: {
    src: "/images/found/centre-street.jpg",
    w: 1920,
    h: 1280,
    alt: "Centre Street in Fernandina Beach looking east, with its brick storefronts, palms and live oaks",
  } satisfies Photo,
  fairbanksHouse: {
    src: "/images/found/fairbanks-house.jpg",
    w: 1920,
    h: 1440,
    alt: "The Fairbanks House, an 1885 Italianate home in Fernandina Beach with a square tower and arched porch",
  } satisfies Photo,
  lighthouse: {
    src: "/images/found/amelia-lighthouse.jpg",
    w: 1920,
    h: 1279,
    alt: "The Amelia Island lighthouse above the marsh and trees, seen from Egans Creek",
  } satisfies Photo,
};

export type Credit = { file: string; title: string; creator: string; license: string; licenseUrl: string; page: string };
export const foundCredits = credits as Credit[];
