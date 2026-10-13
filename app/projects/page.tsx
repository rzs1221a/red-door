import type { Metadata } from "next";
import { Container, CtaBand, PageIntro, PhotoSlot } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential Projects",
  description:
    "Before and after: residential renovation and restoration projects by Red Door Revivals for rental owners and investors.",
  alternates: { canonical: "/projects/" },
};

// Placeholders only. Replace each entry with a real Red Door project once its photos and
// details arrive. No North Fletcher case study: no progress photos exist for it.
const projects = [
  {
    title: "Project name",
    place: "Location",
    summary: "One or two sentences on the property, what the owner needed, and what changed.",
    scope: ["Scope item", "Scope item"],
  },
  {
    title: "Project name",
    place: "Location",
    summary: "One or two sentences on the property, what the owner needed, and what changed.",
    scope: ["Scope item", "Scope item"],
  },
];

export default function Projects() {
  return (
    <>
      <PageIntro title="Residential projects">
        <p>Before and after, with the scope and the outcome for the owner.</p>
      </PageIntro>

      <section className="border-b border-line">
        <Container className="space-y-20 py-16 md:py-24">
          {projects.map((p, i) => (
            <article key={i} className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
              <div>
                <h2 className="display text-[2rem] md:text-[2.4rem]">{p.title}</h2>
                <p className="mt-1 text-ink-soft">{p.place}</p>
                <p className="measure mt-5 text-lg">{p.summary}</p>
                <p className="mt-5 text-[0.95rem] text-ink-soft">Scope: {p.scope.join(", ")}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <PhotoSlot label="Before" />
                <PhotoSlot label="After" />
                <div className="col-span-2">
                  <PhotoSlot label="After, wide" ratio="aspect-[16/9]" />
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-14">
          <p className="measure text-lg text-ink-soft">
            Commercial work in the Atlanta area is on{" "}
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
