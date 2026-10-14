import JsonLd from "@/components/JsonLd";
import FAQ from "@/components/FAQ";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import { ButtonLink } from "@/components/ui";
import { region, residential } from "@/lib/projects";
import { steps } from "@/lib/process";
import { positioning, why } from "@/lib/copy";
import { faqs } from "@/lib/faq";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "The Red Door Process",
  description: "Consultation, property assessment, design, a detailed project plan, project management, communication, and completion: how Red Door Revivals runs a renovation.",
  path: "/design-process/",
  image: "/og/design-process.jpg",
  imageAlt: "Kitchen with painted cabinets and dark ceiling beams",
});

const designCombined = why.find((w) => w.title ==="Design + Construction")!;
const processFaqs = faqs.filter((f) => /first|decide|designer|project plan|happening|end of the project/.test(f.q));
const stepPhotos = [residential.gallery[0], residential.feature.before, residential.gallery[3], residential.gallery[4], residential.gallery[2], residential.gallery[5], residential.feature.after];

export default function DesignProcess() {
  return (
    <>
      <section className="wrap pt-10 md:pt-16">
        <h1 className="title max-w-[18ch]" data-rise style={{ "--i": 0 } as React.CSSProperties}>The Red Door Process</h1>
        <p className="lead mt-8 text-muted" data-rise style={{ "--i": 1 } as React.CSSProperties}>
          {positioning.differenceLead} {positioning.difference}
        </p>
      </section>

      {/* Pinned story: the heading holds, the seven steps pass. */}
      <section className="wrap mt-section-sm grid gap-10 md:grid-cols-[5fr_7fr]">
        <div className="md:sticky md:top-[18vh] md:self-start">
          <p className="lead">Seven steps, in this order, on every project.</p>
          <p className="mt-4 max-w-[36ch] text-muted">Design decisions happen before construction, not while the contractor is standing in the kitchen.</p>
        </div>
        <ol className="space-y-section-sm">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal>
                <h2 className="head">{s.title}</h2>
                {s.intro.map((p) => (
                  <p key={p} className="lead mt-4 text-muted">{p}</p>
                ))}
                {s.listLead && <p className="mt-5">{s.listLead}</p>}
                {s.items && <p className="mt-2 max-w-[52ch] text-muted">{s.items.join(s.items[0].length > 30 ? " " : ", ")}{s.items[0].length > 30 ? "" : "."}</p>}
                {s.close?.map((c) => (
                  <p key={c} className="mt-5">{c}</p>
                ))}
              </Reveal>
              <Reveal className="shutter mt-8" delay={100}>
                <Picture photo={stepPhotos[i]} sizes="(min-width: 768px) 55vw, 100vw" className={`overflow-hidden ${i % 2 ? "aspect-[3/2] md:w-2/3" : "aspect-[16/10]"}`} imgClassName="h-full object-cover" />
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap mt-section grid12">
        <div className="col-span-12 md:col-span-5">
          <h2 className="head">{designCombined.title}</h2>
        </div>
        <div className="col-span-12 mt-6 md:col-span-6 md:col-start-7 md:mt-0">
          {designCombined.body.map((b) => (
            <p key={b} className="lead text-muted">{b}</p>
          ))}
          <p className="lead mt-4">{steps[2].close?.[0]}</p>
        </div>
      </section>

      <section className="wrap mt-section grid12">
        <h2 className="head col-span-12 md:col-span-4">About the process</h2>
        <div className="col-span-12 mt-8 md:col-span-7 md:col-start-6 md:mt-0">
          <FAQ items={processFaqs} />
          <div className="mt-12">
            <ButtonLink href="/contact/">Request a consultation</ButtonLink>
          </div>
        </div>
      </section>
      <p className="wrap small mt-10 text-muted">Photographs are Red Door projects in the {region}.</p>
      <JsonLd data={graph(breadcrumbs([{ name: "Our process", path: "/design-process/" }]))} />
    </>
  );
}
