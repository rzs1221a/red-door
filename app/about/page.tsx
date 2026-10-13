import type { Metadata } from "next";
import { Container, CtaBand, PageIntro } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Red Door Revivals brings 30+ years of residential and commercial building and award-winning design to rental property owners in Fernandina Beach.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <>
      <PageIntro title="We've seen almost every situation a renovation can throw at you">
        <p>
          Red Door Revivals has spent more than 30 years renovating homes and commercial buildings across the
          Southeast. Now that experience is on Amelia Island, working for rental owners and investors.
        </p>
      </PageIntro>

      <section className="border-b border-line">
        <Container className="grid gap-12 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <h2 className="display text-[2.2rem] md:text-[3rem]">Residential and commercial, for three decades</h2>
          <div className="prose-site measure text-lg text-ink-soft">
            <p>
              The company started in residential construction and grew into commercial renovation and historic
              restoration in the Atlanta area, where it has completed more than 50 projects.
            </p>
            <p>
              That range matters on a rental. Old houses hide problems, budgets have limits, and every week a
              property sits empty costs money. We know how to find issues early, price them honestly, and keep a
              job moving.
            </p>
            <p>
              Fernandina Beach is home for our Florida team, and the rental market here needs what we do best: a
              predictable process, finished on schedule, by people who answer the phone.
            </p>
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
        <Container className="py-14">
          <p className="measure text-lg text-ink-soft">
            See our commercial and historic work in Atlanta at{" "}
            <a href={site.atlantaUrl} className="font-medium text-door underline underline-offset-4">
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
