# Red Door Revivals Florida

Website for Red Door Revivals in Fernandina Beach: renovation and project management for rental owners and investors.

Next.js 15 (static export), TypeScript, Tailwind CSS 4, Netlify Forms.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

Netlify builds with `npm run build` and publishes `out/` (see `netlify.toml`).

## Where things live

| What | File |
| --- | --- |
| Phone, email, domain, service area, leadership, awards | `lib/site.ts` |
| Site copy (from the Sept 11 positioning doc) | `lib/copy.ts` |
| Process steps (home + process page) | `lib/process.ts` |
| Pages | `app/*/page.tsx` |
| Inquiry form (client side) | `components/ContactForm.tsx` |
| Inquiry form (Netlify detection copy) | `public/__forms.html` (keep fields in sync) |
| The door illustration | `components/Door.tsx` |

## Content rules (from the client)

- No designer name on the site. Design is "our designer".
- Case studies use Red Door project photos only. No North Fletcher case study (no progress photos exist).
- Experience: 30+ years, residential and commercial.
- Florida only. ameliaislandbeachcondos.com is a separate scope.
| Share preview image | `public/og.png` |

## Before launch

- [ ] Florida domain chosen; update `site.url` in `lib/site.ts` and add it in Netlify
- [ ] Florida phone and inbox; update `lib/site.ts`
- [x] Logo in `public/images/` (rendered from the vector EPS; reverse version for dark backgrounds)
- [ ] Red Door project photos; replace `PhotoSlot` placeholders on Home, Rental owners, Process, Projects
- [x] Positioning doc copy placed (30 → 30+ years)
- [ ] Copy draft from Red Door, edited in place over `lib/copy.ts`
- [ ] Confirm Atlanta-sourced facts in `lib/site.ts` (phone, email, portal, social, leadership, awards) for Florida
- [ ] Netlify Forms enabled; notification email set to Red Door's inbox
- [ ] CoConstruct lead routing confirmed (web lead form or email forward)
- [ ] Remove the `X-Robots-Tag = "noindex"` header in `netlify.toml`
- [ ] Google Search Console, analytics, Google Business Profile
