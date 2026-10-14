import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import Reveal, { RevealGroup } from "@/components/Reveal";
import { ButtonLink, TextLink } from "@/components/ui";
import { site } from "@/lib/site";
import { interiors, region } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Client Portal",
  description: "Log in to follow your Red Door Revivals project: schedule, photos, budget, selections, and messages.",
  path: "/client-portal/",
  image: "/og/client-portal.jpg",
  imageAlt: "Creative office interior by Red Door Revivals",
});

// Portal contents per the scope: documents, messages, and project status (CoConstruct).
const inside = [
  ["Project status","Where the project stands during the build."],
  ["Messages","Project messages, kept with the project."],
  ["Documents","Project documents in one place."],
];

export default function ClientPortal() {
  return (
    <>
      <section className="wrap pt-10 md:pt-16">
        <h1 className="title max-w-[18ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>Your project, from anywhere</h1>
      </section>
      <section className="wrap grid12 mt-10 items-center md:mt-14">
        <div className="col-span-12 md:col-span-5">
          <p className="lead text-muted" data-rise style={{ "--i": 1 } as React.CSSProperties}>
            Owners receive regular updates throughout the project. Clients and trade partners find documents, messages, and project status in our client portal during a build.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6" data-rise style={{ "--i": 2 } as React.CSSProperties}>
            <ButtonLink href={site.portalUrl}>Log in to the client portal</ButtonLink>
            <TextLink href="/contact/">Start a project</TextLink>
          </div>
        </div>
        <Reveal className="shutter col-span-12 mt-10 md:col-span-6 md:col-start-7 md:mt-0">
          <Picture photo={interiors.photos[2]} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover" />
          <p className="small mt-3 text-muted">Creative office, a Red Door project in the {region}.</p>
        </Reveal>
      </section>

      <section className="wrap mt-section grid12">
        <Reveal as="div" className="col-span-12 md:col-span-4">
          <h2 className="head">What you’ll find</h2>
        </Reveal>
        <RevealGroup as="div" className="col-span-12 mt-8 grid gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-5 md:mt-0">
          {inside.map(([t, b], i) => (
            <div key={t}>
              <Picture photo={[interiors.photos[4], interiors.photos[0], interiors.photos[3]][i]} sizes="(min-width: 640px) 22vw, 100vw" className="aspect-[4/3] overflow-hidden" imgClassName="h-full object-cover" />
              <p className="lead mt-4">{t}</p>
              <p className="text-muted">{b}</p>
            </div>
          ))}
        </RevealGroup>
        <Reveal as="p" className="col-span-12 mt-12 max-w-[44ch] text-muted md:col-span-8 md:col-start-5">
          Can’t log in? Call <a href={`tel:${site.phone.tel}`} className="link text-ink">{site.phone.display}</a> and we’ll reset your access.
        </Reveal>
      </section>
      <JsonLd data={graph(breadcrumbs([{ name: "Client portal", path: "/client-portal/" }]))} />
    </>
  );
}
