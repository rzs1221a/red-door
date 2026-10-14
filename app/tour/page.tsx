import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import Reveal, { RevealGroup } from "@/components/Reveal";
import TourRail from "@/components/TourRail";
import { ButtonLink, TextLink } from "@/components/ui";
import { site } from "@/lib/site";
import { found } from "@/lib/found";
import { region } from "@/lib/projects";
import { stops, tourEnd, tourIntro } from "@/lib/tour";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "The tour",
  description: "A walk through the Red Door Revivals site in seven stops: the home page, what we do, our process, projects, about, the client portal, and contact.",
  path: "/tour/",
  image: "/og/design-process.jpg",
  imageAlt: "Kitchen with painted cabinets and dark ceiling beams",
});

export default function Tour() {
  const rail = stops.map((s) => ({ id: s.id, label: s.label }));
  return (
    <>
      <section className="wrap title-screen pt-10 md:pt-16">
        <div>
          <h1 className="title max-w-[18ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>{tourIntro.title}</h1>
          <p className="lead mt-8 text-muted" data-rise style={{ "--i": 1 } as React.CSSProperties}>{tourIntro.lead}</p>
          <p className="mt-4 max-w-[40ch] text-muted" data-rise style={{ "--i": 2 } as React.CSSProperties}>{tourIntro.note}</p>
          <div className="mt-8" data-rise style={{ "--i": 3 } as React.CSSProperties}>
            <ButtonLink href="#stop-home">Start the tour</ButtonLink>
          </div>
        </div>
        <Reveal className="shutter" data-rise style={{ "--i": 2 } as React.CSSProperties}>
          <Picture photo={stops[0].photo} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover" priority />
          <p className="small mt-3 text-muted">{stops[0].caption} {region}.</p>
        </Reveal>
      </section>

      <div className="wrap tour mt-section-sm md:mt-section">
        <aside className="tour-guide">
          <TourRail items={rail} />
        </aside>

        <ol className="tour-stops" aria-label="The stops">
          {stops.map((s, i) => (
            <li key={s.id} id={`stop-${s.id}`} className="tour-stop scroll-mt-24 md:scroll-mt-[18vh]">
              <Reveal>
                <h2 className="head"><span className="tour-n" aria-hidden="true">{i + 1}</span><span className="sr-only">Stop {i + 1} of {stops.length}: </span>{s.label}</h2>
                <p className="lead mt-4">{s.purpose}</p>
              </Reveal>
              <div className="grid12 mt-8 items-start">
                <Reveal className={`shutter col-span-12 md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
                  <Picture photo={s.photo} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover" />
                  <p className="small mt-3 text-muted">{s.caption} {region}.</p>
                </Reveal>
                <Reveal delay={120} className={`col-span-12 mt-8 md:col-span-5 md:mt-0 ${i % 2 ? "" : "md:col-start-8"}`}>
                  {s.lines.filter(Boolean).map((l) => (
                    <p key={l} className="mt-4 text-muted first:mt-0">{l}</p>
                  ))}
                  {s.list && (
                    <>
                      <p className="mt-6">{s.listLabel}</p>
                      <RevealGroup as="ol" className="mt-2 space-y-2 text-muted" stagger={60}>
                        {s.list.map((item) => (
                          <li key={item} className="grid grid-cols-[1.5rem_1fr]">
                            <span aria-hidden="true" className="text-ink">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </RevealGroup>
                    </>
                  )}
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <ButtonLink href={s.href} variant="ink">{s.go}</ButtonLink>
                    {i + 1 < stops.length ? (
                      <a href={`#stop-${stops[i + 1].id}`} className="link inline-block py-2.5 md:py-0">Next stop: {stops[i + 1].label}</a>
                    ) : (
                      <a href="#tour-end" className="link inline-block py-2.5 md:py-0">The end</a>
                    )}
                  </div>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <section id="tour-end" className="mt-section scroll-mt-24 bg-surface" aria-labelledby="tour-end-h">
        <div className="wrap grid12 py-section-sm">
          <div className="col-span-12 md:col-span-5">
            <h2 id="tour-end-h" className="head">{tourEnd.title}</h2>
            <p className="lead mt-5">{tourEnd.lead}</p>
            <RevealGroup as="ul" className="mt-8 space-y-1" stagger={80}>
              {tourEnd.lines.map((l) => (
                <li key={l} className="lead text-muted">{l}</li>
              ))}
            </RevealGroup>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <ButtonLink href="/contact/">Request a consultation</ButtonLink>
              <TextLink href={`tel:${site.phone.tel}`}>Call {site.phone.display}</TextLink>
            </div>
            <p className="mt-8 text-muted">
              Back to the <Link href="/" className="link text-ink">home page</Link>, or <a href="#stop-home" className="link text-ink">start the tour again</a>.
            </p>
          </div>
          <Reveal className="shutter col-span-12 mt-10 md:col-span-6 md:col-start-7 md:mt-0">
            <Picture photo={found.centreStreet} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover object-[50%_55%]" />
            <p className="small mt-3 text-muted">Centre Street, {site.city}. Picture via Wikimedia Commons, credited below. Project photographs above are Red Door projects in the {region}.</p>
          </Reveal>
        </div>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "The tour", path: "/tour/" }]))} />
    </>
  );
}
