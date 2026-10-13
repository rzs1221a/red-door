import type { Metadata } from "next";
import { Container, CtaBand, PageIntro } from "@/components/ui";
import { site } from "@/lib/site";
import { closingPromise, hero, positioning, why } from "@/lib/copy";

export const metadata: Metadata = {
  title: "About",
  description:
    "Red Door Revivals brings 30+ years of residential and commercial experience, professional design, and detailed project management to property owners in Fernandina Beach.",
  alternates: { canonical: "/about/" },
};

const experience = why.find((w) => w.title === "30+ Years of Experience")!;

export default function About() {
  return (
    <>
      <PageIntro title="Red Door Revivals, LLC">
        <p>{hero.lead}</p>
      </PageIntro>

      <section className="border-b border-line">
        <Container className="grid gap-12 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <div>
            <h2 className="display text-[2.2rem] md:text-[3rem]">{positioning.differenceLead}</h2>
          </div>
          <div className="prose-site measure text-lg text-ink-soft">
            <p className="font-medium text-ink">{positioning.difference}</p>
            {positioning.detail.map((p) => <p key={p}>{p}</p>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="grid gap-12 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <h2 className="display text-[2.2rem] md:text-[3rem]">{experience.title}</h2>
          <div className="prose-site measure text-lg text-ink-soft">
            <p>Residential and commercial building and design.</p>
            {experience.body.map((p) => <p key={p}>{p}</p>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-2">
        <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="display text-[2.2rem] md:text-[3rem]">Leadership</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {site.leadership.map((p) => (
                <li key={p.name} className="flex justify-between gap-4 py-4 text-lg">
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-ink-soft">{p.title}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-ink-soft">Working together since 2000, involved from design through completion.</p>
          </div>
          <div>
            <h2 className="display text-[2.2rem] md:text-[3rem]">Recognition</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {site.awards.map((a) => (
                <li key={a.name} className="py-4 text-lg">
                  <span className="block font-semibold">{a.name}</span>
                  <span className="text-ink-soft">{a.by}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="grid gap-12 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <div>
            <h2 className="display text-[2.2rem] md:text-[3rem]">{closingPromise.title}</h2>
            <p className="mt-5 text-lg font-medium">{closingPromise.lead}</p>
          </div>
          <div className="text-lg">
            <ul className="space-y-3 text-ink-soft">
              {closingPromise.shouldnt.map((s) => (
                <li key={s} className="border-l-2 border-door pl-5">{s}</li>
              ))}
            </ul>
            <p className="mt-6 font-medium">{closingPromise.therefore}</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-14">
          <p className="measure text-lg text-ink-soft">
            See our commercial work in Atlanta at{" "}
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
