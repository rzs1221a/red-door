import BeforeAfter from "@/components/BeforeAfter";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import WorkStrips from "@/components/WorkStrips";
import { ButtonLink, TextLink } from "@/components/ui";
import { site } from "@/lib/site";
import { strips } from "@/lib/home";
import { commercial, interiors, lookbook, region, residential, type CaseStudy } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph, video } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Projects",
  description: "Residential restorations, commercial renovations, new construction, and commercial interiors by Red Door Revivals, with before-and-after photos.",
  path: "/projects/",
  image: "/og/projects.jpg",
  imageAlt: "Historic Marietta Victorian home after restoration",
});

function Study({ s, flip = false, priority = false }: { s: CaseStudy; flip?: boolean; priority?: boolean }) {
  return (
    <article className="grid12 items-center">
      <Reveal delay={120} className={`col-span-12 md:col-span-4 ${flip ? "md:col-start-1" : "md:col-start-9 md:order-2"}`}>
        <h3 className="head">{s.name}</h3>
        <p className="lead mt-3">{s.headline}</p>
        <p className="mt-3 text-muted">{s.body}</p>
        {s.recognition && <p className="mt-4">{s.recognition}</p>}
        <p className="small mt-4 text-muted">{region}</p>
      </Reveal>
      <Reveal className={`col-span-12 mt-6 md:mt-0 md:col-span-7 ${flip ? "md:col-start-6" : "md:col-start-1 md:order-1"}`} variant="scale">
        {s.before && s.after ? (
          <BeforeAfter before={s.before} after={s.after} sizes="(min-width: 768px) 58vw, 100vw" cropBottom={s.wide ? 0.16 : 0.12} priority={priority} />
        ) : (
          <div className="grid gap-2 sm:grid-cols-[1.6fr_1fr] sm:items-start">
            {s.photos?.map((ph) => (
              <Picture key={ph.src} photo={ph} sizes="(min-width: 768px) 38vw, 100vw" className="overflow-hidden" />
            ))}
          </div>
        )}
      </Reveal>
    </article>
  );
}

export default function Projects() {
  const f = residential.feature;
  return (
    <>
      <section className="wrap pt-10 md:pt-16">
        <h1 className="title max-w-[18ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>Work that holds up</h1>
        <p className="lead mt-8 text-muted" data-rise style={{ "--i": 1 } as React.CSSProperties}>
          Selected Red Door Revivals projects from the {region}: residential restoration, commercial renovation, new construction, and interiors. Florida projects will join this page as they complete.
        </p>
      </section>

      <section className="wrap mt-10 md:mt-14" aria-label="Before and after">
        <Study s={{ name: f.name, headline: f.headline, body: f.body, recognition: f.recognition, before: f.before, after: f.after }} priority />
        <div className="mt-section-sm space-y-section-sm">
          {commercial.slice(0, 3).map((s, i) => (
            <Study key={s.name} s={s} flip={i % 2 === 0} />
          ))}
        </div>
      </section>

      <section className="wrap mt-section" aria-label="All projects">
        <Reveal>
          <WorkStrips strips={strips} title="All projects" />
          <p className="note mt-8 text-muted">All projects shown are Red Door Revivals work in the {region}. Florida projects will join as they complete.</p>
        </Reveal>
      </section>

      <section className="wrap mt-section grid12" aria-labelledby="interiors-h">
        <div className="col-span-12 md:col-span-4">
          <h2 id="interiors-h" className="head">{interiors.title}</h2>
          <p className="mt-5 text-muted">{interiors.lead}</p>
        </div>
        <Reveal className="col-span-12 mt-8 md:col-span-7 md:col-start-6 md:mt-0">
          <Gallery photos={interiors.photos} caption={region} columns={2} />
        </Reveal>
      </section>

      <section className="wrap mt-section" aria-labelledby="lookbook-h">
        <h2 id="lookbook-h" className="head">{lookbook.title}</h2>
        <p className="lead mt-4 max-w-[40ch] text-muted">Three minutes of Red Door residential, commercial, and interior work from the {region}.</p>
        <Reveal variant="fade" className="mt-8 overflow-hidden bg-black">
          <video controls preload="none" playsInline poster={lookbook.poster} className="block aspect-video w-full">
            <source src={lookbook.src} type="video/mp4" />
            <track kind="captions" src={lookbook.captions} srcLang="en" label="English" />
          </video>
        </Reveal>
      </section>

      <section className="wrap mt-section flex flex-wrap items-center justify-between gap-6">
        <p className="lead max-w-[36ch]">More of our Atlanta commercial work is on reddoorrevivals.com.</p>
        <div className="flex flex-wrap items-center gap-6">
          <TextLink href={site.atlantaUrl}>reddoorrevivals.com</TextLink>
          <ButtonLink href="/contact/">Request a consultation</ButtonLink>
        </div>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "Projects", path: "/projects/" }]), video())} />
    </>
  );
}
