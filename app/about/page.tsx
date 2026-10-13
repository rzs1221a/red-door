import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import Reveal, { RevealGroup } from "@/components/Reveal";
import Stats from "@/components/Stats";
import { Container, CtaBand, Dash, Eyebrow, PageIntro, SectionHead, TextLink } from "@/components/ui";
import { Award } from "@/components/icons";
import { site } from "@/lib/site";
import { closingPromise, hero, positioning, why } from "@/lib/copy";
import { region, residential } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "About",
  description:
    "Red Door Revivals brings 30+ years of residential and commercial experience, professional design, and detailed project management to property owners in Fernandina Beach.",
  path: "/about/",
  image: "/og/about.jpg",
  imageAlt: "Restored two-story home with a full front porch",
});

const experience = why.find((w) => w.title === "30+ Years of Experience")!;

export default function About() {
  return (
    <>
      <PageIntro eyebrow="About" title="Red Door Revivals" photo={residential.gallery[0]} photoCaption={`Restored two-story home, Red Door project, ${region}`}>
        <p>{hero.lead}</p>
      </PageIntro>

      <section className="border-b border-line">
        <Container className="grid gap-12 py-section-sm md:py-section lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Our difference</Eyebrow>
            <h2 className="display mt-4 text-display-lg">{positioning.differenceLead}</h2>
          </Reveal>
          <Reveal delay={120} className="prose-site text-lede text-ink-soft">
            <p className="display text-display-sm text-ink">{positioning.difference}</p>
            {positioning.detail.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-ink text-white">
        <Container className="py-section-sm md:py-20">
          <Stats tone="light" />
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="grid gap-12 py-section-sm md:py-section lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Experience</Eyebrow>
            <h2 className="display mt-4 text-display-lg">{experience.title}</h2>
            <p className="mt-4 font-medium">Residential and commercial building and design.</p>
          </Reveal>
          <Reveal delay={120} className="prose-site text-lede text-ink-soft">
            {experience.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <figure className="mt-10 grid grid-cols-2 gap-3">
              <Picture photo={residential.gallery[2]} sizes="(min-width: 1024px) 28vw, 50vw" className="zoom-media aspect-[4/3] overflow-hidden rounded-[3px] shadow-card" imgClassName="h-full object-cover" />
              <Picture photo={residential.gallery[7]} sizes="(min-width: 1024px) 28vw, 50vw" className="zoom-media aspect-[4/3] overflow-hidden rounded-[3px] shadow-card" imgClassName="h-full object-cover" />
              <figcaption className="col-span-2 text-[0.82rem] text-ink-soft">Red Door projects, {region}.</figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-2">
        <Container className="py-section-sm md:py-section">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHead eyebrow="Leadership" title="Two principals, one point of accountability" />
              <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
                {site.leadership.map((p) => (
                  <div key={p.name} className="rounded-[3px] bg-paper p-6 shadow-card">
                    <span className="display block text-[2rem] leading-none text-door">{p.name.split(" ").map((n) => n[0]).join("")}</span>
                    <p className="mt-5 text-[1.15rem] font-semibold">{p.name}</p>
                    <p className="text-ink-soft">{p.title}</p>
                  </div>
                ))}
              </RevealGroup>
              <p className="mt-6 text-ink-soft">Working together since 2000, involved from design through completion.</p>
            </div>
            <div>
              <SectionHead eyebrow="Recognition" title="Award-winning work" />
              <RevealGroup className="mt-10 space-y-4">
                {site.awards.map((a) => (
                  <div key={a.name} className="flex gap-5 rounded-[3px] bg-ink p-6 text-white shadow-card">
                    <Award size={26} className="shrink-0 text-brass-soft" />
                    <div>
                      <p className="text-[1.15rem] font-semibold">{a.name}</p>
                      <p className="text-white/65">{a.by}</p>
                    </div>
                  </div>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="grid gap-12 py-section-sm md:py-section lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{closingPromise.title}</Eyebrow>
            <h2 className="display mt-4 text-display-lg">{closingPromise.lead}</h2>
          </Reveal>
          <Reveal delay={120} className="text-lede">
            <ul className="space-y-4 text-ink-soft">
              {closingPromise.shouldnt.map((s) => (
                <li key={s} className="flex gap-3">
                  <Dash />
                  {s}
                </li>
              ))}
            </ul>
            <p className="display mt-8 text-display-sm">{closingPromise.therefore}</p>
            <p className="mt-4 font-medium text-ink">{closingPromise.verbs.join(" ")}</p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-cream">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-12">
          <p className="measure text-lede text-ink-soft">See our commercial work in Atlanta.</p>
          <TextLink href={site.atlantaUrl}>reddoorrevivals.com</TextLink>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={graph(breadcrumbs([{ name: "About", path: "/about/" }]))} />
    </>
  );
}
