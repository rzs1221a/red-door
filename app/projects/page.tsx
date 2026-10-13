import type { Metadata } from "next";
import { Container, CtaBand, Img, PageIntro } from "@/components/ui";
import { site } from "@/lib/site";
import { commercial, interiors, lookbook, region, residential, type CaseStudy, type Photo } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Residential restorations, commercial renovations, new construction, and commercial interiors by Red Door Revivals, with before-and-after photos.",
  alternates: { canonical: "/projects/" },
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.82rem] font-medium uppercase tracking-[0.12em] text-ink-soft">{children}</p>
  );
}

function BeforeAfter({ before, after, wide = false }: { before: Photo; after: Photo; wide?: boolean }) {
  const half = "(min-width: 768px) 34vw, 100vw";
  return (
    <div className={`grid gap-3 ${wide ? "" : "sm:grid-cols-2"}`}>
      <figure>
        <Img photo={before} sizes={wide ? "(min-width: 768px) 60vw, 100vw" : half} />
        <figcaption className="mt-2 text-[0.88rem] text-ink-soft">Before</figcaption>
      </figure>
      <figure>
        <Img photo={after} sizes={wide ? "(min-width: 768px) 60vw, 100vw" : half} />
        <figcaption className="mt-2 text-[0.88rem] text-ink-soft">After</figcaption>
      </figure>
    </div>
  );
}

function Study({ s }: { s: CaseStudy }) {
  return (
    <article className="grid gap-8 md:grid-cols-[1fr_1.7fr] md:gap-12">
      <div>
        <Tag>{region}</Tag>
        <h3 className="display mt-2 text-[2rem] md:text-[2.4rem]">{s.name}</h3>
        <p className="mt-4 text-lg font-semibold">{s.headline}</p>
        <p className="measure mt-2 text-lg text-ink-soft">{s.body}</p>
        {s.recognition && (
          <p className="mt-5 flex gap-3 text-[0.95rem]">
            <span className="mt-2 h-2 w-2 shrink-0 bg-brass" aria-hidden="true" />
            {s.recognition}
          </p>
        )}
      </div>
      {s.before && s.after ? (
        <BeforeAfter before={s.before} after={s.after} wide={s.wide} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr] sm:items-start">
          {s.photos?.map((ph) => <Img key={ph.src} photo={ph} sizes="(min-width: 768px) 38vw, 100vw" />)}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const f = residential.feature;
  return (
    <>
      <PageIntro title="Projects">
        <p>Selected Red Door Revivals projects from the {region}: residential restoration, commercial renovation, new construction, and interiors.</p>
      </PageIntro>

      {/* Residential */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-[1fr_1.7fr] md:gap-12">
            <h2 className="display text-[2.4rem] md:text-[3.2rem]">{residential.title}</h2>
            <p className="measure text-lg text-ink-soft md:pt-3">{residential.lead}</p>
          </div>

          <div className="mt-14">
            <Study
              s={{ name: f.name, headline: f.headline, body: f.body, recognition: f.recognition, before: f.before, after: f.after }}
            />
          </div>

          <div className="mt-16 columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
            {residential.gallery.map((ph) => (
              <Img key={ph.src} photo={ph} className="break-inside-avoid" sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" />
            ))}
          </div>
          <p className="mt-3 text-[0.88rem] text-ink-soft">Residential work, {region}.</p>
        </Container>
      </section>

      {/* Commercial */}
      <section className="border-b border-line bg-paper-2">
        <Container className="py-16 md:py-24">
          <h2 className="display text-[2.4rem] md:text-[3.2rem]">Commercial</h2>
          <div className="mt-12 space-y-20">
            {commercial.map((s) => <Study key={s.name} s={s} />)}
          </div>
        </Container>
      </section>

      {/* Commercial interiors */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-[1fr_1.7fr] md:gap-12">
            <h2 className="display text-[2.4rem] md:text-[3.2rem]">{interiors.title}</h2>
            <p className="measure text-lg text-ink-soft md:pt-3">{interiors.lead}</p>
          </div>
          <div className="mt-12 columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
            {interiors.photos.map((ph) => (
              <Img key={ph.src} photo={ph} className="break-inside-avoid" sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" />
            ))}
          </div>
        </Container>
      </section>

      {/* Look Book */}
      <section className="border-b border-line bg-ink text-white">
        <Container className="py-16 md:py-24">
          <h2 className="display text-[2.4rem] md:text-[3.2rem]">{lookbook.title}</h2>
          <div className="mt-10 overflow-hidden rounded-[2px] bg-black">
            <video
              controls
              preload="none"
              playsInline
              poster={lookbook.poster}
              className="block aspect-video w-full"
            >
              <source src={lookbook.src} type="video/mp4" />
              <track kind="captions" src={lookbook.captions} srcLang="en" label="English" />
            </video>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-14">
          <p className="measure text-lg text-ink-soft">
            More of our Atlanta work is on{" "}
            <a href={site.atlantaUrl} className="font-medium text-door-deep underline underline-offset-4">
              reddoorrevivals.com
            </a>
            .
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
