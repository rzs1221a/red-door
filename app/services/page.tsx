import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import { ButtonLink } from "@/components/ui";
import { positioning, services } from "@/lib/copy";
import { region, residential } from "@/lib/projects";
import { found } from "@/lib/found";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph, serviceList } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Rental and Investment Property Renovation",
  description: "Rental property, investment property, whole-property, kitchen, and bathroom renovations in Fernandina Beach, professionally planned and managed by Red Door Revivals.",
  path: "/services/",
  image: "/og/services.jpg",
  imageAlt: "White kitchen renovation by Red Door Revivals",
});

// One lit photograph per service, text beside it, sides alternating.
const photos: Record<string, (typeof residential.gallery)[number] | undefined> = {
  rental: residential.gallery[5],
  investment: residential.gallery[0],"whole-property": residential.gallery[8],
  kitchens: residential.gallery[4],
  bathrooms: undefined,
};

export default function Services() {
  return (
    <>
      <section className="wrap title-screen pt-10 md:pt-16">
        <div>
          <h1 className="title max-w-[18ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>What we do</h1>
          <p className="lead mt-8 text-muted" data-rise style={{ "--i": 1 } as React.CSSProperties}>{positioning.body[0]}</p>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 small">
            {services.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="link">{s.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="shutter" data-rise style={{ "--i": 2 } as React.CSSProperties}>
          <Picture photo={residential.gallery[5]} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover" priority />
          <p className="small mt-3 text-muted">A living room in a Red Door project, {region}.</p>
        </Reveal>
      </section>

      {services.map((s, i) => {
        const ph = photos[s.id];
        const flip = i % 2 === 1;
        return (
          <section key={s.id} id={s.id} className="wrap mt-section scroll-mt-10" aria-labelledby={`${s.id}-h`}>
            <div className="grid12 items-center">
              {ph && (
                <Reveal className={`shutter col-span-12 md:col-span-6 ${flip ? "md:col-start-7 md:order-2" : ""}`}>
                  <Picture photo={ph} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover" />
                </Reveal>
              )}
              <Reveal delay={120} className={`col-span-12 mt-8 md:mt-0 ${ph ? "md:col-span-5" : "md:col-span-10 md:col-start-2"} ${ph && !flip ? "md:col-start-8" : ""}`}>
                <h2 id={`${s.id}-h`} className="head">{s.title}</h2>
                {s.lead.map((l) => (
                  <p key={l} className="lead mt-5 text-muted">{l}</p>
                ))}
                {s.body && (
                  <div className="mt-6 space-y-1">
                    {s.body.map((b) => (
                      <p key={b} className={b.includes("+") ? "lead text-ink" : "text-muted"}>{b}</p>
                    ))}
                  </div>
                )}
                {s.listLead && <p className="mt-6">{s.listLead}</p>}
                {s.items && (ph ? <p className="mt-2 max-w-[48ch] text-muted">{s.items.join(", ")}.</p> : <p className="lead mt-4 max-w-none text-muted">{s.items.join(", ")}.</p>)}
                {s.defs && (
                  <dl className="mt-4 space-y-3">
                    {s.defs.map((d) => (
                      <div key={d.term} className="grid gap-x-6 sm:grid-cols-[11rem_1fr]">
                        <dt>{d.term}</dt>
                        <dd className="text-muted">{d.desc}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {s.close?.map((c) => (
                  <p key={c} className="mt-6">{c}</p>
                ))}
                {ph && <p className="small mt-6 text-muted">Red Door project, {region}.</p>}
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="wrap mt-section grid12 items-end">
        <Reveal className="shutter col-span-12 md:col-span-7">
          <Picture photo={found.centreStreet} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[16/10] overflow-hidden" imgClassName="h-full object-cover object-[50%_55%]" />
          <p className="small mt-3 text-muted">Centre Street, Fernandina Beach. Picture via Wikimedia Commons, credited below.</p>
        </Reveal>
        <Reveal delay={120} className="col-span-12 mt-8 md:col-span-4 md:col-start-9 md:mt-0">
          <p className="lead">Tell us about the property. We’ll tell you what we’d do first.</p>
          <div className="mt-6">
            <ButtonLink href="/contact/">Request a consultation</ButtonLink>
          </div>
        </Reveal>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "What we do", path: "/services/" }]), ...serviceList())} />
    </>
  );
}
