# Red Door Revivals Florida

Website for Red Door Revivals in Fernandina Beach: renovation and project management for rental owners and investors.

Next.js 15 (static export), TypeScript, Tailwind CSS 4, Netlify Forms. No runtime dependencies beyond React and Next.

The design is a "dark room": one green-black ground, lit photographs, one typeface (Boska, self-hosted in `public/fonts`), the brand red on the single action. The red door in the hero is the supplied CSS door (`app/door.css`, `components/DoorScene.tsx`); it opens on arrival and the visitor can drag it, slide it and choose the room behind it. The art direction sheet and notes live in `.taste-skill/`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run typecheck  # tsc
npm run images     # regenerate responsive photo sizes, share images, and the 2x logo (needs sharp; outputs are committed)
```

Netlify builds with `npm run build` and publishes `out/` (see `netlify.toml`).

## Where things live

| What | File |
| --- | --- |
| Phone, email, domain, service area, leadership, awards | `lib/site.ts` |
| Site copy (from the Sept 11 positioning doc) | `lib/copy.ts` |
| Process steps (home, process page, contact) | `lib/process.ts` |
| Project photos and captions (from the Look Book) | `lib/projects.ts`, `public/images/projects/` |
| Responsive photo sizes (generated, committed) | `public/images/projects/_r/` |
| FAQ (composed from existing copy only) | `lib/faq.ts` |
| Client testimonials (empty until real quotes arrive) | `lib/testimonials.ts` |
| Per-page metadata and JSON-LD helpers | `lib/seo.ts`, `lib/schema.ts` |
| Pages | `app/*/page.tsx` |
| Inquiry form (client side) | `components/ContactForm.tsx` |
| Inquiry form (Netlify detection copy) | `public/__forms.html` (keep fields in sync) |
| The red door (supplied artwork, ported) | `app/door.css`, `components/DoorScene.tsx` |
| Home page copy deck (composed from lib/copy.ts) | `lib/home.ts` |
| Found pictures of Fernandina Beach and their credits | `lib/found.ts`, `lib/credits.json`, `public/images/found/` |
| Art direction sheet and design notes | `.taste-skill/direction.json`, `.taste-skill/notes.md` |
| Share preview images | `public/og.png` (home), `public/og/*.jpg` (generated) |
| Look Book video (opening "25 years" card trimmed off), captions, poster | `public/video/` |

## Content rules (from the client)

- No designer name on the site. Design is "our designer".
- Case studies use Red Door project photos only. No North Fletcher case study (no progress photos exist).
- Every photo on the site is Atlanta-area work and is labeled that way. Never present it as Florida work.
- Experience: 30+ years, residential and commercial.
- Florida only. ameliaislandbeachcondos.com is a separate scope.
- Nothing invented: no testimonials, reviews, ratings, license numbers, or addresses unless Red Door supplies them.

## Adding content

- **Florida project photos**: drop `.webp` files in `public/images/projects/`, run `npm run images`, add entries in `lib/projects.ts` (with alt text), and commit the generated `_r/` files.
- **Testimonials**: add real, attributed quotes to `lib/testimonials.ts`. The home page section appears automatically.
- **FAQ**: edit `lib/faq.ts`. Answers should stay grounded in the positioning copy.
- **Form fields**: change `components/ContactForm.tsx` and mirror the field in `public/__forms.html`.
- **Found pictures**: the three Fernandina Beach pictures are Creative Commons (CC BY and CC BY-SA) from Wikimedia Commons and are credited in the footer. Keep the credit if you keep the picture.
- **Rooms behind the door**: `doorRooms` in `lib/home.ts`.

## Before launch

- [ ] Florida domain chosen; update `site.url` in `lib/site.ts` and add it in Netlify
- [ ] Florida phone and inbox; update `lib/site.ts`
- [x] Logo in `public/images/` (rendered from the vector EPS; reverse version for dark backgrounds)
- [x] Look Book photos and trimmed video on Projects, Home, Process (`lib/projects.ts`; all Atlanta-area work)
- [ ] Florida project photos, especially before/after, as projects complete
- [x] Positioning doc copy placed (30 → 30+ years)
- [ ] Copy draft from Red Door, edited in place over `lib/copy.ts`
- [ ] Confirm Atlanta-sourced facts in `lib/site.ts` (phone, email, portal, social, leadership, awards) for Florida
- [ ] Netlify Forms enabled; notification email set to Red Door's inbox
- [ ] CoConstruct lead routing confirmed (web lead form or email forward)
- [ ] Review `app/privacy/page.tsx` with Red Door
- [ ] Remove the `X-Robots-Tag = "noindex"` header in `netlify.toml`
- [ ] Google Search Console, analytics (then update the privacy page), Google Business Profile
