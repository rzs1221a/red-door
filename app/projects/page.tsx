import BeforeAfter from "@/components/BeforeAfter";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import { Container, CtaBand, Eyebrow, PageIntro, SectionHead, TextLink } from "@/components/ui";
import { Award, Play } from "@/components/icons";
import { site } from "@/lib/site";
import { commercial, interiors, lookbook, region, residential, type CaseStudy } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph, video } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Projects",
  description:
    "Residential restorations, commercial renovations, new construction, and commercial interiors by Red Door Revivals, with before-and-after photos.",
  path: "/projects/",
  image: "/og/projects.jpg",
  imageAlt: "Historic Marietta Victorian home after restoration",
});

const sections = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "interiors", label: "Interiors" },
  { id: "look-book", label: "Look Book" },
];

function Study({ s, flip = false, priority = false }: { s: CaseStudy; flip?: boolean; priority?: boolean }) {
  return (
    <article className={`grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-14 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <Reveal className="lg:pt-4">
        <Eyebrow>{region}</Eyebrow>
        <h3 className="display mt-3 text-display-md">{s.name}</h3>
        <p className="mt-4 text-[1.1rem] font-semibold">{s.headline}</p>
        <p className="measure mt-2 text-[1.02rem] text-ink-soft">{s.body}</p>
        {s.recognition && (
          <p className="mt-5 inline-flex items-center gap-2.5 text-[0.95rem]">
            <Award size={18} className="text-brass" />
            {s.recognition}
          </p>
        )}
      </Reveal>
      <Reveal variant="scale" delay={100}>
        {s.before && s.after ? (
          <BeforeAfter
            before={s.before}
            after={s.after}
            sizes="(min-width: 1024px) 60vw, 100vw"
            label="Drag to compare"
            cropBottom={s.wide ? 0.16 : 0.12}
            priority={priority}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr] sm:items-start">
            {s.photos?.map((ph) => (
              <Picture key={ph.src} photo={ph} sizes="(min-width: 1024px) 38vw, 100vw" className="zoom-media overflow-hidden rounded-[3px] shadow-card" />
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
      <PageIntro
        eyebrow="Projects"
        title="Work that holds up"
        actions={
          <ul className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-block rounded-full border border-ink/20 px-4 py-2 text-[0.9rem] font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        }
      >
        <p>
          Selected Red Door Revivals projects from the {region}: residential restoration, commercial renovation, new construction, and interiors. Florida projects will join this page as they complete.
        </p>
      </PageIntro>

      {/* Residential */}
      <section id="residential" className="scroll-mt-24 border-b border-line">
        <Container className="py-section-sm md:py-section">
          <SectionHead eyebrow="Residential" title={residential.title} lead={<p>{residential.lead}</p>} />
          <div className="mt-14">
            <Study s={{ name: f.name, headline: f.headline, body: f.body, recognition: f.recognition, before: f.before, after: f.after }} priority />
          </div>
          <div className="mt-16">
            <Gallery photos={residential.gallery} caption={region} />
            <p className="mt-3 text-[0.85rem] text-ink-soft">Residential work, {region}. Tap a photo to view it larger.</p>
          </div>
        </Container>
      </section>

      {/* Commercial */}
      <section id="commercial" className="scroll-mt-24 border-b border-line bg-paper-2">
        <Container className="py-section-sm md:py-section">
          <SectionHead eyebrow="Commercial" title="Commercial renovation and new construction" />
          <div className="mt-14 space-y-20 md:space-y-28">
            {commercial.map((s, i) => (
              <Study key={s.name} s={s} flip={i % 2 === 1} />
            ))}
          </div>
        </Container>
      </section>

      {/* Commercial interiors */}
      <section id="interiors" className="scroll-mt-24 border-b border-line">
        <Container className="py-section-sm md:py-section">
          <SectionHead eyebrow="Interiors" title={interiors.title} lead={<p>{interiors.lead}</p>} />
          <div className="mt-12">
            <Gallery photos={interiors.photos} caption={region} />
          </div>
        </Container>
      </section>

      {/* Look Book */}
      <section id="look-book" className="grain scroll-mt-24 border-b border-line bg-ink-deep text-white">
        <Container className="py-section-sm md:py-section">
          <SectionHead eyebrow="Watch" title={lookbook.title} tone="light" lead={<p>Three minutes of Red Door residential, commercial, and interior work from the {region}.</p>} />
          <Reveal variant="scale" className="mt-10 overflow-hidden rounded-[3px] bg-black shadow-lift">
            <video controls preload="none" playsInline poster={lookbook.poster} className="block aspect-video w-full">
              <source src={lookbook.src} type="video/mp4" />
              <track kind="captions" src={lookbook.captions} srcLang="en" label="English" />
            </video>
          </Reveal>
          <p className="mt-4 inline-flex items-center gap-2 text-[0.85rem] text-white/55">
            <Play size={14} /> Captions available
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-cream">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-12">
          <p className="measure text-lede text-ink-soft">More of our Atlanta commercial work is on reddoorrevivals.com.</p>
          <TextLink href={site.atlantaUrl}>Visit reddoorrevivals.com</TextLink>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={graph(breadcrumbs([{ name: "Projects", path: "/projects/" }]), video())} />
    </>
  );
}
