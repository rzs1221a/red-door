# Red Door Revivals Florida: redesign notes (tasteskill run)

## Inventory (what belongs to this client and no competitor)

1. The name is an object: a red front door. The logo is a red door leaf, ajar.
2. The promise, in the client's words: "You own the property. We'll manage the project."
3. Fernandina Beach, Amelia Island, Yulee, Nassau County: a Victorian seaside town (Centre Street
   storefronts, the Fairbanks House, the lighthouse over the marsh, live oaks, palms).
4. 30+ years, residential and commercial. Two principals (Will Colley, Ken Parsons) working
   together since 2000.
5. The Red Door Process: seven named steps, and the Must Do / Should Do / Could Do triage.
6. The detailed project plan as a document: scope, materials, finishes, labor, sequence,
   responsibilities, schedule, pricing, allowances, exclusions, contingencies.
7. Awards: Renovation of the Year (Greater Atlanta Home Builders Association); Commercial Renovation
   of the Year (Roswell Historical Society); the Marietta Victorian placed on the National Register.
8. The owners often live out of town. Vacation rentals. They cannot stand in the kitchen.
9. A church turned into a restaurant (Roswell Junction). A shopping center re-faced (Roswell Depot).
10. Materials in the photographs: brick piers, deep porches, butcher block, subway tile, cedar shingle.
11. The client portal: documents, messages, project status, from anywhere.
12. Bonded and insured.

## The idea

On this page, **the red door** (the firm's name, its logo, and the first thing a renovation
changes) becomes **the lit object in a dark room: the door opens onto what Red Door manages for the
owner, and every later screen is another lit thing seen through it (the finished rooms, the plan,
the process, the people).**

Competitor test: another Amelia Island contractor has no red door. The sentence fails for them.

## The live thing

The door itself, with nothing beside it. It swings open on arrival, leans with the pointer, opens
wider as the first screen is scrolled away, and swings if the visitor takes hold of the leaf (pointer
or thumb). The finished Red Door room behind it changes on its own (three real projects), named in
the caption under the sill. Without script: the door stands open on the first room.

## The argument (claims and proof, in page order)

1. You own the property. We'll manage the project.        → the door, opening onto a finished room; one button
2. You shouldn't have to become a construction expert.   → the staircase statement; the plan/manage/finish note; two photographs
3. Three kinds of renovation, planned before they are built → three full-bleed rooms with a card each (rental, investment, whole-property; kitchens and bathrooms named inside)
4. The work holds up, and some of it won award           → strips of real project photographs, the award named on the line
5. Seven steps, in order, with nothing improvised        → a row of seven moments to drag through
6. Who we work with                                      → sticky photograph, active list of seven
7. The questions owners ask first                        → facts and six answers beside the Fairbanks House
8. Write to us                                           → the email as display type, inverted field
9. (quiet line)                                          → three items on one baseline

## Direction

Dark room (seed 1350395972). Redraws: section:list → list-sticky-photo-active-list (the dealt
timetable needs four columns of data the content does not have). Palette: dealt proportions kept,
colours taken from the subject (the door preview's green-black, cream, brass, the brand red) because
cornflower blue fights the red door. Type: Boska, as dealt, self-hosted.

## Copy deck

Nav: Red Door Revivals (logo) · What we do · Process · Projects · About · Contact → "Request a consultation"

Hero
  name: Red Door Revivals
  supporting: You own the property. We'll manage the project.
  button: Request a consultation
  door caption (under the sill): Behind the door, a [kitchen / living room / library] we built in the Atlanta area.

Intro (statement, five lines)
  You shouldn't / have to become / a construction expert / to renovate / your property.
  note: Before work begins, we develop the plan. During the project, we manage the details.
        When it is complete, we make sure it is done right.

Showcase (three frames)
  Rental property renovations · Rental properties have different requirements than owner-occupied homes. · Kitchens, bathrooms, flooring, paint, fixtures: where the investment produces the greatest benefit. · See the service
  Investment property renovations · For investors purchasing or repositioning properties, we can become involved before construction begins. · Assessment, planning, design, budget, construction, completion. · See the service
  Whole-property updates · Sometimes a property doesn't need a gut renovation. It needs to be revived. · Paint, flooring, trim, doors, lighting, fixtures, hardware, kitchens, bathrooms, outdoor spaces. · See the service

Work (strips): Historic Marietta · Residential · Commercial renovation · New construction · Commercial interiors
  line under each: name left · descriptor centre · right: award or "Atlanta area"

Process (drag row): Consultation / Property assessment / Design / Detailed project plan / Project management / Communication / Completion, each with its short line

List: Who we work with (seven), each with a one-line description composed from existing copy

FAQ: Before you call · facts: phone, email, where we work, bonded and insured · six questions

Contact: will@reddoorrevivals.com · "Tell us about the property and what you want it to do." · phone, city · Instagram, Facebook

Footer line: Renovation and project management, Fernandina Beach · links · © year · Privacy

## Build log

- Redraws: `section:list → list-sticky-photo-active-list` (the dealt timetable needed four columns of
  data the content does not have). Palette: proportions kept, colours from the subject (green-black
  ground from the door preview, off-white ink, brand red accent, brass only inside the door).
- The door is the supplied artwork; its gradients and shadows live under `[data-ui]` in
  `app/door.css` and the inspector runs with `--allow gradient` for that reason only.
- No honest footage exists of Fernandina Beach or Amelia Island in the open collections (searched
  "Amelia Island", "Fernandina Beach", "Florida marsh" with `assets.mjs --video`); the page's moving
  picture is the door opening and the slow drift on the Fairbanks House.
- Rows that scroll sideways (project strips, the process row) are the dealt blueprints.
- Privacy and the 404 carry one picture each by design (a document and an error page).
