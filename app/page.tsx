import Link from "next/link";
import Door from "@/components/Door";
import { ButtonLink, Container, CtaBand, PhotoSlot } from "@/components/ui";
import { site } from "@/lib/site";
import { steps } from "@/lib/process";

export default function Home() {
  return (
    <>
      {/* Hero: the door is the one bold element on the site */}
      <section className="overflow-hidden border-b border-line">
        <Container className="grid items-center gap-12 py-14 md:grid-cols-[1.35fr_1fr] md:py-20">
          <div>
            <h1 className="display text-[3rem] leading-[1.02] sm:text-[4rem] lg:text-[5.4rem]">
              You own the property. We&rsquo;ll manage the project.
            </h1>
            <p className="measure mt-7 text-lg text-ink-soft md:text-xl">
              Renovation, restoration, and turnkey project management for rental owners and investors in
              Fernandina Beach and on Amelia Island. One team handles design, pricing, and the build, so you
              always know what happens next.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact/">Request a walkthrough</ButtonLink>
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

      {/* The problem */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <p className="display max-w-4xl text-[1.9rem] leading-[1.18] md:text-[2.7rem]">
            Too many renovation projects leave owners wondering what&rsquo;s happening next. Red Door Revivals
            removes that uncertainty with professional planning, detailed scopes, design support, and disciplined
            project management.
          </p>
          <p className="measure mt-8 text-lg text-ink-soft">
            Qualified contractors are hard to find on the island, and most offer one piece of the job at a time.
            We bring the whole package: 30+ years of residential and commercial building, award-winning design, and
            a project manager who answers for the schedule and the budget.
          </p>
        </Container>
      </section>

      {/* What's included */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <h2 className="display text-[2.2rem] md:text-[3rem]">{site.tagline}</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            <div className="border-t-2 border-ink pt-5">
              <h3 className="text-xl font-semibold">Clear plans</h3>
              <p className="mt-3 text-ink-soft">
                Every project starts with a walkthrough and a written scope: what gets done, in what order, and
                with which finishes. Design is part of the plan from day one, not an add-on.
              </p>
            </div>
            <div className="border-t-2 border-ink pt-5">
              <h3 className="text-xl font-semibold">Clear pricing</h3>
              <p className="mt-3 text-ink-soft">
                You get a detailed price before work starts, tied to the scope line by line. Changes are priced
                and approved in writing before they happen.
              </p>
            </div>
            <div className="border-t-2 border-ink pt-5">
              <h3 className="text-xl font-semibold">Beautiful results</h3>
              <p className="mt-3 text-ink-soft">
                Durable, rentable finishes chosen for coastal conditions and for the guests or tenants who will
                live with them. Built to photograph well and hold up between turns.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Process teaser: a real sequence, so it's numbered */}
      <section className="border-b border-line bg-paper-2">
        <Container className="grid gap-12 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <div>
            <h2 className="display text-[2.2rem] md:text-[3rem]">How a project runs</h2>
            <p className="measure mt-5 text-lg text-ink-soft">
              Built for owners who are not on site. You approve the plan once, then follow progress from anywhere
              in the client portal.
            </p>
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

      {/* Who it's for */}
      <section className="border-b border-line">
        <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="display text-[2.2rem] md:text-[3rem]">For owners who aren&rsquo;t here every day</h2>
            <p className="measure mt-5 text-lg text-ink-soft">
              Most of our Florida clients own rental and investment property on Amelia Island and live somewhere
              else. We act as your team on the ground.
            </p>
          </div>
          <ul className="space-y-6 text-lg">
            <li className="border-l-2 border-door pl-5">
              <span className="font-semibold">Vacation rental owners</span>
              <span className="block text-ink-soft">Refresh between seasons and keep calendars open.</span>
            </li>
            <li className="border-l-2 border-door pl-5">
              <span className="font-semibold">Long-term rental landlords</span>
              <span className="block text-ink-soft">Turn units faster with finishes that last.</span>
            </li>
            <li className="border-l-2 border-door pl-5">
              <span className="font-semibold">Residential investors</span>
              <span className="block text-ink-soft">Rehab acquisitions on a fixed scope and schedule.</span>
            </li>
          </ul>
        </Container>
      </section>

      {/* Projects teaser */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-[2.2rem] md:text-[3rem]">Recent work</h2>
            <Link href="/projects/" className="font-medium text-door underline-offset-4 hover:underline">
              All projects
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PhotoSlot label="Project photo: kitchen, after" />
            <PhotoSlot label="Project photo: exterior, after" />
            <PhotoSlot label="Project photo: bath, after" />
          </div>
        </Container>
      </section>

      {/* Credibility */}
      <section className="border-b border-line">
        <Container className="grid gap-10 py-16 md:grid-cols-[1fr_1.4fr] md:py-20">
          <h2 className="display text-[2.2rem] md:text-[3rem]">30+ years of building</h2>
          <div>
            <p className="measure text-lg text-ink-soft">
              Red Door Revivals has renovated homes and commercial buildings across the Southeast, including
              historic restorations in the Atlanta area. That experience covers almost every situation an old
              house or a tired rental can throw at a project.
            </p>
            <ul className="mt-8 space-y-4">
              {site.awards.map((a) => (
                <li key={a.name} className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-brass" aria-hidden="true" />
                  <span>
                    <span className="font-semibold">{a.name}</span>
                    <span className="text-ink-soft">, {a.by}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href="/about/" className="font-medium text-door underline-offset-4 hover:underline">
                About Red Door Revivals
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
