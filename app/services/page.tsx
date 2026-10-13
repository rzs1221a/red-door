import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import { Container, CtaBand, Dash, Eyebrow, PageIntro } from "@/components/ui";
import { positioning, services } from "@/lib/copy";
import { region, residential } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph, serviceList } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Rental and Investment Property Renovation",
  description:
    "Rental property, investment property, whole-property, kitchen, and bathroom renovations in Fernandina Beach, professionally planned and managed by Red Door Revivals.",
  path: "/services/",
  image: "/og/services.jpg",
  imageAlt: "White kitchen renovation by Red Door Revivals",
});

// Photos that fit each service. Bathrooms have no photo yet, so that section is type-led.
const photos: Record<string, { photo: (typeof residential.gallery)[number]; note: string } | undefined> = {
  rental: { photo: residential.gallery[5], note: "Living room, Red Door project" },
  investment: { photo: residential.gallery[0], note: "Restored two-story home, Red Door project" },
  "whole-property": { photo: residential.gallery[8], note: "Screened porch, Red Door project" },
  kitchens: { photo: residential.gallery[4], note: "Kitchen, Red Door project" },
};

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((it) => (
        <li key={it} className="rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 text-[0.9rem]">
          {it}
        </li>
      ))}
    </ul>
  );
}

export default function Services() {
  return (
    <>
      <PageIntro eyebrow="What we do" title={positioning.title} photo={residential.gallery[3]} photoCaption={`Kitchen, Red Door project, ${region}`}>
        {positioning.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </PageIntro>

      <nav aria-label="Services" className="sticky top-16 z-20 border-b border-line bg-paper/92 backdrop-blur-md lg:top-[72px]">
        <Container className="flex gap-x-7 overflow-x-auto py-3.5 text-[0.9rem] font-medium whitespace-nowrap">
          {services.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="link-underline shrink-0 text-ink-soft hover:text-ink">
              <span className="mr-1.5 text-door">0{i + 1}</span>
              {s.title}
            </a>
          ))}
        </Container>
      </nav>

      {services.map((s, i) => {
        const ph = photos[s.id];
        const flip = i % 2 === 1;
        return (
          <section key={s.id} id={s.id} className={`scroll-mt-36 border-b border-line ${flip ? "bg-paper-2" : ""}`}>
            <Container className={`grid gap-12 py-section-sm md:py-section ${ph ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-[1fr_1.4fr]"} lg:gap-16`}>
              <Reveal className={ph && flip ? "lg:order-2" : ""}>
                <Eyebrow>Service 0{i + 1}</Eyebrow>
                <h2 className="display mt-4 text-display-lg">{s.title}</h2>
                {s.lead.map((l) => (
                  <p key={l} className="measure mt-5 text-lede text-ink-soft">{l}</p>
                ))}
                {ph && (
                  <figure className="mt-10">
                    <Picture photo={ph.photo} sizes="(min-width: 1024px) 45vw, 100vw" className="zoom-media aspect-[4/3] overflow-hidden rounded-[3px] shadow-card" imgClassName="h-full object-cover" />
                    <figcaption className="mt-2.5 text-[0.82rem] text-ink-soft">
                      {ph.note}, {region}
                    </figcaption>
                  </figure>
                )}
              </Reveal>
              <Reveal delay={120} className={`text-[1.05rem] ${ph && flip ? "lg:order-1" : ""} ${ph ? "lg:pt-14" : ""}`}>
                {s.body && (
                  <div className="space-y-2 text-ink-soft">
                    {s.body.map((b) => (
                      <p key={b} className={b.includes("+") ? "display text-display-sm text-ink" : ""}>{b}</p>
                    ))}
                  </div>
                )}
                {s.listLead && <p className={`${s.body ? "mt-8" : ""} font-medium`}>{s.listLead}</p>}
                {s.items && <List items={s.items} />}
                {s.defs && (
                  <ol className="mt-4 divide-y divide-line border-y border-line">
                    {s.defs.map((d, j) => (
                      <li key={d.term} className="grid gap-1 py-4 sm:grid-cols-[2.5rem_11rem_1fr] sm:gap-6">
                        <span className="display text-[1.3rem] leading-none text-door">0{j + 1}</span>
                        <span className="font-semibold">{d.term}</span>
                        <span className="text-ink-soft">{d.desc}</span>
                      </li>
                    ))}
                  </ol>
                )}
                {s.close?.map((c) => (
                  <p key={c} className="mt-7 flex gap-3 font-medium">
                    <Dash />
                    {c}
                  </p>
                ))}
              </Reveal>
            </Container>
          </section>
        );
      })}

      <CtaBand />
      <JsonLd data={graph(breadcrumbs([{ name: "What we do", path: "/services/" }]), ...serviceList())} />
    </>
  );
}
