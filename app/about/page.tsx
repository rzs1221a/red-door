import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import CountUp from "@/components/CountUp";
import Reveal, { RevealGroup } from "@/components/Reveal";
import { ButtonLink, TextLink } from "@/components/ui";
import { site } from "@/lib/site";
import { closingPromise, hero, positioning, why } from "@/lib/copy";
import { found } from "@/lib/found";
import { commercial, region, residential } from "@/lib/projects";
import { steps } from "@/lib/process";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "About",
  description: "Red Door Revivals brings 30+ years of residential and commercial experience, professional design, and detailed project management to property owners in Fernandina Beach.",
  path: "/about/",
  image: "/og/about.jpg",
  imageAlt: "Restored two-story home with a full front porch",
});

const experience = why.find((w) => w.title ==="30+ Years of Experience")!;

export default function About() {
  return (
    <>
      <section className="wrap pt-10 md:pt-16">
        <h1 className="title max-w-[18ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>Thirty years of building</h1>
        <p className="lead mt-8 text-muted" data-rise style={{ "--i": 1 } as React.CSSProperties}>{hero.lead}</p>
      </section>

      <section className="wrap mt-section-sm grid12 items-end">
        <Reveal className="shutter col-span-12 md:col-span-7">
          <Picture photo={found.lighthouse} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[16/10] overflow-hidden" imgClassName="h-full object-cover" />
        </Reveal>
        <div className="col-span-12 mt-6 md:col-span-4 md:col-start-9 md:mt-0">
          <p className="lead">{positioning.difference}</p>
          <p className="mt-4 text-muted">{positioning.detail[1]}</p>
          <p className="small mt-4 text-muted">The Amelia Island lighthouse, from Egans Creek. Credited below.</p>
        </div>
      </section>

      {/* Numbers at display size: facts already stated on the site. */}
      <section className="wrap mt-section">
        <RevealGroup className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4" stagger={100}>
          {[
            { n: "30+", t: "years of residential and commercial building and design" },
            { n: String(steps.length), t: "steps in the Red Door Process, consultation to completion" },
            { n: "2", t: "principals, working together since 2000" },
            { n: "2", t: "renovation-of-the-year awards" },
          ].map((s) => (
            <div key={s.t}>
              <CountUp value={s.n} className="display max-w-none" style={{ fontSize: "clamp(4.5rem, 2rem + 8vw, 9rem)" }} />
              <p className="mt-3 max-w-[22ch] text-muted">{s.t}</p>
            </div>
          ))}
        </RevealGroup>
      </section>

      <section className="wrap mt-section grid12">
        <div className="col-span-12 md:col-span-5">
          <h2 className="head">{experience.title}</h2>
          <p className="mt-5 text-muted">{positioning.detail[0]}</p>
          {experience.body.map((p) => (
            <p key={p} className="mt-4 text-muted">{p}</p>
          ))}
        </div>
        <Reveal className="shutter col-span-12 mt-8 md:col-span-6 md:col-start-7 md:mt-0">
          <Picture photo={residential.gallery[2]} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover" />
          <p className="small mt-3 text-muted">Cedar-shingle home, a Red Door project in the {region}.</p>
        </Reveal>
      </section>

      <section className="wrap mt-section grid12">
        <div className="col-span-12 md:col-span-5">
          <h2 className="head">Two principals</h2>
          <ul className="mt-8 space-y-4">
            {site.leadership.map((p) => (
              <li key={p.name}>
                <p className="lead">{p.name}</p>
                <p className="text-muted">{p.title}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[36ch] text-muted">Working together since 2000, involved from design through completion.</p>
        </div>
        <div className="col-span-12 mt-10 md:col-span-6 md:col-start-7 md:mt-0">
          <h2 className="head">Recognition</h2>
          <Reveal className="mt-8 grid grid-cols-2 gap-2">
            <Picture photo={residential.feature.after} sizes="25vw" className="aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover object-top" />
            <Picture photo={commercial[0].after!} sizes="25vw" className="aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover object-top" />
          </Reveal>
          <ul className="mt-8 space-y-4">
            {site.awards.map((a) => (
              <li key={a.name}>
                <p className="lead">{a.name}</p>
                <p className="text-muted">{a.by}</p>
              </li>
            ))}
            <li>
              <p className="lead">{residential.feature.recognition}</p>
              <p className="text-muted">{residential.feature.name}</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="wrap mt-section grid12">
        <div className="col-span-12 md:col-span-5">
          <h2 className="head">{closingPromise.title}</h2>
          <p className="lead mt-5">{closingPromise.lead}</p>
          <Reveal className="shutter mt-10 hidden md:block">
            <Picture photo={found.fairbanksHouse} sizes="40vw" className="aspect-[4/5] overflow-hidden" imgClassName="h-full object-cover object-[60%_30%]" />
            <p className="small mt-3 text-muted">The Fairbanks House, {site.city}. Credited below.</p>
          </Reveal>
        </div>
        <div className="col-span-12 mt-8 md:col-span-6 md:col-start-7 md:mt-0">
          {closingPromise.shouldnt.map((s) => (
            <p key={s} className="mt-3 text-muted">{s}</p>
          ))}
          <p className="lead mt-8">{closingPromise.therefore}</p>
          <p className="mt-3">{closingPromise.verbs.join(" ")}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink href="/contact/">Request a consultation</ButtonLink>
            <TextLink href={site.atlantaUrl}>Our Atlanta work</TextLink>
          </div>
        </div>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "About", path: "/about/" }]))} />
    </>
  );
}
