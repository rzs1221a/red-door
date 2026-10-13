import Link from "next/link";
import Door from "@/components/Door";
import { ButtonLink, Container, CtaBand, Img } from "@/components/ui";
import { featured, region } from "@/lib/projects";
import { site } from "@/lib/site";
import { steps } from "@/lib/process";
import { difference, hero, idealCustomer, positioning, promise, services, why } from "@/lib/copy";

export default function Home() {
  return (
    <>
      {/* Hero: the door is the one bold element on the site */}
      <section className="overflow-hidden border-b border-line">
        <Container className="grid items-center gap-12 py-14 md:grid-cols-[1.35fr_1fr] md:py-20">
          <div>
            <p className="text-[0.82rem] font-medium uppercase tracking-[0.12em] text-ink-soft">
              {hero.categories.join("  ·  ")}
            </p>
            <h1 className="display mt-5 text-[3rem] leading-[1.02] sm:text-[4rem] lg:text-[5.4rem]">{hero.headline}</h1>
            <p className="measure mt-7 text-lg text-ink-soft md:text-xl">{hero.lead}</p>
            <p className="mt-4 font-medium text-ink">{hero.proof}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact/">Request a consultation</ButtonLink>
              <ButtonLink href={`tel:${site.phone.tel}`} variant="secondary">
                Call {site.phone.display}
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto w-[62%] max-w-[300px] md:w-full md:max-w-[340px]">
            <Door />
          </div>
        </Container>
      </section>

      {/* The problem, and the complete package */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <p className="display max-w-4xl text-[1.9rem] leading-[1.18] md:text-[2.7rem]">{positioning.uncertainty}</p>
          <p className="measure mt-8 text-lg text-ink-soft">
            Qualified contractors are hard to find, and most offer one piece of the job at a time. We bring the whole
            package: 30+ years of residential and commercial building, award-winning design, and disciplined project
            management.
          </p>
        </Container>
      </section>

      {/* Our promise */}
      <section className="border-b border-line bg-paper-2">
        <Container className="grid gap-12 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
          <div>
            <p className="text-[0.82rem] font-medium uppercase tracking-[0.12em] text-door-deep">{promise.eyebrow}</p>
            <h2 className="display mt-4 text-[2.2rem] md:text-[3rem]">{promise.title}</h2>
            <p className="measure mt-6 text-lg text-ink-soft">{promise.answerLead}</p>
            <ul className="mt-6 space-y-3 text-lg">
              {promise.answer.map((line) => (
                <li key={line} className="border-l-2 border-door pl-5 font-medium">{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-lg text-ink-soft">{promise.lead.join(" ")}</p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {promise.pains.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-soft" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-[2.2rem] md:text-[3rem]">{site.tagline}</h2>
            <Link href="/services/" className="font-medium text-door-deep underline-offset-4 hover:underline">
              Everything we do
            </Link>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {services.map((s) => (
              <Link key={s.id} href={`/services/#${s.id}`} className="group border-t-2 border-ink pt-5">
                <h3 className="text-xl font-semibold group-hover:text-door-deep">{s.title}</h3>
                <p className="mt-3 text-ink-soft">{s.lead.join(" ")}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* The Red Door Process */}
      <section className="border-b border-line bg-paper-2">
        <Container className="grid gap-12 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <div>
            <h2 className="display text-[2.2rem] md:text-[3rem]">The Red Door Process</h2>
            <p className="measure mt-5 text-lg text-ink-soft">{positioning.difference}</p>
            <div className="mt-8">
              <ButtonLink href="/design-process/" variant="secondary">See the full process</ButtonLink>
            </div>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
                <span className="display text-2xl text-door">{i + 1}</span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-ink-soft">{s.short}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Ideal customer */}
      <section className="border-b border-line">
        <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="display text-[2.2rem] md:text-[3rem]">{idealCustomer.title}</h2>
            <p className="measure mt-5 text-lg text-ink-soft">{idealCustomer.valuesLead}</p>
            <p className="mt-4 text-lg font-medium">{idealCustomer.values.join(" · ")}</p>
          </div>
          <div>
            <p className="text-lg text-ink-soft">{idealCustomer.forLead}</p>
            <ul className="mt-5 space-y-3 text-lg">
              {idealCustomer.for.map((f) => (
                <li key={f} className="border-l-2 border-door pl-5">{f}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Projects teaser: Red Door Look Book photos (Atlanta area) */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-[2.2rem] md:text-[3rem]">Recent work</h2>
            <Link href="/projects/" className="font-medium text-door-deep underline-offset-4 hover:underline">
              All projects
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((f) => (
              <figure key={f.photo.src}>
                <div className="aspect-[4/3] overflow-hidden rounded-[2px]">
                  <Img photo={f.photo} className="h-full object-cover" sizes="(min-width: 768px) 31vw, 100vw" />
                </div>
                <figcaption className="mt-3 text-[0.95rem]">
                  {f.caption}
                  <span className="text-ink-soft">, {region}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Red Door */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <h2 className="display text-[2.2rem] md:text-[3rem]">Why Red Door Revivals?</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {why.map((w) => (
              <div key={w.title} className="border-t-2 border-ink pt-5">
                <h3 className="text-xl font-semibold">{w.title}</h3>
                {w.body.map((b) => (
                  <p key={b} className="mt-3 text-ink-soft">{b}</p>
                ))}
                {w.items && (
                  <ul className="mt-2 text-ink-soft">
                    {w.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                )}
              </div>
            ))}
            <div className="border-t-2 border-door pt-5">
              <h3 className="text-xl font-semibold">Recognition</h3>
              <ul className="mt-3 space-y-2">
                {site.awards.map((a) => (
                  <li key={a.name}>
                    <span className="font-medium">{a.name}</span>
                    <span className="text-ink-soft">, {a.by}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                <Link href="/about/" className="font-medium text-door-deep underline-offset-4 hover:underline">
                  About Red Door Revivals
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The Red Door Difference */}
      <section className="border-b border-line bg-ink text-white">
        <Container className="grid gap-10 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
          <div>
            <h2 className="display text-[2.2rem] md:text-[3rem]">{difference.title}</h2>
            <p className="mt-6 text-lg text-white/75">{difference.lead}</p>
            <p className="display mt-4 text-[1.7rem] text-white/60 md:text-[2rem]">{difference.a}</p>
            <p className="mt-1 text-white/60">and</p>
            <p className="display mt-1 text-[1.7rem] md:text-[2rem]">{difference.b}</p>
          </div>
          <div className="text-lg text-white/80">
            <p>{difference.body}</p>
            <ul className="mt-5 space-y-2">
              {difference.needs.map((n) => <li key={n}>{n}</li>)}
            </ul>
            <p className="mt-6 font-medium text-white">{difference.close.join(" ")}</p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
