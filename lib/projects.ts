// Project photos and captions from the Red Door Look Book video (Will, Sept 17; file dated 3/11/26).
// Captions are the Look Book's own wording. All of these are Atlanta-area projects:
// label them that way and never present them as Florida work.
// Add Florida projects here as they're completed. No North Fletcher entry: no photos exist.

export type Photo = { src: string; w: number; h: number; alt: string };

const p = (name: string, w: number, h: number, alt: string): Photo => ({
  src: `/images/projects/${name}.webp`,
  w,
  h,
  alt,
});

export const region = "Atlanta area";

export const residential = {
  title: "Residential",
  lead: "At Red Door Revivals, we build the future. Through context-driven design, we preserve architectural character while creating spaces built for modern living.",
  feature: {
    name: "Historic Marietta",
    headline: "Saved from the Wrecking Ball",
    body: "Red Door Revivals worked with the Cobb Preservation Foundation to save this historic Victorian home and return it to its former glory.",
    recognition: "Placed on the National Register of Historic Places",
    before: p("marietta-before", 918, 721, "Historic Marietta Victorian home before restoration, with faded siding and a screened porch"),
    after: p("marietta-after", 918, 723, "Historic Marietta Victorian home after restoration, with new paint and a restored porch"),
  },
  gallery: [
    p("res-foursquare", 1045, 861, "Restored two-story home with a full front porch and brick piers"),
    p("res-craftsman", 1044, 861, "Two-story home with a wraparound porch"),
    p("res-shingle", 1045, 862, "Cedar-shingle home with a screened upper porch"),
    p("res-kitchen-white", 1044, 861, "White kitchen with a butcher-block island and pendant lights"),
    p("res-kitchen-beams", 1198, 861, "Kitchen with painted cabinets, an arched pantry door, and dark ceiling beams"),
    p("res-living", 794, 430, "Living room with a fireplace and sunburst mirror"),
    p("res-victorian", 793, 473, "Victorian-style home with a gabled roofline"),
    p("res-library", 632, 468, "Wood-paneled room with a fireplace and chandelier"),
    p("res-porch", 762, 477, "Screened porch with exposed timber brackets"),
  ],
};

export type CaseStudy = {
  name: string;
  headline: string;
  body: string;
  recognition?: string;
  before?: Photo;
  after?: Photo;
  photos?: Photo[];
  wide?: boolean;
};

export const commercial: CaseStudy[] = [
  {
    name: "Historic Roswell",
    headline: "Structure Meets Strategy",
    body: "This underutilized and dated property was strategically redesigned and elevated into a refined commercial space with renewed presence and purpose.",
    recognition: "Winner, Roswell HPC",
    before: p("roswell-before", 918, 722, "Historic Roswell building before renovation, with a blue awning and worn exterior"),
    after: p("roswell-after", 918, 722, "Historic Roswell building after renovation, with a red brick facade and new storefront windows"),
  },
  {
    name: "Roswell Junction",
    headline: "Historic Roots to Community Hub",
    body: "From a traditional church to a thriving local hotspot, this award-winning project blended preservation with purpose to reimagine the property into a vibrant gathering place for dining, drinking, music, and connection.",
    recognition: "Winner, NAIOP Georgia",
    before: p("junction-before", 918, 723, "Roswell Junction before: a brick church with a white steeple"),
    after: p("junction-after", 918, 722, "Roswell Junction after: the church converted into a restaurant and gathering space"),
  },
  {
    name: "Roswell Depot",
    headline: "From Outdated to Inviting",
    body: "This renovation transformed an aging shopping center into a clean, modern retail destination with updated façades, materials, and architectural details.",
    before: p("depot-before", 1869, 330, "Roswell Depot shopping center before, with brightly painted storefronts"),
    after: p("depot-after", 1869, 361, "Roswell Depot shopping center after, with stone and neutral facades"),
    wide: true,
  },
  {
    name: "Roswell Historic Gateway",
    headline: "Timeless Brick. Modern Possibility.",
    body: "This newly constructed commercial building blends classic brick architecture with clean, modern finishes, creating a space designed to stand the test of time.",
    photos: [
      p("gateway", 1196, 723, "Roswell Historic Gateway, a new two-story brick commercial building"),
      p("gateway-corner", 640, 722, "Corner view of the Roswell Historic Gateway building"),
    ],
  },
  {
    name: "Birmingham Crossroads",
    headline: "Classic Form. New Construction.",
    body: "Designed to echo traditional architecture while delivering modern functionality, this newly constructed building creates a distinctive commercial presence.",
    photos: [
      p("birmingham", 1191, 723, "Birmingham Crossroads, a new commercial building with a metal roof and cupola"),
      p("birmingham-side", 644, 348, "Side view of the Birmingham Crossroads building"),
    ],
  },
];

export const interiors = {
  title: "Commercial Interiors",
  lead: "Whether your workplace needs include consolidation, right-sizing, or build-to-suit, Red Door Revivals can give your office the edgy, creative vibe that will help you attract and retain top talent. Today’s employees seek work-life integration, and we can transform your space using unique details such as exposed ceiling treatments, reclaimed wood flooring, and stained concrete.",
  photos: [
    p("int-salon", 1018, 861, "Wellness space lounge with green chairs, a floral mural, and a chandelier"),
    p("int-spa", 969, 861, "Wellness spa reception with a white desk and seating area"),
    p("int-office", 908, 861, "Creative office with a long work table and a blue accent wall"),
    p("int-breakroom", 1077, 479, "Office break room with reclaimed wood walls"),
    p("int-conference", 932, 478, "Conference room with a wood table and acoustic panels"),
    p("int-gym", 970, 861, "Fitness studio with a reception desk and equipment wall"),
  ],
};

export const lookbook = {
  title: "The Red Door Look Book",
  src: "/video/red-door-lookbook.mp4",
  poster: "/video/red-door-lookbook-poster.webp",
  captions: "/video/red-door-lookbook.vtt",
};

// Home page "Recent work"
export const featured: { photo: Photo; caption: string }[] = [
  { photo: residential.feature.after, caption: "Historic Marietta, restored" },
  { photo: residential.gallery[0], caption: "Residential" },
  { photo: residential.gallery[3], caption: "Kitchen" },
];
